<?php

use Illuminate\Support\Facades\Route;

// Serve the Blade views for each page. The frontend JS handles all
// data loading via AJAX calls to the /api/* endpoints.

Route::get('/',         fn() => view('index'))->name('home');     // Dashboard / live feed
Route::get('/map',      fn() => view('map'))->name('map');        // Interactive map page
Route::get('/report',   fn() => view('report'))->name('report');   // Report submission form
Route::get('/login',    fn() => view('login'))->name('login');     // Login form
Route::get('/register', fn() => view('register'))->name('register'); // Registration form

