<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="@yield('description', 'Marsad — Real-time incident reporting and visualization system for monitoring the Lebanon–Israel war.')">
  <meta name="author" content="Marsad Project">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Marsad — @yield('title', 'Live Dashboard')</title>
  @yield('head')
  <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>

<body>

  <!-- Navbar -->
  <nav class="navbar" id="navbar">
    <div class="container">
      <a href="/" class="navbar__logo">
        <span class="navbar__logo-icon"></span>
        Marsad
      </a>
      <button class="navbar__toggle" id="nav-toggle" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="navbar__links" id="nav-links">
        <li><a href="/" class="navbar__link @if(request()->is('/')) navbar__link--active @endif">
            <svg class="navbar__link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </a></li>
        <li><a href="/map" class="navbar__link @if(request()->is('map')) navbar__link--active @endif">
            <svg class="navbar__link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Map
          </a></li>
        <li><a href="/report" class="navbar__link @if(request()->is('report')) navbar__link--active @endif">
            <svg class="navbar__link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Report
          </a></li>
        <li id="nav-login-item"><a href="/login" class="navbar__link @if(request()->is('login')) navbar__link--active @endif">
            <svg class="navbar__link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Login
          </a></li>
        <li id="nav-register-item"><a href="/register" class="navbar__link @if(request()->is('register')) navbar__link--active @endif">
            <svg class="navbar__link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            Register
          </a></li>
        {{-- Logout link (shown when authenticated via JS) --}}
        <li id="nav-logout-item" style="display:none;">
          <a href="#" class="navbar__link" id="nav-logout-link">
            <svg class="navbar__link-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span id="nav-user-name">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  @yield('content')

  <!-- Toast Container -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Back-to-Top Button -->
  <button class="back-to-top" id="back-to-top" aria-label="Back to top" title="Back to top">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  </button>

  @yield('footer')

  <!-- Scripts -->
  <script src="{{ asset('js/utils.js') }}"></script>
  <script src="{{ asset('js/data.js') }}"></script>
  <script src="{{ asset('js/api.js') }}"></script>
  <script src="{{ asset('js/votes.js') }}"></script>
  <script src="{{ asset('js/autocomplete.js') }}"></script>
  <script src="{{ asset('js/ui.js') }}"></script>
  <script src="{{ asset('js/map.js') }}"></script>
  <script src="{{ asset('js/forms.js') }}"></script>
  <script src="{{ asset('js/main.js') }}"></script>
  @yield('scripts')

</body>

</html>
