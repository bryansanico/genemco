@extends('shopify-app::layouts.default')

@section('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/library.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
@endsection

@section('content')
<?php // if (isset($quote_ids)) print_r($quote_ids); ?>
<div class="grid-container">
    <div class="grid-x rid-padding-x">
        <div class="medium-12 cell">
        	<a class="back_btn" href="/">< Back</a>
        	
            <table class="genemco_info-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Customer ID</th>
                        <th>Created At</th>
                        <th></th>
                        <th>Merge</th>
                    </tr>
                </thead>
                <tbody>
                    <?php 

                    foreach ($quotes as $index => $quote) {
                        // $quoteArray = json_decode($quote->quote_values);
                        ?>

                        <tr>
                            <td><?php echo $quote->id; ?></td>
                            <td><?php echo $quote->first_name . " " . $quote->last_name; ?></td>
                            <td><a href="<?php echo url()->current(); ?>"><?php echo $quote->email; ?></a></td>
                            <td><?php echo $quote->customer_id; ?></td>
                            <td><?php echo $quote->created_at; ?></td>
                            <td><a href="/quote/<?php echo $quote->quote_id; ?>">more</a></td>
                            <td><input type="checkbox" name="quote_merge[]" value="merge" class="quote_merge" data-id="<?php echo $quote->id; ?>"></td>
                        </tr>

                        <?php
                    }

                    ?>
                </tbody>
            </table>  
            <form action="post" class="merge_form">
            	<input type="hidden" name="quote_ids" value="" class="quote_ids">
            	<input type="hidden" name="quote_email" value="<?php echo $email; ?>">
            	<input type="submit" name="quote_merge_btn" value="Merge" class="button quote_merge_btn disabled">
            </form>    
        </div>
    </div>
</div>
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