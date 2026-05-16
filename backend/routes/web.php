<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Serve the Blade views for each page. The frontend JS handles all
| data loading via AJAX calls to the /api/* endpoints.
|
*/

Route::get('/',         fn() => view('index'))->name('home');
Route::get('/map',      fn() => view('map'))->name('map');
Route::get('/report',   fn() => view('report'))->name('report');
Route::get('/login',    fn() => view('login'))->name('login');
Route::get('/register', fn() => view('register'))->name('register');
