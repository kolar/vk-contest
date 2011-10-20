<?php
ini_set('display_errors', 'Off');
ini_set('error_reporting', 0);
header('Content-Type: text/html');
mb_internal_encoding('utf-8');

// Application settings
define('API_ID', 2648158);
define('SECRET', 'VNiFY4uAwdOWCvxkGn7p');
define('SCOPE', 'friends,photos,groups');

define('APP_URL', 'http://vkontakte.ru/app'.API_ID);
define('BASE_URL', 'http://contest.asmico.ru');

// VK auth vars
define('VIEWER_ID', isset($_COOKIE['viewer_id']) ? intval($_COOKIE['viewer_id']) : 0);
define('AUTH_KEY', isset($_COOKIE['auth_key']) ? $_COOKIE['auth_key'] : '');
define('REAL_AUTH_KEY', md5(API_ID . '_' . VIEWER_ID . '_' . SECRET));
define('ACCESS_TOKEN', isset($_COOKIE['access_token']) ? $_COOKIE['access_token'] : '');
define('IS_AUTH', VIEWER_ID && (AUTH_KEY == REAL_AUTH_KEY) && ACCESS_TOKEN);

// Application vars
define('AUTH_CALLBACK_URL', BASE_URL.'/auth.php');
define('AUTH_URL', 'http://api.vkontakte.ru/oauth/authorize?client_id=' . API_ID . '&scope=' . urlencode(SCOPE) . '&redirect_uri=' . urlencode(AUTH_CALLBACK_URL) . '&response_type=code');
define('TOKEN_URL', 'https://api.vkontakte.ru/oauth/access_token?client_id=' . API_ID . '&client_secret=' . SECRET . '&code=');
?>