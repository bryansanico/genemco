<?php

namespace App\Http\Controllers;

use App\GenemcoSalesRep;
use App\GenemcoSalesBCC;
use App\GenemcoSalesCC;
use App\RequestQuoteModel;
use App\GenemcoHubspotSettings;

class HubspotMessage extends Controller
{
	private $apiKey = null;

	public function __construct() {
		$hubspotSettings = GenemcoHubspotSettings::all()->first();
        $this->apiKey = $hubspotSettings->hubspot_api_key;
        $this->hubspot_sender_name = $hubspotSettings->hubspot_sender_name;
        $this->hubspot_sender_email_address = $hubspotSettings->hubspot_sender_email_address;
        $this->quote_confirmation_id = $hubspotSettings->quote_confirmation_id;
        $this->email_to_customer_id = $hubspotSettings->email_to_customer_id;
        $this->email_to_sales_rep_id = $hubspotSettings->email_to_sales_rep_id;
        $this->quote_confirmation_id_spanish = $hubspotSettings->quote_confirmation_id_spanish;
        $this->email_to_customer_id_spanish = $hubspotSettings->email_to_customer_id_spanish;
        $this->email_to_sales_rep_id_spanish = $hubspotSettings->email_to_sales_rep_id_spanish;
    }

    public function sendQuoteConfirmationEmail($userInfo, $quoteID, $quoteHtml) {
    	$curl = curl_init();

    	$email = $userInfo['email'];
    	$firstName = $userInfo['firstName'];
    	$lastName = $userInfo['lastName'];
    	$company = $userInfo['company'];
    	$phone = $userInfo['phone'];
    	$city = $userInfo['city'];
    	$state = $userInfo['state'];
    	$country = $userInfo['country'];
    	$preferredLanguage = $userInfo['preferredLanguage'];
    	$projectOverview = $userInfo['aboutYourProject'];
    	$projectRole = $userInfo['roleInThisProject'];
    	$projectTimeline = $userInfo['projectTimeline'];
		$salesCCs = GenemcoSalesCC::all();
		$salesBCCs = GenemcoSalesBCC::all();

        $email = preg_replace('/[\x00-\x1F\x7F]/', '', $email);
        $firstName = preg_replace('/[\x00-\x1F\x7F]/', '', $firstName);
        $lastName = preg_replace('/[\x00-\x1F\x7F]/', '', $lastName);
        $company = preg_replace('/[\x00-\x1F\x7F]/', '', $company);
        $phone = preg_replace('/[\x00-\x1F\x7F]/', '', $phone);
        $city = preg_replace('/[\x00-\x1F\x7F]/', '', $city);
        $state = preg_replace('/[\x00-\x1F\x7F]/', '', $state);
        $country = preg_replace('/[\x00-\x1F\x7F]/', '', $country);
        $preferredLanguage = preg_replace('/[\x00-\x1F\x7F]/', '', $preferredLanguage);
        $projectOverview = preg_replace('/[\x00-\x1F\x7F]/', '', $projectOverview);
        $projectRole = preg_replace('/[\x00-\x1F\x7F]/', '', $projectRole);
        $projectTimeline = preg_replace('/[\x00-\x1F\x7F]/', '', $projectTimeline);

		$cc = [];
    	foreach($salesCCs as $salesCC ) {
    		$cc[]= $salesCC->email;
    	}
    	$s_cc = json_encode($cc);

    	$bcc = [];
    	foreach($salesBCCs as $salesBCC ) {
    		$bcc[] = $salesBCC->email;
    	}
    	$s_bcc = json_encode($bcc);

        if(strpos(strtolower($preferredLanguage), "spanish") !== false){
            $emailID = $this->quote_confirmation_id_spanish;
        } else{
            $emailID = $this->quote_confirmation_id;
        }

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://api.hubapi.com/marketing/v3/transactional/single-email/send?hapikey=$this->apiKey",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => "{\"message\":{\"from\":\"$this->hubspot_sender_name <$this->hubspot_sender_email_address>\",\"to\":\"$email\",\"replyTo\":[\"sales@genemco.com\"],\"cc\":$s_cc,\"bcc\":$s_bcc},\"contactProperties\":{\"firstname\":\"$firstName\",\"lastname\":\"$lastName\",\"company\":\"$company\",\"email\":\"$email\",\"phone\":\"$phone\",\"city\":\"$city\",\"state\":\"$state\",\"country\":\"$country\",\"hs_language\":\"$preferredLanguage\"},\"customProperties\":{\"project_overview\":\"$projectOverview\", \"project_role\":\"$projectRole\", \"project_timeline\":\"$projectTimeline\", \"quote_html\":\"$quoteHtml\", \"quoteid\":\"$quoteID\" },\"emailId\":$emailID}",
		  CURLOPT_HTTPHEADER => array(
		    "accept: application/json",
		    "content-type: application/json"
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
		  return "cURL Error #:" . $err;
		} else {
		  return $response;
		}
    }

