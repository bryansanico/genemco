<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Log;

class AfterAuthenticateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Create and add gememco js file to site
        $shop = Auth::user();
        // $shopApi = $shop->api()->rest('POST', '/admin/api/script_tags.json', 
        //     array('script_tag' => array(
        //         'event'    => 'onload',
        //         'src'   => 'https://app.genemco.com/js/genemco-app.js'
        //     ))
        // );
    }
}
