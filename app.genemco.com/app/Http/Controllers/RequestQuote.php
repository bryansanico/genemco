<?php

namespace App\Http\Controllers;

use App\Http\Controllers\HubspotMessage;
use App\Http\Controllers\HubspotDeal;
use App\RequestQuoteModel;
use App\GenemcoQuotedProductsModel;
use App\GenemcoProductHistory;
use App\GenemcoUsers;
use App\GenemcoSalesRep;
use App\GenemcoSalesBCC;
use App\GenemcoSalesCC;
use App\GenemcoEmailHistory;
use App\GenemcoHubspotSettings;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Log;

class RequestQuote extends Controller
{

    private $shop = null;
    private $hubspotMessage = null;
    private $hubspotDeal = null;

    public function __construct() {
        $this->shop = Auth::user();
        $this->hubspotMessage = new HubspotMessage();
        $this->hubspotDeal = new HubspotDeal();
    }

    private function unserializeArray($data) {

        $result = [];

        foreach ($data as $key => $value) {
            $result[$value['name']] = $value['value'];
        }

        return $result;
    }

    private function removeProduct($quoteID, $productID, $variantID) {

        return GenemcoQuotedProductsModel::where([
            ['quote_id', '=', $quoteID],
            ['product_id', '=', $productID],
            ['product_variant', '=', $variantID]
        ])->delete();

    }

    public function renderMergeQuotes(Request $request, $email) {

        if ($request->exists('quote_ids')) {
            $ids = explode(',', $request->input('quote_ids'));
            $quoteModelID = -1;
            $email = $request->input('quote_email');
            $first_name = '';
            $last_name = '';
            $address1 = '';
            $address2 = '';
            $city = '';
            $country = '';
            $province = '';
            $zip = '';
            $customer_id = 'Guest';
            $quote_id = '';

            foreach ($ids as $id) {
                $quoteModel = RequestQuoteModel::where('id', $id)->first();

                if ($quoteModelID == -1) { // If it's first requested quote, let's keep it
                    $quoteModelID = $quoteModel->id;
                    $quote_id = $quoteModel->quote_id;
                } else { // Otherwise delete the quote
                    RequestQuoteModel::where('id', $id)->delete();
                }

                // Get customer info from requested quotes
                if ( $first_name == '' ) $first_name = $quoteModel->first_name;
                if ( $last_name == '' ) $last_name = $quoteModel->last_name;
                if ( $address1 == '' ) $address1 = $quoteModel->address1;
                if ( $address2 == '' ) $address2 = $quoteModel->address2;
                if ( $city == '' ) $city = $quoteModel->city;
                if ( $country == '' ) $country = $quoteModel->country;
                if ( $province == '' ) $province = $quoteModel->province;
                if ( $zip == '' ) $zip = $quoteModel->zip;
                if ( $customer_id == 'Guest' ) $customer_id = $quoteModel->customer_id;

                $productsToBeMerged = GenemcoQuotedProductsModel::where('quote_id', $quoteModel->quote_id)->get();

                foreach ($productsToBeMerged as $key => $productToBeMerged) {
                    $product_id = $productToBeMerged->product_id;

                    // If there is no same product, then add, else delete
                    if (GenemcoQuotedProductsModel::where([['quote_id', '=', $quote_id], ['product_id', '=', $product_id]])->get()->count() == 0) {
                        GenemcoQuotedProductsModel::where([['quote_id', '=', $quoteModel->quote_id], ['product_id', '=', $product_id]])->update(['quote_id' => $quote_id]);
                    } else {
                        GenemcoQuotedProductsModel::where([['quote_id', '=', $quoteModel->quote_id], ['product_id', '=', $product_id]])->delete();
                    }
                }
            }

            // Update the first requested quote's info with proper ones from requested qutoes info
            RequestQuoteModel::where('id', $quoteModelID)->update([
                'first_name'    => $first_name,
                'last_name'     => $last_name,
                'address1'      => $address1,
                'address2'      => $address2,
                'city'          => $city,
                'country'       => $country,
                'province'      => $province,
                'zip'           => $zip,
                'customer_id'   => $customer_id,
                'quote_id'      => $quote_id
            ]);

            // Render the merge_view page with merged quotes
            return view('merge_view', [ 'quotes' => RequestQuoteModel::all()->where('email', $email), 'email' => $email, 'quote_ids' => $ids ]);
        } else {
            // Render the merge_view page with requested email address
            return view('merge_view', [ 'quotes' => RequestQuoteModel::all()->where('email', $email), 'email' => $email ]);
        }
    }

    public function renderAdminHome(Request $request) {
        
        if ($request->exists('per_page')) :
            $perPage = $request->input('per_page');
        else:
            $perPage = 25;
        endif;

        if ($request->exists('status')) {
            $status =  $request->input('status');
        } else {
            $status =  'new';
        }

        if ($request->exists('search_term')) {
            $search_term =  trim($request->input('search_term'));
            $quotes = RequestQuoteModel::join('genemco_users', function($join) {
                $join->on('genemco_quote.user_id', '=', 'genemco_users.user_id');
            })->where('genemco_users.first_name', 'LIKE', '%'. $search_term . '%' )->orWhere('genemco_users.last_name', 'LIKE', '%'. $search_term . '%')->orWhere('genemco_users.email', '=', $search_term)->orWhere('genemco_users.company_name', '=', $search_term)->where('genemco_quote.status', $status)->distinct()->orderBy('genemco_quote.created_at', 'DESC')->paginate($perPage);
            // $quotes = RequestQuoteModel::join('genemco_users', 'genemco_quote.user_id', '=', 'genemco_users.user_id')->orderBy('created_at', 'DESC')->paginate($perPage);
        } else {
            $search_term = "";
            $quotes = RequestQuoteModel::where('status', $status)->orderBy('created_at', 'DESC')->paginate($perPage);
            // $quotes = RequestQuoteModel::join('genemco_users', function($join) {
            //     $join->on('genemco_quote.user_id', '=', 'genemco_users.user_id');
            // })->orderBy('genemco_quote.created_at', 'DESC')->paginate($perPage);
        }

        $users = [];
        $quoted_products = [];
        $salesRep = [];
        foreach ($quotes as $quote) {
            if (!array_key_exists($quote->user_id, $users)) {
                $users[$quote->user_id] = GenemcoUsers::all()->where('user_id', $quote->user_id)->first();
            }
            if (!array_key_exists($quote->quote_id, $quoted_products)) {
                $quoted_products[$quote->quote_id] = GenemcoQuotedProductsModel::all()->where('quote_id', $quote->quote_id);
            }
        }
        $salesRep = GenemcoSalesRep::all();

        return view('admin.home', [ 
            'quotes' => $quotes, 
            'users' => $users,
            'quoted_products' => $quoted_products,
            'sales_reps' => $salesRep,
            'perPage' => $perPage,
            'status' => $status,
            'search_term' => $search_term
        ]);
    }

    public function renderAdminQuote($quoteID) {
        $shop = Auth::user();
        $domain = $shop->getDomain()->toNative();

        $products = GenemcoQuotedProductsModel::all()->where('quote_id', $quoteID);
        $quote = RequestQuoteModel::all()->where('quote_id', $quoteID)->first();
        $customer = GenemcoUsers::all()->where('user_id', $quote->user_id)->first();
        $salesRep = GenemcoSalesRep::all();

        return view('admin.quote', [ 
            'products'  => $products, 
            'quote'     => $quote,
            'customer'  => $customer,
            'salesRep'  => $salesRep,
            'domain'    => $domain
        ]);
    }

    public function renderAdminSalesRep(Request $request) {
        $shop = Auth::user();
        $domain = $shop->getDomain()->toNative();

        if ($request->exists('per_page')) :
            $perPage = $request->input('per_page');
        else:
            $perPage = 25;
        endif;

        if ($request->exists('page')) :
            $page = $request->input('page');
        else:
            $page = 1;
        endif;

        $hubspotSettings = GenemcoHubspotSettings::all()->first();
        $salesRep = GenemcoSalesRep::paginate($perPage);
        $salesCC = GenemcoSalesCC::all();
        $salesBCC = GenemcoSalesBCC::all();

        return view('admin.salesRep', [
            'hubspotSettings' => $hubspotSettings,
            'salesRep'  => $salesRep,
            'perPage'   => $perPage,
            'page'      => $page,
            'salesCC'   => $salesCC,
            'salesBCC'  => $salesBCC
        ]);
    }

    public function ajaxMyQuotes() {

        $customer = $_REQUEST['customer'];
        $customerRecord = RequestQuoteModel::where('customer_id', $customer['id'])->get();
        $myQuotes = Array();

        foreach ($customerRecord as $key1 => $cust) {
            $quotedProductModel = GenemcoQuotedProductsModel::where('quote_id', $cust->quote_id)->get();
            $total_price = 0;

            foreach ($quotedProductModel as $key2 => $prod) {
                if ( $prod->approved_by_admin ) {
                    $total_price += $prod->product_price;
                }
            }

            $myQuotes[] = Array(
                'id'        => $cust->id,
                'quote_id'  => $cust->quote_id,
                'date'      => $cust->created_at->format('F j, Y'),
                'approved'  => $cust->approved,
                'ordered'   => $cust->ordered,
                'total'     => $total_price
            );
        }

        return response()->json(['success' => $myQuotes]);

    }

