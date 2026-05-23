// Retrieve the list of voted incidents from session storage
function getVotedIncidents() {
  try {
    return JSON.parse(sessionStorage.getItem('marsad_votes') || '{}');
  } catch (e) {
    return {};
  }
}

// Save a user's vote action (confirm/reject) for an incident to session storage
function saveVote(id, action) {
  const votes = getVotedIncidents();
  if (action === null) {
    delete votes[id];
  } else {
    votes[id] = action;
  }
  sessionStorage.setItem('marsad_votes', JSON.stringify(votes));
}

// Get the current vote action for a specific incident
function getVoteAction(id) {
  const votes = getVotedIncidents();
  return votes[id] || null;
}

// Handle a user clicking a vote button (confirm or reject)
function handleVote(id, action) {
  const incident = incidents.find(i => i.id === id);
  if (!incident) return;
  const currentVote = getVoteAction(id);
  if (currentVote === action) {
    if (action === 'confirm') {
      incident.confirms = Math.max(0, incident.confirms - 1);
    } else {
      incident.rejects = Math.max(0, incident.rejects - 1);
    }
    saveVote(id, null);
    updateVoteUI(id, null, incident);
    return;
  }
  if (currentVote) {
    if (currentVote === 'confirm') {
      incident.confirms = Math.max(0, incident.confirms - 1);
    } else {
      incident.rejects = Math.max(0, incident.rejects - 1);
    }
  }
  if (action === 'confirm') {
    incident.confirms++;
  } else {
    incident.rejects++;
  }
  const diff = incident.confirms - incident.rejects;
  if (diff >= 10) {
    incident.status = 'Verified';
  } else if (diff <= -10) {
    incident.status = 'Rejected';
  } else {
    incident.status = 'Unverified';
  }
  saveVote(id, action);
  updateVoteUI(id, action, incident);
}

// Update the UI elements (buttons, counts, status badge) after a vote
function updateVoteUI(id, activeAction, incident) {
  const card = document.querySelector(`.incident-card[data-id="${id}"]`);
  if (!card) return;
  const confirmBtn = card.querySelector('.vote-btn--confirm');
  const rejectBtn = card.querySelector('.vote-btn--reject');
  const confirmCount = document.getElementById(`confirm-${id}`);
  const rejectCount = document.getElementById(`reject-${id}`);
  if (confirmCount) confirmCount.textContent = incident.confirms;
  if (rejectCount) rejectCount.textContent = incident.rejects;
  if (confirmBtn) confirmBtn.classList.remove('vote-btn--active-confirm');
  if (rejectBtn) rejectBtn.classList.remove('vote-btn--active-reject');
  if (activeAction === 'confirm' && confirmBtn) {
    confirmBtn.classList.add('vote-btn--active-confirm');
    animateBounce(confirmCount);
  }
  if (activeAction === 'reject' && rejectBtn) {
    rejectBtn.classList.add('vote-btn--active-reject');
    animateBounce(rejectCount);
  }
  const statusBadge = card.querySelector('.status-badge');
  if (statusBadge) {
    statusBadge.className = 'status-badge status-badge--' + statusClass(incident.status);
    statusBadge.textContent = incident.status;
  }
  if (typeof updateStats === 'function') {
    updateStats(incidents);
  }
}

// Add a bounce animation effect to an element
function animateBounce(el) {
  if (!el) return;
  el.style.transition = 'transform 0.15s ease';
  el.style.transform = 'scale(1.35)';
  setTimeout(() => {
    el.style.transform = 'scale(1)';
  }, 160);
}