<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHubspotDealIdToGenemcoQuoteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('genemco_quote', function (Blueprint $table) {
            $table->string('hubspot_deal_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('genemco_quote', function (Blueprint $table) {
            $table->dropColumn('hubspot_deal_id');
        });
    }
}
