@extends('shopify-app::layouts.default')

@section('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/library.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
@endsection

@section('content')
    <!-- You are: (shop domain name) -->
    <!-- <p>You are: {{ Auth::user()->name }}</p> -->
    <div class="grid-container">
        <div class="grid-x rid-padding-x">
            <div class="medium-12 cell">
                <div class="pagination-wrapper">
                    <div class="pagination-text">
                        <?= $perPage ?> per page
                    </div>
                    <div class="pagination-list">
                        <a href="<?php echo url()->current() . '?per_page=10&page=1' ?>">10 per page</a>
                        <a href="<?php echo url()->current() . '?per_page=25&page=1' ?>">25 per page</a>
                        <a href="<?php echo url()->current() . '?per_page=50&page=1' ?>">50 per page</a>
                        <a href="<?php echo url()->current() . '?per_page=100&page=1' ?>">100 per page</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="grid-container">
        <div class="grid-x rid-padding-x">
            <div class="medium-12 cell">
                <input type="text" name="search_by_input" placeholder="Input name or email" id="search_by_input">
            </div>
        </div>
    </div>
    <div class="grid-container">
        <div class="grid-x rid-padding-x">
            <div class="medium-12 cell">
                <table class="genemco_info-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Customer ID</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th></th>
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
                                <td><a href="<?php echo url('/') . "/mergeQuotes/" . $quote->email; ?>"><?php echo $quote->email; ?></a></td>
                                <td><?php echo $quote->customer_id; ?></td>
                                <td><?php echo $quote->created_at; ?></td>
                                <td>
                                    <select name="status" id="status" data-quoteid="<?php echo $quote->quote_id; ?>" disabled>
                                        <option value="new" <?php if ( $quote->status == 'new') echo 'selected' ?>>New</option>
                                        <option value="active" <?php if ( $quote->status == 'active') echo 'selected' ?>>Active</option>
                                        <option value="saved_for_later" <?php if ( $quote->status == 'saved_for_later') echo 'selected' ?>>Saved for Later</option>
                                        <option value="converted_to_order" <?php if ( $quote->status == 'converted_to_order') echo 'selected' ?>>Converted to Order</option>
                                        <option value="not_responsive" <?php if ( $quote->status == 'not_responsive') echo 'selected' ?>>Not Responsive</option>
                                    </select>
                                </td>
                                <td><a href="/quote/<?php echo $quote->quote_id; ?>">more</a></td>
                            </tr>

                            <?php
                        }

                        ?>
                    </tbody>
                </table>      
            </div>
        </div>
    </div>

    <div class="grid-container">
        <div class="grid-x rid-padding-x">
            <div class="medium-12 cell">
                <div class="genemco_pagination-wrap">
                    <?php echo $quotes->appends(['per_page' => $perPage])->render(); ?>
                </div>
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
