@extends('layouts.app')

@section('title', 'Report Incident')
@section('description', 'Marsad — Submit a new incident report. Help verify and document events across Lebanon in real time.')

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

@section('content')
  <!-- Report Form -->
  <main class="form-page">
    <div class="form-container form-container--wide">
      <h1 class="form__title">Report an Incident</h1>
      <p class="form__subtitle">
        Submit details about an incident you witnessed. All reports are reviewed before publication.
      </p>
      <form id="report-form" method="POST" action="" novalidate>
        <div class="form__group">
          <label class="form__label" for="incident_location">Location</label>
          <div class="autocomplete-wrapper">
            <input type="text" class="form__input" id="incident_location" name="incident_location"
              placeholder="Search or select location..." autocomplete="off" required />
            <div class="autocomplete-list" id="incident_location-list"></div>
          </div>
          <div class="form__error" id="incident_location-error"></div>
        </div>
        <div class="form__group">
          <label class="form__label" for="incident_type">Incident Type</label>
          <div class="autocomplete-wrapper">
            <input type="text" class="form__input" id="incident_type" name="incident_type"
              placeholder="Search or type incident type..." autocomplete="off" required />
            <div class="autocomplete-list" id="incident_type-list"></div>
          </div>
          <div class="form__error" id="incident_type-error"></div>
        </div>
        <div class="form__group">
          <label class="form__label" for="incident_time">Exact Time</label>
          <input type="datetime-local" class="form__input" id="incident_time" name="incident_time" required />
          <div class="form__error" id="incident_time-error"></div>
        </div>
        <div class="form__group">
          <label class="form__label" for="incident_note">
            Additional Notes <span
              style="font-weight: 400; text-transform: none; letter-spacing: 0; color: var(--text-muted);">(optional)</span>
          </label>
          <textarea class="form__textarea" id="incident_note" name="incident_note" rows="4"
            placeholder="Describe what you witnessed — sounds, visuals, damage, etc."></textarea>
          <div class="form__error" id="incident_note-error"></div>
        </div>
        <button type="submit" class="form__submit" id="report-submit">Submit Report</button>
        <div class="form__success" id="report-success">✓ Your report has been submitted and is pending review.</div>
      </form>
    </div>
  </main>
@endsection
