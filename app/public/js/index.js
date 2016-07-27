var socket = io();
var showNameTimeout, hideContentTimeout;

$(function () {

  socket.on('connected', function (socket) {
    console.log('connected');
  });

  socket.on('message', function (guestName) {
    clearTimeout(showNameTimeout);

    var content = $('#content');
    var name = $('#name');
    var surname = $('#surname');
    var welcome = $('#welcome-message');
    var video = $('#video');

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

    showNameTimeout = setTimeout(function () {
      name.removeClass('show-name').addClass('hide-name');
      welcome.addClass('hide-welcome').removeClass('show-welcome');
      surname.addClass('hide-surname').removeClass('show-surname');

      video.get(0).play();

      hideContent();

    }, 5000)

  });

  function showNameContainer() {
    var content = $('#content');
    var name = $('#name');
    var welcome = $('#welcome-message');
    var video = $('#video');
    var surname = $('#surname');

    content.removeClass('hide').addClass('show');
    name.removeClass('hide-name').addClass('show-name');
    welcome.removeClass('hide-welcome').addClass('show-welcome');
    surname.removeClass('hide-surname').addClass('show-surname');
  }

  function hideContent() {
    var content = $('#content');
    var name = $('#name');
    clearTimeout(hideContentTimeout);

    hideContentTimeout = setTimeout(function () {
      name.text('');
      content.removeClass('show').addClass('hide');
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
          $(el).css('line-height', elNewFontSize);
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