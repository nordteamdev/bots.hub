current_width = $(window).width();
document_title = document.title;


$(function () {

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
    $('.top-news').hover(function () {
      var $this = $(this);
      $this.find('.news-pub').show(200);
      $this.find('.white-hover').fadeIn(200);
    }, function () {
      var $this = $(this);
      $this.find('.white-hover').fadeOut(200);
      $this.find('.news-pub').hide(200);
    });
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
       setTimeout(function () {
         $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
       }, 500);
    } else {
       $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
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
        image_container.find('.img-content').find('.img-set-as').html("<span class='btn btn-main btn-sm' onclick='FL_MakePreviewImage(" + id + ")'><i class='fa fa-picture-o'></i> " + set_as_lang + "</span>");
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
            image_container.find('.img-content').find('.img-set-as').html("<span class='btn btn-main btn-sm' onclick='FL_MakePreviewImage(" + id + ")'><i class='fa fa-picture-o'></i> " + set_as_lang + "</span>");
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
        scrollTop: $("#" + div_name).offset().top - 70
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
  var input = '<div class="answer" id="answer-' + answer_id + '" data-id="' + answer_id + '"><input type="text" data-id="' + answer_id + '" class="form-control entry_answer" data-answer="entry_answer" placeholder="' + answer_key + ' ' + answer_id + '"><span class="fa fa-times" onclick="FL_RemoveInput(' + id + ', ' + answer_id + ');"></span></div>';
  option_answers_con.append(input);
}

function FL_AddImgAnswer(id, answer_key) {
  var option_container = $('#entry-' + id);
  var option_answers_con = option_container.find('#answer-img-'+id).find('#answer-img-cont');
  var option_answer_id = option_container.find('#answer-img-'+id).find('.pick-answer-img:last').attr('data-id');
  answer_id = (option_answer_id) ? (Number(option_answer_id) + 1) : 1;
  var input = '<div class="col-xs-12 answer-img-wrapper"><div class="answer-img"><div class="pick-answer-img opt-ans-preview-'+id+'" id="'+id+'" data-id="'+answer_id+'"><div class="preview"><h5 id="preview-image-'+id+'-'+answer_id+'"><small><i class="fa fa-plus"></i> '+answer_key+'</small></h5></div><input class="hidden entry_answer" data-answer="entry_answer" id="'+answer_id+'" value=""></div></div><span onclick="$(this).parent().remove();"><i class="fa fa-times"></i></span></div>';
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
  FL_progressIconLoader($('#delete-button'));
  $.get(FL_Ajax_Requests_File(), {f:'delete_post', id:id, type:type}, function (data) {
    if (data.status == 200) {
      $('#delete-button').html('<i class="fa fa-check"></i> Post is deleted');
      setTimeout(function () {
         window.location.href = data.href;
      }, 2000);
    }
    FL_progressIconLoader($('#delete-button'));
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

function FL_LoadMore(where, type, id, user_id, button, c_id, keyword) {
  FL_progressIconLoader(button);
  if (!user_id) {
      user_id = 0;
  }
  keyword_ = '';
  if (keyword) {
    keyword_ = keyword;
  }
  $.get(FL_Ajax_Requests_File(), {f:'load_more', id:id, type:type, where:where, user_id:user_id, c_id:c_id, keyword:keyword_}, function (data) {
      if (data) {
        $('#' + where).append(data);
      } else {
        $('.load-more-button').text('No more posts to show');
        setTimeout(function () {
          $('.load-more-button').html('<i class="fa progress-icon fa-arrow-down" data-icon="arrow-down"></i> Load more');
        }, 2000);
      }
      FL_progressIconLoader(button);
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
        $("[data-comm-item='"+comm_id+"']").slideUp(function(){
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
        $("[data-reply-item='"+reply_id+"']").slideUp(function(){
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

