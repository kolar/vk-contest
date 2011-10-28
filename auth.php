<?
include 'config.php';

$code = preg_match("/^[0-9a-f]+$/i", $_GET['code']) ? $_GET['code'] : '';
$response = @file_get_contents(TOKEN_URL . $code);
$auth_data = @json_decode($response, true);

if ($auth_data && $auth_data['access_token'] && intval($auth_data['user_id'])) {
  $viewer_id = intval($auth_data['user_id']);
  $expires_in = intval($auth_data['expires_in']);
  $expires = time() + ($expires_in ? $expires_in : 31536000);
  
  SetCookie('viewer_id', $viewer_id, $expires);
  SetCookie('auth_key', md5(API_ID . '_' . $viewer_id . '_' . SECRET), $expires);
  SetCookie('access_token', $auth_data['access_token'], $expires);
  
  $return = substr($_GET['return'], 0, 1) == '/' ? $_GET['return'] : '/';
  header('Location: ' . BASE_URL . $return);
} else {
  SetCookie('viewer_id');
  SetCookie('auth_key');
  SetCookie('access_token');
  
  header('Location: ' . BASE_URL . '/?error=' . urlencode($auth_data['error']));
}
?>