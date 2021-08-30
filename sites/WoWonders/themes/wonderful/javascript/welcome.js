$(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });  
function Wo_ResendCode() {
  var user_id = $('#confirm-user-id').val();
  var phone_number = $('#phone-num').val();
  $('#re-send').hide();
  Wo_SetTimer();
  $.post(Wo_Ajax_Requests_File() + '?f=resned_code', {user_id:user_id, phone_number:phone_number}, function (data) {
    if (data.status == 200) {

    } else {
      alert(data.errors);
    }
  });
}

function Wo_SetTimer() {
  $('#hideMsg h2 span').text('60');
  $('#hideMsg').fadeIn('fast');
  var sec = $('#hideMsg h2 span').text();
  var timer = setInterval(function() { 
  $('#hideMsg h2 span').text(--sec);
  if (sec == 0) {
      $('#hideMsg').fadeOut('fast', function () {
        clearInterval(timer);
        $('#re-send').fadeIn('fast');
      });
  } 
  }, 1000);
}
current_width = $(window).width();
$(function() {
      if (current_width > 920) {
        setTimeout(function () {
          AnimateUsers($('.image-1'), 'bounce');
          AnimateUsers($('.image-6'), 'bounce');
          AnimateUsers($('.image-2'), 'bounce');
          AnimateUsers($('.image-4'), 'bounce');
          AnimateUsers($('.image-3'), 'bounce');
          AnimateUsers($('.image-5'), 'bounce');
          AnimateUsers($('.image-7'), 'bounce');
          AnimateUsers($('.image-8'), 'bounce');
          AnimateUsers($('.image-9'), 'bounce');
          AnimateUsers($('.image-10'), 'bounce');
          AnimateUsers($('.image-11'), 'bounce');
          AnimateUsers($('.image-12'), 'bounce');
      }, 500);
    }
});

function AnimateUsers(div_name, effect) {
  div_name.not(':animated').css({'opacity': 1 }).effect(effect, {origin:['middle','center'], from:{width:div_name.width()/2,height:div_name.height()/2}, percent: 100, easing: "easeInCirc" }, 800);
}