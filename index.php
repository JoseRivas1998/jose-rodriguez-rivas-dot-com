<!DOCTYPE html>
<html lang="en" ng-app="tcg">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <link href="/css/app.min.css?cache_bust=<?php echo base_convert(time(), 10, 36) ?>" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <base href="/">
    <script src="/js/app.min.js?cache_bust=<?php echo base_convert(time(), 10, 36) ?>"></script>
    <!--    <script src="/js/app.js?--><?php //echo base_convert(time(), 10, 36)?><!--"></script>-->

    <title>{{pageTitle + (pageTitle.length > 0 ? ' | ' : '')}}Jose Rodriguez Rivas</title>
</head>
<body>
<header ng-controller="HeaderController">
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">Jos&eacute; Rodriguez Rivas</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li ng-repeat="item in mainMenu" ng-class="{active : checkActive(item.activeOn)}">
                        <a ng-href="{{item.src}}"><i ng-class="['fa', 'fa-' + item.icon, 'fa-fw']"></i>&nbsp;{{item.title}}</a>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</header>

<div class="container">
    <div class="row">
        <div ng-view></div>
    </div>
</div>

</body>
</html>
