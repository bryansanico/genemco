@extends('admin.sections.header')
@include('admin.sections.footer')

@section('content')
	@parent
	<?php 
		// print phpinfo();
	 ?>
	<div class="main-controls grid-x">
		<div class="main-controls__left cell small-2">
			<h2 class="title"><strong>Quotes</strong></h2>
		</div>
		<div class="main-controls__right cell small-10">
			<div class="grid-x">
				<div class="cell small-9">
					<input type="text" name="search_by_input" id="search_by_input" placeholder="Search Name or Email" value="<?php echo $search_term; ?>">
				</div>
				<div class="cell small-3">
					<select name="filter_by_status" id="filter_by_status" onchange="location = this.value">
						<option value="<?php echo url()->current() . '?status=new' ?>" <?php if ($status == 'new'): ?> selected <?php endif; ?>>New</option>
						<option value="<?php echo url()->current() . '?status=active' ?>" <?php if ($status == 'active'): ?> selected <?php endif; ?>>Active</option>
						<option value="<?php echo url()->current() . '?status=saved_for_later' ?>" <?php if ($status == 'saved_for_later'): ?> selected <?php endif; ?>>Saved for Later</option>
						<option value="<?php echo url()->current() . '?status=converted_to_order' ?>" <?php if ($status == 'converted_to_order'): ?> selected <?php endif; ?>>Converted to Order</option>
						<option value="<?php echo url()->current() . '?status=not_responsive' ?>" <?php if ($status == 'not_responsive'): ?> selected <?php endif; ?>>Not Responsive</option>
						<option value="<?php echo url()->current() . '?status=deleted' ?>" <?php if ($status == 'deleted'): ?> selected <?php endif; ?>>Deleted</option>
					</select>
					<a id="add_new_quote">New Quote +</a>
				</div>
			</div>
		</div>
	</div>
	<div class="quotes-table">
		<div class="grid-x">
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Date</th>
						<th>Full Name</th>
						<th>Company Name</th>
						<th>Deal Subject</th>
						<th>Total Price</th>
						<th>Sales Rep</th>
					</tr>
				</thead>
				<tbody>
					<?php foreach ( $quotes as $quote ): ?>
						<tr>
						<?php
							$total_price = 0;
							foreach ( $quoted_products[$quote->quote_id] as $quoted_product ) {
								$total_price += $quoted_product->product_price;
							}
						?>
						<td><?php if ($quote->hubspot_deal_id != ""): ?><a href="<?php echo "https://app.hubspot.com/contacts/6369229/deal/" . $quote->hubspot_deal_id; ?>" target="_blank"><img src="{{ asset('img/Hubspot Icon.png') }}" style="width: 30px;"></a><?php endif; ?></td>
						<td><a href="/quote/<?php echo $quote->quote_id; ?>"><?php echo date('m/d/y h:i A', strtotime($quote->created_at)); ?></a></td>
						<td><a data-userid="<?php echo $quote->user_id; ?>" class="merge_quote"><?php echo $users[$quote->user_id]->first_name . " " . $users[$quote->user_id]->last_name; ?></a></td>
						<td><?php echo $users[$quote->user_id]->company_name; ?></td>
						<td><?php echo $quote->deal_subject; ?></td>
						<td><?php echo "$" . " " . number_format($total_price); ?></td>
						<td>
							<?php 
								foreach($sales_reps as $salesRep) {
									if ($salesRep->sales_rep_id == $quote->sales_rep_id) {
										echo $salesRep->first_name . " " . $salesRep->last_name;
									}
								}
							?>
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
                    <?php echo $quotes->appends(['per_page' => $perPage, 'status' => $status, 'search_term' => $search_term])->render(); ?>
                </div>
            </div>
        </div>
    </div>
@endsection
