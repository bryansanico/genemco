<?php

namespace App\Http\Controllers;

use App\GenemcoSalesRep;
use App\GenemcoSalesBCC;
use App\GenemcoSalesCC;
use App\RequestQuoteModel;
use App\GenemcoHubspotSettings;
use App\GenemcoQuotedProductsModel;

use Carbon\Carbon;

use HubSpot\Factory;
use HubSpot\Client\Crm\Contacts\ApiException;

class HubspotDeal extends Controller
{
	private $apiKey = null;
	private $hubspot = null;

	public function __construct() {
		$hubspotSettings = GenemcoHubspotSettings::all()->first();
        $this->apiKey = $hubspotSettings->hubspot_api_key;
        $this->hubspot = \HubSpot\Factory::createWithApiKey($this->apiKey);
    }

    private function searchForAContractByEmail($email) {
		$filter = new \HubSpot\Client\Crm\Contacts\Model\Filter();
		$filter
		->setOperator('EQ')
		->setPropertyName('email')
		->setValue($email);

		$filterGroup = new \HubSpot\Client\Crm\Contacts\Model\FilterGroup();
		$filterGroup->setFilters([$filter]);

		$searchRequest = new \HubSpot\Client\Crm\Contacts\Model\PublicObjectSearchRequest();
		$searchRequest->setFilterGroups([$filterGroup]);

		// @var CollectionResponseWithTotalSimplePublicObject $contactsPage
		$contactsPage = $this->hubspot->crm()->contacts()->searchApi()->doSearch($searchRequest);

		return $contactsPage;
    }

    private function searchDealByProperties($searchFilters, $properties) {
		$PublicObjectSearchRequest = new \HubSpot\Client\Crm\Deals\Model\PublicObjectSearchRequest([
			'filter_groups' => [
				["filters" => $searchFilters]
			], 
			'sorts' => ["quote_"], 
			'query' => "", 
			'properties' => $properties, 
			'limit' => 2, 
			'after' => 0
		]);

		try {
			$apiResponse = $this->hubspot->crm()->deals()->searchApi()->doSearch($PublicObjectSearchRequest);
			return $apiResponse;
		} catch (ApiException $e) {
			return "Exception when calling search_api->do_search: ". $e->getMessage();
		}
    }

    private function generateHubspotDealProperties($quoteID, $userInfo, $purpose) {
    	$properties = [];
    	$genemcoQuote = RequestQuoteModel::where('quote_id', $quoteID)->first();
    	$quotedProducts = GenemcoQuotedProductsModel::where('quote_id', $quoteID)->get();
    	$salesRep = GenemcoSalesRep::where('sales_rep_id', $genemcoQuote->sales_rep_id)->first();

    	$properties['pipeline'] = 'default';
    	$properties['dealstage'] = '14555848';
    	$properties['dealname'] = $userInfo['firstName'] . " " . $userInfo['lastName'] . " | " . $userInfo['company'] . " | " . $genemcoQuote->deal_subject;
    	$properties['amount'] = 0;
    	$properties['stock_number'] = "";
    	$properties['description'] = "";
    	$properties['deal_description_no_price'] = "";
    	$properties['deal_description_summary'] = "";
    	$properties['invoice_description'] = "";
    	if ($purpose == "create") {
			$properties['createdate'] = date('Y-m-d', strtotime("+24 hours", strtotime(Carbon::now())));
			$properties['closedate'] = date('Y-m-d', strtotime("+3 months +24 hours", strtotime(Carbon::now())));
    	} else {
			$properties['createdate'] = date('Y-m-d', strtotime("+24 hours", strtotime(Carbon::now())));
			$properties['closedate'] = date('Y-m-d', strtotime("+3 months +24 hours", strtotime(Carbon::now())));
    	}
    	$properties['category '] = "";
    	$properties['products_in_deal'] = 0;
    	$properties['language'] = $userInfo['preferredLanguage'];
    	$properties['details_about_your_project'] = $genemcoQuote->about_project_and_request;
    	$properties['contact_role'] = $genemcoQuote->role_in_this_project;
    	$properties['your_timeframe'] = $genemcoQuote->project_timeline;
    	if ($salesRep != null) {
    		$properties['hubspot_owner_id'] = $salesRep->owner_id;
    	}
    	$properties['deal_priority'] = "0 - Brand New ( 01 fresh: call & email! )";
    	$properties['stay_close_frequency'] = "Daily";
    	$properties['current_status_of_deal'] = "Not yet engaged";
    	$properties['next_step_of_deal'] = "brand new, call/email to discuss project, timeline, budget.";
    	$properties['quote_'] = $quoteID;
    	$properties['deal_subject'] = $genemcoQuote->deal_subject;

    	foreach ($quotedProducts as $product) {
    		$properties['amount'] += $product->product_price;
    		$properties['stock_number'] .= $product->product_sku . " | ";
    		$properties['description'] .= "$" . $product->product_price . " | " . $product->product_sku . " | " . $product->product_title . " | " . $product->product_description . PHP_EOL . PHP_EOL;
    		$properties['deal_description_no_price'] .= $product->product_sku . " | " . $product->product_title . " | " . $product->product_description . PHP_EOL . PHP_EOL;
    		$properties['deal_description_summary'] .= $product->product_sku . " | " . $product->product_title . PHP_EOL;
    		$properties['invoice_description'] .= $product->product_sku . "." . $product->product_description . PHP_EOL . PHP_EOL;
    		$properties['category '] .= $product->product_category . PHP_EOL;
    		$properties['products_in_deal']++;
    	}

    	return $properties;
    }