    public function ajaxQuotedProducts() {

        $quoteID = $_REQUEST['quoteID'];
        $quote = RequestQuoteModel::where('quote_id', $quoteID)->first();
        $quotedProducts = GenemcoQuotedProductsModel::where([
            ['quote_id', '=' ,$quoteID]
        ])->get();
        $result = Array();

        foreach ($quotedProducts as $key => $prod) {
            $result[] = Array(
                'approved'              => $prod->approved,
                'genemco_updated'       => $prod->genemco_updated,
                'isactive'              => $prod->isactive,
                'quote_id'              => $prod->quote_id,
                'product_history_id'    => $prod->product_history_id,
                'admin_comment'         => $prod->admin_comment,
                'product_id'            => $prod->product_id,
                'product_key'           => $prod->product_key,
                'product_variant'       => $prod->product_variant,
                'product_price'         => $prod->product_price,
                'product_url'           => $prod->product_url,
                'product_image'         => $prod->product_image,
                'product_title'         => $prod->product_title,
                'product_variant_title' => $prod->product_variant_title,
                'approved_by_admin'     => $prod->approved_by_admin
            );
        }

        return response()->json(['success' => $result]);        

    }

    public function ajaxProductHistory() {

        $historyID = $_REQUEST['historyID'];

        $historyArray = GenemcoProductHistory::where('product_history_id', $historyID)->orderBy('created_at', 'desc')->get();
        $result = Array();

        foreach ($historyArray as $key => $history) {
            $result[] = array(
                'old_price' => $history->old_price,
                'new_price' => $history->new_price,
                'comment'   => $history->comment,
                'from'      => $history->from,
                'status'    => $history->status,
                'date'      => date('F j, Y', strtotime($history->created_at))
            );
        }

        return response()->json(['success' => $result]);  
    }

    public function ajaxProductRemove() {
        $productID = $_REQUEST['productID'];
        $variantID = $_REQUEST['variantID'];
        $quoteID = $_REQUEST['quoteID'];

        $result = $this->removeProduct($quoteID, $productID, $variantID);

        return response()->json(['success' => $result]);
    }

    public function ajaxProductTrash() {
        $productID = $_REQUEST['productID'];
        $variantID = $_REQUEST['variantID'];
        $quoteID = $_REQUEST['quoteID'];     

        $quote = RequestQuoteModel::where('quote_id', $quoteID)->first();

        $result = GenemcoQuotedProductsModel::where([
            ['quote_id', '=', $quoteID],
            ['product_id', '=', $productID],
            ['product_variant', '=', $variantID]
        ])->update(array(
            'isactive'      => false,
            'updated_at'    => Carbon::now()->toDateTimeString()
        ));

        $quotedProducts = GenemcoQuotedProductsModel::where([
            ['quote_id', '=', $quoteID],
            ['isactive', '=', false]
        ])->get();

        $result = Array();

        foreach ($quotedProducts as $key => $prod) {
            $result[] = Array(
                'approved'              => $prod->approved,
                'genemco_updated'       => $prod->genemco_updated,
                'isactive'              => $prod->isactive,
                'quote_id'              => $prod->quote_id,
                'product_history_id'    => $prod->product_history_id,
                'admin_comment'         => $prod->admin_comment,
                'product_id'            => $prod->product_id,
                'product_key'           => $prod->product_key,
                'product_variant'       => $prod->product_variant,
                'product_price'         => $prod->product_price,
                'product_url'           => $prod->product_url,
                'product_image'         => $prod->product_image,
                'product_title'         => $prod->product_title,
                'product_variant_title' => $prod->product_variant_title,
                'approved_by_admin'     => $prod->approved_by_admin
            );
        }

        return response()->json(['success' => $result]);
    }

    public function ajaxProductRecover() {
        $productID = $_REQUEST['productID'];
        $variantID = $_REQUEST['variantID'];
        $quoteID = $_REQUEST['quoteID'];

        $quote = RequestQuoteModel::where('quote_id', $quoteID)->first();

        $result = GenemcoQuotedProductsModel::where([
            ['quote_id', '=', $quoteID],
            ['product_id', '=', $productID],
            ['product_variant', '=', $variantID]
        ])->update(array(
            'isactive'      => true,
            'updated_at'    => Carbon::now()->toDateTimeString()
        ));

        $quotedProducts = GenemcoQuotedProductsModel::where([
            ['quote_id', '=', $quoteID]
        ])->get();

        $result = Array();

        foreach ($quotedProducts as $key => $prod) {
            $result[] = Array(
                'approved'              => $prod->approved,
                'genemco_updated'       => $prod->genemco_updated,
                'isactive'              => $prod->isactive,
                'quote_id'              => $prod->quote_id,
                'product_history_id'    => $prod->product_history_id,
                'admin_comment'         => $prod->admin_comment,
                'product_id'            => $prod->product_id,
                'product_key'           => $prod->product_key,
                'product_variant'       => $prod->product_variant,
                'product_price'         => $prod->product_price,
                'product_url'           => $prod->product_url,
                'product_image'         => $prod->product_image,
                'product_title'         => $prod->product_title,
                'product_variant_title' => $prod->product_variant_title,
                'approved_by_admin'     => $prod->approved_by_admin
            );
        }

        return response()->json(['success' => $result]);
    }

    public function ajaxProductApprove() {
        $productID = $_REQUEST['productID'];
        $variantID = $_REQUEST['variantID'];
        $quoteID = $_REQUEST['quoteID'];
        $userComment = $_REQUEST['userComment'];
        $approveStatus = $_REQUEST['approveStatus'];
        $price = $_REQUEST['price'];

        $historyID = GenemcoQuotedProductsModel::where([
            ['quote_id', '=' , $quoteID],
            ['product_id', '=' , $productID],
            ['product_variant', '=' , $variantID]
        ])->first()->product_history_id;

        $createdAt = Carbon::now()->toDateTimeString();
        $GenemcoProductHistory = new GenemcoProductHistory;

        if ( $approveStatus == 'true' ) {

            GenemcoQuotedProductsModel::where([
                ['quote_id', '=' , $quoteID],
                ['product_id', '=' , $productID],
                ['product_variant', '=' , $variantID]
            ])->update(array(
                'approved'  => true
            ));

        } else {
            GenemcoQuotedProductsModel::where([
                ['quote_id', '=' , $quoteID],
                ['product_id', '=' , $productID],
                ['product_variant', '=' , $variantID]
            ])->update(array(
                'approved'  => false,
                'genemco_updated'   => false
            ));
        }

        $GenemcoProductHistory->product_history_id = $historyID;
        $GenemcoProductHistory->old_price = $price;
        $GenemcoProductHistory->new_price = $price;
        $GenemcoProductHistory->comment = $userComment;
        $GenemcoProductHistory->from = 'Customer';
        $GenemcoProductHistory->status = ( $approveStatus == 'true' ? 'Approved' : 'Rejected' );
        $GenemcoProductHistory->product_history = ( $approveStatus == 'true' ? 'Approved' : 'Rejected' ) . ' on ' . $createdAt->format('F j, Y') . ' "' . $userComment . "'";
        $GenemcoProductHistory->created_at = $createdAt;
        $GenemcoProductHistory->updated_at = $createdAt;

        $GenemcoProductHistory->save();

        return response()->json(['success' => $approveStatus]);

    }

	public function ajaxSubmitQuote() {

		$quote = $_REQUEST['quote'];

        $quoteArray = $this->unserializeArray($quote);

		$RequestQuoteModel = new RequestQuoteModel;

        $createdAt = Carbon::now()->toDateTimeString();
        $quoteID = md5($createdAt);

        $RequestQuoteModel->ordered = false;
        $RequestQuoteModel->order_id = '';
        $RequestQuoteModel->approved = false;
		$RequestQuoteModel->email = array_key_exists('quote[contact_info]', $quoteArray) ? $quoteArray['quote[contact_info]'] : '';
        $RequestQuoteModel->status = 'new';
        $RequestQuoteModel->first_name = array_key_exists('quote[shipping_address][first_name]', $quoteArray) ? $quoteArray['quote[shipping_address][first_name]'] : '';
        $RequestQuoteModel->last_name = array_key_exists('quote[shipping_address][last_name]', $quoteArray) ? $quoteArray['quote[shipping_address][last_name]'] : '';
        $RequestQuoteModel->address1 = array_key_exists('quote[shipping_address][address1]', $quoteArray) ? $quoteArray['quote[shipping_address][address1]']: '';
        $RequestQuoteModel->address2 = array_key_exists('quote[shipping_address][address2]', $quoteArray) ? $quoteArray['quote[shipping_address][address2]']: '';
        $RequestQuoteModel->city = array_key_exists('quote[shipping_address][city]', $quoteArray) ? $quoteArray['quote[shipping_address][city]'] : '';
        $RequestQuoteModel->country = array_key_exists('quote[shipping_address][country]', $quoteArray)? $quoteArray['quote[shipping_address][country]'] : '';
        $RequestQuoteModel->province = array_key_exists('quote[shipping_address][province]', $quoteArray) ? $quoteArray['quote[shipping_address][province]']: '';
        $RequestQuoteModel->zip = array_key_exists('quote[shipping_address][zip]', $quoteArray) ? $quoteArray['quote[shipping_address][zip]'] : '';
        if ( array_key_exists('quote[registered_customer]', $quoteArray) ) {
            $RequestQuoteModel->customer_id = $quoteArray['quote[registered_customer]']['id'];
            $quoteID .= $quoteArray['quote[registered_customer]']['id'];
        } else {
            $RequestQuoteModel->customer_id = 'Guest';
            $quoteID .= md5($quoteArray['quote[contact_info]']);
        }

        $RequestQuoteModel->quote_id = $quoteID;
        $RequestQuoteModel->created_at = $createdAt;
        $RequestQuoteModel->updated_at = Carbon::now()->toDateTimeString();

		$RequestQuoteModel->save();

        foreach ($quoteArray['quote[cart_item]'] as $key => $value) {

            $GenemcoQuotedProductsModel = new GenemcoQuotedProductsModel;

            $GenemcoQuotedProductsModel->quote_id = $quoteID;
            $GenemcoQuotedProductsModel->approved = false;
            $GenemcoQuotedProductsModel->genemco_updated = true;
            $GenemcoQuotedProductsModel->approved_by_admin = false;
            $GenemcoQuotedProductsModel->isactive = true;
            $GenemcoQuotedProductsModel->product_history_id = $quoteID . $key;
            $GenemcoQuotedProductsModel->admin_comment = '';
            $GenemcoQuotedProductsModel->product_id = $value['product_id'];
            $GenemcoQuotedProductsModel->product_key = $value['key'];
            $GenemcoQuotedProductsModel->product_variant = $value['variant_id'];
            $GenemcoQuotedProductsModel->product_price = intval($value['price']) / 100;
            $GenemcoQuotedProductsModel->product_url = $value['url'];
            $GenemcoQuotedProductsModel->product_image = $value['image'];
            $GenemcoQuotedProductsModel->product_title = $value['title'];
            $GenemcoQuotedProductsModel->product_variant_title = $value['variant_title'];
            $GenemcoQuotedProductsModel->product_description = htmlspecialchars($value['product_description']);
            $GenemcoQuotedProductsModel->created_at = Carbon::now()->toDateTimeString();
            $GenemcoQuotedProductsModel->updated_at = Carbon::now()->toDateTimeString();

            $GenemcoQuotedProductsModel->save();
        }

        print_r($quoteArray);

        // return response()->json(['success'=>$quote]);
		return 'true';
		
	}

