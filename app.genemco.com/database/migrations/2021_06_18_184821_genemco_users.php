<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GenemcoUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Create genemco_users table
        Schema::create('genemco_users', function(Blueprint $table) {
            $table->id();
            $table->char('user_id', 200);
            $table->enum('user_status', ['registered', 'guest']);
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('company_name', 100);
            $table->string('email')->nullable();
            $table->string('phone');
            $table->string('city');
            $table->string('state');
            $table->string('country');
            $table->string('preferred_language');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //Drop genemco_users table
        Schema::drop('genemco_users');
    }
}
