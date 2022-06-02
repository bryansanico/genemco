<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddQuoteConfirmationIdSpanishColumnToGenemcoHubspotSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('genemco_hubspot_settings', function (Blueprint $table) {
            $table->char('quote_confirmation_id_spanish', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('genemco_hubspot_settings', function (Blueprint $table) {
            $table->dropColumn('quote_confirmation_id_spanish');
        });
    }
}
