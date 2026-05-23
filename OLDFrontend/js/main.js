// Wait for the page to load before setting up our core features
document.addEventListener('DOMContentLoaded', function () {
  initNavbarToggle();
  initBackToTop();
  const incidentsContainer = document.getElementById('incidents-container');
  if (incidentsContainer) {
    incidents.sort((a, b) => new Date(b.time) - new Date(a.time));
    renderCards(incidents);
    renderTimeline(incidents);
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
    startAutoRefresh();
  }
  initMap();
  initReportForm();
  initLoginForm();
  initRegisterForm();
});