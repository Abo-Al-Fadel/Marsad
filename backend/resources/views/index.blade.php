@extends('layouts.app')

@section('title', 'Live Dashboard')
@section('description', 'Marsad — Real-time incident reporting and visualization system for monitoring the Lebanon–Israel war. Live dashboard with verified reports.')

@section('footer')
  <!-- Footer -->
  <footer class="footer footer--enhanced" id="footer">
    <div class="container">
      <div class="footer__grid">
        <!-- About -->
        <div>
          <div class="footer__brand">
            <div class="footer__brand-dot"></div>
            <h3 class="footer__brand-name">Marsad</h3>
          </div>
          <p class="footer__about">
            A real-time incident monitoring platform providing accurate, crowd-sourced information across Lebanon.
            Our mission is to keep the public informed through community verification and transparent reporting.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="footer__heading">Quick Links</h4>
          <ul class="footer__links">
            <li><a href="/">Live Feed</a></li>
            <li><a href="/map">Interactive Map</a></li>
            <li><a href="/report">Submit Report</a></li>
          </ul>
        </div>

        <!-- Status -->
        <div>
          <h4 class="footer__heading">System Status</h4>
          <div class="footer__system-badge">
            <span class="footer__system-dot"></span>
            <span class="footer__system-label">All Systems Operational</span>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">&copy; 2026 Marsad. All rights reserved.</p>
        <p class="footer__signature">Designed for Lebanon</p>
      </div>
    </div>
  </footer>
@endsection

