<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenemcoEmailHistory extends Model
{
    //
    protected $table = 'genemco_email_history';
    public $timestamps = false;

    protected $fillable = [
        'quote_id',
        'email_history',
        'created_at',
        'updated_at'
    ];
}
