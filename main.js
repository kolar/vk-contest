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

function formatCnt(cnt) {
  return intval(cnt).toString().replace(/(\d)(?=(\d\d\d)+(\D|$))/g, '$1 ');
}
function numeric(num, arr) {
  return (num > 1 ? arr[1] || arr[0] : arr[0]).replace('%s', num);
}
function formatDate(timestamp, stime)
{
  var d = new Date(timestamp*1000), n = stime ? new Date(stime*1000) : new Date(), date = '',
      d_eq = function (d1, d2) { return d1.getDate()==d2.getDate() && d1.getMonth()==d2.getMonth() && d1.getYear()==d2.getYear(); },
      dd = Math.round((n.getTime() - d.getTime())/1000),
      t15 = ['', 'one', 'two', 'three', 'four', 'five'];
  if (dd<5) return 'just_now';
  if (dd<6) return numeric(dd, ['{sec} second ago', '{sec} seconds ago']).replace('{sec}', t15[dd]);
  if (dd<60) return numeric(dd, ['{sec} second ago', '{sec} seconds ago']).replace('{sec}', dd);
  dd = Math.floor(dd/60);
  if (dd<6) return numeric(dd, ['{min} minute ago', '{min} minutes ago']).replace('{min}', t15[dd]);
  if (dd<60) return numeric(dd, ['{min} minute ago', '{min} minutes ago']).replace('{min}', dd);
  dd = Math.floor(dd/60);
  if (dd<4) return numeric(dd, ['{hours} hour ago', '{hours} hours ago']).replace('{hours}', t15[dd]);
  if (d_eq(n, d)) {
    date = 'today';
  } else {
    n.setDate(n.getDate()-1);
    if (d_eq(n, d)) {
      date = 'yesterday';
    } else {
      var dd = d.getDate(),
          dm = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()],
          dy = d.getFullYear();
      date = dm.substr(0, 3) + '. ' + dd + ',' +((n.getMonth() - d.getMonth()) > 6 || n.getFullYear() != d.getFullYear() ? ' ' + dy : '');
    }
  }
  var th = d.getHours() % 12 || 12,
      tf = d.getHours() > 11 ? 'pm' : 'am',
      tm = d.getMinutes()<10 ? '0' + d.getMinutes() : d.getMinutes(),
      time = th + ':' + tm + ' ' + tf;
  return date + ' at ' + time;
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

