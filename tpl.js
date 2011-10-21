var ui_tpls = {
  UI_CONTAINER:
'<div id="background_header"></div>' +
'<div id="page_container">' +
  '<div id="page_header">' +
    '<div class="left_side">' +
      '<div class="icon"></div>' +
      '<div id="header_title" class="title">{user_fullname}</div>' +
    '</div>' +
    '<div class="right_side">' +
      '<div class="top_search"><input id="header_search" type="text" value="Search..." /></div>' +
      '<ul class="top_links">' +
        '<li><a href="#" onclick="return false;">Newsfeed</a></li>' +
        '<li><a href="#" onclick="return false;">Feedback</a></li>' +
        '<li><a href="#" onclick="return false;">Messages</a></li>' +
      '</ul>' +
    '</div>' +
  '</div>' +
  '<div id="content">{UI_CONTENT}</div>' +
'</div>',
  UI_CONTENT:
'<div class="left_column">' +
  '<div class="user_photo">' +
    '<div class="img"><img src="{profile_photo}" /></div>' +
  '</div>' +
  '{my_profile:{[' +
    '{can_write_pm?{[<button class="blue_button">Send a Message</button>]}}' +
    '{is_friend?{[<button class="gray_button">Remove from Friends</button>]}:{[<button class="blue_button">Add to Friends</button>]}}' +
  ']}}' +
  '{npva_counters_block?{[<hr />]}}' +
  '{news_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="#" class="label" onclick="return false;">News</a><span>{news_cnt}</span></div></div>]}}' +
  '{photos_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="#" class="label" onclick="return false;">Photos</a><span>{photos_cnt}</span></div></div>]}}' +
  '{videos_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="#" class="label" onclick="return false;">Videos</a><span>{videos_cnt}</span></div></div>]}}' +
  '{audios_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="#" class="label" onclick="return false;">Audio files</a><span>{audios_cnt}</span></div></div>]}}' +
  '{ff_counters_block?{[<hr />]}}' +
  '{friends_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="#" class="label" onclick="return false;">Friends</a><span>{friends_cnt}</span></div></div>]}}' +
  '{show_friends?{[<div class="users_tiles clearfix">{friends::UI_USER_TILE}</div>]}}' +
  '{followers_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="#" class="label" onclick="return false;">Followers</a><span>{followers_cnt}</span></div></div>]}}' +
  '{show_followers?{[<div class="users_tiles clearfix">{followers::UI_USER_TILE}</div>]}}' +
'</div>' +
'<div class="right_column">' +
  '{profile_page?{[{UI_PROFILE_BODY}]}}' +
  '{album_page?{[{UI_ALBUM_BODY}]}}' +
'</div>' +
'<div class="clear"></div>',
  UI_PROFILE_BODY:
'<div id="profile_page" class="page_content">' +
'<h1>{user_fullname}</h1>' +
'{user_status?{[<div class="user_status">{user_status}</div>]}}' +
'{show_user_info?{[<dl>' +
  '{user_birthday?{[<dt>Birthday:</dt><dd>{user_birthday}</dd>]}}' +
  '{user_relation?{[<dt>Relationship status:</dt><dd>{user_relation}</dd>]}}' +
'</dl>]}}' +
'{show_more_user_info?{[<div class="show_more"><a href="#" onclick="return false;">Show more about {user_firstname}</a></div>]}}' +
'{show_photos?{[' +
  '<div class="content_header"><a href="{all_photos_link}" class="all_link" onclick="return app.nav(this);">View all Photos</a><h4>Photos</h4></div>' +
  '<div class="photos_tiles clearfix">{photos::UI_PHOTO_TILE}</div>' +
']}}' +
'{show_posts?{[' +
  '<div class="content_header">{can_post?{[<div class="post_field"><textarea>Write a public message...</textarea></div>]}:{[<h4>Wall</h4>]}}</div>' +
  '<div class="wall_posts">' +
    '{posts::UI_WALL_POST}' +
    '{show_more_posts?{[<div class="show_more"><a href="#" onclick="return false;">previous posts</a></div>]}}' +
  '</div>' +
']}}</div>',
  UI_ALBUM_BODY:
'<div class="page_header">' +
  '<div class="photos_header">' +
    '<span id="photos_count_label">{photos_count}</span>' +
    '<span id="albums_count_label"><a href="#" onclick="return false;">{albums_count}</a></span>' +
  '</div>' +
  '<button onclick="app.nav(\'{profile_link}\');"><span>&lsaquo;</span><div>Back to Profile</div></button>' +
'</div>' +
'<div id="album_page" class="page_content">' +
  '<div class="photos_tiles clearfix">' +
    '{photos::UI_PHOTO_TILE}' +
    '{show_more_photos?{[<div class="show_more"><a href="#" onclick="return false;">show more photos</a></div>]}}' +
  '</div>' +
'</div>',
  UI_WALL_POST:
'<div class="wall_post{i:{[ first]}}">' +
  '<div class="image_column">' +
    '<a href="{user_link}" onclick="return app.nav(this);"><img src="{user_photo}" /></a>' +
  '</div>' +
  '<div class="post_column">' +
  '<a href="{user_link}" class="author" onclick="return app.nav(this);">{user_fullname}</a>' +
  '<div class="text">{text}</div>' +
  '{show_attachments?{[<div class="media_tiles clearfix">{attachments::UI_MEDIA_TILE}</div>]}}' +
  '<div class="like_count">{likes_count}</div>' +
  '<div class="links"><span class="date">{post_date}</span></div>' +
  '{show_comments?{[' +
    '{show_more_comments?{[<div class="show_more"><a href="#" onclick="return false;">{show_more_comments_label}</a></div>]}}' +
    '<div class="post_comments">{comments::UI_POST_COMMENT}</div>' +
  ']}}' +
  '</div>' +
'</div>',
  UI_POST_COMMENT:
'<div class="post_comment{i:{[ first]}}">' +
  '<div class="image_column">' +
    '<a href="{user_link}" onclick="return app.nav(this);"><img src="{user_photo}" /></a>' +
  '</div>' +
  '<div class="post_column">' +
    '<a href="{user_link}" class="author" onclick="return app.nav(this);">{user_fullname}</a>' +
    '<div class="text">{text}</div>' +
    '<div class="like_count">{likes_count}</div>' +
    '<div class="links">' +
      '<span class="date">{post_date}</span>' +
      '{reply_to_link?{[<span class="delim">-</span><a href="{reply_to_link}" class="reply_to" onclick="return false;">to {reply_to_firstname}</a>]}}' +
    '</div>' +
  '</div>' +
'</div>',
  UI_USER_TILE:
'<div class="user_tile">' +
  '<a href="{user_link}" onclick="return app.nav(this);"><img src="{user_photo}" /></a>' +
  '<a href="{user_link}" class="username" onclick="return app.nav(this);">{user_firstname}</a>' +
'</div>',
  UI_PHOTO_TILE:
'<div class="photo_tile">' +
  '<a href="{photo_link}"onclick="return app.nav(this);"><img src="{photo_src}" /></a>' +
'</div>',
  UI_MEDIA_TILE:
'<div class="media_tile">' +
  '<a href="{media_link}"onclick="return app.nav(this);"><img src="{media_src}" /></a>' +
'</div>'
};

