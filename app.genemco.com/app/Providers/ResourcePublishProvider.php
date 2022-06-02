<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ResourcePublishProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
        $this->publishes([
                     __DIR__ . 'resources/js' => public_path('assets/js'),
        ], 'public');
    }
}
