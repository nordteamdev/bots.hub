function Wo_progressIconLoader(container_elem) {
  container_elem.each(function() {
    progress_icon_elem = $(this).find('i.progress-icon');
    default_icon = progress_icon_elem.attr('data-icon');
    hide_back = false;
    if (progress_icon_elem.hasClass('hidde') == true) {
      hide_back = true;
    }
    if ($(this).find('i.fa-spinner').length == 1) {
      progress_icon_elem.removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-' + default_icon);
      if (hide_back == true) {
        progress_icon_elem.hide();
      }
    } else {
      progress_icon_elem.removeClass('fa-' + default_icon).addClass('fa-spinner fa-spin').show();
    }
    return true;
  });
}

function Wo_StartBar() {
    $('#bar_loading').show().animate({width:20 + 80 * Math.random() + "%"}, 500);
}
function Wo_FinishBar() {
    $('#bar_loading').animate({width:"100%"}, 500).delay(300).fadeOut(300, function() {
       $(this).width("0");
    });
}
$(document).ready(function() {
  $('.nav-footer-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('Wide-Footer');
    $(".nav-footer-toggle i").toggleClass('fa-arrow-circle-up fa-arrow-circle-down');
  });
});