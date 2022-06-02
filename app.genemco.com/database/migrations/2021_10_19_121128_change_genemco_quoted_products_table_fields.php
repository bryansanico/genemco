<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeGenemcoQuotedProductsTableFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('genemco_quoted_products', function (Blueprint $table) {
            $table->string('product_title', 300)->change();
            $table->longText('product_description', 5000)->change();
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
        $table->string('product_title', 100)->change();
        $table->longText('product_description')->change();
    }
}
