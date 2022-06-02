<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GenemcoSalesCc extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('genemco_sales_cc', function(Blueprint $table) {
            $table->id();
            $table->char('sales_cc_id', 200);
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('email')->nullable();
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
        Schema::drop('genemco_sales_cc');
    }
}
