<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | The Marsad frontend is served by this same Laravel application, so the
    | browser never makes a cross-origin API call in normal use. Laravel's
    | default of allowed_origins: ['*'] is therefore wider than necessary; this
    | narrows it to the app's own URL. Add extra origins to CORS_ALLOWED_ORIGINS
    | (comma separated) only if you later host the frontend separately.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_values(array_filter(array_map(
        'trim',
        explode(',', (string) env('CORS_ALLOWED_ORIGINS', (string) env('APP_URL', 'http://localhost')))
    ))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
