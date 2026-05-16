// Update the dashboard statistics (total, verified, unverified, rejected)
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
function renderCards(data) {
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
  const votes = getVotedIncidents();
  container.innerHTML = data.map(incident => {
    const votedAction = votes[incident.id];
    const confirmClasses = ['vote-btn', 'vote-btn--confirm', votedAction === 'confirm' ? 'vote-btn--active-confirm' : ''].filter(Boolean).join(' ');
    const rejectClasses = ['vote-btn', 'vote-btn--reject', votedAction === 'reject' ? 'vote-btn--active-reject' : ''].filter(Boolean).join(' ');
    return `
    <article class="incident-card" data-id="${incident.id}">
      <div class="incident-card__header">
        <h3 class="incident-card__title">${incident.title}</h3>
        <span class="incident-card__type incident-card__type--${typeClass(incident.type)}">
          <span class="incident-card__type-icon">${getTypeIcon(incident.type)}</span>
          ${incident.type}
        </span>
      </div>
      <div class="incident-card__meta">
        <span class="incident-card__meta-item">
          <span class="incident-card__meta-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </span>
          ${incident.location}
        </span>
        <span class="incident-card__meta-item">
          <span class="incident-card__timestamp">${formatTimestamp(incident.time)}</span>
        </span>
        <span class="incident-card__relative-time">${relativeTime(incident.time)}</span>
      </div>
      ${incident.note ? `<p class="incident-card__note">${incident.note}</p>` : ''}
      <div class="incident-card__footer">
        <span class="status-badge status-badge--${statusClass(incident.status)}">${incident.status}</span>
        <div class="vote-group">
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
          <div class="timeline__item-title">${incident.title}</div>
          <div class="timeline__item-location">
            <span class="timeline__item-location-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            ${incident.location} — ${incident.type}
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

// Filter the active incidents by location and/or type
function filterIncidents(location, type) {
  let filtered = [...incidents];
  if (location !== 'all') filtered = filtered.filter(i => i.location === location);
  if (type !== 'all') {
    const typeLower = type.toLowerCase();
    filtered = filtered.filter(i => i.type.toLowerCase().includes(typeLower));
  }
  filtered.sort((a, b) => new Date(b.time) - new Date(a.time));
  renderCards(filtered);
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
  renderCards(filtered);
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
      <span class="popup-detail"><strong>Location:</strong> ${incident.location}</span>
      <span class="popup-detail"><strong>Type:</strong> ${incident.type}</span>
      <span class="popup-detail"><strong>Time:</strong> ${formatTimestamp(incident.time)}</span>
      <span class="popup-detail"><strong>Verified by:</strong> ${incident.confirms} people</span>
      <span class="popup-detail"><strong>Rejected by:</strong> ${incident.rejects} people</span>`;
  }
  if (noteEl) noteEl.textContent = incident.note || 'No additional notes provided.';
  if (statusEl) {
    statusEl.className = 'status-badge status-badge--' + statusClass(incident.status);
    statusEl.textContent = incident.status;
  }
  modal.classList.add('modal--visible');
  document.body.style.overflow = 'hidden';
}

// Close the incident details modal
function closeIncidentModal() {
  const modal = document.getElementById('incident-modal');
  if (!modal) return;
  modal.classList.remove('modal--visible');
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
      if (e.key === 'Escape' && modal.classList.contains('modal--visible')) closeIncidentModal();
    });
  }
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.incident-card');
    if (!card) return;
    if (e.target.closest('.vote-group')) return;
    const id = parseInt(card.dataset.id, 10);
    openIncidentModal(id);
  });
}

let autoRefreshInterval = null;

// Generate a mock incident and add it to the feed (for demo purposes)
function generateRandomIncident() {
  const type = sampleAutoTypes[Math.floor(Math.random() * sampleAutoTypes.length)];
  const location = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
  const titlesForType = sampleTitles[type] || sampleTitles['Other'];
  const titlePrefix = titlesForType[Math.floor(Math.random() * titlesForType.length)];
  const status = sampleStatuses[Math.floor(Math.random() * sampleStatuses.length)];
  const note = sampleNotes[Math.floor(Math.random() * sampleNotes.length)];
  const now = new Date();
  const isoTime = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0') + 'T' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0');
  const newIncident = {
    id: generateId(),
    title: `${titlePrefix} ${location}`,
    location: location,
    type: type,
    time: isoTime,
    status: status,
    note: note,
    confirms: Math.floor(Math.random() * 10),
    rejects: Math.floor(Math.random() * 5)
  };
  incidents.unshift(newIncident);
  applyFilters();
  const container = document.getElementById('incidents-container');
  if (container && container.firstElementChild) {
    container.firstElementChild.classList.add('fade-in');
  }
}

// Start simulating incoming incidents automatically
function startAutoRefresh() {
  autoRefreshInterval = setInterval(generateRandomIncident, 12000);
}

// Stop simulating incoming incidents
function stopAutoRefresh() {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
    autoRefreshInterval = null;
  }
}