    public function ajaxAddProductsToExistingQuote() {
        $quoteID = $_REQUEST['quoteID'];
        $selectedProducts = $_REQUEST['products'];

        $quote = RequestQuoteModel::where('quote_id', $quoteID)->first();
        $quotedProducts = GenemcoQuotedProductsModel::where([
            ['quote_id', '=', $quoteID]
        ])->get();

        $quotedProductsCount = $quotedProducts->count();

        foreach ($selectedProducts as $key => $selectedProduct) {
            if (GenemcoQuotedProductsModel::where([['quote_id', '=', $quoteID], ['product_id', '=', $selectedProduct['id']]])->first() === null && $selectedProduct['available'] == 'true') {
                $GenemcoQuotedProductsModel = new GenemcoQuotedProductsModel;

                $GenemcoQuotedProductsModel->quote_id = $quoteID;
                $GenemcoQuotedProductsModel->approved = false;
                $GenemcoQuotedProductsModel->genemco_updated = true;
                $GenemcoQuotedProductsModel->approved_by_admin = false;
                $GenemcoQuotedProductsModel->isactive = true;
                $GenemcoQuotedProductsModel->product_history_id = $quoteID . ++$quotedProductsCount;
                $GenemcoQuotedProductsModel->admin_comment = '';
                $GenemcoQuotedProductsModel->product_id = $selectedProduct['id'];
                $GenemcoQuotedProductsModel->product_key = $selectedProduct['id'];
                $GenemcoQuotedProductsModel->product_variant = $selectedProduct['id'];
                $GenemcoQuotedProductsModel->product_price = intval($selectedProduct['price']);
                $GenemcoQuotedProductsModel->product_url = $selectedProduct['url'];
                $GenemcoQuotedProductsModel->product_image = $selectedProduct['image'];
                $GenemcoQuotedProductsModel->product_title = $selectedProduct['title'];
                $GenemcoQuotedProductsModel->product_variant_title = $selectedProduct['title'];
                $GenemcoQuotedProductsModel->product_description = htmlspecialchars($selectedProduct['body']);
                $GenemcoQuotedProductsModel->created_at = Carbon::now()->toDateTimeString();
                $GenemcoQuotedProductsModel->updated_at = Carbon::now()->toDateTimeString();

                $GenemcoQuotedProductsModel->save();
            }
        }

        $newQuotedProducts = GenemcoQuotedProductsModel::where([
            ['quote_id', '=', $quoteID]
        ])->get();

        $result = Array();

        foreach ($newQuotedProducts as $key => $prod) {
            $result[] = Array(
                'approved'              => $prod->approved,
                'genemco_updated'       => $prod->genemco_updated,
                'isactive'              => $prod->isactive,
                'quote_id'              => $prod->quote_id,
                'product_history_id'    => $prod->product_history_id,
                'admin_comment'         => $prod->admin_comment,
                'product_id'            => $prod->product_id,
                'product_key'           => $prod->product_key,
                'product_variant'       => $prod->product_variant,
                'product_price'         => $prod->product_price,
                'product_url'           => $prod->product_url,
                'product_image'         => $prod->product_image,
                'product_title'         => $prod->product_title,
                'product_variant_title' => $prod->product_variant_title,
                'approved_by_admin'     => $prod->approved_by_admin
            );
        }

        return response()->json(['success' => $result]);
    }

    // Render Quote View
    public function renderQuoteView(Request $request) {
    	$input = $request->all();

    	ob_start();

    	?>

        <div id="genemco-quote-error-message" style="text-align: center; text-transform: capitalize; color: red; font-weight: bold;"></div>
    	<form class="genemco-quote-form" novalidate="novalidate" method="post">
    		<div class="form-row">
    			<div class="col-full">
    				<label>Contact information</label>
    				<input type="text" name="quote[contact_info]" placeholder="Email or mobile phone number">
    			</div>
    		</div>
    		<label>Shipping address</label>
    		<div class="form-group">
    			<div class="form-row">
    				<div class="col-half">
    					<input type="text" name="quote[shipping_address][first_name]" placeholder="First name(optional)">
    				</div>
    				<div class="col-half">
    					<input type="text" name="quote[shipping_address][last_name]" placeholder="Last name">
    				</div>
    			</div>
    			<div class="form-row">
    				<div class="col-full">
	    				<input type="text" name="quote[shipping_address][address1]" placeholder="Address">
	    			</div>
    			</div>
    			<div class="form-row">
    				<div class="col-full">
    					<input type="text" name="quote[shipping_address][address2]" placeholder="Apartment, suite, etc. (optional)" >
    				</div>
    			</div>
    			<div class="form-row">
    				<div class="col-full">
    					<input type="text" name="quote[shipping_address][city]" placeholder="City">
    				</div>    				
    			</div>
    			<div class="form-row">
    				<div class="col-one-third">
    					<select name="quote[shipping_address][country]">
    						<option data-code="United States" value="United States">United States</option>
    					</select>
    				</div>
    				<div class="col-one-third">
    					<select name="quote[shipping_address][province]">
    						<option value="Alabama">Alabama</option>
							<option value="Alaska">Alaska</option>
							<option value="Arizona">Arizona</option>
							<option value="Arkansas">Arkansas</option>
							<option value="California">California</option>
							<option value="Colorado">Colorado</option>
							<option value="Connecticut">Connecticut</option>
							<option value="Delaware">Delaware</option>
							<option value="District Of Columbia">District Of Columbia</option>
							<option value="Florida">Florida</option>
							<option value="Georgia">Georgia</option>
							<option value="Hawaii">Hawaii</option>
							<option value="Idaho">Idaho</option>
							<option value="Illinois">Illinois</option>
							<option value="Indiana">Indiana</option>
							<option value="Iowa">Iowa</option>
							<option value="Kansas">Kansas</option>
							<option value="Kentucky">Kentucky</option>
							<option value="Louisiana">Louisiana</option>
							<option value="Maine">Maine</option>
							<option value="Maryland">Maryland</option>
							<option value="Massachusetts">Massachusetts</option>
							<option value="Michigan">Michigan</option>
							<option value="Minnesota">Minnesota</option>
							<option value="Mississippi">Mississippi</option>
							<option value="Missouri">Missouri</option>
							<option value="Montana">Montana</option>
							<option value="Nebraska">Nebraska</option>
							<option value="Nevada">Nevada</option>
							<option value="New Hampshire">New Hampshire</option>
							<option value="New Jersey">New Jersey</option>
							<option value="New Mexico">New Mexico</option>
							<option value="New York">New York</option>
							<option value="North Carolina">North Carolina</option>
							<option value="North Dakota">North Dakota</option>
							<option value="Ohio">Ohio</option>
							<option value="Oklahoma">Oklahoma</option>
							<option value="Oregon">Oregon</option>
							<option value="Pennsylvania">Pennsylvania</option>
							<option value="Rhode Island">Rhode Island</option>
							<option value="South Carolina">South Carolina</option>
							<option value="South Dakota">South Dakota</option>
							<option value="Tennessee">Tennessee</option>
							<option value="Texas">Texas</option>
							<option value="Utah">Utah</option>
							<option value="Vermont">Vermont</option>
							<option value="Virginia">Virginia</option>
							<option value="Washington">Washington</option>
							<option value="West Virginia">West Virginia</option>
							<option value="Wisconsin">Wisconsin</option>
							<option value="Wyoming">Wyoming</option>
    					</select>
    				</div>
    				<div class="col-one-third">
    					<input type="text" name="quote[shipping_address][zip]">
    				</div>
    			</div>
    		</div>

    		<div class="form-footer">
    			<a class="step__footer__previous-link" href="/cart"><svg focusable="false" aria-hidden="true" class="icon-svg icon-svg--color-accent icon-svg--size-10 previous-link__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M8 1L7 0 3 4 2 5l1 1 4 4 1-1-4-4"></path></svg><span class="step__footer__previous-link-content">Return to Quote cart</span></a>
    			<button type="submit" class="quote-submit-btn" id="quote-submit" disabled>
    				Submit quote
    			</button>
    		</div>

    	</form>

    	<?php

    	$html = ob_get_clean();

    	return response()->json(['success'=>$html]);
    }

