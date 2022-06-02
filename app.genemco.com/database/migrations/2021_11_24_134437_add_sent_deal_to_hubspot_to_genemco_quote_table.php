<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSentDealToHubspotToGenemcoQuoteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('genemco_quote', function (Blueprint $table) {
            $table->enum('sent_deal_to_hubspot', ['yes', 'no'])->nullable();
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
            $table->dropColumn('sent_deal_to_hubspot');
        });
    }
}
