/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));

(function($){

	$(document).ready(function(e) {

		var genemcoQuoteContainer = $('#genemco-quote'); //Genemco Quote Checkout Element
		var genemcoMyQuoteTable = $('#genemco-my-quote-list'); //Genemco Customer Order View List Element

		var disableElement = function(selector) {
			$(selector).find('a').addClass('disabled');
			$(selector).addClass('pending');
		}

		var enableElement = function(selector) {
			$(selector).find('a').removeClass('disabled');
			$(selector).removeClass('pending');
		}

		var updateGenemcoTable = function(quoteID) {
			genemcoMyQuoteTable.html('<div class="card__header card__header--tight"><a class="link link--accented back">Back</a><a class="link link--accented archived" title="Show archived products" data-quoteid="' + quoteID + '"><i class="fa fa-archive" aria-hidden="true"></i></a><a class="button button--primary add" style="float: right;" data-quoteid="' + quoteID + '">Add Product</a><div style="float: none; clear: both;"></div></div><table class="table table--loose"><thead><tr><th></th><th>Product</th><th>Quote</th><th>Status</th><th>Genemco Comments</th><th>Quote History</th></tr></thead><tbody></tbody></table>');

			var products = window.quotedProducts;

			console.log(products);

			$.each(products, (key, product) => {
				var html = '';
				
				html += '<tr>';
				html += '<td style="width: 30px">'
					 	+ '<a class="link link--accented trash ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" title="Trash this product"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'
					 	+ '</td>';
				html += '<td class="line-item__product-info">'
						+ '<div class="line-item__product-info-wrapper">'
						+ '<div class="line-item__image-wrapper">'
						+ '<div class="aspect-ratio aspect-ratio--square">'
						+ '<img src="'+ product.product_image + '">'
						+ '</div>'
						+ '</div>'
						+ '<div class="line-item__meta">'
						+ '<a class="line-item__title link text--strong" href="' + product.product_url + '">' + product.product_title + '</a>'
						+ '<div class="line-item__price-list">'
						+ '<span class="line-item__price">' + (product.approved_by_admin ? '$' + product.product_price : 'Pending price...') + '</span>'
						+ '</div>'
						+ '</div>'
						+ '</div>'
						+ '</td>';
				html += '<td><a class="link link--accented approve ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" data-price="' + product.product_price + '">Approve</a> / <a class="link link--accented reject ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" data-price="' + product.product_price + '">Reject</a><div class="error-message" style="display: none;">Comment is empty!</div></td>';
				html += '<td>' + (product.approved_by_admin ? ( product.approved ? 'Approved.' : ( product.genemco_updated ? 'Pending Customer Approval.': 'Customer Rejected. Pending Genemco Approval.' ) ) : 'Pending Genemco Approval.' ) + '</td>';
				html += '<td>'+ product.admin_comment + '</td>';
				html += '<td><a class="link link--accented history ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-historyID="' + product.product_history_id + '">History</a></td>';
				html += '</tr>';
				if (product.isactive) {
					genemcoMyQuoteTable.find('tbody').append(html);
				}
			});
		}

		var renderMyQuotesTable = function() {
			//Disable further more button clicks
			disableElement(genemcoMyQuoteTable);

			$.ajax({

				method:'GET',

				crossDomain: true,

				async: true,

				dataType: 'json',

				url:'https://app.genemco.com/ajaxMyQuotes',

				data: { 
					customer: window.registered_customer
				},

				success: function(response) {

					//Enable further more button clicks
					enableElement(genemcoMyQuoteTable);

					var quotes = response.success;

					genemcoMyQuoteTable.html('<table class="table table--loose"><thead><tr><th>Quote</th><th>Date</th><th>Approval status</th><th>Ordered</th><th>Total</th></tr></thead><tbody></tbody></table>');

					$.each(quotes, (key, quote) => {

						var approved = ordered = '';

						if (quote.approved == true) {
							approved = 'Approved';
							quote.total = '$' + quote.total;
						} else {
							quote.total = approved = 'Pending...';
						}

						if (quote.ordered == true) {
							ordered = 'Yes';
						} else {
							ordered = 'No';
						}

						genemcoMyQuoteTable.find('tbody').append('<tr><td><a data-quoteid="' + quote.quote_id + '" class="link link--accented show-quote" >'+ '#' + quote.id + '</a></td><td>' + quote.date + '</td><td>'+ approved + '</td><td>' + ordered + '</td><td>' + quote.total + '</td></tr>');

					});

				}

	        });
		}

		var renderQuotedProducts = function(quoteID) {
			//Disable further more button clicks
			disableElement(genemcoMyQuoteTable);

			$.ajax({

				method:'GET',

				crossDomain: true,

				async: true,

				dataType: 'json',

				url:'https://app.genemco.com/ajaxQuotedProducts',

				data: {
					quoteID: quoteID
				},

				success: function(response) {
					enableElement(genemcoMyQuoteTable);

					// genemcoMyQuoteTable.html('<div class="card__header card__header--tight"><a class="link link--accented back">Back</a><a class="link link--accented archived" title="Show archived products" data-quoteid="' + quoteID + '"><i class="fa fa-archive" aria-hidden="true"></i></a></div><table class="table table--loose"><thead><tr><th></th><th>Product</th><th>Genemco Comments</th><th>Approve?</th><th>Status</th><th>See quote history</th></tr></thead><tbody></tbody></table>');

					var products = response.success;
					window.quotedProducts = response.success;

					updateGenemcoTable(quoteID);

					// $.each(products, (key, product) => {
					// 	var html = '';
						
					// 	html += '<tr>';
					// 	html += '<td style="width: 30px">'
					// 		 	+ '<a class="link link--accented trash ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" title="Trash this product"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'
					// 		 	+ '</td>';
					// 	html += '<td class="line-item__product-info">'
					// 			+ '<div class="line-item__product-info-wrapper">'
					// 			+ '<div class="line-item__image-wrapper">'
					// 			+ '<div class="aspect-ratio aspect-ratio--square">'
					// 			+ '<img src="'+ product.product_image + '">'
					// 			+ '</div>'
					// 			+ '</div>'
					// 			+ '<div class="line-item__meta">'
					// 			+ '<a class="line-item__title link text--strong" href="' + product.product_url + '">' + product.product_title + '</a>'
					// 			+ '<div class="line-item__price-list">'
					// 			+ '<span class="line-item__price">' + (product.approved_by_admin ? '$' + product.product_price : 'Pending price...') + '</span>'
					// 			+ '</div>'
					// 			+ '</div>'
					// 			+ '</div>'
					// 			+ '</td>';
					// 	html += '<td>'+ product.admin_comment + '</td>';
					// 	html += '<td><a class="link link--accented approve ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" data-price="' + product.product_price + '">Approve</a> / <a class="link link--accented reject ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" data-price="' + product.product_price + '">Reject</a><div class="error-message" style="display: none;">Comment is empty!</div></td>';
					// 	html += '<td>' + (product.approved_by_admin ? ( product.approved ? 'Approved.' : ( product.genemco_updated ? 'Pending Customer Approval.': 'Customer Rejected. Pending Genemco Approval.' ) ) : 'Pending Genemco Approval.' ) + '</td>';
					// 	html += '<td><a class="link link--accented history ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-historyID="' + product.product_history_id + '">History</a></td>';
					// 	html += '</tr>';
					// 	if (product.isactive) {
					// 		genemcoMyQuoteTable.find('tbody').append(html);
					// 	}
					// });

					console.log(response.success);
				}
	       });
		}

		if ( genemcoQuoteContainer.length > 0 ) {
			// genemcoQuoteContainer.html('Im genemco App content');
			$.ajax({

	           method:'GET',

	           crossDomain: true,

	           async: true,

	           dataType: 'json',

	           url:'https://app.genemco.com/ajaxRequestQuoteCheckout',

	           data: '',

	           success: function(data){

	              genemcoQuoteContainer.html(data.success);

	              if ( typeof window.registered_customer !== "undefined" ) {

	              	$(document).find('input[name="quote[contact_info]"]').val(window.registered_customer.email);
	              	$(document).find('input[name="quote[shipping_address][first_name]"]').val(window.registered_customer.first_name);
	              	$(document).find('input[name="quote[shipping_address][last_name]"]').val(window.registered_customer.last_name);
	              	$(document).find('input[name="quote[shipping_address][address1]"]').val(window.registered_customer.address1);
	              	$(document).find('input[name="quote[shipping_address][address2]"]').val(window.registered_customer.address2);
	              	$(document).find('input[name="quote[shipping_address][city]"]').val(window.registered_customer.city);
	              	$(document).find('select[name="quote[shipping_address][country]"]').val(window.registered_customer.country);
	              	$(document).find('select[name="quote[shipping_address][province]"]').val(window.registered_customer.province);
	              	$(document).find('input[name="quote[shipping_address][zip]"]').val(window.registered_customer.zip);

	              }

	              $(document).find('#genemco_change-registered-customer-info_btn').show();

	              $.getJSON('/cart.js', function(cart) {

	              	var quoteCartContainer = $(document).find('#genemco-quote-cart');

	              	quoteCartContainer.empty();

	              	// console.log(cart.items);

	              	window.quoteCartItems = cart.items;

	              	$.each(cart.items, function(index, value) {

	              		quoteCartContainer.prepend('<div class="genemco-cart-item"><a href="' + value.url + '"><img src="' + value.image + '"></a><span>' + value.product_title + '</span></div>');

	              	});

	              	quoteCartContainer.append('<div class="genemco-cart_total"><span>Total</span><span class="genemco-cart_count">' + cart.items.length + ' items</span></div>');

	              	$(document).find('#quote-submit').removeAttr('disabled');

	              });

	           }

	        });

	        $(document).on('click', "#quote-submit", function(e) {
	        	e.preventDefault();

	        	var _this = $(this);

	        	var serialzed_data = $('#genemco-quote form').serializeArray();

	        	var has_error = false;

	        	jQuery.each(serialzed_data, (key, ele) => {
	        		console.log(ele)
	        		if ( ele.value == '' ) {
	        			$(document).find('#genemco-quote-error-message').text('please fillout all the fields');
		        		// console.log(serialzed_data);
		        		has_error = true;
		        		return false;
	        		}
	        	});

	        	if ( has_error ) {
	        		return false;
	        	}

	        	_this.text('Submitting quote');

	        	_this.prop('disabled', true);

	        	if ( typeof window.quoteCartItems !== "undefined" ) {

	        		serialzed_data.push({ name: "quote[cart_item]", value: window.quoteCartItems });

	        	}

	        	if ( typeof window.registered_customer !== "undefined"  ) {

	        		serialzed_data.push({ name: "quote[registered_customer]", value: window.registered_customer });

	        	}

	        	// console.log(serialzed_data);

	        	$.ajax({

					method:'POST',

					crossDomain: true,

					async: true,

					url:'https://app.genemco.com/ajaxSubmitQuote',

					data: { quote: serialzed_data },

					success:function(data){

						console.log(data);

						$.ajax({
							type: "POST",
							url: "/cart/clear.js",
							data: '',
							dataType: 'json',
							success: function() {
								$('.quote-cart_container').html('<div class="empty-state"><div class="empty-state__icon"><svg width="81" height="70" viewBox="0 0 81 70"><g transform="translate(0 2)" stroke-width="4" stroke="#3a2a2f" fill="none" fill-rule="evenodd"><circle stroke-linecap="square" cx="34" cy="60" r="6"></circle><circle stroke-linecap="square" cx="67" cy="60" r="6"></circle><path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path></g></svg></div><p class="empty-state__heading heading h1">Successfully submitted quote</p><div class="empty-state__button-container"><a href="/collections/all" class="empty-state__button button button--primary">Shop our products</a><a href="/pages/quotes-history" class="empty-state__button button button--primary">View my quotes</a></div></div>');
							}
						});

						// console.log("Submitted Quote");

						// _this.prop('disabled', false);

						// _this.text('Submit Quote');



					}

		        });
	        });

	        $(document).on('click', '#genemco_change-customer', function(e) {
	        	e.preventDefault();

	        	$(document).find('.genemco-quote-form input[name="quote[contact_info]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[contact_info]"]').val());
	            $(document).find('.genemco-quote-form input[name="quote[shipping_address][first_name]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][first_name]"]').val());
	            $(document).find('.genemco-quote-form input[name="quote[shipping_address][last_name]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][last_name]"]').val());
              	$(document).find('.genemco-quote-form input[name="quote[shipping_address][address1]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][address1]"]').val());
              	$(document).find('.genemco-quote-form input[name="quote[shipping_address][address2]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][address2]"]').val());
              	$(document).find('.genemco-quote-form input[name="quote[shipping_address][city]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][city]"]').val());
              	$(document).find('.genemco-quote-form select[name="quote[shipping_address][country]"]').val($(document).find('.genemco_registered-customer-form select[name="quote[shipping_address][country]"]').val());
              	$(document).find('.genemco-quote-form select[name="quote[shipping_address][province]"]').val($(document).find('.genemco_registered-customer-form select[name="quote[shipping_address][province]"]').val());
              	$(document).find('.genemco-quote-form input[name="quote[shipping_address][zip]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][zip]"]').val());

              	$(document).find('#genemco_registered-customer-info_email').text($(document).find('.genemco_registered-customer-form input[name="quote[contact_info]"]').val());
              	$(document).find('#genemco_registered-customer-info_name').text($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][first_name]"]').val() + " " + $(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][last_name]"]').val());
				$(document).find('#genemco_registered-customer-info_address1').text($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][address1]"]').val() + " " + $(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][address2]"]').val() + " " + $(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][city]"]').val());
				$(document).find('#genemco_registered-customer-info_address2').text($(document).find('.genemco_registered-customer-form select[name="quote[shipping_address][province]"]').val() + " " + $(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][zip]"]').val() + " " + $(document).find('.genemco_registered-customer-form select[name="quote[shipping_address][country]"]').val());

              	parent.$.fancybox.close();

	        });
		}

		// Render Genemco Quote table on page load
		if ( genemcoMyQuoteTable.length > 0 ) {
			renderMyQuotesTable();
		}

		// Render Genemco Quoted Products on quote ID clicked
		$(document).on('click', '#genemco-my-quote-list a.show-quote', function(e) {

			renderQuotedProducts($(this).data('quoteid'));

		});

		// Back button on My quotes
		$(document).on('click', '#genemco-my-quote-list a.back', function(e) {
			renderMyQuotesTable();
		});

		// Show Product History
		$(document).on('click', '#genemco-my-quote-list a.history', function(e) {
			//Disable further more button clicks
			disableElement(genemcoMyQuoteTable);

			var historyID = $(this).data('historyid');

			$.ajax({

				method:'GET',

				crossDomain: true,

				async: true,

				dataType: 'json',

				url:'https://app.genemco.com/ajaxProductHistory',

				data: {
					historyID: historyID
				},

				success: function(response) {
					enableElement(genemcoMyQuoteTable);
					console.log(response.success);
					
					var html = '<table>';

					html += '<tr><th>From</th><th>Status</th><th>Date</th><th>Old Price</th><th>New Price</th><th>Comment</th></tr>';

					$.each(response.success, (key, history) => {
						html += '<tr><td>' + history.from + '</td><td>' + history.status + '</td><td>' + history.date + '</td><td>$' + history.old_price + '</td><td>$' + history.new_price + '</td><td>' + history.comment + '</td></tr>';
					});

					html +='</table>'

					$.fancybox.open('<div class="message"><h2 style="text-align: center; text-transform: uppercase; font-weight: bold;">History!</h2>' + html + '</div>');
				}
			});
		});

		// Trash Certain Product
		$(document).on('click', '#genemco-my-quote-list a.trash', function(e) {
			//Disable further more button clicks
			// disableElement(genemcoMyQuoteTable);

			var productID = $(this).data('productid');
			var variantID = $(this).data('variantid');
			var quoteID = $(this).data('quoteid');
			var parentRow = $(this).closest('tr');

			$.fancybox.open('<div class="confirmation-popup" style="max-width: 300px; width: 90%;">' + 
				'<p style="text-align: center;">Are you sure to trash this product?</p>' +
				'<div style="text-align: center">' +
				'<a class="trash button button--primary" style="margin-right: 10px;" data-productid="' + productID + '" data-variantID="' + variantID + '" data-quoteid="' + quoteID + '">Yes</a>' +
				'<a class="no button button--secondary">No</a>' +
				'</div>' +
				'<div class="error-message" style="text-align: center; display: none;">Comment field is empty!</div>' +
				'</div>');

			return;

		});

		//Approve or Reject
		$(document).on('click', '#genemco-my-quote-list a.approve, #genemco-my-quote-list a.reject', function(e) {

			var confirmationLabel = ($(e.target).hasClass('approve')) ? 'approve' : 'reject';
			var productID = $(this).data('productid');
			var variantID = $(this).data('variantid');
			var quoteID = $(this).data('quoteid');
			var price = $(this).data('price');

			$.fancybox.open('<div class="confirmation-popup" style="max-width: 300px; width: 90%;">' + 
				'<p style="text-align: center;">' + 'Could you write a few words why you\'d like to ' + confirmationLabel + '?</p>' +
				'<textarea name="user-comment" style="width: 100%; text-align: center;"></textarea>' + 
				'<a class="link link--accented ' + confirmationLabel + '" style="display: block; text-align: center; cursor: pointer; text-transform: capitalize;" data-productid="' + productID + '" data-variantID="' + variantID + '" data-quoteid="' + quoteID + '" data-price="' + price + '">' + confirmationLabel + '</a>' +
				'<div class="error-message" style="text-align: center; display: none;">Comment field is empty!</div>' +
				'</div>');

			return;

		});

		$(document).on('click', '.confirmation-popup a.approve, .confirmation-popup a.reject', function(e) {
			e.preventDefault();

			if ($(this).closest('.confirmation-popup').find('textarea[name="user-comment"]').val() == '') {
				var error = $(this).closest('.confirmation-popup').find('.error-message');
				
				error.show();
				setTimeout(function() {
					error.hide('slow');
				}, 1000)
				return;
			}

			var approve = '';
			var approveStatus = false;

			var productID = $(this).data('productid');
			var variantID = $(this).data('variantid');
			var quoteID = $(this).data('quoteid');
			var price = $(this).data('price');
			var $parentRow = $(this).closest('.confirmation-popup');
			var userComment = $parentRow.find('textarea[name="user-comment"]').val();
			var $this = $(this);

			//Disable further more button clicks
			disableElement($parentRow);

			if ($(e.target).hasClass('approve')) {
				approve = 'approve';
				approveStatus = true;
			} else if ($(e.target).hasClass('reject')) {
				approve = 'reject';
				approveStatus = false;
			}

			$.ajax({

				method:'GET',

				crossDomain: true,

				async: true,

				dataType: 'json',

				url:'https://app.genemco.com/ajaxProductApprove',

				data: {
					productID: productID,
					variantID: variantID,
					quoteID: quoteID,
					userComment: userComment,
					approveStatus: approveStatus,
					price: price
				},

				success: function(response) {

					enableElement($parentRow);
					$parentRow.find('textarea[name="user-comment"]').val('');
					$parentRow.find('button').trigger('click');
					console.log(response.success);

				}
			});
		});

		$(document).on('click', '.confirmation-popup a.no, .confirmation-popup a.cancel', function(e) {
			$.fancybox.close();
		});

		$(document).on('click', '.confirmation-popup a.trash', function(e) {
			var productID = $(this).data('productid');
			var variantID = $(this).data('variantid');
			var quoteID = $(this).data('quoteid');
			var $parentRow = $(this).closest('.confirmation-popup');

			//Disable further more button clicks
			disableElement($parentRow);

			$.ajax({

				method:'GET',

				crossDomain: true,

				async: true,

				dataType: 'json',

				url:'https://app.genemco.com/ajaxProductTrash',

				data: {
					productID: productID,
					variantID: variantID,
					quoteID: quoteID
				},

				success: function(response) {
					console.log(response.success);
					window.quotedProducts = response.success;
					// $parentRow.hide('slow', function(){ $parentRow.remove(); });
					$parentRow.find('button').trigger('click');
					var $target = $('a[data-productid="' + productID + '"][data-variantid="' + variantID + '"][data-quoteid="' + quoteID + '"]').closest('tr');

					$target.hide(1000, function(){
						$target.remove();
					});

					enableElement($parentRow);
				}
			});
		});

		$(document).on('click', '#genemco-my-quote-list a.archived', function(e) {
			var quoteID = $(this).data('quoteid');
			var parentRow = $(this).closest('#genemco-my-quote-list');
			var html = '';

			html += '<table class="table table--loose">' +
					'<thead><tr><th></th><th></th></tr></thead>' +
					'<tbody>';

			$.each(window.quotedProducts, (index, product) => {
				var tableRowHtml = '';

				tableRowHtml += '<tr>';
				tableRowHtml += '<td style="width: 30px">'
					 	+ '<a class="link link--accented restore ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" title="Restore this product" style="cursor: pointer;">Restore</a>'
					 	+ '</td>';
				tableRowHtml += '<td class="line-item__product-info">'
						+ '<div class="line-item__product-info-wrapper">'
						+ '<div class="line-item__image-wrapper">'
						+ '<div class="aspect-ratio aspect-ratio--square">'
						+ '<img src="'+ product.product_image + '">'
						+ '</div>'
						+ '</div>'
						+ '<div class="line-item__meta">'
						+ '<a class="line-item__title link text--strong" href="' + product.product_url + '" onfocusin="this.blur();">' + product.product_title + '</a>'
						+ '<div class="line-item__price-list">'
						+ '<span class="line-item__price">' + (product.approved_by_admin ? '$' + product.product_price : 'Pending price...') + '</span>'
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

			$.fancybox.open('<div class="confirmation-popup" style="max-width: 450px; width: 90%;">' + 
				'<p style="text-align: center;">' + 'Deleted products</p>' +
				html +
				'</div>');
		});

		$(document).on('click', '.confirmation-popup a.restore', function(e) {
			e.preventDefault();
			var productID = $(this).data('productid');
			var variantID = $(this).data('variantid');
			var quoteID = $(this).data('quoteid');
			var $parentRow = $(this).closest('.confirmation-popup');

			//Disable further more button clicks
			disableElement($parentRow);

			$.ajax({

				method:'GET',

				crossDomain: true,

				async: true,

				dataType: 'json',

				url:'https://app.genemco.com/ajaxProductRecover',

				data: {
					productID: productID,
					variantID: variantID,
					quoteID: quoteID
				},

				success: function(response) {
					// console.log(response.success);
					window.quotedProducts = response.success;
					$parentRow.find('button').trigger('click');

					updateGenemcoTable(quoteID);
				}
			});
		});

		$(document).on('click', '#genemco-my-quote-list a.add', function(e) {
			var quoteID = $(this).data('quoteid');
			$.fancybox.open('<div class="genemco-add-popup" style="max-width: 460px; width: 90%;">' +
				'<div class="search-wrapper">' +
				'<svg aria-hidden="true" focusable="false" class="next-icon next-icon--size-20"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z"></path></svg></svg>' +
				'<input type="text" placeholder="Search products" name="genemco_product_search_input">' + 
				'</div>' +
				'</div>'
			);

			var searchTimeout;
			var $parent = $('.genemco-add-popup');

			$(document).on('keyup', 'input[name=genemco_product_search_input]', function(e) {
				var term = $(this).val();

				if (searchTimeout) clearTimeout(searchTimeout);

				searchTimeout = setTimeout(function(){
					jQuery.getJSON("/search/suggest.json", {
					"q": term,
					"resources": {
					"type": "product",
					"limit": 10,
					"options": {
						"unavailable_products": "last",
						"fields": "title,product_type,variants.title,variants.sku"
					}
					}
					}).done(function(response) {

						window.productSuggestionsResult = response.resources.results.products;
						console.log(response.resources.results.products);

						if (window.productSuggestionsResult.length > 0) {
							$($parent).find('#search-result').remove();
							$($parent).find('a.add-selected').remove();

							var resultHtml = '<ul id="search-result" style="padding: 20px 0;">';

							$.each(window.productSuggestionsResult, (index, product) => {
								resultHtml += '<li style="list-style: none; display: flex; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: solid 1px #7777;">' +
											'<input type="checkbox" value="' + index + '" data-productid="' + product.id + '" class="product-checkbox" style="width: 20px; height: 20px;">' +
											'<div class="searched-product" style="display: flex; align-items: center; margin-left: 10px; justify-content: space-between; width: 100%;">' +
											'<div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">' +
											'<span style="width: 30px; height: 30px; background-image: url(' + product.image + '); background-position: center center; background-size: contain; background-repeat: no-repeat; border: solid 1px #ccc; display: block;"></span>' +
											'<p class="product-name" style="margin: 0; padding: 5px; line-height: 1;">' + product.title + '</p>' +
											'</div>' +
											'</div>' +
											'</li>';
							});

							resultHtml += '</ul>';
							resultHtml += '<a class="button button--primary add-selected" style="float: right;" data-quoteid="' + quoteID + '">Add</a>'

							$($parent).append(resultHtml);
						}
					});

					clearTimeout(searchTimeout);
				}, 800);
			});

			$(document).on('click', 'a.add-selected', function(e) {
				var quoteID = $(this).data('quoteid');
				var checkboxes = $(this).closest('.genemco-add-popup').find('#search-result .product-checkbox');
				var selectedItems = Array();
				var $parent = $(this).closest('.genemco-add-popup');

				$.each(checkboxes, (key, checkbox) => {

					if ($(checkbox).prop('checked')) {
						selectedItems.push(window.productSuggestionsResult[key]);
					}

				});

				if ( selectedItems.length > 0 ) {
					console.log(selectedItems);
					//Disable further more button clicks
					disableElement($parent);

					$.ajax({

						method:'POST',

						crossDomain: true,

						async: true,

						dataType: 'json',

						url:'https://app.genemco.com/ajaxAddProductsToExistingQuote',

						data: {
							quoteID: quoteID,
							products: selectedItems
						},

						success: function(response) {
							window.quotedProducts = response.success;
							$parent.find('button').trigger('click');

							updateGenemcoTable(quoteID);
						}
					});
				}

			});
		});
	});

})(jQuery);