var code_tpls = {
  CODE_USER_INFO_VARS:
'var ' +
'u=API.users.get({uid:"{user}",fields:"photo,screen_name,photo_big,activity,bdate,relation,counters,can_post,can_write_private_message"})[0],' +
'i=u.uid,' +
'uf=API.subscriptions.getFollowers({uid:i,count:3}),' +
'uu=uf.users[0]+","+uf.users[1]+","+uf.users[2],' +
'ru={' +
  'user:u,' +
  '{need_friends?{[{CODE_PROFILE_FRIENDS}]}}' +
  'news_count:API.wall.get({owner_id:i,count:1,filter:"owner"})[0],' +
  'photos:API.photos.getAll({owner_id:i,count:4}),' +
  'friends:API.friends.get({uid:i,fields:"photo,screen_name",count:18}),' +
  'followers:uf' +
'};',
  CODE_PROFILE_INFO_VARS:
'var ' +
'pi={user_id},' +
'pp=API.wall.get({owner_id:pi,count:10,extended:1}),' +
'w=pp.wall,' +
'c=[' +
  'API.wall.getComments({owner_id:pi,post_id:w[1].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:pi,post_id:w[2].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:pi,post_id:w[3].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:pi,post_id:w[4].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:pi,post_id:w[5].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:pi,post_id:w[6].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:pi,post_id:w[7].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:pi,post_id:w[8].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:pi,post_id:w[9].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:pi,post_id:w[10].id,sort:"desc",count:3})' +
'],' +
'pu=' +
  'c[0][1].uid+","+c[0][2].uid+","+c[0][3].uid+","+' +
  'c[1][1].uid+","+c[1][2].uid+","+c[1][3].uid+","+' +
  'c[2][1].uid+","+c[2][2].uid+","+c[2][3].uid+","+' +
  'c[3][1].uid+","+c[3][2].uid+","+c[3][3].uid+","+' +
  'c[4][1].uid+","+c[4][2].uid+","+c[4][3].uid+","+' +
  'c[5][1].uid+","+c[5][2].uid+","+c[5][3].uid+","+' +
  'c[6][1].uid+","+c[6][2].uid+","+c[6][3].uid+","+' +
  'c[7][1].uid+","+c[7][2].uid+","+c[7][3].uid+","+' +
  'c[8][1].uid+","+c[8][2].uid+","+c[8][3].uid+","+' +
  'c[9][1].uid+","+c[9][2].uid+","+c[9][3].uid+","+' +
  'c[0][1].reply_to_uid+","+c[0][2].reply_to_uid+","+' +
  'c[0][3].reply_to_uid+","+c[1][1].reply_to_uid+","+' +
  'c[1][2].reply_to_uid+","+c[1][3].reply_to_uid+","+' +
  'c[2][1].reply_to_uid+","+c[2][2].reply_to_uid+","+' +
  'c[2][3].reply_to_uid+","+c[3][1].reply_to_uid+","+' +
  'c[3][2].reply_to_uid+","+c[3][3].reply_to_uid+","+' +
  'c[4][1].reply_to_uid+","+c[4][2].reply_to_uid+","+' +
  'c[4][3].reply_to_uid+","+c[5][1].reply_to_uid+","+' +
  'c[5][2].reply_to_uid+","+c[5][3].reply_to_uid+","+' +
  'c[6][1].reply_to_uid+","+c[6][2].reply_to_uid+","+' +
  'c[6][3].reply_to_uid+","+c[7][1].reply_to_uid+","+' +
  'c[7][2].reply_to_uid+","+c[7][3].reply_to_uid+","+' +
  'c[8][1].reply_to_uid+","+c[8][2].reply_to_uid+","+' +
  'c[8][3].reply_to_uid+","+c[9][1].reply_to_uid+","+' +
  'c[9][2].reply_to_uid+","+c[9][3].reply_to_uid,' +
'rp={' +
  'posts:pp,' +
  'comments:c' +
'};',
  CODE_ALBUM_INFO_VARS:
'var ' +
'ai={user_id},' +
'ra={' +
  'albums_count:API.getProfiles({uid:ai,fields:"counters"})[0].counters.albums,' +
  'photos:API.photos.getAll({owner_id:ai,count:40})' +
'};',
  CODE_PROFILE_PAGE:
'{CODE_USER_INFO_VARS}' +
'{CODE_PROFILE_INFO_VARS}' +
'return{' +
  'info:ru,' +
  'wall:rp,' +
  'profiles:API.users.get({uids:uu+","+pu,fields:"photo,screen_name"})' +
'};',
  CODE_ALBUM_PAGE:
'{CODE_USER_INFO_VARS}' +
'{CODE_ALBUM_INFO_VARS}' +
'return{' +
  'info:ru,' +
  'album:ra,' +
  'profiles:API.users.get({uids:uu,fields:"photo,screen_name"})' +
'};',
  CODE_PROFILE:
'var ' +
'z="photo,screen_name",' +
'u=API.users.get({uid:"{user_id}",fields:z+",photo_big,activity,bdate,relation,counters,can_post,can_write_private_message"})[0],' +
'i=u.uid,' +
'f=API.subscriptions.getFollowers({uid:i,count:3}),' +
'p=API.wall.get({owner_id:i,count:10,extended:1}),' +
'w=p.wall,' +
'c=[' +
  'API.wall.getComments({owner_id:i,post_id:w[1].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:i,post_id:w[2].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:i,post_id:w[3].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:i,post_id:w[4].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:i,post_id:w[5].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:i,post_id:w[6].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:i,post_id:w[7].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:i,post_id:w[8].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:i,post_id:w[9].id,sort:"desc",count:3}),' +
  'API.wall.getComments({owner_id:i,post_id:w[10].id,sort:"desc",count:3})' +
'];' +
'return{' +
  'user:u,' +
  '{need_friends?{[{CODE_PROFILE_FRIENDS}]}}' +
  'news_count:API.wall.get({owner_id:i,count:1,filter:"owner"})[0],' +
  'photos:API.photos.getAll({owner_id:i,count:4}),' +
  'friends:API.friends.get({uid:i,fields:z,count:18}),' +
  'followers:f,' +
  'posts:p,' +
  'comments:c,' +
  'profiles:API.users.get({' +
    'uids:' +
      'f.users[0]+","+f.users[1]+","+f.users[2]+","+' +
      'c[0][1].uid+","+c[0][2].uid+","+c[0][3].uid+","+' +
      'c[1][1].uid+","+c[1][2].uid+","+c[1][3].uid+","+' +
      'c[2][1].uid+","+c[2][2].uid+","+c[2][3].uid+","+' +
      'c[3][1].uid+","+c[3][2].uid+","+c[3][3].uid+","+' +
      'c[4][1].uid+","+c[4][2].uid+","+c[4][3].uid+","+' +
      'c[5][1].uid+","+c[5][2].uid+","+c[5][3].uid+","+' +
      'c[6][1].uid+","+c[6][2].uid+","+c[6][3].uid+","+' +
      'c[7][1].uid+","+c[7][2].uid+","+c[7][3].uid+","+' +
      'c[8][1].uid+","+c[8][2].uid+","+c[8][3].uid+","+' +
      'c[9][1].uid+","+c[9][2].uid+","+c[9][3].uid+","+' +
      'c[0][1].reply_to_uid+","+c[0][2].reply_to_uid+","+' +
      'c[0][3].reply_to_uid+","+c[1][1].reply_to_uid+","+' +
      'c[1][2].reply_to_uid+","+c[1][3].reply_to_uid+","+' +
      'c[2][1].reply_to_uid+","+c[2][2].reply_to_uid+","+' +
      'c[2][3].reply_to_uid+","+c[3][1].reply_to_uid+","+' +
      'c[3][2].reply_to_uid+","+c[3][3].reply_to_uid+","+' +
      'c[4][1].reply_to_uid+","+c[4][2].reply_to_uid+","+' +
      'c[4][3].reply_to_uid+","+c[5][1].reply_to_uid+","+' +
      'c[5][2].reply_to_uid+","+c[5][3].reply_to_uid+","+' +
      'c[6][1].reply_to_uid+","+c[6][2].reply_to_uid+","+' +
      'c[6][3].reply_to_uid+","+c[7][1].reply_to_uid+","+' +
      'c[7][2].reply_to_uid+","+c[7][3].reply_to_uid+","+' +
      'c[8][1].reply_to_uid+","+c[8][2].reply_to_uid+","+' +
      'c[8][3].reply_to_uid+","+c[9][1].reply_to_uid+","+' +
      'c[9][2].reply_to_uid+","+c[9][3].reply_to_uid,' +
    'fields:z' +
  '})' +
'};',
  CODE_PROFILE_FRIENDS:
'friends_uids:API.friends.get({uid:API.getViewerId()}),'
};

