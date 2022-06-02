<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GenemcoQuotedProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Genemco Quoted Products table
        Schema::create('genemco_quoted_products', function(Blueprint $table) {
            $table->id();
            $table->boolean('approved'); // Approval from customer
            $table->boolean('genemco_updated'); // Approval from Genemco
            $table->boolean('isactive'); //If this product is deleted or active
            $table->boolean('approved_by_admin'); //If this product is approved to show PRICE and other infos
            $table->char('quote_id', 100);
            $table->char('product_history_id', 100);
            $table->longText('admin_comment');
            $table->string('product_id', 100);
            $table->string('product_key', 100);
            $table->string('product_variant', 100);
            $table->decimal('product_price', 10, 2);
            $table->string('product_url', 100);
            $table->string('product_image', 300);
            $table->string('product_title', 100);
            $table->string('product_sku', 30)->nullable();
            $table->string('product_variant_title', 100);
            $table->longText('product_description');
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
        Schema::drop('genemco_quoted_products');
    }
}
