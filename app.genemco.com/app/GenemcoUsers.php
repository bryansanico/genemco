<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenemcoUsers extends Model
{
    //
    protected $table = 'genemco_users';
    public $timestamps = false;

    protected $fillable = [
    	'user_id',
        'user_status',
        'first_name',
        'last_name',
        'company_name',
        'email',
        'phone',
        'city',
        'state',
        'country',
        'preferred_language'
    ];
}