    //Store front ajax
    public function frontAjax() {
        $action = $_REQUEST['action'];
        $data = $_REQUEST['data'];

        // $shop = Auth::user();
        // $domain = $shop->getDomain()->toNative();

        switch ($action) {
            case 'getUserInfo':
                $result = GenemcoUsers::where([['email', '=', $data['email']], ['user_status', '=' , 'registered']])->first();
                // $result = 'getUserInfo';
                break;
            case 'submitQuote':
                $currentUser = GenemcoUsers::where([
                    ['email', '=' , $data['userInfo']['email']],
                    ['user_status', '=' , 'registered']
                ])->first();
                $userId = $currentUser->user_id;
                $createdAt = Carbon::now()->toDateTimeString();
                $quoteID = md5($createdAt);

                $quoteModel = new RequestQuoteModel;
                $quoteModel->ordered = false;
                $quoteModel->order_id = '';
                $quoteModel->approved = false;
                $quoteModel->status = 'new';
                $quoteModel->quote_id = $quoteID;
                $quoteModel->created_at = $createdAt;
                $quoteModel->updated_at = Carbon::now()->toDateTimeString();
                $quoteModel->role_in_this_project = $data['userInfo']['roleInThisProject'];
                $quoteModel->project_timeline = $data['userInfo']['projectTimeline'];
                $quoteModel->about_project_and_request = $data['userInfo']['aboutYourProject'];
                $quoteModel->user_id = $userId;
                $quoteModel->sales_rep_id = '';
                $quoteModel->deal_subject = '';
                $quoteModel->sent_email_to_customer_by_admin = 'no';
                $quoteModel->sent_email_to_sales_rep_by_admin = 'no';
                $quoteModel->sent_deal_to_hubspot = 'no';
                $quoteModel->save();

                foreach ($data['cartItems'] as $key => $value) {

                    $GenemcoQuotedProductsModel = new GenemcoQuotedProductsModel;
                    $GenemcoQuotedProductsModel->quote_id = $quoteID;
                    $GenemcoQuotedProductsModel->approved = false;
                    $GenemcoQuotedProductsModel->genemco_updated = true;
                    $GenemcoQuotedProductsModel->approved_by_admin = false;
                    $GenemcoQuotedProductsModel->isactive = true;
                    $GenemcoQuotedProductsModel->product_history_id = $quoteID . $key;
                    $GenemcoQuotedProductsModel->admin_comment = '';
                    $GenemcoQuotedProductsModel->product_id = $value['product_id'];
                    $GenemcoQuotedProductsModel->product_key = $value['key'];
                    $GenemcoQuotedProductsModel->product_variant = $value['variant_id'];
                    $GenemcoQuotedProductsModel->product_price = intval($value['price']) / 100;
                    $GenemcoQuotedProductsModel->product_url = $value['url'];
                    $GenemcoQuotedProductsModel->product_image = $value['image'];
                    $GenemcoQuotedProductsModel->product_title = $value['title'];
                    $GenemcoQuotedProductsModel->product_sku = $value['sku'];
                    $GenemcoQuotedProductsModel->product_variant_title = $value['variant_title'];
                    $GenemcoQuotedProductsModel->product_description = htmlspecialchars($value['product_description']);
                    $GenemcoQuotedProductsModel->product_category = $data['categories'][$value['id']];
                    $GenemcoQuotedProductsModel->created_at = Carbon::now()->toDateTimeString();
                    $GenemcoQuotedProductsModel->updated_at = Carbon::now()->toDateTimeString();
                    $GenemcoQuotedProductsModel->save();
                }

                $userInfo = array('email'       => $currentUser->email,
                                'firstName'     => $currentUser->first_name,
                                'lastName'      => $currentUser->last_name,
                                'company'       => $currentUser->company_name,
                                'phone'         => $currentUser->phone,
                                'city'          => $currentUser->city,
                                'state'         => $currentUser->state,
                                'country'       => $currentUser->country,
                                'preferredLanguage' => $currentUser->preferred_language,
                                'aboutYourProject'  => $data['userInfo']['aboutYourProject'],
                                'roleInThisProject' => $data['userInfo']['roleInThisProject'],
                                'projectTimeline'   => $data['userInfo']['projectTimeline']
                            );
                $quoteHtml = "<ul style='margin: 0;padding:0;list-style:none;'>";
                foreach ($data['cartItems'] as $key => $value) {
                    $img = $value['image'];
                    $sku = $value['sku'];
                    $title = $value['title'];
                    $link = $value['url'];
                    $quoteHtml .= "<li style='display: flex; align-items: center;margin:0;margin-bottom: 10px;'><div style='width: 200px; margin-right: 20px;'><a href='https://genemco.myshopify.com/$link'><img src='$img' style='width: 100%'></a></div><div class='product_info'><p>$sku</p><p>$title</p></div></li>";
                }
                $quoteHtml .= "</ul>";                

                $result = Array('status' => 'success', 'quoteID' => $quoteID, 'hubpotEmail' => $this->hubspotMessage->sendQuoteConfirmationEmail($userInfo, $quoteID, $quoteHtml));

                $emailHistory = new GenemcoEmailHistory;
                $emailHistory->quote_id = $quoteID;
                $emailHistory->created_at = Carbon::now()->toDateTimeString();
                $emailHistory->updated_at = Carbon::now()->toDateTimeString();
                $emailHistory->email_history = "Check out confirmation sent to customer";
                $emailHistory->save();

                break;
            case 'submitGuestQuote':
                $userInfo = $data['guestInfo'];
                $products = $data['items'];

                if (GenemcoUsers::where([
                        ['email', '=' , $userInfo['email']],
                        ['user_status', '=' , 'guest']
                    ])->get()->count() == 0) {
                    $genemcoUsers = new GenemcoUsers;

                    $genemcoUsers->user_id = md5($userInfo['email']);
                    $genemcoUsers->user_status = 'guest';
                    $genemcoUsers->first_name = $userInfo['firstName'];
                    $genemcoUsers->last_name = $userInfo['lastName'];
                    $genemcoUsers->company_name = $userInfo['company'];
                    $genemcoUsers->email = $userInfo['email'];
                    $genemcoUsers->phone = $userInfo['phone'];
                    $genemcoUsers->city = $userInfo['city'];
                    $genemcoUsers->state = $userInfo['state'];
                    $genemcoUsers->country = $userInfo['country'];
                    $genemcoUsers->preferred_language = $userInfo['preferredLanguage'];
                    $genemcoUsers->save();
                } else if (GenemcoUsers::where([
                        ['email', '=' , $userInfo['email']],
                        ['user_status', '=' , 'guest']
                    ])->get()->count() > 0) {
                    GenemcoUsers::where([
                        ['email', '=' , $userInfo['email']],
                        ['user_status', '=' , 'guest']
                    ])->update(array(
                        'first_name'    => $userInfo['firstName'],
                        'last_name'     => $userInfo['lastName'],
                        'company_name'  => $userInfo['company'],
                        'email'         => $userInfo['email'],
                        'phone'         => $userInfo['phone'],
                        'city'          => $userInfo['city'],
                        'state'         => $userInfo['state'],
                        'country'       => $userInfo['country'],
                        'preferred_language'    => $userInfo['preferredLanguage']
                    ));
                }

                $createdAt = Carbon::now()->toDateTimeString();
                $quoteID = md5($createdAt);

                $quoteModel = new RequestQuoteModel;
                $quoteModel->ordered = false;
                $quoteModel->order_id = '';
                $quoteModel->approved = false;
                $quoteModel->status = 'new';
                $quoteModel->quote_id = $quoteID;
                $quoteModel->created_at = $createdAt;
                $quoteModel->updated_at = Carbon::now()->toDateTimeString();
                $quoteModel->role_in_this_project = $userInfo['roleInThisProject'];
                $quoteModel->project_timeline = $userInfo['projectTimeline'];
                $quoteModel->about_project_and_request = $userInfo['aboutYourProject'];
                $quoteModel->user_id = md5($userInfo['email']);
                $quoteModel->sales_rep_id = '';
                $quoteModel->deal_subject = '';
                $quoteModel->sent_email_to_customer_by_admin = 'no';
                $quoteModel->sent_email_to_sales_rep_by_admin = 'no';
                $quoteModel->sent_deal_to_hubspot = 'no';
                $quoteModel->save();

                foreach ($products as $key => $value) {

                    $GenemcoQuotedProductsModel = new GenemcoQuotedProductsModel;
                    $GenemcoQuotedProductsModel->quote_id = $quoteID;
                    $GenemcoQuotedProductsModel->approved = false;
                    $GenemcoQuotedProductsModel->genemco_updated = true;
                    $GenemcoQuotedProductsModel->approved_by_admin = false;
                    $GenemcoQuotedProductsModel->isactive = true;
                    $GenemcoQuotedProductsModel->product_history_id = $quoteID . $key;
                    $GenemcoQuotedProductsModel->admin_comment = '';
                    $GenemcoQuotedProductsModel->product_id = $value['product_id'];
                    $GenemcoQuotedProductsModel->product_key = $value['key'];
                    $GenemcoQuotedProductsModel->product_variant = $value['variant_id'];
                    $GenemcoQuotedProductsModel->product_price = intval($value['price']) / 100;
                    $GenemcoQuotedProductsModel->product_url = $value['url'];
                    $GenemcoQuotedProductsModel->product_image = $value['image'];
                    $GenemcoQuotedProductsModel->product_title = $value['title'];
                    $GenemcoQuotedProductsModel->product_sku = $value['sku'];
                    $GenemcoQuotedProductsModel->product_variant_title = $value['variant_title'];
                    $GenemcoQuotedProductsModel->product_description = htmlspecialchars($value['product_description']);
                    $GenemcoQuotedProductsModel->product_category = $data['categories'][$value['id']];
                    $GenemcoQuotedProductsModel->created_at = Carbon::now()->toDateTimeString();
                    $GenemcoQuotedProductsModel->updated_at = Carbon::now()->toDateTimeString();
                    $GenemcoQuotedProductsModel->save();
                }

                $quoteHtml = "<ul style='margin: 0;padding:0;list-style:none;'>";
                foreach ($products as $key => $value) {
                    $img = $value['image'];
                    $sku = $value['sku'];
                    $title = $value['title'];
                    $link = $value['url'];
                    $quoteHtml .= "<li style='display: flex; align-items: center;margin:0;margin-bottom: 10px;'><div style='width: 200px; margin-right: 20px;'><a href='https://genemco.myshopify.com/$link'><img src='$img' style='width: 200px;'></a></div><div class='product_info'><p>$sku</p><a href='https://genemco.myshopify.com/$link'><p><b>$title</b></p></a></div></li>";
                }
                $quoteHtml .= "</ul>";                

                $result = Array('status' => 'success', 'quoteID' => $quoteID, 'hubpotEmail' => $this->hubspotMessage->sendQuoteConfirmationEmail($userInfo, $quoteID, $quoteHtml));
                // $this->hubspotMessage->sendQuoteConfirmationEmail($userInfo['email']);

                $emailHistory = new GenemcoEmailHistory;
                $emailHistory->quote_id = $quoteID;
                $emailHistory->created_at = Carbon::now()->toDateTimeString();
                $emailHistory->updated_at = Carbon::now()->toDateTimeString();
                $emailHistory->email_history = "Check out confirmation sent to customer";
                $emailHistory->save();

                break;
            case 'edit.customer.details':
                $oldUserInfo = $data['oldUserInfo'];
                $newUserInfo = $data['newUserInfo'];
                GenemcoUsers::where([['email', '=', $oldUserInfo['email']]])->update(array(
                    'first_name'    => $newUserInfo['first_name'],
                    'last_name'     => $newUserInfo['last_name'],
                    'company_name'  => $newUserInfo['company_name'],
                    'phone'         => $newUserInfo['phone'],
                    'city'          => $newUserInfo['city'],
                    'state'         => $newUserInfo['state'],
                    'country'       => $newUserInfo['country'],
                    'preferred_language'    => $newUserInfo['preferred_language']
                ));
                $result = 'success';
                break;
            default:
                // code...
                break;
        }

        return response()->json(['success' => $result]);
    }

