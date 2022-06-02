<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GenemcoProductHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Create genemco_product_history table
        Schema::create('genemco_product_history', function(Blueprint $table) {
            $table->id();
            $table->char('product_history_id', 100);
            $table->char('old_price', 20);
            $table->char('new_price', 20);
            $table->string('comment', 200);
            $table->char('from', 10);
            $table->char('status', 10);
            $table->longText('product_history');
            $table->dateTime('created_at', 0);
            $table->dateTime('updated_at', 0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop genemco_product_history table
        Schema::drop('genemco_product_history');
    }
}
