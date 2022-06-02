<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestQuoteModel extends Model
{
    //
    protected $table = 'genemco_quote';
    public $timestamps = true;

    protected $fillable = [
    	'ordered',
    	'order_id',
    	'approved',
    	'status',
    	'quote_id',
    	'role_in_this_project',
    	'project_timeline',
    	'about_project_and_request',
        'deal_subject',
    	'user_id',
    	'sales_rep_id',
    	'created_at',
    	'updated_at'
    ];
}