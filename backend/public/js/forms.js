// Show an error message under a specific form field
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (field) {
    const tag = field.tagName.toLowerCase();
    if (tag === 'select') field.classList.add('form__select--error');
    else if (tag === 'textarea') field.classList.add('form__textarea--error');
    else field.classList.add('form__input--error');
  }
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('form__error--visible');
  }
}

// Clear any active errors from a specific form field
function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (field) {
    field.classList.remove('form__input--error', 'form__select--error', 'form__textarea--error');
  }
  if (errorEl) errorEl.classList.remove('form__error--visible');
}

// Clear all validation errors within a given form
function clearAllErrors(form) {
  form.querySelectorAll('.form__error').forEach(el => el.classList.remove('form__error--visible'));
  form.querySelectorAll('.form__input--error, .form__select--error, .form__textarea--error').forEach(el => {
    el.classList.remove('form__input--error', 'form__select--error', 'form__textarea--error');
  });
}

// Check if a string looks like a valid email address
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Restrict a datetime input so it only allows dates in the last 24 hours
function setMinDateTime(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const now = new Date();
  const past = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  const maxIso = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ':' + pad(now.getMinutes());
  const minIso = past.getFullYear() + '-' + pad(past.getMonth() + 1) + '-' + pad(past.getDate()) + 'T' + pad(past.getHours()) + ':' + pad(past.getMinutes());
  input.setAttribute('min', minIso);
  input.setAttribute('max', maxIso);
}

// Set up the incident report form — now sends to the API
function initReportForm() {
  const form = document.getElementById('report-form');
  if (!form) return;
  setMinDateTime('incident_time');
  // Default the time field to right now
  const timeInput = document.getElementById('incident_time');
  if (timeInput && !timeInput.value) {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    timeInput.value = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ':' + pad(now.getMinutes());
  }
  initAutocomplete('incident_location', 'incident_location-list', lebaneseLocations, null, false);
  initAutocomplete('incident_type', 'incident_type-list', incidentTypes, null, true);
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Prevent guests from submitting a report
    if (!MarsadAPI.isAuthenticated()) {
      showToast('Authentication required. Please log in to submit a report.', 'error');
      return;
    }

    clearAllErrors(form);
    let isValid = true;
    const location = document.getElementById('incident_location');
    const type = document.getElementById('incident_type');
    if (!location.value.trim()) {
      showFieldError('incident_location', 'Please enter a location.');
      isValid = false;
    } else if (!lebaneseLocations.includes(location.value.trim())) {
      showFieldError('incident_location', 'Please select a valid location.');
      isValid = false;
    }
    if (!type.value.trim()) {
      showFieldError('incident_type', 'Please enter an incident type.');
      isValid = false;
    } else if (!incidentTypes.includes(type.value.trim())) {
      showFieldError('incident_type', 'Please select a valid incident type.');
      isValid = false;
    }
    const time = document.getElementById('incident_time');
    if (!time.value) {
      showFieldError('incident_time', 'Please select the time of incident.');
      isValid = false;
    } else {
      const selectedTime = new Date(time.value);
      const now = new Date();
      const past = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      if (selectedTime > now) {
        showFieldError('incident_time', 'Cannot report an incident in the future.');
        isValid = false;
      } else if (selectedTime < past) {
        showFieldError('incident_time', 'Incident must be within the last 24 hours.');
        isValid = false;
      }
    }
    if (isValid) {
      const submitBtn = document.getElementById('report-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      try {
        const note = document.getElementById('incident_note').value.trim();
        await MarsadAPI.createIncident(
          location.value.trim(),
          type.value.trim(),
          time.value,
          note || null
        );
        const success = document.getElementById('report-success');
        if (success) success.classList.add('form__success--visible');
        form.reset();
        showToast('Incident reported successfully!', 'success');
        setTimeout(() => {
          if (success) success.classList.remove('form__success--visible');
        }, 5000);
      } catch (err) {
        showToast(err.message || 'Failed to submit report.', 'error');
        // Show server-side validation errors
        if (err.errors) {
          Object.keys(err.errors).forEach(key => {
            const fieldId = 'incident_' + key;
            showFieldError(fieldId, err.errors[key][0]);
          });
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Report';
      }
    }
  });
}

// Set up the user login form — now sends to the API
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearAllErrors(form);
    let isValid = true;
    const email = document.getElementById('login_email');
    if (!email.value.trim()) {
      showFieldError('login_email', 'Email is required.');
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showFieldError('login_email', 'Please enter a valid email address.');
      isValid = false;
    }
    const password = document.getElementById('login_password');
    if (!password.value) {
      showFieldError('login_password', 'Password is required.');
      isValid = false;
    } else if (password.value.length < 6) {
      showFieldError('login_password', 'Password must be at least 6 characters.');
      isValid = false;
    }
    if (isValid) {
      const submitBtn = document.getElementById('login-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in...';

      try {
        await MarsadAPI.login(email.value.trim(), password.value);
        const success = document.getElementById('login-success');
        if (success) success.classList.add('form__success--visible');
        showToast('Login successful!', 'success');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } catch (err) {
        if (err.errors && err.errors.email) {
          showFieldError('login_email', err.errors.email[0]);
        } else {
          showFieldError('login_email', err.message || 'Login failed.');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log In';
      }
    }
  });
}

// Set up the user registration form — now sends to the API
function initRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearAllErrors(form);
    let isValid = true;
    const name = document.getElementById('register_name');
    if (!name.value.trim()) {
      showFieldError('register_name', 'Full name is required.');
      isValid = false;
    }
    const email = document.getElementById('register_email');
    if (!email.value.trim()) {
      showFieldError('register_email', 'Email is required.');
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showFieldError('register_email', 'Please enter a valid email address.');
      isValid = false;
    }
    const password = document.getElementById('register_password');
    if (!password.value) {
      showFieldError('register_password', 'Password is required.');
      isValid = false;
    } else if (password.value.length < 6) {
      showFieldError('register_password', 'Password must be at least 6 characters.');
      isValid = false;
    }
    const confirm = document.getElementById('register_password_confirmation');
    if (!confirm.value) {
      showFieldError('register_password_confirmation', 'Please confirm your password.');
      isValid = false;
    } else if (confirm.value !== password.value) {
      showFieldError('register_password_confirmation', 'Passwords do not match.');
      isValid = false;
    }
    if (isValid) {
      const submitBtn = document.getElementById('register-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating account...';

      try {
        await MarsadAPI.register(
          name.value.trim(),
          email.value.trim(),
          password.value,
          confirm.value
        );
        const success = document.getElementById('register-success');
        if (success) success.classList.add('form__success--visible');
        form.reset();
        showToast('Account created successfully!', 'success');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } catch (err) {
        if (err.errors) {
          Object.keys(err.errors).forEach(key => {
            showFieldError('register_' + key, err.errors[key][0]);
          });
        } else {
          showToast(err.message || 'Registration failed.', 'error');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
      }
    }
  });
}