    private function createAssociations($from, $to, $type, $fromOjbectType, $toObjectType) {
		$BatchInputPublicAssociation = new \HubSpot\Client\Crm\Associations\Model\BatchInputPublicAssociation(['inputs' => [
			[
				"from" => ["id" => $from], 
				"to" => ["id" => $to],
				"type" => $type
			]
		]]);
		try {
			$apiResponse = $this->hubspot->crm()->associations()->batchApi()->create($fromOjbectType, $toObjectType, $BatchInputPublicAssociation);
			return $apiResponse;
		} catch (ApiException $e) {
			return "Exception when calling batch_api->create: " . $e->getMessage();
		}
    }

    private function createHubspotDeal($quoteID, $userInfo) {
    	$hubspotDealProperties = $this->generateHubspotDealProperties($quoteID, $userInfo, "create"); 

		$SimplePublicObjectInput = new \HubSpot\Client\Crm\Deals\Model\SimplePublicObjectInput(['properties' => $hubspotDealProperties]);
		try {
		    $apiResponse = $this->hubspot->crm()->deals()->basicApi()->create($SimplePublicObjectInput);
		    return $apiResponse;
		} catch (ApiException $e) {
		    return "Exception when calling basic_api->create: " . $e->getMessage();
		}
    }

    private function upateHubspotDealbyID($dealID, $quoteID, $userInfo) {
    	$hubspotDealProperties = $this->generateHubspotDealProperties($quoteID, $userInfo, "update"); 

		$SimplePublicObjectInput = new \HubSpot\Client\Crm\Deals\Model\SimplePublicObjectInput(['properties' => $hubspotDealProperties]);
		try {
			$apiResponse = $this->hubspot->crm()->deals()->basicApi()->update($dealID, $SimplePublicObjectInput);
			return $apiResponse;
		} catch (ApiException $e) {
			return "Exception when calling basic_api->update: " . $e->getMessage();
		}
    }

    public function sendHubspotDeal($userInfo, $quoteInfo) {
    	$hubspotContact = $this->searchForAContractByEmail($userInfo['email']);

    	if ($hubspotContact['total'] == 0) { //No contact - create a new contact
			$contactInput = new \HubSpot\Client\Crm\Contacts\Model\SimplePublicObjectInput();
			$contactInput->setProperties(array(
				'email' => $userInfo['email'],
				'firstname' => $userInfo['firstName'],
				'lastname' => $userInfo['lastName'],
				'company' => $userInfo['company'],
				'phone' => $userInfo['phone'],
				'city' => $userInfo['city'],
				'state' => $userInfo['state'],
				'country' => $userInfo['country'],
				'hubspot_owner_id' => $userInfo['hubspot_owner_id']
				// 'language' => $userInfo['preferredLanguage']
			));
			$contact = $this->hubspot->crm()->contacts()->basicApi()->create($contactInput);
    	} else { //Contact exists - update contact
    		$contactId = $hubspotContact['results'][0]['id'];
			$newProperties = new \HubSpot\Client\Crm\Contacts\Model\SimplePublicObjectInput();
			$newProperties->setProperties(array(
				'email' => $userInfo['email'],
				'firstname' => $userInfo['firstName'],
				'lastname' => $userInfo['lastName'],
				'company' => $userInfo['company'],
				'phone' => $userInfo['phone'],
				'city' => $userInfo['city'],
				'state' => $userInfo['state'],
				'country' => $userInfo['country'],
				'hubspot_owner_id' => $userInfo['hubspot_owner_id']
				// 'language' => $userInfo['preferredLanguage']
			));
			$contact = $this->hubspot->crm()->contacts()->basicApi()->update($contactId, $newProperties);
    	}

    	$searchFilters = array(
    		array(
    			"value" => $quoteInfo["quoteID"],
    			"propertyName" => "quote_",
    			"operator" => "EQ"
    		)
    	);
    	$searchProperties = array("quote_", "dealstage");
    	$searchHubspotDeal = $this->searchDealByProperties($searchFilters, $searchProperties);
    	if ($searchHubspotDeal['total'] == 0) {
    		$createDeal = $this->createHubspotDeal($quoteInfo["quoteID"], $userInfo);
    		RequestQuoteModel::where('quote_id', $quoteInfo["quoteID"])->update([
    			'sent_deal_to_hubspot' => 'yes',
    			'hubspot_deal_id' => $createDeal['id']
    		]);
    		$this->createAssociations($createDeal['id'], $contact['id'], 'deal_to_contact', "Deals", "Contacts");
    		return ["Deal Sent to Hubspot", $createDeal['id']];
    	} else {
    		$dealID = $searchHubspotDeal['results'][0]['id'];
    		$upatedDeal = $this->upateHubspotDealbyID($dealID, $quoteInfo["quoteID"], $userInfo);
    		RequestQuoteModel::where('quote_id', $quoteInfo["quoteID"])->update([
    			'sent_deal_to_hubspot' => 'yes',
    			'hubspot_deal_id' => $upatedDeal['id']
    		]);
    		$this->createAssociations($upatedDeal['id'], $contact['id'], 'deal_to_contact', "Deals", "Contacts");
    		return ["Update Deal in Hubspot", $upatedDeal['id']];
    	}

    	// return $createDeal;
    }
}