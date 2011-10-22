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
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Конкурс для веб-разработчиков</title>
    
    <script type="text/javascript" src="main.js"></script>
    <script type="text/javascript" src="tpl.js"></script>
    <link type="text/css" rel="stylesheet" href="style.css">
    <script type="text/javascript">app.nav(location, null, true);</script>
  </head>
  <body>
    <div id="masks_wrapper" class="off">
      <div id="mask1" class="contest_mask"></div>
      <div id="mask2" class="contest_mask"></div>
      <div id="mask3" class="contest_mask"></div>
      <div id="masks_pults">
        <div class="pult">
          <div class="label">img1:</div>
          <div class="btn on" onclick="maskOn(1, 'on');" onmouseover="maskOn(1, 'on', true);" onmouseout="maskOff(true);"></div>
          <div class="btn half" onclick="maskOn(1, 'half');" onmouseover="maskOn(1, 'half', true);" onmouseout="maskOff(true);"></div>
        </div>
        <div class="pult">
          <div class="label">img2:</div>
          <div class="btn on" onclick="maskOn(2, 'on');" onmouseover="maskOn(2, 'on', true);" onmouseout="maskOff(true);"></div>
          <div class="btn half" onclick="maskOn(2, 'half');" onmouseover="maskOn(2, 'half', true);" onmouseout="maskOff(true);"></div>
        </div>
        <div class="pult">
          <div class="label">img3:</div>
          <div class="btn on" onclick="maskOn(3, 'on');" onmouseover="maskOn(3, 'on', true);" onmouseout="maskOff(true);"></div>
          <div class="btn half" onclick="maskOn(3, 'half');" onmouseover="maskOn(3, 'half', true);" onmouseout="maskOff(true);"></div>
        </div>
        <div class="pult">
          <div class="btn off" onclick="maskOff();"></div>
          <div class="label">imgs off</div>
        </div>
      </div>
    </div>
    
    <script type="text/javascript">onHeadReady(true);</script>
    <div id="container"></div>
  </body>
</html>