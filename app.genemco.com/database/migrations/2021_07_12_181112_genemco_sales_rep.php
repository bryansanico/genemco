<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GenemcoSalesRep extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Genemco Quote table
        Schema::create('genemco_sales_rep', function(Blueprint $table) {
            $table->id();
            $table->char('sales_rep_id', 200);
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('email')->nullable();
            $table->string('phone');
            $table->text('email_content_english')->nullable();
            $table->text('email_content_spanish')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('genemco_sales_rep');
    }
}
