<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenemcoQuotedProductsModel extends Model
{
    //
    protected $table = 'genemco_quoted_products';
    public $timestamps = false;

    protected $fillable = [
    	'quote_id',
    	'product_id',
    	'product_key',
    	'product_variant',
    	'product_price',
    	'product_url',
    	'product_image',
    	'product_title',
    	'product_variant_title',
    	'product_description'
    ];
}
