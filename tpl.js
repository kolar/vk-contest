var ui_tpls = {
  UI_CONTAINER:
'<div class="back2top" onclick="app.scrollToTop();"><div>Back to Top</div></div>' +
'<div id="page_header_bg">' +
  '<div class="pin" onclick="hasClass(\'header_fixed\', document.body) ? (removeClass(\'header_fixed\', document.body), this.innerHTML = \'Pin\') : (addClass(\'header_fixed\', document.body), this.innerHTML = \'Unpin\'); onBodyScroll(true);">Unpin</div>' +
  '<div id="page_header">' +
    '<a href="/" class="left_side" onclick="return app.nav(this, event);">' +
      '<div class="icon"></div>' +
      '<div class="title">{viewer_fullname}</div>' +
    '</a>' +
    '<div class="right_side">' +
      '<div class="top_search"><input id="header_search" type="text" placeholder="Search..." value="" /></div>' +
      '<ul class="top_links">' +
        '<li><a href="/feed" onclick="return false;">Newsfeed</a></li>' +
        '<li><a href="/support" onclick="return false;">Feedback</a></li>' +
        '<li><a href="/mail" onclick="return false;">Messages</a></li>' +
      '</ul>' +
    '</div>' +
  '</div>' +
'</div>' +
'<div id="content">{UI_CONTENT}</div>',
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
  '{news_cnt?{[<div class="profile_counter"><a href="/feed" class="counter_bg" onclick="return false;"><span class="label">News</span><span>{news_cnt}</span></a></div>]}}' +
  '{photos_cnt?{[<div id="photos_counter" class="profile_counter"><a href="{all_photos_link}" class="counter_bg" onclick="return app.nav(this, event);"><span class="label">Photos</span><span>{photos_cnt}</span></a></div>]}}' +
  '{videos_cnt?{[<div class="profile_counter"><a href="/video" class="counter_bg" onclick="return false;"><span class="label">Videos</span><span>{videos_cnt}</span></a></div>]}}' +
  '{audios_cnt?{[<div class="profile_counter"><a href="/audio" class="counter_bg" onclick="return false;"><span class="label">Audio files</span><span>{audios_cnt}</span></a></div>]}}' +
  '<div id="ff_block">' +
  '{ff_counters_block?{[<hr />]}}' +
  '{friends_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="/friends" class="label" onclick="return false;">Friends</a><span>{friends_cnt}</span></div></div>]}}' +
  '{show_friends?{[<div class="users_tiles clearfix">{friends::UI_USER_TILE}</div>]}}' +
  '{followers_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="/followers" class="label" onclick="return false;">Followers</a><span>{followers_cnt}</span></div></div>]}}' +
  '{show_followers?{[<div class="users_tiles clearfix">{followers::UI_USER_TILE}</div>]}}' +
  '</div>' +
'</div>' +
'<div id="page_body" class="right_column">' +
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
'{show_more_user_info?{[<div class="show_more_about"><a href="" onclick="return false;">Show more about {user_firstname}</a></div>]}}' +
'{show_photos?{[' +
  '<div class="content_header"><a href="{all_photos_link}" class="all_link" onclick="return app.nav(this, event);">View all Photos</a><h4>Photos</h4></div>' +
  '<div class="photos_tiles clearfix">{photos::UI_PHOTO_TILE}</div>' +
']}}' +
'{show_posts?{[' +
  '<div class="content_header">{can_post?{[<div class="post_field"><textarea id="post_field" placeholder="Write a public message..."></textarea></div>]}:{[<h4>Wall</h4>]}}</div>' +
  '<div class="wall_posts">' +
    '{posts::UI_WALL_POST}' +
    '{show_more_posts?{[<div class="show_more posts"><a href="" onclick="return app.showMorePosts();">previous posts</a></div>]}}' +
  '</div>' +
']}}</div>',
  UI_ALBUM_BODY:
'<div class="page_header">' +
  '<div class="photos_header">' +
    '<span id="photos_count_label">{photos_count}</span>' +
    '<span id="albums_count_label"><a href="/albums" onclick="return false;">{albums_count}</a></span>' +
  '</div>' +
  '<button onclick="app.nav(\'{profile_link}\');"><span>&lsaquo;</span><div>Back to Profile</div></button>' +
'</div>' +
'<div id="album_page" class="page_content">' +
  '<div class="photos_tiles clearfix">' +
    '{all_photos::UI_PHOTO_TILE}' +
  '</div>' +
  '{show_more_photos?{[<div class="show_more photos"><a href="" onclick="return app.showMorePhotos();">show more photos</a></div>]}}' +
'</div>',
  UI_WALL_POST:
'<div class="wall_post{i:{[ first]}}">' +
  '<div class="image_column">' +
    '<a href="{user_link}" onclick="return app.nav(this, event);"><img src="{user_photo}" /></a>' +
  '</div>' +
  '<div class="post_column">' +
  '<a href="{user_link}" class="author" onclick="return app.nav(this, event);">{user_fullname}</a>' +
  '{profile_photo_updated?{[<span class="explain">updated her profile picture:</span>]}}' +
  '{repost?{[{repost::UI_WALL_REPOST_INFO}]}}' +
  '<div class="text">{text}</div>' +
  '{show_attachments?{[<div class="media_tiles{one_media?{[ one_media]}} clearfix">{attachments::UI_MEDIA_TILE}</div>]}}' +
  '{likes_count?{[<div class="like_count">{likes_count}</div>]}}' +
  '<div class="links"><span class="date">{post_date}</span></div>' +
  '{show_comments?{[' +
    '{show_more_comments?{[<div class="show_more comments">{UI_SM_COMMENTS_LINK}</div>]}}' +
    '<div class="post_comments">{comments::UI_POST_COMMENT}</div>' +
  ']}}' +
  '</div>' +
'</div>',
  UI_WALL_REPOST_INFO:
'<div class="repost">' +
  '<a href="{user_link}" class="repost_image" onclick="return app.nav(this, event);"><img src="{user_photo}" /></a>' +
  '<div class="repost_info">' +
    '<a href="{user_link}" class="author" onclick="return app.nav(this, event);">{user_fullname}</a>' +
    '<div class="date">{post_date}</div>' +
  '</div>' +
'</div>',
  UI_SM_COMMENTS_LINK:
'<a href="" onclick="return app.shComments(this, {post_id}, {show});">{show?{[Show {show_more_comments_label}]}:{[Hide comments]}}</a>',
  UI_TEXT_CUT:
'<span class="cut">{cut_text}</span><a href="" onclick="addClass(\'hide_cut\', this.parentNode); return false;">show all..</a><span>{full_text}</span>',
  UI_POST_COMMENT:
'<div id="{comment_id}" class="post_comment{i:{[ first]}}">' +
  '<div class="image_column">' +
    '<a href="{user_link}" onclick="return app.nav(this, event);"><img src="{user_photo}" /></a>' +
  '</div>' +
  '<div class="post_column">' +
    '<a href="{user_link}" class="author" onclick="return app.nav(this, event);">{user_fullname}</a>' +
    '<div class="text">{text}</div>' +
    '{likes_count?{[<div class="like_count">{likes_count}</div>]}}' +
    '<div class="links">' +
      '<span class="date">{post_date}</span>' +
      '{reply_to_link?{[<span class="delim">-</span><a href="{reply_to_link}" class="reply_to"{reply_onclick?{[ onclick="{reply_onclick}"]}}>{reply_to_firstname}</a>]}}' +
    '</div>' +
  '</div>' +
'</div>',
  UI_USER_TILE:
'<div class="user_tile">' +
  '<a href="{user_link}" onclick="return app.nav(this, event);"><img src="{user_photo}" /></a>' +
  '<a href="{user_link}" class="username" onclick="return app.nav(this, event);">{user_firstname}</a>' +
'</div>',
  UI_PHOTO_TILE:
'<div class="photo_tile">' +
  '<a href="{photo_link}"{onclick?{[ onclick="{onclick}"]}}><img src="{photo_src}" /></a>' +
'</div>',
  UI_MEDIA_TILE:
'<div class="media_tile {media_type}">' +
  '{photo?{[{photo::UI_MEDIA_PHOTO_TILE}]}}' +
  '{graffiti?{[{graffiti::UI_MEDIA_GRAFFITI_TILE}]}}' +
  '{video?{[{video::UI_MEDIA_VIDEO_TILE}]}}' +
  '{audio?{[{audio::UI_MEDIA_AUDIO_TILE}]}}' +
  '{note?{[{note::UI_MEDIA_NOTE_TILE}]}}' +
  '{doc?{[{doc::UI_MEDIA_DOC_TILE}]}}' +
  '{link?{[{link::UI_MEDIA_LINK_TILE}]}}' +
'</div>',
  UI_MEDIA_PHOTO_TILE:
'<a href="{link}" onclick="{onclick}"><img src="{src}" /></a>',
  UI_MEDIA_GRAFFITI_TILE:
'<a href="{link}" target="_blank" /><img src="{src}" /></a>',
  UI_MEDIA_VIDEO_TILE:
'<a href="{link}" target="_blank" />{duration?{[<span>{duration}</span>]}}<img src="{src}" /></a>',
  UI_MEDIA_AUDIO_TILE:
'<a href="{link}" target="_blank" /><span class="performer">{performer}</span> - <span>{title}</span></a>',
  UI_MEDIA_NOTE_TILE:
'<a href="{link}" target="_blank" /><span class="explain">Note</span><span class="title">{title}</span></a>',
  UI_MEDIA_DOC_TILE:
'<a href="{link}" target="_blank" /><span class="explain">File</span><span class="title">{title}</span></a>',
  UI_MEDIA_LINK_TILE:
'<a href="{url}" target="_blank" /><span class="explain">Link:</span><span class="title">{title}</span></a>',
  UI_PHOTO_VIEW:
'<div id="pv_bg"></div>' +
'<div id="pv_layout">' +
  '<div id="pv_container">' +
    '<div class="photo_nav left" onclick="photo.prev();"><div></div></div>' +
    '<div class="photo_nav close" onclick="photo.close();"><div></div></div>' +
    '<div id="photo_container" class="clearfix">' +
      '<a class="photo_box" onmousedown="return photo.next(event);" onclick="return isSpecialClick(event);">' +
        '<div class="photo_frame">' +
          '<div class="img"><img alt="" /></div>' +
        '</div>' +
      '</a>' +
      '<div class="photos_summary"></div>' +
      '<div class="photo_desc"></div>' +
    '</div>' +
  '</div>' +
  '<div><!-- Opera margin-bottom fix --></div>' +
'</div>'
};