    public function sendQuotesEmailtoCustomer($user, $quote, $quotedProducts, $salesRep, $salesCCs, $salesBCCs) {
		$quoteHtml = "<ul style='margin: 0;padding:0;list-style:none;'>";
		foreach ($quotedProducts as $key => $value) {
		    $img = $value->product_image;
		    $sku = $value->product_sku;
		    $title = $value->product_title;
		    $link = $value->product_url;
		    $quoteHtml .= "<li style='display: flex; align-items: center;margin:0;margin-bottom: 10px;'><div style='width: 200px; margin-right: 20px;'><a href='https://genemco.myshopify.com/$link'><img src='$img' style='width: 200px;'></a></div><div class='product_info'><p>$sku</p><a href='https://genemco.myshopify.com/$link'><p><b>$title</b></p></a></div></li>";
		}
		$quoteHtml .= "</ul>";

		$email = $user->email;
    	$firstName = $user->first_name;
    	$lastName = $user->last_name;
    	$company = $user->company_name;
    	$phone = $user->phone;
    	$city = $user->city;
    	$state = $user->state;
    	$country = $user->country;
    	$preferredLanguage = $user->preferred_language;
    	$projectOverview = $quote->about_project_and_request;
    	$projectRole = $quote->role_in_this_project;
    	$projectTimeline = $quote->project_timeline;
    	$dealSubject = $quote->deal_subject;
    	$createdAt = date('m/d/y h:i A', strtotime($quote->created_at));
    	$salesRepFirstName = $salesRep->first_name;
    	$salesRepLastName = $salesRep->last_name;
        $quoteID = $quote->quote_id;

    	if ($preferredLanguage == "Spanish") {
    		$emailContent = $salesRep->email_content_spanish;
            $emailID = $this->email_to_customer_id_spanish;
    	} else {
    		$emailContent = $salesRep->email_content_english;
            $emailID = $this->email_to_customer_id;
    	}

    	$emailContent = str_replace('[Deal_Subject]', $dealSubject, $emailContent);
    	$emailContent = str_replace('[Rep_FirstName]', $salesRepFirstName, $emailContent);
    	$emailContent = str_replace('[Rep_LastName]', $salesRepLastName, $emailContent);
    	$emailContent = str_replace('[Rep_Name]', $salesRepFirstName . " " . $salesRepLastName, $emailContent);
    	$emailContent = str_replace('[', "", $emailContent);
    	$emailContent = str_replace(']', "", $emailContent);
    	$emailContent = str_replace('"', "", $emailContent);
    	$emailContent = str_replace(PHP_EOL, "<br>", $emailContent);
        $emailContent = str_replace("\n", "<br>", $emailContent);
        $emailContent = str_replace("\r", "<br>", $emailContent);

        $email = preg_replace('/[\x00-\x1F\x7F]/', '', $email);
        $firstName = preg_replace('/[\x00-\x1F\x7F]/', '', $firstName);
        $lastName = preg_replace('/[\x00-\x1F\x7F]/', '', $lastName);
        $company = preg_replace('/[\x00-\x1F\x7F]/', '', $company);
        $phone = preg_replace('/[\x00-\x1F\x7F]/', '', $phone);
        $city = preg_replace('/[\x00-\x1F\x7F]/', '', $city);
        $state = preg_replace('/[\x00-\x1F\x7F]/', '', $state);
        $country = preg_replace('/[\x00-\x1F\x7F]/', '', $country);
        $preferredLanguage = preg_replace('/[\x00-\x1F\x7F]/', '', $preferredLanguage);
        $projectOverview = preg_replace('/[\x00-\x1F\x7F]/', '', $projectOverview);
        $projectRole = preg_replace('/[\x00-\x1F\x7F]/', '', $projectRole);
        $projectTimeline = preg_replace('/[\x00-\x1F\x7F]/', '', $projectTimeline);
        $dealSubject = preg_replace('/[\x00-\x1F\x7F]/', '', $dealSubject);
        $createdAt = preg_replace('/[\x00-\x1F\x7F]/', '', $createdAt);
        $salesRepFirstName = preg_replace('/[\x00-\x1F\x7F]/', '', $salesRepFirstName);
        $salesRepLastName = preg_replace('/[\x00-\x1F\x7F]/', '', $salesRepLastName);
        $quoteID = preg_replace('/[\x00-\x1F\x7F]/', '', $quoteID);
        // $emailContent = preg_replace('/[\x00-\x1F\x7F]/', '', $emailContent);

    	$cc = [];
        $cc[] = $salesRep->email;
    	foreach($salesCCs as $salesCC ) {
    		$cc[]= $salesCC->email;
    	}
    	$s_cc = json_encode($cc);

    	$bcc = [];
    	foreach($salesBCCs as $salesBCC ) {
    		$bcc[] = $salesBCC->email;
    	}
    	$s_bcc = json_encode($bcc);

    	$curl = curl_init();
    	curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://api.hubapi.com/marketing/v3/transactional/single-email/send?hapikey=$this->apiKey",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => "{\"message\":{\"from\":\"$this->hubspot_sender_name <$this->hubspot_sender_email_address>\",\"to\":\"$email\",\"replyTo\":[\"sales@genemco.com\"],\"cc\":$s_cc,\"bcc\":$s_bcc},\"contactProperties\":{\"firstname\":\"$firstName\",\"lastname\":\"$lastName\",\"company\":\"$company\",\"email\":\"$email\",\"phone\":\"$phone\",\"city\":\"$city\",\"state\":\"$state\",\"country\":\"$country\",\"hs_language\":\"$preferredLanguage\"},\"customProperties\":{\"project_overview\":\"$projectOverview\", \"project_role\":\"$projectRole\", \"project_timeline\":\"$projectTimeline\", \"quote_html\":\"$quoteHtml\", \"deal_subject\": \"$dealSubject\", \"email_content\": \"$emailContent\", \"created_at\": \"$createdAt\", \"quoteid\":\"$quoteID\"},\"emailId\":$emailID}",
		  CURLOPT_HTTPHEADER => array(
		    "accept: application/json",
		    "content-type: application/json"
		  ),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		 RequestQuoteModel::where('quote_id', $quote->quote_id)->update(['sent_email_to_customer_by_admin' => 'yes']);

		if ($err) {
		  return "cURL Error #:" . $err;
		} else {
		  return $response;
		}
    }

