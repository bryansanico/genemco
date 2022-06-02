<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSentEmailToSalesRepByAdminToGenemcoQuoteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('genemco_quote', function (Blueprint $table) {
            $table->enum('sent_email_to_sales_rep_by_admin', ['yes', 'no'])->nullable()->after('sales_rep_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('genemco_quote', function (Blueprint $table) {
            $table->dropColumn('sent_email_to_sales_rep_by_admin');
        });
    }
}
