// Marsad API Client
// Handles all communication between the frontend and the Laravel backend
// Uses localStorage to persist the auth token across page reloads

const MarsadAPI = {
  baseUrl: '/api',

  // Get the stored auth token
  getToken() {
    return localStorage.getItem('marsad_token');
  },

  // Store the auth token
  setToken(token) {
    localStorage.setItem('marsad_token', token);
  },

  // Remove the auth token and user data
  clearToken() {
    localStorage.removeItem('marsad_token');
    localStorage.removeItem('marsad_user');
  },

  // Check if a user is currently logged in
  isAuthenticated() {
    return !!this.getToken();
  },

  // Get user data from localStorage
  getUser() {
    try {
      return JSON.parse(localStorage.getItem('marsad_user'));
    } catch (e) {
      return null;
    }
  },

  // Save user data to localStorage
  setUser(user) {
    localStorage.setItem('marsad_user', JSON.stringify(user));
  },

  // Build request headers, optionally including the auth token
  headers(includeAuth = true) {
    const h = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const csrfMeta = document.querySelector('meta[name="csrf-token"]');
    if (csrfMeta) {
      h['X-CSRF-TOKEN'] = csrfMeta.getAttribute('content');
    }
    if (includeAuth && this.getToken()) {
      h['Authorization'] = 'Bearer ' + this.getToken();
    }
    return h;
  },

  // Generic fetch wrapper with error handling
  async request(method, endpoint, body = null, auth = true) {
    const opts = {
      method: method,
      headers: this.headers(auth),
    };
    if (body && method !== 'GET') {
      opts.body = JSON.stringify(body);
    }
    const response = await fetch(this.baseUrl + endpoint, opts);
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Request failed');
      error.status = response.status;
      error.errors = data.errors || {};
      throw error;
    }

    return data;
  },

  // --- Auth ---

  // Register a new account, store token
  async register(name, email, password, passwordConfirmation) {
    const data = await this.request('POST', '/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }, false);
    this.setToken(data.token);
    this.setUser(data.user);
    return data;
  },

  // Log in with email and password, store token
  async login(email, password) {
    const data = await this.request('POST', '/login', { email, password }, false);
    this.setToken(data.token);
    this.setUser(data.user);
    return data;
  },

  // Log out, clear local state even if server call fails
  async logout() {
    try {
      await this.request('POST', '/logout');
    } catch (e) {}
    this.clearToken();
  },

  // Fetch current user profile from server
  async fetchUser() {
    const user = await this.request('GET', '/user');
    this.setUser(user);
    return user;
  },

  // --- Incidents ---

  // Get all incidents with optional filters (location, type, search, status)
  async getIncidents(filters = {}) {
    const params = new URLSearchParams();
    if (filters.location) params.append('location', filters.location);
    if (filters.type) params.append('type', filters.type);
    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    const queryStr = params.toString();
    const endpoint = '/incidents' + (queryStr ? '?' + queryStr : '');
    return await this.request('GET', endpoint, null, false);
  },

  // Get a single incident by ID
  async getIncident(id) {
    return await this.request('GET', '/incidents/' + id, null, false);
  },

  // Submit a new incident report
  async createIncident(location, type, time, note) {
    return await this.request('POST', '/incidents', {
      location, type, time, note,
    });
  },

  // Update an existing incident report
  async updateIncident(id, location, type, time, note) {
    return await this.request('PUT', `/incidents/${id}`, {
      location, type, time, note,
    });
  },

  // Delete an incident report
  async deleteIncident(id) {
    return await this.request('DELETE', `/incidents/${id}`);
  },

  // Get dashboard statistics
  async getStats() {
    return await this.request('GET', '/stats', null, false);
  },

  // --- Votes ---

  // Cast or toggle a vote on an incident
  async vote(incidentId, action) {
    return await this.request('POST', '/incidents/' + incidentId + '/vote', { action });
  },

  // Get all votes by the current user
  async getUserVotes() {
    if (!this.isAuthenticated()) return {};
    return await this.request('GET', '/user/votes');
  },
};

// Toggle navbar buttons based on login state
function updateNavbarAuth() {
  const loginItem    = document.getElementById('nav-login-item');
  const registerItem = document.getElementById('nav-register-item');
  const logoutItem   = document.getElementById('nav-logout-item');
  const userName     = document.getElementById('nav-user-name');

  if (MarsadAPI.isAuthenticated()) {
    const user = MarsadAPI.getUser();
    if (loginItem) loginItem.style.display = 'none';
    if (registerItem) registerItem.style.display = 'none';
    if (logoutItem) logoutItem.style.display = '';
    if (userName && user) userName.textContent = user.name + ' (Logout)';
  } else {
    if (loginItem) loginItem.style.display = '';
    if (registerItem) registerItem.style.display = '';
    if (logoutItem) logoutItem.style.display = 'none';
  }
}

// Attach click handler to the logout nav link
function initLogoutHandler() {
  const logoutLink = document.getElementById('nav-logout-link');
  if (!logoutLink) return;
  logoutLink.addEventListener('click', async (e) => {
    e.preventDefault();
    await MarsadAPI.logout();
    updateNavbarAuth();
    showToast('Logged out successfully.', 'success');
    window.location.href = '/';
  });
}
