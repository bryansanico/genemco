@extends('shopify-app::layouts.default')

@section('styles')
	<link rel="stylesheet" type="text/css" href="{{ asset('/css/library.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/app.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
@endsection

@section('scripts')
    @parent

    <script type="text/javascript">
        var AppBridge = window['app-bridge'];
        var actions = AppBridge.actions;
        var TitleBar = actions.TitleBar;
        var Button = actions.Button;
        var Redirect = actions.Redirect;
        var titleBarOptions = {
            title: 'Welcome',
        };
        var myTitleBar = TitleBar.create(app, titleBarOptions);
    </script>
    <script src="{{ asset('/js/app.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
@endsection

@section('content')
<?php
	
	?>

	<a class="back_btn" href="/">< Back</a>

	<h3 class="text-center" style="text-transform: uppercase;">Customer Info</h3>
	<table class="hover" id="customer-info_table">
		<tbody>
			<tr>
				<td class="td-header">First Name</td>
				<td><?php echo $customer->first_name; ?></td>
				<td class="td-header">Last Name</td>
				<td><?php echo $customer->last_name; ?></td>
				<td class="td-header">Address1</td>
				<td><?php echo $customer->address1; ?></td>
				<td class="td-header">Address2</td>
				<td><?php echo $customer->address2; ?></td>
			</tr>
			<tr>
				<td class="td-header">City</td>
				<td><?php echo $customer->city; ?></td>
				<td class="td-header">Country</td>
				<td><?php echo $customer->country; ?></td>
				<td class="td-header">Province</td>
				<td><?php echo $customer->province; ?></td>
				<td class="td-header">Zip</td>
				<td><?php echo $customer->zip; ?></td>
			</tr>
			<tr>
				<td class="td-header">Email</td>
				<td colspan="3"><?php echo $customer->email; ?></td>
				<td class="td-header">Created at</td>
				<td><?php echo $customer->created_at; ?></td>
				<td class="td-header">Updated at</td>
				<td><?php echo $customer->updated_at; ?></td>
			</tr>
			<tr style="display: none;">
				<td>
					<input type="hidden" name="quote_id" id="quote_id" value="<?php echo $customer->quote_id; ?>">
				</td>
			</tr>
		</tbody>
	</table>


	<h3 class="text-center" style="margin-top: 100px; text-transform: uppercase;">Requested Products</h3>
	<table>

		<thead id="requested-products_table">
			<tr>
				<th></th>
				<th>Image</th>
				<th>Name</th>
				<th>Price</th>
				<th>Product ID</th>
				<th>Variant ID</th>
				<th>Additional Info</th>
				<th></th>
			</tr>
		</thead>

		<tbody>
		<?php

		foreach ($products as $index => $product) {

			if ($product->isactive):

			?>

			<tr style="background-color: #f5f5f5; border-bottom: solid 1px #cecece;" class="requested-products_row">
				<td><input type="button" name="product-remove" class="button clear prouduct_remove" value="Remove" data-prdouctid="<?php echo $product->product_id ?>"></td>
				<td><img src="<?php echo $product->product_image; ?>"></td>
				<td><?php echo $product->product_title; ?></td>
				<td>
					<input type="text" name="product_price" class="product_price" value="<?php echo $product->product_price; ?>">
				</td>
				<td>
					<input type="text" name="product_id" class="product_id" value="<?php echo $product->product_id; ?>" disabled class="text-center">
				</td>
				<td>
					<input type="text" name="product_variant_id" class="product_variant_id" value="<?php echo $product->product_variant; ?>" disabled class="text-center">

				</td>
				<td><textarea name="product_addtional-info"></textarea></td>
				<td>
					<input type="hidden" name="product_history_id" value="<?php echo $product->product_history_id ?>">
					<input type="button" name="product-history" value="History" class="button clear product_history" href="javascript:;">
					<input type="button" name="product-save" value="Save" class="button product_save">
					<input type="button" name="product-approve" value="<?php echo $product->approved_by_admin ? 'Approved' : 'Approve'; ?>" class="button product_approve <?php echo $product->approved_by_admin ? 'disabled' : ''; ?>" data-quoteid="<?php echo $product->quote_id; ?>" data-productid="<?php echo $product->product_id; ?>">
				</td>
			</tr>

			<?php

			endif;
		}

		?>

		<tr>
			<td colspan="8" style="text-align: right;" >
				<input type="button" name="product_make-order" id="product_make-order" value="<?php echo $customer->ordered ? 'Ordered' : 'Make Order'; ?>" class="button" <?php if ( $customer->ordered == true ) { echo 'disabled'; } ?>>
				<input type="button" name="product_add" id="product_add" class="button" value="Add Product">
			</td>
		</tr>

		</tbody>

	</table>

	<input type="button" name="quote_approve" id="quote_approve" value="<?php echo $customer->approved ? 'Quote Approved' : 'Quote Approve'; ?>" class="button" <?php if ( $customer->approved == true ) { echo 'disabled'; } ?>>
	<a class="send_msg btn button">Send Email</a>
	<a class="show-deleted-products btn button">Removed Products</a>
	</div>

	<script type="text/javascript">
		window.customer = {
			email: "<?php echo $customer->email; ?>",
			first_name: "<?php echo $customer->first_name; ?>",
			last_name: "<?php echo $customer->last_name; ?>",
			address1: "<?php echo $customer->address1; ?>",
			address2: "<?php echo $customer->address2; ?>",
			city: "<?php echo $customer->city; ?>",
			country: "<?php echo $customer->country; ?>",
			province: "<?php echo $customer->province; ?>",
			zip: "<?php echo $customer->zip; ?>",
			customer_id: "<?php echo $customer->customer_id; ?>",
			quote_id: "<?php echo $customer->quote_id; ?>",
			created_at: "<?php echo $customer->created_at; ?>",
			updated_at: "<?php echo $customer->updated_at; ?>"
		};

		window.domain = "<?php echo $domain; ?>";
	</script>

	<?php

?>
@endsection
