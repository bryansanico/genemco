@extends('shopify-app::layouts.default')

@section('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('/css/library.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />
@endsection

@section('content')
    <header>
        <div class="header-content__left">
            <div class="header-logo">
                <a href="/"><img src="{{ asset('img/Genemco_logo.png') }}"></a>
            </div>
        </div>
        <div class="header-content__right">
            <ul class="header-menu">
                <li><a href="/">Quotes</a></li>
                <li><a href="/sales_rep">Settings</a></li>
            </ul>
        </div>
    </header>
@endsection