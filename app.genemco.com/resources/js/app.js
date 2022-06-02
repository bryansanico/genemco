require('./bootstrap');

(function($){
	$(document).ready(function($) {

		//initialize foundation js
		$('html').addClass('no-js');
		$(document).foundation();

		$('#status').removeAttr('disabled');

		//app pagination
		$('.pagination-wrapper .pagination-text').on('click', function(e) {
			$(this).closest('.pagination-wrapper').toggleClass('active');
		});

		$(document).on('click', 'a.convert_quote_to_order', function(e) {
			if ($(this).hasClass('active')) return;

			// Disable button
			$(this).addClass('disabled');

			var $this = $(this);

			let quoteID = $('#quoteID').text();
			let userID = $this.data('userid');

			// Collect info
			var lineItems = Array();
			$('.quoted-product').each(function(index, value) {
				lineItems.push({ 
					"product_id": $(this).data('productid'),
					"quantity": 1,
					"price": $(this).find('input[name="product_price"]').val(),
					"variant_id": $(this).data('variantid'),
					"title": $(this).find('a.product_title').text()
				})
			});

			$.ajaxSetup({
				headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				}
			});

			// Call Shopify Admin order api
			// POST /admin/api/2020-07/orders.json
			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'orders.json',
					data: {
						lineItems: lineItems,
						user_id: userID,
						quote_id: quoteID
					}
				},
				success: function( response ) {
					$this.val('Ordered');
					$.fancybox.open('<div class="message"><p style="text-align: center;">Successfully Ordered!</p></div>');
					console.log( response );
				}
			});
		});

		$(document).on('click', 'a.product-save', function(e) {

			let $this = $(this);

			if ($this.hasClass('disabled')) return;

			// Disable button
			$this.addClass('disabled');

			let quoteID = $('#quoteID').text();
			let productID = $this.closest('tr').data('productid');
			let variantID = $this.closest('tr').data('variantid');
			let historyID = $this.closest('tr').data('historyid');
			let price = $this.closest('tr').find('input[name="product_price"]').val();
			let addtionalNote = $this.closest('tr').find('textarea[name="admin_note"]').val();

			let info = {
				'quote_id': quoteID,
				'product_id': productID,
				'variant_id': variantID,
				'history_id': historyID,
				'price': price,
				'additional_note': addtionalNote
			};
			console.log(info);

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'save.product',
					data: {
						info: info
					}
				},
				success: function( response ) {

					setTimeout(function() {
						$this.removeClass('disabled');
						$.fancybox.open('<div class="message"><h2 style="text-align: center; text-transform: uppercase; font-weight: bold;">History!</h2><p style="text-align: center;">' + response + '</p></div>');
					}, 350);
					console.log( response );
				}
			});
		});

		$(document).on('click', 'a.product-history', function(e) {
			let $this = $(this);

			if ($this.hasClass('disabled')) return;

			// Disable button
			$this.addClass('disabled');

			let quoteID = $('#quoteID').text();
			let productID = $this.closest('tr').data('productid');
			let variantID = $this.closest('tr').data('variantid');
			let historyID = $this.closest('tr').data('historyid');

			var info = {
				'quote_id': quoteID,
				'product_id': productID,
				'variant_id': variantID,
				'history_id': historyID,
			};

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'history.product',
					data: {
						info: info
					}
				},
				success: function( response ) {

					setTimeout(function() {
						$this.removeClass('disabled');
						console.log(response.success);

						var html = '<table>';

						html += '<tr><th>From</th><th>Status</th><th>Date</th><th>Old Price</th><th>New Price</th><th>Comment</th></tr>';

						$.each(response.success, (key, history) => {
							html += '<tr><td>' + history.from + '</td><td>' + history.status + '</td><td>' + history.date + '</td><td>$' + history.old_price + '</td><td>$' + history.new_price + '</td><td>' + history.comment + '</td></tr>';
						});

						html +='</table>'

						$.fancybox.open('<div class="message"><h2 style="text-align: center; text-transform: uppercase; font-weight: bold;">History!</h2>' + html + '</div>');

					}, 350);
					console.log( response );
				}
			});
		});

		$(document).on('click', 'a.approve_quote', function(e) {			

			if ($(this).hasClass('disabled')) return;
			$(this).addClass('disabled');

			let quoteID = $('#quoteID').text();
			let customerId = $('.customer-details').data('userid');

			var info = {
				'quote_id': quoteID,
				'user_id': customerId
			};

			var $this = $(this);

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'approve.quote.all.products',
					data: {
						info: info
					}
				},
				success: function( response ) {

					setTimeout(function() {
						$this.val('Approved');
						$.fancybox.open('<div class="message"><p style="text-align: center;">Successfully Approved!</p></div>');
					}, 350);
					console.log( response );
				}
			});
		});

		$(document).on('click', 'a#add_product_to_quote', function(e) {

			$.fancybox.open('<div class="genemco-add-popup">' +
				'<input type="text" placeholder="Search products" id="product_search_inputbox" name="product_search_inputbox">' +
				'</div>');

			var searchTimeout;
			var $parent = $('.genemco-add-popup');
			let quoteID = $('#quoteID').text();

			$(document).on('keyup', 'input[name=product_search_inputbox]', function(e) {
				var term = $(this).val();

				if (searchTimeout) clearTimeout(searchTimeout);

				searchTimeout = setTimeout(function(){
					console.log(term);
					$.ajax({
						method: 'POST',
						url: '/adminAjax',
						data: {
							action: 'product.search',
							data: {
								term: term
							}
						},
						success: function( response ) {

							console.log(response);

							if (response.errors == false) {

								let $html = '<ul id="search-result" style="margin: 0; margin-top: 20px;">';

								$.each(response.body.data.products.edges, (index, product) => {
									$html += '<li style="list-style: none; display: flex; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: solid 1px #7777;">'
									+ '<input type="checkbox" value="' + index + '" style="width: 20px; height: 20px; margin: 0;">'
									+ '<div class="searched-product" style="display: flex; align-items: center; margin-left: 10px; justify-content: space-between; width: 100%;">'
									+ '<div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">'
									+ '<span style="width: 150px; height: 150px; background-image: url(' + product.node.featuredImage.originalSrc + '); background-position: center center; background-size: contain; background-repeat: no-repeat; border: solid 1px #ccc; display: block;"></span>'
									+ '<p class="product-name" style="margin: 0; font-size: 16px !important;">' + product.node.title + '</p>'
									+ '<p class="product-sku" style="font-size: 14px !important;">SKU: ' + product.node.variants.edges[0].node.sku + '</p>'
									+ '</div>'
									+ '</div>'
									+ '</li>';
								});

								$html += '</ul>';
								$html += '<input type="button" name="add_selected" value="Add" class="button add_selected">';

								$parent.find('#search-result').remove();
								$parent.find('input[name="add_selected"]').remove();
								$parent.append($html);

								$(document).on('click', 'input[name="add_selected"]', function(e) {
									var checkboxes = $parent.find('#search-result input[type="checkbox"]');
									var selectedItems = Array();

									if (checkboxes.length > 0) {
										$.each(checkboxes, (index, checkbox) => {
											if ($(checkbox).prop('checked')) {
												selectedItems.push(response.body.data.products.edges[$(checkbox).val()]);
											}
										});

										$.ajax({
											method: 'POST',
											url: '/adminAjax',
											data: {
												action: 'add.selectedProducts',
												data: {
													quoteID: quoteID,
													products: selectedItems
												}
											},
											success: function( response ) {

												setTimeout(function() {
													window.location.reload();
													// console.log(response);
												}, 350);
											}
										});
									}
								});
							}
						}
					});

					clearTimeout(searchTimeout);
				}, 800);
			});
		});

		$(document).on('click', 'a.product-approve', function(e) {
			let $this = $(this);

			if ($this.hasClass('disabled')) return;

			// Disable button
			$this.addClass('disabled');

			let quoteID = $('#quoteID').text();
			let productID = $this.closest('tr').data('productid');

			var info = {
				'quoteID': quoteID,
				'productID': productID
			};

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'approve.product',
					data: {
						info: info
					}
				},
				success: function( response ) {

					setTimeout(function() {
						$this.text('Approved');
						$.fancybox.open('<div class="message"><p style="text-align: center;">Product Approved!</p></div>');
					}, 350);
					console.log( response );
				}
			});
		});

		$(document).on('click', 'a.product-remove', function(e) {

			let $this = $(this);

			if ($this.hasClass('disabled')) return;

			// Disable button
			$this.addClass('disabled');

			let quoteID = $('#quoteID').text();
			let productID = $this.closest('tr').data('productid');

			var info = {
				'quoteID': quoteID,
				'productID': productID
			},
			$parentRow = $(this).closest('tr');

			$.fancybox.open('<div class="confirmation-popup" style="max-width: 300px; width: 90%;">'+
				'<p style="text-align: center;">Are you sure to trash this product?</p>' +
				'<div style="text-align: center">' + 
				'<a class="button alert yes" style="margin-right: 15px;">Trash</a>' +
				'<a class="button secondary no">Cancel</a>' +
				'</div>' +
				'</div>');

			$(document).on('click', '.confirmation-popup a.yes', function(e) {

				$.ajax({
					method: 'POST',
					url: '/adminAjax',
					data: {
						action: 'trash.product',
						data: {
							info: info
						}
					},
					success: function( response ) {
						console.log(response);
						$parentRow.hide(1000, function(){
							$.fancybox.close();
							$parentRow.remove();
						});
					}
				});
			});

			$(document).on('click', '.confirmation-popup a.no', function(e) {
				$.fancybox.close();
			});
		});

		$(document).on('click', 'a#removed_products_from_quote', function(e) {
			let $this = $(this);

			if ($this.hasClass('disabled')) return;

			// Disable button
			$this.addClass('disabled');

			let quoteID = $('#quoteID').text();
			
			var info = { 'quoteID': quoteID };

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'get.removed.product',
					data: {
						info: info
					}
				},
				success: function( response ) {
					// $parentRow.hide(1000, function(){
					// 	$.fancybox.close();
					// 	$parentRow.remove();
					// });
					var html = '';

					html += '<table class="table table--loose">' +
							'<thead><tr><th></th><th></th></tr></thead>' +
							'<tbody>';
					$this.removeClass('disabled');

					$.each(response, (index, product) => {
						var tableRowHtml = '';

						tableRowHtml += '<tr>';
						tableRowHtml += '<td style="width: 30px">'
							 	+ '<a class="restore ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" title="Restore this product" style="cursor: pointer;">Restore</a>'
							 	+ '</td>';
						tableRowHtml += '<td class="line-item__product-info">'
								+ '<div style="display: flex; align-items: center; justify-content: space-between;">'
								+ '<div class="line-item__image-wrapper">'
								+ '<div class="aspect-ratio aspect-ratio--square">'
								+ '<img src="'+ product.product_image + '">'
								+ '</div>'
								+ '</div>'
								+ '<div style="width: 250px;">'
								+ '<p style="padding: 5px; text-align: right;">' + product.product_title + '</p>'
								+ '<div class="line-item__price-list">'
								+ '<p style="padding: 5px; text-align: right;">' + (product.approved_by_admin ? '$' + product.product_price : 'Pending price...') + '</p>'
								+ '</div>'
								+ '</div>'
								+ '</div>'
								+ '</td>';
						tableRowHtml += '</tr>';

						if (product.isactive == false) {
							html += tableRowHtml;
						}
					});

					html += '</tbody></table>';

					$.fancybox.open('<div class="confirmation-popup" style="max-width: 650px; width: 90%;">' + 
						'<p style="text-align: center;">' + 'Deleted products</p>' +
						html +
						'</div>');

					$(document).on('click', 'a.restore', function(e) {
						var info = {
							'quoteID': $(this).data('quoteid'),
							'productID': $(this).data('productid')
						};

						$.ajax({
							method: 'POST',
							url: '/adminAjax',
							data: {
								action: 'restore.product',
								data: {
									info: info
								}
							},
							success: function( response ) {
								window.location.reload();
							}
						});

					});
				}
			});
		});

		var searchTimeout;
		$(document).on('keyup', 'input[name="search_by_input"]', function(e) {
			var searchTerm = $(this).val();
			var $parentRow = $('.genemco_info-table tbody');

			if (searchTimeout) {
				clearTimeout(searchTimeout);
			}

			searchTimeout = setTimeout(function() {

				// $.ajax({
				// 	method: 'POST',
				// 	url: '/adminAjax',
				// 	data: {
				// 		action: 'search.quote',
				// 		data: {
				// 			info: {'searchTerm': searchTerm}
				// 		}
				// 	},
				// 	success: function( response ) {
				// 		// $parentRow.hide(1000, function(){
				// 		// 	$.fancybox.close();
				// 		// 	$parentRow.remove();
				// 		// });
				// 		// $parentRow.empty();

				// 		// $.each(response, (index, quote) => {
				// 		// 	var html = '';
				// 		// 	html += '<tr>'
				// 		// 		+ '<td>' + quote.id + '</td>'
				// 		// 		+ '<td>' + quote.first_name + ' ' + quote.last_name + '</td>'
				// 		// 		+ '<td>' + quote.email + '</td>'
				// 		// 		+ '<td>' + quote.customer_id + '</td>'
				// 		// 		+ '<td>' + quote.created_at + '</td>'
				// 		// 		+ '<td>' + '<a href="/quote/' + quote.quote_id + '">more</a>' + '</td>'
				// 		// 		+ '</tr>';

				// 		// 	$parentRow.append(html);
				// 		// });
				// 		console.log(response);
				// 	}
				// });

				window.location = window.location.origin + "?search_term=" + $('#search_by_input').val() + "&status=" + $('#filter_by_status').val();

				clearTimeout(searchTimeout);
			}, 600);
		});

		$('.merge_quote').on('click', function(e) {
			e.preventDefault();

			let $this = $(this);
			let userID = $this.data('userid');

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'get.quotes.by.userid',
					data: {
						info: {
							'user_id': userID
						}
					}
				},
				success: function( quotes ) {
					let tbodyHtml = "";
					quotes.forEach(quote => {
						tbodyHtml += `<tr><td><input type="checkbox" data-quoteid="${quote.quote_id}" style="margin-bottom: 0;"></td><td>${$this.text()}</td><td>${quote.created_at}</td></tr>`;
					});

					$.fancybox.open(`
						<div class="merge_quote_popup">
							<table>
								<thead>
									<tr>
										<th></th>
										<th>Contact Name</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
								${tbodyHtml}
								</tbody>
							</table>
							<a class="merge_selected_quote button">Merge</a>
						</div>
					`);

					$(document).on('click', '.merge_quote_popup a.merge_selected_quote', function(e) {
						let $this = $(this);
						let quoteIDs = "";

						if ($this.hasClass('disabled')) return;

						$this.addClass('disabled');

						$('.merge_quote_popup input[type="checkbox"]:checked').each((index, ele) => {
							quoteIDs += $(ele).data('quoteid') + ",";
						});

						if (quoteIDs.length > 0) {
							quoteIDs = quoteIDs.slice(0, -1);
							$.ajax({
								method: 'POST',
								url: '/adminAjax',
								data: {
									action: 'merge.quotes.by.ids',
									data: {
										quote_ids: quoteIDs
									}
								},
								success: function( response ) {
									$this.removeClass('disabled');
									console.log(response);
									window.location.reload();
								}
							});
						}
					});
				}
			});			
			
		});

		$('select#status').on('change', function(e) {
			$.fancybox.open('<div class="message"><p style="text-align: center;">Changing Order Status!</p></div>');
			console.log($(this).data('quoteid'));

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'change.quote.status',
					data: {
						info: {'status': $(this).val(), 'quoteID': $(this).data('quoteid')}
					}
				},
				success: function( response ) {
					$('.message').text(response);

					setTimeout(function(){
						$.fancybox.close();
					}, 1000);
				}
			});
		});

		//SalesRep page
		$('#add_a_new_sales_rep').on('click', function(e) {
			$.fancybox.open(`<div class="new-sales-rep-popup">
					<form>
					<div><label>First Name</label><input type="text" name="first-name" placeholder="First Name"></div>
					<div><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name"></div>
					<div><label>Email</label><input type="email" name="email" placeholder="Email"></div>
					<div><label>Phone</label><input type="number" name="phone" placeholder="Phone"></div>
					<div><label>Owner Id</label><input type="text" name="ownerid" placeholder="Owner Id"></div>
					<p class="message" style="margin: 20px 0;"></p>
					<a class="button">Add</a>
					</form>
				</div>`);
			$(document).on('click', '.new-sales-rep-popup a.button', function(e) {
				let $this = $(this);
				let form = $this.closest('form');

				if ( form.find('input[name="first-name"]').val() != '' && form.find('input[name="last-name"]').val() != '' && form.find('input[name="email"]').val() != '' && form.find('input[name="phone"]').val() != '') {
					if ($this.hasClass('disabled')) return false;

					form.find('.message').text('Eligible to submit');
					$this.addClass('disabled');

					$.ajax({
						method: 'POST',
						url: '/adminAjax',
						data: {
							action: 'add.sales.rep',
							data: {
								info: {
									firstName: form.find('input[name="first-name"]').val(),
									lastName: form.find('input[name="last-name"]').val(),
									email: form.find('input[name="email"]').val(),
									phone: form.find('input[name="phone"]').val(),
									ownerId: form.find('input[name="ownerid"]').val()
								}
							}
						},
						success: function( response ) {
							form.find('.message').text(response.success);
							console.log(response);

							setTimeout(function(){
								$.fancybox.close();
								window.location.reload();
							}, 1000);
						}
					})
				} else {
					form.find('.message').text('Please feel out all fields');
				}
			});
		});

		$(document).on('click', 'a.delete_sales_rep', function(e) {
			let salesRepId = $(this).data('id');

			$.fancybox.open(`<div class="delete-sales-rep-popup">
				<p>Would you confirm deleting?</p>
				<div style="text-align: center;"><a class="button yes" style="margin-bottom: 0; margin-right: 20px;" data-id="${salesRepId}">Yes</a><a class="button no" style="margin-bottom: 0;">No</a></div>
			</div>`);

			$(document).on('click', '.delete-sales-rep-popup a.no', function(e) {
				$.fancybox.close();
			});

			$(document).on('click', '.delete-sales-rep-popup a.yes', function(e) {
				let $this = $(this);
				let popup = $this.closest('.delete-sales-rep-popup');
				if ($this.hasClass('disabled')) return false;
				$this.addClass('disabled');

				$.ajax({
					method: 'POST',
					url: '/adminAjax',
					data: {
						action: 'delete.sales.rep',
						data: {
							info: {
								id: salesRepId
							}
						}
					},
					success: function( response ) {
						console.log(response);

						setTimeout(function(){
							$.fancybox.close();
							window.location.reload();
						}, 1000);
					}
				});
			});
		});

		$(document).on('click', 'a.edit_sales_rep', function(e) {
			let salesRepFirstName = $(this).closest("tr").find('td').eq(1).find('.first_name').text();
			let salesRepLastName = $(this).closest("tr").find('td').eq(1).find('.last_name').text();
			let salesRepEmail = $(this).closest("tr").find('td').eq(2).text();
			let salesRepPhone = $(this).closest("tr").find('td').eq(3).text();
			let salesRepOwnerId = $(this).closest("tr").find('td').eq(4).text();
			let salesRepId = $(this).data('id');
			
			$.fancybox.open(`<div class="edit-sales-rep-popup">
				<form>
					<div><label>First Name</label><input type="text" name="first-name" placeholder="First Name" value="${salesRepFirstName}"></div>
					<div><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name" value="${salesRepLastName}"></div>
					<div><label>Email</label><input type="email" name="email" placeholder="Email" value="${salesRepEmail}"></div>
					<div><label>Phone</label><input type="number" name="phone" placeholder="Phone" value="${salesRepPhone}"></div>
					<div><label>Owner Id</label><input type="text" name="ownerid" placeholder="Owner Id" value="${salesRepOwnerId}"></div>
					<p class="message" style="margin: 20px 0;"></p>
					<a class="button">Save</a>
					</form>
			</div>`);

			$(document).on('click', '.edit-sales-rep-popup a.button', function(e) {
				let $this = $(this);
				let form = $this.closest('form');
				if ($this.hasClass('disabled')) return false;

				$this.addClass('disabled');

				$.ajax({
					method: 'POST',
					url: '/adminAjax',
					data: {
						action: 'edit.sales.rep',
						data: {
							info: {
								id: salesRepId,
								firstName: form.find('input[name="first-name"]').val(),
								lastName: form.find('input[name="last-name"]').val(),
								email: form.find('input[name="email"]').val(),
								phone: form.find('input[name="phone"]').val(),
								ownerId: form.find('input[name="ownerid"]').val()
							}
						}
					},
					success: function( response ) {
						form.find('.message').text(response.success);

						setTimeout(function(){
							$.fancybox.close();
							window.location.reload();
						}, 1000);
					}
				})
			});
		});

		$(document).on('click', '.sales_rep_email_content', async function(e) {
			let salesRepFirstName = $(this).closest("tr").find('td').eq(1).find('.first_name').text();
			let salesRepLastName = $(this).closest("tr").find('td').eq(1).find('.last_name').text();
			let salesRepId = $(this).data('id');
			let emailContentEnglish = $(`.email_english[data-id="${salesRepId}"]`).val();
			let emailContentSpanish = $(`.email_spanish[data-id="${salesRepId}"]`).val();

			$.fancybox.open(`<div class="edit-sales-rep-email-content-popup">
				<h3>${salesRepFirstName} ${salesRepLastName}'s Email Content</h3>
				<form>
					<ul class="tabs" data-tabs id="email-content-tabs">
						<li class="tabs-title is-active"><a href="#email-english" aria-selected="true">English</a></li>
						<li class="tabs-title"><a href="#email-spanish">Spanish</a></li>
					</ul>
					<div class="tabs-content" data-tabs-content="email-content-tabs">
						<div class="tabs-panel is-active" id="email-english">
							<textarea name="email-content" style="height: 350px;">${emailContentEnglish}</textarea>
						</div>
						<div class="tabs-panel" id="email-spanish">
							<textarea name="email-content" style="height: 350px;">${emailContentSpanish}</textarea>
						</div>
					</div>
					<p class="message" style="margin: 20px 0;"></p>
					<a class="save button">Save</a>
				</form>
			</div>`);

			$(document).on('click', '.tabs-title a', function(e) {
				let $this = $(this);
				let tabContentSelector = $this.attr('href');
				let targetTabContent = $(`${tabContentSelector}`);
				$this.closest('form').find('.tabs-title.is-active a').attr('aria-selected', false);
				$this.closest('form').find('.tabs-title.is-active').removeClass('is-active');
				$this.closest('.tabs-title').addClass('is-active');
				$this.attr('aria-selected', true);
				targetTabContent.closest('.tabs-content').find('.tabs-panel.is-active').removeClass('is-active');
				targetTabContent.addClass('is-active');
			});

			$(document).on('click', '.edit-sales-rep-email-content-popup a.save', function() {
				let $this = $(this);
				let form = $this.closest('form');
				if ($this.hasClass('disabled')) return false;
				$this.addClass('disabled');

				$.ajax({
					method: 'POST',
					url: '/adminAjax',
					data: {
						action: 'save.sales.rep.email.content',
						data: {
							info: {
								id: salesRepId,
								email_english: form.find('#email-english textarea').val(),
								email_spanish: form.find('#email-spanish textarea').val()
							}
						}
					},
					success: function( response ) {
						form.find('.message').text(response.success);

						setTimeout(function(){
							$.fancybox.close();
							window.location.reload();
						}, 1000);
					}
				})
			});
		});

		$(document).on('click', '#add_a_new_sales_cc', function() {
			$.fancybox.open(`<div class="new-sales-cc-popup">
					<form>
					<div><label>First Name</label><input type="text" name="first-name" placeholder="First Name"></div>
					<div><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name"></div>
					<div><label>Email</label><input type="email" name="email" placeholder="Email"></div>
					<div><label>Owner Id</label><input type="text" name="ownerid" placeholder="Owner Id"></div>
					<p class="message" style="margin: 20px 0;"></p>
					<a class="button">Add</a>
					</form>
				</div>`);
			$(document).on('click', '.new-sales-cc-popup a.button', function(e) {
				let $this = $(this);
				let form = $this.closest('form');

				if ( form.find('input[name="first-name"]').val() != '' && form.find('input[name="last-name"]').val() != '' && form.find('input[name="email"]').val() != '') {
					if ($this.hasClass('disabled')) return false;

					form.find('.message').text('Eligible to submit');
					$this.addClass('disabled');

					$.ajax({
						method: 'POST',
						url: '/adminAjax',
						data: {
							action: 'add.sales.cc',
							data: {
								info: {
									firstName: form.find('input[name="first-name"]').val(),
									lastName: form.find('input[name="last-name"]').val(),
									email: form.find('input[name="email"]').val(),
									ownerId: form.find('input[name="ownerid"]').val()
								}
							}
						},
						success: function( response ) {
							form.find('.message').text(response.success);
							console.log(response);

							setTimeout(function(){
								$.fancybox.close();
								window.location.reload();
							}, 1000);
						}
					})
				} else {
					form.find('.message').text('Please feel out all fields');
				}
			});
		});

		$(document).on('click', 'a.delete_sales_cc', function() {
			let salesCCID = $(this).data('id');

			$.fancybox.open(`<div class="delete-sales-cc-popup">
				<p>Would you confirm deleting?</p>
				<div style="text-align: center;"><a class="button yes" style="margin-bottom: 0; margin-right: 20px;" data-id="${salesCCID}">Yes</a><a class="button no" style="margin-bottom: 0;">No</a></div>
			</div>`);

			$(document).on('click', '.delete-sales-cc-popup a.no', function(e) {
				$.fancybox.close();
			});

			$(document).on('click', '.delete-sales-cc-popup a.yes', function(e) {
				let $this = $(this);
				let popup = $this.closest('.delete-sales-cc-popup');
				if ($this.hasClass('disabled')) return false;
				$this.addClass('disabled');

				$.ajax({
					method: 'POST',
					url: '/adminAjax',
					data: {
						action: 'delete.sales.cc',
						data: {
							info: {
								id: salesCCID
							}
						}
					},
					success: function( response ) {
						console.log(response);

						setTimeout(function(){
							$.fancybox.close();
							window.location.reload();
						}, 1000);
					}
				});
			});
		});

		$(document).on('click', 'a.edit_sales_cc', function(e) {
			let salesRepFirstName = $(this).closest("tr").find('td').eq(1).find('.first_name').text();
			let salesRepLastName = $(this).closest("tr").find('td').eq(1).find('.last_name').text();
			let salesRepEmail = $(this).closest("tr").find('td').eq(2).text();
			let salesRepOwnerId = $(this).closest("tr").find('td').eq(3).text();
			let salesCCID = $(this).data('id');
			
			$.fancybox.open(`<div class="edit-sales-cc-popup">
				<form>
					<div><label>First Name</label><input type="text" name="first-name" placeholder="First Name" value="${salesRepFirstName}"></div>
					<div><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name" value="${salesRepLastName}"></div>
					<div><label>Email</label><input type="email" name="email" placeholder="Email" value="${salesRepEmail}"></div>
					<div><label>Owner Id</label><input type="text" name="ownerid" placeholder="Owner Id" value="${salesRepOwnerId}"></div>
					<p class="message" style="margin: 20px 0;"></p>
					<a class="button">Save</a>
					</form>
			</div>`);

			$(document).on('click', '.edit-sales-cc-popup a.button', function(e) {
				let $this = $(this);
				let form = $this.closest('form');
				if ($this.hasClass('disabled')) return false;

				$this.addClass('disabled');

				$.ajax({
					method: 'POST',
					url: '/adminAjax',
					data: {
						action: 'edit.sales.cc',
						data: {
							info: {
								id: salesCCID,
								firstName: form.find('input[name="first-name"]').val(),
								lastName: form.find('input[name="last-name"]').val(),
								email: form.find('input[name="email"]').val(),
								ownerId: form.find('input[name="ownerid"]').val()
							}
						}
					},
					success: function( response ) {
						form.find('.message').text(response.success);

						setTimeout(function(){
							$.fancybox.close();
							window.location.reload();
						}, 1000);
					}
				})
			});
		});

		$(document).on('click', '#add_a_new_sales_bcc', function() {
			$.fancybox.open(`<div class="new-sales-bcc-popup">
					<form>
					<div><label>First Name</label><input type="text" name="first-name" placeholder="First Name"></div>
					<div><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name"></div>
					<div><label>Email</label><input type="email" name="email" placeholder="Email"></div>
					<div><label>Owner Id</label><input type="text" name="ownerid" placeholder="Owner Id"></div>
					<p class="message" style="margin: 20px 0;"></p>
					<a class="button">Add</a>
					</form>
				</div>`);
			$(document).on('click', '.new-sales-bcc-popup a.button', function(e) {
				let $this = $(this);
				let form = $this.closest('form');

				if ( form.find('input[name="first-name"]').val() != '' && form.find('input[name="last-name"]').val() != '' && form.find('input[name="email"]').val() != '') {
					if ($this.hasClass('disabled')) return false;

					form.find('.message').text('Eligible to submit');
					$this.addClass('disabled');

					$.ajax({
						method: 'POST',
						url: '/adminAjax',
						data: {
							action: 'add.sales.bcc',
							data: {
								info: {
									firstName: form.find('input[name="first-name"]').val(),
									lastName: form.find('input[name="last-name"]').val(),
									email: form.find('input[name="email"]').val(),
									ownerId: form.find('input[name="ownerId"]').val()
								}
							}
						},
						success: function( response ) {
							form.find('.message').text(response.success);
							console.log(response);

							setTimeout(function(){
								$.fancybox.close();
								window.location.reload();
							}, 1000);
						}
					})
				} else {
					form.find('.message').text('Please feel out all fields');
				}
			});
		});

		$(document).on('click', 'a.delete_sales_bcc', function() {
			let salesCCID = $(this).data('id');

			$.fancybox.open(`<div class="delete-sales-bcc-popup">
				<p>Would you confirm deleting?</p>
				<div style="text-align: center;"><a class="button yes" style="margin-bottom: 0; margin-right: 20px;" data-id="${salesCCID}">Yes</a><a class="button no" style="margin-bottom: 0;">No</a></div>
			</div>`);

			$(document).on('click', '.delete-sales-bcc-popup a.no', function(e) {
				$.fancybox.close();
			});

			$(document).on('click', '.delete-sales-bcc-popup a.yes', function(e) {
				let $this = $(this);
				let popup = $this.closest('.delete-sales-bcc-popup');
				if ($this.hasClass('disabled')) return false;
				$this.addClass('disabled');

				$.ajax({
					method: 'POST',
					url: '/adminAjax',
					data: {
						action: 'delete.sales.bcc',
						data: {
							info: {
								id: salesCCID
							}
						}
					},
					success: function( response ) {
						console.log(response);

						setTimeout(function(){
							$.fancybox.close();
							window.location.reload();
						}, 1000);
					}
				});
			});
		});

		$(document).on('click', 'a.edit_sales_bcc', function(e) {
			let salesRepFirstName = $(this).closest("tr").find('td').eq(1).find('.first_name').text();
			let salesRepLastName = $(this).closest("tr").find('td').eq(1).find('.last_name').text();
			let salesRepEmail = $(this).closest("tr").find('td').eq(2).text();
			let salesRepOwnerId = $(this).closest("tr").find('td').eq(3).text();
			let salesCCID = $(this).data('id');
			
			$.fancybox.open(`<div class="edit-sales-bcc-popup">
				<form>
					<div><label>First Name</label><input type="text" name="first-name" placeholder="First Name" value="${salesRepFirstName}"></div>
					<div><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name" value="${salesRepLastName}"></div>
					<div><label>Email</label><input type="email" name="email" placeholder="Email" value="${salesRepEmail}"></div>
					<div><label>Owner Id</label><input type="text" name="ownerid" placeholder="Owner Id" value="${salesRepOwnerId}"></div>
					<p class="message" style="margin: 20px 0;"></p>
					<a class="button">Save</a>
					</form>
			</div>`);

			$(document).on('click', '.edit-sales-bcc-popup a.button', function(e) {
				let $this = $(this);
				let form = $this.closest('form');
				if ($this.hasClass('disabled')) return false;

				$this.addClass('disabled');

				$.ajax({
					method: 'POST',
					url: '/adminAjax',
					data: {
						action: 'edit.sales.bcc',
						data: {
							info: {
								id: salesCCID,
								firstName: form.find('input[name="first-name"]').val(),
								lastName: form.find('input[name="last-name"]').val(),
								email: form.find('input[name="email"]').val(),
								ownerId: form.find('input[name="ownerid"]').val()
							}
						}
					},
					success: function( response ) {
						form.find('.message').text(response.success);

						setTimeout(function(){
							$.fancybox.close();
							window.location.reload();
						}, 1000);
					}
				})
			});
		});

		$(document).on('change', 'select#set_sales_rep', function(e) {
			let quoteID = $('#quoteID').text();
			let salesRepID = $(this).val();
			console.log(salesRepID);

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'set.sales.rep.to.quote',
					data: {
						info: {
							quoteID: quoteID,
							salesRepID: salesRepID
						}
					}
				},
				success: function( response ) {
					$.fancybox.open(`<div>Sales person changed</div>`);
				}
			})
		});

		$(document).on('click', 'a.send_email_to_customer', function(e) {
			let $this = $(this);
			let quoteID = $('#quoteID').text();
			let salesRepID = $('select#set_sales_rep').val();

			$.fancybox.open(`
				<div class="send_email_to_customer_fisrt_confirmation" style="max-width: 300px; text-align: center;">
					<div>Are you sure you want to send the email?</div>
					<div style="margin-top: 35px; text-align: center;">
						<button class="yes button" style="margin-right: 20px;">Yes</button>
						<button class="no button">No</button>
					</div>
				</div>
				`);

			$(document).on('click', '.send_email_to_customer_fisrt_confirmation button.yes', function(e) {
				let currentStatus = $('a.send_email_to_customer').attr('data-status');
				if (currentStatus != 'yes') {
					let $thisButton = $(this);
					if ($thisButton.hasClass('disabled')) {
						return false;
					}
					$thisButton.addClass('disabled');
					$.ajax({
						method: 'POST',
						url: '/adminAjax',
						data: {
							action: 'send.email.to.customer',
							data: {
								info: {
									quoteID: quoteID,
									salesRepID: salesRepID
								}
							}
						},
						success: function( response ) {
							console.log(response);
							$.fancybox.close();
							$.fancybox.open(`<div>Email sent to the customer</div>`);
							$('a.send_email_to_customer').attr('data-status', 'yes');
							$thisButton.removeClass('disabled');
						}
					});
				} else {
					$.fancybox.close();
					$.fancybox.open(`
						<div class="send_email_to_customer_confirmation_popup" style="max-width: 300px; text-align: center;">
							<div>This email has already been sent, are you sure you want to send again</div>
							<div style="margin-top: 35px; text-align: center;">
								<button class="yes button" style="margin-right: 20px;">Yes</button>
								<button class="no button">No</button>
							</div>
						</div>`);
					$(document).on('click', '.send_email_to_customer_confirmation_popup button.yes', function(e) {
						e.preventDefault();
						let $thisButton = $(this);
						if ($thisButton.hasClass('disabled')) {
							return false;
						}
						$thisButton.addClass('disabled');

						$.ajax({
							method: 'POST',
							url: '/adminAjax',
							data: {
								action: 'send.email.to.customer',
								data: {
									info: {
										quoteID: quoteID,
										salesRepID: salesRepID
									}
								}
							},
							success: function( response ) {
								console.log(response);
								$.fancybox.close();
								$.fancybox.open(`<div>Email sent to the customer</div>`);
								$thisButton.removeClass('disabled');
								$('a.send_email_to_customer').attr('data-status', 'yes');
							}
						});
					});

					$(document).on('click', '.send_email_to_customer_confirmation_popup button.no', function(e) {
						$.fancybox.close();
					});
				}
			});

			$(document).on('click', '.send_email_to_customer_fisrt_confirmation button.no', function(e) {
				$.fancybox.close();
			});
		});

		$(document).on('click', 'a.send_email_to_sales_rep', function(e) {
			let $this = $(this);
			let quoteID = $('#quoteID').text();
			let salesRepID = $('select#set_sales_rep').val();

			$.fancybox.open(`
				<div class="send_email_to_sales_rep_fisrt_confirmation" style="max-width: 300px; text-align: center;">
					<div>Are you sure you want to send the email?</div>
					<div style="margin-top: 35px; text-align: center;">
						<button class="yes button" style="margin-right: 20px;">Yes</button>
						<button class="no button">No</button>
					</div>
				</div>
				`);

			$(document).on('click', '.send_email_to_sales_rep_fisrt_confirmation button.yes', function(e) {
				let currentStatus = $('a.send_email_to_sales_rep').attr('data-status');

				if (currentStatus != 'yes') {
					let $thisButton = $(this);
					if ($thisButton.hasClass('disabled')) {
						return false;
					}
					$thisButton.addClass('disabled');
					$.ajax({
						method: 'POST',
						url: '/adminAjax',
						data: {
							action: 'send.email.to.sales.rep',
							data: {
								info: {
									quoteID: quoteID,
									salesRepID: salesRepID
								}
							}
						},
						success: function( response ) {
							console.log(response);
							$.fancybox.close();
							$.fancybox.open(`<div>Email sent to the sales rep</div>`);
							$('a.send_email_to_sales_rep').attr('data-status', 'yes');
							$thisButton.removeClass('disabled');
						}
					});
				} else {
					$.fancybox.close();
					$.fancybox.open(`<div class="send_email_to_sales_rep_confirmation_popup" style="max-width: 300px; text-align: center;"><div>This email has already been sent, are you sure you want to send again</div><div style="margin-top: 35px; text-align: center;"><button class="yes button" style="margin-right: 20px;">Yes</button><button class="no button">No</button></div></div>`);
					$(document).on('click', '.send_email_to_sales_rep_confirmation_popup button.yes', function(e) {
						e.preventDefault();
						let $thisButton = $(this);
						if ($thisButton.hasClass('disabled')) {
							return false;
						}
						$thisButton.addClass('disabled');
						$.ajax({
							method: 'POST',
							url: '/adminAjax',
							data: {
								action: 'send.email.to.sales.rep',
								data: {
									info: {
										quoteID: quoteID,
										salesRepID: salesRepID
									}
								}
							},
							success: function( response ) {
								console.log(response);
								$.fancybox.close();
								$.fancybox.open(`<div>Email sent to the sales rep</div>`);
								$thisButton.removeClass('disabled');
								$('a.send_email_to_sales_rep').attr('data-status', 'yes');
							}
						});
					});

					$(document).on('click', '.send_email_to_sales_rep_confirmation_popup button.no', function(e) {
						$.fancybox.close();
					});
				}
			});

			$(document).on('click', '.send_email_to_sales_rep_fisrt_confirmation button.no', function(e) {
				$.fancybox.close();
			});
		});

		$(document).on('click', 'a.see_email_history', function(e) {
			let $this = $(this);
			let quoteID = $('#quoteID').text();

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'get.email.history',
					data: {
						info: {
							quoteID: quoteID,
						}
					}
				},
				success: function( response ) {
					console.log(response);
					let $historyArray = response.success;

					let html = '<table><thead><tr><th>History</th><th>Date</th></tr></thead><tbody>';
					$.each($historyArray, (key, history) => {
						html += `<tr><td>${history.history}</td><td>${history.date}</td></tr>`;
					});
					html +='</tbody></table>'

					$.fancybox.open('<div class="message"><h2 style="text-align: center; text-transform: uppercase; font-weight: bold;">Transaction History</h2>' + html + '</div>');
				}
			});
		});

		$(document).on('click', 'a#admin_edit_cutomer_details', function(e) {
			let quoteID = $('#quoteID').text();
			let firstName = $('#first_name').text();
			let lastName = $('#last_name').text();
			let companyName = $('#company_name').text();
			let email = $('#email').text();
			let phone = $('#phone').text();
			let city = $('#city').text();
			let state = $('#state').text();
			let country = $('#country').text();
			let preferredLanguage = $('#preferred_language').text();
			let roleInThisProject = $('#role_in_this_project').text();
			let projectTimeline = $('#project_timeline').text();
			let aboutProjectAndRequest = $('#about_project_and_request').text();


			$.fancybox.open(`<div class="edit-customer-details-popup">
				<h2>Edit your Contact Information</h2>
				<form>
					<div>
						<div><label>First Name</label><input type="text" name="first-name" placeholder="First Name" value="${firstName}"></div>
						<div><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name" value="${lastName}"></div>
						<div><label>Company Name</label><input type="text" name="company-name" placeholder="Company Name" value="${companyName}"></div>
						<div><label>Email</label><input type="email" name="email" placeholder="Email" value="${email}"></div>
						<div><label>Phone</label><input type="text" name="phone" placeholder="Phone" value="${phone}"></div>
						<div><label>City</label><input type="text" name="city" placeholder="City" value="${city}"></div>
						<div><label>State</label><input type="text" name="state" placeholder="State" value="${state}"></div>
						<div>
						<label>Country</label>
						<select name="country" value="${country}">
							<option>Select your Country</option>
							<option value="United States of America" ${ country == "United States of America" ? "selected" : '' }>United States of America</option>
							<option value="Canada" ${ country == "Canada" ? "selected" : '' }>Canada</option>
							<option value="Mexico" ${ country == "Mexico" ? "selected" : '' }>Mexico</option>
							<option disabled>---</option>
							<option value="Afganistan" ${ country == "Afganistan" ? "selected" : '' }>Afghanistan</option>
							<option value="Albania" ${ country == "Albania" ? "selected" : '' }>Albania</option>
							<option value="Algeria" ${ country == "Algeria" ? "selected" : '' }>Algeria</option>
							<option value="American Samoa" ${ country == "American Samoa" ? "selected" : '' }>American Samoa</option>
							<option value="Andorra" ${ country == "Andorra" ? "selected" : '' }>Andorra</option>
							<option value="Angola" ${ country == "Angola" ? "selected" : '' }>Angola</option>
							<option value="Anguilla" ${ country == "Anguilla" ? "selected" : '' }>Anguilla</option>
							<option value="Antigua & Barbuda" ${ country == "Antigua & Barbuda" ? "selected" : '' }>Antigua & Barbuda</option>
							<option value="Argentina" ${ country == "Argentina" ? "selected" : '' }>Argentina</option>
							<option value="Armenia" ${ country == "Armenia" ? "selected" : '' }>Armenia</option>
							<option value="Aruba" ${ country == "Aruba" ? "selected" : '' }>Aruba</option>
							<option value="Australia" ${ country == "Australia" ? "selected" : '' }>Australia</option>
							<option value="Austria" ${ country == "Austria" ? "selected" : '' }>Austria</option>
							<option value="Azerbaijan" ${ country == "Azerbaijan" ? "selected" : '' }>Azerbaijan</option>
							<option value="Bahamas" ${ country == "Bahamas" ? "selected" : '' }>Bahamas</option>
							<option value="Bahrain" ${ country == "Bahrain" ? "selected" : '' }>Bahrain</option>
							<option value="Bangladesh" ${ country == "Bangladesh" ? "selected" : '' }>Bangladesh</option>
							<option value="Barbados" ${ country == "Barbados" ? "selected" : '' }>Barbados</option>
							<option value="Belarus" ${ country == "Belarus" ? "selected" : '' }>Belarus</option>
							<option value="Belgium" ${ country == "Belgium" ? "selected" : '' }>Belgium</option>
							<option value="Belize" ${ country == "Belize" ? "selected" : '' }>Belize</option>
							<option value="Benin" ${ country == "Benin" ? "selected" : '' }>Benin</option>
							<option value="Bermuda" ${ country == "Bermuda" ? "selected" : '' }>Bermuda</option>
							<option value="Bhutan" ${ country == "Bhutan" ? "selected" : '' }>Bhutan</option>
							<option value="Bolivia" ${ country == "Bolivia" ? "selected" : '' }>Bolivia</option>
							<option value="Bonaire" ${ country == "Bonaire" ? "selected" : '' }>Bonaire</option>
							<option value="Bosnia & Herzegovina" ${ country == "Bosnia & Herzegovina" ? "selected" : '' }>Bosnia & Herzegovina</option>
							<option value="Botswana" ${ country == "Botswana" ? "selected" : '' }>Botswana</option>
							<option value="Brazil" ${ country == "Brazil" ? "selected" : '' }>Brazil</option>
							<option value="British Indian Ocean Ter" ${ country == "British Indian Ocean Ter" ? "selected" : '' }>British Indian Ocean Ter</option>
							<option value="Brunei" ${ country == "Brunei" ? "selected" : '' }>Brunei</option>
							<option value="Bulgaria" ${ country == "Bulgaria" ? "selected" : '' }>Bulgaria</option>
							<option value="Burkina Faso" ${ country == "Burkina Faso" ? "selected" : '' }>Burkina Faso</option>
							<option value="Burundi" ${ country == "Burundi" ? "selected" : '' }>Burundi</option>
							<option value="Cambodia" ${ country == "Cambodia" ? "selected" : '' }>Cambodia</option>
							<option value="Cameroon" ${ country == "Cameroon" ? "selected" : '' }>Cameroon</option>
							<option value="Canary Islands" ${ country == "Canary Islands" ? "selected" : '' }>Canary Islands</option>
							<option value="Cape Verde" ${ country == "Cape Verde" ? "selected" : '' }>Cape Verde</option>
							<option value="Cayman Islands" ${ country == "Cayman Islands" ? "selected" : '' }>Cayman Islands</option>
							<option value="Central African Republic" ${ country == "Central African Republic" ? "selected" : '' }>Central African Republic</option>
							<option value="Chad" ${ country == "Chad" ? "selected" : '' }>Chad</option>
							<option value="Channel Islands" ${ country == "Channel Islands" ? "selected" : '' }>Channel Islands</option>
							<option value="Chile" ${ country == "Chile" ? "selected" : '' }>Chile</option>
							<option value="China" ${ country == "China" ? "selected" : '' }>China</option>
							<option value="Christmas Island" ${ country == "Christmas Island" ? "selected" : '' }>Christmas Island</option>
							<option value="Cocos Island" ${ country == "Cocos Island" ? "selected" : '' }>Cocos Island</option>
							<option value="Colombia" ${ country == "Colombia" ? "selected" : '' }>Colombia</option>
							<option value="Comoros" ${ country == "Comoros" ? "selected" : '' }>Comoros</option>
							<option value="Congo" ${ country == "Congo" ? "selected" : '' }>Congo</option>
							<option value="Cook Islands" ${ country == "Cook Islands" ? "selected" : '' }>Cook Islands</option>
							<option value="Costa Rica" ${ country == "Costa Rica" ? "selected" : '' }>Costa Rica</option>
							<option value="Cote DIvoire" ${ country == "Cote DIvoire" ? "selected" : '' }>Cote DIvoire</option>
							<option value="Croatia" ${ country == "Croatia" ? "selected" : '' }>Croatia</option>
							<option value="Cuba" ${ country == "Cuba" ? "selected" : '' }>Cuba</option>
							<option value="Curaco" ${ country == "Curaco" ? "selected" : '' }>Curacao</option>
							<option value="Cyprus" ${ country == "Cyprus" ? "selected" : '' }>Cyprus</option>
							<option value="Czech Republic" ${ country == "Czech Republic" ? "selected" : '' }>Czech Republic</option>
							<option value="Denmark" ${ country == "Denmark" ? "selected" : '' }>Denmark</option>
							<option value="Djibouti" ${ country == "Djibouti" ? "selected" : '' }>Djibouti</option>
							<option value="Dominica" ${ country == "Dominica" ? "selected" : '' }>Dominica</option>
							<option value="Dominican Republic" ${ country == "Dominican Republic" ? "selected" : '' }>Dominican Republic</option>
							<option value="East Timor" ${ country == "East Timor" ? "selected" : '' }>East Timor</option>
							<option value="Ecuador" ${ country == "Ecuador" ? "selected" : '' }>Ecuador</option>
							<option value="Egypt" ${ country == "Egypt" ? "selected" : '' }>Egypt</option>
							<option value="El Salvador" ${ country == "El Salvador" ? "selected" : '' }>El Salvador</option>
							<option value="Equatorial Guinea" ${ country == "Equatorial Guinea" ? "selected" : '' }>Equatorial Guinea</option>
							<option value="Eritrea" ${ country == "Eritrea" ? "selected" : '' }>Eritrea</option>
							<option value="Estonia" ${ country == "Estonia" ? "selected" : '' }>Estonia</option>
							<option value="Ethiopia" ${ country == "Ethiopia" ? "selected" : '' }>Ethiopia</option>
							<option value="Falkland Islands" ${ country == "Falkland Islands" ? "selected" : '' }>Falkland Islands</option>
							<option value="Faroe Islands" ${ country == "Faroe Islands" ? "selected" : '' }>Faroe Islands</option>
							<option value="Fiji" ${ country == "Fiji" ? "selected" : '' }>Fiji</option>
							<option value="Finland" ${ country == "Finland" ? "selected" : '' }>Finland</option>
							<option value="France" ${ country == "France" ? "selected" : '' }>France</option>
							<option value="French Guiana" ${ country == "French Guiana" ? "selected" : '' }>French Guiana</option>
							<option value="French Polynesia" ${ country == "French Polynesia" ? "selected" : '' }>French Polynesia</option>
							<option value="French Southern Ter" ${ country == "French Southern Ter" ? "selected" : '' }>French Southern Ter</option>
							<option value="Gabon" ${ country == "Gabon" ? "selected" : '' }>Gabon</option>
							<option value="Gambia" ${ country == "Gambia" ? "selected" : '' }>Gambia</option>
							<option value="Georgia" ${ country == "Georgia" ? "selected" : '' }>Georgia</option>
							<option value="Germany" ${ country == "Germany" ? "selected" : '' }>Germany</option>
							<option value="Ghana" ${ country == "Ghana" ? "selected" : '' }>Ghana</option>
							<option value="Gibraltar" ${ country == "Gibraltar" ? "selected" : '' }>Gibraltar</option>
							<option value="Great Britain" ${ country == "Great Britain" ? "selected" : '' }>Great Britain</option>
							<option value="Greece" ${ country == "Greece" ? "selected" : '' }>Greece</option>
							<option value="Greenland" ${ country == "Greenland" ? "selected" : '' }>Greenland</option>
							<option value="Grenada" ${ country == "Grenada" ? "selected" : '' }>Grenada</option>
							<option value="Guadeloupe" ${ country == "Guadeloupe" ? "selected" : '' }>Guadeloupe</option>
							<option value="Guam" ${ country == "Guam" ? "selected" : '' }>Guam</option>
							<option value="Guatemala" ${ country == "Guatemala" ? "selected" : '' }>Guatemala</option>
							<option value="Guinea" ${ country == "Guinea" ? "selected" : '' }>Guinea</option>
							<option value="Guyana" ${ country == "Guyana" ? "selected" : '' }>Guyana</option>
							<option value="Haiti" ${ country == "Haiti" ? "selected" : '' }>Haiti</option>
							<option value="Hawaii" ${ country == "Hawaii" ? "selected" : '' }>Hawaii</option>
							<option value="Honduras" ${ country == "Honduras" ? "selected" : '' }>Honduras</option>
							<option value="Hong Kong" ${ country == "Hong Kong" ? "selected" : '' }>Hong Kong</option>
							<option value="Hungary" ${ country == "Hungary" ? "selected" : '' }>Hungary</option>
							<option value="Iceland" ${ country == "Iceland" ? "selected" : '' }>Iceland</option>
							<option value="Indonesia" ${ country == "Indonesia" ? "selected" : '' }>Indonesia</option>
							<option value="India" ${ country == "India" ? "selected" : '' }>India</option>
							<option value="Iran" ${ country == "Iran" ? "selected" : '' }>Iran</option>
							<option value="Iraq" ${ country == "Iraq" ? "selected" : '' }>Iraq</option>
							<option value="Ireland" ${ country == "Ireland" ? "selected" : '' }>Ireland</option>
							<option value="Isle of Man" ${ country == "Isle of Man" ? "selected" : '' }>Isle of Man</option>
							<option value="Israel" ${ country == "Israel" ? "selected" : '' }>Israel</option>
							<option value="Italy" ${ country == "Italy" ? "selected" : '' }>Italy</option>
							<option value="Jamaica" ${ country == "Jamaica" ? "selected" : '' }>Jamaica</option>
							<option value="Japan" ${ country == "Japan" ? "selected" : '' }>Japan</option>
							<option value="Jordan" ${ country == "Jordan" ? "selected" : '' }>Jordan</option>
							<option value="Kazakhstan" ${ country == "Kazakhstan" ? "selected" : '' }>Kazakhstan</option>
							<option value="Kenya" ${ country == "Kenya" ? "selected" : '' }>Kenya</option>
							<option value="Kiribati" ${ country == "Kiribati" ? "selected" : '' }>Kiribati</option>
							<option value="Korea North" ${ country == "Korea North" ? "selected" : '' }>Korea North</option>
							<option value="Korea South" ${ country == "Korea South" ? "selected" : '' }>Korea South</option>
							<option value="Kuwait" ${ country == "Kuwait" ? "selected" : '' }>Kuwait</option>
							<option value="Kyrgyzstan" ${ country == "Kyrgyzstan" ? "selected" : '' }>Kyrgyzstan</option>
							<option value="Laos" ${ country == "Laos" ? "selected" : '' }>Laos</option>
							<option value="Latvia" ${ country == "Latvia" ? "selected" : '' }>Latvia</option>
							<option value="Lebanon" ${ country == "Lebanon" ? "selected" : '' }>Lebanon</option>
							<option value="Lesotho" ${ country == "Lesotho" ? "selected" : '' }>Lesotho</option>
							<option value="Liberia" ${ country == "Liberia" ? "selected" : '' }>Liberia</option>
							<option value="Libya" ${ country == "Libya" ? "selected" : '' }>Libya</option>
							<option value="Liechtenstein" ${ country == "Liechtenstein" ? "selected" : '' }>Liechtenstein</option>
							<option value="Lithuania" ${ country == "Lithuania" ? "selected" : '' }>Lithuania</option>
							<option value="Luxembourg" ${ country == "Luxembourg" ? "selected" : '' }>Luxembourg</option>
							<option value="Macau" ${ country == "Macau" ? "selected" : '' }>Macau</option>
							<option value="Macedonia" ${ country == "Macedonia" ? "selected" : '' }>Macedonia</option>
							<option value="Madagascar" ${ country == "Madagascar" ? "selected" : '' }>Madagascar</option>
							<option value="Malaysia" ${ country == "Malaysia" ? "selected" : '' }>Malaysia</option>
							<option value="Malawi" ${ country == "Malawi" ? "selected" : '' }>Malawi</option>
							<option value="Maldives" ${ country == "Maldives" ? "selected" : '' }>Maldives</option>
							<option value="Mali" ${ country == "Mali" ? "selected" : '' }>Mali</option>
							<option value="Malta" ${ country == "Malta" ? "selected" : '' }>Malta</option>
							<option value="Marshall Islands" ${ country == "Marshall Islands" ? "selected" : '' }>Marshall Islands</option>
							<option value="Martinique" ${ country == "Martinique" ? "selected" : '' }>Martinique</option>
							<option value="Mauritania" ${ country == "Mauritania" ? "selected" : '' }>Mauritania</option>
							<option value="Mauritius" ${ country == "Mauritius" ? "selected" : '' }>Mauritius</option>
							<option value="Mayotte" ${ country == "Mayotte" ? "selected" : '' }>Mayotte</option>
							<option value="Midway Islands" ${ country == "Midway Islands" ? "selected" : '' }>Midway Islands</option>
							<option value="Moldova" ${ country == "Moldova" ? "selected" : '' }>Moldova</option>
							<option value="Monaco" ${ country == "Monaco" ? "selected" : '' }>Monaco</option>
							<option value="Mongolia" ${ country == "Mongolia" ? "selected" : '' }>Mongolia</option>
							<option value="Montserrat" ${ country == "Montserrat" ? "selected" : '' }>Montserrat</option>
							<option value="Morocco" ${ country == "Morocco" ? "selected" : '' }>Morocco</option>
							<option value="Mozambique" ${ country == "Mozambique" ? "selected" : '' }>Mozambique</option>
							<option value="Myanmar" ${ country == "Myanmar" ? "selected" : '' }>Myanmar</option>
							<option value="Nambia" ${ country == "Nambia" ? "selected" : '' }>Nambia</option>
							<option value="Nauru" ${ country == "Nauru" ? "selected" : '' }>Nauru</option>
							<option value="Nepal" ${ country == "Nepal" ? "selected" : '' }>Nepal</option>
							<option value="Netherland Antilles" ${ country == "Netherland Antilles" ? "selected" : '' }>Netherland Antilles</option>
							<option value="Netherlands" ${ country == "Netherlands" ? "selected" : '' }>Netherlands (Holland, Europe)</option>
							<option value="Nevis" ${ country == "Nevis" ? "selected" : '' }>Nevis</option>
							<option value="New Caledonia" ${ country == "New Caledonia" ? "selected" : '' }>New Caledonia</option>
							<option value="New Zealand" ${ country == "New Zealand" ? "selected" : '' }>New Zealand</option>
							<option value="Nicaragua" ${ country == "Nicaragua" ? "selected" : '' }>Nicaragua</option>
							<option value="Niger" ${ country == "Niger" ? "selected" : '' }>Niger</option>
							<option value="Nigeria" ${ country == "Nigeria" ? "selected" : '' }>Nigeria</option>
							<option value="Niue" ${ country == "Niue" ? "selected" : '' }>Niue</option>
							<option value="Norfolk Island" ${ country == "Norfolk Island" ? "selected" : '' }>Norfolk Island</option>
							<option value="Norway" ${ country == "Norway" ? "selected" : '' }>Norway</option>
							<option value="Oman" ${ country == "Oman" ? "selected" : '' }>Oman</option>
							<option value="Pakistan" ${ country == "Pakistan" ? "selected" : '' }>Pakistan</option>
							<option value="Palau Island" ${ country == "Palau Island" ? "selected" : '' }>Palau Island</option>
							<option value="Papua New Guinea" ${ country == "Papua New Guinea" ? "selected" : '' }>Papua New Guinea</option>
							<option value="Paraguay" ${ country == "Paraguay" ? "selected" : '' }>Paraguay</option>
							<option value="Peru" ${ country == "Peru" ? "selected" : '' }>Peru</option>
							<option value="Phillipines" ${ country == "Phillipines" ? "selected" : '' }>Philippines</option>
							<option value="Pitcairn Island" ${ country == "Pitcairn Island" ? "selected" : '' }>Pitcairn Island</option>
							<option value="Poland" ${ country == "Poland" ? "selected" : '' }>Poland</option>
							<option value="Portugal" ${ country == "Portugal" ? "selected" : '' }>Portugal</option>
							<option value="Puerto Rico" ${ country == "Puerto Rico" ? "selected" : '' }>Puerto Rico</option>
							<option value="Qatar" ${ country == "Qatar" ? "selected" : '' }>Qatar</option>
							<option value="Republic of Montenegro" ${ country == "Republic of Montenegro" ? "selected" : '' }>Republic of Montenegro</option>
							<option value="Republic of Serbia" ${ country == "Republic of Serbia" ? "selected" : '' }>Republic of Serbia</option>
							<option value="Reunion" ${ country == "Reunion" ? "selected" : '' }>Reunion</option>
							<option value="Romania" ${ country == "Romania" ? "selected" : '' }>Romania</option>
							<option value="Russia" ${ country == "Russia" ? "selected" : '' }>Russia</option>
							<option value="Rwanda" ${ country == "Rwanda" ? "selected" : '' }>Rwanda</option>
							<option value="St Barthelemy" ${ country == "St Barthelemy" ? "selected" : '' }>St Barthelemy</option>
							<option value="St Eustatius" ${ country == "St Eustatius" ? "selected" : '' }>St Eustatius</option>
							<option value="St Helena" ${ country == "St Helena" ? "selected" : '' }>St Helena</option>
							<option value="St Kitts-Nevis" ${ country == "St Kitts-Nevis" ? "selected" : '' }>St Kitts-Nevis</option>
							<option value="St Lucia" ${ country == "St Lucia" ? "selected" : '' }>St Lucia</option>
							<option value="St Maarten" ${ country == "St Maarten" ? "selected" : '' }>St Maarten</option>
							<option value="St Pierre & Miquelon" ${ country == "St Pierre & Miquelon" ? "selected" : '' }>St Pierre & Miquelon</option>
							<option value="St Vincent & Grenadines" ${ country == "St Vincent & Grenadines" ? "selected" : '' }>St Vincent & Grenadines</option>
							<option value="Saipan" ${ country == "Saipan" ? "selected" : '' }>Saipan</option>
							<option value="Samoa" ${ country == "Samoa" ? "selected" : '' }>Samoa</option>
							<option value="Samoa American" ${ country == "Samoa American" ? "selected" : '' }>Samoa American</option>
							<option value="San Marino" ${ country == "San Marino" ? "selected" : '' }>San Marino</option>
							<option value="Sao Tome & Principe" ${ country == "Sao Tome & Principe" ? "selected" : '' }>Sao Tome & Principe</option>
							<option value="Saudi Arabia" ${ country == "Saudi Arabia" ? "selected" : '' }>Saudi Arabia</option>
							<option value="Senegal" ${ country == "Senegal" ? "selected" : '' }>Senegal</option>
							<option value="Seychelles" ${ country == "Seychelles" ? "selected" : '' }>Seychelles</option>
							<option value="Sierra Leone" ${ country == "Sierra Leone" ? "selected" : '' }>Sierra Leone</option>
							<option value="Singapore" ${ country == "Singapore" ? "selected" : '' }>Singapore</option>
							<option value="Slovakia" ${ country == "Slovakia" ? "selected" : '' }>Slovakia</option>
							<option value="Slovenia" ${ country == "Slovenia" ? "selected" : '' }>Slovenia</option>
							<option value="Solomon Islands" ${ country == "Solomon Islands" ? "selected" : '' }>Solomon Islands</option>
							<option value="Somalia" ${ country == "Somalia" ? "selected" : '' }>Somalia</option>
							<option value="South Africa" ${ country == "South Africa" ? "selected" : '' }>South Africa</option>
							<option value="Spain" ${ country == "Spain" ? "selected" : '' }>Spain</option>
							<option value="Sri Lanka" ${ country == "Sri Lanka" ? "selected" : '' }>Sri Lanka</option>
							<option value="Sudan" ${ country == "Sudan" ? "selected" : '' }>Sudan</option>
							<option value="Suriname" ${ country == "Suriname" ? "selected" : '' }>Suriname</option>
							<option value="Swaziland" ${ country == "Swaziland" ? "selected" : '' }>Swaziland</option>
							<option value="Sweden" ${ country == "Sweden" ? "selected" : '' }>Sweden</option>
							<option value="Switzerland" ${ country == "Switzerland" ? "selected" : '' }>Switzerland</option>
							<option value="Syria" ${ country == "Syria" ? "selected" : '' }>Syria</option>
							<option value="Tahiti" ${ country == "Tahiti" ? "selected" : '' }>Tahiti</option>
							<option value="Taiwan" ${ country == "Taiwan" ? "selected" : '' }>Taiwan</option>
							<option value="Tajikistan" ${ country == "Tajikistan" ? "selected" : '' }>Tajikistan</option>
							<option value="Tanzania" ${ country == "Tanzania" ? "selected" : '' }>Tanzania</option>
							<option value="Thailand" ${ country == "Thailand" ? "selected" : '' }>Thailand</option>
							<option value="Togo" ${ country == "Togo" ? "selected" : '' }>Togo</option>
							<option value="Tokelau" ${ country == "Tokelau" ? "selected" : '' }>Tokelau</option>
							<option value="Tonga" ${ country == "Tonga" ? "selected" : '' }>Tonga</option>
							<option value="Trinidad & Tobago" ${ country == "Trinidad & Tobago" ? "selected" : '' }>Trinidad & Tobago</option>
							<option value="Tunisia" ${ country == "Tunisia" ? "selected" : '' }>Tunisia</option>
							<option value="Turkey" ${ country == "Turkey" ? "selected" : '' }>Turkey</option>
							<option value="Turkmenistan" ${ country == "Turkmenistan" ? "selected" : '' }>Turkmenistan</option>
							<option value="Turks & Caicos Is" ${ country == "Turks & Caicos Is" ? "selected" : '' }>Turks & Caicos Is</option>
							<option value="Tuvalu" ${ country == "Tuvalu" ? "selected" : '' }>Tuvalu</option>
							<option value="Uganda" ${ country == "Uganda" ? "selected" : '' }>Uganda</option>
							<option value="United Kingdom" ${ country == "United Kingdom" ? "selected" : '' }>United Kingdom</option>
							<option value="Ukraine" ${ country == "Ukraine" ? "selected" : '' }>Ukraine</option>
							<option value="United Arab Erimates" ${ country == "United Arab Erimates" ? "selected" : '' }>United Arab Emirates</option>
							<option value="Uraguay" ${ country == "Uraguay" ? "selected" : '' }>Uruguay</option>
							<option value="Uzbekistan" ${ country == "Uzbekistan" ? "selected" : '' }>Uzbekistan</option>
							<option value="Vanuatu" ${ country == "Vanuatu" ? "selected" : '' }>Vanuatu</option>
							<option value="Vatican City State" ${ country == "Vatican City State" ? "selected" : '' }>Vatican City State</option>
							<option value="Venezuela" ${ country == "Venezuela" ? "selected" : '' }>Venezuela</option>
							<option value="Vietnam" ${ country == "Vietnam" ? "selected" : '' }>Vietnam</option>
							<option value="Virgin Islands (Brit)" ${ country == "Virgin Islands (Brit)" ? "selected" : '' }>Virgin Islands (Brit)</option>
							<option value="Virgin Islands (USA)" ${ country == "Virgin Islands (USA)" ? "selected" : '' }>Virgin Islands (USA)</option>
							<option value="Wake Island" ${ country == "Wake Island" ? "selected" : '' }>Wake Island</option>
							<option value="Wallis & Futana Is" ${ country == "Wallis & Futana Is" ? "selected" : '' }>Wallis & Futana Is</option>
							<option value="Yemen" ${ country == "Yemen" ? "selected" : '' }>Yemen</option>
							<option value="Zaire" ${ country == "Zaire" ? "selected" : '' }>Zaire</option>
							<option value="Zambia" ${ country == "Zambia" ? "selected" : '' }>Zambia</option>
							<option value="Zimbabwe" ${ country == "Zimbabwe" ? "selected" : '' }>Zimbabwe</option>
						</select>
						</div>
						<div>
							<label>Preferred language</label>
							<select name="preferred_language" value="${preferredLanguage}">
								<option value="">Preferred language</option>
								<option value="English" ${ preferredLanguage == "English" ? "selected" : '' }>English</option>
								<option value="Spanish" ${ preferredLanguage == "Spanish" ? "selected" : '' }>Spanish</option>
								<option value="Other" ${ preferredLanguage == "Other" ? "selected" : '' }>Other</option>
							</select>
						</div>
						<div>
							<label>What's your role in this project?</label>
							<select name="role-in-this-project" value="${roleInThisProject}">
								<option value="I'm the end user/buyer" ${ roleInThisProject == "I'm the end user/buyer" ? "selected" : '' }>I'm the end user/buyer</option>
								<option value="I'm helping the buyer" ${ roleInThisProject == "I'm helping the buyer" ? "selected" : '' }>I'm helping the buyer</option>
								<option value="I'm a reseller" ${ roleInThisProject == "I'm a reseller" ? "selected" : '' }>I'm a reseller</option>
							</select>
						</div>
						<div>
							<label>Project Timeline</label>
							<select name="project_timeline" value="${projectTimeline}">
								<option value="Now" ${ projectTimeline == "Now" ? "selected" : '' }>Now</option>
								<option value="Weeks" ${ projectTimeline == "Weeks" ? "selected" : '' }>Weeks</option>
								<option value="Months" ${ projectTimeline == "Months" ? "selected" : '' }>Months</option>
								<option value="Future" ${ projectTimeline == "Future" ? "selected" : '' }>Future</option>
								<option value="Just Budgeting" ${ projectTimeline == "Just Budgeting" ? "selected" : '' }>Just Budgeting</option>
								<option value="I Don't Know" ${ projectTimeline == "I Don't Know" ? "selected" : '' }>I Don't Know</option>
							</select>
						</div>
						<div>
							<label>Project details</label>
							<textarea name="about_project_and_request" style="height: 80px;">${aboutProjectAndRequest}</textarea>
						</div>
					</div>
					<p class="message" style="margin: 20px 0;"></p>
					<a class="button">Save</a>
				</form>
			</div>`);

			$(document).on('click', '.edit-customer-details-popup a.button', function(e) {
				let $this = $(this);
				let form = $this.closest('form');
				if ($this.hasClass('disabled')) return false;

				$this.addClass('disabled');

				$.ajax({
					method: 'POST',
					url: '/adminAjax',
					data: {
						action: 'edit.customer.details',
						data: {
							info: {
								quoteID: quoteID,
								firstName: form.find('input[name="first-name"]').val(),
								lastName: form.find('input[name="last-name"]').val(),
								companyName: form.find('input[name="company-name"]').val(),
								email: form.find('input[name="email"]').val(),
								phone: form.find('input[name="phone"]').val(),
								city: form.find('input[name="city"]').val(),
								state: form.find('input[name="state"]').val(),
								country: form.find('select[name="country"]').val(),
								preferredLanguage: form.find('select[name="preferred_language"]').val(),
								roleInThisProject: form.find('select[name="role-in-this-project"]').val(),
								projectTimeline: form.find('select[name="project_timeline"]').val(),
								aboutProjectAndRequest: form.find('textarea[name="about_project_and_request"]').val()
							}
						}
					},
					success: function( response ) {
						form.find('.message').text(response.success);

						setTimeout(function(){
							$.fancybox.close();
							window.location.reload();
						}, 1000);
					}
				});
			});
		});

		$(document).on('change', 'select#set_quote_status', function(e) {
			let quoteID = $('#quoteID').text();
			let quoteStatus = $(this).val();
			console.log(quoteStatus);

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'set.quote.status',
					data: {
						info: {
							quoteID: quoteID,
							quoteStatus: quoteStatus
						}
					}
				},
				success: function( response ) {
					$.fancybox.open(`<div>Quote status changed</div>`);
				}
			})
		});

		$(document).on('click', '#save_hubspot_deal', function(e) {
			let quoteID = $('#quoteID').text();
			let dealSubject = $('#deal_subject').val();

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'save.deal.subject',
					data: {
						info: {
							quoteID: quoteID,
							dealSubject: dealSubject
						}
					}
				},
				success: function( response ) {
					$.fancybox.open(`<div>Deal Subject saved</div>`);
				}
			})
		});

		$(document).on('click', '#add_new_quote', function(e) {
			let customerTypeInputTimer = null;
			let searchProductsInputTimer = null;

			$.fancybox.open(`<div class="new_quote_popup">
				<h2>Add a new Quote</h2>
				<div class="customer_type">
					<div>
						<input type="radio" id="guest" name="customer_type" value="guest" checked>
						<label for="guest">Guest</label>
					</div>
					<div>
						<input type="radio" id="registered_customer" name="customer_type" value="registered_customer">
						<label for="registered_customer">Registered Customer</label>
					</div>
				</div>
				<div class="guest_form">
					<form>
						<div>
							<div><label>First Name</label><input type="text" name="first-name" placeholder="First Name"></div>
							<div><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name"></div>
							<div><label>Company Name</label><input type="text" name="company-name" placeholder="Company Name"></div>
							<div><label>Email</label><input type="email" name="email" placeholder="Email"></div>
							<div><label>Phone</label><input type="text" name="phone" placeholder="Phone"></div>
							<div><label>City</label><input type="text" name="city" placeholder="City"></div>
							<div><label>State</label><input type="text" name="state" placeholder="State"></div>
							<div>
							<label>Country</label>
							<select name="country">
								<option>Select your Country</option>
				                <option value="United States of America">United States of America</option>
				                <option value="Canada">Canada</option>
				                <option value="Mexico">Mexico</option>
				                <option disabled>---</option>
				                <option value="Afganistan">Afghanistan</option>
				                <option value="Albania">Albania</option>
				                <option value="Algeria">Algeria</option>
				                <option value="American Samoa">American Samoa</option>
				                <option value="Andorra">Andorra</option>
				                <option value="Angola">Angola</option>
				                <option value="Anguilla">Anguilla</option>
				                <option value="Antigua & Barbuda">Antigua & Barbuda</option>
				                <option value="Argentina">Argentina</option>
				                <option value="Armenia">Armenia</option>
				                <option value="Aruba">Aruba</option>
				                <option value="Australia">Australia</option>
				                <option value="Austria">Austria</option>
				                <option value="Azerbaijan">Azerbaijan</option>
				                <option value="Bahamas">Bahamas</option>
				                <option value="Bahrain">Bahrain</option>
				                <option value="Bangladesh">Bangladesh</option>
				                <option value="Barbados">Barbados</option>
				                <option value="Belarus">Belarus</option>
				                <option value="Belgium">Belgium</option>
				                <option value="Belize">Belize</option>
				                <option value="Benin">Benin</option>
				                <option value="Bermuda">Bermuda</option>
				                <option value="Bhutan">Bhutan</option>
				                <option value="Bolivia">Bolivia</option>
				                <option value="Bonaire">Bonaire</option>
				                <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
				                <option value="Botswana">Botswana</option>
				                <option value="Brazil">Brazil</option>
				                <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
				                <option value="Brunei">Brunei</option>
				                <option value="Bulgaria">Bulgaria</option>
				                <option value="Burkina Faso">Burkina Faso</option>
				                <option value="Burundi">Burundi</option>
				                <option value="Cambodia">Cambodia</option>
				                <option value="Cameroon">Cameroon</option>
				                <option value="Canary Islands">Canary Islands</option>
				                <option value="Cape Verde">Cape Verde</option>
				                <option value="Cayman Islands">Cayman Islands</option>
				                <option value="Central African Republic">Central African Republic</option>
				                <option value="Chad">Chad</option>
				                <option value="Channel Islands">Channel Islands</option>
				                <option value="Chile">Chile</option>
				                <option value="China">China</option>
				                <option value="Christmas Island">Christmas Island</option>
				                <option value="Cocos Island">Cocos Island</option>
				                <option value="Colombia">Colombia</option>
				                <option value="Comoros">Comoros</option>
				                <option value="Congo">Congo</option>
				                <option value="Cook Islands">Cook Islands</option>
				                <option value="Costa Rica">Costa Rica</option>
				                <option value="Cote DIvoire">Cote DIvoire</option>
				                <option value="Croatia">Croatia</option>
				                <option value="Cuba">Cuba</option>
				                <option value="Curaco">Curacao</option>
				                <option value="Cyprus">Cyprus</option>
				                <option value="Czech Republic">Czech Republic</option>
				                <option value="Denmark">Denmark</option>
				                <option value="Djibouti">Djibouti</option>
				                <option value="Dominica">Dominica</option>
				                <option value="Dominican Republic">Dominican Republic</option>
				                <option value="East Timor">East Timor</option>
				                <option value="Ecuador">Ecuador</option>
				                <option value="Egypt">Egypt</option>
				                <option value="El Salvador">El Salvador</option>
				                <option value="Equatorial Guinea">Equatorial Guinea</option>
				                <option value="Eritrea">Eritrea</option>
				                <option value="Estonia">Estonia</option>
				                <option value="Ethiopia">Ethiopia</option>
				                <option value="Falkland Islands">Falkland Islands</option>
				                <option value="Faroe Islands">Faroe Islands</option>
				                <option value="Fiji">Fiji</option>
				                <option value="Finland">Finland</option>
				                <option value="France">France</option>
				                <option value="French Guiana">French Guiana</option>
				                <option value="French Polynesia">French Polynesia</option>
				                <option value="French Southern Ter">French Southern Ter</option>
				                <option value="Gabon">Gabon</option>
				                <option value="Gambia">Gambia</option>
				                <option value="Georgia">Georgia</option>
				                <option value="Germany">Germany</option>
				                <option value="Ghana">Ghana</option>
				                <option value="Gibraltar">Gibraltar</option>
				                <option value="Great Britain">Great Britain</option>
				                <option value="Greece">Greece</option>
				                <option value="Greenland">Greenland</option>
				                <option value="Grenada">Grenada</option>
				                <option value="Guadeloupe">Guadeloupe</option>
				                <option value="Guam">Guam</option>
				                <option value="Guatemala">Guatemala</option>
				                <option value="Guinea">Guinea</option>
				                <option value="Guyana">Guyana</option>
				                <option value="Haiti">Haiti</option>
				                <option value="Hawaii">Hawaii</option>
				                <option value="Honduras">Honduras</option>
				                <option value="Hong Kong">Hong Kong</option>
				                <option value="Hungary">Hungary</option>
				                <option value="Iceland">Iceland</option>
				                <option value="Indonesia">Indonesia</option>
				                <option value="India">India</option>
				                <option value="Iran">Iran</option>
				                <option value="Iraq">Iraq</option>
				                <option value="Ireland">Ireland</option>
				                <option value="Isle of Man">Isle of Man</option>
				                <option value="Israel">Israel</option>
				                <option value="Italy">Italy</option>
				                <option value="Jamaica">Jamaica</option>
				                <option value="Japan">Japan</option>
				                <option value="Jordan">Jordan</option>
				                <option value="Kazakhstan">Kazakhstan</option>
				                <option value="Kenya">Kenya</option>
				                <option value="Kiribati">Kiribati</option>
				                <option value="Korea North">Korea North</option>
				                <option value="Korea South">Korea South</option>
				                <option value="Kuwait">Kuwait</option>
				                <option value="Kyrgyzstan">Kyrgyzstan</option>
				                <option value="Laos">Laos</option>
				                <option value="Latvia">Latvia</option>
				                <option value="Lebanon">Lebanon</option>
				                <option value="Lesotho">Lesotho</option>
				                <option value="Liberia">Liberia</option>
				                <option value="Libya">Libya</option>
				                <option value="Liechtenstein">Liechtenstein</option>
				                <option value="Lithuania">Lithuania</option>
				                <option value="Luxembourg">Luxembourg</option>
				                <option value="Macau">Macau</option>
				                <option value="Macedonia">Macedonia</option>
				                <option value="Madagascar">Madagascar</option>
				                <option value="Malaysia">Malaysia</option>
				                <option value="Malawi">Malawi</option>
				                <option value="Maldives">Maldives</option>
				                <option value="Mali">Mali</option>
				                <option value="Malta">Malta</option>
				                <option value="Marshall Islands">Marshall Islands</option>
				                <option value="Martinique">Martinique</option>
				                <option value="Mauritania">Mauritania</option>
				                <option value="Mauritius">Mauritius</option>
				                <option value="Mayotte">Mayotte</option>
				                <option value="Midway Islands">Midway Islands</option>
				                <option value="Moldova">Moldova</option>
				                <option value="Monaco">Monaco</option>
				                <option value="Mongolia">Mongolia</option>
				                <option value="Montserrat">Montserrat</option>
				                <option value="Morocco">Morocco</option>
				                <option value="Mozambique">Mozambique</option>
				                <option value="Myanmar">Myanmar</option>
				                <option value="Nambia">Nambia</option>
				                <option value="Nauru">Nauru</option>
				                <option value="Nepal">Nepal</option>
				                <option value="Netherland Antilles">Netherland Antilles</option>
				                <option value="Netherlands">Netherlands (Holland, Europe)</option>
				                <option value="Nevis">Nevis</option>
				                <option value="New Caledonia">New Caledonia</option>
				                <option value="New Zealand">New Zealand</option>
				                <option value="Nicaragua">Nicaragua</option>
				                <option value="Niger">Niger</option>
				                <option value="Nigeria">Nigeria</option>
				                <option value="Niue">Niue</option>
				                <option value="Norfolk Island">Norfolk Island</option>
				                <option value="Norway">Norway</option>
				                <option value="Oman">Oman</option>
				                <option value="Pakistan">Pakistan</option>
				                <option value="Palau Island">Palau Island</option>
				                <option value="Papua New Guinea">Papua New Guinea</option>
				                <option value="Paraguay">Paraguay</option>
				                <option value="Peru">Peru</option>
				                <option value="Phillipines">Philippines</option>
				                <option value="Pitcairn Island">Pitcairn Island</option>
				                <option value="Poland">Poland</option>
				                <option value="Portugal">Portugal</option>
				                <option value="Puerto Rico">Puerto Rico</option>
				                <option value="Qatar">Qatar</option>
				                <option value="Republic of Montenegro">Republic of Montenegro</option>
				                <option value="Republic of Serbia">Republic of Serbia</option>
				                <option value="Reunion">Reunion</option>
				                <option value="Romania">Romania</option>
				                <option value="Russia">Russia</option>
				                <option value="Rwanda">Rwanda</option>
				                <option value="St Barthelemy">St Barthelemy</option>
				                <option value="St Eustatius">St Eustatius</option>
				                <option value="St Helena">St Helena</option>
				                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
				                <option value="St Lucia">St Lucia</option>
				                <option value="St Maarten">St Maarten</option>
				                <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
				                <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
				                <option value="Saipan">Saipan</option>
				                <option value="Samoa">Samoa</option>
				                <option value="Samoa American">Samoa American</option>
				                <option value="San Marino">San Marino</option>
				                <option value="Sao Tome & Principe">Sao Tome & Principe</option>
				                <option value="Saudi Arabia">Saudi Arabia</option>
				                <option value="Senegal">Senegal</option>
				                <option value="Seychelles">Seychelles</option>
				                <option value="Sierra Leone">Sierra Leone</option>
				                <option value="Singapore">Singapore</option>
				                <option value="Slovakia">Slovakia</option>
				                <option value="Slovenia">Slovenia</option>
				                <option value="Solomon Islands">Solomon Islands</option>
				                <option value="Somalia">Somalia</option>
				                <option value="South Africa">South Africa</option>
				                <option value="Spain">Spain</option>
				                <option value="Sri Lanka">Sri Lanka</option>
				                <option value="Sudan">Sudan</option>
				                <option value="Suriname">Suriname</option>
				                <option value="Swaziland">Swaziland</option>
				                <option value="Sweden">Sweden</option>
				                <option value="Switzerland">Switzerland</option>
				                <option value="Syria">Syria</option>
				                <option value="Tahiti">Tahiti</option>
				                <option value="Taiwan">Taiwan</option>
				                <option value="Tajikistan">Tajikistan</option>
				                <option value="Tanzania">Tanzania</option>
				                <option value="Thailand">Thailand</option>
				                <option value="Togo">Togo</option>
				                <option value="Tokelau">Tokelau</option>
				                <option value="Tonga">Tonga</option>
				                <option value="Trinidad & Tobago">Trinidad & Tobago</option>
				                <option value="Tunisia">Tunisia</option>
				                <option value="Turkey">Turkey</option>
				                <option value="Turkmenistan">Turkmenistan</option>
				                <option value="Turks & Caicos Is">Turks & Caicos Is</option>
				                <option value="Tuvalu">Tuvalu</option>
				                <option value="Uganda">Uganda</option>
				                <option value="United Kingdom">United Kingdom</option>
				                <option value="Ukraine">Ukraine</option>
				                <option value="United Arab Erimates">United Arab Emirates</option>
				                <option value="Uraguay">Uruguay</option>
				                <option value="Uzbekistan">Uzbekistan</option>
				                <option value="Vanuatu">Vanuatu</option>
				                <option value="Vatican City State">Vatican City State</option>
				                <option value="Venezuela">Venezuela</option>
				                <option value="Vietnam">Vietnam</option>
				                <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
				                <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
				                <option value="Wake Island">Wake Island</option>
				                <option value="Wallis & Futana Is">Wallis & Futana Is</option>
				                <option value="Yemen">Yemen</option>
				                <option value="Zaire">Zaire</option>
				                <option value="Zambia">Zambia</option>
				                <option value="Zimbabwe">Zimbabwe</option>
							</select>
							</div>
							<div>
								<label>Preferred language</label>
								<select name="preferred_language">
									<option value="">Preferred language</option>
									<option value="English">English</option>
									<option value="Spanish">Spanish</option>
									<option value="Other">Other</option>
								</select>
							</div>
						</div>
					</form>
				</div>
				<div class="search_customer" style="display: none;">
					<div class="selected_customer"></div>
					<label for="search_customer">Search Customer</label>
					<input type="text" placeholder="Search by Name or Email" id="search_customer">
					<div class="search_customer_result"></div>
				</div>
				<div>
					<label>What's your role in this project?</label>
					<select name="role-in-this-project">
						<option value="I'm the end user/buyer">I'm the end user/buyer</option>
						<option value="I'm helping the buyer">I'm helping the buyer</option>
						<option value="I'm a reseller">I'm a reseller</option>
					</select>
				</div>
				<div>
					<label>Project Timeline</label>
					<select name="project_timeline">
						<option value="Now">Now</option>
						<option value="Weeks">Weeks</option>
						<option value="Months">Months</option>
						<option value="Future">Future</option>
						<option value="Just Budgeting">Just Budgeting</option>
						<option value="I Don't Know">I Don't Know</option>
					</select>
				</div>
				<div class="search_products">
					<label>Search Products</label>
					<input type="text" placeholder="Search by Product Title or SKU" id="search_products">
					<div class="search_products_results"></div>
				</div>
				<div class="message"></div>
				<a class="confirm button">Confirm</a>
			</div>`);

			$(document).on('change', '.new_quote_popup input[name="customer_type"]', function(e) {
				let $this = $(this);
				let customerType = $this.val();

				if (customerType == "registered_customer") {
					$('.new_quote_popup .guest_form').hide();
					$('.new_quote_popup .search_customer').show();
				} else if (customerType == "guest") {
					$('.new_quote_popup .guest_form').show();
					$('.new_quote_popup .search_customer').hide();
				}
			});

			$(document).on('keyup', '.new_quote_popup #search_customer', function(e) {
				let searchTerm = $(this).val();
				if (customerTypeInputTimer != null) clearTimeout(customerTypeInputTimer);
				customerTypeInputTimer = setTimeout(function() {
					$.ajax({
						method: 'POST',
						url: '/adminAjax',
						data: {
							action: 'search.customer.by.email.name',
							data: {
								info: {
									searchTerm: searchTerm
								}
							}
						},
						success: function( response ) {
							if (response != "null") {
								let searchResultHtml = '';
								$('.search_customer').find('.customer_search_result_popup').remove();

								$.each(response, (index, user) => {
									searchResultHtml += `<div data-userid="${user.user_id}">${user.first_name} ${user.last_name}</div>`
								});
								$('.search_customer').append(`
										<div class="customer_search_result_popup">
										${searchResultHtml}
										</div>
									`);
							}
						}
					});
					clearTimeout(customerTypeInputTimer);
				}, 1000);
			});

			$(document).on('click', '.new_quote_popup .customer_search_result_popup > div', function() {
				$('.new_quote_popup .search_customer_result').empty();
				$('.new_quote_popup .search_customer_result').append($(this).clone());
				$('.new_quote_popup .customer_search_result_popup').remove();
			});

			$(document).on('keyup', '.new_quote_popup #search_products', function(e) {
				let term = $(this).val();

				if (term.length == 0) {
					$(document).find('.new_quote_popup .search_products_result_popup').remove();
				}

				if (searchProductsInputTimer != null) clearTimeout(searchProductsInputTimer);

				searchProductsInputTimer = setTimeout(function(){
					$.ajax({
						method: 'POST',
						url: '/adminAjax',
						data: {
							action: 'product.search',
							data: {
								term: term
							}
						},
						success: function( response ) {

							if (response.errors == false) {

								let $html = "";

								console.log(response.body.data.products.edges);

								$.each(response.body.data.products.edges, (index, product) => {
									$html += `
									<div data-productid="${ product.node.id }" data-variantid="${ product.node.variants.edges[0].node.id }" data-price="${ product.node.variants.edges[0].node.price }" data-title="${ product.node.title }" data-image="${ product.node.featuredImage.originalSrc }" data-handle="${ product.node.handle }">
										<span style="width: 100px; height: 100px; background-image: url(' ${product.node.featuredImage.originalSrc}'); background-position: center center; background-size: contain; background-repeat: no-repeat; border: solid 1px #ccc; display: block;"></span>
										<div>
											<p class="product-name" style="margin: 0; font-size: 16px !important;"> ${product.node.title}</p>
											<p class="product-sku" style="font-size: 14px !important;">SKU: ${product.node.variants.edges[0].node.sku}</p>
										</div>
									</div>`;
								});

								$('.search_products').find('search_products_result_popup').remove();
								$('.search_products').append(`<div class="search_products_result_popup">
									${$html}
									</div>`);
							}
						}
					});

					clearTimeout(searchProductsInputTimer);
				}, 800);
			});

			$(document).on('click', '.new_quote_popup .search_products_result_popup > div', function(e) {
				let productID = $(this).data('productid');
				if ($('.search_products_results').find(`div[data-productid="${ productID }"]`).length == 0) {
					$('.search_products_results').append($(this).clone().append('<div class="remove"></div>'));
				}
			});

			$(document).on('click', '.new_quote_popup .search_products_results .remove', function(e) {
				$(this).closest('[data-productid]').remove();
			});

			$(document).on('click', '.new_quote_popup a.confirm', function(e) {
				let customerType = $('input[name="customer_type"]:checked').val();
				let quotePopup = $('.new_quote_popup');

				if($(this).hasClass('disabled')) return;
				$(this).addClass('disabled');

				if (customerType == "guest") {
					let guestInfo = {
						firstName: quotePopup.find('input[name="first-name"]').val(),
						lastName: quotePopup.find('input[name="last-name"]').val(),
						companyName: quotePopup.find('input[name="company-name"]').val(),
						email: quotePopup.find('input[name="email"]').val(),
						phone: quotePopup.find('input[name="phone"]').val(),
						city: quotePopup.find('input[name="city"').val(),
						state: quotePopup.find('input[name="state"]').val(),
						country: quotePopup.find('select[name="country"]').val(),
						preferredLanguage: quotePopup.find('select[name="preferred_language"]').val(),
						roleInThisProject: quotePopup.find('select[name="role-in-this-project"]').val(),
						projectTimeline: quotePopup.find('select[name="project_timeline"]').val()
					};

					if ($('.new_quote_popup .search_products_results div[data-productid]').length > 0) {
						if (guestInfo.firstName.length > 0 && guestInfo.lastName.length > 0 && guestInfo.companyName.length > 0 && guestInfo.email.length > 0 && guestInfo.phone.length > 0 && guestInfo.city.length > 0 && guestInfo.state.length > 0 && guestInfo.country.length > 0 && guestInfo.preferredLanguage.length > 0 && guestInfo.roleInThisProject.length > 0 && guestInfo.projectTimeline.length > 0) {
							let products = new Array();
							$('.new_quote_popup .search_products_results div[data-productid]').each((index, product) => {
								let $product = $(product);
								products.push({
									productID: $product.data('productid'),
									variantID: $product.data('variantid'),
									price: $product.data('price'),
									title: $product.data('title'),
									image: $product.data('image'),
									handle: $product.data('handle')
								});
							});

							$.ajax({
								method: 'POST',
								url: '/adminAjax',
								data: {
									action: 'add.new.quote',
									data: {
										customerType: customerType,
										products: products,
										customerInfo: guestInfo
									}
								},
								success: function( response ) {
									if (response == "success") {
										window.location.reload();
									} else {
										$('.new_quote_popup .message').text(response);
										$(this).removeClass('disabled');
									}
								}
							});
						} else {
							console.log(guestInfo);
							$('.new_quote_popup .message').text('Please fill out all guest info');
							$(this).removeClass('disabled');
						}
					} else {
						$('.new_quote_popup .message').text('Please select products');
						$(this).removeClass('disabled');
					}
				} else if (customerType == "registered_customer") {
					if ($('.new_quote_popup .search_customer_result div[data-userid]').length > 0 && $('.new_quote_popup .search_products_results div[data-productid]').length > 0) {
						let userID = $('.new_quote_popup .search_customer_result div[data-userid]').data('userid');
						let products = new Array();
						$('.new_quote_popup .search_products_results div[data-productid]').each((index, product) => {
							let $product = $(product);
							products.push({
								productID: $product.data('productid'),
								variantID: $product.data('variantid'),
								price: $product.data('price'),
								title: $product.data('title'),
								image: $product.data('image'),
								handle: $product.data('handle')
							});
						});
						
						$.ajax({
							method: 'POST',
							url: '/adminAjax',
							data: {
								action: 'add.new.quote',
								data: {
									customerType: customerType,
									userID: userID,
									products: products,
									projectDetails: {
										roleInThisProject: $('.new_quote_popup select[name="role-in-this-project"]').val(),
										projectTimeline: $('.new_quote_popup select[name="project_timeline"]').val()
									}
								}
							},
							success: function( response ) {
								window.location.reload();
							}
						});

						$('.new_quote_popup .message').empty();
					} else {
						$('.new_quote_popup .message').text('Select existing customer or Add products');
						$(this).removeClass('disabled');
					}
				}
				// console.log($('input[name="customer_type"]:checked').val());
			});

		});

		$(document).on('click', '#hubspot-settings a.save', function(e) {
			e.preventDefault();
			let $this = $(this);
			let hubspotApiKey = $('#hubspot-settings input[name="hubspot_key"]').val();
			let emailFromName = $('#hubspot-settings input[name="hubspot_sender_name"]').val();
			let emailFromEmail = $('#hubspot-settings input[name="hubspot_sender_email_address"]').val();
			let emailIdWebsiteQuoteConfirmation = $('#hubspot-settings input[name="quote_confirmation_id"]').val();
			let emailIdSendDealtoCustomerAndSales = $('#hubspot-settings input[name="email_to_customer_id"]').val();
			let emailIdSendLeadtoSalesOnly = $('#hubspot-settings input[name="email_to_sales_rep_id"]').val();
			let emailIdWebsiteQuoteConfirmationSpanish = $('#hubspot-settings input[name="quote_confirmation_id_spanish"]').val();
			let emailIdSendDealtoCustomerAndSalesSpanish = $('#hubspot-settings input[name="email_to_customer_id_spanish"]').val();
			let emailIdSendLeadtoSalesOnlySpanish = $('#hubspot-settings input[name="email_to_sales_rep_id_spanish"]').val();

			if ($this.hasClass('disabled')) {
				return false;
			}

			$this.addClass('disabled');

			$.ajax({
				method: 'POST',
				url: '/adminAjax',
				data: {
					action: 'save.hubspot.settings',
					data: {
						info: {
							hubspotApiKey: hubspotApiKey,
							emailFromName: emailFromName,
							emailFromEmail: emailFromEmail,
							emailIdWebsiteQuoteConfirmation: emailIdWebsiteQuoteConfirmation,
							emailIdSendDealtoCustomerAndSales: emailIdSendDealtoCustomerAndSales,
							emailIdSendLeadtoSalesOnly: emailIdSendLeadtoSalesOnly,
							emailIdWebsiteQuoteConfirmationSpanish: emailIdWebsiteQuoteConfirmationSpanish,
							emailIdSendDealtoCustomerAndSalesSpanish: emailIdSendDealtoCustomerAndSalesSpanish,
							emailIdSendLeadtoSalesOnlySpanish: emailIdSendLeadtoSalesOnlySpanish
						}
					}
				},
				success: function( response ) {
					console.log(response);
					$this.removeClass('disabled');
					$.fancybox.open(`<div>Hubspot settings saved</div>`);
				}
			})
		});

		$(document).on('click', '.send_deal_to_hubspot', function(e) {
			e.preventDefault();
			let $this = $(this);
			let userInfo = {};
			let quoteInfo = {};
			let salesrepid = $('#set_sales_rep').val();
			userInfo.firstName = $('#first_name').text();
			userInfo.lastName = $('#last_name').text();
			userInfo.company = $('#company_name').text();
			userInfo.email = $('#email').text();
			userInfo.phone = $('#phone').text();
			userInfo.city = $('#city').text();
			userInfo.state = $('#state').text();
			userInfo.country = $('#country').text();
			userInfo.preferredLanguage = $('#preferred_language').text();
			userInfo.hubspot_owner_id = $(`#set_sales_rep option[value="${salesrepid}"]`).attr('data-ownerid');
			quoteInfo.quoteID = $('#quoteID').text();

			if ($this.hasClass('disabled')) {
				return false;
			}
			// $this.addClass('disabled');

			$.fancybox.open(`
			<div class="send_deal_to_hubspot_fisrt_confirmation" style="max-width: 300px; text-align: center;">
				<div>Are you sure you want to send deal to hubspot?</div>
				<div style="margin-top: 35px; text-align: center;">
					<button class="yes button" style="margin-right: 20px;">Yes</button>
					<button class="no button">No</button>
				</div>
			</div>
			`);

			$(document).on('click', '.send_deal_to_hubspot_fisrt_confirmation button.yes', function(e) {
				let currentStatus = $('a.send_deal_to_hubspot').attr('data-status');
				if (currentStatus != 'yes') {
					let $thisButton = $(this);
					if ($thisButton.hasClass('disabled')) {
						return false;
					}
					$thisButton.addClass('disabled');
					$.ajax({
						method: 'POST',
						url: '/adminAjax',
						data: {
							action: 'send.deal.to.hubspot',
							data: {
								userInfo: userInfo,
								quoteInfo: quoteInfo
							}
						},
						success: function( response ) {
							$.fancybox.close();
							$.fancybox.open(`<div>Deal sent to hubspot</div>`);
							$('a.send_deal_to_hubspot').attr('data-status', 'yes');
							$('#hubspot_image a').attr('href', response);
							$('#hubspot_image').show();
							$thisButton.removeClass('disabled');
						}
					});
				} else {
					$.fancybox.close();
					$.fancybox.open(`
						<div class="send_deal_to_hubspot_confirmation_popup" style="max-width: 300px; text-align: center;">
							<div>This deal has already been sent, are you sure you want to send again</div>
							<div style="margin-top: 35px; text-align: center;">
								<button class="yes button" style="margin-right: 20px;">Yes</button>
								<button class="no button">No</button>
							</div>
						</div>`);
					$(document).on('click', '.send_deal_to_hubspot_confirmation_popup button.yes', function(e) {
						e.preventDefault();
						let $thisButton = $(this);
						if ($thisButton.hasClass('disabled')) {
							return false;
						}
						$thisButton.addClass('disabled');

						$.ajax({
							method: 'POST',
							url: '/adminAjax',
							data: {
								action: 'send.deal.to.hubspot',
								data: {
									userInfo: userInfo,
									quoteInfo: quoteInfo
								}
							},
							success: function( response ) {
								$.fancybox.close();
								$.fancybox.open(`<div>Deal sent to hubspot</div>`);
								$('a.send_deal_to_hubspot').attr('data-status', 'yes');
								$('#hubspot_image a').attr('href', response);
								$('#hubspot_image').show();
								$thisButton.removeClass('disabled');
							}
						});
					});

					$(document).on('click', '.send_deal_to_hubspot_confirmation_popup button.no', function(e) {
						$.fancybox.close();
					});
				}
			});

			$(document).on('click', '.send_deal_to_hubspot_fisrt_confirmation button.no', function(e) {
				$.fancybox.close();
			});

		});

	});
})(jQuery);