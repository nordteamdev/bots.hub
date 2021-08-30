current_width = $(window).width();
document_title = document.title;

(function($) {

    $.fn.equalHeights = function() {
        var maxHeight = 0,
            $this = $(this);

        $this.each( function() {
            var height = $(this).innerHeight();

            if ( height > maxHeight ) { maxHeight = height; }
        });

        return $this.css('height', maxHeight);
    };

    // auto-initialize plugin
    $('[data-equal]').each(function(){
        var $this = $(this),
            target = $this.data('equal');
        $this.find(target).equalHeights();
    });

})(jQuery);

$(function () {

    $('[data-toggle="popover"]').popover();

    $(document).on('click', '.hide-ad', function(event) {
      event.preventDefault();
      $(this).parents('.ads-wrapper').slideUp('fast',function(){
        $(this).remove();
      })
    });

    $(document).on('click', 'a.ad-renderer.ad', function(event) {
      var self  = $(this)
      var ad_id = self.attr('data-id');
      if (ad_id) {
        self.removeAttr('data-id');
        self.removeClass('ad');
        $.post(FL_Ajax_Requests_File(), {f:'ads',s:'rc',id:ad_id});
      }
    });

    $.fn.scrollTo = function (speed) {
        if (typeof(speed) === 'undefined')
            speed = 500;

        $('html, body').animate({
            scrollTop: ($(this).offset().top - 100)
        }, speed);
    };

    $(document).on('submit','form.share-e-form',function(event){
      event.preventDefault();
      var data = {};
      var self = $(this);
      data['name']  = self.find('input[name=name]').val();
      data['email'] = self.find('input[name=email]').val();
      data['url']   = self.find('input[name=url]').val();
      data['text']  = self.find('textarea').val();
      FL_progressIconLoader(self.find('button')); 
      $.ajax({
        url: FL_Ajax_Requests_File() + "?f=share",
        type: 'POST',
        dataType: 'json',
        data: data,
      })
      .done(function(data) {
        if (data.status == 200) {
          swal({
            type: 'success',
            text: data.message
          })
          FL_Delay(function(){
            swal.close();
          },5000)
        }
        else if(data.status == 400){
          self.find('.share-alert').html('<div class="alert alert-danger">' + data.message + '</div>');
        }

        else if(data.status == 401){
          self.find('.share-alert').html('<div class="alert alert-warning"><i class="fa fa-frown-o"></i> ' + data.message + '</div>');
          FL_Delay(function(){
            swal.close();
          },3000)
        }
        else{
          swal.close();
        }
        FL_progressIconLoader(self.find('button'));
      })
      .fail(function() {
        console.log("error");
      })       
    })


    $('[data-toggle="tooltip"]').tooltip(); 
     var hash = $('.main_session').val();
     $.ajaxSetup({ 
      data: {
          hash_id: hash
      },
      cache: false 
    });
    $(".preventDefault").on('click', function(e) {
      e.preventDefault();
    });

    $(document).on('click','.close-share-em',function(){swal.close();}) 
    
    $(".cd-top").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
    if(current_width > 1000) {
      $(window).scroll(function () {
          if($(document).scrollTop() > 400) {
            $('.cd-top').fadeIn(300);
          } else {
            $('.cd-top').fadeOut(300);
          }
      });
    }
    $('.latest-news-img').hover(function () {
      var $this = $(this);
      $this.find('.share-button').fadeIn(100);
    }, function () {
      var $this = $(this);
      $this.find('.share-button').fadeOut(100);
    });
    $('.video-homepage').hover(function () {
      var $this = $(this);
      var button = $this.find('.latest-videos-button');
      var title = $this.find('.latest-videos-title');
      title.fadeOut(100);
      button.fadeIn(100);
    }, function () {
      var $this = $(this);
      var button = $this.find('.latest-videos-button');
      var title = $this.find('.latest-videos-title');
      button.fadeOut(100);
      title.fadeIn(100);
    });
});
function FL_progressIconLoader(container_elem) {
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


function FL_ShowNavList(type) {
  $('.news-header-dropdown').show();
  $.get(FL_Ajax_Requests_File(), {f: 'get_menu_list', type:type}, function (data) {
    $('.news-header-dropdown').html(data.html);
  });
}
function Showd() {
  $('.news-header-dropdown').show();
}
function HideShowd() {
  $('.news-header-dropdown').hide();
}

var FL_Delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

function FL_AddEntry(type) {
  FL_progressIconLoader($('#add-entry-button'));
  $.get(FL_Ajax_Requests_File(), {f: 'add_entry', type:type}, function (data) {
    $('#post-entries').append(data.html);
    if (type == 'text') {
       CKEDITOR.config.removePlugins = 'elementspath,flash,newpage,forms,entities,filebrowser,htmlwriter,pastetext,pastefromword,sourcearea,clipboard,floatingspace,undo';
       CKEDITOR.replace('news-' + data.id);
    } else {
       
    }
    FL_progressIconLoader($('#add-entry-button'));
  });
}

function FL_FetchVideo(id) {
  var video_container = $('#entry-' + id);
  var video_url = video_container.find('#video-url').val();
  var fetched_video = video_container.find('#fetched-video');
  FL_progressIconLoader(video_container.find('button.btn-blue'));
  var hash_id = $('.hash_id').val();
  $.post(FL_Ajax_Requests_File() + '?f=fetch_video', {video_url:video_url, id:id, hash_id:hash_id}, function (data) {
    if (data.status == 200) {
      fetched_video.html(data.html);
      if (data.type == 'youtube') {
        if ($('#post-preview-image').find('.content').find('img').length == 0) {
          $('#post-preview-image').find('.content').html('<div class="post-image"><img src="' + data.img + '"/></div>');
          $('#post-preview-image-input').val(data.img);
        }
      }
      video_container.find('#entry_video_type').val(data.type);
      video_container.find('#entry_video_id').val(data.video_id);
    } 

    else if (data.status == 400) {

    }

    else if(data.status == 401){
      swal({
        title: 'Error!',
        text: data.message,
        type:"error",
        allowOutsideClick: false
      });
    }

    else {

    }
    FL_progressIconLoader(video_container.find('button.btn-blue'));
  });
}

function FL_FetchImage(id, set_as_lang) {
  var image_container = $('#entry-' + id);
  var image_url = image_container.find('#entry-image-link').val();
  var hash_id   = $('.hash_id').val();
  FL_progressIconLoader(image_container.find('button'));
  $.post(FL_Ajax_Requests_File() + '?f=fetch_image', {image_url:image_url, id:id, hash_id:hash_id}, function (data) {
    if (data.status == 200) {
        image_container.find('.preview-image').html('<div class="post-image">' + data.html + "</div>");
        image_container.find('.preview-image').css('overflow', 'auto');
        image_container.find('.img-content').find('.img-set-as').html("<span class='btn btn-main fl_btn' onclick='FL_MakePreviewImage(" + id + ")'><i class='fa fa-picture-o'></i> " + set_as_lang + "</span>");
        if ($('#post-preview-image').find('.content').find('img').length == 0) {
           $('#post-preview-image').find('.content').html('<div class="post-image"><img src="' + data.img + '"/></div>');
           $('#post-preview-image-input').val(data.img);
        }
      image_container.find('#entry-image-file-name').val(data.img);
    }

    else if (data.status == 400) {
      image_container.find('.error-con').html(data.message);
      FL_Scroll('entry-' + id);
    }

    else if(data.status == 401){
      swal({
        title: 'Error!',
        text: data.message,
        type:"error",
        allowOutsideClick: false
      });
    }

    FL_progressIconLoader(image_container.find('button'));
  });
}

function FL_FetchQuestionImage(id) {
  var image_container = $('#entry-' + id);
  var image_url = image_container.find('#entry-image-link').val();
  var hash_id   = $('.hash_id').val();
  FL_progressIconLoader(image_container.find('button'));
  $.post(FL_Ajax_Requests_File() + '?f=fetch_image', {image_url:image_url, id:id, hash_id:hash_id}, function (data) {
    if (data.status == 200) {
        image_container.find('.preview-image').html('<div class="post-image">' + data.html + "</div>");
        image_container.find('.preview-image').css('overflow', 'auto');        
      image_container.find('#entry-image-file-name').val(data.img);
    }

    else if (data.status == 400) {
      image_container.find('.error-con').html(data.message);
      FL_Scroll('entry-' + id);
    }

    else if(data.status == 401){
      swal({
        title: 'Error!',
        text: data.message,
        type:"error",
        allowOutsideClick: false
      });
    }

    FL_progressIconLoader(image_container.find('button'));
  });
}

function FL_UploadImage(id, set_as_lang) {
  var image_container = $('#entry-' + id);
  var fetched_image = image_container.find('#fetched-image');
  var data = new FormData();
  data.append('image', $('#entry-image-file-' + id).prop('files')[0]);
  var hash_id = $('.hash_id').val();
  $("#img-uploading-wrapper").removeClass('hidden');
  $.ajax({
        type: "POST",
        url: FL_Ajax_Requests_File() + '?f=upload_image&id=' + id + '&hash_id=' + hash_id,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 200) {
            image_container.find('#entry-image-file-name').val(data.img);
            image_container.find('.preview-image').html('<div class="post-image">' + data.html + "</div>");
            image_container.find('.preview-image').css('overflow', 'auto');
            image_container.find('.img-content').find('.img-set-as').html("<span class='btn btn-main fl_btn' onclick='FL_MakePreviewImage(" + id + ")'><i class='fa fa-picture-o'></i> " + set_as_lang + "</span>");
            if ($('#post-preview-image').find('.content').find('img').length == 0) {
               $('#post-preview-image').find('.content').html('<div class="post-image"><img src="' + data.img + '"/></div>');
               $('#post-preview-image-input').val(data.img);
            }
            $('#entry-image-file-' + id).val('');
          }

          else if (data.status == 400) {
            alert(data.message);
            $('#entry-image-file-' + id).val('');
            $('#entry-image-file-' + id).attr('name', '');
          }

          else if(data.status == 401){
            swal({
              title: 'Error!',
              text: data.message,
              type:"error",
              allowOutsideClick: false
            });
          }


          FL_Delay(function(){
            $("#img-uploading-wrapper").addClass('hidden');
          },500);
        }
    });
}