var tpl = (function() {
  var re = /\{([a-z_0-9]+)(?:::([A-Z_0-9]+))?(?:\?\{\[([^{\[\]}]+)\]\})?(?::\{\[([^{\[\]}]+)\]\})?\}/gi,
      escapeChars = '{[?:]}',
      unescapeChars = {'{': 0, '[': 1, '?': 2, ':': 3, ']': 4, '}': 5};
  function escapeVal(val) {
    return val.toString().replace(/[{\[?:\]}]/g, function(s) { return '@@' + unescapeChars[s] + '@@'; });
  }
  function unescapeVal(val) {
    return val.toString().replace(/@@(\d+)@@/g, function(s, i) { return escapeChars.charAt(i); });
  }
  function ref(data, s, data_key, value_tpl, if_value, else_value) {
    var value = data[data_key] || '';
    if (value_tpl) return escapeVal(this.get(value_tpl, value, true));
    if (if_value || else_value) return (value ? if_value : else_value) || '';
    return escapeVal(value) || this[data_key] && escapeVal(this.get(data_key, data, true)) || '';
  }
  function get_ref(data) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(data);
      return ref.apply(tpl, args);
    }
  }
  
  return {
    get: function(_tpl, data, esc) {
      if (isArray(data)) {
        var html = '';
        for (var i = 0, l = data.length; i < l; i++) {
          html += this.get(_tpl, extend({i: i}, data[i]), true);
        }
        return esc ? html : unescapeVal(html);
      }
      if (this[_tpl]) _tpl = this[_tpl];
      if (typeof _tpl !== 'string') return '';
      do {
        var before = _tpl;
        _tpl = before.replace(re, get_ref(data || {}));
      } while (before !== _tpl);
      return esc ? _tpl : unescapeVal(_tpl);
    }
  };
})();

tpl = extend(tpl, ui_tpls, code_tpls);