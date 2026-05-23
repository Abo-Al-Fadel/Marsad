<?php

use Illuminate\Support\Str;

return [

    // Auto-stripped comment block

    'driver' => env('SESSION_DRIVER', 'database'),

    // Auto-stripped comment block

    'lifetime' => (int) env('SESSION_LIFETIME', 120),

    'expire_on_close' => env('SESSION_EXPIRE_ON_CLOSE', false),

    // Auto-stripped comment block

    'encrypt' => env('SESSION_ENCRYPT', false),

    // Auto-stripped comment block

    'files' => storage_path('framework/sessions'),

    // Auto-stripped comment block

    'connection' => env('SESSION_CONNECTION'),

    // Auto-stripped comment block

    'table' => env('SESSION_TABLE', 'sessions'),

    // Auto-stripped comment block

    'store' => env('SESSION_STORE'),

    // Auto-stripped comment block

    'lottery' => [2, 100],

    // Auto-stripped comment block

    'cookie' => env(
        'SESSION_COOKIE',
        Str::slug((string) env('APP_NAME', 'laravel')).'-session'
    ),

    // Auto-stripped comment block

    'path' => env('SESSION_PATH', '/'),

    // Auto-stripped comment block

    'domain' => env('SESSION_DOMAIN'),

    // Auto-stripped comment block

    'secure' => env('SESSION_SECURE_COOKIE'),

    // Auto-stripped comment block

    'http_only' => env('SESSION_HTTP_ONLY', true),

    // Auto-stripped comment block

    'same_site' => env('SESSION_SAME_SITE', 'lax'),

    // Auto-stripped comment block

    'partitioned' => env('SESSION_PARTITIONED_COOKIE', false),

    // Auto-stripped comment block

    'serialization' => 'json',

];