function FL_UploadResultCover(id) {
  var image_container = $('#entry-' + id);
  var fetched_image = image_container.find('#fetched-image');
  var data = new FormData();
  data.append('image', $('#entry-image-file-' + id).prop('files')[0]);
  var hash_id = $('.hash_id').val();
  $("#img-uploading-wrapper").removeClass('hidden');
  $.ajax({
        type: "POST",
        url: FL_Ajax_Requests_File() + '?f=upload_image&id=' + id + '&hash_id=' + hash_id,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 200) {
            $('#entry-' + id).find('#entry-image-file-name').val(data.img);
            image_container.find('.preview-image').html('<div class="post-image">' + data.html + "</div>");
            image_container.find('.preview-image').css('overflow', 'auto');
            $('#entry-image-file-' + id).val('');
          } 

          else if (data.status == 400) {
            alert(data.message);
            $('#entry-image-file-' + id).val('');
            $('#entry-image-file-' + id).attr('name', '');
          }

          else if(data.status == 401){
            swal({
              title: 'Error!',
              text: data.message,
              type:"error",
              allowOutsideClick: false
            });
          }

          FL_Delay(function(){
            $("#img-uploading-wrapper").addClass('hidden');
          },500);
        }
    });
}

function FL_GetTweet(id) {
  var tweet_container = $('#entry-' + id);
  var fetched_tweet = tweet_container.find('.fetched-tweet');
  var tweet_url = tweet_container.find('#tweet-url').val();
  var hash_id = $('.hash_id').val();
  tweet_container.find('.error-con').empty();
  FL_progressIconLoader(tweet_container.find('button'));
  $.post(FL_Ajax_Requests_File() + '?f=fetch_tweet', {id:id, tweet_url:tweet_url, hash_id:hash_id}, function (data) {
    if (data.status == 200) {
      fetched_tweet.html(data.html);
    } else if (data.status == 400) {
      tweet_container.find('.error-con').html(data.message);
      FL_Scroll('entry-' + id);
    }
    FL_progressIconLoader(tweet_container.find('button'));
  });
}

function FL_GetInstagramPost(id) {
  var instagram_container = $('#entry-' + id);
  var fetched_instagram = instagram_container.find('.fetched-instagram');
  var instagram_url = instagram_container.find('#instagram-url').val();
  var hash_id = $('.hash_id').val();
  instagram_container.find('.error-con').empty();
  FL_progressIconLoader(instagram_container.find('button'));
  $.post(FL_Ajax_Requests_File() + '?f=fetch_instagram', {id:id, instagram_url:instagram_url, hash_id:hash_id}, function (data) {
    if (data.status == 200) {
      fetched_instagram.html(data.html);
    } else if (data.status == 400) {
      instagram_container.find('.error-con').html(data.message);
      FL_Scroll('entry-' + id);
    }
    FL_progressIconLoader(instagram_container.find('button'));
  });
}

function FL_GetSoundCloudPost(id) {
  var soundcloud_container = $('#entry-' + id);
  var fetched_soundcloud = soundcloud_container.find('.fetched-soundcloud');
  var soundcloud_url = soundcloud_container.find('#soundcloud-url').val();
  var hash_id = $('.hash_id').val();
  soundcloud_container.find('.error-con').empty();
  FL_progressIconLoader(soundcloud_container.find('button'));
  $.post(FL_Ajax_Requests_File() + '?f=fetch_soundcloud', {id:id, soundcloud_url:soundcloud_url, hash_id:hash_id}, function (data) {
    if (data.status == 200) {
      fetched_soundcloud.html(data.html);
      soundcloud_container.find('#entry_soundcloud_id').val(data.id);
    } else if (data.status == 400) {
      soundcloud_container.find('.error-con').html(data.message);
      FL_Scroll('entry-' + id);
    }
    FL_progressIconLoader(soundcloud_container.find('button'));
  });
}

function FL_GetFacebookPost(id) {
  var facebook_container = $('#entry-' + id);
  var fetched_facebook = facebook_container.find('.fetched-facebook');
  var facebook_url = facebook_container.find('#facebook-url').val();
  var facebook_got_url = facebook_container.find('#facebook-got-url');
  var hash_id = $('.hash_id').val();
  FL_progressIconLoader(facebook_container.find('button'));
  facebook_container.find('.error-con').empty();
  $.post(FL_Ajax_Requests_File() + '?f=fetch_facebook', {id:id, facebook_url:facebook_url, hash_id:hash_id}, function (data) {
    if (data.status == 200) {
      fetched_facebook.html(data.html);
      facebook_got_url.val(facebook_url);
      FB.XFBML.parse();
    } else if (data.status == 400) {
      facebook_container.find('.error-con').html(data.message);
      FL_Scroll('entry-' + id);
    }
    FL_progressIconLoader(facebook_container.find('button'));
  });
}

