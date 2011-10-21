var fixMask = false;
function maskOn(num, mode, over) {
  if (fixMask && over) return;
  if (!over) fixMask = true;
  ge('mask1').className = 'contest_mask ' + (num == 1 ? mode : 'off');
  ge('mask2').className = 'contest_mask ' + (num == 2 ? mode : 'off');
  ge('mask3').className = 'contest_mask ' + (num == 3 ? mode : 'off');
  ge('masks_wrapper').className = '';
}
function maskOff(out) {
  if (fixMask && out) return;
  ge('masks_wrapper').className = 'off';
  fixMask = false;
}
/************************************************************************************/

(function(window){
  var readyBound = false, bindReady = function() {
    if (readyBound) return;
    readyBound = true;
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee, false);
        ready();
      }, false );
    } else if (document.attachEvent) {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
          document.detachEvent('onreadystatechange', arguments.callee);
          ready();
        }
      });
    }
    if (window.addEventListener) {
      window.addEventListener('load', ready, false);
    } else if (window.attachEvent) {
      window.attachEvent('onload', ready);
    } else {
      window.onload = ready;
    }
  }, isReady = false, readyList = [], ready = function() {
    if (!isReady) {
      isReady = true;
      if (readyList) {
        var fn_temp = null;
        while (fn_temp = readyList.shift()) {
          fn_temp.call(document);
        }
        readyList = null;
      }
    }
  };
  function onDOMReady(fn) {
    bindReady();
    if (isReady) {
      fn.call(document);
    } else {
      readyList.push(fn);
    }
  };
  window.onDOMReady = onDOMReady;
})(window);

(function(window){
  var isReady = false, readyList = [];
  function onHeadReady(fn) {
    if (!fn) return;
    var head = document.getElementsByTagName('head')[0];
    if (fn.call) {
      if (isReady) {
        fn.call(document, head);
      } else {
        readyList.push(fn);
      }
    } else if (head) {
      isReady = true;
      for (var i = 0, l = readyList.length; i < l; i++) {
        readyList[i].call(document, head);
      }
      readyList = null;
    }
  };
  window.onHeadReady = onHeadReady;
})(window);


