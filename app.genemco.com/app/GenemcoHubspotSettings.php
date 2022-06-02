<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenemcoHubspotSettings extends Model
{
    //
    protected $table = 'genemco_hubspot_settings';
    public $timestamps = false;

    protected $fillable = [
        'hubspot_api_key',
        'hubspot_sender_name',
        'hubspot_sender_email_address',
        'quote_confirmation_id',
        'email_to_customer_id',
        'email_to_sales_rep_id',
        'quote_confirmation_id_spanish',
        'email_to_customer_id_spanish',
        'email_to_sales_rep_id_spanish'
    ];
}
