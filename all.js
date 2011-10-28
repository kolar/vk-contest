/*********** main.js ***********/
(function(window){
  var readyBound = false, isReady = false, readyList = [], ready = function() {
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
  function onDOMReady(fn) {
    if (isReady) {
      fn.call(document);
    } else {
      readyList.push(fn);
    }
  };
  window.onDOMReady = onDOMReady;
})(window);

function getValues(val) {
  if (!isArray(val)) return val.call ? val() : val;
  var return_val = [];
  for (var i = 0, l = val.length; i < l; i++) {
    return_val.push(getValues(val[i]));
  }
  return return_val;
}
function se() {
  var callbacksList = [], args = Array.prototype.slice.call(arguments);
  return function(fn) {
    if (!fn) return;
    if (fn.apply) {
      callbacksList.push(fn);
    } else {
      for (var i = 0, l = callbacksList.length; i < l; i++) {
        callbacksList[i].apply(window, getValues(args));
      }
    }
  }
}
function se1() {
  var isReady = false, readyList = [], args = Array.prototype.slice.call(arguments);
  return function(fn) {
    if (!fn) return;
    if (fn.apply) {
      if (isReady) {
        fn.apply(window, getValues(args));
      } else {
        readyList.push(fn);
      }
    } else {
      isReady = true;
      for (var i = 0, l = readyList.length; i < l; i++) {
        readyList[i].apply(window, getValues(args));
      }
      readyList = null;
    }
  }
}
window.onHeadReady = se1(function(){ return geByTag1('head'); });
window.onBodyResize = se();
window.onBodyScroll = se(function(){ return htmlNode.scrollTop || bodyNode.scrollTop || window.scrollY || 0; });

window.onscroll = function(){ onBodyScroll(true); };

function sbWidth() {
  if (typeof window.scrollBarWidth === 'undefined') {
    var t = ce('div', {innerHTML: '<div style="height: 75px;">1<br>1</div>'}, {
      overflowY: 'scroll',
      position: 'absolute',
      width: '50px',
      height: '50px'
    });
    bodyNode.appendChild(t);
    window.scrollBarWidth = Math.max(0, t.offsetWidth - t.firstChild.offsetWidth);
    bodyNode.removeChild(t);
  }
  return window.scrollBarWidth;
}

function ge(id) {
  return (typeof id === 'string') ? document.getElementById(id) : id;
}
function geByClass(className, elem, tagName) {
  elem = ge(elem) || document;
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
  return (ge(elem) || document).getElementsByTagName(tagName);
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
function after(o, a) {
  a = ge(a);
  if (a.parentNode) {
    if (a.nextSibling) a.parentNode.insertBefore(ge(o), a.nextSibling);
    else a.parentNode.appendChild(ge(o));
  }
}
function remove(o) {
  o = ge(o);
  o && o.parentNode && o.parentNode.removeChild(o);
}
function isSpecialClick(e) {
  return e && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || e.metaKey);
}
function ce(tag, attr, style) {
  var el = document.createElement(tag);
  if (attr) extend(el, attr);
  if (style) extend(el.style, style);
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
function isArray(obj) { return Object.prototype.toString.call(obj) === '[object Array]'; }
function trim(text) { return (text || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, ''); }
function htsc(str) { return str.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/\'/g,'&#39;').replace(/%/g,'&#37;'); }
function rehtsc(str) { return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,'\'').replace(/&#37;/g,'%'); }
function nl2br(str) { return str.replace(/\r\n?|\n/g, '<br />\n'); }
function br2nl(str) { return str.replace(/<br( \/)?>\n?/g, '\n'); }
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
var rf = function() { return false; };
function addEvent(elem, types, handler) {
  elem = ge(elem);
  handler = handler || rf;
  if (!elem || elem.nodeType == 3 || elem.nodeType == 8) return;
  if (elem.setInterval && elem != window) elem = window; // for ie
  var types = types.split(' ');
  for (var i = 0, l = types.length; i < l; i++) {
    var type = types[i];
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + type, handler);
    }
  }
}
function removeEvent(elem, types, handler) {
  elem = ge(elem);
  handler = handler || rf;
  if (!elem || elem.nodeType == 3 || elem.nodeType == 8) return;
  var types = types.split(' ');
  for (var i = 0, l = types.length; i < l; i++) {
    var type = types[i];
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handler, false);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + type, handler);
    }
  }
}
function offsetY(o) {
  o = ge(o);
  if (!o) return 0;
  var y = o.offsetTop;
  while (o = o.offsetParent) y += o.offsetTop;
  return y;
}

