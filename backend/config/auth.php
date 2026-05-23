<?php

use App\Models\User;

return [
    // Default authentication guard and password broker
    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    // Defined guards (how users authenticate, e.g., session or token)
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
    ],

    // User Providers (where user data is retrieved from, like Eloquent)
    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => env('AUTH_MODEL', User::class),
        ],
    ],

    // Password rules (stores tokens, expiration time, and throttling limits)
    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    // Time before asking to re-enter password for sensitive actions (10800s = 3h)
    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),
];
