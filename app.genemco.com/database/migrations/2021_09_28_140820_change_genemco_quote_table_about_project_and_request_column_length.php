<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeGenemcoQuoteTableAboutProjectAndRequestColumnLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('genemco_quote', function (Blueprint $table) {
            $table->string('about_project_and_request', 1000)->change();
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
            $table->string('about_project_and_request')->change();
        });
    }
}
