<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GenemcoHubspotSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
         Schema::create('genemco_hubspot_settings', function(Blueprint $table) {
            $table->id();
            $table->char('hubspot_api_key', 100);
            $table->char('hubspot_sender_name', 100);
            $table->char('hubspot_sender_email_address', 100);
            $table->char('quote_confirmation_id', 100);
            $table->char('email_to_customer_id', 100);
            $table->char('email_to_sales_rep_id', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('genemco_hubspot_settings');
    }
}