var code_tpls = {
  CODE_VIEWER_INFO_VARS:
'var ' +
'vi=API.getViewerId(),' +
'vf=API.friends.get({uid:vi}),' +
'vp=API.users.get({uid:vi,fields:"screen_name"})[0],' +
'rv={' +
  'profile:vp,' +
  'friends:vf' +
'};',
  CODE_USER_INFO_VARS:
'var ' +
'u=API.users.get({uid:"{user}",fields:"photo,screen_name,photo_big,activity,bdate,relation,counters,can_post,can_write_private_message"})[0],' +
'i=u.uid,' +
'uf=API.subscriptions.getFollowers({uid:i,count:3}),' +
'uu=uf.users,' +
'ru={' +
  'user:u+{counters:u.counters+{news:API.wall.get({owner_id:i,count:1,filter:"owner"})[0]}},' +
  '{need_friends?{[{CODE_PROFILE_FRIENDS}]}}' +
  'photos:API.photos.getAll({owner_id:i,count:4,extended:1}),' +
  'friends:API.friends.get({uid:i,fields:"photo,screen_name",count:18}),' +
  'followers:uf' +
'};',
  CODE_PROFILE_INFO_VARS:
'var ' +
'pp=API.wall.get({owner_id:i,offset:{posts_offset?{["{posts_offset}"]}:{[0]}},count:10,extended:1}),' +
'w=pp.wall,' +
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
'],' +
'rd=API.wall.getById({posts:' +
  'w[1].copy_owner_id+"_"+w[1].copy_post_id+","+' +
  'w[2].copy_owner_id+"_"+w[2].copy_post_id+","+' +
  'w[3].copy_owner_id+"_"+w[3].copy_post_id+","+' +
  'w[4].copy_owner_id+"_"+w[4].copy_post_id+","+' +
  'w[5].copy_owner_id+"_"+w[5].copy_post_id+","+' +
  'w[6].copy_owner_id+"_"+w[6].copy_post_id+","+' +
  'w[7].copy_owner_id+"_"+w[7].copy_post_id+","+' +
  'w[8].copy_owner_id+"_"+w[8].copy_post_id+","+' +
  'w[9].copy_owner_id+"_"+w[9].copy_post_id+","+' +
  'w[10].copy_owner_id+"_"+w[10].copy_post_id}),' + 
'pu=' +
  'c[0]@.uid+c[1]@.uid+c[2]@.uid+c[3]@.uid+c[4]@.uid+' +
  'c[5]@.uid+c[6]@.uid+c[7]@.uid+c[8]@.uid+c[9]@.uid,' +
'gu=c[0]@.reply_to_uid+c[1]@.reply_to_uid+' +
  'c[2]@.reply_to_uid+c[3]@.reply_to_uid+' +
  'c[4]@.reply_to_uid+c[5]@.reply_to_uid+' +
  'c[6]@.reply_to_uid+c[7]@.reply_to_uid+' +
  'c[8]@.reply_to_uid+c[9]@.reply_to_uid,' +
'rp=pp+{wall:w,comments:c,dat_profiles:API.users.get({uids:[1]+gu,fields:"screen_name",name_case:"dat"}),reposts_date:rd};',
  CODE_ALBUM_INFO_VARS:
'var ' +
'ra={' +
  'albums_count:API.users.get({uid:i,fields:"counters"})[0].counters.albums,' +
  'photos:API.photos.getAll({owner_id:i,count:100,extended:1})' +
'};',
  CODE_Z_ALL_VARS:
'var ' +
'tp=API.photos.getById({photos:"{target_id}"})[0],' +
'p1=API.photos.getAll({owner_id:"{owner_id}",offset:"{offset}",count:100,extended:1}),' +
'p2=API.photos.getAll({owner_id:"{owner_id}",count:100,extended:1}),' +
'rz={z:{' +
  'target:tp,' +
  'source:p1,' +
  'source_start:p2' +
'}};',
  CODE_PHOTOS_GET_FROM_ALL:
'return[{items::CODE_PHOTOS_GET_ITEM}];',
  CODE_PHOTOS_GET_ITEM:
'{i?{[,]}}{' +
  'offset:"{offset}",' +
  'photos:API.photos.getAll({owner_id:"{owner_id}",offset:"{offset}",count:100,extended:1})' +
'}',
  CODE_PHOTOS_GET_FROM_WALL:
'return API.photos.getById({photos:"{photos}"});',
  CODE_Z_WALL_VARS:
'var ' +
'tp=API.photos.getById({photos:"{target_id}"})[0],' +
'wp=API.wall.getById({posts:"{source_id}"})[0].attachments,' +
'rz={z:{' +
  'target:tp,' +
  'source:wp@.photo+wp@.posted_photo' +
'}};',
  CODE_PROFILE_PAGE:
'{need_viewer?{[{CODE_VIEWER_INFO_VARS}]}}' +
'{CODE_USER_INFO_VARS}' +
'{CODE_PROFILE_INFO_VARS}' +
'{z_wall?{[{z_wall::CODE_Z_WALL_VARS}]}}' +
'{z_all?{[{z_all::CODE_Z_ALL_VARS}]}}' +
'return{' +
  'info:ru,' +
  'posts:rp,' +
  'profiles:API.users.get({uids:uu+pu,fields:"photo,screen_name"})' +
  '{need_viewer?{[,viewer:rv]}}' +
'}{z_wall?{[+rz]}}{z_all?{[+rz]}};',
  CODE_PROFILE_INFO_ONLY:
'var i="{user_id}";' +
'{CODE_PROFILE_INFO_VARS}' +
'return{' +
  'posts:rp,' +
  'profiles:API.users.get({uids:pu,fields:"photo,screen_name"})' +
'};',
  CODE_ALBUM_PAGE:
'{need_viewer?{[{CODE_VIEWER_INFO_VARS}]}}' +
'{CODE_USER_INFO_VARS}' +
'{CODE_ALBUM_INFO_VARS}' +
'{z_wall?{[{z_wall::CODE_Z_WALL_VARS}]}}' +
'{z_all?{[{z_all::CODE_Z_ALL_VARS}]}}' +
'return{' +
  'info:ru,' +
  'album:ra,' +
  'profiles:API.users.get({uids:uu,fields:"photo,screen_name"})' +
  '{need_viewer?{[,viewer:rv]}}' +
'}{z_wall?{[+rz]}}{z_all?{[+rz]}};',
  CODE_ALBUM_INFO_ONLY:
'var i="{user_id}";' +
'{CODE_ALBUM_INFO_VARS}' +
'return{' +
  'album:ra' +
'};',
  CODE_COMMENTS:
'var c=API.wall.getComments({owner_id:"{owner_id}",post_id:"{post_id}",sort:"desc",count:{all?{[100]}:{[3]}}});' +
'return{' +
'comments:c,' +
'profiles:API.users.get({uids:c@.uid,fields:"photo,screen_name"}),' +
'dat_profiles:API.users.get({uids:[1]+c@.reply_to_uid,fields:"screen_name",name_case:"dat"})' +
'};',
  CODE_ALBUM_PHOTOS:
'return API.photos.getAll({owner_id:{owner_id},offset:{offset},count:100,extended:1});',
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
    var value = (typeof data[data_key] === 'undefined') ? '' : data[data_key];
    if (value_tpl) return escapeVal(this.get(value_tpl, value, true));
    if (if_value || else_value) return (value ? if_value : else_value) || '';
    if (typeof value === 'number') return value;
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