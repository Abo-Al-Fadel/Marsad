// Update the dashboard statistics from local data
function updateStats(data) {
  const totalEl = document.getElementById('stat-total');
  const verifiedEl = document.getElementById('stat-verified');
  const unverifiedEl = document.getElementById('stat-unverified');
  const rejectedEl = document.getElementById('stat-rejected');
  if (!totalEl) return;
  const verified = data.filter(i => i.status === 'Verified').length;
  const unverified = data.filter(i => i.status === 'Unverified').length;
  const rejected = data.filter(i => i.status === 'Rejected').length;
  totalEl.textContent = data.length;
  if (verifiedEl) verifiedEl.textContent = verified;
  if (unverifiedEl) unverifiedEl.textContent = unverified;
  if (rejectedEl) rejectedEl.textContent = rejected;
}

// Render the list of incident cards into the main feed
function renderCards(data, userVotes) {
  const container = document.getElementById('incidents-container');
  const emptyState = document.getElementById('empty-state');
  const countEl = document.getElementById('incident-count');
  if (countEl) countEl.textContent = `${data.length} report${data.length !== 1 ? 's' : ''}`;
  updateStats(data);
  if (data.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  if (emptyState) emptyState.style.display = 'none';
  const votes = userVotes || {};
  const currentUser = MarsadAPI.getUser();
  
  container.innerHTML = data.map(incident => {
    const votedAction = votes[incident.id];
    const confirmClasses = ['vote-btn', 'vote-btn--confirm', votedAction === 'confirm' ? 'vote-btn--active-confirm' : ''].filter(Boolean).join(' ');
    const rejectClasses = ['vote-btn', 'vote-btn--reject', votedAction === 'reject' ? 'vote-btn--active-reject' : ''].filter(Boolean).join(' ');
    
    // Check if the current user owns this incident
    const isOwner = currentUser && incident.user_id === currentUser.id;
    // Check if within 30 minutes of creation
    const createdDate = new Date(incident.created_at);
    const now = new Date();
    const minutesSinceCreation = (now - createdDate) / (1000 * 60);
    const isEditable = isOwner && minutesSinceCreation <= 30;

    let ownerControls = '';
    if (isOwner) {
      const editBtn = isEditable 
            ? `<button onclick="openEditModal(${incident.id})" style="background:none; border:1px solid var(--border-color); padding:0; cursor:pointer; color:var(--text-secondary); line-height:0; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; transition:all 0.15s ease;" aria-label="Edit" onmouseover="this.style.backgroundColor='var(--bg-surface-alt)'; this.style.borderColor='var(--text-muted)'; this.style.color='var(--text-primary)';" onmouseout="this.style.backgroundColor='transparent'; this.style.borderColor='var(--border-color)'; this.style.color='var(--text-secondary)';">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  <path d="M15 5l4 4"/>
                </svg>
              </button>`
            : '';
      ownerControls = `
        <div style="display:flex; gap:6px; margin-right:auto; margin-left:8px;">
          <button onclick="openDeleteConfirm(${incident.id})" style="background:none; border:1px solid rgba(239,68,68,0.3); padding:0; cursor:pointer; color:#ef4444; line-height:0; width:28px; height:28px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; transition:all 0.15s ease;" aria-label="Delete" onmouseover="this.style.backgroundColor='rgba(239,68,68,0.1)'; this.style.borderColor='#ef4444'; this.style.color='#ff6666';" onmouseout="this.style.backgroundColor='transparent'; this.style.borderColor='rgba(239,68,68,0.3)'; this.style.color='#ef4444';">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/>
              <path d="M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
          ${editBtn}
        </div>
      `;
    }

    return `
    <article class="incident-card" data-id="${incident.id}">
      <div class="incident-card__header">
        <h3 class="incident-card__title">${escapeHtml(incident.title)}</h3>
        <span class="incident-card__type incident-card__type--${typeClass(incident.type)}">
          <span class="incident-card__type-icon">${getTypeIcon(incident.type)}</span>
          ${escapeHtml(incident.type)}
        </span>
      </div>
      <div class="incident-card__meta">
        <span class="incident-card__meta-item">
          <span class="incident-card__meta-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </span>
          ${escapeHtml(incident.location)}
        </span>
        <span class="incident-card__meta-item">
          <span class="incident-card__timestamp">${formatTimestamp(incident.time)}</span>
        </span>
        <span class="incident-card__relative-time">${relativeTime(incident.time)}</span>
      </div>
      ${incident.note ? `<p class="incident-card__note">${escapeHtml(incident.note)}</p>` : ''}
      <div class="incident-card__footer">
        <span class="status-badge status-badge--${statusClass(incident.status)}">${incident.status}</span>
        ${ownerControls}
        <div class="vote-group" ${isOwner ? 'style="margin-left:0;"' : ''}>
          <button class="${confirmClasses}" onclick="handleVote(${incident.id}, 'confirm')" aria-label="Confirm incident">
            ${SVG_THUMBS_UP} <span class="vote-btn__count" id="confirm-${incident.id}">${incident.confirms}</span>
          </button>
          <button class="${rejectClasses}" onclick="handleVote(${incident.id}, 'reject')" aria-label="Reject incident">
            ${SVG_THUMBS_DOWN} <span class="vote-btn__count" id="reject-${incident.id}">${incident.rejects}</span>
          </button>
        </div>
      </div>
    </article>`;
  }).join('');
}

// Render the right-sidebar timeline, grouping incidents by date
function renderTimeline(data) {
  const container = document.getElementById('timeline-container');
  if (!container) return;
  const recent = data.filter(inc => isTodayOrYesterday(inc.time));
  const sorted = [...recent].sort((a, b) => new Date(b.time) - new Date(a.time));
  const groups = {};
  sorted.forEach(incident => {
    const key = extractDateKey(incident.time);
    if (!groups[key]) groups[key] = [];
    groups[key].push(incident);
  });
  if (Object.keys(groups).length === 0) {
    container.innerHTML = '<p class="empty-state__text" style="padding: 20px 0;">No incidents reported today or yesterday.</p>';
    return;
  }
  container.innerHTML = Object.keys(groups).map(dateKey => {
    const relativeLabel = getRelativeDateLabel(groups[dateKey][0].time);
    const items = groups[dateKey].map(incident => `
      <div class="timeline__item">
        <span class="timeline__item-time">${extractTime(incident.time)}</span>
        <div class="timeline__item-content">
          <div class="timeline__item-title">${escapeHtml(incident.title)}</div>
          <div class="timeline__item-location">
            <span class="timeline__item-location-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            ${escapeHtml(incident.location)} — ${escapeHtml(incident.type)}
          </div>
        </div>
        <div class="timeline__item-badge">
          <span class="status-badge status-badge--${statusClass(incident.status)}">${incident.status}</span>
        </div>
      </div>
    `).join('');
    return `
      <div class="timeline__date-group">
        <div class="timeline__date-header">${relativeLabel}</div>
        ${items}
      </div>`;
  }).join('');
}

// Filter incidents locally from the cached data
function filterIncidents(location, type) {
  let filtered = [...incidents];
  if (location !== 'all') filtered = filtered.filter(i => i.location === location);
  if (type !== 'all') {
    const typeLower = type.toLowerCase();
    filtered = filtered.filter(i => i.type.toLowerCase().includes(typeLower));
  }
  filtered.sort((a, b) => new Date(b.time) - new Date(a.time));
  renderCards(filtered, currentUserVotes);
  renderTimeline(filtered);
}

// Grab the current filter values and apply them to the incident feed
function applyFilters() {
  const locationInput = document.getElementById('filter-location');
  const typeInput = document.getElementById('filter-type');
  const location = locationInput ? locationInput.value.trim() : 'all';
  const type = typeInput ? typeInput.value.trim() : 'all';
  filterIncidents(location || 'all', type || 'all');
}

// Filter incidents using a free-text search query
function handleSearch(query) {
  const q = query.toLowerCase().trim();
  let filtered = [...incidents];
  if (q) {
    filtered = incidents.filter(i =>
      i.title.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q) ||
      i.type.toLowerCase().includes(q) ||
      (i.note && i.note.toLowerCase().includes(q))
    );
  }
  filtered.sort((a, b) => new Date(b.time) - new Date(a.time));
  renderCards(filtered, currentUserVotes);
  renderTimeline(filtered);
}

