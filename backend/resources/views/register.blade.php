@extends('layouts.app')

@section('title', 'Register')
@section('description', 'Marsad — Create an account to report and verify incidents across Lebanon in real time.')

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
  <!-- Register Form -->
  <main class="form-page">
    <div class="form-container">
      <h1 class="form__title">Create Account</h1>
      <p class="form__subtitle">Join Marsad to submit and verify incident reports.</p>
      <form id="register-form" method="POST" action="" novalidate>
        <div class="form__group">
          <label class="form__label" for="register_name">Full Name</label>
          <input type="text" class="form__input" id="register_name" name="name" placeholder="Your full name"
            autocomplete="name" required />
          <div class="form__error" id="register_name-error"></div>
        </div>
        <div class="form__group">
          <label class="form__label" for="register_email">Email Address</label>
          <input type="email" class="form__input" id="register_email" name="email" placeholder="you@example.com"
            autocomplete="email" required />
          <div class="form__error" id="register_email-error"></div>
        </div>
        <div class="form__group">
          <label class="form__label" for="register_password">Password</label>
          <input type="password" class="form__input" id="register_password" name="password"
            placeholder="Minimum 6 characters" autocomplete="new-password" required />
          <div class="form__error" id="register_password-error"></div>
        </div>
        <div class="form__group">
          <label class="form__label" for="register_password_confirmation">Confirm Password</label>
          <input type="password" class="form__input" id="register_password_confirmation" name="password_confirmation"
            placeholder="Re-enter your password" autocomplete="new-password" required />
          <div class="form__error" id="register_password_confirmation-error"></div>
        </div>
        <button type="submit" class="form__submit" id="register-submit">Create Account</button>
        <div class="form__success" id="register-success">✓ Account created successfully. You can now log in.</div>
      </form>
      <p class="form__footer">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  </main>
@endsection