    //Admin make order
    public function adminAjax() {
        $action = $_REQUEST['action'];
        $data = $_REQUEST['data'];

        $shop = Auth::user();
        $domain = $shop->getDomain()->toNative();

        switch ($action) {
            case 'merge.quotes.by.ids':
                $quoteIds = explode(",", $data['quote_ids']);
                $newQuoteId = $quoteIds[0];
                foreach($quoteIds as $quoteId) {
                    if ($quoteId != $newQuoteId) {
                        RequestQuoteModel::where('quote_id', "=", $quoteId)->delete();
                        $products = GenemcoQuotedProductsModel::where('quote_id', "=", $quoteId)->update(array(
                            'quote_id' => $newQuoteId
                        ));
                    }
                }
                $result = $quoteIds;
                break;
            case 'get.quotes.by.userid':
                $userID = $data['info']['user_id'];
                $quotesByUserID = RequestQuoteModel::where('user_id', '=', $userID)->get();
                $newQuotes = [];
                foreach($quotesByUserID as $quote) {
                    $newQuotes[] = array(
                        'quote_id'  => $quote->quote_id,
                        'created_at'    => $quote->created_at->format('Y-m-d H:i:s')
                    );
                }
                $result = $newQuotes;
                break;
            case 'orders.json':
                $userInfo = GenemcoUsers::where('user_id', '=', $data['user_id'])->first();

                $currentCustomer = $shop->api()->graph('{
                  customers(first:10, query:"email:' . $userInfo->email . '") {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }');
                $currentCustomerID = str_replace("gid://shopify/Customer/", "", $currentCustomer['body']['data']['customers']['edges'][0]['node']['id']);

                $shopApi = $shop->api()->rest('POST', '/admin/api/2020-07/orders.json', array(
                    'order' => array(
                        'shipping_address' => array(
                            'address1'      => "test",
                            'address2'      => "test",
                            'city'          => $userInfo->company_name,
                            'company'       => null,
                            'country'       => $userInfo->country,
                            'first_name'    => $userInfo->first_name,
                            'last_name'     => $userInfo->last_name,
                            'province'      => $userInfo->state
                        ),
                        'customer'          => array(
                            'id'            => $currentCustomerID,
                            'email'         => $userInfo->email,
                            'first_name'    => $userInfo->first_name,
                            'last_name'     => $userInfo->last_name
                        ),
                        "financial_status"          => "pending",
                        'fulfillment_status'        => null,
                        'send_receipt'              => false,
                        'send_fulfillment_receipt'  => false,
                        'inventory_behaviour '      => 'decrement_ignoring_policy',
                        'line_items'                => $data['lineItems']
                    )
                ));

                // if (array_key_exists('quote[registered_customer]', $quoteArray)) {
                //     # code...
                // }

                // print_r($shopApi);

                if ( $shopApi['errors'] == false ) {
                    RequestQuoteModel::where('quote_id', $data['quote_id'])->update(
                        array(
                            'ordered'       => true,
                            'order_id'      => $shopApi['body']['order']['id']
                        )
                    );
                }

                $result = $shopApi;
                break;
            case 'save.product':
                $oldPrice = GenemcoQuotedProductsModel::where([
                    ['quote_id', '=' , $data['info']['quote_id']],
                    ['product_id', '=' , $data['info']['product_id']],
                    ['product_variant', '=' , $data['info']['variant_id']]
                ])->first()->product_price;

                GenemcoQuotedProductsModel::where([
                    ['quote_id', '=' , $data['info']['quote_id']],
                    ['product_id', '=' , $data['info']['product_id']],
                    ['product_variant', '=' , $data['info']['variant_id']]
                ])->update(array(
                    'product_price'     => intval($data['info']['price']),
                    'admin_comment'     => $data['info']['additional_note'],
                    'genemco_updated'   => true
                ));

                if ( intval($oldPrice) != intval($data['info']['price']) ) {
                    $createdAt = Carbon::now()->toDateTimeString();
                    $GenemcoProductHistory = new GenemcoProductHistory;

                    $GenemcoProductHistory->product_history_id = $data['info']['history_id'];
                    $GenemcoProductHistory->product_history = 'Updated on ' . $createdAt->format('F j, Y') . ' "' . "Price:" . "$" . intval($oldPrice) . ' to $' . intval($data['info']['price']) . '"';
                    $GenemcoProductHistory->old_price = $oldPrice;
                    $GenemcoProductHistory->new_price = $data['info']['price'];
                    $GenemcoProductHistory->comment = $data['info']['additional_note'];
                    $GenemcoProductHistory->from = 'Genemco';
                    $GenemcoProductHistory->status = 'Updated';
                    $GenemcoProductHistory->created_at = $createdAt;
                    $GenemcoProductHistory->updated_at = $createdAt;

                    $GenemcoProductHistory->save();

                    $result = 'Successfully saved!';
                } else {
                    $result = 'Price is not changed!';
                }

                break;
            case 'history.product':
                $historyArray = GenemcoProductHistory::where('product_history_id', $data['info']['history_id'])->orderBy('created_at', 'desc')->get();
                $historyResult = array();

                foreach ($historyArray as $key => $history) {
                    $historyResult[] = array(
                        'old_price' => $history->old_price,
                        'new_price' => $history->new_price,
                        'comment'   => $history->comment,
                        'from'      => $history->from,
                        'status'    => $history->status,
                        'date'      => date('F j, Y', strtotime($history->created_at))
                    );
                }

                $result = $historyResult;
                return response()->json(['success' => $result]);
                break;
            case 'approve.quote.all.products':
                RequestQuoteModel::where([
                    ['quote_id', '=' , $data['info']['quote_id']],
                    ['user_id', '=' , $data['info']['user_id']]
                ])->update(array(
                    'approved'      => true
                ));

                GenemcoQuotedProductsModel::where([
                    ['quote_id', '=', $data['info']['quote_id']]
                ])->update(array(
                    'approved_by_admin' => true
                ));

                $result = 'approved';
                break;
            case 'product.search':
                $searchTerm = $data['term'];
                $searchTerm = '*' . $searchTerm . '*';
                $request = $shop->api()->graph('{ products(first:10 query:"title:' . $searchTerm . ' OR sku:' . $searchTerm . '"){edges{node{id title  featuredImage{originalSrc} totalInventory handle variants(first: 5){edges{node{id price sku}}}}}} }');

                $result = $request;
                break;
            case 'add.selectedProducts':

                $quoteID = $data['quoteID'];
                $selectedProducts = $data['products'];

                $quote = RequestQuoteModel::where('quote_id', $quoteID)->first();
                $quotedProducts = GenemcoQuotedProductsModel::where([
                    ['quote_id', '=', $quoteID]
                ])->get();

                $quotedProductsCount = $quotedProducts->count();

                foreach ($selectedProducts as $key => $selectedProduct) {

                    $productID = str_replace('gid://shopify/Product/', '', $selectedProduct['node']['id']);
                    $variantID = str_replace('gid://shopify/ProductVariant/', 'replace', $selectedProduct['node']['variants']['edges'][0]['node']['id']);
                    $productPrice = $selectedProduct['node']['variants']['edges'][0]['node']['price'];
                    $productTitle = $selectedProduct['node']['title'];
                    $productImage = $selectedProduct['node']['featuredImage']['originalSrc'];
                    $productHandle = $selectedProduct['node']['handle'];

                    if (GenemcoQuotedProductsModel::where([['quote_id', '=', $quoteID], ['product_id', '=', $productID]])->first() === null && intval($selectedProduct['node']['totalInventory']) > 0) {
                        $GenemcoQuotedProductsModel = new GenemcoQuotedProductsModel;

                        $GenemcoQuotedProductsModel->quote_id = $quoteID;
                        $GenemcoQuotedProductsModel->approved = false;
                        $GenemcoQuotedProductsModel->genemco_updated = true;
                        $GenemcoQuotedProductsModel->approved_by_admin = true;
                        $GenemcoQuotedProductsModel->isactive = true;
                        $GenemcoQuotedProductsModel->product_history_id = $quoteID . ++$quotedProductsCount;
                        $GenemcoQuotedProductsModel->admin_comment = '';
                        $GenemcoQuotedProductsModel->product_id = $productID;
                        $GenemcoQuotedProductsModel->product_key = $productID;
                        $GenemcoQuotedProductsModel->product_variant = $variantID;
                        $GenemcoQuotedProductsModel->product_price = intval($productPrice);
                        $GenemcoQuotedProductsModel->product_url = 'https://genemco.myshopify.com/products/' . $productHandle;
                        $GenemcoQuotedProductsModel->product_image = $productImage;
                        $GenemcoQuotedProductsModel->product_title = $productTitle;
                        $GenemcoQuotedProductsModel->product_variant_title = $productTitle;
                        $GenemcoQuotedProductsModel->product_description = '';
                        $GenemcoQuotedProductsModel->created_at = Carbon::now()->toDateTimeString();
                        $GenemcoQuotedProductsModel->updated_at = Carbon::now()->toDateTimeString();

                        $GenemcoQuotedProductsModel->save();
                    }

                }

                $newQuotedProducts = GenemcoQuotedProductsModel::where([
                    ['quote_id', '=', $quoteID]
                ])->get();

                $result = $newQuotedProducts;
                break;
            case 'approve.product':
                $quoteID = $data['info']['quoteID'];
                $productID = $data['info']['productID'];

                GenemcoQuotedProductsModel::where([
                    ['quote_id', '=', $quoteID],
                    ['product_id', '=', $productID]
                ])->update(array(
                    'approved_by_admin' => true
                ));

                $result = 'Approved';
                break;
            case 'trash.product':
                $quoteID = $data['info']['quoteID'];
                $productID = $data['info']['productID'];

                $result = GenemcoQuotedProductsModel::where([
                    ['quote_id', '=', $quoteID],
                    ['product_id', '=', $productID]
                ])->update(array(
                    'isactive'      => false,
                    'updated_at'    => Carbon::now()->toDateTimeString()
                ));

                $result = 'ok';
                break;
            case 'get.removed.product':

                $result = GenemcoQuotedProductsModel::where([
                    ['quote_id', '=' , $data['info']['quoteID']],
                    ['isactive', '=', false]
                ])->get();

                break;
            case 'restore.product':
                $quoteID = $data['info']['quoteID'];
                $productID = $data['info']['productID'];

                $result = GenemcoQuotedProductsModel::where([
                    ['quote_id', '=', $quoteID],
                    ['product_id', '=', $productID]
                ])->update(array(
                    'isactive'      => true,
                    'updated_at'    => Carbon::now()->toDateTimeString()
                ));

                $result = 'ok';

                break;
            case 'search.quote':
                $searchTerm = $data['info']['searchTerm'];
                $quote = RequestQuoteModel::join('genemco_users', 'genemco_quote.user_id', '=', 'genemco_users.user_id')->where('first_name', 'LIKE', '%'. $searchTerm . '%' )->orWhere('last_name', 'LIKE', '%'. $searchTerm . '%')->orWhere('email', '=', $searchTerm)->orWhere('company_name', '=', $searchTerm)->get();
                $result = $quote;
                break;
            case 'change.quote.status':
                $quoteID = $data['info']['quoteID'];
                $quoteStatus = $data['info']['status'];
                $quote = RequestQuoteModel::where('quote_id', '=', $quoteID)->update(array(
                    'status'    => $quoteStatus
                ));
                $result = 'Quote Status Changed';
                break;
            case 'add.sales.rep':
                $firstName = $data['info']['firstName'];
                $lastName = $data['info']['lastName'];
                $email = $data['info']['email'];
                $phone = $data['info']['phone'];
                $ownerID = $data['info']['ownerId'];

                if (GenemcoSalesRep::where('email', '=', $email)->get()->count() == 0) {
                    $salesRep = new GenemcoSalesRep;
                    $salesRep->sales_rep_id = md5($email);
                    $salesRep->first_name = $firstName;
                    $salesRep->last_name = $lastName;
                    $salesRep->email = $email;
                    $salesRep->phone = $phone;
                    $salesRep->owner_id = $ownerID;
                    $salesRep->save();
                    $result = "New Sales Rep registered";
                } else {
                    $result = "Sales Rep already exists";
                }
                break;
            case 'edit.sales.rep':
                $firstName = $data['info']['firstName'];
                $lastName = $data['info']['lastName'];
                $email = $data['info']['email'];
                $phone = $data['info']['phone'];
                $ownerID = $data['info']['ownerId'];
                $salesRepId = $data['info']['id'];
                GenemcoSalesRep::where('sales_rep_id', '=', $salesRepId)->update(array(
                    'first_name'    => $firstName,
                    'last_name'     => $lastName,
                    'email'         => $email,
                    'phone'         => $phone,
                    'owner_id'      => $ownerID
                ));
                $result = 'edited';
                break;
            case 'save.sales.rep.email.content':
                $salesRepId = $data['info']['id'];
                $emailEnglish = $data['info']['email_english'];
                $emailSpanish = $data['info']['email_spanish'];
                GenemcoSalesRep::where('sales_rep_id', '=', $salesRepId)->update(array(
                    'email_content_english'    => $emailEnglish,
                    'email_content_spanish'     => $emailSpanish
                ));
                $result = 'Email saved';
                break;
            case 'delete.sales.rep':
                $salesRepId = $data['info']['id'];
                GenemcoSalesRep::where('sales_rep_id', '=', $salesRepId)->delete();
                $result = $data['info']['id'];
                break;
            case 'add.sales.cc':
                $firstName = $data['info']['firstName'];
                $lastName = $data['info']['lastName'];
                $email = $data['info']['email'];
                $ownerID = $data['info']['ownerId'];

                if (GenemcoSalesCC::where('email', '=', $email)->get()->count() == 0) {
                    $salesRep = new GenemcoSalesCC;
                    $salesRep->sales_cc_id = md5($email);
                    $salesRep->first_name = $firstName;
                    $salesRep->last_name = $lastName;
                    $salesRep->email = $email;
                    $salesRep->owner_id = $ownerID;
                    $salesRep->save();
                    $result = "New Sales Rep registered";
                } else {
                    $result = "Sales CC already exists";
                }
                break;
            case 'delete.sales.cc':
                $salesCCId = $data['info']['id'];
                GenemcoSalesCC::where('sales_cc_id', '=', $salesCCId)->delete();
                $result = $data['info']['id'];
                break;
            case 'edit.sales.cc':
                $firstName = $data['info']['firstName'];
                $lastName = $data['info']['lastName'];
                $email = $data['info']['email'];
                $ownerID = $data['info']['ownerId'];
                $salesCCID = $data['info']['id'];
                GenemcoSalesCC::where('sales_cc_id', '=', $salesCCID)->update(array(
                    'first_name'    => $firstName,
                    'last_name'     => $lastName,
                    'email'         => $email,
                    'owner_id'      => $ownerID
                ));
                $result = 'edited';
                break;
            case 'add.sales.bcc':
                $firstName = $data['info']['firstName'];
                $lastName = $data['info']['lastName'];
                $email = $data['info']['email'];
                $ownerID = $data['info']['ownerId'];

                if (GenemcoSalesBCC::where('email', '=', $email)->get()->count() == 0) {
                    $salesRep = new GenemcoSalesBCC;
                    $salesRep->sales_bcc_id = md5($email);
                    $salesRep->first_name = $firstName;
                    $salesRep->last_name = $lastName;
                    $salesRep->email = $email;
                    $salesRep->owner_id = $ownerID;
                    $salesRep->save();
                    $result = "New Sales Rep registered";
                } else {
                    $result = "Sales CC already exists";
                }
                break;
            case 'delete.sales.bcc':
                $salesBCCID = $data['info']['id'];
                GenemcoSalesBCC::where('sales_bcc_id', '=', $salesBCCID)->delete();
                $result = $data['info']['id'];
                break;
            case 'edit.sales.bcc':
                $firstName = $data['info']['firstName'];
                $lastName = $data['info']['lastName'];
                $email = $data['info']['email'];
                $ownerID = $data['info']['ownerId'];
                $salesBCCID = $data['info']['id'];
                GenemcoSalesBCC::where('sales_bcc_id', '=', $salesBCCID)->update(array(
                    'first_name'    => $firstName,
                    'last_name'     => $lastName,
                    'email'         => $email,
                    'owner_id'      => $ownerID
                ));
                $result = 'edited';
                break;
            case 'set.sales.rep.to.quote':
                $quoteID = $data['info']['quoteID'];
                $salesRepID = $data['info']['salesRepID'];
                $quote = RequestQuoteModel::where('quote_id', '=', $quoteID)->update(array(
                    'sales_rep_id'    => $salesRepID
                ));
                $result = "success";
                break;
            case 'send.email.to.customer':
                $quoteID = $data['info']['quoteID'];
                $salesRepID = $data['info']['salesRepID'];
                $quote = RequestQuoteModel::where('quote_id', '=', $quoteID)->first();
                $quotedProducts = GenemcoQuotedProductsModel::where('quote_id', '=', $quoteID)->get();
                $userID = $quote->user_id;
                $user = GenemcoUsers::where('user_id', '=', $userID)->first();
                $salesRep = GenemcoSalesRep::where('sales_rep_id', '=', $salesRepID)->first();
                $salesCCs = GenemcoSalesCC::all();
                $salesBCCs = GenemcoSalesBCC::all();
                $result = $this->hubspotMessage->sendQuotesEmailtoCustomer($user, $quote, $quotedProducts, $salesRep, $salesCCs, $salesBCCs);

                $emailHistory = new GenemcoEmailHistory;
                $emailHistory->quote_id = $quoteID;
                $emailHistory->created_at = Carbon::now()->toDateTimeString();
                $emailHistory->updated_at = Carbon::now()->toDateTimeString();
                $emailHistory->email_history = "Intro sent to customer/sales (" . $salesRep->first_name . " " . $salesRep->last_name . ")";
                $emailHistory->save();

                // $result = $this->sendCustomerEmail($userEmail, $salesRep, $salesCCs, $salesBCCs, $quote);
                break;
            case 'send.email.to.sales.rep':
                $quoteID = $data['info']['quoteID'];
                $salesRepID = $data['info']['salesRepID'];
                $quote = RequestQuoteModel::where('quote_id', '=', $quoteID)->first();
                $quotedProducts = GenemcoQuotedProductsModel::where('quote_id', '=', $quoteID)->get();
                $userID = $quote->user_id;
                $user = GenemcoUsers::where('user_id', '=', $userID)->first();
                $salesRep = GenemcoSalesRep::where('sales_rep_id', '=', $salesRepID)->first();
                $salesCCs = GenemcoSalesCC::all();
                $salesBCCs = GenemcoSalesBCC::all();
                $result = $this->hubspotMessage->sendQuotesEmailtoSalesRep($user, $quote, $quotedProducts, $salesRep, $salesCCs, $salesBCCs);

                $emailHistory = new GenemcoEmailHistory;
                $emailHistory->quote_id = $quoteID;
                $emailHistory->created_at = Carbon::now()->toDateTimeString();
                $emailHistory->updated_at = Carbon::now()->toDateTimeString();
                $emailHistory->email_history = "Lead sent to sales (". $salesRep->first_name . " " . $salesRep->last_name . ")";
                $emailHistory->save();

                break;
            case 'edit.customer.details':
                $quoteID = $data['info']['quoteID'];
                $firstName = $data['info']['firstName'];
                $lastName = $data['info']['lastName'];
                $companyName = $data['info']['companyName'];
                $email = $data['info']['email'];
                $phone = $data['info']['phone'];
                $city = $data['info']['city'];
                $state = $data['info']['state'];
                $country = $data['info']['country'];
                $preferredLanguage = $data['info']['preferredLanguage'];
                $roleInThisProject = $data['info']['roleInThisProject'];
                $projectTimeline = $data['info']['projectTimeline'];
                $aboutProjectAndRequest = $data['info']['aboutProjectAndRequest'];

                $userID = RequestQuoteModel::where('quote_id', '=', $quoteID)->first()->user_id;
                $oldEmail = GenemcoUsers::where('user_id', '=', $userID)->first()->email;

                RequestQuoteModel::where('quote_id', '=', $quoteID)->update(array(
                    'role_in_this_project' => $roleInThisProject,
                    'project_timeline'  => $projectTimeline,
                    'about_project_and_request' => $aboutProjectAndRequest
                ));

                GenemcoUsers::where('user_id', '=', $userID)->update(array(
                    'first_name'    => $firstName,
                    'last_name'     => $lastName,
                    'company_name'  => $companyName,
                    'email'         => $email,
                    'phone'         => $phone,
                    'city'          => $city,
                    'state'         => $state,
                    'country'       => $country,
                    'preferred_language'    => $preferredLanguage
                ));

                // $currentCustomer = $shop->api()->rest('GET', '/admin/api/2021-07/customers/search.json?limit=250&query=test@gmail.com');
                $currentCustomer = $shop->api()->graph('{
                  customers(first:10, query:"email:' . $email . '") {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }');

                if (count($currentCustomer['body']['data']['customers']['edges']) > 0) {

                    $currentCustomerID = str_replace("gid://shopify/Customer/", "", $currentCustomer['body']['data']['customers']['edges'][0]['node']['id']);

                    $shop->api()->rest('PUT', '/admin/api/2021-07/customers/' . $currentCustomerID . '.json', array(
                    "customer" => array(
                        "email" => $email,
                        "first_name" => $firstName,
                        "last_name" => $lastName,
                        "note" => "company:" . $companyName . PHP_EOL . "phone:" . $phone . PHP_EOL . "city:" . $city . PHP_EOL. "state:" . $state . PHP_EOL . "country:" . $country . PHP_EOL . "preferred_language:" . $preferredLanguage
                    )
                    ));
                    $result = $firstName;
                } else {
                    $result = "success";
                }                

                break;
            case 'set.quote.status':
                $quoteID = $data['info']['quoteID'];
                $quoteStatus = $data['info']['quoteStatus'];

                RequestQuoteModel::where('quote_id', '=', $quoteID)->update(array(
                    "status"    => $quoteStatus
                ));

                $result = "success";

                break;
            case 'save.deal.subject':
                $quoteID = $data['info']['quoteID'];
                $dealSubject = $data['info']['dealSubject'];

                RequestQuoteModel::where('quote_id', '=', $quoteID)->update(array(
                    "deal_subject"    => $dealSubject
                ));

                $result = "success";

                break;
            case 'search.customer.by.email.name':
                $searchTerm = trim($data['info']['searchTerm']);
                if ($searchTerm != "") {
                    $searchedCustomers = GenemcoUsers::where('first_name', 'like', '%' . $searchTerm . '%')->orWhere('last_name', 'like', '%' . $searchTerm . '%')->orWhere('email', 'like', '%' . $searchTerm . '%')->take(10)->get();
                    $result = $searchedCustomers;
                } else {
                    $result = "null";
                }

                break;
            case 'add.new.quote':
                $customerType = $data['customerType'];
                if ($customerType == 'guest') {
                    $products = $data['products'];
                    $userInfo = $data['customerInfo'];
                    if (GenemcoUsers::where('email', '=', $userInfo['email'])->get()->count() == 0) {
                        $genemcoUsers = new GenemcoUsers;

                        $genemcoUsers->user_id = md5($userInfo['email']);
                        $genemcoUsers->user_status = 'guest';
                        $genemcoUsers->first_name = $userInfo['firstName'];
                        $genemcoUsers->last_name = $userInfo['lastName'];
                        $genemcoUsers->company_name = $userInfo['companyName'];
                        $genemcoUsers->email = $userInfo['email'];
                        $genemcoUsers->phone = $userInfo['phone'];
                        $genemcoUsers->city = $userInfo['city'];
                        $genemcoUsers->state = $userInfo['state'];
                        $genemcoUsers->country = $userInfo['country'];
                        $genemcoUsers->preferred_language = $userInfo['preferredLanguage'];

                        $genemcoUsers->save();

                        $createdAt = Carbon::now()->toDateTimeString();
                        $quoteID = md5($createdAt);

                        $quoteModel = new RequestQuoteModel;
                        $quoteModel->ordered = false;
                        $quoteModel->order_id = '';
                        $quoteModel->approved = false;
                        $quoteModel->status = 'new';
                        $quoteModel->quote_id = $quoteID;
                        $quoteModel->created_at = $createdAt;
                        $quoteModel->updated_at = Carbon::now()->toDateTimeString();
                        $quoteModel->role_in_this_project = $userInfo['roleInThisProject'];
                        $quoteModel->project_timeline = $userInfo['projectTimeline'];
                        $quoteModel->about_project_and_request = "";
                        $quoteModel->user_id = md5($userInfo['email']);
                        $quoteModel->sales_rep_id = '';
                        $quoteModel->deal_subject = '';
                        $quoteModel->sent_email_to_customer_by_admin = 'no';
                        $quoteModel->sent_email_to_sales_rep_by_admin = 'no';
                        $quoteModel->sent_deal_to_hubspot = 'no';
                        $quoteModel->save();

                        foreach ($products as $key => $value) {

                            $GenemcoQuotedProductsModel = new GenemcoQuotedProductsModel;
                            $GenemcoQuotedProductsModel->quote_id = $quoteID;
                            $GenemcoQuotedProductsModel->approved = false;
                            $GenemcoQuotedProductsModel->genemco_updated = true;
                            $GenemcoQuotedProductsModel->approved_by_admin = false;
                            $GenemcoQuotedProductsModel->isactive = true;
                            $GenemcoQuotedProductsModel->product_history_id = $quoteID . $key;
                            $GenemcoQuotedProductsModel->admin_comment = '';
                            $GenemcoQuotedProductsModel->product_id = $value['productID'];
                            $GenemcoQuotedProductsModel->product_key = $value['productID'];
                            $GenemcoQuotedProductsModel->product_variant = $value['variantID'];
                            $GenemcoQuotedProductsModel->product_price = intval($value['price']);
                            $GenemcoQuotedProductsModel->product_url = 'https://genemco.myshopify.com/products/' . $value['handle'];
                            $GenemcoQuotedProductsModel->product_image = $value['image'];
                            $GenemcoQuotedProductsModel->product_title = $value['title'];
                            $GenemcoQuotedProductsModel->product_variant_title = $value['title'];
                            $GenemcoQuotedProductsModel->product_description = "";
                            $GenemcoQuotedProductsModel->created_at = Carbon::now()->toDateTimeString();
                            $GenemcoQuotedProductsModel->updated_at = Carbon::now()->toDateTimeString();
                            $GenemcoQuotedProductsModel->save();
                        }

                        $result = 'success';

                    } else {
                        $result = 'Customer already exists';
                    }
                } elseif ( $customerType = 'registered_customer' ) {
                    $products = $data['products'];
                    $userId = $data['userID'];
                    $userInfo = GenemcoUsers::where('user_id', '=', $userId)->first();

                    $createdAt = Carbon::now()->toDateTimeString();
                    $quoteID = md5($createdAt);

                    $quoteModel = new RequestQuoteModel;
                    $quoteModel->ordered = false;
                    $quoteModel->order_id = '';
                    $quoteModel->approved = false;
                    $quoteModel->status = 'new';
                    $quoteModel->quote_id = $quoteID;
                    $quoteModel->created_at = $createdAt;
                    $quoteModel->updated_at = Carbon::now()->toDateTimeString();
                    $quoteModel->role_in_this_project = $data['projectDetails']['roleInThisProject'];
                    $quoteModel->project_timeline = $data['projectDetails']['projectTimeline'];
                    $quoteModel->about_project_and_request = "";
                    $quoteModel->user_id = $userId;
                    $quoteModel->sales_rep_id = '';
                    $quoteModel->deal_subject = '';
                    $quoteModel->sent_email_to_customer_by_admin = 'no';
                    $quoteModel->sent_email_to_sales_rep_by_admin = 'no';
                    $quoteModel->sent_deal_to_hubspot = 'no';
                    $quoteModel->save();

                    foreach ($products as $key => $value) {

                        $GenemcoQuotedProductsModel = new GenemcoQuotedProductsModel;
                        $GenemcoQuotedProductsModel->quote_id = $quoteID;
                        $GenemcoQuotedProductsModel->approved = false;
                        $GenemcoQuotedProductsModel->genemco_updated = true;
                        $GenemcoQuotedProductsModel->approved_by_admin = false;
                        $GenemcoQuotedProductsModel->isactive = true;
                        $GenemcoQuotedProductsModel->product_history_id = $quoteID . $key;
                        $GenemcoQuotedProductsModel->admin_comment = '';
                        $GenemcoQuotedProductsModel->product_id = $value['productID'];
                        $GenemcoQuotedProductsModel->product_key = $value['productID'];
                        $GenemcoQuotedProductsModel->product_variant = $value['variantID'];
                        $GenemcoQuotedProductsModel->product_price = intval($value['price']);
                        $GenemcoQuotedProductsModel->product_url = 'https://genemco.myshopify.com/products/' . $value['handle'];
                        $GenemcoQuotedProductsModel->product_image = $value['image'];
                        $GenemcoQuotedProductsModel->product_title = $value['title'];
                        $GenemcoQuotedProductsModel->product_variant_title = $value['title'];
                        $GenemcoQuotedProductsModel->product_description = "";
                        $GenemcoQuotedProductsModel->created_at = Carbon::now()->toDateTimeString();
                        $GenemcoQuotedProductsModel->updated_at = Carbon::now()->toDateTimeString();
                        $GenemcoQuotedProductsModel->save();
                    }

                    $result = 'success';

                }

                break;
            case 'get.email.history':
                $quoteID = $data['info']['quoteID'];
                $historyArray = GenemcoEmailHistory::where([['quote_id', '=', $quoteID]])->get();

                $historyResult = array();

                foreach ($historyArray as $key => $history) {
                    $historyResult[] = array(
                        'history' => $history->email_history,
                        'date'      => date('m/d/y h:i A', strtotime($history->created_at))
                    );
                }

                $result = $historyResult;
                return response()->json(['success' => $result]);
                break;
            case 'save.hubspot.settings':
                $info = $data['info'];

                $hubspotApiKey = $info['hubspotApiKey'];
                $emailFromName = $info['emailFromName'];
                $emailFromEmail = $info['emailFromEmail'];
                $emailIdWebsiteQuoteConfirmation = $info['emailIdWebsiteQuoteConfirmation'];
                $emailIdSendDealtoCustomerAndSales = $info['emailIdSendDealtoCustomerAndSales'];
                $emailIdSendLeadtoSalesOnly = $info['emailIdSendLeadtoSalesOnly'];
                $emailIdWebsiteQuoteConfirmationSpanish = $info['emailIdWebsiteQuoteConfirmationSpanish'];
                $emailIdSendDealtoCustomerAndSalesSpanish = $info['emailIdSendDealtoCustomerAndSalesSpanish'];
                $emailIdSendLeadtoSalesOnlySpanish = $info['emailIdSendLeadtoSalesOnlySpanish'];

                $currentSettings = GenemcoHubspotSettings::all()->first();

                if ($currentSettings != null) {
                    GenemcoHubspotSettings::all()->first()->update([
                        'hubspot_api_key'    => $hubspotApiKey,
                        'hubspot_sender_name'    => $emailFromName,
                        'hubspot_sender_email_address'    => $emailFromEmail,
                        'quote_confirmation_id'    => $emailIdWebsiteQuoteConfirmation,
                        'quote_confirmation_id_spanish'    => $emailIdWebsiteQuoteConfirmationSpanish,
                        'email_to_customer_id'    => $emailIdSendDealtoCustomerAndSales,
                        'email_to_customer_id_spanish'    => $emailIdSendDealtoCustomerAndSalesSpanish,
                        'email_to_sales_rep_id'    => $emailIdSendLeadtoSalesOnly,
                        'email_to_sales_rep_id_spanish'    => $emailIdSendLeadtoSalesOnlySpanish
                    ]);
                } else {
                    $GenemcoHubspotSettings = new GenemcoHubspotSettings;
                    $GenemcoHubspotSettings->hubspot_api_key = $hubspotApiKey;
                    $GenemcoHubspotSettings->hubspot_sender_name = $emailFromName;
                    $GenemcoHubspotSettings->hubspot_sender_email_address = $emailFromEmail;
                    $GenemcoHubspotSettings->quote_confirmation_id = $emailIdWebsiteQuoteConfirmation;
                    $GenemcoHubspotSettings->email_to_customer_id = $emailIdSendDealtoCustomerAndSales;
                    $GenemcoHubspotSettings->email_to_sales_rep_id = $emailIdSendLeadtoSalesOnly;
                    $GenemcoHubspotSettings->quote_confirmation_id_spanish = $emailIdWebsiteQuoteConfirmationSpanish;
                    $GenemcoHubspotSettings->email_to_customer_id_spanish = $emailIdSendDealtoCustomerAndSalesSpanish;
                    $GenemcoHubspotSettings->email_to_sales_rep_id_spanish = $emailIdSendLeadtoSalesOnlySpanish;
                    $GenemcoHubspotSettings->save();
                }

                $result = "saved";

                break;
            case 'send.deal.to.hubspot':
                $userInfo = $data['userInfo'];
                $quoteInfo = $data['quoteInfo'];

                $hubspotDeal = $this->hubspotDeal->sendHubspotDeal($userInfo, $quoteInfo);

                $emailHistory = new GenemcoEmailHistory;
                $emailHistory->quote_id = $quoteInfo['quoteID'];
                $emailHistory->created_at = Carbon::now()->toDateTimeString();
                $emailHistory->updated_at = Carbon::now()->toDateTimeString();
                $emailHistory->email_history = $hubspotDeal[0];
                $emailHistory->save();

                $result = "https://app.hubspot.com/contacts/6369229/deal/" . $hubspotDeal[1];
                break;
            default:
                # code...
                break;
        }

        return $result;
    }
}
