<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Public endpoints (no auth required):
|   - GET  /api/incidents        → List/filter incidents
|   - GET  /api/incidents/{id}   → Single incident
|   - GET  /api/stats            → Dashboard statistics
|   - POST /api/register         → Create account
|   - POST /api/login            → Login
|
| Protected endpoints (auth required):
|   - POST /api/logout                     → Logout
|   - GET  /api/user                       → Current user
|   - POST /api/incidents                  → Submit report
|   - POST /api/incidents/{id}/vote        → Cast vote
|   - GET  /api/incidents/{id}/vote        → Get user's vote
|   - GET  /api/user/votes                 → All user votes
|
*/

// --- Public routes ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::get('/incidents',      [IncidentController::class, 'index']);
Route::get('/incidents/{id}', [IncidentController::class, 'show']);
Route::get('/stats',          [IncidentController::class, 'stats']);

// --- Protected routes (require Sanctum token) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user',    [AuthController::class, 'user']);

    Route::post('/incidents',             [IncidentController::class, 'store']);
    Route::post('/incidents/{id}/vote',   [VoteController::class, 'vote']);
    Route::get('/incidents/{id}/vote',    [VoteController::class, 'getUserVote']);
    Route::get('/user/votes',             [VoteController::class, 'getUserVotes']);
});