// Show a temporary toast notification on the screen
function showToast(message, type) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast toast--' + (type || 'info');
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast--visible'));
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    });
  }, 3000);
}

// Setup the scroll-to-top button behavior
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('back-to-top--visible', window.scrollY > 300);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Let the visitor dismiss the sample-data notice; remembered for the session
// only, so it reappears in a fresh tab rather than being hidden for good.
function initDemoBar() {
  const bar = document.getElementById('demo-bar');
  if (!bar) return;
  if (sessionStorage.getItem('marsad_demo_dismissed')) {
    bar.classList.add('demo-bar--hidden');
    return;
  }
  const close = document.getElementById('demo-bar-close');
  if (close) {
    close.addEventListener('click', () => {
      bar.classList.add('demo-bar--hidden');
      sessionStorage.setItem('marsad_demo_dismissed', '1');
    });
  }
}

// Setup the mobile navigation menu toggle
function initNavbarToggle() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('navbar__links--open');
  });
  links.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('navbar__links--open');
    });
  });
}

// Open the incident details modal and populate it with data
function openIncidentModal(id) {
  const incident = incidents.find(i => i.id === id);
  if (!incident) return;
  const modal = document.getElementById('incident-modal');
  if (!modal) return;
  const titleEl = document.getElementById('modal-title');
  const metaEl = document.getElementById('modal-meta');
  const noteEl = document.getElementById('modal-note');
  const statusEl = document.getElementById('modal-status');
  if (titleEl) titleEl.textContent = incident.title;
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="popup-detail"><strong>Location:</strong> ${escapeHtml(incident.location)}</span>
      <span class="popup-detail"><strong>Type:</strong> ${escapeHtml(incident.type)}</span>
      <span class="popup-detail"><strong>Time:</strong> ${formatTimestamp(incident.time)}</span>
      <span class="popup-detail"><strong>Verified by:</strong> ${incident.confirms} people</span>
      <span class="popup-detail"><strong>Rejected by:</strong> ${incident.rejects} people</span>`;
  }
  if (noteEl) noteEl.textContent = incident.note || 'No additional notes provided.';
  if (statusEl) {
    statusEl.className = 'status-badge status-badge--' + statusClass(incident.status);
    statusEl.textContent = incident.status;
  }
  modal.classList.add('modal-overlay--visible');
  document.body.style.overflow = 'hidden';
}

// Close the incident details modal
function closeIncidentModal() {
  const modal = document.getElementById('incident-modal');
  if (!modal) return;
  modal.classList.remove('modal-overlay--visible');
  document.body.style.overflow = '';
}

// Setup click listeners for the incident cards to open the modal
function initIncidentModal() {
  const container = document.getElementById('incidents-container');
  if (!container) return;
  const modal = document.getElementById('incident-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeIncidentModal();
    });
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.addEventListener('click', closeIncidentModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('modal-overlay--visible')) closeIncidentModal();
    });
  }
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.incident-card');
    if (!card) return;
    if (e.target.closest('.vote-group')) return;
    // Don't open detail modal if clicking any button (votes, edit, delete)
    if (e.target.closest('button')) return;
    const id = parseInt(card.dataset.id, 10);
    openIncidentModal(id);
  });
}

// ----------------------------------------------------
// Edit & Delete Specific UI Logic
// ----------------------------------------------------

async function deleteIncidentPrompt(id) {
  // Close the confirmation modal
  const confirmModal = document.getElementById('delete-confirm-modal');
  if (confirmModal) confirmModal.classList.remove('modal-overlay--visible');
  document.body.style.overflow = '';

  try {
    await MarsadAPI.deleteIncident(id);
    showToast('Incident deleted successfully.', 'success');
    refreshIncidents();
  } catch (err) {
    showToast(err.message || 'Failed to delete incident.', 'error');
  }
}

function openDeleteConfirm(id) {
  const modal = document.getElementById('delete-confirm-modal');
  if (!modal) return;
  modal.dataset.incidentId = id;
  modal.classList.add('modal-overlay--visible');
  document.body.style.overflow = 'hidden';
}

function initDeleteConfirmModal() {
  const modal = document.getElementById('delete-confirm-modal');
  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('modal-overlay--visible');
      document.body.style.overflow = '';
    }
  });

  const closeBtn = modal.querySelector('.modal__close');
  if (closeBtn) closeBtn.addEventListener('click', () => {
    modal.classList.remove('modal-overlay--visible');
    document.body.style.overflow = '';
  });

  const cancelBtn = modal.querySelector('.delete-confirm__cancel');
  if (cancelBtn) cancelBtn.addEventListener('click', () => {
    modal.classList.remove('modal-overlay--visible');
    document.body.style.overflow = '';
  });

  const confirmBtn = modal.querySelector('.delete-confirm__confirm');
  if (confirmBtn) confirmBtn.addEventListener('click', () => {
    const id = parseInt(modal.dataset.incidentId, 10);
    if (id) deleteIncidentPrompt(id);
  });
}

function openEditModal(id) {
  const incident = incidents.find(i => i.id === id);
  if (!incident) return;
  
  const modal = document.getElementById('edit-incident-modal');
  if (!modal) return;
  
  // Set min/max on the datetime input (last 24h only)
  setMinDateTime('edit-date');
  
  // Pre-fill the form
  document.getElementById('edit-incident-id').value = incident.id;
  document.getElementById('edit-location').value = incident.location;
  document.getElementById('edit-type').value = incident.type;
  
  // Convert standard datetime string to datetime-local format (YYYY-MM-DDTHH:mm)
  const dt = new Date(incident.time);
  const pad = (n) => String(n).padStart(2, '0');
  const localIso = dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate()) + 'T' + pad(dt.getHours()) + ':' + pad(dt.getMinutes());
  document.getElementById('edit-date').value = localIso;
  
  document.getElementById('edit-note').value = incident.note || '';
  
  // Show modal
  modal.classList.add('modal-overlay--visible');
  document.body.style.overflow = 'hidden';
}

function closeEditModal() {
  const modal = document.getElementById('edit-incident-modal');
  if (!modal) return;
  modal.classList.remove('modal-overlay--visible');
  document.body.style.overflow = '';
}

function initEditModal() {
  const modal = document.getElementById('edit-incident-modal');
  if (!modal) return;

  // Initializing autocomplete for the edit modal elements
  if (typeof lebaneseLocations !== 'undefined') {
    initAutocomplete('edit-location', 'edit-location-list', lebaneseLocations, null, false);
  }
  if (typeof incidentTypes !== 'undefined') {
    initAutocomplete('edit-type', 'edit-type-list', incidentTypes, null, true);
  }

  const closeBtn = document.getElementById('edit-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeEditModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeEditModal();
  });

  const form = document.getElementById('edit-incident-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // --- Client-side validation (same as report form) ---
      const errorEl = document.getElementById('edit-error');
      errorEl.style.display = 'none';
      errorEl.textContent = '';
      
      const location = document.getElementById('edit-location').value.trim();
      const type = document.getElementById('edit-type').value.trim();
      const time = document.getElementById('edit-date').value;
      const note = document.getElementById('edit-note').value.trim();

      let isValid = true;

      if (!location) {
        errorEl.textContent = 'Please enter a location.';
        errorEl.style.display = 'block';
        isValid = false;
      } else if (!lebaneseLocations.includes(location)) {
        errorEl.textContent = 'Please select a valid location.';
        errorEl.style.display = 'block';
        isValid = false;
      }

      if (!type) {
        errorEl.textContent = 'Please enter an incident type.';
        errorEl.style.display = 'block';
        isValid = false;
      } else if (!incidentTypes.includes(type)) {
        errorEl.textContent = 'Please select a valid incident type.';
        errorEl.style.display = 'block';
        isValid = false;
      }

      if (!time) {
        errorEl.textContent = 'Please select the time of incident.';
        errorEl.style.display = 'block';
        isValid = false;
      } else {
        const selectedTime = new Date(time);
        const now = new Date();
        const past = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        if (selectedTime > now) {
          errorEl.textContent = 'Cannot report an incident in the future.';
          errorEl.style.display = 'block';
          isValid = false;
        } else if (selectedTime < past) {
          errorEl.textContent = 'Incident must be within the last 24 hours.';
          errorEl.style.display = 'block';
          isValid = false;
        }
      }

      if (!isValid) return;
      // --- End validation ---

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving...';
      
      try {
        const id = document.getElementById('edit-incident-id').value;
        
        await MarsadAPI.updateIncident(id, location, type, time, note || null);
        
        showToast('Incident updated successfully.', 'success');
        closeEditModal();
        refreshIncidents();
        
      } catch (err) {
        errorEl.textContent = err.message || Object.values(err.errors || {})[0]?.[0] || 'Update failed.';
        errorEl.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
  }
    });
  }
}

let autoRefreshInterval = null;

// Fetch latest incidents from the API (replaces the old mock generator)
async function refreshIncidents() {
  try {
    const data = await MarsadAPI.getIncidents();
    incidents.length = 0;
    data.forEach(inc => incidents.push(inc));
    applyFilters();
  } catch (e) {
    // Silently fail on auto-refresh
  }
}

// Start polling for new incidents
function startAutoRefresh() {
  autoRefreshInterval = setInterval(refreshIncidents, 15000);
}

// Stop polling
function stopAutoRefresh() {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
    autoRefreshInterval = null;
  }
}