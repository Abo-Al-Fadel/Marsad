@extends('layouts.app')

@section('title', 'Login')
@section('description', 'Marsad — Log in to your account to manage and verify incident reports across Lebanon.')

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
  <!-- Login Form -->
  <main class="form-page">
    <div class="form-container">
      <h1 class="form__title">Welcome Back</h1>
      <p class="form__subtitle">Log in to access your dashboard and manage reports.</p>
      <form id="login-form" method="POST" action="" novalidate>
        <div class="form__group">
          <label class="form__label" for="login_email">Email Address</label>
          <input type="email" class="form__input" id="login_email" name="email" placeholder="you@example.com"
            autocomplete="email" required />
          <div class="form__error" id="login_email-error"></div>
        </div>
        <div class="form__group">
          <label class="form__label" for="login_password">Password</label>
          <input type="password" class="form__input" id="login_password" name="password"
            placeholder="Minimum 6 characters" autocomplete="current-password" required />
          <div class="form__error" id="login_password-error"></div>
        </div>
        <button type="submit" class="form__submit" id="login-submit">Log In</button>
        <div class="form__success" id="login-success">✓ Login successful. Redirecting…</div>
      </form>
      <p class="form__footer">
        Don't have an account? <a href="/register">Create one</a>
      </p>
    </div>
  </main>
@endsection