/* 
** New version app js
*/
const axios = require('axios');
(function(window, document) {
	window.addEventListener('load', async e => {
		var errorMessages = {
			email: "Enter your email",
			password: "Enter your password",
			phone: "Enter your phone number",
			firstName: "Enter your first name",
			lastName: "Enter your last name",
			companyName: "Enter your company name",
			city: "Enter your city",
			state: "Enter your state",
			country: "Enter your country",
			preferredLanguage: "Enter your preferred language",
			roleInThisProject: "Enter your role in this project",
			projectTimeLine: "Enter your project timeline",
			aboutProjectandRequest: "Enter your project and request"
		}

		var initiateGenemcoFields = function() {
			let genemcoFields = document.querySelectorAll('.genemco-field');
			genemcoFields.forEach(genemcoField => {

				let cookieName = genemcoField.getAttribute('data-cookie');

				genemcoField.addEventListener('change', function(e) {
					if (!genemcoField.checkValidity()) {
						genemcoField.classList.add('highlight');
					} else {
						genemcoField.classList.remove('highlight');
					}
					
					let genemcoFieldValue = genemcoField.value;

					if (Cookies.get(cookieName) != undefined) {
						Cookies.remove(cookieName);
						Cookies.set(cookieName, genemcoFieldValue, { expires: 180 });
					} else {
						Cookies.set(cookieName, genemcoFieldValue, { expires: 180 });
					}
				});

				//Set Genemco field values from cookie
				if (Cookies.get(cookieName) != undefined) {
					let cookieValue = Cookies.get(cookieName);
					Cookies.remove(cookieName);
					Cookies.set(cookieName, cookieValue, { expires: 180 });
					if (cookieValue.length > 0) {
						genemcoField.value = cookieValue;
						genemcoField.dispatchEvent(new Event('change'));
					}
				}

				if (document.getElementById('genemco-logout-customer-checkout') != null) {
					if (Cookies.get('firstName') == undefined || Cookies.get('lastName') == undefined || Cookies.get('companyName') == undefined || Cookies.get('email') == undefined || Cookies.get('phone') == undefined || Cookies.get('city') == undefined || Cookies.get('state') == undefined || Cookies.get('country') == undefined || Cookies.get('preferredLanguage') == undefined) {
						document.querySelector('#genemco-logout-customer-checkout #step1').style.display = "block";
					} else {
						if (Cookies.get('firstName') == '' || Cookies.get('lastName') == '' || Cookies.get('companyName') == '' || Cookies.get('email') == '' || Cookies.get('phone') == '' || Cookies.get('city') == '' || Cookies.get('state') == '' || Cookies.get('country') == '' || Cookies.get('preferredLanguage') == '') {
							document.querySelector('#genemco-logout-customer-checkout #step1').style.display = "block";
						} else {
							document.querySelector('#genemco-logout-customer-checkout #step2').style.display = "block";
							let logoutCheckoutForm = document.getElementById('genemco-logout-customer-checkout__form');
							let guestInfo = {
								firstName: logoutCheckoutForm.querySelector('input[name="first-name"]').value,
								lastName: logoutCheckoutForm.querySelector('input[name="last-name"]').value,
								companyName: logoutCheckoutForm.querySelector('input[name="company-name"]').value,
								email: logoutCheckoutForm.querySelector('input[name="email"]').value,
								phone: logoutCheckoutForm.querySelector('input[name="phone"]').value,
								city: logoutCheckoutForm.querySelector('input[name="city"').value,
								state: logoutCheckoutForm.querySelector('input[name="state"]').value,
								country: logoutCheckoutForm.querySelector('select[name="country"]').value,
								preferredLanguage: logoutCheckoutForm.querySelector('select[name="preferred_language"]').value
							};

							$('#first_name').text(guestInfo.firstName);
							$('#last_name').text(guestInfo.lastName);
							$('#company_name').text(guestInfo.companyName);
							$('#email').text(guestInfo.email);
							$('#phone').text(guestInfo.phone);
							$('#city').text(guestInfo.city);
							$('#state').text(guestInfo.state);
							$('#country').text(guestInfo.country);
							$('#preferred_language').text(guestInfo.preferredLanguage);

							document.querySelectorAll('#genemco-logout-customer-checkout #step2 .genemco-field').forEach(step2Field => {
								step2Field.classList.remove('highlight');
							});
						}
					}
				}
			});
		}

		var validateGenemcoFields = async function(container = null) {
			let genemcoFields = container == null ? document.querySelectorAll('.genemco-field') :  container.querySelectorAll('.genemco-field');
			genemcoFields.forEach(genemcoField => {
				if (!genemcoField.checkValidity()) {
					genemcoField.classList.add('highlight');
				} else {
					genemcoField.classList.remove('highlight');
				}
			});
		}

		var checkDisabled = function(ele) {
			if (ele.classList.contains('disbled')) {
				return true;
			} else {
				return false;
			}
		}

		var getCartItems = async function() {
			return await $.getJSON('/cart.js').then(function(cart) {
				return cart.items;
			});
		};

		var getCategories = function() {
			let categories = {};
			document.querySelectorAll('.cart-item__categories').forEach(category => {
				let productId = category.getAttribute('data-productid');
				let categoryValue = category.innerText.replace(/(\r\n|\n|\r)/gm,"");
				categories[productId] = categoryValue;
			});
			return categories;
		}

		var getUserInfo = async function(email) {
			return await $.ajax({
				method:'POST',
				crossDomain: true,
				async: true,
				dataType: 'json',
				url:'https://app.genemco.com/frontAjax',
				data: {
					action: 'getUserInfo',
					data: {
						email: email
					}
				}
			}).then(function(response) {
				return response.success;
			});
		};

		var getProjectDetails = function() {
			return {
				role_in_this_project: $('#role-in-this-project').val(),
				project_timeline: $('#project-time-line').val(),
				about_project_and_request: $('#about-project-and-request').val()
			}
		}

		var clearCartItems = async function() {
			await $.ajax({
				type: "POST",
				url: "/cart/clear.js",
				data: '',
				dataType: 'json'
			});
		}

		var clearProjectDetailsCookies = async function() {
			if (Cookies.get('roleInThisProject') != undefined) {
				Cookies.remove('roleInThisProject');
			}
			if (Cookies.get('projectTimeLine') != undefined) {
				Cookies.remove('projectTimeLine');
			}
			if (Cookies.get('aboutProjectandRequest') != undefined) {
				Cookies.remove('aboutProjectandRequest');
			}
		}

		var submitQuote = async function(userInfo, items, projectDetails, categories) {
			return await $.ajax({
				method:'POST',
				crossDomain: true,
				async: true,
				dataType: 'json',
				url:'https://app.genemco.com/frontAjax',
				data: {
					action: 'submitQuote',
					data: {
						userInfo: userInfo,
						cartItems: items,
						projectDetails: projectDetails,
						categories: categories
					}
				}
			}).then(function(response) {
				return response.success;
			});
		};

		var submitGuestQuote = async function (guestInfo, items, categories) {
			return await $.ajax({
				method: 'POST',
				crossDomain: true,
				async: true,
				dataType: 'json',
				url: 'https://app.genemco.com/frontAjax',
				data: {
					action: 'submitGuestQuote',
					data: {
						guestInfo: guestInfo,
						items: items,
						categories: categories
					}
				}
			}).then(function(response) {
				return response.success;
			});
		}

		// loggedin customer checkout
		var loginCustomerCheckout = document.getElementById('genemco-login-customer-checkout');
		if (loginCustomerCheckout != null) {
			let userInfo = await getUserInfo(window.customerEmail);
			console.log(userInfo);
			let contactDetails = $('.genemco-checkout__contact .genemco-checkout__text');
			contactDetails.each((index, element) => {
				$(element).text($(element).text().replace("%{first_name}%", userInfo.first_name));
				$(element).text($(element).text().replace("%{last_name}%", userInfo.last_name));
				$(element).text($(element).text().replace("%{company_name}%", userInfo.company_name));
				$(element).text($(element).text().replace("%{email}%", userInfo.email));
				$(element).text($(element).text().replace("%{phone}%", userInfo.phone));
				$(element).text($(element).text().replace("%{city}%", userInfo.city));
				$(element).text($(element).text().replace("%{state}%", userInfo.state));
				$(element).text($(element).text().replace("%{country}%", userInfo.country));
				$(element).text($(element).text().replace("%{preferred_language}%", userInfo.preferred_language));
			});

			document.querySelector('#genemco-login-customer-checkout #genemco-login-customer-info').style.display = 'block';

			let cartItems = await getCartItems();
			let projectDetails = getProjectDetails();
			let categories = getCategories();

			$('#genemco-login-customer-checkout .genemco-checkout__button').on('click', async function(e) {
				e.preventDefault();
				if ($(this).hasClass('disabled')) {
					return;
				}
				$(this).addClass('disabled');
				userInfo.roleInThisProject = document.getElementById('role-in-this-project').value;
				userInfo.projectTimeline = document.getElementById('project-time-line').value;
				userInfo.aboutYourProject = document.getElementById('about-project-and-request').value;

				if (userInfo.roleInThisProject.length > 0 && userInfo.projectTimeline.length > 0 && userInfo.aboutYourProject.length > 0) {
					$('.error-message').text('');
					let submitQuoteResponse = await submitQuote(userInfo, cartItems, projectDetails, categories);
					console.log(submitQuoteResponse);
					await clearCartItems();
					await clearProjectDetailsCookies();
					// window.location.reload();
					let productsHTML = '';
					cartItems.forEach(cartItem => {
						productsHTML += `
						<div class="genemco-checkout__cart-item">
							<div class="cart-item__left">
								<img src="${cartItem.image}">
							</div>
							<div class="cart-item__right">
								<p class="cart-item__sku">${cartItem.sku}</p>
								<p class="cart-item__title"><strong>${cartItem.title}</strong></p>
								<p class="cart-item__desc">${cartItem.product_description}</p>
							</div>
						</div>
						`;
					});
					let logInThankYouPageHTML = `
					<div class="logout-thankyou-page">
						<div class="genemco-checkout__container">
							<div class="genemco-checkout__row">
								<h2 class="genemco-checkout__heading" style="color: #00aa00;"><strong>Thank you, your quote has been sent!</strong></h2>
								<br>
								<p class="genemco-checkout__text">We will quickly email/call you to discuss your quote. You may also call us at <a href="tel:979-268-7447">979-268-7447</a>.</p>
								<p class="genemco-checkout__text">Please check your email for quote confirmation and additional information.</p>
								<div class="genemco-checkout__review-items genemco-checkout__row">
									<h2 class="genemco-checkout__heading"><strong>Quote Number:</strong> ${submitQuoteResponse.quoteID}</h2>
									<a href="/pages/quotes-history" style="color: #0000a0; font-weight: bold; display: inline-block; margin-bottom: 30px;">Review or Edit your Quote ></a>
									${productsHTML}
								</div>
							</div>
						</div>
					</div>
					`;

					let emptyCartHTML = `
					<a class="header__action-item-link header__cart-toggle" href="/cart" aria-controls="mini-cart" aria-expanded="false" data-action="toggle-mini-cart" data-no-instant="">
  						<div class="header__action-item-content">
    						<div class="header__cart-icon icon-state" aria-expanded="false">
      							<span class="icon-state__primary">
      								<svg class="icon icon--cart" viewBox="0 0 27 24" role="presentation">
								      <g transform="translate(0 1)" stroke-width="2" stroke="currentColor" fill="none" fill-rule="evenodd">
								        <circle stroke-linecap="square" cx="11" cy="20" r="2"></circle>
								        <circle stroke-linecap="square" cx="22" cy="20" r="2"></circle>
								        <path d="M7.31 5h18.27l-1.44 10H9.78L6.22 0H0"></path>
								      </g>
								    </svg>
									<span class="header__cart-count">0</span>
      							</span>
          						<span class="icon-state__secondary">
          							<svg class="icon icon--close" viewBox="0 0 19 19" role="presentation">
								      <path d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z" fill="currentColor" fill-rule="evenodd"></path>
								    </svg>
								</span>
    						</div>
    						<span class="hidden-pocket hidden-lap">My Quote</span>
  						</div>
					</a>
					<form method="post" action="/cart" id="mini-cart" class="mini-cart" aria-hidden="true" novalidate="novalidate" data-item-count="0" tabindex="-1">
					  <input type="hidden" name="attributes[collection_products_per_page]" value="">
					  <input type="hidden" name="attributes[collection_layout]" value=""><svg class="icon icon--nav-triangle-borderless" viewBox="0 0 20 9" role="presentation">
					      <path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z" fill="#ffffff"></path>
					    </svg><div class="mini-cart__content mini-cart__content--empty"><div class="alert alert--tight alert--center text--strong">
					          <a href="/pages/purchase-and-shipping-process">Click here to learn about our easy purcase and shipping process</a>
					        </div>

					      <div class="mini-cart__empty-state"><svg width="81" height="70" viewBox="0 0 81 70">
					      <g transform="translate(0 2)" stroke-width="4" stroke="#232f3e" fill="none" fill-rule="evenodd">
					        <circle stroke-linecap="square" cx="34" cy="60" r="6"></circle>
					        <circle stroke-linecap="square" cx="67" cy="60" r="6"></circle>
					        <path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path>
					      </g>
					    </svg><p class="heading h4">Your quote cart is empty</p>
					      </div>

					      <a href="/collections/all" class="button button--primary button--full">Shop our products</a></div>
					</form>`;

					document.querySelector('#genemco-login-customer-checkout').innerHTML = logInThankYouPageHTML;
					document.querySelector('.header__action-item--cart').innerHTML = emptyCartHTML;
					document.querySelector('#shopify-section-header').style.display = "block";
					document.querySelector('#shopify-section-static-newsletter').style.display = "block";
					document.querySelector('#shopify-section-text-with-icons').style.display = "block";
					document.querySelector('#shopify-section-footer').style.display = "block";
					window.scrollTo(0, 0);
				} else {
					// Validation
					await validateGenemcoFields();

					// Show default error message
					let hightLightedCheckoutFields = document.querySelectorAll('.genemco-field.highlight');
					if (hightLightedCheckoutFields.length > 0) {
						hightLightedCheckoutFields.forEach(genemcoField => {
							genemcoField.reportValidity();
						});
					}

					$('.error-message').text('Enter all required information');
				}
			});

			$('#genemco-login-customer-checkout #genemco-checkout__contact-detail__change').on('click', function(e) {
				const editCustomerDetailsPopup = new Fancybox([{
					src: `<div class="edit-customer-details-popup">
						<h2>Edit Contact Details</h2>
						<form>
							<div>
								<div><label>First Name</label><input type="text" name="first-name" placeholder="First Name" value="${userInfo.first_name}"></div>
								<div><label>Last Name</label><input type="text" name="last-name" placeholder="Last Name" value="${userInfo.last_name}"></div>
								<div><label>Company Name</label><input type="text" name="company-name" placeholder="Company Name" value="${userInfo.company_name}"></div>
								<div><label>Phone</label><input type="text" name="phone" placeholder="Phone" value="${userInfo.phone}"></div>
								<div><label>City</label><input type="text" name="city" placeholder="City" value="${userInfo.city}"></div>
								<div><label>State</label><input type="text" name="state" placeholder="State" value="${userInfo.state}"></div>
								<div>
								<label>Country</label>
								<select name="country" value="${userInfo.country}">
									<option>Select your Country</option>
									<option value="United States of America" ${ userInfo.country == "United States of America" ? "selected" : '' }>United States of America</option>
									<option value="Canada" ${ userInfo.country == "Canada" ? "selected" : '' }>Canada</option>
									<option value="Mexico" ${ userInfo.country == "Mexico" ? "selected" : '' }>Mexico</option>
									<option disabled>---</option>
									<option value="Afganistan" ${ userInfo.country == "Afganistan" ? "selected" : '' }>Afghanistan</option>
									<option value="Albania" ${ userInfo.country == "Albania" ? "selected" : '' }>Albania</option>
									<option value="Algeria" ${ userInfo.country == "Algeria" ? "selected" : '' }>Algeria</option>
									<option value="American Samoa" ${ userInfo.country == "American Samoa" ? "selected" : '' }>American Samoa</option>
									<option value="Andorra" ${ userInfo.country == "Andorra" ? "selected" : '' }>Andorra</option>
									<option value="Angola" ${ userInfo.country == "Angola" ? "selected" : '' }>Angola</option>
									<option value="Anguilla" ${ userInfo.country == "Anguilla" ? "selected" : '' }>Anguilla</option>
									<option value="Antigua & Barbuda" ${ userInfo.country == "Antigua & Barbuda" ? "selected" : '' }>Antigua & Barbuda</option>
									<option value="Argentina" ${ userInfo.country == "Argentina" ? "selected" : '' }>Argentina</option>
									<option value="Armenia" ${ userInfo.country == "Armenia" ? "selected" : '' }>Armenia</option>
									<option value="Aruba" ${ userInfo.country == "Aruba" ? "selected" : '' }>Aruba</option>
									<option value="Australia" ${ userInfo.country == "Australia" ? "selected" : '' }>Australia</option>
									<option value="Austria" ${ userInfo.country == "Austria" ? "selected" : '' }>Austria</option>
									<option value="Azerbaijan" ${ userInfo.country == "Azerbaijan" ? "selected" : '' }>Azerbaijan</option>
									<option value="Bahamas" ${ userInfo.country == "Bahamas" ? "selected" : '' }>Bahamas</option>
									<option value="Bahrain" ${ userInfo.country == "Bahrain" ? "selected" : '' }>Bahrain</option>
									<option value="Bangladesh" ${ userInfo.country == "Bangladesh" ? "selected" : '' }>Bangladesh</option>
									<option value="Barbados" ${ userInfo.country == "Barbados" ? "selected" : '' }>Barbados</option>
									<option value="Belarus" ${ userInfo.country == "Belarus" ? "selected" : '' }>Belarus</option>
									<option value="Belgium" ${ userInfo.country == "Belgium" ? "selected" : '' }>Belgium</option>
									<option value="Belize" ${ userInfo.country == "Belize" ? "selected" : '' }>Belize</option>
									<option value="Benin" ${ userInfo.country == "Benin" ? "selected" : '' }>Benin</option>
									<option value="Bermuda" ${ userInfo.country == "Bermuda" ? "selected" : '' }>Bermuda</option>
									<option value="Bhutan" ${ userInfo.country == "Bhutan" ? "selected" : '' }>Bhutan</option>
									<option value="Bolivia" ${ userInfo.country == "Bolivia" ? "selected" : '' }>Bolivia</option>
									<option value="Bonaire" ${ userInfo.country == "Bonaire" ? "selected" : '' }>Bonaire</option>
									<option value="Bosnia & Herzegovina" ${ userInfo.country == "Bosnia & Herzegovina" ? "selected" : '' }>Bosnia & Herzegovina</option>
									<option value="Botswana" ${ userInfo.country == "Botswana" ? "selected" : '' }>Botswana</option>
									<option value="Brazil" ${ userInfo.country == "Brazil" ? "selected" : '' }>Brazil</option>
									<option value="British Indian Ocean Ter" ${ userInfo.country == "British Indian Ocean Ter" ? "selected" : '' }>British Indian Ocean Ter</option>
									<option value="Brunei" ${ userInfo.country == "Brunei" ? "selected" : '' }>Brunei</option>
									<option value="Bulgaria" ${ userInfo.country == "Bulgaria" ? "selected" : '' }>Bulgaria</option>
									<option value="Burkina Faso" ${ userInfo.country == "Burkina Faso" ? "selected" : '' }>Burkina Faso</option>
									<option value="Burundi" ${ userInfo.country == "Burundi" ? "selected" : '' }>Burundi</option>
									<option value="Cambodia" ${ userInfo.country == "Cambodia" ? "selected" : '' }>Cambodia</option>
									<option value="Cameroon" ${ userInfo.country == "Cameroon" ? "selected" : '' }>Cameroon</option>
									<option value="Canary Islands" ${ userInfo.country == "Canary Islands" ? "selected" : '' }>Canary Islands</option>
									<option value="Cape Verde" ${ userInfo.country == "Cape Verde" ? "selected" : '' }>Cape Verde</option>
									<option value="Cayman Islands" ${ userInfo.country == "Cayman Islands" ? "selected" : '' }>Cayman Islands</option>
									<option value="Central African Republic" ${ userInfo.country == "Central African Republic" ? "selected" : '' }>Central African Republic</option>
									<option value="Chad" ${ userInfo.country == "Chad" ? "selected" : '' }>Chad</option>
									<option value="Channel Islands" ${ userInfo.country == "Channel Islands" ? "selected" : '' }>Channel Islands</option>
									<option value="Chile" ${ userInfo.country == "Chile" ? "selected" : '' }>Chile</option>
									<option value="China" ${ userInfo.country == "China" ? "selected" : '' }>China</option>
									<option value="Christmas Island" ${ userInfo.country == "Christmas Island" ? "selected" : '' }>Christmas Island</option>
									<option value="Cocos Island" ${ userInfo.country == "Cocos Island" ? "selected" : '' }>Cocos Island</option>
									<option value="Colombia" ${ userInfo.country == "Colombia" ? "selected" : '' }>Colombia</option>
									<option value="Comoros" ${ userInfo.country == "Comoros" ? "selected" : '' }>Comoros</option>
									<option value="Congo" ${ userInfo.country == "Congo" ? "selected" : '' }>Congo</option>
									<option value="Cook Islands" ${ userInfo.country == "Cook Islands" ? "selected" : '' }>Cook Islands</option>
									<option value="Costa Rica" ${ userInfo.country == "Costa Rica" ? "selected" : '' }>Costa Rica</option>
									<option value="Cote DIvoire" ${ userInfo.country == "Cote DIvoire" ? "selected" : '' }>Cote DIvoire</option>
									<option value="Croatia" ${ userInfo.country == "Croatia" ? "selected" : '' }>Croatia</option>
									<option value="Cuba" ${ userInfo.country == "Cuba" ? "selected" : '' }>Cuba</option>
									<option value="Curaco" ${ userInfo.country == "Curaco" ? "selected" : '' }>Curacao</option>
									<option value="Cyprus" ${ userInfo.country == "Cyprus" ? "selected" : '' }>Cyprus</option>
									<option value="Czech Republic" ${ userInfo.country == "Czech Republic" ? "selected" : '' }>Czech Republic</option>
									<option value="Denmark" ${ userInfo.country == "Denmark" ? "selected" : '' }>Denmark</option>
									<option value="Djibouti" ${ userInfo.country == "Djibouti" ? "selected" : '' }>Djibouti</option>
									<option value="Dominica" ${ userInfo.country == "Dominica" ? "selected" : '' }>Dominica</option>
									<option value="Dominican Republic" ${ userInfo.country == "Dominican Republic" ? "selected" : '' }>Dominican Republic</option>
									<option value="East Timor" ${ userInfo.country == "East Timor" ? "selected" : '' }>East Timor</option>
									<option value="Ecuador" ${ userInfo.country == "Ecuador" ? "selected" : '' }>Ecuador</option>
									<option value="Egypt" ${ userInfo.country == "Egypt" ? "selected" : '' }>Egypt</option>
									<option value="El Salvador" ${ userInfo.country == "El Salvador" ? "selected" : '' }>El Salvador</option>
									<option value="Equatorial Guinea" ${ userInfo.country == "Equatorial Guinea" ? "selected" : '' }>Equatorial Guinea</option>
									<option value="Eritrea" ${ userInfo.country == "Eritrea" ? "selected" : '' }>Eritrea</option>
									<option value="Estonia" ${ userInfo.country == "Estonia" ? "selected" : '' }>Estonia</option>
									<option value="Ethiopia" ${ userInfo.country == "Ethiopia" ? "selected" : '' }>Ethiopia</option>
									<option value="Falkland Islands" ${ userInfo.country == "Falkland Islands" ? "selected" : '' }>Falkland Islands</option>
									<option value="Faroe Islands" ${ userInfo.country == "Faroe Islands" ? "selected" : '' }>Faroe Islands</option>
									<option value="Fiji" ${ userInfo.country == "Fiji" ? "selected" : '' }>Fiji</option>
									<option value="Finland" ${ userInfo.country == "Finland" ? "selected" : '' }>Finland</option>
									<option value="France" ${ userInfo.country == "France" ? "selected" : '' }>France</option>
									<option value="French Guiana" ${ userInfo.country == "French Guiana" ? "selected" : '' }>French Guiana</option>
									<option value="French Polynesia" ${ userInfo.country == "French Polynesia" ? "selected" : '' }>French Polynesia</option>
									<option value="French Southern Ter" ${ userInfo.country == "French Southern Ter" ? "selected" : '' }>French Southern Ter</option>
									<option value="Gabon" ${ userInfo.country == "Gabon" ? "selected" : '' }>Gabon</option>
									<option value="Gambia" ${ userInfo.country == "Gambia" ? "selected" : '' }>Gambia</option>
									<option value="Georgia" ${ userInfo.country == "Georgia" ? "selected" : '' }>Georgia</option>
									<option value="Germany" ${ userInfo.country == "Germany" ? "selected" : '' }>Germany</option>
									<option value="Ghana" ${ userInfo.country == "Ghana" ? "selected" : '' }>Ghana</option>
									<option value="Gibraltar" ${ userInfo.country == "Gibraltar" ? "selected" : '' }>Gibraltar</option>
									<option value="Great Britain" ${ userInfo.country == "Great Britain" ? "selected" : '' }>Great Britain</option>
									<option value="Greece" ${ userInfo.country == "Greece" ? "selected" : '' }>Greece</option>
									<option value="Greenland" ${ userInfo.country == "Greenland" ? "selected" : '' }>Greenland</option>
									<option value="Grenada" ${ userInfo.country == "Grenada" ? "selected" : '' }>Grenada</option>
									<option value="Guadeloupe" ${ userInfo.country == "Guadeloupe" ? "selected" : '' }>Guadeloupe</option>
									<option value="Guam" ${ userInfo.country == "Guam" ? "selected" : '' }>Guam</option>
									<option value="Guatemala" ${ userInfo.country == "Guatemala" ? "selected" : '' }>Guatemala</option>
									<option value="Guinea" ${ userInfo.country == "Guinea" ? "selected" : '' }>Guinea</option>
									<option value="Guyana" ${ userInfo.country == "Guyana" ? "selected" : '' }>Guyana</option>
									<option value="Haiti" ${ userInfo.country == "Haiti" ? "selected" : '' }>Haiti</option>
									<option value="Hawaii" ${ userInfo.country == "Hawaii" ? "selected" : '' }>Hawaii</option>
									<option value="Honduras" ${ userInfo.country == "Honduras" ? "selected" : '' }>Honduras</option>
									<option value="Hong Kong" ${ userInfo.country == "Hong Kong" ? "selected" : '' }>Hong Kong</option>
									<option value="Hungary" ${ userInfo.country == "Hungary" ? "selected" : '' }>Hungary</option>
									<option value="Iceland" ${ userInfo.country == "Iceland" ? "selected" : '' }>Iceland</option>
									<option value="Indonesia" ${ userInfo.country == "Indonesia" ? "selected" : '' }>Indonesia</option>
									<option value="India" ${ userInfo.country == "India" ? "selected" : '' }>India</option>
									<option value="Iran" ${ userInfo.country == "Iran" ? "selected" : '' }>Iran</option>
									<option value="Iraq" ${ userInfo.country == "Iraq" ? "selected" : '' }>Iraq</option>
									<option value="Ireland" ${ userInfo.country == "Ireland" ? "selected" : '' }>Ireland</option>
									<option value="Isle of Man" ${ userInfo.country == "Isle of Man" ? "selected" : '' }>Isle of Man</option>
									<option value="Israel" ${ userInfo.country == "Israel" ? "selected" : '' }>Israel</option>
									<option value="Italy" ${ userInfo.country == "Italy" ? "selected" : '' }>Italy</option>
									<option value="Jamaica" ${ userInfo.country == "Jamaica" ? "selected" : '' }>Jamaica</option>
									<option value="Japan" ${ userInfo.country == "Japan" ? "selected" : '' }>Japan</option>
									<option value="Jordan" ${ userInfo.country == "Jordan" ? "selected" : '' }>Jordan</option>
									<option value="Kazakhstan" ${ userInfo.country == "Kazakhstan" ? "selected" : '' }>Kazakhstan</option>
									<option value="Kenya" ${ userInfo.country == "Kenya" ? "selected" : '' }>Kenya</option>
									<option value="Kiribati" ${ userInfo.country == "Kiribati" ? "selected" : '' }>Kiribati</option>
									<option value="Korea North" ${ userInfo.country == "Korea North" ? "selected" : '' }>Korea North</option>
									<option value="Korea South" ${ userInfo.country == "Korea South" ? "selected" : '' }>Korea South</option>
									<option value="Kuwait" ${ userInfo.country == "Kuwait" ? "selected" : '' }>Kuwait</option>
									<option value="Kyrgyzstan" ${ userInfo.country == "Kyrgyzstan" ? "selected" : '' }>Kyrgyzstan</option>
									<option value="Laos" ${ userInfo.country == "Laos" ? "selected" : '' }>Laos</option>
									<option value="Latvia" ${ userInfo.country == "Latvia" ? "selected" : '' }>Latvia</option>
									<option value="Lebanon" ${ userInfo.country == "Lebanon" ? "selected" : '' }>Lebanon</option>
									<option value="Lesotho" ${ userInfo.country == "Lesotho" ? "selected" : '' }>Lesotho</option>
									<option value="Liberia" ${ userInfo.country == "Liberia" ? "selected" : '' }>Liberia</option>
									<option value="Libya" ${ userInfo.country == "Libya" ? "selected" : '' }>Libya</option>
									<option value="Liechtenstein" ${ userInfo.country == "Liechtenstein" ? "selected" : '' }>Liechtenstein</option>
									<option value="Lithuania" ${ userInfo.country == "Lithuania" ? "selected" : '' }>Lithuania</option>
									<option value="Luxembourg" ${ userInfo.country == "Luxembourg" ? "selected" : '' }>Luxembourg</option>
									<option value="Macau" ${ userInfo.country == "Macau" ? "selected" : '' }>Macau</option>
									<option value="Macedonia" ${ userInfo.country == "Macedonia" ? "selected" : '' }>Macedonia</option>
									<option value="Madagascar" ${ userInfo.country == "Madagascar" ? "selected" : '' }>Madagascar</option>
									<option value="Malaysia" ${ userInfo.country == "Malaysia" ? "selected" : '' }>Malaysia</option>
									<option value="Malawi" ${ userInfo.country == "Malawi" ? "selected" : '' }>Malawi</option>
									<option value="Maldives" ${ userInfo.country == "Maldives" ? "selected" : '' }>Maldives</option>
									<option value="Mali" ${ userInfo.country == "Mali" ? "selected" : '' }>Mali</option>
									<option value="Malta" ${ userInfo.country == "Malta" ? "selected" : '' }>Malta</option>
									<option value="Marshall Islands" ${ userInfo.country == "Marshall Islands" ? "selected" : '' }>Marshall Islands</option>
									<option value="Martinique" ${ userInfo.country == "Martinique" ? "selected" : '' }>Martinique</option>
									<option value="Mauritania" ${ userInfo.country == "Mauritania" ? "selected" : '' }>Mauritania</option>
									<option value="Mauritius" ${ userInfo.country == "Mauritius" ? "selected" : '' }>Mauritius</option>
									<option value="Mayotte" ${ userInfo.country == "Mayotte" ? "selected" : '' }>Mayotte</option>
									<option value="Midway Islands" ${ userInfo.country == "Midway Islands" ? "selected" : '' }>Midway Islands</option>
									<option value="Moldova" ${ userInfo.country == "Moldova" ? "selected" : '' }>Moldova</option>
									<option value="Monaco" ${ userInfo.country == "Monaco" ? "selected" : '' }>Monaco</option>
									<option value="Mongolia" ${ userInfo.country == "Mongolia" ? "selected" : '' }>Mongolia</option>
									<option value="Montserrat" ${ userInfo.country == "Montserrat" ? "selected" : '' }>Montserrat</option>
									<option value="Morocco" ${ userInfo.country == "Morocco" ? "selected" : '' }>Morocco</option>
									<option value="Mozambique" ${ userInfo.country == "Mozambique" ? "selected" : '' }>Mozambique</option>
									<option value="Myanmar" ${ userInfo.country == "Myanmar" ? "selected" : '' }>Myanmar</option>
									<option value="Nambia" ${ userInfo.country == "Nambia" ? "selected" : '' }>Nambia</option>
									<option value="Nauru" ${ userInfo.country == "Nauru" ? "selected" : '' }>Nauru</option>
									<option value="Nepal" ${ userInfo.country == "Nepal" ? "selected" : '' }>Nepal</option>
									<option value="Netherland Antilles" ${ userInfo.country == "Netherland Antilles" ? "selected" : '' }>Netherland Antilles</option>
									<option value="Netherlands" ${ userInfo.country == "Netherlands" ? "selected" : '' }>Netherlands (Holland, Europe)</option>
									<option value="Nevis" ${ userInfo.country == "Nevis" ? "selected" : '' }>Nevis</option>
									<option value="New Caledonia" ${ userInfo.country == "New Caledonia" ? "selected" : '' }>New Caledonia</option>
									<option value="New Zealand" ${ userInfo.country == "New Zealand" ? "selected" : '' }>New Zealand</option>
									<option value="Nicaragua" ${ userInfo.country == "Nicaragua" ? "selected" : '' }>Nicaragua</option>
									<option value="Niger" ${ userInfo.country == "Niger" ? "selected" : '' }>Niger</option>
									<option value="Nigeria" ${ userInfo.country == "Nigeria" ? "selected" : '' }>Nigeria</option>
									<option value="Niue" ${ userInfo.country == "Niue" ? "selected" : '' }>Niue</option>
									<option value="Norfolk Island" ${ userInfo.country == "Norfolk Island" ? "selected" : '' }>Norfolk Island</option>
									<option value="Norway" ${ userInfo.country == "Norway" ? "selected" : '' }>Norway</option>
									<option value="Oman" ${ userInfo.country == "Oman" ? "selected" : '' }>Oman</option>
									<option value="Pakistan" ${ userInfo.country == "Pakistan" ? "selected" : '' }>Pakistan</option>
									<option value="Palau Island" ${ userInfo.country == "Palau Island" ? "selected" : '' }>Palau Island</option>
									<option value="Papua New Guinea" ${ userInfo.country == "Papua New Guinea" ? "selected" : '' }>Papua New Guinea</option>
									<option value="Paraguay" ${ userInfo.country == "Paraguay" ? "selected" : '' }>Paraguay</option>
									<option value="Peru" ${ userInfo.country == "Peru" ? "selected" : '' }>Peru</option>
									<option value="Phillipines" ${ userInfo.country == "Phillipines" ? "selected" : '' }>Philippines</option>
									<option value="Pitcairn Island" ${ userInfo.country == "Pitcairn Island" ? "selected" : '' }>Pitcairn Island</option>
									<option value="Poland" ${ userInfo.country == "Poland" ? "selected" : '' }>Poland</option>
									<option value="Portugal" ${ userInfo.country == "Portugal" ? "selected" : '' }>Portugal</option>
									<option value="Puerto Rico" ${ userInfo.country == "Puerto Rico" ? "selected" : '' }>Puerto Rico</option>
									<option value="Qatar" ${ userInfo.country == "Qatar" ? "selected" : '' }>Qatar</option>
									<option value="Republic of Montenegro" ${ userInfo.country == "Republic of Montenegro" ? "selected" : '' }>Republic of Montenegro</option>
									<option value="Republic of Serbia" ${ userInfo.country == "Republic of Serbia" ? "selected" : '' }>Republic of Serbia</option>
									<option value="Reunion" ${ userInfo.country == "Reunion" ? "selected" : '' }>Reunion</option>
									<option value="Romania" ${ userInfo.country == "Romania" ? "selected" : '' }>Romania</option>
									<option value="Russia" ${ userInfo.country == "Russia" ? "selected" : '' }>Russia</option>
									<option value="Rwanda" ${ userInfo.country == "Rwanda" ? "selected" : '' }>Rwanda</option>
									<option value="St Barthelemy" ${ userInfo.country == "St Barthelemy" ? "selected" : '' }>St Barthelemy</option>
									<option value="St Eustatius" ${ userInfo.country == "St Eustatius" ? "selected" : '' }>St Eustatius</option>
									<option value="St Helena" ${ userInfo.country == "St Helena" ? "selected" : '' }>St Helena</option>
									<option value="St Kitts-Nevis" ${ userInfo.country == "St Kitts-Nevis" ? "selected" : '' }>St Kitts-Nevis</option>
									<option value="St Lucia" ${ userInfo.country == "St Lucia" ? "selected" : '' }>St Lucia</option>
									<option value="St Maarten" ${ userInfo.country == "St Maarten" ? "selected" : '' }>St Maarten</option>
									<option value="St Pierre & Miquelon" ${ userInfo.country == "St Pierre & Miquelon" ? "selected" : '' }>St Pierre & Miquelon</option>
									<option value="St Vincent & Grenadines" ${ userInfo.country == "St Vincent & Grenadines" ? "selected" : '' }>St Vincent & Grenadines</option>
									<option value="Saipan" ${ userInfo.country == "Saipan" ? "selected" : '' }>Saipan</option>
									<option value="Samoa" ${ userInfo.country == "Samoa" ? "selected" : '' }>Samoa</option>
									<option value="Samoa American" ${ userInfo.country == "Samoa American" ? "selected" : '' }>Samoa American</option>
									<option value="San Marino" ${ userInfo.country == "San Marino" ? "selected" : '' }>San Marino</option>
									<option value="Sao Tome & Principe" ${ userInfo.country == "Sao Tome & Principe" ? "selected" : '' }>Sao Tome & Principe</option>
									<option value="Saudi Arabia" ${ userInfo.country == "Saudi Arabia" ? "selected" : '' }>Saudi Arabia</option>
									<option value="Senegal" ${ userInfo.country == "Senegal" ? "selected" : '' }>Senegal</option>
									<option value="Seychelles" ${ userInfo.country == "Seychelles" ? "selected" : '' }>Seychelles</option>
									<option value="Sierra Leone" ${ userInfo.country == "Sierra Leone" ? "selected" : '' }>Sierra Leone</option>
									<option value="Singapore" ${ userInfo.country == "Singapore" ? "selected" : '' }>Singapore</option>
									<option value="Slovakia" ${ userInfo.country == "Slovakia" ? "selected" : '' }>Slovakia</option>
									<option value="Slovenia" ${ userInfo.country == "Slovenia" ? "selected" : '' }>Slovenia</option>
									<option value="Solomon Islands" ${ userInfo.country == "Solomon Islands" ? "selected" : '' }>Solomon Islands</option>
									<option value="Somalia" ${ userInfo.country == "Somalia" ? "selected" : '' }>Somalia</option>
									<option value="South Africa" ${ userInfo.country == "South Africa" ? "selected" : '' }>South Africa</option>
									<option value="Spain" ${ userInfo.country == "Spain" ? "selected" : '' }>Spain</option>
									<option value="Sri Lanka" ${ userInfo.country == "Sri Lanka" ? "selected" : '' }>Sri Lanka</option>
									<option value="Sudan" ${ userInfo.country == "Sudan" ? "selected" : '' }>Sudan</option>
									<option value="Suriname" ${ userInfo.country == "Suriname" ? "selected" : '' }>Suriname</option>
									<option value="Swaziland" ${ userInfo.country == "Swaziland" ? "selected" : '' }>Swaziland</option>
									<option value="Sweden" ${ userInfo.country == "Sweden" ? "selected" : '' }>Sweden</option>
									<option value="Switzerland" ${ userInfo.country == "Switzerland" ? "selected" : '' }>Switzerland</option>
									<option value="Syria" ${ userInfo.country == "Syria" ? "selected" : '' }>Syria</option>
									<option value="Tahiti" ${ userInfo.country == "Tahiti" ? "selected" : '' }>Tahiti</option>
									<option value="Taiwan" ${ userInfo.country == "Taiwan" ? "selected" : '' }>Taiwan</option>
									<option value="Tajikistan" ${ userInfo.country == "Tajikistan" ? "selected" : '' }>Tajikistan</option>
									<option value="Tanzania" ${ userInfo.country == "Tanzania" ? "selected" : '' }>Tanzania</option>
									<option value="Thailand" ${ userInfo.country == "Thailand" ? "selected" : '' }>Thailand</option>
									<option value="Togo" ${ userInfo.country == "Togo" ? "selected" : '' }>Togo</option>
									<option value="Tokelau" ${ userInfo.country == "Tokelau" ? "selected" : '' }>Tokelau</option>
									<option value="Tonga" ${ userInfo.country == "Tonga" ? "selected" : '' }>Tonga</option>
									<option value="Trinidad & Tobago" ${ userInfo.country == "Trinidad & Tobago" ? "selected" : '' }>Trinidad & Tobago</option>
									<option value="Tunisia" ${ userInfo.country == "Tunisia" ? "selected" : '' }>Tunisia</option>
									<option value="Turkey" ${ userInfo.country == "Turkey" ? "selected" : '' }>Turkey</option>
									<option value="Turkmenistan" ${ userInfo.country == "Turkmenistan" ? "selected" : '' }>Turkmenistan</option>
									<option value="Turks & Caicos Is" ${ userInfo.country == "Turks & Caicos Is" ? "selected" : '' }>Turks & Caicos Is</option>
									<option value="Tuvalu" ${ userInfo.country == "Tuvalu" ? "selected" : '' }>Tuvalu</option>
									<option value="Uganda" ${ userInfo.country == "Uganda" ? "selected" : '' }>Uganda</option>
									<option value="United Kingdom" ${ userInfo.country == "United Kingdom" ? "selected" : '' }>United Kingdom</option>
									<option value="Ukraine" ${ userInfo.country == "Ukraine" ? "selected" : '' }>Ukraine</option>
									<option value="United Arab Erimates" ${ userInfo.country == "United Arab Erimates" ? "selected" : '' }>United Arab Emirates</option>
									<option value="Uraguay" ${ userInfo.country == "Uraguay" ? "selected" : '' }>Uruguay</option>
									<option value="Uzbekistan" ${ userInfo.country == "Uzbekistan" ? "selected" : '' }>Uzbekistan</option>
									<option value="Vanuatu" ${ userInfo.country == "Vanuatu" ? "selected" : '' }>Vanuatu</option>
									<option value="Vatican City State" ${ userInfo.country == "Vatican City State" ? "selected" : '' }>Vatican City State</option>
									<option value="Venezuela" ${ userInfo.country == "Venezuela" ? "selected" : '' }>Venezuela</option>
									<option value="Vietnam" ${ userInfo.country == "Vietnam" ? "selected" : '' }>Vietnam</option>
									<option value="Virgin Islands (Brit)" ${ userInfo.country == "Virgin Islands (Brit)" ? "selected" : '' }>Virgin Islands (Brit)</option>
									<option value="Virgin Islands (USA)" ${ userInfo.country == "Virgin Islands (USA)" ? "selected" : '' }>Virgin Islands (USA)</option>
									<option value="Wake Island" ${ userInfo.country == "Wake Island" ? "selected" : '' }>Wake Island</option>
									<option value="Wallis & Futana Is" ${ userInfo.country == "Wallis & Futana Is" ? "selected" : '' }>Wallis & Futana Is</option>
									<option value="Yemen" ${ userInfo.country == "Yemen" ? "selected" : '' }>Yemen</option>
									<option value="Zaire" ${ userInfo.country == "Zaire" ? "selected" : '' }>Zaire</option>
									<option value="Zambia" ${ userInfo.country == "Zambia" ? "selected" : '' }>Zambia</option>
									<option value="Zimbabwe" ${ userInfo.country == "Zimbabwe" ? "selected" : '' }>Zimbabwe</option>
								</select>
								</div>
								<div>
									<label>Preferred language</label>
									<select name="preferred_language" value="${userInfo.preferred_language}">
										<option value="">Preferred language</option>
										<option value="English" ${ userInfo.preferred_language == "English" ? "selected" : '' }>English</option>
										<option value="Spanish" ${ userInfo.preferred_language == "Spanish" ? "selected" : '' }>Spanish</option>
										<option value="Other" ${ userInfo.preferred_language == "Other" ? "selected" : '' }>Other</option>
									</select>
								</div>
							</div>
							<p class="message" style="margin: 20px 0;"></p>
							<a class="button">Save</a>
						</form>
					</div>`,
					type: "html"
				}]);

				$(document).on('click', '.edit-customer-details-popup a.button', function(e) {
					if ($(this).hasClass('disabled')) {
						return;
					}

					let $form = $('.edit-customer-details-popup');
					let $this = $(this);
					let newUserInfo = {};
					newUserInfo.first_name = $form.find('input[name="first-name"]').val();
					newUserInfo.last_name = $form.find('input[name="last-name"]').val();
					newUserInfo.company_name = $form.find('input[name="company-name"]').val();
					newUserInfo.email = userInfo.email;
					newUserInfo.phone = $form.find('input[name="phone"]').val();
					newUserInfo.city = $form.find('input[name="city"]').val();
					newUserInfo.state = $form.find('input[name="state"]').val();
					newUserInfo.country = $form.find('select[name="country"]').val();
					newUserInfo.preferred_language = $form.find('select[name="preferred_language"]').val();

					$this.addClass('disabled');

					$.ajax({
						method: 'POST',
						crossDomain: true,
						async: true,
						dataType: 'json',
						url: 'https://app.genemco.com/frontAjax',
						data: {
							action: 'edit.customer.details',
							data: {
								oldUserInfo: userInfo,
								newUserInfo: newUserInfo
							}
						}
					}).then(function(response) {
						$this.removeClass('disabled');
						userInfo = newUserInfo;
						editCustomerDetailsPopup.close();
						$('#genemco-login-customer-info').html(`
							<p class="genemco-checkout__text">${userInfo.first_name} ${userInfo.last_name}</p>
							<p class="genemco-checkout__text">${userInfo.company_name}</p>
							<p class="genemco-checkout__text">${userInfo.email}</p>
							<p class="genemco-checkout__text">${userInfo.phone}</p>
							<p class="genemco-checkout__text">${userInfo.city}, ${userInfo.state} ${userInfo.country}</p>
							<p class="genemco-checkout__text">Preferred language: ${userInfo.preferred_language}</p>
						`);
					});

				});
			});
		}

		var logoutCustomerCheckoutContinue = document.getElementById('logout-customer-checkout-continue');
		if (logoutCustomerCheckoutContinue != null) {
			let logoutCheckoutForm = document.getElementById('genemco-logout-customer-checkout__form');

			let backToStep1 = document.getElementById('back-top-step1');
			if (backToStep1 != null) {
				backToStep1.addEventListener('click', function(e) {
					$('.genemco-accordian-item').removeClass('active');
					$('.genemco-accordian-item__content').hide();
					document.querySelector('#genemco-logout-customer-checkout #step1').style.display = "block";
					document.querySelector('#genemco-logout-customer-checkout #step2').style.display = "none";
					$('.genemco-accordian-item.contact-details-item').addClass('active');
					$('.genemco-accordian-item.contact-details-item .genemco-accordian-item__content').show();
				});
			}

			logoutCustomerCheckoutContinue.addEventListener('click', async function(e) {
				e.preventDefault();
				let guestInfo = {
					firstName: logoutCheckoutForm.querySelector('input[name="first-name"]').value,
					lastName: logoutCheckoutForm.querySelector('input[name="last-name"]').value,
					companyName: logoutCheckoutForm.querySelector('input[name="company-name"]').value,
					email: logoutCheckoutForm.querySelector('input[name="email"]').value,
					phone: logoutCheckoutForm.querySelector('input[name="phone"]').value,
					city: logoutCheckoutForm.querySelector('input[name="city"').value,
					state: logoutCheckoutForm.querySelector('input[name="state"]').value,
					country: logoutCheckoutForm.querySelector('select[name="country"]').value,
					preferredLanguage: logoutCheckoutForm.querySelector('select[name="preferred_language"]').value,
					roleInThisProject: "",
					projectTimeline: "",
					aboutYourProject: ""
				};

				if (guestInfo.firstName.length > 0 && guestInfo.lastName.length > 0 && guestInfo.companyName.length > 0 && guestInfo.email.length > 0 && guestInfo.phone.length > 0 && guestInfo.city.length > 0 && guestInfo.state.length > 0 && guestInfo.country.length > 0 && guestInfo.preferredLanguage.length > 0) {
					document.querySelector('#genemco-logout-customer-checkout #step1').style.display = "none";
					document.querySelector('#genemco-logout-customer-checkout #step2').style.display = "block";
					$('#first_name').text(guestInfo.firstName);
					$('#last_name').text(guestInfo.lastName);
					$('#company_name').text(guestInfo.companyName);
					$('#email').text(guestInfo.email);
					$('#phone').text(guestInfo.phone);
					$('#city').text(guestInfo.city);
					$('#state').text(guestInfo.state);
					$('#country').text(guestInfo.country);
					$('#preferred_language').text(guestInfo.preferredLanguage);

				} else {
					// Validation
					await validateGenemcoFields();

					// Show default error message
					let hightLightedCheckoutFields = logoutCheckoutForm.querySelectorAll('.genemco-field.highlight');
					if (hightLightedCheckoutFields.length > 0) {
						console.log(hightLightedCheckoutFields.length);
						hightLightedCheckoutFields.forEach(genemcoField => {
							genemcoField.reportValidity();
						});
					}

					logoutCheckoutForm.querySelector('.message').innerHTML = "Please fill out all info";
				}
			});

			let logoutCustomerCheckoutSubmitButtons = document.querySelectorAll('.logout-customer-checkout-submit');
			logoutCustomerCheckoutSubmitButtons.forEach(logoutCustomerCheckoutSubmitButton => {
				logoutCustomerCheckoutSubmitButton.addEventListener('click', async function(e) {
					e.preventDefault();
					if (logoutCustomerCheckoutSubmitButton.classList.contains('disabled')) {
						return;
					}
					logoutCustomerCheckoutSubmitButton.classList.add('disabled');
					let guestInfo = {
						firstName: logoutCheckoutForm.querySelector('input[name="first-name"]').value,
						lastName: logoutCheckoutForm.querySelector('input[name="last-name"]').value,
						company: logoutCheckoutForm.querySelector('input[name="company-name"]').value,
						email: logoutCheckoutForm.querySelector('input[name="email"]').value,
						phone: logoutCheckoutForm.querySelector('input[name="phone"]').value,
						city: logoutCheckoutForm.querySelector('input[name="city"').value,
						state: logoutCheckoutForm.querySelector('input[name="state"]').value,
						country: logoutCheckoutForm.querySelector('select[name="country"]').value,
						preferredLanguage: logoutCheckoutForm.querySelector('select[name="preferred_language"]').value,
						roleInThisProject: "",
						projectTimeline: "",
						aboutYourProject: ""
					};
					guestInfo.roleInThisProject = document.getElementById('role-in-this-project').value;
					guestInfo.projectTimeline = document.getElementById('project-time-line').value;
					guestInfo.aboutYourProject = document.getElementById('about-project-and-request').value;

					if (guestInfo.roleInThisProject.length > 0 && guestInfo.projectTimeline.length > 0 && guestInfo.aboutYourProject.length > 0) {
						let cartItems = await getCartItems();
						let categories = getCategories();
						let submitGuestQuoteResponse = await submitGuestQuote(guestInfo, cartItems, categories);
						logoutCustomerCheckoutSubmitButton.classList.remove('disabled');
						await clearCartItems();
						await clearProjectDetailsCookies();
						// window.location.reload();

						let productsHTML = '';
						cartItems.forEach(cartItem => {
							productsHTML += `
							<div class="genemco-checkout__cart-item">
								<div class="cart-item__left">
									<img src="${cartItem.image}">
								</div>
								<div class="cart-item__right">
									<p class="cart-item__sku">${cartItem.sku}</p>
									<p class="cart-item__title"><strong>${cartItem.title}</strong></p>
									<p class="cart-item__desc">${cartItem.product_description}</p>
								</div>
							</div>
							`;
						});
						let logoutThankYouPageHTML = `
						<div class="logout-thankyou-page">
							<div class="genemco-checkout__container" style="margin-top: 50px;">
								<div class="genemco-checkout__col-half">
									<h2 class="genemco-checkout__heading" style="color: #00aa00;"><strong>Thank you, your quote has been sent!</strong></h2>
									<h2 class="genemco-checkout__heading"><strong>Consider signing in or creating an account so it's saved. With an account, you can quickly request quotes without entering your information each time.</strong></h2>
									<br>
									<p class="genemco-checkout__text">We will quickly email/call you to discuss your quote. You may also call us at <a href="tel:979-268-7447">979-268-7447</a>.</p>
									<p class="genemco-checkout__text">Please check your email for quote confirmation and additional information.</p>
									<div class="genemco-accordian-container hide-on-desktop">
							          <div class="genemco-accordian-item">
							            <div class="genemco-accordian-item__heading">
							              <span class="genemco-accordian-bullet"></span>
							              <span><strong>Create Account.</strong> New? Save quote in account!</span>
							            </div>
							            <div class="genemco-accordian-item__content" style="display: none;">
							              <div class="genemco-form__wrapper">
							                <form method="post" action="/account" accept-charset="UTF-8" name="create" class="form"><input type="hidden" name="form_type" value="create_customer"><input type="hidden" name="utf8" value="✓">
							                  <header class="popover__header">
							                    <h2 class="popover__title heading">Create my account</h2>
							                    <p class="popover__legend">Please fill in the information below:</p>
							                  </header>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <input type="text" id="register-customer[first_name]" class="form__field form__field--text" name="customer[first_name]" required="required">
							                    <label for="register-customer[first_name]" class="form__floating-label">First name</label>
							                  </div>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <input type="text" id="register-customer[last_name]" class="form__field form__field--text" name="customer[last_name]" required="required">
							                    <label for="register-customer[last_name]" class="form__floating-label">Last name</label>
							                  </div>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <input type="text" id="customer[note][company]" class="form__field form__field--text" name="customer[note][company]" required="required">
							                    <label for="customer[note][company]" class="form__floating-label">Company name</label>
							                  </div>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <input type="email" id="customer[email]" class="form__field form__field--text" name="customer[email]" required="required">
							                    <label for="customer[email]" class="form__floating-label">Email</label>
							                  </div>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <input type="text" id="customer[note][phone]" class="form__field form__field--text" name="customer[note][phone]" required="required">
							                    <label for="customer[note][phone]" class="form__floating-label">Phone</label>
							                  </div>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <input type="text" id="customer[note][city]" class="form__field form__field--text" name="customer[note][city]" required="required">
							                    <label for="customer[note][city]" class="form__floating-label">City</label>
							                  </div>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <input type="text" id="customer[note][state]" class="form__field form__field--text" name="customer[note][state]" required="required">
							                    <label for="customer[note][state]" class="form__floating-label">State</label>
							                  </div>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <select name="country" id="customer[note][country]" required="required">
							                      <option value="">Select your Country</option>
							                      <option value="United States of America">United States of America</option>
							                      <option value="Canada">Canada</option>
							                      <option value="Mexico">Mexico</option>
							                      <option disabled="">---</option>
							                      <option value="Afganistan">Afghanistan</option>
							                      <option value="Albania">Albania</option>
							                      <option value="Algeria">Algeria</option>
							                      <option value="American Samoa">American Samoa</option>
							                      <option value="Andorra">Andorra</option>
							                      <option value="Angola">Angola</option>
							                      <option value="Anguilla">Anguilla</option>
							                      <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
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
							                      <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
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
							                      <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
							                      <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
							                      <option value="Saipan">Saipan</option>
							                      <option value="Samoa">Samoa</option>
							                      <option value="Samoa American">Samoa American</option>
							                      <option value="San Marino">San Marino</option>
							                      <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
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
							                      <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
							                      <option value="Tunisia">Tunisia</option>
							                      <option value="Turkey">Turkey</option>
							                      <option value="Turkmenistan">Turkmenistan</option>
							                      <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
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
							                      <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
							                      <option value="Yemen">Yemen</option>
							                      <option value="Zaire">Zaire</option>
							                      <option value="Zambia">Zambia</option>
							                      <option value="Zimbabwe">Zimbabwe</option>
							                    </select>
							                  </div>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <select name="customer[note][preferred_language]" id="customer[note][preferred_language]" required="required">
							                      <option value="">Preferred language</option>
							                      <option value="English">English</option>
							                      <option value="Spanish">Spanish</option>
							                      <option value="Other">Other</option>
							                    </select>
							                  </div>

							                  <div class="form__input-wrapper form__input-wrapper--labelled">
							                    <input type="password" id="register-customer[password]" class="form__field form__field--text" name="customer[password]" required="required" autocomplete="new-password">
							                    <label for="register-customer[password]" class="form__floating-label">Password</label>
							                  </div>
							                  <input type="hidden" name="return_to" value="/pages/request-for-quote">
							                  <input type="hidden" name="checkout_url" value="/pages/request-for-quote">
							                  <button type="submit" class="form__submit button button--primary button--full">Create my account</button>
							                </form>
							              </div>
							            </div>
							          </div>
							          <div class="genemco-accordian-item active">
							            <div class="genemco-accordian-item__heading">
							              <span class="genemco-accordian-bullet"></span>
							              <span><strong>Sign In. Already a customer?</strong></span>
							            </div>
							            <div class="genemco-accordian-item__content" style="display: block;">
							              <div class="genemco-form__wrapper">
								                <form method="post" action="/account/login" id="customer_login" accept-charset="UTF-8" name="login" class="form" onsubmit="window.Shopify.recaptchaV3.addToken(this, &quot;customer_login&quot;); return false;"><input type="hidden" name="form_type" value="customer_login"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="checkout_url" value="/pages/request-for-quote">
									                <div class="form__input-wrapper form__input-wrapper--labelled">
									                    <label for="customer[email]">Email Adress</label>
                  										<input type="email" id="customer[email]" class="form__field form__field--text is-filled" name="customer[email]" required="required">
                									</div>
									                <div class="form__input-wrapper form__input-wrapper--labelled">
									                  <label for="customer[password]">Password</label>
									                  <input type="password" id="customer[password]" class="form__field form__field--text is-filled" name="customer[password]" required="required" autocomplete="current-password">
									                </div>
                									<button type="submit" class="form__submit button button--primary button--full">Continue</button>
                								</form>
							              </div>
							            </div>
							          </div>
							        </div>
									<div class="genemco-checkout__review-items genemco-checkout__row">
										<h2 class="genemco-checkout__heading hide-on-mobile"><strong>Quote Number:</strong> ${submitGuestQuoteResponse.quoteID}</h2>
										${productsHTML}
									</div>
								</div>
								<div class="genemco-checkout__col-half hide-on-mobile">
									<div class="genemco-form__wrapper border1px">
										<h2 class="genemco-checkout__heading"><strong>>> Sign-In to Save your Quote</strong></h2>
										<p class="genemco-checkout__text">Get access to our best pricing, get early access to new inventory and easily save your quote/orders, by signing in below.</p>
										<form method="post" action="/account/login" id="customer_login" accept-charset="UTF-8" name="login" class="form">
											<input type="hidden" name="form_type" value="customer_login">
											<input type="hidden" name="utf8" value="✓">
											<input type="hidden" name="checkout_url" value="/pages/request-for-quote">
											<div class="form__input-wrapper form__input-wrapper--labelled">
												<label for="customer[email]">Email Adress</label>
												<input type="email" id="customer[email]" class="form__field form__field--text is-filled" name="customer[email]" required="required">
											</div>

											<div class="form__input-wrapper form__input-wrapper--labelled">
												<label for="customer[password]">Password</label>
												<input type="password" id="customer[password]" class="form__field form__field--text is-filled" name="customer[password]" required="required" autocomplete="current-password">
											</div>

											<button type="submit" class="form__submit button button--primary button--full">Continue</button>
										</form>
									</div>
									<h2 class="genemco-checkout__heading-cross"><span>New to Genemco?</span></h2>
									<a class="button" id="create_genemco_account">Create your Genemco Account</a>
								</div>	
							</div>
						</div>
						`;

						let emptyCartHTML = `
						<a class="header__action-item-link header__cart-toggle" href="/cart" aria-controls="mini-cart" aria-expanded="false" data-action="toggle-mini-cart" data-no-instant="">
      						<div class="header__action-item-content">
        						<div class="header__cart-icon icon-state" aria-expanded="false">
          							<span class="icon-state__primary">
          								<svg class="icon icon--cart" viewBox="0 0 27 24" role="presentation">
									      <g transform="translate(0 1)" stroke-width="2" stroke="currentColor" fill="none" fill-rule="evenodd">
									        <circle stroke-linecap="square" cx="11" cy="20" r="2"></circle>
									        <circle stroke-linecap="square" cx="22" cy="20" r="2"></circle>
									        <path d="M7.31 5h18.27l-1.44 10H9.78L6.22 0H0"></path>
									      </g>
									    </svg>
										<span class="header__cart-count">0</span>
          							</span>
              						<span class="icon-state__secondary">
              							<svg class="icon icon--close" viewBox="0 0 19 19" role="presentation">
									      <path d="M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z" fill="currentColor" fill-rule="evenodd"></path>
									    </svg>
									</span>
        						</div>
        						<span class="hidden-pocket hidden-lap">My Quote</span>
      						</div>
    					</a>
    					<form method="post" action="/cart" id="mini-cart" class="mini-cart" aria-hidden="true" novalidate="novalidate" data-item-count="0" tabindex="-1">
						  <input type="hidden" name="attributes[collection_products_per_page]" value="">
						  <input type="hidden" name="attributes[collection_layout]" value=""><svg class="icon icon--nav-triangle-borderless" viewBox="0 0 20 9" role="presentation">
						      <path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z" fill="#ffffff"></path>
						    </svg><div class="mini-cart__content mini-cart__content--empty"><div class="alert alert--tight alert--center text--strong">
						          <a href="/pages/purchase-and-shipping-process">Click here to learn about our easy purcase and shipping process</a>
						        </div>

						      <div class="mini-cart__empty-state"><svg width="81" height="70" viewBox="0 0 81 70">
						      <g transform="translate(0 2)" stroke-width="4" stroke="#232f3e" fill="none" fill-rule="evenodd">
						        <circle stroke-linecap="square" cx="34" cy="60" r="6"></circle>
						        <circle stroke-linecap="square" cx="67" cy="60" r="6"></circle>
						        <path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path>
						      </g>
						    </svg><p class="heading h4">Your quote cart is empty</p>
						      </div>

						      <a href="/collections/all" class="button button--primary button--full">Shop our products</a></div>
						</form>`;

						document.querySelector('#genemco-logout-customer-checkout').innerHTML = logoutThankYouPageHTML;
						document.querySelector('.header__action-item--cart').innerHTML = emptyCartHTML;
						document.querySelector('#shopify-section-header').style.display = "block";
						document.querySelector('#shopify-section-static-newsletter').style.display = "block";
						document.querySelector('#shopify-section-text-with-icons').style.display = "block";
						document.querySelector('#shopify-section-footer').style.display = "block";
						window.scrollTo(0, 0);
					} else {
						// Validation
						await validateGenemcoFields();

						// Show default error message
						let hightLightedCheckoutFields = document.querySelectorAll('#genemco-logout-customer-checkout__project-details .genemco-field.highlight');
						if (hightLightedCheckoutFields.length > 0) {
							hightLightedCheckoutFields.forEach(genemcoField => {
								genemcoField.reportValidity();
							});
						}

						logoutCustomerCheckoutSubmitButton.classList.remove('disabled');
						$('.error-message').text('Enter all required information');
					}
				});
			});
		}

		let createGenemcoAccount = document.querySelector('#create_genemco_account');
		if (createGenemcoAccount != null) {
			createGenemcoAccount.addEventListener('click', function(e) {
				const signupPopup = new Fancybox([{
					src: `<form method="post" action="/account" id="create_customer_popup" accept-charset="UTF-8" name="create" class="form"><input type="hidden" name="form_type" value="create_customer"><input type="hidden" name="utf8" value="✓">
						<header class="popover__header">
	                      <h2 class="popover__title heading">Create my account</h2>
	                      <p class="popover__legend">Please fill in the information below:</p>
	                    </header>

	                    <div class="form__input-wrapper form__input-wrapper--labelled">
	                      <input type="text" id="register-customer[first_name]" class="form__field form__field--text" name="customer[first_name]" required="required">
	                      <label for="register-customer[first_name]" class="form__floating-label">First name</label>
	                    </div>

	                    <div class="form__input-wrapper form__input-wrapper--labelled">
	                      <input type="text" id="register-customer[last_name]" class="form__field form__field--text" name="customer[last_name]" required="required">
	                      <label for="register-customer[last_name]" class="form__floating-label">Last name</label>
	                    </div>

	                    <div class="form__input-wrapper form__input-wrapper--labelled">
	                      <input type="text" id="customer[note][company]" class="form__field form__field--text" name="customer[note][company]" required="required">
	                      <label for="customer[note][company]" class="form__floating-label">Company name</label>
	                    </div>

	                      <div class="form__input-wrapper form__input-wrapper--labelled">
	                        <input type="email" id="customer[email]" class="form__field form__field--text" name="customer[email]" required="required">
	                        <label for="customer[email]" class="form__floating-label">Email</label>
	                      </div>

	                    <div class="form__input-wrapper form__input-wrapper--labelled">
	                      <input type="text" id="customer[note][phone]" class="form__field form__field--text" name="customer[note][phone]" required="required">
	                      <label for="customer[note][phone]" class="form__floating-label">Phone</label>
	                    </div>

	                    <div class="form__input-wrapper form__input-wrapper--labelled">
	                      <input type="text" id="customer[note][city]" class="form__field form__field--text" name="customer[note][city]" required="required">
	                      <label for="customer[note][city]" class="form__floating-label">City</label>
	                    </div>

	                    <div class="form__input-wrapper form__input-wrapper--labelled">
	                      <input type="text" id="customer[note][state]" class="form__field form__field--text" name="customer[note][state]" required="required">
	                      <label for="customer[note][state]" class="form__floating-label">State</label>
	                    </div>

	                    <div class="form__input-wrapper form__input-wrapper--labelled">
	                      <select name="country" id="customer[note][country]" name="customer[note][country]" required="required" >
				            <option value="">Select your Country</option>
				            <option value="United States of America">United States of America</option>
				            <option value="Canada">Canada</option>
				            <option value="Mexico">Mexico</option>
				            <option disabled="">---</option>
				            <option value="Afganistan">Afghanistan</option>
				            <option value="Albania">Albania</option>
				            <option value="Algeria">Algeria</option>
				            <option value="American Samoa">American Samoa</option>
				            <option value="Andorra">Andorra</option>
				            <option value="Angola">Angola</option>
				            <option value="Anguilla">Anguilla</option>
				            <option value="Antigua &amp; Barbuda">Antigua &amp; Barbuda</option>
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
				            <option value="Bosnia &amp; Herzegovina">Bosnia &amp; Herzegovina</option>
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
				            <option value="St Pierre &amp; Miquelon">St Pierre &amp; Miquelon</option>
				            <option value="St Vincent &amp; Grenadines">St Vincent &amp; Grenadines</option>
				            <option value="Saipan">Saipan</option>
				            <option value="Samoa">Samoa</option>
				            <option value="Samoa American">Samoa American</option>
				            <option value="San Marino">San Marino</option>
				            <option value="Sao Tome &amp; Principe">Sao Tome &amp; Principe</option>
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
				            <option value="Trinidad &amp; Tobago">Trinidad &amp; Tobago</option>
				            <option value="Tunisia">Tunisia</option>
				            <option value="Turkey">Turkey</option>
				            <option value="Turkmenistan">Turkmenistan</option>
				            <option value="Turks &amp; Caicos Is">Turks &amp; Caicos Is</option>
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
				            <option value="Wallis &amp; Futana Is">Wallis &amp; Futana Is</option>
				            <option value="Yemen">Yemen</option>
				            <option value="Zaire">Zaire</option>
				            <option value="Zambia">Zambia</option>
				            <option value="Zimbabwe">Zimbabwe</option>
				          </select>
	                    </div>

	                    <div class="form__input-wrapper form__input-wrapper--labelled">
	                      <select name="customer[note][preferred_language]" id="customer[note][preferred_language]" required="required">
	                        <option value="">Preferred language</option>
	                        <option value="English">English</option>
	                        <option value="Spanish">Spanish</option>
	                        <option value="Other">Other</option>
	                      </select>
	                    </div>

	                    <div class="form__input-wrapper form__input-wrapper--labelled">
	                      <input type="password" id="register-customer[password]" class="form__field form__field--text" name="customer[password]" required="required" autocomplete="new-password">
	                      <label for="register-customer[password]" class="form__floating-label">Password</label>
	                    </div>
						<input type="hidden" name="return_to" value="/pages/request-for-quote">
							<input type="hidden" name="checkout_url" value="/pages/request-for-quote">
	                    <button type="submit" class="form__submit button button--primary button--full">Create my account</button></form>`,
	                type: "html"
				}]);
			});
		}

		$(document).on('click', 'form[action="/account/login"] button[type="submit"]', function(e) {
			if ($(window).width() > 768) return;

			let $form = $(this).closest('form');
			let valid = $form.find('input[name="customer[email]"]')[0].checkValidity() && $form.find('input[name="customer[password]"]')[0].checkValidity();
			let validationMessage = '';

			if (!$form.find('input[name="customer[email]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.email}</div>`;
			}
			if (!$form.find('input[name="customer[password]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.password}</div>`;
			}
			if (!valid) {
				validationMessage = `<div class="genemco-validation-wrap"><h3 class="genemco-validation-heading">There was a problem</h3>${validationMessage}</div>`;
				$form.find('.genemco-validation-wrap').remove();
				$form.prepend(validationMessage);
			} else {
				$form.find('.genemco-validation-wrap').remove();
			}
		});

		$(document).on('click', '#genemco-logout-customer-checkout__form #logout-customer-checkout-continue', function(e) {
			if ($(window).width() > 768) return;

			let $form = $(this).closest('form');
			let valid = $form.find('input[name="email"]')[0].checkValidity() && 
						$form.find('input[name="phone"]')[0].checkValidity() &&
						$form.find('input[name="first-name"]')[0].checkValidity() &&
						$form.find('input[name="last-name"]')[0].checkValidity() &&
						$form.find('input[name="company-name"]')[0].checkValidity() &&
						$form.find('input[name="city"]')[0].checkValidity() &&
						$form.find('input[name="state"]')[0].checkValidity() &&
						$form.find('select[name="country"]')[0].checkValidity() &&
						$form.find('select[name="preferred_language"]')[0].checkValidity();
			let validationMessage = '';

			if (!$form.find('input[name="email"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.email}</div>`;
			}
			if (!$form.find('input[name="phone"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.phone}</div>`;
			}
			if (!$form.find('input[name="first-name"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.firstName}</div>`;
			}
			if (!$form.find('input[name="last-name"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.lastName}</div>`;
			}
			if (!$form.find('input[name="company-name"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.companyName}</div>`;
			}
			if (!$form.find('input[name="city"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.city}</div>`;
			}
			if (!$form.find('input[name="state"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.state}</div>`;
			}
			if (!$form.find('select[name="country"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.country}</div>`;
			}
			if (!$form.find('select[name="preferred_language"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.preferredLanguage}</div>`;
			}
			if (!valid) {
				validationMessage = `<div class="genemco-validation-wrap"><h3 class="genemco-validation-heading">There was a problem</h3>${validationMessage}</div>`;
				$form.find('.genemco-validation-wrap').remove();
				$form.prepend(validationMessage);
			} else {
				$form.find('.genemco-validation-wrap').remove();
			}
		});

		$(document).on('click', 'form[action="/account"] button[type="submit"]', function(e) {
			console.log('form[action="/account"] button[type="submit"]');
			if ($(window).width() > 768) return;

			let $form = $(this).closest('form');
			let valid = $form.find('input[name="customer[first_name]"]')[0].checkValidity() && 
						$form.find('input[name="customer[last_name]"]')[0].checkValidity() &&
						$form.find('input[name="customer[note][company]"]')[0].checkValidity() &&
						$form.find('input[name="customer[email]"]')[0].checkValidity() &&
						$form.find('input[name="customer[note][phone]"]')[0].checkValidity() &&
						$form.find('input[name="customer[note][city]"]')[0].checkValidity() &&
						$form.find('input[name="customer[note][state]"]')[0].checkValidity() &&
						$form.find('select[name="customer[note][country]"]')[0].checkValidity() &&
						$form.find('select[name="customer[note][preferred_language]"]')[0].checkValidity() &&
						$form.find('input[name="customer[password]"]');
			let validationMessage = '';

			if (!$form.find('input[name="customer[first_name]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.firstName}</div>`;
			}
			if (!$form.find('input[name="customer[last_name]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.lastName}</div>`;
			}
			if (!$form.find('input[name="customer[note][company]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.companyName}</div>`;
			}
			if (!$form.find('input[name="customer[email]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.email}</div>`;
			}
			if (!$form.find('input[name="customer[note][phone]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.phone}</div>`;
			}
			if (!$form.find('input[name="customer[note][city]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.city}</div>`;
			}
			if (!$form.find('input[name="customer[note][state]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.state}</div>`;
			}
			if (!$form.find('select[name="customer[note][country]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.country}</div>`;
			}
			if (!$form.find('select[name="customer[note][preferred_language]"]')[0].checkValidity()) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.preferredLanguage}</div>`;
			}
			if (!$form.find('input[name="customer[password]"]')) {
				validationMessage += `<div class="genemco-validation-line">${errorMessages.password}</div>`;
			}
			if (!valid) {
				validationMessage = `<div class="genemco-validation-wrap"><h3 class="genemco-validation-heading">There was a problem</h3>${validationMessage}</div>`;
				$form.find('.genemco-validation-wrap').remove();
				$form.prepend(validationMessage);
			} else {
				$form.find('.genemco-validation-wrap').remove();
			}

			validateGenemcoFields($form[0]);
		});

		initiateGenemcoFields();
	});
})(window, document);