function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }

function FL_UploadPreviewImage() {
  var data = new FormData();
  data.append('image', $('#news-preview-image').prop('files')[0]);
  var hash_id = $('.hash_id').val();
  var id = '123';
  $("#img-uploading-wrapper").removeClass('hidden');
  $.ajax({
        type: "POST",
        url: FL_Ajax_Requests_File() + '?f=upload_image&id=' + id + '&hash_id=' + hash_id,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 200) {
            $('#post-preview-image').find('.content').html('<div class="post-image"><img src="' + data.img + '"/></div>');
            $('#post-preview-image-input').val(data.img);
          }

          else if (data.status == 400) {
            alert(data.message);
          }

          else if(data.status == 401){
            swal({
              title: 'Error!',
              text: data.message,
              type:"error",
              allowOutsideClick: false
            });
          }

          $('#news-preview-image').attr('name', '');
          FL_Delay(function(){
            $("#img-uploading-wrapper").addClass('hidden');
          },500);
        }
    });
}

function FL_MakePreviewImage(id) {
    var image_container = $('#entry-' + id);
    var image_url = image_container.find('#entry-image-file-name').val();
    $('#post-preview-image').find('.content').html('<div class="post-image"><img src="' + image_url + '"/></div>');
    $('#post-preview-image-input').val(image_url);
    $("html, body").animate({ scrollTop: 0 }, "slow");
}
function FL_RemoveEntry(id) {
  var box = $('#entry-' + id).slideUp(200, function () {
    $(this).remove();
  });;
}



function FL_RemoveEntryByID(id) {
  var box = $('#entry-' + id).slideUp(200, function () {
     $('#entry-' + id).remove();
     $.get(FL_Ajax_Requests_File(), {f: 'delete_entry', id:id});
  });
}
function FL_OpenFetchImageInput(id) {

  var image_container = $('#entry-' + id);
  image_container.find('.image-link').slideDown(100, function () {
    image_container.find('.fetch-image-link').remove();
  });
}

function FL_Scroll(div_name) {
    $('html, body').animate({
        scrollTop: $("#" + div_name).offset().top - 120
    }, 500);
}

function textAreaAdjust(o, h) {
    o.style.height = h + 'px';
    o.style.height = (5+o.scrollHeight)+"px";
}

function FL_UpEntry(id) {
  var entry_container = $('#entry-' + id);
  entry_container.insertBefore(entry_container.prev());
  FL_Scroll('entry-' + id);
}
function FL_DownEntry(id) {
  var entry_container = $('#entry-' + id);
  entry_container.insertAfter(entry_container.next());
  FL_Scroll('entry-' + id);
}

function FL_RemoveInput(entry_id, id) {
  var option_container = $('#entry-' + entry_id);
  option_container.find('#answer-' + id).slideUp(200, function () {
    $(this).remove();
  });
}

function FL_AddAnswer(id, answer_key) {
  var option_container = $('#entry-' + id);
  var option_answers_con = option_container.find('#answer-text-'+id).find('#answer-text-cont');
  var option_answer_id = option_container.find('#answer-text-'+id).find('.answer:last').attr('data-id');
  answer_id = (option_answer_id) ? (Number(option_answer_id) + 1) : 1;
  var input = '<div class="answer" id="answer-' + answer_id + '" data-id="' + answer_id + '"><input type="text" data-id="' + answer_id + '" class="form-control entry_answer" data-answer="entry_answer" placeholder="' + answer_key + ' ' + answer_id + '"><svg xmlns="http://www.w3.org/2000/svg" onclick="FL_RemoveInput(' + id + ', ' + answer_id + ');" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg></div>';
  option_answers_con.append(input);
}

function FL_AddImgAnswer(id, answer_key) {
  var option_container = $('#entry-' + id);
  var option_answers_con = option_container.find('#answer-img-'+id).find('#answer-img-cont');
  var option_answer_id = option_container.find('#answer-img-'+id).find('.pick-answer-img:last').attr('data-id');
  answer_id = (option_answer_id) ? (Number(option_answer_id) + 1) : 1;
  var input = '<div class="answer-img-wrapper"><div class="answer-img"><div class="pick-answer-img opt-ans-preview-'+id+'" id="'+id+'" data-id="'+answer_id+'"><div class="preview"><div class="upload_img" id="preview-image-'+id+'-'+answer_id+'"><div><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#222" d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" /></svg></span> '+answer_key+'</div></div></div><input class="hidden entry_answer" data-answer="entry_answer" id="'+answer_id+'" value=""></div></div><span onclick="$(this).parent().remove();"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg></span></div>';
  option_answers_con.append(input);
}





function FL_Cancel() {
  if (confirm('Are you sure you want to cancel ? all changes will be lost.')) {
     window.location.href = site_url;
  }
}

function FL_Vote(entry_id, id) {
  var vote_container = $('#answer-' + id);
  var attr = $('#e-' + entry_id).find('.entry-options').attr('data-clicked');
  if (typeof attr !== typeof undefined && attr !== false) {
      alert('You have already voted this poll.');
      return false;
  }
  $('#e-' + entry_id).find('.entry-options').attr('data-clicked', true);
  vote_container.find('.answer-info span').html('<i class="fa fa-check-circle-o"></i>');
  vote_container.find('.answer').css('background-color','#f2f2f2');
  vote_container.find('.answer').css('border-color','#f1f1f1');
  $.get(FL_Ajax_Requests_File(), {f: 'vote', id:id, entry_id:entry_id}, function (data) {
      if (data.status == 200) {
        $('#e-' + entry_id).find('.votes').removeClass('hidden');
        data.data_option.forEach(function(option) {
          $('#e-' + entry_id).find('#total-votes').text(option.all);
          $('#answer-' + option.id).find('.answer-vote').html(option.percentage);
          if (option.percentage_num > 0) {
            $('#answer-' + option.id).find('.percentage-border').text(' ').css('width', option.percentage);
          }
        });
      }
      
  });
}

function FL_VoteImg(entry_id, id) {
  var vote_container = $('#answer-' + id);
  var attr = $('#e-' + entry_id).find('.entry-options').attr('data-clicked');
  if (typeof attr !== typeof undefined && attr !== false) {
      alert('You have already voted this poll.');
      return false;
  }
  $('#e-' + entry_id).find('.entry-options').attr('data-clicked', true);
  vote_container.find('.answer-vote-wrapper span.pull-left').html('<i class="fa fa-check-circle-o"></i>');
  vote_container.find('.answer').css('background-color','#f2f2f2');
  vote_container.find('.answer').css('border-color','#f1f1f1');
  
  $.get(FL_Ajax_Requests_File(), {f: 'vote', id:id, entry_id:entry_id}, function (data) {
      if (200) {
        $('#e-' + entry_id).find('.votes').removeClass('hidden');
        data.data_option.forEach(function(option) {
          $('#e-' + entry_id).find('#total-votes').text(option.all);
          $('#answer-' + option.id).find('.answer-vote').html(option.percentage);
          if (option.percentage_num > 0) {
            $('#answer-' + option.id).find('.percentage-border').text(' ').css('width', option.percentage);
          }
          
        });
        FL_Delay(function(){
          $('#e-' + entry_id).find('.vote-image-wrapper').each(function(index, el) {
            if ($(el).attr('id') != 'answer-' + id) {
              $(el).css('opacity', '0.6');
            }
          });
        },800);
      }
      
  });
}