@section('content')
  <!-- Main Content -->
  <main class="main-content">
    <div class="container">

      <!-- Live Status Indicator -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
        <div class="section-header" style="margin-bottom: 0;">
          <div class="section-header__indicator"></div>
          <h1 class="section-header__title">Incident Feed</h1>
          <span class="section-header__count" id="incident-count">— reports</span>
        </div>
        <div class="live-indicator" id="live-indicator">
          <span class="live-indicator__dot"></span>
          Live
        </div>
      </div>

      <!-- Stats Summary Bar -->
      <div class="stats-bar" id="stats-bar">
        <div class="stats-bar__item">
          <span class="stats-bar__dot stats-bar__dot--total"></span>
          <span class="stats-bar__label">Total</span>
          <span class="stats-bar__value" id="stat-total">—</span>
        </div>
        <div class="stats-bar__divider"></div>
        <div class="stats-bar__item">
          <span class="stats-bar__dot stats-bar__dot--verified"></span>
          <span class="stats-bar__label">Verified</span>
          <span class="stats-bar__value" id="stat-verified">—</span>
        </div>
        <div class="stats-bar__divider"></div>
        <div class="stats-bar__item">
          <span class="stats-bar__dot stats-bar__dot--unverified"></span>
          <span class="stats-bar__label">Unverified</span>
          <span class="stats-bar__value" id="stat-unverified">—</span>
        </div>
        <div class="stats-bar__divider"></div>
        <div class="stats-bar__item">
          <span class="stats-bar__dot stats-bar__dot--rejected"></span>
          <span class="stats-bar__label">Rejected</span>
          <span class="stats-bar__value" id="stat-rejected">—</span>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar" id="filter-bar">
        <span class="filter-bar__label">Filter</span>
        <div class="filter-bar__divider"></div>
        <div class="search-bar">
          <svg class="search-bar__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" class="search-bar__input" id="search-input" placeholder="Search incidents..."
            autocomplete="off" aria-label="Search incidents" />
        </div>
        <div class="autocomplete-wrapper autocomplete-wrapper--icon">
          <svg class="autocomplete-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input type="text" class="filter-bar__select filter-bar__select--icon" id="filter-location"
            placeholder="Search location..." autocomplete="off" aria-label="Filter by location" />
          <div class="autocomplete-list" id="filter-location-list"></div>
        </div>
        <div class="autocomplete-wrapper autocomplete-wrapper--icon">
          <svg class="autocomplete-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <input type="text" class="filter-bar__select filter-bar__select--icon" id="filter-type"
            placeholder="Search type..." autocomplete="off" aria-label="Filter by incident type" />
          <div class="autocomplete-list" id="filter-type-list"></div>
        </div>
      </div>

      <!-- Incident Cards Grid -->
      <section id="incidents-container" class="incidents-grid" aria-label="Incident reports">
        <div class="incident-card skeleton" style="height: 220px;"></div>
        <div class="incident-card skeleton" style="height: 220px;"></div>
        <div class="incident-card skeleton" style="height: 220px;"></div>
        <div class="incident-card skeleton" style="height: 220px;"></div>
      </section>

      <!-- Empty state -->
      <div class="empty-state" id="empty-state" style="display: none;">
        <div class="empty-state__icon">📡</div>
        <p class="empty-state__text">No incidents match the selected filters.</p>
      </div>

      <!-- Timeline Section -->
      <div style="margin-top: 48px;">
        <div class="section-header">
          <div class="section-header__indicator"></div>
          <h2 class="section-header__title">Timeline</h2>
        </div>
        <section id="timeline-container" class="timeline" aria-label="Incident timeline"></section>
      </div>

    </div>
  </main>

  <!-- Incident Detail Modal -->
  <div class="modal-overlay" id="incident-modal">
    <div class="modal">
      <button class="modal__close" aria-label="Close modal">&times;</button>
      <h2 class="modal__title" id="modal-title"></h2>
      <div class="modal__meta" id="modal-meta"></div>
      <div class="modal__note-label">Additional Notes</div>
      <p class="modal__note" id="modal-note"></p>
      <div class="modal__footer">
        <span class="status-badge" id="modal-status"></span>
        <div class="modal__vote-buttons">
          <span class="modal__vote-label">Vote:</span>
          <button class="vote-btn vote-btn--confirm" id="modal-vote-confirm" aria-label="Confirm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            Confirm
          </button>
          <button class="vote-btn vote-btn--reject" id="modal-vote-reject" aria-label="Reject">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
            </svg>
            Reject
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Incident Modal -->
  <div class="modal-overlay" id="edit-incident-modal">
    <div class="modal" style="display: flex; flex-direction: column;">
      <button class="modal__close" id="edit-modal-close" aria-label="Close edit modal">&times;</button>
      <h2 class="modal__title">Edit Incident</h2>
      <form id="edit-incident-form" class="form" style="margin-top: 16px;">
        <input type="hidden" id="edit-incident-id">
        
        <div class="form__group autocomplete-wrapper form__group-wrapper">
          <label class="form__label" for="edit-location">Location</label>
          <input type="text" class="form__input" id="edit-location" required autocomplete="off">
          <div class="autocomplete-list" id="edit-location-list"></div>
        </div>
        
        <div class="form__group autocomplete-wrapper form__group-wrapper">
          <label class="form__label" for="edit-type">Incident Type</label>
          <input type="text" class="form__input" id="edit-type" required autocomplete="off">
          <div class="autocomplete-list" id="edit-type-list"></div>
        </div>

        <div class="form__group">
          <label class="form__label" for="edit-date">Date & Time</label>
          <input type="datetime-local" class="form__input" id="edit-date" required>
        </div>

        <div class="form__group">
          <label class="form__label" for="edit-note">Additional Details</label>
          <textarea class="form__input form__textarea" id="edit-note" rows="4"></textarea>
        </div>

        <div id="edit-error" class="form__error" style="display: none; margin-bottom: 12px;"></div>

        <button type="submit" class="button button--primary" style="width: 100%; padding: 14px; font-size: 0.9rem; font-weight: 700; background-color: var(--red-primary); color: #fff; border: none; border-radius: var(--radius-sm); letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all 0.2s ease;">Save Changes</button>
      </form>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div class="modal-overlay" id="delete-confirm-modal">
    <div class="modal" style="text-align: center; max-width: 400px;">
      <button class="modal__close" aria-label="Close">&times;</button>
      <div style="margin: 16px 0 8px;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h2 class="modal__title" style="margin-bottom: 8px;">Delete Incident</h2>
      <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 24px;">
        Are you sure you want to delete this incident report?<br>
        <strong style="color: var(--text-primary);">This action cannot be undone.</strong>
      </p>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="delete-confirm__cancel" style="padding: 10px 24px; font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); background-color: var(--bg-surface-alt); border: 1px solid var(--border-color); border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s ease;">Cancel</button>
        <button class="delete-confirm__confirm" style="padding: 10px 24px; font-size: 0.82rem; font-weight: 700; color: #fff; background-color: #dc2626; border: none; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s ease;">Delete</button>
      </div>
    </div>
  </div>
@endsection