    public function sendQuotesEmailtoSalesRep($user, $quote, $quotedProducts, $salesRep, $salesCCs, $salesBCCs) {
    	$quoteHtml = "<ul style='margin: 0;padding:0;list-style:none;'>";
		foreach ($quotedProducts as $key => $value) {
		    $img = $value->product_image;
		    $sku = $value->product_sku;
		    $title = $value->product_title;
		    $link = $value->product_url;
            $price = number_format((float)$value->product_price, 2, ".", ",");
		    $quoteHtml .= "<li style='display: flex; align-items: center;margin:0;margin-bottom: 10px;'><div style='width: 200px; margin-right: 20px;'><a href='https://genemco.myshopify.com/$link'><img src='$img' style='width: 200px;'></a></div><div><p>$sku</p><a href='https://genemco.myshopify.com/$link'><p><b>$title</b></p></a><br><p style='font-size: 24px;'><b><span>$</span>$price</b></p></div></li>";
		}
		$quoteHtml .= "</ul>";

		$salesRepEmail = $salesRep->email;
		$email = $user->email;
    	$firstName = $user->first_name;
    	$lastName = $user->last_name;
    	$company = $user->company_name;
    	$phone = $user->phone;
    	$city = $user->city;
    	$state = $user->state;
    	$country = $user->country;
    	$preferredLanguage = $user->preferred_language;
    	$projectOverview = $quote->about_project_and_request;
    	$projectRole = $quote->role_in_this_project;
    	$projectTimeline = $quote->project_timeline;
    	$dealSubject = $quote->deal_subject;
    	$createdAt = date('m/d/y h:i A', strtotime($quote->created_at));
    	$salesRepFirstName = $salesRep->first_name;
    	$salesRepLastName = $salesRep->last_name;
        $quoteID = $quote->quote_id;

        $quoteHtml = preg_replace('/[\x00-\x1F\x7F]/', '', $quoteHtml);
        $salesRepEmail = preg_replace('/[\x00-\x1F\x7F]/', '', $salesRepEmail);
        $email = preg_replace('/[\x00-\x1F\x7F]/', '', $email);
        $firstName = preg_replace('/[\x00-\x1F\x7F]/', '', $firstName);
        $lastName = preg_replace('/[\x00-\x1F\x7F]/', '', $lastName);
        $company = preg_replace('/[\x00-\x1F\x7F]/', '', $company);
        $phone = preg_replace('/[\x00-\x1F\x7F]/', '', $phone);
        $city = preg_replace('/[\x00-\x1F\x7F]/', '', $city);
        $state = preg_replace('/[\x00-\x1F\x7F]/', '', $state);
        $country = preg_replace('/[\x00-\x1F\x7F]/', '', $country);
        $preferredLanguage = preg_replace('/[\x00-\x1F\x7F]/', '', $preferredLanguage);
        $projectOverview = preg_replace('/[\x00-\x1F\x7F]/', '', $projectOverview);
        $projectRole = preg_replace('/[\x00-\x1F\x7F]/', '', $projectRole);
        $projectTimeline = preg_replace('/[\x00-\x1F\x7F]/', '', $projectTimeline);
        $dealSubject = preg_replace('/[\x00-\x1F\x7F]/', '', $dealSubject);
        $createdAt = preg_replace('/[\x00-\x1F\x7F]/', '', $createdAt);
        $salesRepFirstName = preg_replace('/[\x00-\x1F\x7F]/', '', $salesRepFirstName);
        $salesRepLastName = preg_replace('/[\x00-\x1F\x7F]/', '', $salesRepLastName);
        $quoteID = preg_replace('/[\x00-\x1F\x7F]/', '', $quoteID);

    	$cc = [];
    	foreach($salesCCs as $salesCC ) {
    		$cc[]= $salesCC->email;
    	}
    	$s_cc = json_encode($cc);

    	$bcc = [];
    	foreach($salesBCCs as $salesBCC ) {
    		$bcc[] = $salesBCC->email;
    	}
    	$s_bcc = json_encode($bcc);

        if(strpos(strtolower($preferredLanguage), "spanish") !== false){
            $emailID = $this->email_to_sales_rep_id_spanish;
        } else{
            $emailID = $this->email_to_sales_rep_id;
        }

    	$curl = curl_init();
        /*
    	curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://api.hubapi.com/marketing/v3/transactional/single-email/send?hapikey=$this->apiKey",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 30,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "POST",
		  CURLOPT_POSTFIELDS => "{\"message\":{\"from\":\"$this->hubspot_sender_name <$this->hubspot_sender_email_address>\",\"to\":\"$salesRepEmail\",\"replyTo\":[\"sales@genemco.com\"],\"cc\":$s_cc,\"bcc\":$s_bcc},\"contactProperties\":{\"firstname\":\"$firstName\",\"lastname\":\"$lastName\",\"company\":\"$company\",\"email\":\"$salesRepEmail\",\"phone\":\"$phone\",\"city\":\"$city\",\"state\":\"$state\",\"country\":\"$country\",\"hs_language\":\"$preferredLanguage\"},\"customProperties\":{\"project_overview\":\"$projectOverview\", \"project_role\":\"$projectRole\", \"project_timeline\":\"$projectTimeline\", \"quote_html\":\"$quoteHtml\", \"deal_subject\": \"$dealSubject\", \"created_at\": \"$createdAt\", \"user_email\": \"$email\", \"sales_rep_first_name\": \"$salesRepFirstName\", \"quoteid\":\"$quoteID\"},\"emailId\":$emailID}",
		  CURLOPT_HTTPHEADER => array(
		    "accept: application/json",
		    "content-type: application/json"
		  ),
		));
        */

        curl_setopt_array($curl, array(
          CURLOPT_URL => "https://api.hubapi.com/marketing/v3/transactional/single-email/send?hapikey=$this->apiKey",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => "{\"message\":{\"from\":\"$this->hubspot_sender_name <$this->hubspot_sender_email_address>\",\"to\":\"$salesRepEmail\",\"replyTo\":[\"sales@genemco.com\"],\"cc\":$s_cc,\"bcc\":$s_bcc},\"customProperties\":{\"project_overview\":\"$projectOverview\", \"project_role\":\"$projectRole\", \"project_timeline\":\"$projectTimeline\", \"quote_html\":\"$quoteHtml\", \"deal_subject\": \"$dealSubject\", \"created_at\": \"$createdAt\", \"user_email\": \"$email\", \"firstname\":\"$firstName\",\"lastname\":\"$lastName\",\"company\":\"$company\",\"phone\":\"$phone\",\"city\":\"$city\",\"state\":\"$state\",\"country\":\"$country\",\"hs_language\":\"$preferredLanguage\", \"sales_rep_first_name\": \"$salesRepFirstName\", \"quoteid\":\"$quoteID\"},\"emailId\":$emailID}",
          CURLOPT_HTTPHEADER => array(
            "accept: application/json",
            "content-type: application/json"
          ),
        ));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		 RequestQuoteModel::where('quote_id', $quote->quote_id)->update(['sent_email_to_sales_rep_by_admin' => 'yes']);

		if ($err) {
		  return "cURL Error #:" . $err;
		} else {
		  return $response;
		}
    }
}
