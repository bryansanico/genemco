<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenemcoProductHistory extends Model
{
    //
    protected $table = 'genemco_product_history';
    public $timestamps = false;

    protected $fillable = [
    	'product_history_id',
    	'product_history',
    	'created_at',
    	'updated_at'
    ];
}
