<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenemcoSalesRep extends Model
{
    //
    protected $table = 'genemco_sales_rep';
    public $timestamps = false;

    protected $fillable = [
    	'sales_rep_id',
        'first_name',
        'last_name',
        'email',
        'phone'
    ];
}