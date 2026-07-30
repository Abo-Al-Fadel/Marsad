<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;

// Rate limiters are defined in App\Providers\AppServiceProvider.

// Auth (Public)
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:register'); // Create account → returns token
Route::post('/login',    [AuthController::class, 'login'])->middleware('throttle:login');       // Login → returns token

// Incidents & Stats (Public)
Route::middleware('throttle:public')->group(function () {
    Route::get('/incidents',      [IncidentController::class, 'index']); // List/filter all incidents
    Route::get('/incidents/{id}', [IncidentController::class, 'show']);  // Get single incident by ID
    Route::get('/stats',          [IncidentController::class, 'stats']); // Total/verified/unverified/rejected counts
});

// Protected (requires auth:sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']); // Revoke token & clear session
    Route::get('/user',    [AuthController::class, 'user']);    // Get current logged-in user

    Route::middleware('throttle:reports')->group(function () {
        Route::post('/incidents',        [IncidentController::class, 'store']);   // Submit new incident report
        Route::put('/incidents/{id}',    [IncidentController::class, 'update']);  // Edit an existing incident
        Route::delete('/incidents/{id}', [IncidentController::class, 'destroy']); // Delete an existing incident
    });

    Route::post('/incidents/{id}/vote', [VoteController::class, 'vote'])->middleware('throttle:votes'); // Cast/switch/remove vote

    Route::get('/incidents/{id}/vote', [VoteController::class, 'getUserVote']);  // Get user's vote on one incident
    Route::get('/user/votes',          [VoteController::class, 'getUserVotes']); // Get all user's votes (bulk load)
});
