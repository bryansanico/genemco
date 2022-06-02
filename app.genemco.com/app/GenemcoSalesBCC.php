<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenemcoSalesBCC extends Model
{
    //
    protected $table = 'genemco_sales_bcc';
    public $timestamps = false;

    protected $fillable = [
        'first_name',
        'last_name',
        'email'
    ];
}