function FL_ShareLink(href, e, id, type) {
  e.preventDefault();
  if (href != 'none') {
    window.open(href, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=350');
  }
  $.get(FL_Ajax_Requests_File(), {f:'share_link', id:id, type:type}, function (data) {
     $('#share-number').html(Number($('#share-number').text()) + 1);
  });
  return false;
}

function FL_DeletePost(id, type) {
  $('#delete-button').attr('disabled', true);
  $.get(FL_Ajax_Requests_File(), {f:'delete_post', id:id, type:type}, function (data) {
    if (data.status == 200) {
      $('#delete-button').html('<i class="fa fa-check"></i> Post is deleted');
      setTimeout(function () {
         window.location.href = data.href;
      }, 2000);
    }
    $('#delete-button').attr('enabled', true);
  });
}

function scrollToTop() {
    verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $('html');
    offset = element.offset();
    offsetTop = offset.top;
    $('html, body').animate({
      scrollTop: offsetTop
    }, 300, 'linear');
}

function FL_LoadMore(where, type, id, user_id, button, c_id, keyword, page_in) {
  $('.load-more-button').addClass('loading');
  if (!user_id) {
      user_id = 0;
  }
  keyword_ = '';
  if (keyword) {
    keyword_ = keyword;
  }
  page = 'main';
  if (page_in) {
    if (page_in == 'search') {
      page = 'search';
    }
  }
  $.get(FL_Ajax_Requests_File(), {f:'load_more', id:id, type:type, where:where, user_id:user_id, c_id:c_id, keyword:keyword_, page:page}, function (data) {
      if (data) {
        $('#' + where).append(data);
      } else {
        $('.load-more-button').text('No more posts to show');
        setTimeout(function () {
          $('.load-more-button').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 19px;margin-top: -4px;"><path fill="currentColor" d="M19,12H22.32L17.37,16.95L12.42,12H16.97C17,10.46 16.42,8.93 15.24,7.75C12.9,5.41 9.1,5.41 6.76,7.75C4.42,10.09 4.42,13.9 6.76,16.24C8.6,18.08 11.36,18.47 13.58,17.41L15.05,18.88C12,20.69 8,20.29 5.34,17.65C2.22,14.53 2.23,9.47 5.35,6.35C8.5,3.22 13.53,3.21 16.66,6.34C18.22,7.9 19,9.95 19,12Z"></path></svg> Load more');
        }, 2000);
      }
      $('.load-more-button').removeClass('loading');
  });
}

function Fl_DeleteUserFromAdmin(id) {
  if (!id) { return false; }
  if (!confirm("Are you sure you want to delete this user?")) {
    return false;
  }
   $('tr[data-id="' + id + '"]').slideUp(function () {
      $(this).remove();
   });
  $.get(FL_Ajax_Requests_File(), {f:'admincp', s:'delete_user', id:id});
}

function FL_ActiveAction(type, id, activation, layout) {
  if (!id) { return false; }
  if (!type) {return false;}
  if (!activation) { return false; }
  if (activation == 'activate') {
    $('tr[data-id="' + id + '"]').find('.activation-text').removeClass('active-0').addClass('active-1').text('Active');
  } else {
    $('tr[data-id="' + id + '"]').find('.activation-text').removeClass('active-1').addClass('active-0').text('Pending');
  }
  $.get(FL_Ajax_Requests_File(), {f:'admincp', s:'activation', id:id, type:type, activation:activation}, function (data) {

  });
}

function FL_ActiveUserAction(id, activation, layout) {
  if (!id) { return false; }
  if (!activation) { return false; }
  if (activation == 'activate') {
    $('tr[data-id="' + id + '"]').find('.activation-text').removeClass('active-0').addClass('active-1').text('Active');
  } else {
    $('tr[data-id="' + id + '"]').find('.activation-text').removeClass('active-1').addClass('active-0').text('Pending');
  }
  $.get(FL_Ajax_Requests_File(), {f:'admincp', s:'user_activation', id:id, activation:activation}, function (data) {

  });
}

function FL_UploadOptImg(id = false,self = false){
  if (!id || !self) { return false;}

  var image_container = $('.opt-ans-preview-' + id);
  var data    = new FormData();
  data.append('image', $('#opt-img-' + id).prop('files')[0]);
  var hash_id = $('.hash_id').val();
  var index   = $(self).attr('data-index');
  $("#img-uploading-wrapper").removeClass('hidden');
  $.ajax({
        type: "POST",
        url: FL_Ajax_Requests_File() + '?f=upload_opt_img&hash_id=' + hash_id,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 200) {
            image_container.find('input[id='+index+']').val(data.img);
            image_container.find('div.preview').find('#preview-image-'+id+'-'+index).html(data.html);
            $('#opt-img-' + id).val('');
          }

          else if (data.status == 400) {
            alert(data.message);
          }

          else if(data.status == 401){
            swal({
              title: 'Error!',
              text: data.message,
              type:"error",
              allowOutsideClick: false
            });
          }

          FL_Delay(function(){
            $("#img-uploading-wrapper").addClass('hidden');
          },300)
          
        }
    });
}

function FL_UploadQuestionImg(id = false,self = false){
  if (!id || !self) { return false;}

  var image_container = $('.question-ans-preview-' + id);
  var data    = new FormData();
  data.append('image', $('#questionans-img-' + id).prop('files')[0]);
  var hash_id = $('.hash_id').val();
  var index   = $(self).attr('data-index');
  $("#img-uploading-wrapper").removeClass('hidden');
  $.ajax({
        type: "POST",
        url: FL_Ajax_Requests_File() + '?f=quiz&s=upload&hash_id=' + hash_id,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 200) {
            image_container.find('input#' + index).val(data.img);
            image_container.find('div.preview').find('#preview-image-'+id+'-'+index).html(data.html);
            $('#questionans-img-' + id).val('');
          }

          else if (data.status == 400) {
            alert(data.message);
          }

          else if(data.status == 401){
            swal({
              title: 'Error!',
              text: data.message,
              type:"error",
              allowOutsideClick: false
            });
          }
          
          FL_Delay(function(){
            $("#img-uploading-wrapper").addClass('hidden');
          },300)
          
        }
    });
}

function FL_RegisterReply(text = false,comm_id = false,event = false,post_id = false,page = false){
  if (!text || !comm_id || !event || !post_id || !page) { return false}

  if (event.keyCode == 13 && event.shiftKey == 0) {
    if (!FL_IsLoggedIn()) {
      try{
        location.href = location.href = site_url + "/login";
      }
      catch (e) {
        alert("Please login to continue!");
        return false;
      }
    }
    else{
      FL_progressIconLoader($("#comm-reply-"+comm_id).find('small'));
      $.ajax({
        url: FL_Ajax_Requests_File() + '?f=comments&s=reply',
        type: 'POST',
        dataType: 'json',
        data: {text:text,id:comm_id,news_id:post_id,page:page},
      })
      .done(function(data) {
        if (data.status == 200) {
          $("#fl-comment-item-replies-list-" + comm_id).append(data.html)
          $("#comm-reply-"+comm_id).find('input').val('').blur();
        }
        FL_progressIconLoader($("#comm-reply-"+comm_id).find('small'));
      })
      .fail(function() {
        alert('Sorry, something went wrong: Please try again later ...');
        FL_progressIconLoader($("#comm-reply-"+comm_id).find('small'));
      })
    }

  }
}

