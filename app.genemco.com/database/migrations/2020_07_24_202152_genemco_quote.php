<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GenemcoQuote extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Genemco Quote table
        Schema::create('genemco_quote', function(Blueprint $table) {
            $table->id();
            $table->boolean('ordered');
            $table->string('order_id', 50);
            $table->boolean('approved'); // Approval from Genemco
            $table->enum('status', ['new', 'active', 'saved_for_later', 'converted_to_order', 'not_responsive', 'deleted']);
            $table->char('quote_id', 100);
            $table->dateTime('created_at', 0);
            $table->dateTime('updated_at', 0);
            $table->string('role_in_this_project');
            $table->string('project_timeline');
            $table->string('about_project_and_request');
            $table->string('deal_subject');
            $table->char('user_id', 200);
            $table->char('sales_rep_id', 200)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('genemco_quote');
    }
}
