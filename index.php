<?
include 'config.php';

if (!IS_AUTH) {
  if (isset($_GET['error'])) {
    exit($_GET['error']);
  } else {
    header('Location: ' . AUTH_URL);
    exit();
  }
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <link rel="shortcut icon" href="faviconvblack.ico">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Конкурс для веб-разработчиков</title>
    
    <script type="text/javascript" src="all.js"></script>
    <link type="text/css" rel="stylesheet" href="style.css">
    <script type="text/javascript">app.nav(location, null, {no_push: true});</script>
  </head>
  <body class="header_fixed" onresize="onBodyResize(true);">
    <script type="text/javascript">onHeadReady(true);</script>
    <div id="container"></div>
  </body>
</html>