<?php

return [
    // Application Name (used in emails/UI)
    'name' => env('APP_NAME', 'Laravel'),

    // Environment (e.g., 'local', 'production')
    'env' => env('APP_ENV', 'production'),

    // Debug Mode (true = show detailed error pages)
    'debug' => (bool) env('APP_DEBUG', false),

    // Application URL (used by console commands)
    'url' => env('APP_URL', 'http://localhost'),

    // Default Timezone for PHP date functions
    'timezone' => 'Asia/Beirut',

    // Default language localization
    'locale' => env('APP_LOCALE', 'en'),

    // Fallback language if translation is missing
    'fallback_locale' => env('APP_FALLBACK_LOCALE', 'en'),

    // Language used to generate dummy data
    'faker_locale' => env('APP_FAKER_LOCALE', 'en_US'),

    // Encryption Cypher (Do not change)
    'cipher' => 'AES-256-CBC',

    // Master encryption key
    'key' => env('APP_KEY'),

    // Previous keys for decrypting legacy data
    'previous_keys' => [
        ...array_filter(
            explode(',', (string) env('APP_PREVIOUS_KEYS', ''))
        ),
    ],

    // Maintenance Mode Configuration
    'maintenance' => [
        'driver' => env('APP_MAINTENANCE_DRIVER', 'file'),
        'store' => env('APP_MAINTENANCE_STORE', 'database'),
    ],
];
