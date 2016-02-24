<!doctype html>
<html>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link href="http://getbootstrap.com/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="css/main.css" rel="stylesheet">

        <? require_once 'header.php' ?>
        <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
        <script src="http://underscorejs.org/underscore-min.js"></script>
        <script src="js/jquery-deserialize.js"></script>
        <script>var groom_saved = "<?=$groom_saved?>", bride_saved = "<?=$bride_saved?>";</script>
        <script src="js/friendslist.js"></script>
        <script src="js/main.js"></script>
    </head>

    <body class="container">

        <h2 class="text-center form-signin-heading">Wedding Invite List</h2>

        <form method="post" onsubmit="return false">
            <div class="groom list col-xs-3">
                <h3>Groom's List</h3>
                <ul class="groom friends"></ul>
                <button class="btn btn-success form-control js-save" data-side="groom">Save</button>
            </div>

            <div class="bride list col-xs-3">
                <h3>Bride's List</h3>
                <ul class="bride friends"></ul>
                <button class="btn btn-success form-control js-save" data-side="bride">Save</button>
            </div>
        </form>

        <div class="common list col-xs-3">
            <h3>Both Agree</h3>
            <ol class="common friends"></ol>
        </div>

        <div class="discuss list col-xs-3">
            <h3>Discuss</h3>
            <ol class="difference friends"></ol>
        </div>

        <div id="background"></div>

    </body>

</html>
