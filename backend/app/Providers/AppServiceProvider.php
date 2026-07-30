<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Fix MySQL key length for utf8mb4 on older InnoDB configs
        Schema::defaultStringLength(191);

        // Assets and generated links must not drop back to http:// once the
        // site is live, or browsers will block them as mixed content.
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        $this->configureRateLimiting();
    }

    // None of the API routes were throttled, so credentials could be brute
    // forced and accounts/reports created in bulk. Limits are keyed per user
    // where we know who is calling, and per IP otherwise.
    private function configureRateLimiting(): void
    {
        // Credential guessing: strict, and keyed on the email being tried as
        // well as the IP so one attacker cannot lock out an entire network.
        RateLimiter::for('login', fn (Request $request) => [
            Limit::perMinute(5)->by($request->ip()),
            Limit::perMinute(5)->by(strtolower((string) $request->input('email'))),
        ]);

        // Account creation: generous enough for a shared network, tight enough
        // that the users table cannot be flooded.
        RateLimiter::for('register', fn (Request $request) => Limit::perHour(10)->by($request->ip()));

        // Submitting and editing incident reports.
        RateLimiter::for('reports', fn (Request $request) => Limit::perMinute(15)->by($request->user()?->id ?: $request->ip()));

        // Voting is a single click, so allow a brisk pace but not a script.
        RateLimiter::for('votes', fn (Request $request) => Limit::perMinute(60)->by($request->user()?->id ?: $request->ip()));

        // Public reads, including the dashboard's 15-second auto-refresh poll.
        RateLimiter::for('public', fn (Request $request) => Limit::perMinute(120)->by($request->ip()));
    }
}
