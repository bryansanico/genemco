<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenemcoSalesCC extends Model
{
    //
    protected $table = 'genemco_sales_cc';
    public $timestamps = false;

    protected $fillable = [
        'first_name',
        'last_name',
        'email'
    ];
}