function FL_DeleteComment(comm_id = false,page = false){
  if (!FL_IsLoggedIn()) {
    try{
      location.href = site_url + "/login";
    }
    catch (e) {
      alert("Please login to continue!");
      return false;
    }
  }

  if (comm_id && page) {
    $.ajax({
      url: FL_Ajax_Requests_File() + '?f=comments&s=delete',
      type: 'POST',
      dataType: 'json',
      data: {id:comm_id,page:page},
    })
    .done(function(data) {
      if (data.status == 200) {
        $("[data-comm-item='"+comm_id+"']").slideUp('fast',function(){
          $(this).remove();
        })
      }
    })
    .fail(function() {
      alert('Sorry, something went wrong: Please try again later ...');
    })
  }
}

function FL_DeleteReply(reply_id = false){
  if (reply_id) {
    $.ajax({
      url: FL_Ajax_Requests_File() + '?f=comments&s=delete-reply',
      type: 'POST',
      dataType: 'json',
      data: {id:reply_id},
    })
    .done(function(data) {
      if (data.status == 200) {
        $("[data-reply-item='"+reply_id+"']").slideUp('fast',function(){
          $(this).remove();
        })
      }
    })
    .fail(function() {
      alert('Sorry, something went wrong: Please try again later ...');
    })
  }
}
function FL_StartBar() {
    $('#fl-loading-bar').height("3").show().animate({width:20 + 80 * Math.random() + "%"}, 500);
}

function FL_FinishBar() {
    $('#fl-loading-bar').animate({width:"100%"}, 500).delay(300).fadeOut(300, function() {
       $(this).width("0").height("0");
    });
}

function FL_ArrayMode(arr) {
    var uniqs = {};

    for(var i = 0; i < arr.length; i++) {
        uniqs[arr[i]] = (uniqs[arr[i]] || 0) + 1;
    }

    var max = { val: arr[0], count: 1 };
    for(var u in uniqs) {
        if(max.count < uniqs[u]) { max = { val: u, count: uniqs[u] }; }
    }
    return max.val;
}

function FL_IsLoggedIn(){
  var name = "user_id";
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? true : false;
}

function FL_GetQuizResult(ans,post,index,entry,self){

  if (!ans || !post || !index || !entry || !self) {
    return false;
  }

  if (!window.quiz_results) {
    window.quiz_results    = [];
    window.quiz_result     = false;
  }

  if($(self).parents().find("#e-"+entry).attr('data-question') != 1) {
    $(self).find('span i').replaceWith('<i class="fa fa-check-square-o"></i>');
    $(self).parents().find("#e-"+entry).attr('data-question','1');
    $(self).find('.answer').css({
      backgroundColor:'#e0e0e0',
      color:'#333'
    });
    $(self).siblings().css('opacity','.7');
    window.quiz_results.push(index)
  }

  if($("[data-question=0]").length > 0) {
    $("[data-question=0]").scrollTo();
  }

  else{
    var result_index = FL_ArrayMode(window.quiz_results);

    if (!result_index) {
      alert("Somethong went wrong.Please try again later..");

    }
    if (window.quiz_result) {
      return false;
    }
    else{
      $("#img-uploading-wrapper").removeClass('hidden');
      $.ajax({
        url: FL_Ajax_Requests_File(),
        type: 'GET',
        dataType: 'json',
        data: {f:'quiz',s:'result',index:result_index,post:post},
      })
      .done(function(data) {
        if (data.status == 200) {
          $("#img-uploading-wrapper").addClass('hidden');
          swal({
            title: data.title,
            text: data.text,
            imageUrl: data.image,
            imageAlt: "Picture",
            customClass: 'swal-wide',
            allowOutsideClick:true
          })
          $(".swal-wide").find('.swal2-buttonswrapper').html(data.share);

          $("#display-quiz-result").html(data.result)
          window.quiz_result = true;
        }
        
      })
      .fail(function() {
        console.log("error");
        $("#img-uploading-wrapper").addClass('hidden');
      })
    }
    
  }
}

function FL_HideAnnouncement(id){
  if (!id) { return false;}
  $.ajax({
    url: FL_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'announcement',s:'hide',id:id},
  })
  .done(function(data) {
    if (data.status == 200) {
      $("#fl-announcement-"+id).slideUp('fast',function(){
        $(this).remove();
      })
    }
  })
  .fail(function() {
    return false;
  })
}


/*
slider
 */
