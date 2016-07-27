var socket = io();
var showNameTimeout, hideContentTimeout;

$(function () {

  socket.on('connected', function (socket) {
    console.log('connected');
  });

  socket.on('message', function (guestName) {
    clearTimeout(showNameTimeout);

    var content = $('#content');
    var nameContainer = $('#name');
    var surnameContainer = $('#surname');
    var name = $('#name').text();
    var welcome = $('#welcome-message');
    var video = $('#video');

    var splitedName = guestName.split(" ");
    var firstName = splitedName[0];
    var secondName = splitedName[1];

    nameContainer.text(firstName);
    surnameContainer.text(secondName);

    video.get(0).pause();
    video.get(0).currentTime = '0';

    console.log(firstName)

    // resizeText(nameContainer, guestName);

    showNameContainer();

    showNameTimeout = setTimeout(function () {
      nameContainer.removeClass('show-name').addClass('hide-name');
      welcome.addClass('hide-welcome').removeClass('show-welcome');
      surnameContainer.addClass('hide-surname').removeClass('show-surname');

      video.get(0).play();

      // hideContent();

    }, 5000)

  });

  function showNameContainer() {
    var content = $('#content');
    var name = $('#name');
    var welcome = $('#welcome-message');
    var video = $('#video');
    var surnameContainer = $('#surname');

    content.removeClass('hide').addClass('show');
    name.removeClass('hide-name').addClass('show-name');
    welcome.removeClass('hide-welcome').addClass('show-welcome');
    surnameContainer.removeClass('hide-surname').addClass('show-surname');
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

  function resizeText(el, text) {

    if(text==undefined)
      text = el.html();
    else
      el.html(text);

    var parentWidth = el.parent().width();
    var parentHeight = el.parent().height();
    var fontSize = 600;
    var textWidth = el.find('span').width();

    el.css('width', 'auto');
    el.css('font-size', fontSize+'px');
    el.css('margin-top', '6px');

    while(textWidth > parentWidth){
      fontSize--;
      el.css('font-size', fontSize+'px');
      el.css('margin-top', (parentHeight-fontSize)/2+'px');
    }
    el.css('width', parentWidth+'px');

  }

});