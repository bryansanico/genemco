<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeGenemcoQuotedProductsTableProductUrlLength extends Migration
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
            $table->string('product_url', 300)->change();
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
        Schema::table('genemco_quoted_products', function (Blueprint $table) {
            $table->string('product_url', 100)->change();
        });
    }
}
