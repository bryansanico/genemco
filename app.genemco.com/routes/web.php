<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
	return App::call('App\Http\Controllers\RequestQuote@renderAdminHome');
})->middleware(['auth.shopify'])->name('home');

Route::get('/quote/{quote_id}', function($quote_id) {
	return App::call('App\Http\Controllers\RequestQuote@renderAdminQuote', ['quoteID' => $quote_id]);
})->middleware(['auth.shopify']);

Route::get('/sales_rep', function() {
	return App::call('App\Http\Controllers\RequestQuote@renderAdminSalesRep');
})->middleware(['auth.shopify']);

Route::get('/mergeQuotes/{email}', function($email) {
	return App::call('App\Http\Controllers\RequestQuote@renderMergeQuotes', ['email' => $email]);
})->middleware(['auth.shopify']);

Route::get('/ajaxRequestQuoteCheckout', function() {
	return App::call('App\Http\Controllers\RequestQuote@renderQuoteView');
});

Route::match(['get', 'post'], '/ajaxSubmitQuote', function() {
	return App::call('App\Http\Controllers\RequestQuote@ajaxSubmitQuote');
});

Route::get('/ajaxMyQuotes', function() {
	return App::call('App\Http\Controllers\RequestQuote@ajaxMyQuotes');
});

Route::get('/ajaxQuotedProducts', function() {
	return App::call('App\Http\Controllers\RequestQuote@ajaxQuotedProducts');
});

Route::get('/ajaxProductHistory', function() {
	return App::call('App\Http\Controllers\RequestQuote@ajaxProductHistory');
});

Route::get('/ajaxProductRemove', function() {
	return App::call('App\Http\Controllers\RequestQuote@ajaxProductRemove');
});

Route::get('/ajaxProductTrash', function() {
	return App::call('App\Http\Controllers\RequestQuote@ajaxProductTrash');
});

Route::get('/ajaxProductRecover', function() {
	return App::call('App\Http\Controllers\RequestQuote@ajaxProductRecover');
});

Route::get('/ajaxProductApprove', function() {
	return App::call('App\Http\Controllers\RequestQuote@ajaxProductApprove');
});

Route::post('/ajaxAddProductsToExistingQuote', function() {
	return App::call('App\Http\Controllers\RequestQuote@ajaxAddProductsToExistingQuote');
});

Route::match(['get', 'post'], '/adminAjax', function() {
	return App::call('App\Http\Controllers\RequestQuote@adminAjax');
});

Route::match(['get', 'post'], '/frontAjax', function() {
	return App::call('App\Http\Controllers\RequestQuote@frontAjax');
});