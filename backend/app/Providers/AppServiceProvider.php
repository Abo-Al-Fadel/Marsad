<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    // Fix MySQL key length for utf8mb4 on older InnoDB configs
    public function boot(): void
    {
        Schema::defaultStringLength(191);
    }
}