(function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)})(function(i){"use strict";var e=window.Slick||{};e=function(){function e(e,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(e),appendDots:i(e),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg></button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(e),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(e).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,"undefined"!=typeof document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=t++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}var t=0;return e}(),e.prototype.activateADA=function(){var i=this;i.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):o===!0?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),s.options.rtl===!0&&s.options.vertical===!1&&(e=-e),s.transformsEnabled===!1?s.options.vertical===!1?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):s.cssTransitions===!1?(s.options.rtl===!0&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),s.options.vertical===!1?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),s.options.vertical===!1?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this,o=t.getNavTarget();null!==o&&"object"==typeof o&&o.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};e.options.fade===!1?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(i.options.infinite===!1&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1===0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;e.options.arrows===!0&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),e.options.infinite!==!0&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(o.options.dots===!0&&o.slideCount>o.options.slidesToShow){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),e.options.centerMode!==!0&&e.options.swipeToSlide!==!0||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.options.draggable===!0&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>0){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(r.originalSettings.mobileFirst===!1?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||l===!1||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!==0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t,o=this;if(e=o.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var s in e){if(i<e[s]){i=t;break}t=e[s]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),e.options.accessibility===!0&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),e.options.accessibility===!0&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),e.options.accessibility===!0&&e.$list.off("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>0&&(i=e.$slides.children().children(),i.removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){var e=this;e.shouldClick===!1&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;t.cssTransitions===!1?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;e.cssTransitions===!1?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick","*",function(t){var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&o.is(":focus")&&(e.focussed=!0,e.autoPlay())},0)}).on("blur.slick","*",function(t){i(this);e.options.pauseOnFocus&&(e.focussed=!1,e.autoPlay())})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){var i=this;return i.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(i.options.infinite===!0)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(i.options.centerMode===!0)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),n.options.infinite===!0?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,n.options.vertical===!0&&n.options.centerMode===!0&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!==0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),n.options.centerMode===!0&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:n.options.centerMode===!0&&n.options.infinite===!0?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:n.options.centerMode===!0&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=n.options.vertical===!1?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,n.options.variableWidth===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,n.options.centerMode===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){var e=this;return e.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(e.options.infinite===!1?i=e.slideCount:(t=e.options.slidesToScroll*-1,o=e.options.slidesToScroll*-1,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o,s,n=this;return s=n.options.centerMode===!0?Math.floor(n.$list.width()/2):0,o=n.swipeLeft*-1+s,n.options.swipeToSlide===!0?(n.$slideTrack.find(".slick-slide").each(function(e,s){var r,l,d;if(r=i(s).outerWidth(),l=s.offsetLeft,n.options.centerMode!==!0&&(l+=r/2),d=l+r,o<d)return t=s,!1}),e=Math.abs(i(t).attr("data-slick-index")-n.currentSlide)||1):n.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){var t=this;t.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),t.options.accessibility===!0&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);if(i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),s!==-1){var n="slick-slide-control"+e.instanceUid+s;i("#"+n).length&&i(this).attr({"aria-describedby":n})}}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.options.focusOnChange?e.$slides.eq(s).attr({tabindex:"0"}):e.$slides.eq(s).removeAttr("tabindex");e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),i.options.accessibility===!0&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),e.options.accessibility===!0&&e.$dots.on("keydown.slick",e.keyHandler)),e.options.dots===!0&&e.options.pauseOnDotsHover===!0&&e.slideCount>e.options.slidesToShow&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),e.options.accessibility===!0&&e.$list.on("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&e.options.accessibility===!0?e.changeSlide({data:{message:e.options.rtl===!0?"next":"previous"}}):39===i.keyCode&&e.options.accessibility===!0&&e.changeSlide({data:{message:e.options.rtl===!0?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||r.$slider.attr("data-sizes"),n=document.createElement("img");n.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),r.$slider.trigger("lazyLoaded",[r,e,t])})},n.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),r.$slider.trigger("lazyLoadError",[r,e,t])},n.src=t})}var t,o,s,n,r=this;if(r.options.centerMode===!0?r.options.infinite===!0?(s=r.currentSlide+(r.options.slidesToShow/2+1),n=s+r.options.slidesToShow+2):(s=Math.max(0,r.currentSlide-(r.options.slidesToShow/2+1)),n=2+(r.options.slidesToShow/2+1)+r.currentSlide):(s=r.options.infinite?r.options.slidesToShow+r.currentSlide:r.currentSlide,n=Math.ceil(s+r.options.slidesToShow),r.options.fade===!0&&(s>0&&s--,n<=r.slideCount&&n++)),t=r.$slider.find(".slick-slide").slice(s,n),"anticipated"===r.options.lazyLoad)for(var l=s-1,d=n,a=r.$slider.find(".slick-slide"),c=0;c<r.options.slidesToScroll;c++)l<0&&(l=r.slideCount-1),t=t.add(a.eq(l)),t=t.add(a.eq(d)),l--,d++;e(t),r.slideCount<=r.options.slidesToShow?(o=r.$slider.find(".slick-slide"),e(o)):r.currentSlide>=r.slideCount-r.options.slidesToShow?(o=r.$slider.find(".slick-cloned").slice(0,r.options.slidesToShow),e(o)):0===r.currentSlide&&(o=r.$slider.find(".slick-cloned").slice(r.options.slidesToShow*-1),e(o))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){var i=this;i.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;if(!t.unslicked&&(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),t.options.accessibility===!0&&(t.initADA(),t.options.focusOnChange))){var o=i(t.$slides.get(t.currentSlide));o.attr("tabindex",0).focus()}},e.prototype.prev=e.prototype.slickPrev=function(){var i=this;i.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),r=document.createElement("img"),r.onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),l.options.adaptiveHeight===!0&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;return"boolean"==typeof i?(e=i,i=e===!0?0:o.slideCount-1):i=e===!0?--i:i,!(o.slideCount<1||i<0||i>o.slideCount-1)&&(o.unload(),t===!0?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,void o.reinit())},e.prototype.setCSS=function(i){var e,t,o=this,s={};o.options.rtl===!0&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,o.transformsEnabled===!1?o.$slideTrack.css(s):(s={},o.cssTransitions===!1?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;i.options.vertical===!1?i.options.centerMode===!0&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),i.options.centerMode===!0&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),i.options.vertical===!1&&i.options.variableWidth===!1?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):i.options.variableWidth===!0?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();i.options.variableWidth===!1&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,t.options.rtl===!0?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":"undefined"!=typeof arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),i.options.fade===!1?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=i.options.vertical===!0?"top":"left",
"top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||i.options.useCSS===!0&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&i.animType!==!1&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&i.animType!==!1},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),n.options.centerMode===!0){var r=n.options.slidesToShow%2===0?1:0;e=Math.floor(n.options.slidesToShow/2),n.options.infinite===!0&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=n.options.infinite===!0?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(s.options.fade===!0&&(s.options.centerMode=!1),s.options.infinite===!0&&s.options.fade===!1&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=s.options.centerMode===!0?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));return s||(s=0),t.slideCount<=t.options.slidesToShow?void t.slideHandler(s,!1,!0):void t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(a.animating===!0&&a.options.waitForAnimate===!0||a.options.fade===!0&&a.currentSlide===i))return e===!1&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,a.options.infinite===!1&&a.options.centerMode===!1&&(i<0||i>a.getDotCount()*a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):a.options.infinite===!1&&a.options.centerMode===!0&&(i<0||i>a.slideCount-a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!==0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!==0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=a.getNavTarget(),l=l.slick("getSlick"),l.slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide)),a.updateDots(),a.updateArrows(),a.options.fade===!0?(t!==!0?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight()):void(t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)))},e.prototype.startLoad=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),o=Math.round(180*t/Math.PI),o<0&&(o=360-Math.abs(o)),o<=45&&o>=0?s.options.rtl===!1?"left":"right":o<=360&&o>=315?s.options.rtl===!1?"left":"right":o>=135&&o<=225?s.options.rtl===!1?"right":"left":s.options.verticalSwiping===!0?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(o.touchObject.edgeHit===!0&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(e.options.swipe===!1||"ontouchend"in document&&e.options.swipe===!1||e.options.draggable===!1&&i.type.indexOf("mouse")!==-1))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,e.options.verticalSwiping===!0&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(l.options.verticalSwiping===!0&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(l.options.rtl===!1?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),l.options.verticalSwiping===!0&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,l.options.infinite===!1&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),l.options.vertical===!1?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,l.options.verticalSwiping===!0&&(l.swipeLeft=e+o*s),l.options.fade!==!0&&l.options.touchMove!==!1&&(l.animating===!0?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;return t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow?(t.touchObject={},!1):(void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,void(t.dragging=!0))},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i,e=this;i=Math.floor(e.options.slidesToShow/2),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&!e.options.infinite&&(e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===e.currentSlide?(e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-e.options.slidesToShow&&e.options.centerMode===!1?(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-1&&e.options.centerMode===!0&&(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||"undefined"==typeof s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),"undefined"!=typeof t)return t;return o}});