function placeholderSetup(id, pc, tc) {
  var elem = ge(id);
  pc = pc || '#afb8c2';
  tc = tc || '#000';
  if (!elem) return;
  var ph = elem.getAttribute('placeholder');
  if (ph && ph != "") {
    elem['active'] = 1;
    if ((!elem.value || elem.value == ph) && !elem.focused) {
      elem.style.color = pc;
      elem.value = ph;
      elem['active'] = 0;
    }
    if (!elem['phevents']) {
      addEvent(elem, 'focus', function() {
        if (elem['active']) return;
        elem['active'] = 1;
        elem.value = '';
        elem.style.color = tc;
      });
      addEvent(elem, 'blur', function() {
        if(!elem['active'] || !ph || elem.value != '') return;
        elem['active'] = 0;
        elem.style.color = pc;
        elem.value = ph;
      });
      elem['phevents'] = 1;
      elem.getValue = function() {
        return elem['active'] ? elem.value : '';
      }
    }
  }
}
function initAdjustHeight(id, fwidth, fheight, fireEvent) {
  var o = ge(id), helper = ge(id + '_adjust_helper');
  if (!helper) {
    helper = ce('textarea', {
      id: id + '_adjust_helper',
      disabled: true,
      readOnly: true,
      min_height: fheight || o.offsetHeight
    }, {
      width: fwidth || o.offsetWidth,
      height: '1px',
      position: 'absolute',
      top: '-50000px',
      left: '-5000px',
      overflow: 'hidden'
    });
    after(helper, o);
  }
  function updateHeight(e) {
    helper.value = o.value + (e.type == 'blur' ? '' : '\n');
    var new_height = helper.scrollHeight - helper.offsetHeight + 1;
    if (new_height < helper.min_height) {
      new_height = helper.min_height;
    }
    o.style.height = new_height + 'px';
    o.style.overflow = 'hidden';
  }
  o.updateHeight = updateHeight;
  
  if (!fireEvent) {
    removeEvent(o, 'keydown keypress keyup focus blur', updateHeight);
    addEvent(o, 'keydown keypress keyup focus blur', updateHeight);
  }
  updateHeight({type: 'blur'});
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
function makeReplyLink(text, reply_to) {
  if (!reply_to.uid) return text;
  return text ? text.toString().replace(new RegExp('^\\[id(' + intval(reply_to.uid) + ')\\|([^\\]]+)\\]'), '<a href="/' + app.user(reply_to.uid).screen_name + '" class="reply_to" onclick="return app.highlightComment(this, ' + reply_to.post_id + ', ' + reply_to.cid + ');">$2</a>') : '';
}
function cutText(text) {
  var original_text = rehtsc(br2nl(text)),
      lines = original_text.split('\n');
  if (original_text.length > 520 || lines.length > 5) {
    var cut_lines = lines.slice(0, 5).join('\n'),
        cut = cut_lines.length > 280 ? original_text.substr(0, 280) : cut_lines;
    return tpl.get(tpl.UI_TEXT_CUT, {cut_text: nl2br(htsc(cut + '\n')), full_text: text});
  }
  return text;
}
function makeLinks(text) {
  if (!text) return '';
  text = text.toString();
  text = text.replace(/\[((?:id|club)[0-9]+)\|([^\]]+)\]/g, '<a href="/$1" onclick="return app.nav(this, event);">$2</a>');
  //text = text.replace(/https?:\/\/[a-z0-9+\$_-]+(\.[a-z0-9+\$_-]+)*(\/[a-z0-9+\$_-][^\s]*)*(:[0-9]+)?\/?([a-z+&?\$_.-][a-z0-9;:@\/&?%=+\$_.-]*)?(#[a-z_.-][a-z0-9+\$_.-]*)?/gi, function(s) {
  text = text.replace(/\b(?:(?:https?):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gi, function(s) {
    return '<a href="' + s + '" target="_blank">' + (s.length > 55 ? s.substr(0, 52) + '...' : s) + '</a>';
  });
  return text;
}
function prepareText(text) {
  text = cutText(text);
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
        window.console && console.log && console.log(cid + ': ', data);
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
      viewer = {}, current = {};
  function hard_nav(link, e, o) {
    if (e || o && o.push_only) return true;
    if (o && o.replace) {
      location.replace(link);
    } else {
      location.href = link;
    }
    return true;
  }
  function nav(link, e, o) {
    o = extend({no_push: false, push_only: false, replace: false}, o);
    if (isSpecialClick(e)) return true;
    if (!o.no_push && !is_history) return hard_nav(link, e, o);
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
      } catch (e) { return hard_nav(link, e, o); }
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
      return app.invalidLink();
    }
    return false;
  }
  if (is_history) {
    window.addEventListener('popstate', function(e) {
      nav(location, null, {no_push: true});
    }, false);
  }
  function setTitle(title) {
    document.title = title;
  }
  
  var usersMap = {};
  function saveViewersFriends(friends_uids) {
    viewer.friends = {};
    for (var i = 0; i < friends_uids.length; i++) {
      viewer.friends[friends_uids[i]] = true;
    }
  }
  function isFriend(uid) {
    return viewer.friends && viewer.friends[uid] || false;
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
      user.gid && (user.uid = -user.gid);
      if (!usersMap[user.uid]) {
        usersMap[user.uid] = {
          screen_name: (user.gid ? 'club' + user.gid : 'id' + user.uid)
        };
      }
      var u = extend(usersMap[user.uid], user);
      extend(u, u.gid ? {} : {name: u.first_name + ' ' + u.last_name});
      usersMap[u.screen_name] = usersMap[u.gid ? 'club' + u.gid : 'id' + u.uid] = u;
    }
  }
  function getUser(uid) {
    return usersMap[uid] || {};
  }
  
  function parseUserInfo(info) {
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
      viewer_fullname: viewer.name,
      user_firstname: profile.first_name,
      user_fullname: profile.name,
      profile_photo: profile.photo_big,
      profile_link: '/' + profile.screen_name,
      can_write_pm: profile.can_write_private_message && !my_profile,
      is_friend: isFriend(profile.uid),
      npva_counters_block: npva && !my_profile,
      news_cnt: profile.counters.news && formatCnt(profile.counters.news),
      photos_count: photos_cnt && formatCnt(photos_cnt),
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
  function parseProfileInfo(posts, offset) {
    var posts_data = [];
    saveUsers(posts.profiles);
    saveUsers(posts.groups);
    saveUsers(posts.dat_profiles, 'dat');
    var posts_count = posts.wall.shift() || 0;
    if (!offset) current.wall_posts_shown = 10;
    var repostsDateMap = {};
    for (var i = 0, l = posts.reposts_date.length; i < l; i++) {
      repostsDateMap[posts.reposts_date[i].id] = posts.reposts_date[i].date;
    }
    for (var i = 0; i < posts.wall.length; i++) {
      if (!posts.wall[i] || !posts.wall[i].id) continue;
      var post = posts.wall[i],
          cmnts = posts.comments[i] || [],
          from = getUser(post.from_id),
          attachments = [], top_attachments = [], bottom_attachments = [],
          comments_count = cmnts.shift() || 0,
          comments = [],
          repost = null;
      if (post.copy_post_id) {
        var repost_user = getUser(post.copy_owner_id),
            repost_date = repostsDateMap[post.copy_post_id];
        repost = {
          user_link: '/' + repost_user.screen_name,
          user_photo: repost_user.photo,
          user_fullname: repost_user.name,
          post_date: repost_date ? formatDate(repost_date) : ''
        };
      }
      if (post.attachments) {
        var photo_attachments = [], source_name = 'wall' + post.to_id + '_' + post.id;
        for (var j = 0; j < post.attachments.length; j++) {
          var media = post.attachments[j];
          if (media.type == 'photo') {
            photo_attachments.push(media.photo);
            var p = media.photo, photo_id = p.owner_id + '_' + p.pid;
            top_attachments.push({
              media_type: 'photo',
              photo: {
                link: '/photo' + photo_id,
                src: media.photo.src,
                onclick: 'return photo.open(\'' + photo_id + '\', \'' + source_name + '\', event);'
              }
            });
          } else if (media.type == 'posted_photo') {
            photo_attachments.push(media.posted_photo);
            var p = media.posted_photo, photo_id = p.owner_id + '_' + p.pid;
            top_attachments.push({
              media_type: 'photo',
              photo: {
                link: '/photo' + photo_id,
                src: media.photo.src,
                onclick: 'return photo.open(\'' + photo_id + '\', \'' + source_name + '\', event);'
              }
            });
          } else if (media.type == 'graffiti') {
            top_attachments.push({
              media_type: 'graffiti',
              graffiti: {
                link: 'http://vkontakte.ru/graffiti' + media.graffiti.gid + '?from=' + media.graffiti.owner_id,
                src: media.graffiti.src
              }
            });
          } else if (media.type == 'video') {
            var vd = media.video.duration,
                h = Math.floor(vd / 3600), vm = vd % 3600,
                m = Math.floor(vm / 60), sm = (m < 10 && h ? '0' + m : m),
                s = vm % 60, ss = (s < 10 ? '0' + s : s), ds = (h ? h + ':' : '') + sm + ':' + ss;
            top_attachments.push({
              media_type: 'video',
              video: {
                link: 'http://vkontakte.ru/video' + media.video.owner_id + '_' + media.video.vid,
                src: media.video.image_small,
                duration: vd ? ds : 0
              }
            });
          } else if (media.type == 'audio') {
            bottom_attachments.push({
              media_type: 'audio bottom',
              audio: {
                link: 'http://vkontakte.ru/audio?id=' + media.audio.owner_id + '&audio_id=' + media.audio.aid,
                performer: htsc(media.audio.performer),
                title: htsc(media.audio.title)
              }
            });
          } else if (media.type == 'note') {
            bottom_attachments.push({
              media_type: 'note bottom',
              note: {
                link: 'http://vkontakte.ru/note' + media.note.owner_id + '_' + media.note.nid,
                title: htsc(media.note.title)
              }
            });
          } else if (media.type == 'doc') {
            bottom_attachments.push({
              media_type: 'doc bottom',
              doc: {
                link: media.doc.url,
                title: htsc(media.doc.title)
              }
            });
          } else if (media.type == 'link') {
            bottom_attachments.push({
              media_type: 'link bottom',
              link: {
                url: media.link.url,
                title: htsc(/^(https?:\/\/)?([^\/]+)/i.exec(media.link.url)[2] || '')
              }
            });
          }
        }
        photo.saveSource(source_name, photo_attachments);
        attachments = top_attachments.concat(bottom_attachments);
      }
      var ru = getUser(1).first_name == 'Павел';
      for (var j = cmnts.length - 1; j >= 0; j--) {
        var comment = cmnts[j],
            user = getUser(comment.uid), reply_user = getUser(comment.reply_to_uid),
            reply_text = reply_user && ((ru ? '' : 'to ') + (reply_user.dat && reply_user.dat.first_name || reply_user.first_name || ''));
        comments.push(extend({
          comment_id: 'comment' + comment.cid,
          user_link: '/' + user.screen_name,
          user_photo: user.photo,
          user_fullname: user.name,
          text: prepareText(makeReplyLink(comment.text, {post_id: post.id, uid: comment.reply_to_uid, cid: comment.reply_to_cid})),
          post_date: formatDate(comment.date),
          reply_to_link: comment.reply_to_uid ? '/' + reply_user.screen_name : '',
          reply_onclick: 'return app.highlightComment(this, ' + post.id + ', ' + comment.reply_to_cid + ');',
          reply_to_firstname: comment.reply_to_uid ? reply_text : ''
        }, comments_count <= 3 ? {i:1} : {}));
      }
      posts_data.push(extend({
        post_id: post.id,
        user_link: '/' + from.screen_name,
        user_photo: from.photo,
        user_fullname: from.name,
        repost: repost,
        text: prepareText(post.text),
        likes_count: post.likes.count,
        post_date: formatDate(post.date),
        show_attachments: attachments.length,
        one_media: top_attachments.length == 1,
        attachments: attachments,
        show_comments: comments_count,
        show_more_comments: comments_count > 3,
        show: true,
        show_more_comments_label: comments_count > 100 ? 'last 100 replies of ' + comments_count : 'all ' + comments_count + ' replies',
        comments: comments
      }, offset ? {i: 1} : {}));
    }
    return {
      posts: posts_data,
      posts_count: posts_count,
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
      var album_photos = photo.getSource(source_name).slice(0, 40);
      current.album_photos_shown = 40;
      for (var i = 0, l = album_photos.length; i < l; i++) {
        var p = album_photos[i];
        photos.push({
          photo_link: '/photo' + p.id,
          photo_src: p.src,
          onclick: 'return photo.open(\'' + p.id + '\', \'' + source_name + '\', event);'
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
      current.params = params;
      var photo_params = /^photo((-?[0-9]+)_[0-9]+)(?:\/(.*))?$/i.exec(params.z);
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
  
  var ap_in_process = false, ap_need_more = false, wp_in_progress = false;
  function preloadAlbum() {
    if (ap_in_process) return;
    var tpl_data = {owner_id: current.user_id, offset: 0}, need = false;
    var src_name = 'photos' + current.user_id,
        src = photo.getSource(src_name);
    for (var i = 0; i < 80; i++) {
      var num = i + current.album_photos_shown, p = src[num];
      if (num < src.length && !p) {
        tpl_data.offset = num;
        need = true;
        break;
      }
    }
    if (!need) return;
    ap_in_process = true;
    var code = tpl.get(tpl.CODE_ALBUM_PHOTOS, tpl_data);
    VK.api('execute', {code: code}, function(data) {
      ap_in_process = false;
      if (!data.response) return app.apiError(data);
      photo.saveSource(src_name, data.response, src.length, tpl_data.offset);
      if (ap_need_more) {
        ap_need_more = false;
        app.showMorePhotos();
      }
    });
  }
  
  onBodyResize(function() {
    var pc = ge('content'), ph = ge('page_header'), pvc = ge('pv_container'),
        cw = app.cw() - sbWidth();
    if (pc && ph) {
      pc.style.marginLeft = ph.style.marginLeft = Math.floor((cw - pc.offsetWidth) / 2) + 'px';
    }
    if (pvc) {
      pvc.style.width = cw + 'px';
    }
  });
  
  // autoload
  onBodyScroll(function(st) {
    var sm_photos = geByClass1('show_more photos', 'album_page'),
        sm_posts = geByClass1('show_more posts', 'profile_page'),
        sh = Math.max(htmlNode.scrollHeight, bodyNode.scrollHeight),
        ch = app.ch(),
        scroll_bottom = sh - st - ch;
    if (scroll_bottom < 300) {
      if (current.mode == 'profile' && sm_posts) {
        
      } else if (current.mode == 'photos' && sm_photos) {
        app.showMorePhotos();
      }
    }
  });
  
  // back2top
  var last_st_position = 0;
  onBodyScroll(function(st) {
    var back2top = geByClass1('back2top', 'container');
    if (st < 400) {
      back2top.style.display = last_st_position ? 'block' : 'none';
      back2top.style.opacity = last_st_position ? 1 : 0;
    } else if (st < 800) {
      if (st > 600) {
        last_st_position = 0;
        removeClass('saved', back2top);
      }
      back2top.style.display = 'block';
      back2top.style.opacity = last_st_position ? (600 - st) / 200 : (st - 600) / 200;
    } else {
      last_st_position = 0;
      removeClass('saved', back2top);
      back2top.style.display = 'block';
      back2top.style.opacity = 1;
    }
  });
  
  return {
    viewer_id: VK.viewer_id,
    nav: nav,
    current: current,
    user: getUser,
    cw: function(){
      return Math.max(window.innerWidth, htmlNode.clientWidth);
    },
    ch: function(){
      return Math.max(window.innerHeight, htmlNode.clientHeight);
    },
    scrollToTop: function() {
      var back2top = geByClass1('back2top', 'container');
      if (last_st_position) {
        app.scroll(last_st_position);
        last_st_position = 0;
        removeClass('saved', back2top);
      } else {
        last_st_position = app.scroll();
        app.scroll(0);
        addClass('saved', back2top);
      }
    },
    scroll: function(to) {
      if (typeof to !== 'undefined'){
        if (htmlNode) htmlNode.scrollTop = to || 0;
        if (bodyNode) bodyNode.scrollTop = to || 0;
      }
      return htmlNode.scrollTop || bodyNode.scrollTop || window.scrollY || 0;
    },
    openProfile: function(user, params, no_push) {
      var uid = getUser(user).uid, z_params = parseZParams(params);
      var part = (current.user_info && current.user_id == uid),
          method = part ? this.getProfileInfoOnly : this.getProfilePageInfo;
      if (part && z_params) {
        return photo.open(z_params.photo_id, z_params.source_name, null, no_push);
      } else if (part) {
        photo.close(null, true);
      }
      if (current.user_id != uid) {
        photo.saveSource('photos' + app.current.user_id, null);
      }
      method.call(this, part ? uid : user, function(html, z) {
        if (app.current.link == '/') {
          app.nav('/' + getUser(current.user_id).screen_name, null, {replace: true, push_only: true});
        }
        onDOMReady(function() {
          setTitle(current.user_info.user_fullname);
          ge(part ? 'page_body' : 'container').innerHTML = html;
          placeholderSetup('header_search', '#111', '#111');
          placeholderSetup('post_field', '#a4a4a4', '#222');
          //initAdjustHeight('post_field', 0, 16);
          onBodyResize(true);
          removeClass('selected', 'photos_counter');
          app.scroll(0);
          z && parseZInfo(z);
        });
      }, z_params);
    },
    openPhotos: function(user, params, no_push) {
      var uid = getUser(user).uid, z_params = parseZParams(params);
      var part = (current.user_info && current.user_id == uid),
          method = part ? this.getAlbumInfoOnly : this.getAlbumPageInfo;
      if (part && z_params) {
        return photo.open(z_params.photo_id, z_params.source_name, null, no_push);
      } else if (part) {
        photo.close(null, true);
      }
      if (current.user_id != uid) {
        photo.saveSource('photos' + app.current.user_id, null);
      }
      method.call(this, part ? uid : user, function(html, z) {
        onDOMReady(function() {
          setTitle(current.user_info.user_fullname + '\'s Photos | ' + current.user_info.photos_count);
          ge(part ? 'page_body' : 'container').innerHTML = html;
          placeholderSetup('header_search', '#111', '#111');
          onBodyResize(true);
          addClass('selected', 'photos_counter');
          app.scroll(0);
          z && parseZInfo(z);
        });
      }, z_params);
    },
    getProfilePageInfo: function(user, callback, params) {
      var code = tpl.get(tpl.CODE_PROFILE_PAGE, extend({user: user, need_viewer: !viewer.uid}, getZCodeData(params)));
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return app.apiError(data);
        if (!data.response.info.user.uid) return app.invalidLink();
        var res = data.response,
            info = res.info,
            posts = res.posts,
            profiles = res.profiles;
        profiles && saveUsers(profiles);
        if (res.viewer) {
          if (res.viewer.profile) {
            saveUsers(res.viewer.profile);
            extend(viewer, getUser(res.viewer.profile.uid));
          }
          res.viewer.friends && saveViewersFriends(res.viewer.friends);
        }
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
        if (!data.response) return app.apiError(data);
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
      var code = tpl.get(tpl.CODE_ALBUM_PAGE, extend({user: user, need_viewer: !viewer.uid}, getZCodeData(params)));
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return app.apiError(data);
        if (!data.response.info.user) return app.invalidLink();
        var res = data.response,
            info = res.info,
            album = res.album,
            profiles = res.profiles;
        profiles && saveUsers(profiles);
        if (res.viewer) {
          if (res.viewer.profile) {
            saveUsers(res.viewer.profile);
            extend(viewer, getUser(res.viewer.profile.uid));
          }
          res.viewer.friends && saveViewersFriends(res.viewer.friends);
        }
        current.user_id = info.user.uid;
        current.mode = 'photos';
        var user_info = current.user_info = parseUserInfo(info);
        var album_info = parseAlbumInfo(album);
        current.user_info.photos_count = album_info.photos_count;
        var tpl_data = extend({album_page: true}, user_info, album_info);
        var html = tpl.get(tpl.UI_CONTAINER, tpl_data);
        callback && callback(html, extend(params, res.z));
      });
    },
    getAlbumInfoOnly: function(user, callback) {
      var code = tpl.get(tpl.CODE_ALBUM_INFO_ONLY, {user_id: user});
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return app.apiError(data);
        var res = data.response,
            album = res.album;
        current.mode = 'photos';
        var album_info = parseAlbumInfo(album);
        current.user_info.photos_count = album_info.photos_count;
        var tpl_data = extend(current.user_info, album_info);
        var html = tpl.get(tpl.UI_ALBUM_BODY, tpl_data);
        callback && callback(html);
      });
    },
    shComments: function(a, post_id, show, cid) {
      var sm_cont = a.parentNode, comments_cont = geByClass1('post_comments', sm_cont.parentNode);
      if (!show === !hasClass('shown_all', sm_cont)) return false;
      (show ? addClass : removeClass)('shown_all', sm_cont);
      a && (a.innerHTML = '<span></span>');
      var code = tpl.get(tpl.CODE_COMMENTS, {owner_id: current.user_id, post_id: post_id, all: show});
      VK.api('execute', {code: code}, function(data) {
        if (!data.response) return app.apiError(data);
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
            comment_id: 'comment' + comment.cid,
            user_link: '/' + user.screen_name,
            user_photo: user.photo,
            user_fullname: user.name,
            text: prepareText(makeReplyLink(comment.text, {post_id: post_id, uid: comment.reply_to_uid, cid: comment.reply_to_cid})),
            post_date: formatDate(comment.date),
            reply_to_link: comment.reply_to_uid ? '/' + reply_user.screen_name : '',
            reply_onclick: 'return app.highlightComment(this, ' + post_id + ', ' + comment.reply_to_cid + ');',
            reply_to_firstname: comment.reply_to_uid ? reply_text : ''
          }, hide_sm_link ? {i:1} : {}));
        }
        if (hide_sm_link) {
          remove(sm_cont);
        } else {
          sm_cont.innerHTML = tpl.get(tpl.UI_SM_COMMENTS_LINK, {show: !show, post_id: post_id, show_more_comments_label: comments_count > 100 ? 'last 100 replies of ' + comments_count : 'all ' + comments_count + ' replies'});
        }
        comments_cont.innerHTML = tpl.get(tpl.UI_POST_COMMENT, comments);
        cid && app.highlightComment(null, post_id, cid);
      });
      return false;
    },
    showMorePhotos: function() {
      preloadAlbum();
      var src_name = 'photos' + current.user_id,
          src = photo.getSource(src_name),
          album_photos = src.slice(current.album_photos_shown, current.album_photos_shown + 40);
      for (var i = 0, l = album_photos.length; i < l; i++) {
        if (!album_photos[i]) break;
      }
      if (i >= l) {
        var photos = [];
        current.album_photos_shown += 40;
        for (var i = 0, l = album_photos.length; i < l; i++) {
          var p = album_photos[i];
          photos.push({
            photo_link: '/photo' + p.id,
            photo_src: p.src,
            onclick: 'return photo.open(\'' + p.id + '\', \'' + src_name + '\', event);'
          });
        }
        var pf = cdf(tpl.get(tpl.UI_PHOTO_TILE, photos));
        geByClass1('photos_tiles', 'album_page').appendChild(pf);
        if (current.album_photos_shown >= src.length) {
          remove(geByClass1('show_more photos', 'album_page'));
        }
      } else {
        ap_need_more = true;
      }
      return false;
    },
    showMorePosts: function() {
      if (wp_in_progress) return;
      wp_in_progress = true;
      var sm_posts = geByClass1('show_more posts', 'profile_page'),
          a = geByTag1('a', sm_posts);
      a && (a.innerHTML = '<span></span>');
      var code = tpl.get(tpl.CODE_PROFILE_INFO_ONLY, {user_id: current.user_id, posts_offset: current.wall_posts_shown});
      VK.api('execute', {code: code}, function(data) {
        wp_in_progress = false;
        a && (a.innerHTML = 'previous posts');
        if (!data.response) return app.apiError(data);
        var res = data.response,
            posts = res.posts,
            profiles = res.profiles;
        profiles && saveUsers(profiles);
        var wall_info = parseProfileInfo(posts, current.wall_posts_shown);
        current.wall_posts_shown += 10;
        var pf = cdf(tpl.get(tpl.UI_WALL_POST, wall_info.posts)),
            wall_posts = geByClass1('wall_posts', 'profile_page');
        sm_posts ? before(pf, sm_posts) : wall_posts.appendChild(pf);
        if (current.album_photos_shown >= wall_info.posts_count) {
          remove(sm_posts);
        }
      });
      return false;
    },
    highlightComment: function(a, post_id, cid) {
      var cmnt = ge('comment' + cid);
      if (cmnt) {
        var y = offsetY(cmnt), st = app.scroll(), fy = y - st;
        if (fy < 100) app.scroll(y - 100);
        var ch = app.ch(), sb = ch + st,
            by = y + cmnt.offsetHeight, fby = sb - by;
        if (fby < 100) app.scroll(by + 100 - ch);
        addClass('highlight', cmnt);
        setTimeout(function(){ removeClass('highlight', cmnt); }, 1200);
      } else if (a) {
        var wp = a.parentNode;
        while (wp && !hasClass('wall_post', wp)) wp = wp.parentNode;
        var sm = geByTag1('a', geByClass1('show_more comments', wp));
        sm && app.shComments(sm, post_id, true, cid);
      }
      return false;
    },
    apiError: function(data) {
      if (data && data.error) {
        if (data.error.error_code == 5) {
          hard_nav(location.href);
        }
      }
    },
    invalidLink: function() {
      hard_nav('http://vkontakte.ru' + current.link, null, {replace: true});
      return false;
    }
  };
})();


