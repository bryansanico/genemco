@extends('admin.sections.header')
@include('admin.sections.footer')

@section('content')
	@parent
	<div class="grid-x">
		<div class="small-6">
			<h4><strong>Quote#: <span id="quoteID"><?php echo $quote->quote_id; ?><span></strong></h4>
			<h5><?php echo date('m/d/y h:i A', strtotime($quote->created_at)); ?></h5>
			<br>
			<div class="customer-details" data-userid="<?php echo $customer->user_id; ?>">
				<h4><strong>Customer details</strong></h4>
				<p><span id="first_name"><?php echo $customer->first_name ?></span> <span id="last_name"><?php echo $customer->last_name; ?></span></p>
				<p><span id="company_name"><?php echo $customer->company_name; ?></span></p>
				<p><span id="email"><?php echo $customer->email; ?></span></p>
				<p><span id="phone"><?php echo $customer->phone; ?></span></p>
				<p><span id="city"><?php echo $customer->city; ?></span> , <span id="state"><?php echo $customer->state; ?></span> <span id="country"><?php echo $customer->country; ?></span></p>
				<br>
				<p>Preferred Language: <span id="preferred_language"><?php echo $customer->preferred_language; ?></span></p>
				<br>
				<p>Project Role: <span id="role_in_this_project"><?php echo $quote->role_in_this_project; ?></span></p>
				<p>Project Timeline: <span id="project_timeline"><?php echo $quote->project_timeline; ?></span></p>
				<p>Project Overview: <span id="about_project_and_request"><?php echo $quote->about_project_and_request; ?></span></p>
				<br>
				<p><a id="admin_edit_cutomer_details">Edit Customer Details</a></p>
			</div>
		</div>
		<div class="small-6" style="display: flex; flex-wrap: wrap; flex-flow: column; justify-content: space-between;">
			<div style="text-align: right;">
				<select name="set_quote_status" id="set_quote_status">
					<option value="new" <?php if ( $quote->status == "new" ): echo "selected"; endif; ?>>New</option>
					<option value="active" <?php if ( $quote->status == "active" ): echo "selected"; endif; ?>>Active</option>
					<option value="saved_for_later" <?php if ( $quote->status == "saved_for_later" ): echo "selected"; endif; ?>>Saved for Later</option>
					<option value="converted_to_order" <?php if ( $quote->status == "converted_to_order" ): echo "selected"; endif; ?>>Converted to Order</option>
					<option value="not_responsive" <?php if ( $quote->status == "not_responsive" ): echo "selected"; endif; ?>>Not Responsive</option>
					<option value="deleted" <?php if ( $quote->status == "deleted" ): echo "selected"; endif; ?>>Deleted</option>
				</select>
				<select name="set_sales_rep" id="set_sales_rep" required>
					<option value="" data-ownerid="">Please select sales rep</option>
					<?php foreach ( $salesRep as $rep ): ?>
					<option value="<?php echo $rep->sales_rep_id; ?>" <?php if ( $quote->sales_rep_id == $rep->sales_rep_id ): echo "selected"; endif; ?>  data-ownerid="<?php echo $rep->owner_id; ?>">
						<?php echo $rep->first_name . " " . $rep->last_name; ?>
					</option>
					<?php endforeach; ?>
				</select>
			</div>
			<div style="text-align: right;">
				<h3><span id="hubspot_image" <?php if ($quote->hubspot_deal_id == ""): ?>style="display: none;"<?php endif ?>><a href="<?php echo "https://app.hubspot.com/contacts/6369229/deal/" . $quote->hubspot_deal_id; ?>" target="_blank"><img src="{{ asset('img/Hubspot Icon.png') }}" style="width: 50px;"></a></span><strong>Hubspot</strong></h3>
				<p><a id="hubspot_deal">Hubspot Deal</a></p>
				<input type="text" id="deal_subject" value="<?php echo $quote->deal_subject ?>">
				<p style="text-align: left;"><a id="save_hubspot_deal">Save Subject</a></p>
			</div>
		</div>
	</div>

	<div class="grid-x" style="margin-top: 50px; padding: 50px 0; border-top: solid 2px #999;">
		<div class="small-6">
			<h3><strong>Products In Quote</strong></h3>
		</div>
		<div class="small-6" style="text-align: right;">
			<p><a id="add_product_to_quote">Add Products</a></p>
			<p><a id="removed_products_from_quote">Removed Products</a></p>
		</div>
	</div>

	<div class="grid-x">
		<div class="small-12">
			<table>
				<thead>
					<tr>
						<th colspan="1">Product image</th>
						<th colspan="1">SKU</th>
						<th colspan="2">Title</th>
						<th colspan="2">Price</th>
						<th colspan="3">Notes</th>
						<th colspan="1"></th>
					</tr>
				</thead>
				<tbody>
					<?php foreach($products as $product):?>
						<?php if ($product->isactive): ?>
						<tr data-productID="<?php echo $product->product_id; ?>" data-variantID="<?php echo $product->product_variant; ?>" data-historyID="<?php echo $product->product_history_id; ?>" data-userID="<?php echo $customer->user_id; ?>" class="quoted-product">
							<td colspan="1"><a href="<?php echo 'https://' . $domain . '/admin/products/' . $product->product_id; ?>" target="_blank"><img src="<?php echo $product->product_image; ?>"></a></td>
							<td colspan="1"><?php echo $product->product_sku; ?></td>
							<td colspan="2"><a href="<?php echo 'https://' . $domain . '/admin/products/' . $product->product_id; ?>" target="_blank" class="product_title"><?php echo $product->product_title; ?></a></td>
							<td colspan="2"><div class="product-price-wrapper"><input type="number" name="product_price" value="<?php echo $product->product_price; ?>"></div></td>
							<td colspan="3">
								<textarea name="admin_note"><?php echo $product->admin_comment; ?></textarea>
							</td>
							<td colspan="1">
								<a class="product-save button">Save</a>
								<a class="product-history button">History</a>
								<a class="product-approve button <?php if ($product->approved_by_admin == true) : echo "disabled"; endif; ?>"><?php if ($product->approved_by_admin == true) : echo "Approved"; else: echo "Approve"; endif; ?></a>
								<a class="product-remove button">Remove</a>
							</td>
						</tr>
						<?php endif; ?>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</div>
	<div class="grid-x">
		<div class="small-4" style="text-align: left;">
			<a class="approve_quote button <?php if ( $quote->approved ): echo 'disabled'; endif; ?>">Approve Quote for Customer Portal</a>
			<a class="convert_quote_to_order button <?php if ( $quote->ordered ): echo 'disabled'; endif; ?>" data-userid="<?php echo $customer->user_id; ?>">Convert Quote to ORDER</a>
		</div>
		<div class="small-4" style="text-align: right;">
			
		</div>
		<div class="small-4" style="text-align: right;">
			<a class="send_deal_to_hubspot button" data-status="<?php echo $quote->sent_deal_to_hubspot == "" ? "no" : $quote->sent_deal_to_hubspot; ?>">Send deal to hubspot</a>
			<br>
			<a class="send_email_to_customer button" data-status="<?php echo $quote->sent_email_to_customer_by_admin == "" ? "no" : $quote->sent_email_to_customer_by_admin; ?>">Send Email to Customer</a>
			<br>
			<a class="send_email_to_sales_rep button" data-status="<?php echo $quote->sent_email_to_sales_rep_by_admin == "" ? "no" : $quote->sent_email_to_sales_rep_by_admin; ?>">Send Email to Sales Rep</a>
			<br>
			<a class="see_email_history button">Transaction hostory</a>
		</div>
	</div>
@endsection

<style type="text/css">
	p {
		margin-bottom: 5px !important;
		font-size: 1.2rem !important;
	}
	#set_quote_status {
		display: block;
		max-width: 250px;
		margin-bottom: 10px !important;
		margin-left: auto !important;
	}

	#set_sales_rep {
		display: block;
		max-width: 250px;
		margin-left: auto !important;
	}
</style>