/*
News Ticker
*/
!function(F){"use strict";F.flame_trending_news=function(e,t){var i={effect:"scroll",direction:"ltr",height:40,fontSize:"default",themeColor:"default",background:"default",borderWidth:1,radius:2,source:"html",play:!0,delayTimer:4e3,scrollSpeed:2,stopOnHover:!0},l=this;l.settings={};var s=F(e),n=(e=e,s.children(".bn-label")),o=s.children(".bn-news"),c=o.children("ul"),d=c.children("li"),r=s.children(".bn-controls"),f=r.find(".bn-prev").parent(),u=r.find(".bn-action").parent(),g=r.find(".bn-next").parent(),h=!1,p=!0,m=c.children("li").length,a=0,b=!1,y=function(){if(0<n.length&&("rtl"==l.settings.direction?o.css({}):o.css({left:n.outerWidth()})),0<r.length){var e=r.outerWidth();"rtl"==l.settings.direction?o.css({left:e}):o.css({right:e})}if("scroll"===l.settings.effect){var t=0;d.each(function(){t+=F(this).outerWidth()}),t+=10,c.css({width:t})}},k=function(){var e=parseFloat(c.css("marginLeft"));e-=l.settings.scrollSpeed/2,c.css({marginLeft:e}),e<=-c.find("li:first-child").outerWidth()&&(c.find("li:first-child").insertAfter(c.find("li:last-child")),c.css({marginLeft:0})),!1===h&&(window.requestAnimationFrame&&requestAnimationFrame(k)||setTimeout(k,16))},v=function(){var e=parseFloat(c.css("marginRight"));e-=l.settings.scrollSpeed/2,c.css({marginRight:e}),e<=-c.find("li:first-child").outerWidth()&&(c.find("li:first-child").insertAfter(c.find("li:last-child")),c.css({marginRight:0})),!1===h&&(window.requestAnimationFrame&&requestAnimationFrame(v)||setTimeout(v,16))},w=function(){"rtl"===l.settings.direction?c.stop().animate({marginRight:-c.find("li:first-child").outerWidth()},300,function(){c.find("li:first-child").insertAfter(c.find("li:last-child")),c.css({marginRight:0}),p=!0}):c.stop().animate({marginLeft:-c.find("li:first-child").outerWidth()},300,function(){c.find("li:first-child").insertAfter(c.find("li:last-child")),c.css({marginLeft:0}),p=!0})},q=function(){"rtl"===l.settings.direction?(0<=parseInt(c.css("marginRight"),10)&&(c.css({"margin-right":-c.find("li:last-child").outerWidth()}),c.find("li:last-child").insertBefore(c.find("li:first-child"))),c.stop().animate({marginRight:0},300,function(){p=!0})):(0<=parseInt(c.css("marginLeft"),10)&&(c.css({"margin-left":-c.find("li:last-child").outerWidth()}),c.find("li:last-child").insertBefore(c.find("li:first-child"))),c.stop().animate({marginLeft:0},300,function(){p=!0}))},C=function(){switch(p=!0,l.settings.effect){case"typography":c.find("li").hide(),c.find("li").eq(a).width(30).show(),c.find("li").eq(a).animate({width:"100%",opacity:1},1500);break;case"fade":c.find("li").hide(),c.find("li").eq(a).fadeIn();break;case"slide-down":c.find("li:visible").animate({top:30,opacity:0},300,function(){F(this).hide()}),c.find("li").eq(a).css({top:-30,opacity:0}).show(),c.find("li").eq(a).animate({top:0,opacity:1},300);break;case"slide-up":c.find("li:visible").animate({top:-30,opacity:0},300,function(){F(this).hide()}),c.find("li").eq(a).css({top:30,opacity:0}).show(),c.find("li").eq(a).animate({top:0,opacity:1},300);break;case"slide-left":c.find("li:visible").animate({left:"50%",opacity:0},300,function(){F(this).hide()}),c.find("li").eq(a).css({left:-50,opacity:0}).show(),c.find("li").eq(a).animate({left:0,opacity:1},300);break;case"slide-right":c.find("li:visible").animate({left:"-50%",opacity:0},300,function(){F(this).hide()}),c.find("li").eq(a).css({left:"50%",opacity:0}).show(),c.find("li").eq(a).animate({left:0,opacity:1},300);break;default:c.find("li").hide(),c.find("li").eq(a).show()}},W=function(){if(h=!1,l.settings.play)switch(l.settings.effect){case"scroll":"rtl"===l.settings.direction?v():k();break;default:l.pause(),b=setInterval(function(){l.next()},l.settings.delayTimer)}};l.init=function(){if(l.settings=F.extend({},i,t),"default"!=l.settings.fontSize&&s.css({"font-size":l.settings.fontSize}),"default"!=l.settings.themeColor&&(s.css({"border-color":l.settings.themeColor,color:l.settings.themeColor}),n.css({background:l.settings.themeColor})),"default"!=l.settings.background&&s.css({background:l.settings.background}),d.find(".bn-seperator").css({height:l.settings.height}),s.addClass("bn-effect-"+l.settings.effect+" bn-direction-"+l.settings.direction),y(),"object"==typeof l.settings.source)switch(l.settings.source.type){case"rss":"rss2json"===l.settings.source.usingApi?((a=new XMLHttpRequest).onreadystatechange=function(){if(4==a.readyState&&200==a.status){var e=JSON.parse(a.responseText),t="",i="";switch(l.settings.source.showingField){case"title":i="title";break;case"description":i="description";break;case"link":i="link";break;default:i="title"}var s="";void 0!==l.settings.source.seperator&&void 0!==typeof l.settings.source.seperator&&(s=l.settings.source.seperator);for(var n=0;n<e.items.length;n++)l.settings.source.linkEnabled?t+='<li><a target="'+l.settings.source.target+'" href="'+e.items[n].link+'">'+s+e.items[n][i]+"</a></li>":t+="<li><a>"+s+e.items[n][i]+"</a></li>";c.empty().append(t),d=c.children("li"),m=c.children("li").length,y(),"scroll"!=l.settings.effect&&C(),W()}},a.open("GET","https://api.rss2json.com/v1/api.json?rss_url="+l.settings.source.url,!0),a.send()):((r=new XMLHttpRequest).open("GET","http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent('select * from rss where url="'+l.settings.source.url+'" limit '+l.settings.source.limit)+"&format=json",!0),r.onreadystatechange=function(){if(4==r.readyState)if(200==r.status){var e=JSON.parse(r.responseText),t="",i="";switch(l.settings.source.showingField){case"title":i="title";break;case"description":i="description";break;case"link":i="link";break;default:i="title"}var s="";"undefined"!=l.settings.source.seperator&&void 0!==l.settings.source.seperator&&(s=l.settings.source.seperator);for(var n=0;n<e.query.results.item.length;n++)l.settings.source.linkEnabled?t+='<li><a target="'+l.settings.source.target+'" href="'+e.query.results.item[n].link+'">'+s+e.query.results.item[n][i]+"</a></li>":t+="<li><a>"+s+e.query.results.item[n][i]+"</a></li>";c.empty().append(t),d=c.children("li"),m=c.children("li").length,y(),"scroll"!=l.settings.effect&&C(),W()}else c.empty().append('<li><span class="bn-loader-text">'+l.settings.source.errorMsg+"</span></li>")},r.send(null));break;case"json":F.getJSON(l.settings.source.url,function(e){var t="",i="";i="undefined"===l.settings.source.showingField?"title":l.settings.source.showingField;var s="";void 0!==l.settings.source.seperator&&void 0!==typeof l.settings.source.seperator&&(s=l.settings.source.seperator);for(var n=0;n<e.length&&!(n>=l.settings.source.limit);n++)l.settings.source.linkEnabled?t+='<li><a target="'+l.settings.source.target+'" href="'+e[n].link+'">'+s+e[n][i]+"</a></li>":t+="<li><a>"+s+e[n][i]+"</a></li>","undefined"===e[n][i]&&console.log('"'+i+'" does not exist in this json.');c.empty().append(t),d=c.children("li"),m=c.children("li").length,y(),"scroll"!=l.settings.effect&&C(),W()});break;default:console.log('Please check your "source" object parameter. Incorrect Value')}else"html"===l.settings.source?("scroll"!=l.settings.effect&&C(),W()):console.log('Please check your "source" parameter. Incorrect Value');var r,a;l.settings.play?u.find("span").removeClass("bn-play").addClass("bn-pause"):u.find("span").removeClass("bn-pause").addClass("bn-play"),s.on("mouseleave",function(e){var t=F(document.elementFromPoint(e.clientX,e.clientY)).parents(".bn-breaking-news")[0];F(this)[0]!==t&&(!0===l.settings.stopOnHover?!0===l.settings.play&&l.play():!0===l.settings.play&&!0===h&&l.play())}),s.on("mouseenter",function(){!0===l.settings.stopOnHover&&l.pause()}),g.on("click",function(){p&&(p=!1,l.pause(),l.next())}),f.on("click",function(){p&&(p=!1,l.pause(),l.prev())}),u.on("click",function(){p&&(u.find("span").hasClass("bn-pause")?(u.find("span").removeClass("bn-pause").addClass("bn-play"),l.stop()):(l.settings.play=!0,u.find("span").removeClass("bn-play").addClass("bn-pause")))}),F(window).on("resize",function(){s.width()<480?(n.hide(),"rtl"==l.settings.direction?o.css({right:0}):o.css({left:0})):(n.show(),"rtl"==l.settings.direction?o.css({right:n.outerWidth()}):o.css({left:n.outerWidth()}))})},l.pause=function(){h=!0,clearInterval(b)},l.stop=function(){h=!0,l.settings.play=!1},l.play=function(){W()},l.next=function(){!function(){switch(l.settings.effect){case"scroll":w();break;default:m<=++a&&(a=0),C()}}()},l.prev=function(){!function(){switch(l.settings.effect){case"scroll":q();break;default:--a<0&&(a=m-1),C()}}()},l.init()},F.fn.flame_trending_news=function(t){return this.each(function(){if(null==F(this).data("flame_trending_news")){var e=new F.flame_trending_news(this,t);F(this).data("flame_trending_news",e)}})}}(jQuery);


/*Stickey Sidebar*/
!function(i){i.fn.theiaStickySidebar=function(t){function e(t,e){var a=o(t,e);a||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),i(document).on("scroll."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)),i(window).on("resize."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)))}function o(t,e){return t.initialized===!0||!(i("body").width()<t.minWidth)&&(a(t,e),!0)}function a(t,e){t.initialized=!0;var o=i("#theia-sticky-sidebar-stylesheet-"+t.namespace);0===o.length&&i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-'+t.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),e.each(function(){function e(){a.fixedScrollTop=0,a.sidebar.css({"min-height":"1px"}),a.stickySidebar.css({position:"static",width:"",transform:"none"})}function o(t){var e=t.height();return t.children().each(function(){e=Math.max(e,i(this).height())}),e}var a={};if(a.sidebar=i(this),a.options=t||{},a.container=i(a.options.containerSelector),0==a.container.length&&(a.container=a.sidebar.parent()),a.sidebar.parents().css("-webkit-transform","none"),a.sidebar.css({position:a.options.defaultPosition,overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),a.stickySidebar=a.sidebar.find(".theiaStickySidebar"),0==a.stickySidebar.length){var s=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;a.sidebar.find("script").filter(function(i,t){return 0===t.type.length||t.type.match(s)}).remove(),a.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()),a.sidebar.append(a.stickySidebar)}a.marginBottom=parseInt(a.sidebar.css("margin-bottom")),a.paddingTop=parseInt(a.sidebar.css("padding-top")),a.paddingBottom=parseInt(a.sidebar.css("padding-bottom"));var r=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight();a.stickySidebar.css("padding-top",1),a.stickySidebar.css("padding-bottom",1),r-=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight()-d-r,0==r?(a.stickySidebar.css("padding-top",0),a.stickySidebarPaddingTop=0):a.stickySidebarPaddingTop=1,0==d?(a.stickySidebar.css("padding-bottom",0),a.stickySidebarPaddingBottom=0):a.stickySidebarPaddingBottom=1,a.previousScrollTop=null,a.fixedScrollTop=0,e(),a.onScroll=function(a){if(a.stickySidebar.is(":visible")){if(i("body").width()<a.options.minWidth)return void e();if(a.options.disableOnResponsiveLayouts){var s=a.sidebar.outerWidth("none"==a.sidebar.css("float"));if(s+50>a.container.width())return void e()}var r=i(document).scrollTop(),d="static";if(r>=a.sidebar.offset().top+(a.paddingTop-a.options.additionalMarginTop)){var c,p=a.paddingTop+t.additionalMarginTop,b=a.paddingBottom+a.marginBottom+t.additionalMarginBottom,l=a.sidebar.offset().top,f=a.sidebar.offset().top+o(a.container),h=0+t.additionalMarginTop,g=a.stickySidebar.outerHeight()+p+b<i(window).height();c=g?h+a.stickySidebar.outerHeight():i(window).height()-a.marginBottom-a.paddingBottom-t.additionalMarginBottom;var u=l-r+a.paddingTop,S=f-r-a.paddingBottom-a.marginBottom,y=a.stickySidebar.offset().top-r,m=a.previousScrollTop-r;"fixed"==a.stickySidebar.css("position")&&"modern"==a.options.sidebarBehavior&&(y+=m),"stick-to-top"==a.options.sidebarBehavior&&(y=t.additionalMarginTop),"stick-to-bottom"==a.options.sidebarBehavior&&(y=c-a.stickySidebar.outerHeight()),y=m>0?Math.min(y,h):Math.max(y,c-a.stickySidebar.outerHeight()),y=Math.max(y,u),y=Math.min(y,S-a.stickySidebar.outerHeight());var k=a.container.height()==a.stickySidebar.outerHeight();d=(k||y!=h)&&(k||y!=c-a.stickySidebar.outerHeight())?r+y-a.sidebar.offset().top-a.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==d){var v=i(document).scrollLeft();a.stickySidebar.css({position:"fixed",width:n(a.stickySidebar)+"px",transform:"translateY("+y+"px)",left:a.sidebar.offset().left+parseInt(a.sidebar.css("padding-left"))-v+"px",top:"0px"})}else if("absolute"==d){var x={};"absolute"!=a.stickySidebar.css("position")&&(x.position="absolute",x.transform="translateY("+(r+y-a.sidebar.offset().top-a.stickySidebarPaddingTop-a.stickySidebarPaddingBottom)+"px)",x.top="0px"),x.width=n(a.stickySidebar)+"px",x.left="",a.stickySidebar.css(x)}else"static"==d&&e();"static"!=d&&1==a.options.updateSidebarHeight&&a.sidebar.css({"min-height":a.stickySidebar.outerHeight()+a.stickySidebar.offset().top-a.sidebar.offset().top+a.paddingBottom}),a.previousScrollTop=r}},a.onScroll(a),i(document).on("scroll."+a.options.namespace,function(i){return function(){i.onScroll(i)}}(a)),i(window).on("resize."+a.options.namespace,function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(a)),"undefined"!=typeof ResizeSensor&&new ResizeSensor(a.stickySidebar[0],function(i){return function(){i.onScroll(i)}}(a))})}function n(i){var t;try{t=i[0].getBoundingClientRect().width}catch(i){}return"undefined"==typeof t&&(t=i.width()),t}var s={containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern",defaultPosition:"relative",namespace:"TSS"};return t=i.extend(s,t),t.additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,e(t,this),this}}(jQuery);