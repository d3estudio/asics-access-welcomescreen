var socket = io();
var showNameTimeout, hideContentTimeout;
var nameList = new Array();
var is_animating = false;

$(function () {
  var content = $('#content');
  var name = $('#name');
  var surname = $('#surname');
  var welcome = $('#welcome-message');
  var video = $('#video');

  socket.on('connected', function (socket) {
    console.log('connected');
  });

  socket.on('message', function (guestName) {
    nameList.push(guestName);
    nextAnimation();
  });

  function nextAnimation () {
    if (is_animating == false && nameList.length >= 1) {
      startAnimation(nameList.shift());
    }
    else {
      clearTimeout(showNameTimeout);
      showNameTimeout = setTimeout(hideContent, 2000);
    }
  }

  function startAnimation (guestName) {
    is_animating = true;
    clearTimeout(showNameTimeout);

    guestName = guestName.replace(/[äáàâã]/g,'a').replace(/[íìî]/g,'i').replace(/[éèê]/g,'e').replace(/[óòôõ]/g,'o').replace(/[úùû]/g,'u');

    var splitedName = guestName.split(" ");
    var firstName = splitedName[0];
    splitedName.shift();
    var secondName = splitedName.join(" ");

    name.text(firstName);
    surname.text(secondName);

    video.get(0).pause();
    video.get(0).currentTime = '0';

    showNameContainer();
    resizeText();

    var animation_time = 9000;
    if (nameList.length >= 1) animation_time = 2000;
    
    showNameTimeout = setTimeout(hideContent, animation_time);
  }

  function showNameContainer() {
    content.removeClass('hide').addClass('show');
    name.removeClass('hide-name').addClass('show-name');
    welcome.removeClass('hide-welcome').addClass('show-welcome');
    surname.removeClass('hide-surname').addClass('show-surname');
  }

  function hideContent() {
    name.removeClass('show-name').addClass('hide-name');
    welcome.addClass('hide-welcome').removeClass('show-welcome');
    surname.addClass('hide-surname').removeClass('show-surname');

    if (nameList.length == 0)
      video.get(0).play();

    clearTimeout(hideContentTimeout);
    hideContentTimeout = setTimeout(function () {
      name.text('');
      content.removeClass('show').addClass('hide');

      is_animating = false;
      nextAnimation();
    }, 300)
  }

  function resizeText() {
    var el, element, _i, _len, _results;
    element = $('#name');
    element.css('font-size', '600px');
    element.css('line-height', '600px');

    if (element.length < 0) {
      return;
    }
    _results = [];
    for (_i = 0, _len = element.length; _i < _len; _i++) {
      el = element[_i];
      _results.push((function(el) {
        var resizeText, _results1;
        resizeText = function() {
          var elNewFontSize;
          elNewFontSize = (parseInt($(el).css('font-size').slice(0, -2)) - 1) + 'px';

          var lineHeight = parseInt(elNewFontSize);
          lineHeight = lineHeight - lineHeight/4.5 + "px";

          $(el).css('line-height', lineHeight);
          return $(el).css('font-size', elNewFontSize);
        };
        _results1 = [];
        while (el.scrollWidth > el.offsetWidth) {
          _results1.push(resizeText());
        }
        return _results1;
      })(el));
    }

    return _results;
  }
});