/*********** tpl.js ***********/
var ui_tpls = {
  UI_CONTAINER:
'<div class="back2top" onclick="app.scrollToTop();"><div>Back to Top</div></div>' +
'<div id="page_header_bg">' +
  '<div class="pin" onclick="hasClass(\'header_fixed\', document.body) ? (removeClass(\'header_fixed\', document.body), this.innerHTML = \'Pin\') : (addClass(\'header_fixed\', document.body), this.innerHTML = \'Unpin\');">Unpin</div>' +
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
  '{ff_counters_block?{[<hr />]}}' +
  '{friends_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="/friends" class="label" onclick="return false;">Friends</a><span>{friends_cnt}</span></div></div>]}}' +
  '{show_friends?{[<div class="users_tiles clearfix">{friends::UI_USER_TILE}</div>]}}' +
  '{followers_cnt?{[<div class="profile_counter"><div class="counter_bg"><a href="/followers" class="label" onclick="return false;">Followers</a><span>{followers_cnt}</span></div></div>]}}' +
  '{show_followers?{[<div class="users_tiles clearfix">{followers::UI_USER_TILE}</div>]}}' +
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


/*********** photo.js ***********/
var photo = (function() {
  var LOADING_IMG = '/upload_inv_mono.gif';
  var IMG_CACHE_SIZE = 3;
  var pvl, pvc, pc, pb, pf, pimg, pi, ps, pd;
  function pvInit() {
    if (pvc) return;
    before(cdf(tpl.UI_PHOTO_VIEW), 'container');
    pvl = ge('pv_layout');
    pvc = ge('pv_container');
    pc = ge('photo_container');
    pb = geByClass1('photo_box', pc);
    pf = geByClass1('photo_frame', pb);
    pimg = geByClass1('img', pf);
    pi = geByTag1('img', pf);
    ps = geByClass1('photos_summary', pc);
    pd = geByClass1('photo_desc', pc);
    pvl.onclick = function() {
      current.one && photo.close();
    }
  }
  function detectstartload(img) {
    var ti, ping = function() {
      var ipn = img.parentNode;
      if (!ipn) return;
      if (ipn.offsetWidth > 0) {
        img.onstartload && img.onstartload.call({width: ipn.offsetWidth, height: ipn.offsetHeight});
      } else {
        ti = setTimeout(ping, 50);
      }
    };
    ping();
  }
  
  var photosMap = {}, sourcesMap = {}, imgCacheMap = {};
  function savePhoto(photos) {
    if (!isArray(photos)) { var one = true; photos = [photos]; }
    var output = [];
    for (var i = 0, l = photos.length; i < l; i++) {
      if (!photos[i]) continue;
      var p = photos[i], _id = p.owner_id + '_' + p.pid;
      if (!photosMap[_id]) {
        photosMap[_id] = {id: _id};
      }
      output.push(extend(photosMap[_id], p));
    }
    return one ? output[0] : output;
  }
  function getPhoto(id, owner_id) {
    if (owner_id) return photosMap[id + '_' + owner_id] || {};
    else return photosMap[id] || {};
  }
  function saveSource(name, data, len, offset) {
    if (data === null) { delete sourcesMap[name]; return; }
    offset = offset || 0;
    if (!sourcesMap[name]) sourcesMap[name] = new Array(len ? len : data.length);
    var source = sourcesMap[name];
    data = savePhoto(data);
    if ((offset + data.length) > source.length || offset < 0) {
      var endLength = offset < 0 ? -offset : source.length - offset,
          startLength = data.length - endLength;
      Array.prototype.splice.apply(source, [offset, endLength].concat(data.slice(0, endLength)));
    } else {
      Array.prototype.splice.apply(source, [offset, data.length].concat(data));
    }
  }
  function getSource(name) {
    if (typeof name !== 'string') return name;
    return sourcesMap[name] || [];
  }
  function getNum(photo_id, source) {
    if (!source) source = current.source;
    for (var num in source) {
      if (source[num].id == photo_id) return +num;
    }
    return -1;
  }
  
  function setImageSize() {
    if (!current.image.w) current.image.w = this.width || 0;
    if (!current.image.h) current.image.h = this.height || 0;
    var w = current.image.w, h = current.image.h;
    if (!w || !h) return;
    var maxW = app.cw() - sbWidth() - 210, maxH = app.ch() - 110;
    var minW = 604, minH = 453;
    if (maxW < w || maxH < h) {
      var sw = maxW / w, sh = maxH / h,
          s = Math.min(sw, sh);
      w = Math.round(w * s); h = Math.round(h * s);
      if (minW > w && minH > h) {
        var sw = minW / w, sh = minH / h,
            s = Math.min(sw, sh);
        w = Math.round(w * s); h = Math.round(h * s);
      }
    }
    pi.style.width = pc.style.width = pf.style.width = w + 'px';
    pi.style.height = pb.style.height = pf.style.height = h + 'px';
    if (current.image.h <= 13) { // fix for slowpoke browsers
      var that = this; current.image.h = 0;
      setTimeout(function(){ setImageSize.call(that); }, 50);
    }
  }
  var current = {
    source: null,
    source_name: null,
    source_type: null,
    one: true,
    all: false,
    num: 0
  };
  function setPhoto(num, no_push, replace) {
    var source = current.source, p = source[num];
    if (p) {
      pvl.scrollTop = 0;
      var photo_link = 'photo' + p.id, photo_src = p.src_xxbig || p.src_xbig || p.src_big;
      pb.href = '/' + photo_link;
      if (pi && pi.src != photo_src) {
        pi.onstartload = pi.onload = null;
        remove(pi);
        current.image = {};
        pi = ce('img', {src: photo_src, alt: ''});
        pi.onstartload = pi.onload = setImageSize;
        pimg.appendChild(pi);
        detectstartload(pi);
      }
      ps.innerHTML = source.length > 1 ? 'Photo ' + (num + 1) + ' of ' + source.length : 'Photo';
      pd.innerHTML = prepareText(p.text || '');
      var url = app.current.mode == 'profile' ?
        '?z=' + photo_link + '/' + current.source_name + (
          current.source_type == 'photos' ? '&n=' + current.num : ''
        ) :
        '/' + photo_link + '?n=' + current.num;
      !no_push && app.nav(url, null, {push_only: true, replace: replace});
    } else {
      current.image = {};
      pi.src = LOADING_IMG;
      setImageSize.call(pi);
    }
    if (!current.one) {
      preloadPhotos();
      preloadImages();
    }
  }
  var preload_in_process = false;
  function getPhotoByNum(num) {
    if (num < 0) return getPhotoByNum(current.source.length + num);
    if (num >= current.source.length) return getPhotoByNum(num - current.source.length);
    return current.source[num];
  }
  function preloadPhotos() {
    if (preload_in_process) return;
    if (current.source_type == 'wall') {
      if (!current.all) {
        var photo = getPhotoByNum(current.num);
        preload_in_process = true;
        var photos = [];
        for (var i = 0, l = current.source.length; i < l; i++) {
          photos.push(current.source[i].id);
        }
        var code = tpl.get(tpl.CODE_PHOTOS_GET_FROM_WALL, {photos: photos.join(',')});
        VK.api('execute', {code: code}, function(data) {
          preload_in_process = false;
          current.all = true;
          if (!data.response) return app.apiError(data);
          savePhoto(data.response);
          setPhoto(current.num, true);
        });
      }
    } else if (current.source_type == 'photos') {
      var tpl_data = [];
      for (var i = 0; i < 50; i++) {
        var num = i + current.num, p = getPhotoByNum(num);
        if (!p || typeof p.text === 'undefined') {
          if (num >= current.source.length) {
            tpl_data.push({owner_id: app.current.user_id, offset: num - current.source.length});
            tpl_data.push({owner_id: app.current.user_id, offset: 0});
          } else {
            tpl_data.push({owner_id: app.current.user_id, offset: num});
          }
          break;
        }
      }
      for (var i = -1; i > -20; i--) {
        var num = i + current.num, p = getPhotoByNum(num);
        if (!p || typeof p.text === 'undefined') {
          var offset = num - 99;
          if (num < 0) {
            tpl_data.push({owner_id: app.current.user_id, offset: Math.max(0, current.source.length + offset)});
          } else {
            tpl_data.push({owner_id: app.current.user_id, offset: Math.max(0, current.source.length - 99)});
            (offset < 0) && tpl_data.push({owner_id: app.current.user_id, offset: 0});
          }
          break;
        }
      }
      if (!tpl_data.length) return;
      preload_in_process = true;
      var code = tpl.get(tpl.CODE_PHOTOS_GET_FROM_ALL, {items:tpl_data});
      VK.api('execute', {code: code}, function(data) {
        preload_in_process = false;
        if (!data.response) return app.apiError(data);
        for (var i = 0, l = data.response.length; i < l; i++) {
          if (data.response[i]) {
            data.response[i].photos.shift();
            saveSource(current.source_name, data.response[i].photos, current.source.length, +data.response[i].offset);
          }
        }
        setPhoto(current.num, true);
      });
    }
  }
  function preloadImages() {
    for (var i = 0, j = current.num + 1; i < IMG_CACHE_SIZE; i++) {
      var num = i + j, p = getPhotoByNum(num),
          photo_src = p && (p.src_xxbig || p.src_xbig || p.src_big);
      if (photo_src && !imgCacheMap[photo_src]) {
        var img = imgCacheMap[photo_src] = new Image();
        img.src = photo_src;
        img.onload = function() { imgCacheMap[photo_src] = true; };
      }
    }
  }
  function show() {
    if (!pvc) return;
    var st = htmlNode.scrollTop;
    addClass('photo_view', htmlNode);
    htmlNode.scrollTop = st; // ff fix
    onBodyResize(true);
    (current.one ? addClass : removeClass)('one_photo', pvc);
  }
  function hide(no_push) {
    if (!pvc) return;
    var st = htmlNode.scrollTop;
    removeClass('photo_view', htmlNode);
    htmlNode.scrollTop = st; // ff fix
    addClass('one_photo', pvc);
    var return_url = app.current.mode == 'profile' ?
      '/' + app.user(app.current.user_id).screen_name :
      '/photos' + app.current.user_id;
    !no_push && app.nav(return_url, null, {push_only: true});
  }
  
  onBodyResize(function() {
    if (!pvc) return;
    if (!hasClass('photo_view', htmlNode)) return;
    pi && setImageSize.call(pi);
  });
  
  return {
    save: savePhoto,
    get: getPhoto,
    saveSource: saveSource,
    getSource: getSource,
    open: function(p, src, event, no_push) {
      if (isSpecialClick(event)) return true;
      pvInit();
      current.source_name = src;
      current.source_type = (/^(photos|wall)/i.exec(current.source_name) || [''])[0];
      current.source = getSource(current.source_name);
      current.num = getNum(p, current.source);
      if (current.num === -1) {
        var ph = getPhoto(p);
        if (ph.id) {
          current.source_type = 'photo';
          current.source = [ph];
          current.num = 0;
        } else {
          if (typeof app.current.params.n !== 'undefined') {
            current.num = +app.current.params.n;
          } else {
            return false;
          }
        }
      }
      current.one = current.source.length < 2;
      current.all = false;
      var no_photo = current.source[current.num] && (p != current.source[current.num].id);
      setPhoto(current.num, no_push && !no_photo, no_photo);
      show();
      pvl.scrollTop = 0;
      return false;
    },
    prev: function(event) {
      if (isSpecialClick(event)) return true;
      pvInit();
      if (current.one) return photo.close();
      (--current.num < 0) && (current.num = current.source.length - 1);
      setPhoto(current.num);
      show();
      return false;
    },
    next: function(event) {
      if (isSpecialClick(event)) return true;
      pvInit();
      if (current.one) return false;
      (++current.num >= current.source.length) && (current.num = 0);
      setPhoto(current.num);
      show();
      return false;
    },
    close: function(event, no_push) {
      if (isSpecialClick(event)) return true;
      hide(no_push);
      return false;
    }
  };
})();