var app = {
  openProfile: function(user) {
    this.getProfileInfo(user, function(html) {
      onDOMReady(function() {
        ge('container').innerHTML = html;
      });
    })
  },
  getProfileInfo: function(user, callback) {
    VK.api('execute', {code: tpl.get(tpl.CODE_PROFILE, {user_id: user, need_friends: true})}, function(data) {
      data = data.response; console.dir(data);
      var friendsMap = {}; for (var i = 0; i < data.friends_uids.length; i++) { friendsMap[data.friends_uids[i]] = true; };
      var friends = [], friends_data = (data.friends || []).sort(function() { return Math.random() < 0.5 ? 1 : -1; }).slice(0, 6);
      for (var i = 0; i < friends_data.length; i++) {
        friends.push({
          user_link: '/' + friends_data[i].screen_name,
          user_photo: friends_data[i].photo,
          user_firstname: friends_data[i].first_name
        });
      }
      var usersMap = {};
      for (var i = 0; i < data.profiles.length; i++) {
        usersMap[data.profiles[i].uid] = data.profiles[i];
      }
      for (var i = 0; i < data.posts.profiles.length; i++) {
        usersMap[data.posts.profiles[i].uid] = data.posts.profiles[i];
      }
      var followers = [], followers_users = data.followers.users || [];
      for (var i = 0; i < followers_users.length; i++) {
        var user = usersMap[followers_users[i]];
        followers.push({
          user_link: '/' + (user.screen_name || 'id' + user.uid),
          user_photo: user.photo,
          user_firstname: user.first_name
        });
      }
      var my_profile = VK.viewer_id == data.user.uid,
          npva = data.user.counters.notes || data.photos[0] || data.user.counters.videos || data.user.counters.audios,
          ff = data.user.counters.friends || data.followers.count;
      var bd = (data.user.bdate || '').toString().split('.'), bday = new Date(intval(bd[2]), intval(bd[1])-1, intval(bd[0])),
          user_birthday = bd.length>1 ? (["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][bday.getMonth()] + ' ' + bday.getDate() + (bd[2] ? ', ' + bday.getFullYear() : '')) : '',
          user_relation = ["", "Single", "In a Relationship", "Engaged", "Married", "It&#39;s Complicated", "Actively Searching", "In love"][data.user.relation];
      var photos = [];
      for (var i = 1; i < data.photos.length; i++) {
        photos.push({
          photo_link: '/photo' + data.photos[i].owner_id + '_' + data.photos[i].pid,
          photo_src: data.photos[i].src
        });
      }
      var posts = [];
      for (var i = 1; i < data.posts.wall.length; i++) {
        var post = data.posts.wall[i],
            cmnts = data.comments[i - 1],
            from = usersMap[post.from_id],
            attachments = [],
            comments = [];
        if (post.attachments) {
          for (var j = 0; j < post.attachments.length; j++) {
            var media = post.attachments[j];
            if (media.type != 'photo') continue;
            attachments.push({
              media_link: '/photo' + media.photo.owner_id + '_' + media.photo.pid,
              media_src: media.photo.src
            });
          }
        }
        for (var j = cmnts.length - 1; j > 0; j--) {
          var comment = cmnts[j],
              user = usersMap[comment.uid];
          comments.push(extend({
            user_link: '/' + (user.screen_name || 'id' + user.uid),
            user_photo: user.photo,
            user_fullname: user.first_name + ' ' + user.last_name,
            text: prepareText(makeReplyLink(comment.text, comment.reply_to_uid, comment.reply_to_cid)),
            post_date: formatDate(comment.date),
            reply_to_link: comment.reply_to_cid ? '#' + comment.reply_to_cid : '',
            reply_to_firstname: usersMap[comment.reply_to_uid] && usersMap[comment.reply_to_uid].first_name
          }, cmnts[0] <= 3 ? {i:1} : {}));
        }
        posts.push({
          user_link: '/' + (from.screen_name || 'id' + from.uid),
          user_photo: from.photo,
          user_fullname: from.first_name + ' ' + from.last_name,
          text: prepareText(post.text),
          likes_count: post.likes.count,
          post_date: formatDate(post.date),
          show_attachments: attachments.length,
          attachments: attachments,
          show_comments: cmnts[0],
          show_more_comments: cmnts[0] > 3,
          show_more_comments_label: 'Show all ' + cmnts[0] + ' comments',
          comments: comments
        });
      }
      var tpl_data = {
        my_profile: my_profile,
        user_firstname: data.user.first_name,
        user_fullname: data.user.first_name + ' ' + data.user.last_name,
        profile_photo: data.user.photo_big,
        can_write_pm: data.user.can_write_private_message && data.user.uid != VK.viewer_id,
        is_friend: friendsMap[data.user.uid],
        npva_counters_block: npva && !my_profile,
        news_cnt: data.news_count && formatCnt(data.news_count),
        photos_cnt: data.photos[0] && formatCnt(data.photos[0]),
        videos_cnt: data.user.counters.videos && formatCnt(data.user.counters.videos),
        audios_cnt: data.user.counters.audios && formatCnt(data.user.counters.audios),
        ff_counters_block: ff && (npva || !my_profile),
        friends_cnt: data.user.counters.friends && formatCnt(data.user.counters.friends),
        show_friends: friends.length,
        friends: friends,
        followers_cnt: data.followers.count && formatCnt(data.followers.count),
        show_followers: followers.length,
        followers: followers,
        user_status: data.user.activity,
        show_user_info: user_birthday || user_relation,
        show_more_user_info: user_birthday || user_relation,
        user_birthday: user_birthday,
        user_relation: user_relation,
        photos: photos,
        show_posts: data.posts.wall[0],
        can_post: data.user.can_post,
        posts: posts,
        show_more_posts: +data.posts.wall[0] > 10
      };
      var html = tpl.get(tpl.UI_CONTAINER, tpl_data);
      callback && callback(html);
    });
  }
};


