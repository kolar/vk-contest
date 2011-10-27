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
    return 0;
  }
  
  function setImageSize() {
    var w = this.width || 0, h = this.height || 0;
    if (!w || !h) return;
    pc.style.width = pf.style.width = w + 'px';
    pb.style.height = pf.style.height = h + 'px';
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
    if (!p) {
      pi.src = LOADING_IMG;
      return;
    }
    pvl.scrollTop = 0;
    var photo_link = 'photo' + p.id, photo_src = p.src_xxbig || p.src_xbig || p.src_big;
    pb.href = '/' + photo_link;
    if (pi && pi.src != photo_src) {
      pi.onstartload = pi.onload = null;
      remove(pi);
      pi = ce('img', {src: photo_src, alt: ''});
      pi.onstartload = pi.onload = setImageSize;
      pimg.appendChild(pi);
      detectstartload(pi);
    }
    ps.innerHTML = source.length > 1 ? 'Photo ' + (num + 1) + ' of ' + source.length : 'Photo';
    pd.innerHTML = prepareText(p.text || '');
    var url = app.current.mode == 'profile' ?
      '?z=' + photo_link + '/' + current.source_name + (
        current.source_type == 'wall' ? '' : '&n=' + current.num
      ) :
      '/' + photo_link + '?n=' + current.num;
    !no_push && app.nav(url, null, {push_only: true, replace: replace});
    preloadPhotos();
    preloadImages();
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
          if (!data.response) return; // ToDo: error msg 'api error'
          savePhoto(data.response);
          setPhoto(current.num, true);
        });
      }
    } else {
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
        if (!data.response) return; // ToDo: error msg 'api error'
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
    addClass('photo_view', htmlNode);
    onBodyResize(true);
    (current.one ? addClass : removeClass)('one_photo', pvc);
  }
  function hide(no_push) {
    if (!pvc) return;
    removeClass('photo_view', htmlNode);
    addClass('one_photo', pvc);
    var return_url = app.current.mode == 'profile' ?
      '/' + app.user(app.current.user_id).screen_name :
      '/photos' + app.current.user_id;
    !no_push && app.nav(return_url, null, {push_only: true});
  }
  
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
      current.one = current.source.length < 2;
      current.all = false;
      current.num = getNum(p, current.source);
      var no_photo = p != current.source[current.num].id;
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