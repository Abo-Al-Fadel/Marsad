@extends('layouts.app')

@section('title', 'Incident Map')
@section('description', 'Marsad — Interactive map of real-time incidents across Lebanon. Live markers for airstrikes, explosions, drone activity, and shelling.')

@section('head')
  <!-- Leaflet.js CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
@endsection

@section('footer')
  <footer class="footer" id="footer">
    <div class="container">
      <p class="footer__text">&copy; 2026 <span>Marsad</span> — Incident Monitoring System</p>
      <div class="footer__status">
        <span class="footer__status-dot"></span>
        System Operational
      </div>
    </div>
  </footer>
@endsection

@section('scripts')
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
@endsection

@section('content')
  <!-- Map Section -->
  <div class="map-wrapper">
    <div id="map"></div>

    <div class="map-header">
      <div class="live-indicator">
        <span class="live-indicator__dot"></span>
        Live
      </div>
      <span class="map-header__title">Incident Map — Lebanon</span>
      <span class="map-header__count" id="map-incident-count"></span>
    </div>

    <div class="map-legend">
      <div class="map-legend__title">Incident Types</div>
      <div class="map-legend__list" style="max-height: 250px; overflow-y: auto; padding-right: 5px;">
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#cc0000;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg></span>
          <span class="map-legend__label">Airstrike</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#888888;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></span>
          <span class="map-legend__label">Ambush</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#888888;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></span>
          <span class="map-legend__label">Armed Clash</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#8833cc;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
          <span class="map-legend__label">Artillery Fire</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#e05555;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></svg></span>
          <span class="map-legend__label">Bombing</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#3377ff;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/><path d="M2 7l4 3m12-3l-4 3M2 17l4-3m12 3l-4-3"/><rect x="6" y="10" width="12" height="4" rx="1"/></svg></span>
          <span class="map-legend__label">Drone Strike</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#ff8c00;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
          <span class="map-legend__label">Explosion</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#ff6633;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 1 0-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="12" r="3"/></svg></span>
          <span class="map-legend__label">Fire</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#cc6600;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
          <span class="map-legend__label">Gunfire</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#ff3366;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg></span>
          <span class="map-legend__label">Missile Launch</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#8833cc;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
          <span class="map-legend__label">Shelling</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#3377ff;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M2 7l4 3m12-3l-4 3M2 17l4-3m12 3l-4-3"/><rect x="6" y="10" width="12" height="4" rx="1"/></svg></span>
          <span class="map-legend__label">Surveillance Drone</span>
        </div>
        <div class="map-legend__item">
          <span class="map-legend__icon" style="color:#888888;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></span>
          <span class="map-legend__label">Other</span>
        </div>
      </div>
    </div>
  </div>
@endsection