function ge(id) {
  return (typeof id === 'string') ? document.getElementById(id) : id;
}
function remove(o) {
  o = ge(o);
  if (o && o.parentNode) o.parentNode.removeChild(o);
}
function ce(tag, attr) {
  var el = document.createElement(tag);
  if (attr) {
    for (var k in attr) {
      el[k] = attr[k];
    }
  }
  return el;
}
function intval(value) {
  if (value === true) return 1;
  return parseInt(value) || 0;
}
function extend() {
  var args = Array.prototype.slice.call(arguments), obj = args.shift();
  if (!args.length) return obj;
  for (var i=0, l=args.length; i<l; i++) {
    for (var key in args[i]) {
      obj[key] = args[i][key];
    }
  }
  return obj;
}
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
function trim(text) { return (text || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ''); }
function htsc(str) { return str.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/\'/g,'&#39;').replace(/%/g,'&#37;'); }
function rehtsc(str) { return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,'\'').replace(/&#37;/g,'%'); }
function escapeRE(s) { return s ? s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1') : ''; }
function qs2obj(qs) {
  if (!qs) return {};
  var params = {}, params_arr = qs.toString().split('&');
  for (var i = 0, l = params_arr.length; i < l; i++) {
    var kv = params_arr[i].split('=');
    if (kv[0]) {
      params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
    }
  }
  return params;
}

function formatCnt(cnt) {
  return intval(cnt).toString().replace(/(\d)(?=(\d\d\d)+(\D|$))/g, '$1 ');
}
function numeric(num, arr) {
  return (num > 1 ? arr[1] || arr[0] : arr[0]).replace('%s', num);
}
function formatDate(timestamp, options) {
  var o = extend({
    serverTime: null,
    showDate: true, showTime: true, timeAgo: true,
    shortDate: true, shortMonth: true, shortYear: 6
  }, options || {});
  var d = new Date(timestamp*1000), n = o.serverTime ? new Date(o.serverTime * 1000) : new Date(),
      d_eq = function (d1, d2) { return d1.getDate()==d2.getDate() && d1.getMonth()==d2.getMonth() && d1.getYear()==d2.getYear(); },
      _dd = Math.round((n.getTime() - d.getTime())/1000), t15 = ['', 'one', 'two', 'three', 'four', 'five'],
      darr = [];
  if (o.showDate) {
    if (o.timeAgo) {
      var dd = _dd;
      if (dd < 5) return 'just_now';
      if (dd < 6) return numeric(dd, ['{sec} second ago', '{sec} seconds ago']).replace('{sec}', t15[dd]);
      if (dd < 60) return numeric(dd, ['{sec} second ago', '{sec} seconds ago']).replace('{sec}', dd);
      dd = Math.floor(dd / 60);
      if (dd < 6) return numeric(dd, ['{min} minute ago', '{min} minutes ago']).replace('{min}', t15[dd]);
      if (dd < 60) return numeric(dd, ['{min} minute ago', '{min} minutes ago']).replace('{min}', dd);
      dd = Math.floor(dd / 60);
      if (dd < 4) return numeric(dd, ['{hours} hour ago', '{hours} hours ago']).replace('{hours}', t15[dd]);
    }
    if (o.shortDate && d_eq(n, d)) {
      darr.push('today');
    } else {
      n.setDate(n.getDate()-1);
      if (o.shortDate && d_eq(n, d)) {
        darr.push('yesterday');
      } else {
        var dd = d.getDate(),
            dm = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()],
            dy = d.getFullYear();
        darr.push((o.shortMonth ? dm.substr(0, 3) + '.' : dm) + ' ' + dd + ',' + (o.shortYear ? (_dd > (o.shortYear * 2592000) ? ' ' + dy : '') : ' ' + dy));
      }
    }
  }
  if (o.showTime) {
    var th = d.getHours() % 12 || 12,
        tf = d.getHours() > 11 ? 'pm' : 'am',
        tm = d.getMinutes()<10 ? '0' + d.getMinutes() : d.getMinutes();
    darr.push(th + ':' + tm + ' ' + tf);
  }
  return darr.join(' at ');
}
function makeReplyLink(text, reply_to_uid, reply_to_cid) {
  if (!reply_to_uid) return text;
  return text ? text.toString().replace(new RegExp('^\\[(id' + intval(reply_to_uid) + ')\\|([^\\]]+)\\]'), '<a href="/$1#' + reply_to_cid + '" class="reply_to">$2</a>') : '';
}
function makeLinks(text) {
  if (!text) return '';
  text = text.toString();
  text = text.replace(/\[((?:id|club)[0-9]+)\|([^\]]+)\]/g, '<a href="/$1">$2</a>');
  text = text.replace(/https?:\/\/[a-z0-9+\$_-]+(\.[a-z0-9+\$_-]+)*(\/[a-z0-9+\$_-][^\s]*)*(:[0-9]+)?\/?([a-z+&?\$_.-][a-z0-9;:@\/&?%=+\$_.-]*)?(#[a-z_.-][a-z0-9+\$_.-]*)?/i, function(s) {
    return '<a href="' + s + '" target="_blank">' + (s.length > 55 ? s.substr(0, 52) + '...' : s) + '</a>';
  });
  return text;
}
function prepareText(text) {
  return makeLinks(text); // htsc(rehtsc(text))
}

var lang = {
  relation_names: ['', 'Single', 'In a Relationship', 'Engaged', 'Married', 'It&#39;s Complicated', 'Actively Searching', 'In love']
};


var cookie = (function() {
  var _cookies = null;
  function init() {
    _cookies = {};
    var cs = document.cookie.split(';');
    for (var i = 0, l = cs.length; i < l; i++) {
      var c = cs[i].split('=');
      _cookies[trim(c[0])] = unescape(trim(c[1]));
    }
  }
  
  return {
    set: function(name, value, expires, path, domain, secure) {
      if (!_cookies) init();
      if (!value) expires = new Date(0);
      if (!isNaN(expires)) expires = new Date(+expires * 1000);
      if (expires instanceof Date) expires = expires.toGMTString();
      document.cookie = name + '=' + escape(value || '') + 
        (expires ? '; expires=' + expires : '') + 
        (path ? '; path=' + path : '') + 
        (domain ? '; domain=' + domain : '') + 
        (secure ? '; secure' : '');
    },
    get: function(name) {
      if (!_cookies) init();
      return _cookies[name];
    }
  };
})();

var VK = (function() {
  var nextCallbackId = 0,
      ID_PREFIX = '_api_req';
  function deleteCallback(cid) {
    delete VK._callbacks[cid];
    remove(ID_PREFIX + cid);
  }
  function prepareUrl(url, params) {
    if (params) {
      var params_arr = [];
      for (var key in params) {
        params_arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
      }
      return params_arr.length ? url + '?' + params_arr.join('&') : url;
    } else {
      return url;
    }
  }
  
  return {
    _callbacks: {},
    viewer_id: cookie.get('viewer_id') || null,
    access_token: cookie.get('access_token') || null,
    api: function(method, params, callback) {
      if (typeof callback === 'undefined' && typeof params === 'function') {
        callback = params; params = {};
      }
      method = encodeURIComponent(method);
      params = params || {};
      if (this.access_token) {
        params.access_token = this.access_token;
      }
      var cid = ++nextCallbackId;
      this._callbacks[cid] = function(data) {
        console.dir(data);
        callback && callback(data);
        deleteCallback(cid);
      }
      params.callback = 'VK._callbacks[' + cid + ']';
      var url = prepareUrl('https://api.vkontakte.ru/method/' + method, params);
      onHeadReady(function(head) {
        head.appendChild(ce('script', {id: ID_PREFIX + cid, src: url, type: 'text/javascript'}));
      });
    }
  };
})();

var app = (function() {
  var is_history = !!(window.history && history.pushState),
      current_link = null;
  function nav(link, no_push) {
    if (!no_push && !is_history) return true;
    if (!link) return true;
    var push = link, path = '', params = {};
    if (typeof link !== 'string') {
      if (!link.pathname) return false;
      path = link.pathname;
      params = qs2obj(link.search.substr(1));
      push = link.pathname + link.search;
    } else {
      var pp = link.split('?');
      path = pp.shift();
      params = qs2obj(pp.join('?'));
    }
    if (no_push && current_link == push) return false;
    current_link = push;
    if (!no_push) {
      try {
        history.pushState(null, null, push);
      } catch (e) { return true; }
    }
    return processLink(path, params);
  }
  function processLink(path, params) {
    var m;
    if (path == '/') {
      app.openProfile(app.viewer_id);
    } else if (m = /^\/id([0-9]+)$/i.exec(path)) {
      app.openProfile(m[1]);
    } else if (m = /^\/photos([0-9]+)$/i.exec(path)) {
      app.openPhotos(m[1]);
    } else if (m = /^\/([a-z0-9_.]+)$/i.exec(path)) {
      app.openProfile(m[1]);
    } else {
      return true;
    }
    return false;
  }
  if (is_history) {
    window.addEventListener('popstate', function(e) {
      nav(location, true);
    }, false);
  }
  
  var current_user_info, current_user_id, viewers_friends = null, usersMap = {};
  function saveViewersFriends(friends_uids) {
    viewers_friends = {};
    for (var i = 0; i < friends_uids.length; i++) {
      viewers_friends[friends_uids[i]] = true;
    }
  }
  function isFriend(uid) {
    return viewers_friends && viewers_friends[uid] || false;
  }
  function saveUsers(uids) {
    if (!isArray(uids)) uids = [uids];
    for (var i = 0; i < uids.length; i++) {
      var user = uids[i];
      if (!usersMap[user.uid]) {
        usersMap[user.uid] = {
          screen_name: 'id' + user.uid
        };
      }
      extend(usersMap[user.uid], user, {
        name: user.first_name + ' ' + user.last_name
      });
    }
  }
  function getUser(uid) {
    return usersMap[uid] || {};
  }
  
  function parseUserInfo(info) {
    info.friends_uids && saveViewersFriends(info.friends_uids);
    var friends = [], followers = [], photos = [];
    
    var bd = (info.user.bdate || '').toString().split('.');
    if (bd.length > 1) {
      info.user.birthday = new Date(intval(bd[2]), intval(bd[1])-1, intval(bd[0]));
      info.user.bd_time = Math.floor(info.user.birthday.getTime() / 1000);
      info.user.bd_year = +bd[2] || 0;
    }
    info.user.relation_name = lang.relation_names[info.user.relation || 0];
    saveUsers(info.user);
    
    if (info.friends) {
      saveUsers(info.friends);
      var friends_data = info.friends.sort(function() { return Math.random() < 0.5 ? 1 : -1; }).slice(0, 6);
      for (var i = 0, l = friends_data.length; i < l; i++) {
        var id = friends_data[i].uid, u = getUser(id);
        friends.push({
          user_link: '/' + u.screen_name,
          user_photo: u.photo,
          user_firstname: u.first_name
        });
      }
    }
    if (info.followers) {
      for (var i = 0, l = info.followers.users.length; i < l; i++) {
        var id = info.followers.users[i], u = getUser(id);
        followers.push({
          user_link: '/' + u.screen_name,
          user_photo: u.photo,
          user_firstname: u.first_name
        });
      }
    }
    if (info.photos) {
      var photos_cnt = info.photos.shift() || 0;
      for (var i = 0, l = info.photos.length; i < l; i++) {
        var photo = info.photos[i];
        photos.push({
          photo_link: '/photo' + photo.owner_id + '_' + photo.pid,
          photo_src: photo.src
        });
      }
    }
    var profile = getUser(info.user.uid),
        my_profile = app.viewer_id == profile.uid,
        npva = info.news_count || photos_cnt || profile.counters.videos || profile.counters.audios,
        ff = profile.counters.friends || profile.counters.followers,
        user_birthday = profile.birthday && formatDate(profile.bd_time, {
          showTime: false, shortDate: false, shortMonth: false,
          shortYear: profile.bd_year ? 0 : 10000, timeNow: false
        }) || '';
    return {
      my_profile: my_profile,
      user_firstname: profile.first_name,
      user_fullname: profile.name,
      profile_photo: profile.photo_big,
      profile_link: '/' + profile.screen_name,
      can_write_pm: profile.can_write_private_message && !my_profile,
      is_friend: isFriend(profile.uid),
      npva_counters_block: npva && !my_profile,
      news_cnt: info.news_count && formatCnt(info.news_count),
      photos_cnt: photos_cnt && formatCnt(photos_cnt),
      videos_cnt: profile.counters.videos && formatCnt(profile.counters.videos),
      audios_cnt: profile.counters.audios && formatCnt(profile.counters.audios),
      ff_counters_block: ff && (npva || !my_profile),
      friends_cnt: profile.counters.friends && formatCnt(profile.counters.friends),
      show_friends: friends.length > 0,
      friends: friends,
      followers_cnt: profile.counters.followers && formatCnt(profile.counters.followers),
      show_followers: followers.length > 0,
      followers: followers,
      user_status: profile.activity,
      show_user_info: user_birthday || profile.relation_name,
      show_more_user_info: user_birthday || profile.relation_name,
      user_birthday: user_birthday,
      user_relation: profile.relation_name,
      show_photos: photos.length > 0,
      all_photos_link: '/photos' + profile.uid,
      photos: photos,
      can_post: profile.can_post
    };
  }
  function parseProfileInfo(wall) {
    var posts = [];
    if (wall.posts) {
      saveUsers(wall.posts.profiles);
      var posts_count = wall.posts.wall.shift() || 0;
      for (var i = 0; i < wall.posts.wall.length; i++) {
        var post = wall.posts.wall[i],
            cmnts = wall.comments[i] || [],
            from = getUser(post.from_id),
            attachments = [],
            comments_count = cmnts.shift() || 0,
            comments = [];
        if (post.attachments) {
          for (var j = 0; j < post.attachments.length; j++) {
            var media = post.attachments[j];
            if (media.type == 'photo') {
              attachments.push({
                media_link: '/photo' + media.photo.owner_id + '_' + media.photo.pid,
                media_src: media.photo.src
              });
            } else if (media.type == 'posted_photo') {
              attachments.push({
                media_link: '/photo' + media.posted_photo.owner_id + '_' + media.posted_photo.pid,
                media_src: media.posted_photo.src
              });
            } else if (media.type == 'graffiti') {
              attachments.push({
                media_link: '/graffiti' + media.graffiti.owner_id + '_' + media.graffiti.gid,
                media_src: media.graffiti.src
              });
            }
          }
        }
        for (var j = cmnts.length - 1; j >= 0; j--) {
          var comment = cmnts[j],
              user = getUser(comment.uid);
          comments.push(extend({
            user_link: '/' + user.screen_name,
            user_photo: user.photo,
            user_fullname: user.name,
            text: prepareText(makeReplyLink(comment.text, comment.reply_to_uid, comment.reply_to_cid)),
            post_date: formatDate(comment.date),
            reply_to_link: comment.reply_to_cid ? '#' + comment.reply_to_cid : '',
            reply_to_firstname: usersMap[comment.reply_to_uid] && usersMap[comment.reply_to_uid].first_name
          }, comments_count <= 3 ? {i:1} : {}));
        }
        posts.push({
          user_link: '/' + from.screen_name,
          user_photo: from.photo,
          user_fullname: from.name,
          text: prepareText(post.text),
          likes_count: post.likes.count,
          post_date: formatDate(post.date),
          show_attachments: attachments.length,
          attachments: attachments,
          show_comments: comments_count,
          show_more_comments: comments_count > 3,
          show_more_comments_label: 'Show all ' + comments_count + ' comments',
          comments: comments
        });
      }
    }
    return {
      posts: posts,
      show_posts: posts_count > 0,
      show_more_posts: posts_count > 10
    };
  }
  function parseAlbumInfo(album) {
    var photos = [];
    if (album.photos) {
      var photos_cnt = album.photos.shift() || 0;
      for (var i = 0, l = album.photos.length; i < l; i++) {
        var photo = album.photos[i];
        photos.push({
          photo_link: '/photo' + photo.owner_id + '_' + photo.pid,
          photo_src: photo.src
        });
      }
    }
    return {
      photos: photos,
      photos_count: numeric(photos_cnt, ['%s photo', '%s photos']),
      albums_count: numeric(album.albums_count || 0, ['%s album', '%s albums']),
      show_more_photos: photos_cnt > 40
    };
  }
  
  return {
    viewer_id: VK.viewer_id,
    nav: nav,
    user: getUser,
    openProfile: function(user) {
      this.getProfilePageInfo(user, function(html) {
        onDOMReady(function() {
          ge('container').innerHTML = html;
        });
      });
    },
    openPhotos: function(user) {
      this.getAlbumPageInfo(user, function(html) {
        onDOMReady(function() {
          ge('container').innerHTML = html;
        });
      });
    },
    getProfilePageInfo: function(user, callback) {
      var code = tpl.get(tpl.CODE_PROFILE_PAGE, {user: user, user_id: 'i', need_friends: !viewers_friends});
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return; // ToDo: error msg 'api error'
        if (!data.response.info.user) return; // ToDo: error msg 'user not found'
        var res = data.response,
            info = res.info,
            wall = res.wall,
            profiles = res.profiles;
        profiles && saveUsers(profiles);
        current_user_id = info.user.uid;
        var user_info = current_user_info = parseUserInfo(info);
        var wall_info = parseProfileInfo(wall);
        var tpl_data = extend({profile_page: true}, user_info, wall_info);
        var html = tpl.get(tpl.UI_CONTAINER, tpl_data);
        callback && callback(html);
      });
    },
    getAlbumPageInfo: function(user, callback) {
      var code = tpl.get(tpl.CODE_ALBUM_PAGE, {user: user, user_id: 'i', need_friends: !viewers_friends});
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return; // ToDo: error msg 'api error'
        if (!data.response.info.user) return; // ToDo: error msg 'user not found'
        var res = data.response,
            info = res.info,
            album = res.album,
            profiles = res.profiles;
        profiles && saveUsers(profiles);
        current_user_id = info.user.uid;
        var user_info = current_user_info = parseUserInfo(info);
        var album_info = parseAlbumInfo(album);
        var tpl_data = extend({album_page: true}, user_info, album_info);
        var html = tpl.get(tpl.UI_CONTAINER, tpl_data);
        callback && callback(html);
      });
    }
  };
})();
