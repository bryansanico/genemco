@extends('admin.sections.header')
@include('admin.sections.footer')

@section('content')
	@parent
	<div id="hubspot-settings">
		<h2 style="text-align: center;">Hubspot settings</h2>
		<table>
			<tr>
				<th style="width: 500px;">Hubspot API key</th>
				<td><input type="text" name="hubspot_key" value="<?php echo $hubspotSettings->hubspot_api_key; ?>"></td>
			</tr>
			<tr>
				<th>Email From Name</th>
				<td><input type="text" name="hubspot_sender_name" value="<?php echo $hubspotSettings->hubspot_sender_name ?>"></td>
			</tr>
			<tr>
				<th>Email From Email</th>
				<td><input type="text" name="hubspot_sender_email_address" value="<?php echo $hubspotSettings->hubspot_sender_email_address; ?>"></td>
			</tr>
			<tr>
				<th>Email ID: Website Quote Confirmation</th>
				<td><input type="text" name="quote_confirmation_id" value="<?php echo $hubspotSettings->quote_confirmation_id; ?>"></td>
			</tr>
			<tr>
				<th>Email ID: Website Quote Confirmation(Spanish)</th>
				<td><input type="text" name="quote_confirmation_id_spanish" value="<?php echo $hubspotSettings->quote_confirmation_id_spanish; ?>"></td>
			</tr>
			<tr>
				<th>Email ID: Send Deal to Customer and Sales</th>
				<td><input type="text" name="email_to_customer_id" value="<?php echo $hubspotSettings->email_to_customer_id; ?>"></td>
			</tr>
			<tr>
				<th>Email ID: Send Deal to Customer and Sales(Spanish)</th>
				<td><input type="text" name="email_to_customer_id_spanish" value="<?php echo $hubspotSettings->email_to_customer_id_spanish; ?>"></td>
			</tr>
			<tr>
				<th>Email ID: Send Lead to Sales Only</th>
				<td><input type="text" name="email_to_sales_rep_id" value="<?php echo $hubspotSettings->email_to_sales_rep_id; ?>"></td>
			</tr>
			<tr>
				<th>Email ID: Send Lead to Sales Only(Spanish)</th>
				<td><input type="text" name="email_to_sales_rep_id_spanish" value="<?php echo $hubspotSettings->email_to_sales_rep_id_spanish; ?>"></td>
			</tr>
		</table>
		<a class="button save" style="display: block;">Save</a>
	</div>
	<div class="salesRep-table">
		<h2>Sales Rep</h2>
		<a class="button" id="add_a_new_sales_rep">Add new</a>
		<div class="grid-x">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Owner ID</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<?php
						$num = $perPage * ($page - 1);
					?>
					<?php foreach($salesRep as $rep): $num++ ?>						
						<tr>
							<td><?php echo $num; ?></td>
							<td><?php echo "<span class='first_name'>" . $rep->first_name . "</span>" . " " . "<span class='last_name'>" . $rep->last_name . "</span>"; ?></td>
							<td><?php echo $rep->email; ?></td>
							<td><?php echo $rep->phone; ?></td>
							<td><?php echo $rep->owner_id; ?></td>
							<td>
								<a class="delete_sales_rep button" style="margin-bottom: 0" data-id="<?php echo $rep->sales_rep_id; ?>">Delete</a>
								<a class="edit_sales_rep button" style="margin-bottom: 0" data-id="<?php echo $rep->sales_rep_id; ?>">Edit</a>
								<a class="sales_rep_email_content button" style="margin-bottom: 0;" data-id="<?php echo $rep->sales_rep_id; ?>">Email content</a>
								<textarea class="email_english" style="display: none;" data-id="<?php echo $rep->sales_rep_id; ?>"><?php echo $rep->email_content_english; ?></textarea>
								<textarea class="email_spanish" style="display: none;" data-id="<?php echo $rep->sales_rep_id; ?>"><?php echo $rep->email_content_spanish; ?></textarea>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</div>
	<div class="grid-container">
        <div class="grid-x rid-padding-x">
            <div class="medium-12 cell">
                <div class="genemco_pagination-wrap">
                    <?php echo $salesRep->appends(['per_page' => $perPage])->render(); ?>
                </div>
            </div>
        </div>
    </div>
    <br>
    <br>
    <div class="salesCC-table">
    	<h2>Sales CC</h2>
		<a class="button" id="add_a_new_sales_cc">Add new</a>
		<div class="grid-x">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Owner ID</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<?php
						$num = 0;
					?>
					<?php foreach($salesCC as $cc): $num++ ?>						
						<tr>
							<td><?php echo $num; ?></td>
							<td><?php echo "<span class='first_name'>" . $cc->first_name . "</span>" . " " . "<span class='last_name'>" . $cc->last_name . "</span>"; ?></td>
							<td><?php echo $cc->email; ?></td>
							<td><?php echo $cc->owner_id; ?></td>
							<td>
								<a class="delete_sales_cc button" style="margin-bottom: 0" data-id="<?php echo $cc->sales_cc_id; ?>">Delete</a>
								<a class="edit_sales_cc button" style="margin-bottom: 0" data-id="<?php echo $cc->sales_cc_id; ?>">Edit</a>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</div>
	<br>
	<br>
	<div class="salesBCC-table">
    	<h2>Sales BCC</h2>
		<a class="button" id="add_a_new_sales_bcc">Add new</a>
		<div class="grid-x">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Owner ID</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<?php
						$num = 0;
					?>
					<?php foreach($salesBCC as $bcc): $num++ ?>						
						<tr>
							<td><?php echo $num; ?></td>
							<td><?php echo "<span class='first_name'>" . $bcc->first_name . "</span>" . " " . "<span class='last_name'>" . $bcc->last_name . "</span>"; ?></td>
							<td><?php echo $bcc->email; ?></td>
							<td><?php echo $bcc->owner_id; ?></td>
							<td>
								<a class="delete_sales_bcc button" style="margin-bottom: 0" data-id="<?php echo $bcc->sales_bcc_id; ?>">Delete</a>
								<a class="edit_sales_bcc button" style="margin-bottom: 0" data-id="<?php echo $bcc->sales_bcc_id; ?>">Edit</a>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</div>
@endsection
