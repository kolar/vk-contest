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
      window.htmlNode = geByTag1('html');
      window.bodyNode = geByTag1('body');
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
    var head = geByTag1('head');
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
function geByClass(className, elem, tagName) {
  elem = elem || document;
  tagName = tagName || '*';
  if (elem.getElementsByClassName) {
    var elems = elem.getElementsByClassName(className);
    if (tagName == '*') {
      return Array.prototype.slice.call(elems);
    } else {
      var res = [];
      tagName = tagName.toUpperCase();
      for (var i = 0, l = elems.length; i < l; i++) {
        if (elems[i].tagName.toUpperCase() == tagName) {
          res.push(elems[i]);
        }
      }
      return res;
    }
  }
  var elems = geByTag(tagName, elem);
  var res = [];
  var re = new RegExp('(^|\\s)' + escapeRE(className) + '(\\s|$)');
  for (var i = 0, l = elems.length; i < l; i++) {
    if (re.test(elems[i].className)) {
      res.push(elems[i]);
    }
  }
  return res;
}
function geByClass1(className, elem, tagName) {
  return geByClass(className, elem, tagName)[0];
}
function geByTag(tagName, elem) {
  return (elem || document).getElementsByTagName(tagName);
}
function geByTag1(tagName, elem) {
  return geByTag(tagName, elem)[0];
}
function hasClass(className, elem) {
  if (elem = ge(elem)) {
    return (new RegExp('(^|\\s)' + escapeRE(className) + '(\\s|$)')).test(elem.className);
  }
}
function addClass(className, elem) {
  if ((elem = ge(elem)) && !hasClass(className, elem)) {
    elem.className = (elem.className ? elem.className + ' ' : '') + className;
  }
}
function removeClass(className, elem) {
  if (elem = ge(elem)) {
    elem.className = (elem.className || '').replace(new RegExp('(^|\\s)' + escapeRE(className) + '(\\s|$)'), function(s, s1, s2){ return s1 && s2 ? ' ' : ''; });
  }
}
function before(o, b) {
  b = ge(b);
  b.parentNode && b.parentNode.insertBefore(ge(o), b);
}
function remove(o) {
  o = ge(o);
  o && o.parentNode && o.parentNode.removeChild(o);
}
function isSpecialClick(e) {
  return e && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || e.metaKey);
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
var cdf = (function(doc) {
  var frag = doc.createDocumentFragment(),
      elem = doc.createElement('div'),
      range = doc.createRange && doc.createRange();
  frag.appendChild(elem);
  range && range.selectNodeContents(elem);
  
  return range && range.createContextualFragment ?
    function (html) {
      if (!html) return doc.createDocumentFragment();
      return range.createContextualFragment(html);
    } :
    function (html) {
      if (!html) return doc.createDocumentFragment();
      elem.innerHTML = html;
      var frag = doc.createDocumentFragment();
      while (elem.firstChild) {
        frag.appendChild(elem.firstChild);
      }
      return frag;
    };
})(document);
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
        darr.push((o.shortMonth ? dm.substr(0, 3) + '.' : dm) + ' ' + dd + (o.shortYear ? (_dd > (o.shortYear * 2592000) ? ', ' + dy : (o.showTime ? ',' : '')) : ', ' + dy));
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
  return text ? text.toString().replace(new RegExp('^\\[id(' + intval(reply_to_uid) + ')\\|([^\\]]+)\\]'), '<a href="/' + app.user(reply_to_uid).screen_name + '" class="reply_to" onclick="return false;">$2</a>') : '';
}
function makeLinks(text) {
  if (!text) return '';
  text = text.toString();
  text = text.replace(/\[((?:id|club)[0-9]+)\|([^\]]+)\]/g, '<a href="/$1">$2</a>');
  //text = text.replace(/https?:\/\/[a-z0-9+\$_-]+(\.[a-z0-9+\$_-]+)*(\/[a-z0-9+\$_-][^\s]*)*(:[0-9]+)?\/?([a-z+&?\$_.-][a-z0-9;:@\/&?%=+\$_.-]*)?(#[a-z_.-][a-z0-9+\$_.-]*)?/i, function(s) {
  text = text.replace(/\b(?:(?:https?):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i, function(s) {
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
  function rnd() {
    return Math.random().toString(36).substr(-8);
  }
  
  return {
    _callbacks: {},
    viewer_id: +cookie.get('viewer_id') || null,
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
        console.log(cid + ': ', data);
        callback && callback(data);
        deleteCallback(cid);
      }
      params.rnd = rnd();
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
      current = {};
  function nav(link, e, o) {
    o = extend({no_push: false, push_only: false, replace: false}, o);
    if (isSpecialClick(e)) return true;
    if (!o.no_push && !is_history) return true;
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
    if (o.no_push && current.link == push) return false;
    if (!o.no_push && current.link != push) {
      try {
        o.replace ? history.replaceState(null, null, push) : history.pushState(null, null, push);
      } catch (e) { return true; }
    }
    current.link = push;
    return o.push_only ? false : processLink(path, params, o.no_push);
  }
  function processLink(path, params, no_push) {
    var m;
    if (path == '/') {
      app.openProfile(app.viewer_id, params, no_push);
    } else if (m = /^\/id([0-9]+)$/i.exec(path)) {
      app.openProfile(m[1], params, no_push);
    } else if (m = /^\/photos([0-9]+)$/i.exec(path)) {
      app.openPhotos(m[1], params, no_push);
    } else if (m = /^\/(photo([0-9]+)_[0-9]+)$/i.exec(path)) {
      app.openPhotos(m[2], extend({z: m[1] + '/photos' + m[2]}, params), no_push);
    } else if (m = /^\/([a-z0-9_.]+)$/i.exec(path)) {
      app.openProfile(m[1], params, no_push);
    } else {
      return true;
    }
    return false;
  }
  if (is_history) {
    window.addEventListener('popstate', function(e) {
      nav(location, null, {no_push: true});
    }, false);
  }
  
  var viewers_friends = null, usersMap = {};
  function saveViewersFriends(friends_uids) {
    viewers_friends = {};
    for (var i = 0; i < friends_uids.length; i++) {
      viewers_friends[friends_uids[i]] = true;
    }
  }
  function isFriend(uid) {
    return viewers_friends && viewers_friends[uid] || false;
  }
  function saveUsers(uids, name_case) {
    if (!isArray(uids)) uids = [uids];
    for (var i = 0; i < uids.length; i++) {
      var user = uids[i];
      if (name_case) {
        user[name_case] = {
          first_name: user.first_name,
          last_name: user.last_name,
          name: user.first_name + ' ' + user.last_name
        };
        delete user.first_name;
        delete user.last_name;
      }
      if (!usersMap[user.uid]) {
        usersMap[user.uid] = {
          screen_name: 'id' + user.uid
        };
      }
      var u = extend(usersMap[user.uid], user);
      extend(u, {name: u.first_name + ' ' + u.last_name});
      usersMap[u.screen_name] = usersMap['id' + u.uid] = u;
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
    
    if (isArray(info.friends)) {
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
    var profile = getUser(info.user.uid),
        my_profile = app.viewer_id == profile.uid,
        npva = info.news_count || photos_cnt || profile.counters.videos || profile.counters.audios,
        ff = profile.counters.friends || profile.counters.followers,
        user_birthday = profile.birthday && formatDate(profile.bd_time, {
          showTime: false, shortDate: false, shortMonth: false,
          shortYear: profile.bd_year ? 0 : 10000, timeNow: false
        }) || '';
    if (info.photos) {
      var photos_cnt = info.photos.shift() || 0,
          source_name = 'photos' + profile.uid;
      photo.saveSource(source_name, info.photos, photos_cnt);
      for (var i = 0, l = info.photos.length; i < l; i++) {
        var p = info.photos[i], photo_id = p.owner_id + '_' + p.pid;
        photos.push({
          photo_link: '/photo' + photo_id,
          photo_src: p.src,
          onclick: 'return photo.open(\'' + photo_id + '\', \'' + source_name + '\', event);'
        });
      }
    }
    return {
      my_profile: my_profile,
      user_firstname: profile.first_name,
      user_fullname: profile.name,
      profile_photo: profile.photo_big,
      profile_link: '/' + profile.screen_name,
      can_write_pm: profile.can_write_private_message && !my_profile,
      is_friend: isFriend(profile.uid),
      npva_counters_block: npva && !my_profile,
      news_cnt: profile.counters.news && formatCnt(profile.counters.news),
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
  function parseProfileInfo(posts) {
    var posts_data = [];
    saveUsers(posts.profiles);
    saveUsers(posts.dat_profiles, 'dat');
    var posts_count = posts.wall.shift() || 0;
    for (var i = 0; i < posts.wall.length; i++) {
      if (!posts.wall[i] || !posts.wall[i].id) continue;
      var post = posts.wall[i],
          cmnts = post.comments || [],
          from = getUser(post.from_id),
          attachments = [],
          comments_count = cmnts.shift() || 0,
          comments = [];
      if (post.attachments) {
        var photo_attachments = [], source_name = 'wall' + post.to_id + '_' + post.id;
        for (var j = 0; j < post.attachments.length; j++) {
          var media = post.attachments[j];
          if (media.type == 'photo') {
            photo_attachments.push(media.photo);
            var p = media.photo, photo_id = p.owner_id + '_' + p.pid;
            attachments.push({
              media_type: media.type,
              media_link: '/photo' + photo_id,
              media_src: media.photo.src,
              onclick: 'return photo.open(\'' + photo_id + '\', \'' + source_name + '\', event);'
            });
          } else if (media.type == 'posted_photo') {
            photo_attachments.push(media.posted_photo);
            var p = media.posted_photo, photo_id = p.owner_id + '_' + p.pid;
            attachments.push({
              media_type: media.type,
              media_link: '/photo' + photo_id,
              media_src: media.photo.src,
              onclick: 'return photo.open(\'' + photo_id + '\', \'' + source_name + '\', event);'
            });
          } else if (media.type == 'graffiti') {
            attachments.push({
              media_type: media.type,
              media_link: '/graffiti' + media.graffiti.owner_id + '_' + media.graffiti.gid,
              media_src: media.graffiti.src
            });
          } else if (media.type == 'video') {
            var vd = media.video.duration,
                h = Math.floor(vd / 3600), vm = vd % 3600,
                m = Math.floor(vm / 60), sm = (m < 10 && h ? '0' + m : m),
                s = vm % 60, ss = (s < 10 ? '0' + s : s), ds = (h ? h + ':' : '') + sm + ':' + ss;
            attachments.push({
              media_type: media.type,
              media_link: '/video' + media.video.owner_id + '_' + media.video.vid,
              media_src: media.video.image_small,
              duration: vd ? ds : 0
            });
          }
        }
        photo.saveSource(source_name, photo_attachments);
      }
      var ru = getUser(1).first_name == 'Павел';
      for (var j = cmnts.length - 1; j >= 0; j--) {
        var comment = cmnts[j],
            user = getUser(comment.uid), reply_user = getUser(comment.reply_to_uid),
            reply_text = reply_user && ((ru ? '' : 'to ') + (reply_user.dat && reply_user.dat.first_name || reply_user.first_name || ''));
        comments.push(extend({
          user_link: '/' + user.screen_name,
          user_photo: user.photo,
          user_fullname: user.name,
          text: prepareText(makeReplyLink(comment.text, comment.reply_to_uid, comment.reply_to_cid)),
          post_date: formatDate(comment.date),
          reply_to_link: comment.reply_to_uid ? '/' + reply_user.screen_name : '',
          reply_to_firstname: comment.reply_to_uid ? reply_text : ''
        }, comments_count <= 3 ? {i:1} : {}));
      }
      posts_data.push({
        post_id: post.id,
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
        show: true,
        show_more_comments_label: comments_count > 100 ? 'last 100 replies of ' + comments_count : 'all ' + comments_count + ' replies',
        comments: comments
      });
    }
    return {
      posts: posts_data,
      show_posts: posts_count > 0,
      show_more_posts: posts_count > 10
    };
  }
  function parseAlbumInfo(album) {
    var photos = [];
    if (album.photos) {
      var photos_cnt = album.photos.shift() || 0,
          source_name = 'photos' + current.user_id;
      photo.saveSource(source_name, album.photos, photos_cnt);
      for (var i = 0, l = album.photos.length; i < l; i++) {
        var p = album.photos[i], photo_id = p.owner_id + '_' + p.pid;
        photos.push({
          photo_link: '/photo' + photo_id,
          photo_src: p.src,
          onclick: 'return photo.open(\'' + photo_id + '\', \'' + source_name + '\', event);'
        });
      }
    }
    return {
      all_photos: photos,
      photos_count: numeric(photos_cnt, ['%s photo', '%s photos']),
      albums_count: numeric(album.albums_count || 0, ['%s album', '%s albums']),
      show_more_photos: photos_cnt > 40
    };
  }
  function parseZInfo(z) {
    if (z) {
      if (z.source_name.substr(0, 4) == 'wall') {
        var source = [];
        for (var i = 0, l = z.source.length; i < l; i++) {
          z.source[i] && source.push(z.source[i]);
        }
        z.target && photo.save(z.target);
        photo.saveSource(z.source_name, source);
        photo.open(z.photo_id, z.source_name, null, true);
      } else {
        var source_length = +z.source.shift() || 0, sl = source_length - z.offset;
        z.target && photo.save(z.target);
        photo.saveSource(z.source_name, z.source.slice(0, sl), source_length, z.offset);
        z.source_start.shift();
        photo.saveSource(z.source_name, z.source_start, source_length);
        photo.open(z.photo_id, z.source_name, null, true);
      }
    }
  }
  function parseZParams(params) {
    if (params && params.z) {
      var photo_params = /^photo(([0-9]+)_[0-9]+)(?:\/(.*))?$/i.exec(params.z);
      if (photo_params) {
        return {
          photo_id: photo_params[1],
          source_name: photo_params[3] || 'photos' + photo_params[2],
          offset: Math.max(100, (params.n || 0) - 50)
        };
      }
    }
    return null;
  }
  function getZCodeData(params) {
    if (params) {
      if (params.source_name.substr(0, 4) == 'wall') {
        return {z_wall: {
          target_id: params.photo_id,
          source_id: params.source_name.substr(4)
        }};
      } else {
        return {z_all: {
          target_id: params.photo_id,
          owner_id: +params.source_name.substr(6),
          offset: params.offset
        }};
      }
    }
    return {};
  }
  
  return {
    viewer_id: VK.viewer_id,
    nav: nav,
    current: current,
    user: getUser,
    scroll: function(to) {
      if (htmlNode) htmlNode.scrollTop = to || 0;
      if (bodyNode) bodyNode.scrollTop = to || 0;
    },
    openProfile: function(user, params, no_push) {
      /*var uid = getUser(user).uid, z_params = parseZParams(params);
      if (current.user_info && current.user_id == uid) {
        if (z_params) {
          return photo.open(z_params.photo_id, z_params.source_name, null, no_push);
        } else {
          photo.close(null, true);
        }
        this.getProfileInfoOnly(uid, function(html) {
          if (app.current.link == '/') {
            app.nav('/' + getUser(current.user_id).screen_name, null, {replace: true, push_only: true});
          }
          onDOMReady(function() {
            ge('page_body').innerHTML = html;
            removeClass('selected', 'photos_counter');
            app.scroll();
          });
        });
      } else {
        this.getProfilePageInfo(user, function(html, z) {
          if (app.current.link == '/') {
            app.nav('/' + getUser(current.user_id).screen_name, null, {replace: true, push_only: true});
          }
          onDOMReady(function() {
            ge('container').innerHTML = html;
            removeClass('selected', 'photos_counter');
            app.scroll();
            z && parseZInfo(z);
          });
        }, z_params);
      }*/
      var uid = getUser(user).uid, z_params = parseZParams(params);
      var part = (current.user_info && current.user_id == uid),
          method = part ? this.getProfileInfoOnly : this.getProfilePageInfo;
      if (z_params) {
        return photo.open(z_params.photo_id, z_params.source_name, null, no_push);
      } else {
        photo.close(null, true);
      }
      if (current.user_id != uid) {
        photo.saveSource('photos' + app.current.user_id, null);
      }
      method.call(this, user, function(html, z) {
        if (app.current.link == '/') {
          app.nav('/' + getUser(current.user_id).screen_name, null, {replace: true, push_only: true});
        }
        onDOMReady(function() {
          ge(part ? 'page_body' : 'container').innerHTML = html;
          removeClass('selected', 'photos_counter');
          app.scroll();
          z && parseZInfo(z);
        });
      }, z_params);
    },
    openPhotos: function(user, params, no_push) {
      var uid = getUser(user).uid, z_params = parseZParams(params);
      if (current.user_info && current.user_id == uid) {
        if (z_params) {
          return photo.open(z_params.photo_id, z_params.source_name, null, no_push);
        } else {
          photo.close(null, true);
        }
        this.getAlbumInfoOnly(uid, function(html) {
          onDOMReady(function() {
            ge('page_body').innerHTML = html;
            addClass('selected', 'photos_counter');
            app.scroll();
          });
        });
      } else {
        this.getAlbumPageInfo(user, function(html, z) {
          onDOMReady(function() {
            ge('container').innerHTML = html;
            addClass('selected', 'photos_counter');
            app.scroll();
            z && parseZInfo(z);
          });
        }, z_params);
      }
    },
    getProfilePageInfo: function(user, callback, params) {
      var code = tpl.get(tpl.CODE_PROFILE_PAGE, extend({user: user, need_friends: !viewers_friends}, getZCodeData(params)));
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return; // ToDo: error msg 'api error'
        if (!data.response.info.user.uid) return; // ToDo: error msg 'user not found'
        var res = data.response,
            info = res.info,
            posts = res.posts,
            profiles = res.profiles;
        profiles && saveUsers(profiles);
        current.user_id = info.user.uid;
        current.mode = 'profile';
        var user_info = current.user_info = parseUserInfo(info);
        var wall_info = parseProfileInfo(posts);
        var tpl_data = extend({profile_page: true}, user_info, wall_info);
        var html = tpl.get(tpl.UI_CONTAINER, tpl_data);
        callback && callback(html, extend(params, res.z));
      });
    },
    getProfileInfoOnly: function(user, callback) {
      var code = tpl.get(tpl.CODE_PROFILE_INFO_ONLY, {user_id: user});
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return; // ToDo: error msg 'api error'
        var res = data.response,
            posts = res.posts,
            profiles = res.profiles;
        profiles && saveUsers(profiles);
        current.mode = 'profile';
        var wall_info = parseProfileInfo(posts);
        var tpl_data = extend(current.user_info, wall_info);
        var html = tpl.get(tpl.UI_PROFILE_BODY, tpl_data);
        callback && callback(html);
      });
    },
    getAlbumPageInfo: function(user, callback, params) {
      var code = tpl.get(tpl.CODE_ALBUM_PAGE, extend({user: user, need_friends: !viewers_friends}, getZCodeData(params)));
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return; // ToDo: error msg 'api error'
        if (!data.response.info.user) return; // ToDo: error msg 'user not found'
        var res = data.response,
            info = res.info,
            album = res.album,
            profiles = res.profiles;
        profiles && saveUsers(profiles);
        current.user_id = info.user.uid;
        current.mode = 'photos';
        var user_info = current.user_info = parseUserInfo(info);
        var album_info = parseAlbumInfo(album);
        var tpl_data = extend({album_page: true}, user_info, album_info);
        var html = tpl.get(tpl.UI_CONTAINER, tpl_data);
        callback && callback(html, extend(params, res.z));
      });
    },
    getAlbumInfoOnly: function(user, callback) {
      var code = tpl.get(tpl.CODE_ALBUM_INFO_ONLY, {user_id: user});
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return; // ToDo: error msg 'api error'
        var res = data.response,
            album = res.album;
        current.mode = 'photos';
        var album_info = parseAlbumInfo(album);
        var tpl_data = extend(current.user_info, album_info);
        var html = tpl.get(tpl.UI_ALBUM_BODY, tpl_data);
        callback && callback(html);
      });
    },
    shComments: function(a, post_id, show) {
      var sm_cont = a.parentNode, comments_cont = geByClass1('post_comments', sm_cont.parentNode);
      var code = tpl.get(tpl.CODE_COMMENTS, {owner_id: current.user_id, post_id: post_id, all: show});
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return; // ToDo: error msg 'api error'
        var res = data.response,
            cmnts = res.comments,
            profiles = res.profiles,
            dat_profiles = res.dat_profiles;
        profiles && saveUsers(profiles);
        dat_profiles && saveUsers(dat_profiles, 'dat');
        for (var i = 0, l = dat_profiles.length; i<l; i++) {
          
        }
        var comments = [], comments_count = cmnts.shift() || 0,
            hide_sm_link = comments_count <= 3 || comments_count <= 5 && show;
        var ru = getUser(1).first_name == 'Павел';
        for (var i = cmnts.length - 1; i >= 0; i--) {
          var comment = cmnts[i],
              user = getUser(comment.uid), reply_user = getUser(comment.reply_to_uid),
              reply_text = reply_user && ((ru ? '' : 'to ') + (reply_user.dat && reply_user.dat.first_name || reply_user.first_name || ''));
          comments.push(extend({
            user_link: '/' + user.screen_name,
            user_photo: user.photo,
            user_fullname: user.name,
            text: prepareText(makeReplyLink(comment.text, comment.reply_to_uid, comment.reply_to_cid)),
            post_date: formatDate(comment.date),
            reply_to_link: comment.reply_to_uid ? '/' + reply_user.screen_name : '',
            reply_to_firstname: comment.reply_to_uid ? reply_text : ''
          }, hide_sm_link ? {i:1} : {}));
        }
        if (hide_sm_link) {
          remove(sm_cont);
        } else {
          sm_cont.innerHTML = tpl.get(tpl.UI_SM_COMMENTS_LINK, {show: !show, post_id: post_id, show_more_comments_label: comments_count > 100 ? 'last 100 replies of ' + comments_count : 'all ' + comments_count + ' replies'});
        }
        comments_cont.innerHTML = tpl.get(tpl.UI_POST_COMMENT, comments);
      });
      return false;
    }
  };
})();
