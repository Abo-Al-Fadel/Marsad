// Global state for incidents and user votes
let incidents = [];
let currentUserVotes = {};

// Wait for the page to load before setting up our core features
document.addEventListener('DOMContentLoaded', async function () {
  // Always initialize common UI
  initDemoBar();
  initNavbarToggle();
  initBackToTop();
  updateNavbarAuth();
  initLogoutHandler();

  // Dashboard page: load incidents from API
  const incidentsContainer = document.getElementById('incidents-container');
  if (incidentsContainer) {
    try {
      // Load incidents from API
      const data = await MarsadAPI.getIncidents();
      incidents = data;
      incidents.sort((a, b) => new Date(b.time) - new Date(a.time));

      // Load user votes if authenticated
      if (MarsadAPI.isAuthenticated()) {
        try {
          currentUserVotes = await MarsadAPI.getUserVotes();
        } catch (e) {
          currentUserVotes = {};
        }
      }

      renderCards(incidents, currentUserVotes);
      renderTimeline(incidents);
    } catch (e) {
      // If API fails, show empty state
      incidentsContainer.innerHTML = '';
      const emptyState = document.getElementById('empty-state');
      if (emptyState) {
        emptyState.style.display = 'block';
        emptyState.querySelector('.empty-state__text').textContent = 'Failed to load incidents. Please try again later.';
      }
    }

    initAutocomplete('filter-location', 'filter-location-list', lebaneseLocations, () => {
      applyFilters();
    }, false);
    initAutocomplete('filter-type', 'filter-type-list', incidentTypes, () => {
      applyFilters();
    }, true);
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        handleSearch(e.target.value);
      });
    }
    initIncidentModal();
    initEditModal();
    initDeleteConfirmModal();
    startAutoRefresh();
  }

  // Map page: load incidents and init map
  initMap();

  // Form pages
  initReportForm();
  initLoginForm();
  initRegisterForm();
});