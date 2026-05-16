// Handle a user clicking a vote button (confirm or reject) — now uses API
async function handleVote(id, action) {
  if (!MarsadAPI.isAuthenticated()) {
    showToast('Please log in to vote.', 'error');
    return;
  }

  try {
    const result = await MarsadAPI.vote(id, action);
    
    // Update local incident data
    const incident = incidents.find(i => i.id === id);
    if (incident) {
      incident.confirms = result.confirms;
      incident.rejects = result.rejects;
      incident.status = result.status;
    }

    updateVoteUI(id, result.vote, result);
  } catch (err) {
    showToast(err.message || 'Vote failed.', 'error');
  }
}

// Update the UI elements (buttons, counts, status badge) after a vote
function updateVoteUI(id, activeAction, data) {
  const card = document.querySelector(`.incident-card[data-id="${id}"]`);
  if (!card) return;
  const confirmBtn = card.querySelector('.vote-btn--confirm');
  const rejectBtn = card.querySelector('.vote-btn--reject');
  const confirmCount = document.getElementById(`confirm-${id}`);
  const rejectCount = document.getElementById(`reject-${id}`);
  if (confirmCount) confirmCount.textContent = data.confirms;
  if (rejectCount) rejectCount.textContent = data.rejects;
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
    statusBadge.className = 'status-badge status-badge--' + statusClass(data.status);
    statusBadge.textContent = data.status;
  }
  if (typeof updateStats === 'function') {
    updateStatsFromAPI();
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

// Fetch and update stats from the API
async function updateStatsFromAPI() {
  try {
    const stats = await MarsadAPI.getStats();
    const totalEl = document.getElementById('stat-total');
    const verifiedEl = document.getElementById('stat-verified');
    const unverifiedEl = document.getElementById('stat-unverified');
    const rejectedEl = document.getElementById('stat-rejected');
    if (totalEl) totalEl.textContent = stats.total;
    if (verifiedEl) verifiedEl.textContent = stats.verified;
    if (unverifiedEl) unverifiedEl.textContent = stats.unverified;
    if (rejectedEl) rejectedEl.textContent = stats.rejected;
  } catch (e) {
    // Silently fail for stats
  }
}