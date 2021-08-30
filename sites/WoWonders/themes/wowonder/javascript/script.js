current_notification_number = 0;
current_notification_number = 0;
current_messages_number = 0;
current_follow_requests_number = 0;

current_width = $(window).width();
document_title = document.title;


$(document).on('click', '.filterby li.filter-by-li', function(event) {
  $('.filterby li.filter-by-li').each(function(){
    $(this).removeClass('avtive');
    $(this).find('i').addClass('hidden');
  });
  $(this).find('i').removeClass('hidden');
  $(this).addClass('avtive');
});

$(document).on('click', '.postText', function(event) {
  textAreaAdjust(this, 70);
});
$(function () {
  
  $(window).on("dragover",function(e){
    e.preventDefault();
  },false);

  $(window).on("drop",function(e){
    e.preventDefault();
  },false);

  //$('.postText').autogrow({vertical: true, horizontal: false, height: 200});
  $('#movies-comment').autogrow({vertical: true, horizontal: false, height: 200});
  $('#blog-comment').autogrow({vertical: true, horizontal: false, height: 200});
  var api = $('#api').val();
  var hash = $('.main_session').val();
  $.ajaxSetup({ 
    data: {
        hash: hash
    },
    cache: false 
  });
  $(document).on("click",".mfp-arrow",function(event) {
    Wo_StoryProgress();
  });
  $(document).on('click', '.messages-recipients-list', function(event) {
    scrollToTop();
  });
  $('[data-toggle="tooltip"]').tooltip();
  // open last active tab
  var url = document.location.toString();
  if(url.match('#')) {
    var val_hash = url.split('#')[1];
    $('.nav-tabs a[href="#' + val_hash + '"]').tab('show');
  }
  $('.nav-tabs a').on('shown.bs.tab', function (e) {
    window.location.hash = e.target.hash;
    $('body').scrollTop(0);
  });
  
    intervalUpdates = setTimeout(Wo_intervalUpdates, 6000);
    setTimeout(Wo_UpdateLastSeen, 40000);
    setTimeout(Wo_IsLogged, 30000);

  //  dropdown won't close on click
  $('.dropdown-menu.request-list, .dropdown-menu.post-recipient, .dropdown-menu.post-options').click(function (e) {
    e.stopPropagation();
  }); 
  scrolled = 0;
  // Stick the home side bar if the screen width is > than 900
  if(current_width > 900 || api) {
    $(window).scroll(function () {
      if($('.footer-wrapper').scrollTop() > 500) {
        $('.footer-wrapper .dropdown-menu').css('bottom', 'auto');
      } else {
        $('.footer-wrapper .dropdown-menu').css('bottom', '100%');
      }
      if($(document).scrollTop() > 200) {
        $('.sidebar-sticky').addClass('Stick');
      } else {
        $('.sidebar-sticky').removeClass('Stick');
      }
      var nearToBottom = 100;
      if($('#posts').length > 0) {
          if ($(window).scrollTop() + $(window).height() > $(document).height() - nearToBottom) {
            if (scrolled == 0) {
               scrolled = 1;
               Wo_GetMorePosts();
            }
          }
      }
    });
  }
});


function Wo_CloseModels() {
  $('.modal').modal('hide');
}
// update user last seen
function Wo_UpdateLastSeen() {
  $.get(Wo_Ajax_Requests_File(), {
    f: 'update_lastseen'
  }, function () {
    setTimeout(Wo_UpdateLastSeen, 40000);
  });
}
// js function
function Wo_CheckUsername(username) {
  var check_container = $('.checking');
  var check_input = $('#username').val();
  if(check_input == '') {
    check_container.empty();
    return false;
  }
  check_container.removeClass('unavailable').removeClass('available').html('<i class="fa fa-clock-o"></i><span id="loading"> Checking <span>.</span><span>.</span><span>.</span></span>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'check_username',
    username: username
  }, function (data) {
    if(data.status == 200) {
      check_container.html('<i class="fa fa-check"></i> ' + data.message).removeClass('unavailable').addClass('available');
    } else if(data.status == 300) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 400) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 500) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 600) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    }
  });
}

function Wo_CheckPagename(pagename, page_id) {
  var check_container = $('.checking');
  var check_input = $('#page_name').val();
  if(check_input == '') {
    check_container.empty();
    return false;
  }
  check_container.removeClass('unavailable').removeClass('available').html('<i class="fa fa-clock-o"></i><span id="loading"> Checking <span>.</span><span>.</span><span>.</span></span>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'check_pagename',
    pagename: pagename,
    page_id: page_id
  }, function (data) {
    if(data.status == 200) {
      check_container.html('<i class="fa fa-check"></i> ' + data.message).removeClass('unavailable').addClass('available');
    } else if(data.status == 300) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 400) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 500) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 600) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    }
  });
}

function Wo_CheckGroupname(groupname, group_id) {
  var check_container = $('.checking');
  var check_input = $('#group_name').val();
  if(check_input == '') {
    check_container.empty();
    return false;
  }
  check_container.removeClass('unavailable').removeClass('available').html('<i class="fa fa-clock-o"></i><span id="loading"> Checking <span>.</span><span>.</span><span>.</span></span>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'check_groupname',
    groupname: groupname,
    group_id:group_id
  }, function (data) {
    if(data.status == 200) {
      check_container.html('<i class="fa fa-check"></i> ' + data.message).removeClass('unavailable').addClass('available');
    } else if(data.status == 300) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 400) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 500) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    } else if(data.status == 600) {
      check_container.html('<i class="fa fa-remove"></i> ' + data.message).removeClass('available').addClass('unavailable');
    }
  });
}

// scroll to top function
function scrollToTop() {
  verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
  element = $('html');
  offset = element.offset();
  offsetTop = offset.top;
  $('html, body').animate({
    scrollTop: offsetTop
  }, 300, 'linear');
}

// check if user is logged in function
function Wo_IsLogged() {
  $.post(Wo_Ajax_Requests_File() + '?f=session_status', function (data) {
    setTimeout(Wo_UpdateLastSeen, 30000);
    if(data.status == 200) {
      $('#logged-out-modal').modal({
        show: true
      });
    }
  });
}

// side bar users
function Wo_ReloadSideBarUsers() {
  Wo_progressIconLoader($('#sidebar-user-list-container').find('.refresh'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'update_sidebar_users'
  }, function (data) {
    if(data.status == 200) {
      $('.sidebar-users-may-know-container').html(data.html);
    }
    Wo_progressIconLoader($('#sidebar-user-list-container').find('.refresh'));
  });
}

function Wo_ReloadSideBarGroups() {
  Wo_progressIconLoader($('#sidebar-group-list-container').find('.refresh'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'update_sidebar_groups'
  }, function (data) {
    if(data.status == 200) {
      $('.sidebar-group-may-know-container').html(data.html);
    }
    Wo_progressIconLoader($('#sidebar-group-list-container').find('.refresh'));
  });
}

// side bar pages
function Wo_ReloadSideBarPages() {
  Wo_progressIconLoader($('#sidebar-page-list-container').find('.refresh'));
  var page_id = $('.sidebar-pages-may-know-container').find('.sidebar-page-data').attr('data-page-id');
  if (page_id == 'undefined') {
      page_id = '';
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'pages',
    s: 'get_next_page',
    page_id: page_id
  }, function (data) {
    if(data.status == 200) {
      if (data.html.length == 0) {
        $('.sidebar-pages-may-know-container').html('<h2><div class="no-more-pages text-center">No more pages to like</div></h2>');
      } else {
        $('.sidebar-pages-may-know-container').hide().html(data.html).fadeIn(300);
      }
    }
    Wo_progressIconLoader($('#sidebar-page-list-container').find('.refresh'));
  });
}

// get new notifications
function Wo_OpenNotificationsMenu() {
  notification_container = $('.notification-container');
  notification_list = $('#notification-list');
  notification_container.find('.new-update-alert').addClass('hidden');
  Wo_progressIconLoader(notification_container.find('.notification-loading-progress'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'get_notifications'
  }, function (data) {
    if(data.status == 200) {
      if(data.html.length == 0) {
        notification_list.html('<span class="center-text padding-10"><svg style="width: 100%;color: #03A9F4;margin: 15px 0px 15px 0px;" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.56 2.9A7 7 0 0 1 19 9v4m-2 4H2a3 3 0 0 0 3-3V9a7 7 0 0 1 .78-3.22M13.73 21a2 2 0 0 1-3.46 0"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>' + data.message + '</span>');
      } else {
        document.getElementById('notification-list').innerHTML = data.html;
        Wo_intervalUpdates();
      }
    }
    Wo_progressIconLoader(notification_container.find('.notification-loading-progress'));
  });
}
function Wo_OpenMessagesMenu() {
  messages_container = $('.messages-notification-container');
  messages_list = $('#messages-list');
  Wo_progressIconLoader(messages_container.find('.notification-loading-progress'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'get_messages'
  }, function (data) {
    if(data.status == 200) {
      if(data.html.length == 0) {
        messages_list.html('<span class="center-text padding-10"><svg style="width: 100%;color: #4caf50;margin: 15px 0px 15px 0px;" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' + data.message + '</span>');
      } else {
        //messages_list.html(data.html);
        document.getElementById('messages-list').innerHTML = data.html;
        messages_list.append('<div class="show-message-link-container"><a href="' + data.messages_url + '" class="show-message-link" target="_blank">' + data.messages_text + '</a></div>');
        //Wo_intervalUpdates();
      }
    }
    Wo_progressIconLoader(messages_container.find('.notification-loading-progress'));
  });
}
// get new friend requests
function Wo_OpenRequestsMenu() {
  requests_container = $('.requests-container');
  requests_List = $('#requests-list');
  Wo_progressIconLoader(requests_container.find('.requests-loading'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'get_follow_requests'
  }, function (data) {
    if(data.status == 200) {
      if(data.html.length == 0) {
        requests_List.html('<span class="center-text"><svg style="width: 100%;color: #3f51b5;margin: 15px 0px 15px 0px;" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg>' + data.message + '</span>');
      } else {
        requests_List.html(data.html);
        Wo_intervalUpdates();
      }
    }
    Wo_progressIconLoader(requests_container.find('.requests-loading'));
  });
}

// Notifications & follow requests updates
function Wo_intervalUpdates() {
  var check_posts = true;
  var hash_posts = true;
  if ($('.posts-hashtag-count').length == 0) {
     hash_posts = false;
  }
  var api = $('#api').val();
  if (api) {
     return false;
  }
  if ($('.posts-count').length == 0 || hash_posts == true) {
     check_posts = false;
  }
  if(typeof ($('#posts').attr('data-story-user')) == "string") {
    user_id = $('#posts').attr('data-story-user');
  } else {
    user_id = 0;
  }
  before_post_id = 0;
  if($('.post-container').length > 0) {
    var before_post_id = $('.post-container  > .post:not(.boosted)').attr('data-post-id');
  }
  var notification_container = $('.notification-container');
  var messages_notification_container = $('.messages-notification-container');
  var follow_requests_container = $('.requests-container');
  var ajax_request = {
    f: 'update_data',
    user_id: user_id,
    before_post_id: before_post_id,
    check_posts:check_posts,
    hash_posts:hash_posts
  };
  if (hash_posts == true) {
     ajax_request['hashtagName'] = $('#hashtagName').val();
  }
  $.get(Wo_Ajax_Requests_File(), ajax_request, function (data) {
    clearTimeout(intervalUpdates);
    intervalUpdates = setTimeout(Wo_intervalUpdates, 5000);
    if (hash_posts == true) {
        if (data.count_num > 0) {
          $('.posts-count').html(data.count);
        }
    } else {
        if (data.count_num > 0 && $('.filter-by-more').attr('data-filter-by') == 'all') {
          $('.posts-count').html(data.count);
        }
    }
    if(typeof (data.notifications) != "undefined" && data.notifications > 0) {
      notification_container.find('.new-update-alert').removeClass('hidden');
      notification_container.find('.sixteen-font-size').addClass('unread-update');
      notification_container.find('.new-update-alert').text(data.notifications).show();
      if(current_width > 800 && data.pop == 200) {
        Wo_NotifyMe(data.icon, decodeHtml(data.title), decodeHtml(data.notification_text), data.url);
      }
      if(data.notifications != current_notification_number) {
        if (data.notifications_sound == 0) {
           document.getElementById('notification-sound').play();
        }
        current_notification_number = data.notifications;
      }
    } else {
      notification_container.find('.new-update-alert').hide();
      notification_container.find('.sixteen-font-size').removeClass('unread-update');
      current_notification_number = 0;
    }
    if(typeof (data.messages) != "undefined" && data.messages > 0) {
      messages_notification_container.find('.new-update-alert').removeClass('hidden');
      messages_notification_container.find('.sixteen-font-size').addClass('unread-update');
      messages_notification_container.find('.new-update-alert').text(data.messages).show();
      if(data.messages != current_messages_number) {
        if (data.notifications_sound == 0) {
          document.getElementById('message-sound').play();
        }
        current_messages_number = data.messages;
      }
    } else {
      messages_notification_container.find('.new-update-alert').hide();
      messages_notification_container.find('.sixteen-font-size').removeClass('unread-update');
      current_messages_number = 0;
    }
    if(typeof (data.followRequests) != "undefined" && data.followRequests > 0) {
      follow_requests_container.find('.new-update-alert').removeClass('hidden');
      follow_requests_container.find('.sixteen-font-size').addClass('unread-update');
      follow_requests_container.find('.new-update-alert').text(data.followRequests).show();
      if(data.followRequests != current_follow_requests_number) {
        current_follow_requests_number = data.followRequests;
      }
    } else {
      follow_requests_container.find('.new-update-alert').hide();
      follow_requests_container.find('.sixteen-font-size').removeClass('unread-update');
      current_follow_requests_number = 0;
    }

    if(typeof (data.messages) != "undefined" && data.messages > 0 || typeof (data.notifications) != "undefined" && data.notifications > 0 || typeof (data.followRequests) != "undefined" && data.followRequests > 0) {
      title = Number(data.notifications) + Number(data.messages) + Number(data.followRequests);
      document.title = '(' + title + ') ' + document_title;
    } else {
      document.title = document_title;
    }
    if (data.calls == 200 && $('#re-calling-modal').length == 0 && $('#re-talking-modal').length == 0) {
         if ($('#calling-modal').length == 0) {
          $('body').append(data.calls_html);
          if (!$('#re-calling-modal').hasClass('calling')) {
            $('#re-calling-modal').modal({
             show: true
            });
            Wo_PlayVideoCall('play');
          }
          document.title = 'New video call..';
          setTimeout(function () {
            Wo_CloseModels();
            $('#re-calling-modal').addClass('calling');
            Wo_PlayVideoCall('stop');
            document.title = document_title;
            setTimeout(function () {
              $( '#re-calling-modal' ).remove();
              $( '.modal-backdrop' ).remove();
              $( 'body' ).removeClass( "modal-open" );
            }, 3000);
            $( '#re-calling-modal' ).remove();
            $('.modal-backdrop.in').hide();
          }, 40000);
         } 
    } else if (data.audio_calls == 200 && $('#re-calling-modal').length == 0 && $('#re-talking-modal').length == 0) {
      if ($('#calling-modal').length == 0) {
          $('body').append(data.audio_calls_html);
          if (!$('#re-calling-modal').hasClass('calling')) {
            $('#re-calling-modal').modal({
             show: true
            });
            Wo_PlayVideoCall('play');
          }
          document.title = 'New audio call..';
          setTimeout(function () {
            if ($('#re-talking-modal').length == 0) {
               Wo_CloseModels();
               $('#re-calling-modal').addClass('calling');
               Wo_PlayVideoCall('stop');
               document.title = document_title;
               setTimeout(function () {
                 $( '#re-calling-modal' ).remove();
                 $( '.modal-backdrop' ).remove();
                 $( 'body' ).removeClass( "modal-open" );
               }, 3000)
            }
          }, 40000);
         } 
    } else if (data.is_audio_call == 0 && data.is_call == 0 && ($('#re-calling-modal').length > 0 || $('#re-talking-modal').length > 0)) {
        Wo_PlayVideoCall('stop');
        $( '#re-calling-modal' ).remove();
        $( '.modal-backdrop' ).remove();
        $( 'body' ).removeClass( "modal-open" );
    }
  });
}
function Wo_GetNewHashTagPosts() {
  before_post_id = 0;
  if($('.post-container').length > 0) {
    var before_post_id = $('.post-container  > .post:not(.boosted)').attr('data-post-id');
  }
  var hashtagName = $('#hashtagName').val();
  if (!hashtagName) {
    return false;
  }
 var api = $('#api').val();
  var api_ = 0;
  if (api) {
    api_ = 1;
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_new_hashtag_posts',
    before_post_id: before_post_id,
    hashtagName: hashtagName,
    api: api_
  }, function (data) {
    if(data.length > 0) {
      $('#posts_hashtag').find('.posts-container').remove();
      $('#posts_hashtag').prepend(data);
    }
     $('.posts-count').empty();
  });
}
// intervel new posts
function Wo_GetNewPosts() {
  var filter_by_more = $('#load-more-filter').find('.filter-by-more').attr('data-filter-by');
  if(filter_by_more != 'all') {
    return false;
  }
  if(typeof ($('#posts').attr('data-story-user')) == "string") {
    user_id = $('#posts').attr('data-story-user');
  } else {
    user_id = 0;
  }
  var api = $('#api').val();
  var api_ = 0;
  if (api) {
    api_ = 1;
  }
  before_post_id = 0;
  if($('.post-container').length > 0) {
    var before_post_id = $('.post-container  > .post:not(.boosted)').attr('data-post-id');
  }
  $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_new_posts',
    before_post_id: before_post_id,
    user_id: user_id,
    api: api_
  }, function (data) {
    if(data.length > 0) {
      $('#posts').find('.posts-container').remove();
      $('#posts').prepend(data);
    }
     $('.posts-count').empty();
  });
}

// load more posts

function Wo_GetMorePosts() {
  var more_posts = $('#load-more-posts');
  var filter_by_more = $('#load-more-filter').find('.filter-by-more').attr('data-filter-by');
  var after_post_id = $('div.post:last').attr('data-post-id');
  var page_id = 0;
  var user_id = 0;
  var group_id = 0;
  var event_id = 0;
  var is_api = 0;
  var ad_id    = 0;
  var story_id = 0;
  var api = $('#api').val();
  if (api) {
    is_api = 1;
  }
  if(after_post_id != null) {
    more_posts.show();
  }
  if(typeof ($('#posts').attr('data-story-user')) == "string") {
    user_id = $('#posts').attr('data-story-user');
  } else if(typeof ($('#posts').attr('data-story-page')) == "string") {
    page_id = $('#posts').attr('data-story-page');
  } else if(typeof ($('#posts').attr('data-story-group')) == "string") {
    group_id = $('#posts').attr('data-story-group');
  } else if(typeof ($('#posts').attr('data-story-event')) == "string") {
    event_id = $('#posts').attr('data-story-event');
  }
  $('#posts').append('<div class="hidden loading-status loading-single"></div>');
  $('#load-more-posts').hide();
  $('.loading-status').hide().html('<div class="wo_loading_post"><div class="wo_loading_post_child2"></div></div>').removeClass('hidden').show();
  Wo_progressIconLoader($('#load-more-posts'));
  posts_count = 0;
  if ($('.post').length > 0) {
    posts_count = $('.post').length;
  }
  
  if ($(".user-ad-container").length > 0) {
    ad_id = $(".user-ad-container").last().attr('id');
  }

  if ($(".user-story-container").length > 0) {
    story_id = $(".user-story-container").last().attr('id');
  }
  
  if ($('body').attr('no-more-posts')) {
      $.get(Wo_Ajax_Requests_File(), {f: 'get_no_posts_name'}, function (data3) {
          $('#load-more-posts').html('<div class="white-loading list-group"><div class="cs-loader"><div class="no-more-posts-to-show">' + data3.name + '</div></div>');
      });
      $('#load-more-posts').show();
      $('.loading-status').remove();
      scrolled = 0;
      return false;
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'load_more_posts',
    filter_by_more: filter_by_more,
    after_post_id: after_post_id,
    user_id: user_id,
    page_id: page_id,
    group_id: group_id,
    event_id: event_id,
    posts_count: posts_count,
    is_api: is_api,
    ad_id: ad_id,
    story_id:story_id
  }, function (data) {
    if (data.length == 0) {
      $('body').attr('no-more-posts', "true");
      $.get(Wo_Ajax_Requests_File(), {f: 'get_no_posts_name'}, function (data3) {
          $('#load-more-posts').html('<div class="white-loading list-group"><div class="cs-loader"><div class="no-more-posts-to-show">' + data3.name + '</div></div>');
      });
     } else {
      if (data != 'Please login or signup to continue.') {
          $('body').removeAttr('no-more-posts');
          $('#posts').append(data);
      } else {
         $('body').attr('no-more-posts', "true");
      }
    }
    $('#load-more-posts').show();
    $('.loading-status').remove();
    Wo_progressIconLoader($('#load-more-posts'));
    scrolled = 0;
  });
}

function animateStory(element) {
  if ($(element).hasClass('opacity')) {
      $(element).removeClass('opacity');
      $(element).addClass('no-opacity');
    } else {
       $(element).removeClass('no-opacity');
       $(element).addClass('opacity');
    }
}
function Wo_LoadStory(type, user_id, element) {

  var filter_by_more = $('#load-more-filter').find('.filter-by-more');
  filter_by_more.attr("data-filter-by", 'story');
  var filter_by_progress_icon = $('.filter-container').find('.type-story');
  Wo_progressIconLoader(filter_by_progress_icon);
  var story = null;
  var user  = null;
  if (type == 'all') {
    story   = 'a';
    user    = 0;
  }
  else if(type == 'prof' && user_id){
    story   = 'p';
    user    = user_id;
  }
  animateStory(element);
  var animation = setInterval(function () {
    animateStory(element);
  }, 500);
  $.ajax({
    url: Wo_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'status',s:story,id:user},
  })
  .done(function(data) {
    if (data.status == 200) {
      $('#posts').html(data.html);
    }
    else if(data.status == 404){
      $('#posts').html(data.html);
    }
    $(element).removeClass('opacity');
    clearInterval(animation);
    Wo_progressIconLoader(filter_by_progress_icon);
  })
  .fail(function() {
    console.log("error");
  })
  
}
function Wo_ResetStory() {
  $('.mfp-progress-line span').css('width', '0%');
}

// post filteration
function Wo_FilterPostBy(filter_by) {
  var more_posts = $('#load-more-posts');
  var filter_by_more = $('#load-more-filter').find('.filter-by-more');
  filter_by_more.attr("data-filter-by", filter_by);
  //Wo_progressIconLoader(filter_by_progress_icon);
  var type = '';
  var id = 0;
  if(typeof ($('#posts').attr('data-story-user')) == "string") {
    id = $('#posts').attr('data-story-user');
    type = 'profile';
  } else if(typeof ($('#posts').attr('data-story-page')) == "string") {
    id = $('#posts').attr('data-story-page');
    type = 'page';
  } else if (typeof ($('#posts').attr('data-story-group')) == "string") {
    id = $('#posts').attr('data-story-group');
    type = 'group';
  } else if (typeof ($('#posts').attr('data-story-event')) == "string") {
    id = $('#posts').attr('data-story-event');
    type = 'event';
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'filter_posts',
    filter_by: filter_by,
    id: id,
    type: type
  }, function (data) {
    if(data) {
	  $('html, body').animate({
		scrollTop: $('#scroll_filter_click').offset().top - 100 //#DIV_ID is an example. Use the id of your destination on the page
	  }, 500);
      $('#posts').html(data);
      
    }
  });
}
// register post share
function Wo_RegisterShare(post_id) {
  var post = $('#post-' + post_id);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'register_share',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      post.find("#share-button").addClass('active');
      post.find("[id^=shares]").text(data.shares);
    } else {
      post.find("#share-button").removeClass('active');
      post.find("[id^=shares]").text(data.shares);
    }
    if (data.can_send == 1) {
        Wo_SendMessages();
    }
  });
}

// open post share buttons
function Wo_OpenShareBtns(post_id) {
  post_wrapper = $('#post-' + post_id);
  post_wrapper.find('.post-share').slideToggle(200);
}
// register post comment
function Wo_RegisterCommentClick(text, post_id, user_id, page_id, type) {
    post_wrapper = $('[id=post-' + post_id + ']');
    comment_textarea = post_wrapper.find('.post-comments');
    comment_btn = comment_textarea.find('.emo-comment');
    textarea_wrapper = comment_textarea.find('.textarea');
    comment_list = post_wrapper.find('.comments-list');
    if(text == '') {
      return false;
    }
    textarea_wrapper.val('');
    Wo_progressIconLoader(comment_btn);
    $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment', {
      post_id: post_id,
      text: text,
      user_id: user_id,
      page_id: page_id
    }, function (data) {
      if(data.status == 200) {
        post_wrapper.find('.comment-container:first-child').before(data.html);
        post_wrapper.find('[id=comments]').html(data.comments_num);
      }
      Wo_progressIconLoader(comment_btn);
      if (data.can_send == 1) {
        Wo_SendMessages();
      }
    });
}
// register post comment
function Wo_LightBoxComment(text, post_id, user_id, event, page_id) {
  if(event.keyCode == 13 && event.shiftKey == 0) {
    post_wrapper = $('#lightbox-post-' + post_id);
    comment_textarea = post_wrapper.find('.post-comments');
    comment_btn = comment_textarea.find('.comment-btn');
    textarea_wrapper = comment_textarea.find('.textarea');
    comment_list = post_wrapper.find('.comments-list');
    if(textarea_wrapper.val() == '') {
      return false;
    }
    textarea_wrapper.val('');
    Wo_progressIconLoader(comment_btn);
    $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment', {
      post_id: post_id,
      text: text,
      user_id: user_id,
      page_id: page_id
    }, function (data) {
      if(data.status == 200) {
        post_wrapper.find('.comment-container:first-child').before(data.html);
        post_wrapper.find('#comments').html(data.comments_num);
      }
      Wo_progressIconLoader(comment_btn);
      if (data.can_send == 1) {
        Wo_SendMessages();
      }
    });
  }
}

// load all post comments
function Wo_loadAllComments(post_id) {
  main_wrapper = $('#post-' + post_id);
  view_more_wrapper = main_wrapper.find('.view-more-wrapper');
  Wo_progressIconLoader(view_more_wrapper);
  $('#post-' + post_id).find('.view-more-wrapper .ball-pulse').fadeIn(100);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'load_more_comments',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      main_wrapper.find('.comments-list').html(data.html);
      view_more_wrapper.remove();
    }
  });
}
function Wo_loadAllCommentslightbox(post_id) {
  main_wrapper_light = $('#post-' + post_id);
  view_more_wrapper_light = main_wrapper_light.find('.view-more-wrapper');
  $('.lightpost-' + post_id).find('.view-more-wrapper .ball-pulse').fadeIn(100);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'load_more_comments',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      $('.comments-list-lightbox').html(data.html);
      $('.view-more-wrapper').remove();
    }
  });
}

// show post comments
function Wo_ShowComments(post_id) {
  $('#post-comments-' + post_id).toggleClass('hidden');
}

// open post edit modal
function Wo_OpenPostEditBox(post_id) {
  var edit_box = $('#post-' + post_id).find('#edit-post');
  edit_box.modal({
    show: true
  });
}

// save edited post
function Wo_EditPost(post_id) {
  var post = $('#post-' + post_id);
  var edit_box = $('#post-' + post_id).find('#edit-post');
  var edit_textarea = post.find('.edit-textarea-' + post_id + ' textarea');
  var text = edit_textarea.val();
  var post_text = post.find('.post-description p');
  Wo_progressIconLoader(post.find('#edit-post-button'));
  $('#post-' + post_id).find('#edit-post .ball-pulse').fadeIn(100);
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=edit_post', {
    post_id: post_id,
    text: text
  }, function (data) {
    if(data.status == 200) {
      post_text.html(data.html);
      edit_box.modal('hide');
    }
    $('#post-' + post_id).find('#edit-post .ball-pulse').fadeOut(100);
    if (data.can_send == 1) {
        Wo_SendMessages();
    }
  });
}

// open delete post modal
function Wo_OpenPostDeleteBox(post_id) {
  var delete_box = $('#post-' + post_id).find('#delete-post');
  delete_box.modal({
    show: true
  });
}

// delete post
function Wo_DeletePost(post_id) {
  var delete_box = $('#post-' + post_id).find('#delete-post');
  var delete_button = delete_box.find('#delete-all-post');
  $('#post-' + post_id).find('#delete-post .ball-pulse').fadeIn(100);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'delete_post',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      $('#user_post_count').html(data.post_count);
      delete_box.modal('hide');
      setTimeout(function () {
        $('#post-' + post_id).slideUp(200, function () {
          $(this).remove();
        });
      }, 300);
    }
    $('#post-' + post_id).find('#delete-post .ball-pulse').fadeOut(100);
  });
}

// open comment textarea
function Wo_OpenCommentEditBox(comment_id) {
  comment = $('[id=comment_' + comment_id + ']');
  comment_text = comment.find('.comment-edit');
  comment_text.slideToggle(100);
}

function Wo_ReportComment( comment_id ){
  if (!comment_id || comment_id <= 0) {
    return false;
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'report_comment',
    comment_id: comment_id
  }, function (data) {
    if(data.status == 200) {
      $('#comment_report_box .msg').html(data.text);
      $('#comment_report_box').modal('show');
      setTimeout(function () {
        $('#comment_report_box').modal('hide');
        $('#reportComment'+comment_id).css({"color":"#55acee"});
      }, 1500);
    }else if(data.status == 300) {
      $('#comment_report_box .msg').html(data.text);
      $('#comment_report_box').modal('show');
      setTimeout(function () {
        $('#comment_report_box').modal('hide');
        $('#reportComment'+comment_id).css({"color":"inherit"});
      }, 1500);
    }
  });

}
// save edited comment
function Wo_EditComment(text, comment_id, event) {
  comment = $('[id=comment_' + comment_id + ']');
  comment_text = comment.find('.comment-text');
  if(event.keyCode == 13 && event.shiftKey == 0) {
    Wo_progressIconLoader(comment.find('#editComment'));
    $.post(Wo_Ajax_Requests_File() + '?f=posts&s=edit_comment', {
      comment_id: comment_id,
      text: text
    }, function (data) {
      if(data.status == 200) {
        comment_text.html(data.html);
        Wo_OpenCommentEditBox(comment_id);
      }
      Wo_progressIconLoader(comment.find('#editComment'));
    });
  }
}

// delete comment
function Wo_DeleteComment(comment_id) {
  var delete_box = $('[id=comment_' + comment_id + ']').find('#delete-comment');
  var delete_button = delete_box.find('#delete-all-post');
  delete_box.modal({
    show: true
  });
  var comment = $('[id=comment_' + comment_id + ']');
  delete_button.on('click', function () {
    $('[id=comment_' + comment_id + ']').find('#delete-comment .ball-pulse').fadeIn(100);
    $.get(Wo_Ajax_Requests_File(), {
      f: 'posts',
      s: 'delete_comment',
      comment_id: comment_id
    }, function (data) {
      if(data.status == 200) {
        delete_box.modal('hide');
        $('.modal').modal('hide');
        comment.fadeOut(300, function () {
          comment.remove();
        });
      }
    });
  });
}

function Wo_DeleteReplyComment(reply_id) {
  var delete_box = $('[id=comment_reply_' + reply_id + ']').find('#delete-comment-reply');
  var delete_button = delete_box.find('#delete-all-reply');
  delete_box.modal({
    show: true
  });
  var comment = $('[id=comment_reply_' + reply_id + ']');
  delete_button.on('click', function () {
    $('[id=comment_reply_' + reply_id + ']').find('#delete-comment-reply .ball-pulse').fadeIn(100);
    $.get(Wo_Ajax_Requests_File(), {
      f: 'posts',
      s: 'delete_comment_reply',
      reply_id: reply_id
    }, function (data) {
      if(data.status == 200) {
        delete_box.modal('hide');
        comment.fadeOut(300, function () {
          $(this).remove();
        });
      }
    });
  });
}

// register comment like
function Wo_RegisterCommentLike(comment_id) {
  var comment = $('[id=comment_' + comment_id + ']');
  comment_text = comment.find('div.comment-text').text();
  Wo_progressIconLoader(comment.find('#LikeComment'));
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment_like', {
    comment_id: comment_id,
    comment_text: comment_text
  }, function (data) {
    if(data.status == 200) {
      if (data.dislike == 1) {
          comment.find("#comment-wonders").text(data.wonders_c);
          comment.find("#WonderComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-down"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>');
      }
      comment.find("#LikeComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up active-like"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>').fadeIn(150);
      comment.find("#comment-likes").text(data.likes);
    } else {
      comment.find("#LikeComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>').fadeIn(150);
      comment.find("#comment-likes").text(data.likes);
    }
  });
}

// register comment wonder
function Wo_RegisterCommentWonder(comment_id) {
  var comment = $('[id=comment_' + comment_id + ']');
  comment_text = comment.find('div.comment-text').text();
  Wo_progressIconLoader(comment.find('#WonderComment'));
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment_wonder', {
    comment_id: comment_id,
    comment_text: comment_text
  }, function (data) {
    if(data.status == 200) {
      if (data.dislike == 1) {
          comment.find("#comment-likes").text(data.likes_c);
          comment.find("#LikeComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>');
      }
      comment.find("#WonderComment").html('<span class="active-wonder">' + data.icon + '</span>').fadeIn(150);
      comment.find("#comment-wonders").text(data.wonders);
    } else if (data.status == 300)  {
      comment.find("#WonderComment").html('' + data.icon + '').fadeIn(150);
      comment.find("#comment-wonders").text(data.wonders);
    }
  });
}

// register comment wonder
function Wo_RegisterCommentReplyWonder(reply_id) {
  var comment = $('[id=comment_reply_' + reply_id + ']');
  comment_text = comment.find('div.reply-text').text();
  Wo_progressIconLoader(comment.find('#WonderReplyComment'));
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment_reply_wonder', {
    reply_id: reply_id,
    comment_text: comment_text
  }, function (data) {
    if(data.status == 200) {
      if (data.dislike == 1) {
          comment.find("#comment-reply-likes").text(data.likes_r);
          comment.find("#LikeReplyComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>');
      }
      comment.find("#WonderReplyComment").html('<span class="active-wonder">' + data.icon + '</span>').fadeIn(150);
      comment.find("#comment-reply-wonders").text(data.wonders);
    } else if (data.status == 300){
      comment.find("#WonderReplyComment").html('' + data.icon + '').fadeIn(150);
      comment.find("#comment-reply-wonders").text(data.wonders);
    }
  });
}

function Wo_RegisterCommentReplyLike(reply_id) {
  var comment = $('[id=comment_reply_' + reply_id + ']');
  comment_text = comment.find('div.reply-text').text();
  Wo_progressIconLoader(comment.find('#LikeReplyComment'));
  $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_comment_reply_like', {
    reply_id: reply_id,
    comment_text: comment_text
  }, function (data) {
    if(data.status == 200) {
      if (data.dislike == 1) {
          comment.find("#comment-reply-wonders").text(data.wonders_r);
          comment.find("#WonderReplyComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-down"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>');
      }
      comment.find("#LikeReplyComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up active-like"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>').fadeIn(150);
      comment.find("#comment-reply-likes").text(data.likes);
    } else if (data.status == 300){
      comment.find("#LikeReplyComment").html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>').fadeIn(150);
      comment.find("#comment-reply-likes").text(data.likes);
    }
  });
}
// save post
function Wo_SavePost(post_id) {
  var post = $('#post-' + post_id);
  post.find('.save-post').html('<div class="post_drop_menu_loading"><div class="ball-pulse"><div></div><div></div><div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'save_post',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      post.find('.save-post').html(data.text);
    } else if(data.status == 300) {
      post.find('.save-post').html(data.text);
    }
  });
}

// report post
function Wo_ReportPost(post_id) {
  var post = $('#post-' + post_id);
  post.find('.report-post').html('<div class="post_drop_menu_loading"><div class="ball-pulse"><div></div><div></div><div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'report_post',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      post.find('.report-post').html(data.text);
    } else if(data.status == 300) {
      post.find('.report-post').html(data.text);
    }
  });
}

function Wo_DisableComment(post_id, type) {
  var post = $('#post-' + post_id);
  post.find('.disable-comments').html('<div class="post_drop_menu_loading"><div class="ball-pulse"><div></div><div></div><div></div></div></div>');
  if (type == 0 ) {
    post.find('.disable-comments').attr('onclick', 'Wo_DisableComment(' + post_id + ', 1);');
    post.find('.post-comments').show()
  } else {
    post.find('.disable-comments').attr('onclick', 'Wo_DisableComment(' + post_id + ', 0);');
    post.find('.post-comments').hide()
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'disable_comment',
    post_id: post_id,
    type: type
  }, function (data) {
      post.find('.disable-comments').html(data.text);
  });
}

function Wo_PinPost(post_id, id, type) {
  var post = $('#post-' + post_id);
  post.find('.pin-post').html('<div class="post_drop_menu_loading"><div class="ball-pulse"><div></div><div></div><div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'pin_post',
    post_id: post_id,
    id: id,
    type: type
  }, function (data) {
    if(data.status == 200) {
      post.find('.pin-post').html(data.text);
    } else if(data.status == 300) {
      post.find('.pin-post').html(data.text);
    }
  });
}

function Wo_BoostPost(post_id) {
  var post = $('#post-' + post_id);
  post.find('.boost-post').html('<div class="post_drop_menu_loading"><div class="ball-pulse"><div></div><div></div><div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'boost_post',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      post.find('.boost-post').html(data.text);
    } else if(data.status == 300) {
      post.find('.boost-post').html(data.text);
    }
  });
}
// open post Reacted users
function Wo_OpenPostReactedUsers(post_id, type) {
  var post = $('#post-' + post_id);
      post.find('.post-reacted').empty();
      post_likes_container = post.find('.post-reacted');
  // if(!post_likes_container.is(':empty')) {
  //   post_likes_container.slideUp(200, function () {
  //     post.find('.post-reacted').empty();
  //   });
  //   return false;
  // }
  Wo_progressIconLoader(post.find('.post-reacted-status'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_post_reacted',
    post_id: post_id,
    type: type
  }, function (data) {
    if(data.status == 200) {
      if(data.html.length == 0) {
        post_likes_container.html('<span class="view-more-wrapper">' + data.message + '</span>');
      } else {
        post_likes_container.html('<span>' + data.html + '</span><span class="hide_who_reacted_it" onclick="Wo_ClosePostReactedUsers('+ post_id +');"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg></span>');
      }
      post_likes_container.slideDown(200);
    }
    Wo_progressIconLoader(post.find('.post-reacted-status'));
  });
}

function Wo_ClosePostReactedUsers(post_id) {
	var post = $('#post-' + post_id);post_likes_container = post.find('.post-reacted');
	post_likes_container.slideUp(200).empty();
}

// open post liked users
function Wo_OpenPostLikedUsers(post_id) {
  var post = $('#post-' + post_id);
  post_likes_container = post.find('.post-likes');
  post.find('.post-wonders').slideUp(200, function () {
    post.find('.post-wonders').empty();
  });
  if(!post_likes_container.is(':empty')) {
    post_likes_container.slideToggle(200, function () {
      post.find('.post-likes').empty();
    });
    return false;
  }
  Wo_progressIconLoader(post.find('.post-like-status'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_post_likes',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      if(data.html.length == 0) {
        post_likes_container.html('<span class="view-more-wrapper">' + data.message + '</span>');
      } else {
        post_likes_container.html(data.html);
      }
      post_likes_container.slideToggle(200);
    }
    Wo_progressIconLoader(post.find('.post-like-status'));
  });
}

// open post wodered users
function Wo_OpenPostWonderedUsers(post_id) {
  var post = $('#post-' + post_id);
  post_wonders_container = post.find('.post-wonders');
  post.find('.post-likes').slideUp(200, function () {
    post.find('.post-likes').empty();
  });
  if(!post_wonders_container.is(':empty')) {
    post_wonders_container.slideToggle(200, function () {
      post.find('.post-wonders').empty();
    });
    return false;
  }
  Wo_progressIconLoader(post.find('.post-wonders-status'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'get_post_wonders',
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      if(data.html.length == 0) {
        post_wonders_container.html('<span class="view-more-wrapper">' + data.message + '</span>');
      } else {
        post_wonders_container.html(data.html);
      }
      post_wonders_container.slideToggle(200);
    }
    Wo_progressIconLoader(post.find('.post-wonders-status'));
  });
}

// add emo to input
function Wo_AddEmo(code, input) {
  inputTag = $(input);
  inputVal = inputTag.val();
  if(typeof (inputTag.attr('placeholder')) != "undefined") {
    inputPlaceholder = inputTag.attr('placeholder');
    if(inputPlaceholder == inputVal) {
      inputTag.val('');
      inputVal = inputTag.val();
    }
  }
  if(inputVal.length == 0) {
    inputTag.val(code + ' ');
  } else {
    inputTag.val(inputVal + ' ' + code);
  }
  inputTag.keyup();
}

// accept follow request
function Wo_AcceptFollowRequest(user_id) {
  var main_container = $('.user-follow-request-' + user_id);
  var follow_main_container = main_container.find('#accept-' + user_id);
  Wo_progressIconLoader(follow_main_container);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'accept_follow_request',
    following_id: user_id
  }, function (data) {
    if(data.status == 200) {
      main_container.find('.accept-btns').html(data.html);
    }
  });
}
function Wo_StartRepositioner() {
    $('.user-cover-reposition-w').hide();
    $('.user-reposition-container').show();
    $('.cover-resize-buttons').show();
    $('.default-buttons').hide();
    $('.when-notedit').hide();
    $('.when-edit').show();
    $('.user-reposition-dragable-container').show();
    $('.profile-cover-changer').show();
  $('.wo_user_profile .card.hovercard .pic-info-cont, .problackback').fadeOut();
    $('.screen-width').val($('.user-reposition-container').width());
    $('.user-reposition-container img').css('cursor', '-webkit-grab').draggable({
        scroll: false,
        axis: "y",
        cursor: "-webkit-grab",
        drag: function (event, ui) {
            y1 = $('.user-cover-reposition-container').height();
            y2 = $('.user-reposition-container').find('img').height();
            if (ui.position.top >= 0) {
                ui.position.top = 0;
            }else
                if (ui.position.top <= (y1-y2)) {
                    ui.position.top = y1-y2;
                }
            },
            stop: function(event, ui) {
                $('input.cover-position').val(ui.position.top);
            }
        });
}

function Wo_SubmitRepositioner() {
    if ($('input.cover-position').length == 1) {
        posY = $('input.cover-position').val();
        $('form.cover-position-form').submit();
    }
}

function Wo_StopRepositioner() {
    $('.when-notedit').show();
    $('.when-edit').hide();
    $('.user-cover-reposition-w').show();
    $('.user-reposition-container').hide();
    $('.cover-resize-buttons').hide();
    $('.default-buttons').show();
    $('input.cover-position').val(0);
  $('.wo_user_profile .card.hovercard .pic-info-cont, .problackback').fadeIn();
    $('.user-reposition-container img').draggable('destroy').css('cursor','default');
}
// delete follow request
function Wo_DeleteFollowRequest(user_id) {
  var main_container = $('.user-follow-request-' + user_id);
  var follow_main_container = main_container.find('#delete-' + user_id);
  Wo_progressIconLoader(follow_main_container);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'delete_follow_request',
    following_id: user_id
  }, function (data) {
    if(data.status == 200) {
      main_container.find('.accept-btns').html(data.html);
    }
  });
}

// update post privacy
function Wo_UpdatePostPrivacy(post_id, privacy_type, event) {
  var post = $('#post-' + post_id);
  event.preventDefault();
  var post_privacy_container = post.find('.post-privacy');
  Wo_progressIconLoader(post_privacy_container);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'update_post_privacy',
    post_id: post_id,
    privacy_type: privacy_type
  }, function (data) {
    if(data.status == 200) {
      if(data.privacy_type == 0) {
        post_privacy_container.html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>');
      } else if(data.privacy_type == 1) {
        post_privacy_container.html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>');
      } else if(data.privacy_type == 2) {
        post_privacy_container.html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>');
      } else if(data.privacy_type == 3) {
        post_privacy_container.html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>');
      } else {
        return false;
      }
    }
  });
}

// open chat tab
function Wo_OpenChatTab(recipient_id, group_id) {

  if ($(".chat_"+recipient_id).length > 0) {
    return false;
  }

  if(group_id != 0){
    $("#group_tab_" + group_id).find('.group-lastseen').empty();
  }
  if (group_id == null) {
    group_id = 0;
  }
  $.get(Wo_Ajax_Requests_File(), {
    f: 'chat',
    s: 'is_chat_on',
    recipient_id: recipient_id
  }, function (data) {
    length = 0;
    if ($('body').attr('chat-off')) {
     length = $('body').attr('chat-off').length;
    }
    if(current_width < 720 || length > 0) {
       document.location = data.url;
       return false;
    }
    if(data.chat != 1 && group_id === 0) {
     // document.location = data.url;
      return false;
    }
  });
  if(current_width < 720) {
    $.get(Wo_Ajax_Requests_File(), {
      f: 'chat',
      s: 'close',
      recipient_id: recipient_id
    }, function (data) {
      console.log(data);
      //document.location = data.url;
    });
    return false;
  }
  placement = 1;
  if ($('.chat-wrapper').length == 1) {
    placement = 2;
  } else if ($('.chat-wrapper').length == 2) {
    placement = 3;
  }
  var loading_icon = '<div class="ball-pulse" style="display: block;"><div></div><div></div><div></div></div>';
  $('#online_' + recipient_id).find('.new-message-alert').hide();
  if (group_id) {
    var loading_div = $('.chat-container').find('#group_tab_' + group_id).find('.chat-loading-icon');
  }else{
    var loading_div = $('.chat-container').find('#online_' + recipient_id).find('.chat-loading-icon');
  }
  
  loading_div.html(loading_icon);
  chat_container = $('.chat-container');
  $(document.body).attr('data-chat-recipient-'+recipient_id, recipient_id);
  $('.chat-wrapper').show();
  /* var data_html = '<div class="chat-wrapper" id="chat_"><div class="online-toggle pointer" onclick="javascript:$(\'.chat-tab-container\').slideToggle(100);"><a style="color:#fff;" href=""><span class="chat-tab-status">......</span></a></div><div class="chat-tab-container"><div class="chat-messages-wrapper"><div class="chat-messages"></div><div class="clear"></div></div><div class="chat-textarea btn-group"><div class="emo-container"></div><form action="#" method="post" class="chat-sending-form"><textarea name="textSendMessage" disabled id="sendMessage" class="form-control" cols="10" rows="5" placeholder=""  onkeydown="Wo_SubmitChatForm(event);" onfocus="Wo_SubmitChatForm(event);" dir="auto"></textarea><input type="hidden" id="user-id" name="user_id" value="" /></form></div></div></div>';
  $('.chat-tab').append('<span class="chat_main chat_main_"></span>');
  $('.chat_main_').append(data_html); */
  $.get(Wo_Ajax_Requests_File(), {
    f: 'chat',
    s: 'load_chat_tab',
    recipient_id: recipient_id,
    placement:placement,
    group_id:group_id
  }, function (data) {
    if(data.status == 200) {
      if ($('.chat-wrapper').length == 3) {
         if ($('.chat_main_' + recipient_id).length == 0) {
            $('.chat_main:first-child').remove();
            $('.chat-tab').append('<span class="chat_main chat_main_' + recipient_id +'"></span>');
         } else {
            $('.chat_main_' + recipient_id).remove();
         }
         $('.chat_main_' + recipient_id).html(data.html);
      } else {
        if ($('.chat_main_' + recipient_id).length > 0) {
          $('.chat_main_' + recipient_id).html(data.html);
        } else {
          $('.chat-tab').append('<span class="chat_main chat_main_' + recipient_id +'"></span>');
          $('.chat_main_' + recipient_id).append(data.html);
        }
      }
      $('.chat-wrapper').show();
      loading_div.empty();
      $('.chat-textarea textarea').keyup();
      if (group_id == 0) {
        $.get(Wo_Ajax_Requests_File(), {
          f: 'chat',
          s: 'load_chat_messages',
          recipient_id: recipient_id
        }, function (data) {
          if (data.messages.length > 0) {
             $('.chat-tab').find('.chat_' + recipient_id).find('.chat-messages').html(data.messages);
          } else {
            $('.chat_' + recipient_id).find('.chat-user-desc').fadeIn(150);
          }
          setTimeout(function () {
            $('.chat-messages-wrapper').scrollTop($('.chat-messages-wrapper')[0].scrollHeight);
          }, 1000);
        });
      }
    }
  });
}

function Wo_OpenChatUsersTab() {
  
  $('.chat-container').toggleClass('full');
  $('.online-content-toggler').slideToggle(100);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'chat',
    s: 'open_tab'
  });
}

function Wo_SearchForPosts(query) {
  var type = '';
  if ($('.page-margin').attr('data-page') == "timeline") {
    type = 'user';
  } else if ($('.page-margin').attr('data-page') == "page"){
    type = 'page';
  } else if ($('.page-margin').attr('data-page') == "group") {
    type = 'group'
  } else {
    return false;
  }
  Wo_progressIconLoader($('.search-for-posts-container'));
  var id = $('.page-margin').attr('data-id');
  if (id == null || id == "undefined") {
    return false;
  }
  $.get(Wo_Ajax_Requests_File(), {f:'posts', s:'search_for_posts', id: id, search_query: query, type: type}, function (data) {
     if (data.status == 200) {
        $('#posts').html(data.html);
     }
     Wo_progressIconLoader($('.search-for-posts-container'));
  });
}

function Wo_Fetch(id, post_id) {
   var clickedOnBody = true;
   var user_from_post_id = '#post-' + post_id;
   var user_from_image = '#post-' + post_id + ' .post-heading';
   var div = '.user-fetch-post-' + post_id + '-user-' + id;
   var bla = user_from_post_id + ', ' + div;
   clearTimeout(timeout);
   $(div).fadeIn(200);  
   var timeout;
   function hidepanel() {
     $(div).fadeOut(0); 
   }
    $(div).mouseleave(doTimeout);
    $(user_from_image).mouseleave(doTimeout);
     function doTimeout(){
        clearTimeout(timeout);
        timeout = setTimeout(hidepanel, 0);
     }
}

function Wo_RequestVerification(id, type) {
  $.get(Wo_Ajax_Requests_File(), {f:'request_verification', id:id, type:type}, function(data) {
    if (data.status == 200) {
      $('#verification-request').html(data.html);
    }
  });
}

function Wo_DeleteUserVerification(id, type) {
  if (confirm("Are you sure ?") == false) {
      return false;
  }
  var verify_icon = $('form').find('div.verification');
  Wo_progressIconLoader(verify_icon);
  $.get(Wo_Ajax_Requests_File(), {f:'delete_verification', id:id, type:type}, function(data) {
    if (data.status == 200) {
      $('#verification-request').html(data.html);
    }
  });
}

function Wo_RemoveVerification(id, type) {
  $.get(Wo_Ajax_Requests_File(), {f:'remove_verification', id:id, type:type}, function(data) {
    if (data.status == 200) {
      $('#verification-request').html(data.html);
    }
  });
}

$('body').on('mouseenter', '.user-popover', function() {
    var popover = $(this);
    var type = popover.attr('data-type');
    var id = popover.attr('data-id');
    var placement = popover.attr('data-placement') || 'none';
    var placement_code = 'user-details not-profile';
    if (placement == 'profile') {
      placement_code = 'user-details';
    }
    var over_time = setTimeout(function() {
       var offset = popover.offset();
       var posY = (offset.top - $(window).scrollTop()) + popover.height();
       var posX = offset.left - $(window).scrollLeft();
       var available = $(window).width() - posX;
       if ($(window).width() > 800) {
       if (available < 400) {
         var right = available - popover.width();
         if (posY > 0) {
          $('body').append('<div class="' + placement_code + ' right" style="position: fixed; top: ' + posY + 'px; right:' + right + 'px"><div class="loading-user"><div class="fa fa-spinner fa-spin"></div></div></div>');
         }
       } else {
        if (posY > 0) {
         $('body').append('<div class="' + placement_code + '" style="position: fixed; top: ' + posY + 'px; left:' + posX + 'px"><div class="loading-user"><div class="fa fa-spinner fa-spin"></div></div></div>');
        }
       }
       }
       $.get(Wo_Ajax_Requests_File(), {f:'popover', id:id, type:type}, function(data) {
         if (data.status == 200) {
             $('.user-details').html(data.html);
         }
       });
    }, 1000);
    popover.data('timeout', over_time);
});

$('body').on('mouseleave', '.user-popover', function(e) {
    var to = e.toElement || e.relatedTarget;
      if (!$(to).is(".user-details")) {
        clearTimeout($(this).data('timeout'));
        $('.user-details').remove();
      }
});
$('body').on('mouseleave', '.user-details', function() {
    $('.user-details').remove();
});
function Wo_OpenAlbumLightBox(image_id, type) {
  $('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'open_album_lightbox', image_id:image_id, type:type}, function(data) {
    if (data.status == 200) {
    document.body.style.overflow = 'hidden';
      $('.lightbox-container').html(data.html);
    }
    if (data.html.length == 0) {
       document.body.style.overflow = 'auto';
    }
  });
}
function Wo_CloseLightbox() {
  $('.lightbox-container').remove();
  document.body.style.overflow = 'auto';
}
function Wo_OpenLightBox(post_id) {
  $('#contnet').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'open_lightbox', post_id:post_id}, function(data) {
    if (data.status == 200) {
    document.body.style.overflow = 'hidden';
      $('.lightbox-container').html(data.html);
    }
    if (data.html.length == 0) {
       document.body.style.overflow = 'auto';
    }
  });
}
function Wo_OpenMultiLightBox(url) {
  $('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  $.post(Wo_Ajax_Requests_File() + '?f=open_multilightbox', {url:url}, function(data) {
    if (data.status == 200) {
    document.body.style.overflow = 'hidden';
      $('.lightbox-container').html(data.html);
    }
    if (data.html.length == 0) {
       document.body.style.overflow = 'auto';
    }
  });
}
function Wo_NextAlbumPicture(post_id, id) {
  Wo_CloseLightbox();
  $('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_next_album_image', post_id:post_id, after_image_id:id}, function(data) {
    if (data.status == 200) {
  document.body.style.overflow = 'hidden';
      $('.lightbox-container').html(data.html);
      $( ".changer").fadeIn(200);
    }
    if (data.html.length == 0) {
       document.body.style.overflow = 'auto';
    }
  });
}
function Wo_PreviousAlbumPicture(post_id, id) {
  Wo_CloseLightbox();
  $('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_previous_album_image', post_id:post_id, before_image_id:id}, function(data) {
    if (data.status == 200) {
    document.body.style.overflow = 'hidden';
      $('.lightbox-container').html(data.html);
      $( ".changer").fadeIn(200);
    }
    if (data.html.length == 0) {
       document.body.style.overflow = 'auto';
    }
  });
}

function Wo_NextPicture(post_id) {
  var id = 0;
  var type = 'none';
  if(typeof ($('[data-page=timeline]').attr('data-id')) == "string") {
    id = $('[data-page=timeline]').attr('data-id');
    type = 'profile';
  } else if(typeof ($('[data-page=page]').attr('data-id')) == "string") {
    id = $('[data-page=page]').attr('data-id');
    type = 'page';
  } else if (typeof ($('[data-page=group]').attr('data-id')) == "string") {
    id = $('[data-page=group]').attr('data-id');
    type = 'group';
  }
   Wo_CloseLightbox();
  $('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  
  $.get(Wo_Ajax_Requests_File(), {f:'get_next_image', post_id:post_id, type:type, id:id}, function(data) {
    if (data.status == 200) {
    document.body.style.overflow = 'hidden';
      $('.lightbox-container').html(data.html);
      $( ".changer" ).fadeIn(200);
    }
    if (data.html.length == 0) {
       document.body.style.overflow = 'auto';
    }
  });
}

function Wo_PreviousPicture(post_id) {
  var id = 0;
  var type = 'none';
  if(typeof ($('[data-page=timeline]').attr('data-id')) == "string") {
    id = $('[data-page=timeline]').attr('data-id');
    type = 'profile';
  } else if(typeof ($('[data-page=page]').attr('data-id')) == "string") {
    id = $('[data-page=page]').attr('data-id');
    type = 'page';
  } else if (typeof ($('[data-page=group]').attr('data-id')) == "string") {
    id = $('[data-page=group]').attr('data-id');
    type = 'group';
  }
  Wo_CloseLightbox();
  $('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_previous_image', post_id:post_id, type:type, id:id}, function(data) {
    if (data.status == 200) {
    document.body.style.overflow = 'hidden';
      $('.lightbox-container').html(data.html);
      $( ".changer" ).fadeIn(200);
    }
    if (data.html.length == 0) {
       document.body.style.overflow = 'auto';
    }
  });
}

function Wo_AcceptJoinGroup(user_id, group_id) {
  $.get(Wo_Ajax_Requests_File(), {f:'groups', s:'accept_request', user_id:user_id, group_id:group_id}, function(data) {
    if (data.status == 200) {
      $('#request-' + user_id).fadeOut(300, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_DeleteJoinGroup(user_id, group_id) {
  $.get(Wo_Ajax_Requests_File(), {f:'groups', s:'delete_request', user_id:user_id, group_id:group_id}, function(data) {
    if (data.status == 200) {
      $('#request-' + user_id).fadeOut(300, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_DeleteJoinedUser(user_id, group_id) {
  $.get(Wo_Ajax_Requests_File(), {f:'groups', s:'delete_joined_user', user_id:user_id, group_id:group_id}, function(data) {
    if (data.status == 200) {
      $('#member-' + user_id).fadeOut(300, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_OpenReplyBox(id) {
  Wo_ViewMoreReplies(id);
   $('#comment_' + id).find('.comment-replies').slideDown(50, function () {
     $('#comment_' + id).find('.comment-reply').slideDown(50);
   });
}
// register post comment
function Wo_RegisterReply(text, comment_id, user_id, event, page_id, type) {
  if(event.keyCode == 13 && event.shiftKey == 0) {
    comment_wrapper = $('[id=comment_' + comment_id + ']');
    reply_textarea = comment_wrapper.find('.comment-replies');
    textarea_wrapper = reply_textarea.find('.textarea');
    reply_list = comment_wrapper.find('.comment-replies-text');
    if(text == '') {
      return false;
    }
    $.post(Wo_Ajax_Requests_File() + '?f=posts&s=register_reply', {
      comment_id: comment_id,
      text: text,
      user_id: user_id,
      page_id: page_id
    }, function (data) {
      textarea_wrapper.val('');
      if(data.status == 200) {
        Wo_OpenReplyBox(comment_id);
        comment_wrapper.find('.reply-container:last-child').after(data.html);
        comment_wrapper.find('[id=comment-replies]').html(data.replies_num);
      }
    });
  }
}

function Wo_ViewMoreReplies(comment_id) {
  main_wrapper = $('[id=comment_' + comment_id + ']');
  view_more_wrapper = main_wrapper.find('.view-more-replies');
  Wo_progressIconLoader(view_more_wrapper);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'load_more_replies',
    comment_id: comment_id
  }, function (data) {
    if(data.status == 200) {
      main_wrapper.find('.comment-replies-text').html(data.html);
      main_wrapper.find('.comment-reply').fadeIn(100);
      view_more_wrapper.remove();
    }
  });
}

function Wo_RegsiterRecent(id, type) {
  $.get(Wo_Ajax_Requests_File(), {
    f: 'register_recent_search',
    id: id,
    type:type
  }, function (data) {
    if(data.status == 200) {
      window.location.href = data.href;
    }
  });
} 

function Wo_RemoveAlbumImage(post_id, id) {
  $.get(Wo_Ajax_Requests_File(), {
    f: 'delete_album_image',
    id: id,
    post_id: post_id
  }, function (data) {
    if(data.status == 200) {
      $('#post-' + post_id).find('#image-' + id).fadeOut(200, function () {
        $(this).remove();
      });
    }
  });
}
function Wo_ShowDeleteButton(post_id, id) {
  $('#post-' + post_id).find('#image-' + id).find('span').fadeIn(200);
}
function Wo_HideDeleteButton(post_id, id) {
  $('#post-' + post_id).find('#image-' + id).find('span').fadeOut(200);
}
function Wo_RegisterInvite(user_id, page_id) {
  Wo_progressIconLoader($('#invite-' + user_id).find('button'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'register_page_invite',
    user_id: user_id,
    page_id: page_id
  }, function (data) {
    if(data.status == 200) {
      $('#invite-' + user_id).fadeOut(200, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_RegisterAddGroup(user_id, group_id) {
  Wo_progressIconLoader($('#add-' + user_id).find('button'));
  $.get(Wo_Ajax_Requests_File(), {
    f: 'register_group_add',
    user_id: user_id,
    group_id: group_id
  }, function (data) {
    if(data.status == 200) {
      $('#add-' + user_id).fadeOut(200, function () {
        $(this).remove();
      });
    }
  });
}

function Wo_SkipStep(type) {
  $.get(Wo_Ajax_Requests_File(), {
    f: 'skip_step',
    type: type
  }, function (data) {
    if(data.status == 200) {
     window.location.reload();
    }
  });
}
function Wo_AddEmoToCommentInput(post_id, code, type) {
    inputTag = $('[id=post-' + post_id + ']').find('.comment-textarea');
    if (type == 'lightbox-post-footer') {
       inputTag = $('.lightbox-post-footer').find('.comment-textarea');
    }
    inputVal = inputTag.val();
    if (typeof(inputTag.attr('placeholder')) != "undefined") {
        inputPlaceholder = inputTag.attr('placeholder');
        if (inputPlaceholder == inputVal) {
            inputTag.val('');
            inputVal = inputTag.val();
        }
    }
    if (inputVal.length == 0) {
        inputTag.val(code + ' ');
    } else {
        inputTag.val(inputVal + ' ' + code);
    }
    inputTag.keyup().focus();
}
function Wo_SendMessages() {
  $.get(Wo_Ajax_Requests_File(), {f: 'send_mails'});
}
// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function Wo_NotifyMe(icon, title, notification_text, url) {
  if (!Notification) {
    return;
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification(title, {
      icon: icon,
      body: notification_text,
    });
    
    notification.onclick = function () {
      window.open(url);
      notification.close();
      Wo_OpenNotificationsMenu();    
    };
  }
}
function Wo_CheckForCallAnswer(id) {
  $.get(Wo_Ajax_Requests_File(), {f:'check_for_answer', id:id}, function (data1) {
    if (data1.status == 200) {
      clearTimeout(checkcalls);
      $('#calling-modal').find('.modal-title').html('<i class="fa fa fa-video-camera"></i> ' + data1.text_answered);
      $('#calling-modal').find('.modal-body p').text(data1.text_please_wait);
      setTimeout(function () {
          window.location.href = data1.url;
      }, 1000);
      return false;
    } else if (data1.status == 400) {
      clearTimeout(checkcalls);
      Wo_PlayAudioCall('stop');
      $('#calling-modal').find('.modal-title').html('<i class="fa fa fa-times"></i> ' + data1.text_call_declined);
      $('#calling-modal').find('.modal-body p').text(data1.text_call_declined_desc);
    }
    checkcalls = setTimeout(function () {
        Wo_CheckForCallAnswer(id);
    }, 2000);
  });
}

function Wo_CheckForAudioCallAnswer(id) {
  $.get(Wo_Ajax_Requests_File(), {f:'check_for_audio_answer', id:id}, function (data1) {
    if (data1.status == 200) {
      clearTimeout(checkcalls);
      $('#calling-modal').find('.modal-title').html('<i class="fa fa fa-phone"></i> ' + data1.text_answered);
      $('#calling-modal').find('.modal-body p').text(data1.text_please_wait);
      Wo_PlayAudioCall('stop');
      setTimeout(function () {
          $( '#calling-modal' ).remove();
          $( '.modal-backdrop' ).remove();
          $( 'body' ).removeClass( "modal-open" );
          $('body').append(data1.calls_html);
          $('#re-talking-modal').modal({
            show: true
          });
      }, 3000);
    } else if (data1.status == 400) {
      clearTimeout(checkcalls);
      Wo_PlayAudioCall('stop');
      $('#calling-modal').find('.modal-title').html('<i class="fa fa fa-times"></i> ' + data1.text_call_declined);
      $('#calling-modal').find('.modal-body p').text(data1.text_call_declined_desc);
    } else {
      checkcalls = setTimeout(function () {
        Wo_CheckForAudioCallAnswer(id);
      }, 2000);
    }
  });
}

function Wo_AnswerCall(id, url, type) {
  type1 = 'video';
  if (type == 'video') {
     type1 = 'video';
  } else if (type == 'audio') {
    type1 = 'audio';
  }
  Wo_progressIconLoader($('#re-calling-modal').find('.answer-call'));
  $.get(Wo_Ajax_Requests_File(), {f:'answer_call', id:id, type:type1}, function (data) {
    Wo_PlayVideoCall('stop');
    if (type1 == 'video') {
      if (data.status == 200) {
         window.location.href = url;
      }
    } else {
      $( '#re-calling-modal' ).remove();
      $( '.modal-backdrop' ).remove();
      $( 'body' ).removeClass( "modal-open" );
      $('body').append(data.calls_html);
      $('#re-talking-modal').modal({
        show: true
      });
    }
    Wo_progressIconLoader($('#re-calling-modal').find('.answer-call'));
  });
}
function Wo_DeclineCall(id, url, type) {
  type1 = 'video';
  if (type == 'video') {
     type1 = 'video';
  } else if (type == 'audio') {
    type1 = 'audio';
  }
  Wo_progressIconLoader($('#re-calling-modal').find('.decline-call'));
  $.get(Wo_Ajax_Requests_File(), {f:'decline_call', id:id, type:type1}, function (data) {
    if (data.status == 200) {
      Wo_PlayVideoCall('stop');
      $( '#re-calling-modal' ).remove();
      $( '.modal-backdrop' ).remove();
      $( 'body' ).removeClass( "modal-open" );
    }
  });
}

function Wo_CloseCall(id) {
  Wo_progressIconLoader($('#re-talking-modal').find('.decline-call'));
  $.get(Wo_Ajax_Requests_File(), {f:'close_call', id:id}, function (data) {
    if (data.status == 200) {
      $( '#re-talking-modal' ).remove();
      $( '.modal-backdrop' ).remove();
      $( 'body' ).removeClass( "modal-open");
    }
  });
}

function Wo_CancelCall() {
  Wo_progressIconLoader($('#calling-modal').find('.cancel-call'));
  $.get(Wo_Ajax_Requests_File(), {f:'cancel_call'}, function (data) {
    if (data.status == 200) {
      Wo_PlayAudioCall('stop');
      $( '#calling-modal' ).remove();
      $( '.modal-backdrop' ).remove();
      $( 'body' ).removeClass( "modal-open" );
    }
  });
}
function Wo_GenerateVideoCall(user_id1, user_id2) {
  $.get(Wo_Ajax_Requests_File(), {f:'create_new_video_call', 'new': 'true', user_id1: user_id1, user_id2:user_id2}, function(data) {
      if (data.status == 200) {
          $('body').append(data.html);
           $('#calling-modal').modal({
             show: true
           });
           checkcalls = setTimeout(function () {
              Wo_CheckForCallAnswer(data.id);
           }, 2000);
           setTimeout(function() {
            $('#calling-modal').find('.modal-title').html('<i class="fa fa fa-video-camera"></i> ' + data.text_no_answer);
            $('#calling-modal').find('.modal-body p').text(data.text_please_try_again_later);
            clearTimeout(checkcalls);
            Wo_PlayAudioCall('stop');
           }, 43000);
          Wo_PlayAudioCall('play');
    }
   });
}

function Wo_GenerateVoiceCall(user_id1, user_id2) {
  $.get(Wo_Ajax_Requests_File(), {f:'create_new_audio_call', 'new': 'true', user_id1: user_id1, user_id2:user_id2}, function(data) {
      if (data.status == 200) {
          $('body').append(data.html);
           $('#calling-modal').modal({
             show: true
           });
           checkcalls = setTimeout(function () {
              Wo_CheckForAudioCallAnswer(data.id);
           }, 2000);
           setTimeout(function() {
            $('#calling-modal').find('.modal-title').html('<i class="fa fa fa-phone"></i> ' + data.text_no_answer);
            $('#calling-modal').find('.modal-body p').text(data.text_please_try_again_later);
            clearTimeout(checkcalls);
            Wo_PlayAudioCall('stop');
           }, 43000);
          Wo_PlayAudioCall('play');
    }
   });
}

function Wo_PlayAudioCall(type) {
  if (type == 'play') {
    document.getElementById('calling-sound').play();
    playmusic_ = setTimeout(function() {
       Wo_PlayAudioCall('play');
    }, 100);
  } else {
    clearTimeout(playmusic_);
    document.getElementById('calling-sound').pause();
  }
}
function Wo_PlayVideoCall(type) {
  if (type == 'play') {
    document.getElementById('video-calling-sound').play();
    playmusic = setTimeout(function() {
       Wo_PlayVideoCall('play');
    }, 100);
  } else {
    clearTimeout(playmusic);
    document.getElementById('video-calling-sound').pause();
  }
}
function textAreaAdjust(o, h, n) {
    if (n == 'lightbox') {
      recording_node = "comm";
    } else {
       o.style.height = h + 'px';
       o.style.height = (5+o.scrollHeight)+"px";
    }
    if (n == 'comm') {
      recording_node = "comm";
    }
}

function Wo_MarkAsSold(post_id, product_id) {
  var post = $('#post-' + post_id);
  post.find('.mark-as-sold-post').html('<div class="post_drop_menu_loading"><div class="ball-pulse"><div></div><div></div><div></div></div></div>');
  $.get(Wo_Ajax_Requests_File(), {
    f: 'posts',
    s: 'mark_as_sold_post',
    post_id: post_id,
    product_id: product_id
  }, function (data) {
    if(data.status == 200) {
      post.find('.product-status').text(data.text);
      post.find('.mark-as-sold-post').html(data.text);
    }
  });
}

function Wo_VoteUp(id) {
  var $vote_con = $('#option-' + id);
  var $post_id = $vote_con.attr('data-post-id');
  if ($post_id.length == 0) {
     return false;
  }
  $is_voted = $('#post-' + $post_id).find('.options').attr('data-vote');
  if ($is_voted.length == 0) {
     return false;
  }
  if ($is_voted == 'false') {
     $vote_con.find('.vote-icon').html('<i class="fa fa-check-circle"></i>');
  }
  $('#post-' + $post_id).find('.options').attr('data-vote', true);
  $.get(Wo_Ajax_Requests_File(), {f:'vote_up', id:id}, function (data) {
       if (data.status == 200) {
        $('#post-' + $post_id).find('.total-votes').removeClass('hidden');
    $('#post-' + $post_id).find('.result-bar-parent').removeClass('hidden');
    $('#post-' + $post_id).find('.answer-vote').removeClass('hidden');
        data.votes.forEach(function(option) {
          $('#post-' + $post_id).find('#total-votes').text(option.all);
          $('#option-' + option.id).find('.answer-vote').html(option.percentage);
          if (option.percentage_num > 0) {
            $('#option-' + option.id).find('.result-bar').text(' ').css('width', option.percentage);
          }
        });
      } else if (data.status == 400) {
         alert(data.text);
      } 
  });
}


function Wo_UploadCommentImage(id) {
  var image_container = $('#post-' + id);
  var fetched_image = image_container.find('#comment-image');
  var data = new FormData();
  data.append('image', $('#comment_image_' + id).prop('files')[0]);
  image_container.find('#wo_comment_combo .ball-pulse').fadeIn(100);
  $.ajax({
        type: "POST",
        url: Wo_Ajax_Requests_File() + '?f=upload_image&id=' + id,
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.status == 200) {
            fetched_image.html('<img src="' + data.image + '"><div class="remove-icon" onclick="Wo_EmptyCommentImage(' + id + ')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></div>');
            image_container.find('#comment_src_image').val(data.image_src);
            fetched_image.removeClass('hidden');
            image_container.find('.comment-textarea').focus();
          }
          image_container.find('#wo_comment_combo .ball-pulse').fadeOut(100);
        }
    });
}

function Wo_EmptyCommentImage(id) {
  var image_container = $('#post-' + id);
  var fetched_image = image_container.find('#comment-image');
  image_container.find('.comment-image-con').empty().addClass('hidden');
  image_container.find('#comment_src_image').val('');
  image_container.find('#comment_src_image').val('');
  image_container.find('#comment_image_' + id).val('');
}

function Wo_TurnOffSound() {
  var sound = $('.turn-off-sound');
  Wo_progressIconLoader(sound);
  $.get(Wo_Ajax_Requests_File(), {
    f: 'turn-off-sound'
  }, function (data) {
    if(data.status == 200) {
      sound.find('span').html(data.message);
    }
  });
}

function Wo_Del_Article(id) {
    $("#delete-blog").find('.ball-pulse').fadeIn(100);
    $.ajax({
        type: "GET",
        url: Wo_Ajax_Requests_File(),
        data: {
            id: id,
            f: 'delete-my-blog'
        },
        dataType: 'json',
        success: function(data) {
            if (data['status'] == 200) {
                $("#delete-blog").modal("hide");
                $("div[data-rm-blog='" + data['id'] + "']").fadeOut(function() {
                    $(this).remove()
                });
            }
            $("#delete-blog").find('.ball-pulse').fadeOut(100);
        }
    });
}

function Wo_DelReply(id) {
  if (!id) {
    return false;
  }else{

      Wo_progressIconLoader($('#delete-reply').find('button'));
      $.ajax({
          type: "GET",
          url: Wo_Ajax_Requests_File(),
          data: {
              id: id,
              f: 'delete-reply'
          },
          dataType: 'json',
          success: function(data) {
              if (data['status'] == 200) {
                  $("#delete-reply").modal("hide");
                  $("[data-thread-reply='" + id + "']").slideUp(function() {
                      $(this).remove()
                  });
              }
              Wo_progressIconLoader($('#delete-reply').find('button'));
          }
      });
  }
}

function Wo_DelThread(id) {
  if (!id) {
    return false;
  }else{

      Wo_progressIconLoader($('#delete-thread').find('button'));
      $.ajax({
          type: "GET",
          url: Wo_Ajax_Requests_File(),
          data: {
              id: id,
              f: 'delete-thread'
          },
          dataType: 'json',
          success: function(data) {
              if (data['status'] == 200) {
                  $("#delete-thread").modal("hide");
                  $("[data-thread-ident='" + id + "']").slideUp(function() {
                      $(this).remove()
                  });
              }
              Wo_progressIconLoader($('#delete-thread').find('button'));
          }
      });
  }
}
var Wo_Delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();
function Wo_AddVideoViews(post_id){
    if (post_id && typeof(Number(post_id)) == 'number'  && post_id > 0) {
      Wo_Delay(function(){
        $.ajax({
          url: Wo_Ajax_Requests_File(),
          type: 'GET',
          dataType: 'json',
          data: {f:'posts', s:'add-video-view',post_id:post_id},
        })
        .done(function(data) {
          if (data.status == 200) {
            $("span[data-post-video-views="+post_id+"]").text(data.views);
            $("video[data-post-video="+post_id+"]").removeAttr('onplay');
          }
        })
      },5000)
    }
  }
function Wo_DeleteStatus(id){
  if (!id || !confirm('Are you sure you want to delete your status?')) {
    return false;
  }

  $.ajax({
    url: Wo_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'status',s:'remove',id:id},
  })
  .done(function(data) {
    if (data.status == 200) {
      location.reload();
      $("[data-status-id='"+id+"']").slideUp(function(){
        $(this).remove();
      })
    }
  })
  .fail(function() {
    console.log("error");
  })
}

function Wo_StoryProgress(){
  $('.mfp-progress-line').html('<span width="0"></span>').find('span').delay(1).queue(function () {
    $(this).css('width', '100%')
  });   
}


function Wo_EditReplyComment(id){
  if (!id) { return false;}
  var self = $("div[data-post-comm-reply-edit='"+id+"']").toggleClass('hidden');  
  self.find('textarea').val($("div[data-post-comm-reply-text='"+id+"']").text().trim());
}

function Wo_UpdatCommReply(id,event,self){
  if (!id || !event || !self) {
    return false;
  }

  else if (event.keyCode == 13 && event.shiftKey == 0) {
    var text = $(self).val();
    var id   = id;
    $.ajax({
      url: Wo_Ajax_Requests_File() + "?f=posts&s=update-reply",
      type: 'POST',
      dataType: 'json',
      data: {id:id,text:text},
    })
    .done(function(data) {
      if (data.status == 200) {
        $("div[data-post-comm-reply-text='"+id+"']").text(text);
        var edit_box = $("div[data-post-comm-reply-edit='"+id+"']").addClass('hidden');
        edit_box.find('textarea').val('');
      }
    })
    .fail(function() {
      console.log("error");
    })
    
  }

}

function Wo_HidePost(post_id){
  if (!post_id) {
    return false;
  }

  $.ajax({
    url: Wo_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'posts',s:'hide_post',post:post_id},
  })
  .done(function(data) {
    if (data.status == 200) {
      $("#post-"+post_id).slideUp(function(){
        $(this).remove();
      })
    }
  })
  .fail(function() {
    console.log("error");
  })
}

function Wo_SharePost(post_id, owner_id, self){

  if (!post_id || !owner_id || !self) {
    return false;
  }
  $.ajax({
    url: Wo_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'posts',s:'share-post',id:post_id,usr:owner_id},
  })
  .done(function(data) {
    if (data.status == 200) {
      $("#post-shared").modal('show');
        setTimeout(function(){
        $("#post-shared").modal('hide');
        $('#post-' + post_id).find('.post-share').slideUp('fast')
      },3000); 
    }
  })
  .fail(function() {
    console.log("error");
  })
  
}

function Wo_AddGroupUserAdmin(member_id, group_id, self){
  if (!member_id || !group_id || !self) {
    return false;
  }
  $.ajax({
    url: Wo_Ajax_Requests_File(),
    type: 'GET',
    dataType: 'json',
    data: {f: 'groups',s:'add_admin',user_id:member_id,group_id:group_id},
  })
  .done(function(data) {
    if (data.status == 200 && data.code == 1) {
      $(self).find('span').html('<i class="fa fa-times-circle-o"></i>');
    }
    else if(data.status == 200 && data.code == 0){
      $(self).find('span').html('<i class="fa fa-plus-square-o"></i>');
    }
  })
  .fail(function() {
    console.log("error");
  })
  
}

function Wo_OpenLighteBox(self ,event){
  if (!self || !event) {
    return false;
  }
  event.stopPropagation();
  var url = $(self).attr('data-href');
  $('#modal_light_box').modal('show').find('.image').attr('src', url);
}

function Wo_UpdateLocation(position) {
  if (!position) {
    return false; 
  }
  $.post(Wo_Ajax_Requests_File() + '?f=save_user_location', {lat: position.coords.latitude, lng:position.coords.longitude}, function(data, textStatus, xhr) {
    if (data.status == 200) {
      return true;
    }
  });
  return false;
}


var Wo_ElementLoad = function(selector, callback){
    $(selector).each(function(){
        if (this.complete || $(this).height() > 0) {
            callback.apply(this);
        }
        else {
            $(this).on('load', function(){
                callback.apply(this);
            });
        }
    });
};


function Wo_NextProductPicture(product_id, id) {
  Wo_CloseLightbox();
  $('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_next_product_image', product_id:product_id, after_image_id:id}, function(data) {
    if (data.status == 200) {
    document.body.style.overflow = 'hidden';
      $('.lightbox-container').html(data.html);
      $( ".changer").fadeIn(200);
    }
  });
}

function Wo_PreviousProductPicture(product_id, id) {
  Wo_CloseLightbox();
  $('body').append('<div class="lightbox-container"><div class="lightbox-backgrond" onclick="Wo_CloseLightbox();"></div><div class="lb-preloader" style="display:block"><svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#676d76" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="1.5s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg></div></div>');
  $.get(Wo_Ajax_Requests_File(), {f:'get_previous_product_image', product_id:product_id, before_image_id:id}, function(data) {
    if (data.status == 200) {
    document.body.style.overflow = 'hidden';
      $('.lightbox-container').html(data.html);
      $( ".changer").fadeIn(200);
    }
  });
}
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


function Wo_IsFileAllowedToUpload(filename, allowed) {
    var extension = filename.replace(/^.*\./, '').toLowerCase();
    var allowed_array = allowed.split(',');
    if (isInArray(extension, allowed_array)) {
      return true;
    }
    return false;
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

/*Stickey Sidebar*/
!function(i){i.fn.theiaStickySidebar=function(t){function e(t,e){var a=o(t,e);a||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),i(document).on("scroll."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)),i(window).on("resize."+t.namespace,function(t,e){return function(a){var n=o(t,e);n&&i(this).unbind(a)}}(t,e)))}function o(t,e){return t.initialized===!0||!(i("body").width()<t.minWidth)&&(a(t,e),!0)}function a(t,e){t.initialized=!0;var o=i("#theia-sticky-sidebar-stylesheet-"+t.namespace);0===o.length&&i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-'+t.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),e.each(function(){function e(){a.fixedScrollTop=0,a.sidebar.css({"min-height":"1px"}),a.stickySidebar.css({position:"static",width:"",transform:"none"})}function o(t){var e=t.height();return t.children().each(function(){e=Math.max(e,i(this).height())}),e}var a={};if(a.sidebar=i(this),a.options=t||{},a.container=i(a.options.containerSelector),0==a.container.length&&(a.container=a.sidebar.parent()),a.sidebar.parents().css("-webkit-transform","none"),a.sidebar.css({position:a.options.defaultPosition,overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),a.stickySidebar=a.sidebar.find(".theiaStickySidebar"),0==a.stickySidebar.length){var s=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;a.sidebar.find("script").filter(function(i,t){return 0===t.type.length||t.type.match(s)}).remove(),a.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()),a.sidebar.append(a.stickySidebar)}a.marginBottom=parseInt(a.sidebar.css("margin-bottom")),a.paddingTop=parseInt(a.sidebar.css("padding-top")),a.paddingBottom=parseInt(a.sidebar.css("padding-bottom"));var r=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight();a.stickySidebar.css("padding-top",1),a.stickySidebar.css("padding-bottom",1),r-=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight()-d-r,0==r?(a.stickySidebar.css("padding-top",0),a.stickySidebarPaddingTop=0):a.stickySidebarPaddingTop=1,0==d?(a.stickySidebar.css("padding-bottom",0),a.stickySidebarPaddingBottom=0):a.stickySidebarPaddingBottom=1,a.previousScrollTop=null,a.fixedScrollTop=0,e(),a.onScroll=function(a){if(a.stickySidebar.is(":visible")){if(i("body").width()<a.options.minWidth)return void e();if(a.options.disableOnResponsiveLayouts){var s=a.sidebar.outerWidth("none"==a.sidebar.css("float"));if(s+50>a.container.width())return void e()}var r=i(document).scrollTop(),d="static";if(r>=a.sidebar.offset().top+(a.paddingTop-a.options.additionalMarginTop)){var c,p=a.paddingTop+t.additionalMarginTop,b=a.paddingBottom+a.marginBottom+t.additionalMarginBottom,l=a.sidebar.offset().top,f=a.sidebar.offset().top+o(a.container),h=0+t.additionalMarginTop,g=a.stickySidebar.outerHeight()+p+b<i(window).height();c=g?h+a.stickySidebar.outerHeight():i(window).height()-a.marginBottom-a.paddingBottom-t.additionalMarginBottom;var u=l-r+a.paddingTop,S=f-r-a.paddingBottom-a.marginBottom,y=a.stickySidebar.offset().top-r,m=a.previousScrollTop-r;"fixed"==a.stickySidebar.css("position")&&"modern"==a.options.sidebarBehavior&&(y+=m),"stick-to-top"==a.options.sidebarBehavior&&(y=t.additionalMarginTop),"stick-to-bottom"==a.options.sidebarBehavior&&(y=c-a.stickySidebar.outerHeight()),y=m>0?Math.min(y,h):Math.max(y,c-a.stickySidebar.outerHeight()),y=Math.max(y,u),y=Math.min(y,S-a.stickySidebar.outerHeight());var k=a.container.height()==a.stickySidebar.outerHeight();d=(k||y!=h)&&(k||y!=c-a.stickySidebar.outerHeight())?r+y-a.sidebar.offset().top-a.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==d){var v=i(document).scrollLeft();a.stickySidebar.css({position:"fixed",width:n(a.stickySidebar)+"px",transform:"translateY("+y+"px)",left:a.sidebar.offset().left+parseInt(a.sidebar.css("padding-left"))-v+"px",top:"0px"})}else if("absolute"==d){var x={};"absolute"!=a.stickySidebar.css("position")&&(x.position="absolute",x.transform="translateY("+(r+y-a.sidebar.offset().top-a.stickySidebarPaddingTop-a.stickySidebarPaddingBottom)+"px)",x.top="0px"),x.width=n(a.stickySidebar)+"px",x.left="",a.stickySidebar.css(x)}else"static"==d&&e();"static"!=d&&1==a.options.updateSidebarHeight&&a.sidebar.css({"min-height":a.stickySidebar.outerHeight()+a.stickySidebar.offset().top-a.sidebar.offset().top+a.paddingBottom}),a.previousScrollTop=r}},a.onScroll(a),i(document).on("scroll."+a.options.namespace,function(i){return function(){i.onScroll(i)}}(a)),i(window).on("resize."+a.options.namespace,function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(a)),"undefined"!=typeof ResizeSensor&&new ResizeSensor(a.stickySidebar[0],function(i){return function(){i.onScroll(i)}}(a))})}function n(i){var t;try{t=i[0].getBoundingClientRect().width}catch(i){}return"undefined"==typeof t&&(t=i.width()),t}var s={containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern",defaultPosition:"relative",namespace:"TSS"};return t=i.extend(s,t),t.additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,e(t,this),this}}(jQuery);



/*Pro users Slider*/
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg></button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});


/*!
  Non-Sucking Autogrow 1.1.6
  license: MIT
  author: Roman Pushkin
  https://github.com/ro31337/jquery.ns-autogrow
*/
(function(){var e;!function(t,l){return t.fn.autogrow=function(i){if(null==i&&(i={}),null==i.horizontal&&(i.horizontal=!0),null==i.vertical&&(i.vertical=!0),null==i.debugx&&(i.debugx=-1e4),null==i.debugy&&(i.debugy=-1e4),null==i.debugcolor&&(i.debugcolor="yellow"),null==i.flickering&&(i.flickering=!0),null==i.postGrowCallback&&(i.postGrowCallback=function(){}),null==i.verticalScrollbarWidth&&(i.verticalScrollbarWidth=e()),i.horizontal!==!1||i.vertical!==!1)return this.filter("textarea").each(function(){var e,n,r,o,a,c,d;if(e=t(this),!e.data("autogrow-enabled"))return e.data("autogrow-enabled"),a=e.height(),c=e.width(),o=1*e.css("lineHeight")||0,e.hasVerticalScrollBar=function(){return e[0].clientHeight<e[0].scrollHeight},n=t('<div class="autogrow-shadow"></div>').css({position:"absolute",display:"inline-block","background-color":i.debugcolor,top:i.debugy,left:i.debugx,"max-width":e.css("max-width"),padding:e.css("padding"),fontSize:e.css("fontSize"),fontFamily:e.css("fontFamily"),fontWeight:e.css("fontWeight"),lineHeight:e.css("lineHeight"),resize:"none","word-wrap":"break-word"}).appendTo(document.body),i.horizontal===!1?n.css({width:e.width()}):(r=e.css("font-size"),n.css("padding-right","+="+r),n.normalPaddingRight=n.css("padding-right")),d=function(t){return function(l){var r,d,s;return d=t.value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n /g,"<br/>&nbsp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/\n$/,"<br/>&nbsp;").replace(/\n/g,"<br/>").replace(/ {2,}/g,function(e){return Array(e.length-1).join("&nbsp;")+" "}),/(\n|\r)/.test(t.value)&&(d+="<br />",i.flickering===!1&&(d+="<br />")),n.html(d),i.vertical===!0&&(r=Math.max(n.height()+o,a),e.height(r)),i.horizontal===!0&&(n.css("padding-right",n.normalPaddingRight),i.vertical===!1&&e.hasVerticalScrollBar()&&n.css("padding-right","+="+i.verticalScrollbarWidth+"px"),s=Math.max(n.outerWidth(),c),e.width(s)),i.postGrowCallback(e)}}(this),e.change(d).keyup(d).keydown(d),t(l).resize(d),d()})}}(window.jQuery,window),e=function(){var e,t,l,i;return e=document.createElement("p"),e.style.width="100%",e.style.height="200px",t=document.createElement("div"),t.style.position="absolute",t.style.top="0px",t.style.left="0px",t.style.visibility="hidden",t.style.width="200px",t.style.height="150px",t.style.overflow="hidden",t.appendChild(e),document.body.appendChild(t),l=e.offsetWidth,t.style.overflow="scroll",i=e.offsetWidth,l===i&&(i=t.clientWidth),document.body.removeChild(t),l-i}}).call(this);


function escapeHtml(html)
{
    var text = document.createTextNode(html);
    var div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
}



function Wo_RegisterCommentReaction(comment_id,reaction){
  if (!comment_id && !reaction)
    return false;

  $('.reactions-comment-container-' + comment_id).css('display', 'none');
  $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'register_comment_reaction', comment_id: comment_id, reaction: reaction}, function (data) {
    if(data.status == 200) {
        $('.comment-reactions-icons-'+comment_id).html(data.reactions);
        $('.comment-status-reaction-'+comment_id).addClass("active-like");
        //$('.c_likes-'+comment_id).html(data.like_lang);
      //post.find("[id^=likes]").text(data.likes);
    } else {
      //post.find("[id^=likes]").text(data.likes);
    }
    if (data.can_send == 1) {
      Wo_SendMessages();
    }
  });

}

function Wo_RegisterlightboxCommentReaction(comment_id,reaction){
  if (!comment_id && !reaction)
    return false;

  $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'register_comment_reaction', comment_id: comment_id, reaction: reaction}, function (data) {
    if(data.status == 200) {
        $('.lightbox-comment-reactions-icons-'+comment_id).html(data.reactions);
        $('.lightbox-comment-status-reaction-'+comment_id).addClass("active-like");
        //$('.c_likes-'+comment_id).html(data.like_lang);
      //post.find("[id^=likes]").text(data.likes);
    } else {
      //post.find("[id^=likes]").text(data.likes);
    }
    if (data.can_send == 1) {
      Wo_SendMessages();
    }
  });

}


function Wo_RegisterReplyReaction(user_id,reply_id,reaction){
  if (!reply_id && !reaction)
    return false;

  $('.reactions-box-comment-replay-container-' + reply_id).css('display', 'none');
  $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'register_replay_reaction', user_id: user_id, reply_id: reply_id, reaction: reaction}, function (data) {
    if(data.status == 200) {
        $('.replay-reactions-icons-'+reply_id).html(data.reactions);
        $('.replay-status-reaction-'+reply_id).addClass("active-like");
        //$('.r_likes-'+reply_id).html(data.like_lang);
      //post.find("[id^=likes]").text(data.likes);
    } else {
      //post.find("[id^=likes]").text(data.likes);
    }
    if (data.can_send == 1) {
      Wo_SendMessages();
    }
  });

}


function load_ajax_emojii(id, path){
    var emojjii = "😀*😁*😂*🤣*😃*😄*😅*😆*😉*😊*😋*😎*😍*😘*😗*😙*😚*🙂*🤗*🤩*🤔*🤨*😐*😑*😶*🙄*😏*😣*😥*😮*🤐*😯*😪*😫*😴*😌*😛*😜*😝*🤤*😒*😓*😔*😕*🙃*🤑*😲*☹️*🙁*😖*😞*😟*😤*😢*😭*😦*😧*😨*😩*🤯*😬*😰*😱*😳*🤪*😵*😡*😠*🤬*😷*🤒*🤕*🤢*🤮*🤧*😇*🤠*🤡*🤥*🤫*🤭*🧐*🤓*😈*👿*👹*👺*💀*👻*👽*🤖*💩*😺*😸*😹*😻*😼*😽*🙀*😿*😾*👶*👧*🧒*👦*👩*🧑*👨*👵*🧓*👴*👲*💅*🤳*💃*🕺*🕴*👫*👭*👬*💑*🤲*👐*🙌*👏*🤝*👍*👎*👊*✊*🤛*🤜*🤞*✌️*🤟*🤘*👌*👈*👉*👆*👇*☝️*✋*🤚*🖐*🖖*👋*🤙*💪*🖕*✍️*🙏*💍*💄*💋*👄*👅*👂*👃*👣*👁*👀*🧠*🗣*👤*👥";
    
	$('.emo-comment-container-' + id ).html("");
	$.each(emojjii.split('*'), function(key, value) {
		$('.emo-comment-container-' + id ).append("<span class=\"emoji_holder\" onclick=\"Wo_AddEmoToCommentInput("+ id +",'"+ value +"');\"><span>"+ value + "</span>");
	});
}

function _getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}
  
var _shortcut_helper = _getCookie("shortcut_helper");
if ( _shortcut_helper == "false" ) {
  $('#shortcut_helper').hide();
}
  
$(window).on('load', function() {
  window.post = 0;
  $('body').on('keypress', function(key) {
    var tag = key.target.tagName.toLowerCase();

    key.stopPropagation();
    var k = parseInt(key.which, 10);
    if( window.post >= 0 ){
      if( k == 106 && tag != 'input' && tag != 'textarea'){
  
        var date = new Date();
        var expires = "";
            date.setTime(date.getTime() + (7*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
            document.cookie = "shortcut_helper=false" + expires + "; path=/";

        $('#shortcut_helper').show();
        
        console.log(post);
        if( $( '.post-container' ).eq( window.post ).hasClass( 'user-ad-container' ) ){
          console.log('ad');
          $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        }

        var listItems = $( '.post-container .post' ).eq( window.post ).find('.panel');
            if (listItems.length) {
              listItems.addClass('active_shadow');
              $('html, body').animate({
                  scrollTop: parseInt(listItems.offset().top - 60)
              }, 600);
              setTimeout(function(){
                listItems.removeClass('active_shadow');
              }, 500);
            //}else{
            //  post++;
            }
            window.post++;
      }else if( k == 107 && tag != 'input' && tag != 'textarea'){
        $('#shortcut_helper').show();
        window.post--;
        var listItems = $( '.post-container .post' ).eq( post ).find('.panel');
        if (listItems.length) {
            listItems.addClass('active_shadow');
            $('html, body').animate({
                scrollTop: parseInt(listItems.offset().top - 60)
            }, 500);
            setTimeout(function(){
              listItems.removeClass('active_shadow');
            }, 500);
        }
      }
      
    }else{
      //post = post -1;
    }
  });
  
});




$(window).on('load', function() {
  //reactions
  $('body').delegate('.wo-reaction-post','mouseenter', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
      if ($('#post-' + id + ' .wo-reaction-post:hover').length != 0) {
          $('.reactions-box-container-'+id).fadeIn(50);
      }
    }, 300);
  });

  $('body').delegate('.wo-reaction-post','mouseleave', function() {
    var id = $( this ).attr( 'data-id' );
      setTimeout( function () {
      if ($('.reactions-box-container-'+id + ':hover').length == 0 && $('#post-' + id + ' .wo-reaction-post:hover').length == 0) {
          $('.reactions-box-container-'+id).fadeOut(50);
      }
    }, 500);
  });

  $('body').delegate('.like-btn-post','click', function() {
    var post_id = $( this ).attr( 'data-id' );
    $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'delete_reaction', post_id: post_id}, function (data) {
      if(data.status == 200) {
        $('.reactions-box-container-'+post_id).toggle();
        $('.post-reactions-icons-'+post_id).html("");
        $('.status-reaction-'+post_id).removeClass("active-like");
        $('.status-reaction-'+post_id).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg> ' + data.like_lang).css({"color": "inherit"});
      }
    });
  });
  
   $('body').delegate('.reactions-box','mouseleave', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
      if ($('.reactions-box-container-'+id + ':hover').length == 0 && $('#post-' + id + ' .wo-reaction-post:hover').length == 0) {
          $('.reactions-box-container-'+id).fadeOut(50);
      }
    }, 500);
  });

  //reactions lightbox
  $('body').delegate('.wo-reaction-lightbox','mouseenter', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
      if ($('#post-' + id + ' .wo-reaction-lightbox:hover').length != 0) {
        $('.reactions-lightbox-container-'+id).fadeIn(50);
      }
    }, 500);
  });

  $('body').delegate('.wo-reaction-lightbox','mouseleave', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
      if ($('.reactions-lightbox-container-'+id + ':hover').length == 0 && $('#post-' + id + ' .wo-reaction-lightbox:hover').length == 0) {
          $('.reactions-lightbox-container-'+id).fadeOut(50);
      }
    }, 500);
  });

  $('body').delegate('.like-btn-lightbox','click', function() {
    var post_id = $( this ).attr( 'data-id' );
    $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'delete_reaction', post_id: post_id}, function (data) {
      if(data.status == 200) {
        $('.reactions-lightbox-container-'+post_id).toggle();
        $('.post-reactions-icons-'+post_id).html("");
        $('.status-reaction-'+post_id).removeClass("active-like");
        $('.status-reaction-'+post_id).html('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>' + data.like_lang).css({"color": "inherit"});
      }
    });
  });

  //reactions comment
  $('body').delegate('.like-btn-comment','mouseenter', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
        $('.reactions-comment-container-'+id).fadeIn(50);
    }, 500);
  });

  $('body').delegate('.like-btn-comment','mouseleave', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
      if( $('.reactions-comment-container-'+id+':hover').length == 0 && $('#comment-' + id + ' .wo-reaction-comment:hover').length == 0 ){
        $('.reactions-comment-container-'+id).fadeOut(50);
      }
    }, 500);
  });

  $('body').delegate('.reactions-box','mouseleave', function() {
    if( !$( this ).hasClass( 'reactions-comment-container-' + $( this ).attr( 'data-id' ) ) ){
      return false;
    }
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
        $('.reactions-comment-container-'+id).fadeOut(50);
    }, 500);
  });
  
  $('body').delegate('.like-btn-comment','click', function() {
    var comment_id = $( this ).attr( 'data-id' );
    $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'delete_comment_reaction', comment_id: comment_id}, function (data) {
      if(data.status == 200) {
        $('.reactions-comment-container-'+comment_id).toggle();
        $('.comment-reactions-icons-'+comment_id).html(data.reactions);
        $('.comment-status-reaction-'+comment_id).removeClass("active-like");
      }
    });
  });
  
  //reactions replay
  $('body').delegate('.like-btn-replay','mouseenter', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
        $('.reactions-box-comment-replay-container-'+id).fadeIn(50);
    }, 500);
  });

  $('body').delegate('.like-btn-replay','mouseleave', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
      if( $('.reactions-comment-replay-container-'+id+':hover').length == 0 && $('#comment_reply_' + id + ' .wo-reaction-replay:hover').length == 0 ){
        $('.reactions-box-comment-replay-container-'+id).fadeOut(50);
      }
    }, 500);
  });

  $('body').delegate('.reactions-box','mouseleave', function() {
    if( !$( this ).hasClass( 'reactions-box-comment-replay-container-' + $( this ).attr( 'data-id' ) ) ){
      return false;
    }
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
        $('.reactions-box-comment-replay-container-'+id).fadeOut(50);
    }, 500);
  });

  $('body').delegate('.like-btn-replay','click', function() {
    var replay_id = $( this ).attr( 'data-id' );
    $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'delete_replay_reaction', replay_id: replay_id}, function (data) {
      if(data.status == 200) {
        $('.reactions-box-comment-replay-container-'+replay_id).toggle();
        $('.replay-reactions-icons-'+replay_id).html(data.reactions);
        $('.replay-status-reaction-'+replay_id).removeClass("active-like");
      }
    });
  });


  //reactions comment lightbox
  $('body').delegate('.like-btn-lightbox-comment','mouseenter', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
        $('.reactions-lightbox-comment-container-'+id).fadeIn(50);
    }, 500);
  });

  $('body').delegate('.like-btn-lightbox-comment','mouseleave', function() {
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
      if( $('.reactions-lightbox-comment-container-'+id+':hover').length == 0 && $('#comment_' + id + ' .wo-reaction-lightbox-comment:hover').length == 0 ){
        $('.reactions-lightbox-comment-container-'+id).fadeOut(50);
      }
    }, 500);
  });
  
  $('body').delegate('.reactions-box','mouseleave', function() {
    if( !$( this ).hasClass( 'reactions-lightbox-comment-container-' + $( this ).attr( 'data-id' ) ) ){
      return false;
    }
    var id = $( this ).attr( 'data-id' );
    setTimeout( function () {
        $('.reactions-lightbox-comment-container-'+id).fadeOut(50);
    }, 500);
  });

  $('body').delegate('.like-btn-lightbox-comment','click', function() {
    var comment_id = $( this ).attr( 'data-id' );
    $.get(Wo_Ajax_Requests_File(), {f: 'posts', s: 'delete_comment_reaction', comment_id: comment_id}, function (data) {
      if(data.status == 200) {
        $('.reactions-box-comment-replay-container-'+comment_id).toggle();
        $('.lightbox-comment-reactions-icons-'+comment_id).html(data.reactions);
        $('.lightbox-comment-status-reaction-'+comment_id).removeClass("active-like");
      }
    });
  });

});

function Wo_ShowCommentCombo(post_id){
  comment_combo_wrapper = $('.wo_comment_combo_' + post_id);
  comment_combo_wrapper.addClass('comment-toggle');
  comment_combo_wrapper.find('textarea').focus();
}


!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports&&"function"==typeof require?e(require("jquery")):e(jQuery)}(function(e){"use strict";var t={escapeRegExChars:function(e){return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&")},createNode:function(e){var t=document.createElement("div");return t.className=e,t.style.position="absolute",t.style.display="none",t}},n=27,o=9,s=13,i=38,a=39,u=40,r=e.noop;function l(t,n){var o=this;o.element=t,o.el=e(t),o.suggestions=[],o.badQueries=[],o.selectedIndex=-1,o.currentValue=o.element.value,o.timeoutId=null,o.cachedResponse={},o.onChangeTimeout=null,o.onChange=null,o.isLocal=!1,o.suggestionsContainer=null,o.noSuggestionsContainer=null,o.options=e.extend({},l.defaults,n),o.classes={selected:"autocomplete-selected",suggestion:"autocomplete-suggestion"},o.hint=null,o.hintValue="",o.selection=null,o.initialize(),o.setOptions(n)}l.utils=t,e.Autocomplete=l,l.defaults={ajaxSettings:{},autoSelectFirst:!1,appendTo:"body",serviceUrl:null,lookup:null,onSelect:null,width:"auto",minChars:1,maxHeight:300,deferRequestBy:0,params:{},formatResult:function(e,n){if(!n)return e.value;var o="("+t.escapeRegExChars(n)+")";return e.value.replace(new RegExp(o,"gi"),"<strong>$1</strong>").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/&lt;(\/?strong)&gt;/g,"<$1>")},formatGroup:function(e,t){return'<div class="autocomplete-group">'+t+"</div>"},delimiter:null,zIndex:9999,type:"GET",noCache:!1,onSearchStart:r,onSearchComplete:r,onSearchError:r,preserveInput:!1,containerClass:"autocomplete-suggestions",tabDisabled:!1,dataType:"text",currentRequest:null,triggerSelectOnValidInput:!0,preventBadQueries:!0,lookupFilter:function(e,t,n){return-1!==e.value.toLowerCase().indexOf(n)},paramName:"query",transformResult:function(t){return"string"==typeof t?e.parseJSON(t):t},showNoSuggestionNotice:!1,noSuggestionNotice:"No results",orientation:"bottom",forceFixPosition:!1},l.prototype={initialize:function(){var t,n=this,o="."+n.classes.suggestion,s=n.classes.selected,i=n.options;n.element.setAttribute("autocomplete","off"),n.noSuggestionsContainer=e('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0),n.suggestionsContainer=l.utils.createNode(i.containerClass),(t=e(n.suggestionsContainer)).appendTo(i.appendTo||"body"),"auto"!==i.width&&t.css("width",i.width),t.on("mouseover.autocomplete",o,function(){n.activate(e(this).data("index"))}),t.on("mouseout.autocomplete",function(){n.selectedIndex=-1,t.children("."+s).removeClass(s)}),t.on("click.autocomplete",o,function(){n.select(e(this).data("index"))}),t.on("click.autocomplete",function(){clearTimeout(n.blurTimeoutId)}),n.fixPositionCapture=function(){n.visible&&n.fixPosition()},e(window).on("resize.autocomplete",n.fixPositionCapture),n.el.on("keydown.autocomplete",function(e){n.onKeyPress(e)}),n.el.on("keyup.autocomplete",function(e){n.onKeyUp(e)}),n.el.on("blur.autocomplete",function(){n.onBlur()}),n.el.on("focus.autocomplete",function(){n.onFocus()}),n.el.on("change.autocomplete",function(e){n.onKeyUp(e)}),n.el.on("input.autocomplete",function(e){n.onKeyUp(e)})},onFocus:function(){var e=this;e.fixPosition(),e.el.val().length>=e.options.minChars&&e.onValueChange()},onBlur:function(){var e=this;e.blurTimeoutId=setTimeout(function(){e.hide()},200)},abortAjax:function(){var e=this;e.currentRequest&&(e.currentRequest.abort(),e.currentRequest=null)},setOptions:function(t){var n=this,o=n.options;this.options=e.extend({},o,t),n.isLocal=e.isArray(o.lookup),n.isLocal&&(o.lookup=n.verifySuggestionsFormat(o.lookup)),o.orientation=n.validateOrientation(o.orientation,"bottom"),e(n.suggestionsContainer).css({"max-height":o.maxHeight+"px",width:o.width+"px","z-index":o.zIndex})},clearCache:function(){this.cachedResponse={},this.badQueries=[]},clear:function(){this.clearCache(),this.currentValue="",this.suggestions=[]},disable:function(){var e=this;e.disabled=!0,clearTimeout(e.onChangeTimeout),e.abortAjax()},enable:function(){this.disabled=!1},fixPosition:function(){var t=this,n=e(t.suggestionsContainer),o=n.parent().get(0);if(o===document.body||t.options.forceFixPosition){var s=t.options.orientation,i=n.outerHeight(),a=t.el.outerHeight(),u=t.el.offset(),r={top:u.top,left:u.left};if("auto"===s){var l=e(window).height(),c=e(window).scrollTop(),g=-c+u.top-i,d=c+l-(u.top+a+i);s=Math.max(g,d)===g?"top":"bottom"}if(r.top+="top"===s?-i:a,o!==document.body){var h,p=n.css("opacity");t.visible||n.css("opacity",0).show(),h=n.offsetParent().offset(),r.top-=h.top,r.left-=h.left,t.visible||n.css("opacity",p).hide()}"auto"===t.options.width&&(r.width=t.el.outerWidth()+"px"),n.css(r)}},isCursorAtEnd:function(){var e,t=this.el.val().length,n=this.element.selectionStart;return"number"==typeof n?n===t:!document.selection||((e=document.selection.createRange()).moveStart("character",-t),t===e.text.length)},onKeyPress:function(e){var t=this;if(t.disabled||t.visible||e.which!==u||!t.currentValue){if(!t.disabled&&t.visible){switch(e.which){case n:t.el.val(t.currentValue),t.hide();break;case a:if(t.hint&&t.options.onHint&&t.isCursorAtEnd()){t.selectHint();break}return;case o:if(t.hint&&t.options.onHint)return void t.selectHint();if(-1===t.selectedIndex)return void t.hide();if(t.select(t.selectedIndex),!1===t.options.tabDisabled)return;break;case s:if(-1===t.selectedIndex)return void t.hide();t.select(t.selectedIndex);break;case i:t.moveUp();break;case u:t.moveDown();break;default:return}e.stopImmediatePropagation(),e.preventDefault()}}else t.suggest()},onKeyUp:function(e){var t=this;if(!t.disabled){switch(e.which){case i:case u:return}clearTimeout(t.onChangeTimeout),t.currentValue!==t.el.val()&&(t.findBestHint(),t.options.deferRequestBy>0?t.onChangeTimeout=setTimeout(function(){t.onValueChange()},t.options.deferRequestBy):t.onValueChange())}},onValueChange:function(){var t=this,n=t.options,o=t.el.val(),s=t.getQuery(o);t.selection&&t.currentValue!==s&&(t.selection=null,(n.onInvalidateSelection||e.noop).call(t.element)),clearTimeout(t.onChangeTimeout),t.currentValue=o,t.selectedIndex=-1,n.triggerSelectOnValidInput&&t.isExactMatch(s)?t.select(0):s.length<n.minChars?t.hide():t.getSuggestions(s)},isExactMatch:function(e){var t=this.suggestions;return 1===t.length&&t[0].value.toLowerCase()===e.toLowerCase()},getQuery:function(t){var n,o=this.options.delimiter;return o?(n=t.split(o),e.trim(n[n.length-1])):t},getSuggestionsLocal:function(t){var n,o=this.options,s=t.toLowerCase(),i=o.lookupFilter,a=parseInt(o.lookupLimit,10);return n={suggestions:e.grep(o.lookup,function(e){return i(e,t,s)})},a&&n.suggestions.length>a&&(n.suggestions=n.suggestions.slice(0,a)),n},getSuggestions:function(t){var n,o,s,i,a=this,u=a.options,r=u.serviceUrl;u.params[u.paramName]=t,!1!==u.onSearchStart.call(a.element,u.params)&&(o=u.ignoreParams?null:u.params,e.isFunction(u.lookup)?u.lookup(t,function(e){a.suggestions=e.suggestions,a.suggest(),u.onSearchComplete.call(a.element,t,e.suggestions)}):(a.isLocal?n=a.getSuggestionsLocal(t):(e.isFunction(r)&&(r=r.call(a.element,t)),s=r+"?"+e.param(o||{}),n=a.cachedResponse[s]),n&&e.isArray(n.suggestions)?(a.suggestions=n.suggestions,a.suggest(),u.onSearchComplete.call(a.element,t,n.suggestions)):a.isBadQuery(t)?u.onSearchComplete.call(a.element,t,[]):(a.abortAjax(),i={url:r,data:o,type:u.type,dataType:u.dataType},e.extend(i,u.ajaxSettings),a.currentRequest=e.ajax(i).done(function(e){var n;a.currentRequest=null,n=u.transformResult(e,t),a.processResponse(n,t,s),u.onSearchComplete.call(a.element,t,n.suggestions)}).fail(function(e,n,o){u.onSearchError.call(a.element,t,e,n,o)}))))},isBadQuery:function(e){if(!this.options.preventBadQueries)return!1;for(var t=this.badQueries,n=t.length;n--;)if(0===e.indexOf(t[n]))return!0;return!1},hide:function(){var t=this,n=e(t.suggestionsContainer);e.isFunction(t.options.onHide)&&t.visible&&t.options.onHide.call(t.element,n),t.visible=!1,t.selectedIndex=-1,clearTimeout(t.onChangeTimeout),e(t.suggestionsContainer).hide(),t.signalHint(null)},suggest:function(){if(this.suggestions.length){var t,n=this,o=n.options,s=o.groupBy,i=o.formatResult,a=n.getQuery(n.currentValue),u=n.classes.suggestion,r=n.classes.selected,l=e(n.suggestionsContainer),c=e(n.noSuggestionsContainer),g=o.beforeRender,d="";o.triggerSelectOnValidInput&&n.isExactMatch(a)?n.select(0):(e.each(n.suggestions,function(e,n){var r,l;s&&(d+=(l=(r=n).data[s],t===l?"":(t=l,o.formatGroup(r,t)))),d+='<div class="'+u+'" data-index="'+e+'">'+i(n,a,e)+"</div>"}),this.adjustContainerWidth(),c.detach(),l.html(d),e.isFunction(g)&&g.call(n.element,l,n.suggestions),n.fixPosition(),l.show(),o.autoSelectFirst&&(n.selectedIndex=0,l.scrollTop(0),l.children("."+u).first().addClass(r)),n.visible=!0,n.findBestHint())}else this.options.showNoSuggestionNotice?this.noSuggestions():this.hide()},noSuggestions:function(){var t=this,n=t.options.beforeRender,o=e(t.suggestionsContainer),s=e(t.noSuggestionsContainer);this.adjustContainerWidth(),s.detach(),o.empty(),o.append(s),e.isFunction(n)&&n.call(t.element,o,t.suggestions),t.fixPosition(),o.show(),t.visible=!0},adjustContainerWidth:function(){var t,n=this.options,o=e(this.suggestionsContainer);"auto"===n.width?(t=this.el.outerWidth(),o.css("width",t>0?t:300)):"flex"===n.width&&o.css("width","")},findBestHint:function(){var t=this.el.val().toLowerCase(),n=null;t&&(e.each(this.suggestions,function(e,o){var s=0===o.value.toLowerCase().indexOf(t);return s&&(n=o),!s}),this.signalHint(n))},signalHint:function(t){var n="",o=this;t&&(n=o.currentValue+t.value.substr(o.currentValue.length)),o.hintValue!==n&&(o.hintValue=n,o.hint=t,(this.options.onHint||e.noop)(n))},verifySuggestionsFormat:function(t){return t.length&&"string"==typeof t[0]?e.map(t,function(e){return{value:e,data:null}}):t},validateOrientation:function(t,n){return t=e.trim(t||"").toLowerCase(),-1===e.inArray(t,["auto","bottom","top"])&&(t=n),t},processResponse:function(e,t,n){var o=this,s=o.options;e.suggestions=o.verifySuggestionsFormat(e.suggestions),s.noCache||(o.cachedResponse[n]=e,s.preventBadQueries&&!e.suggestions.length&&o.badQueries.push(t)),t===o.getQuery(o.currentValue)&&(o.suggestions=e.suggestions,o.suggest())},activate:function(t){var n,o=this,s=o.classes.selected,i=e(o.suggestionsContainer),a=i.find("."+o.classes.suggestion);return i.find("."+s).removeClass(s),o.selectedIndex=t,-1!==o.selectedIndex&&a.length>o.selectedIndex?(n=a.get(o.selectedIndex),e(n).addClass(s),n):null},selectHint:function(){var t=e.inArray(this.hint,this.suggestions);this.select(t)},select:function(e){this.hide(),this.onSelect(e)},moveUp:function(){var t=this;if(-1!==t.selectedIndex)return 0===t.selectedIndex?(e(t.suggestionsContainer).children().first().removeClass(t.classes.selected),t.selectedIndex=-1,t.el.val(t.currentValue),void t.findBestHint()):void t.adjustScroll(t.selectedIndex-1)},moveDown:function(){this.selectedIndex!==this.suggestions.length-1&&this.adjustScroll(this.selectedIndex+1)},adjustScroll:function(t){var n=this,o=n.activate(t);if(o){var s,i,a,u=e(o).outerHeight();s=o.offsetTop,a=(i=e(n.suggestionsContainer).scrollTop())+n.options.maxHeight-u,s<i?e(n.suggestionsContainer).scrollTop(s):s>a&&e(n.suggestionsContainer).scrollTop(s-n.options.maxHeight+u),n.options.preserveInput||n.el.val(n.getValue(n.suggestions[t].value)),n.signalHint(null)}},onSelect:function(t){var n=this,o=n.options.onSelect,s=n.suggestions[t];n.currentValue=n.getValue(s.value),n.currentValue===n.el.val()||n.options.preserveInput||n.el.val(n.currentValue),n.signalHint(null),n.suggestions=[],n.selection=s,e.isFunction(o)&&o.call(n.element,s)},getValue:function(e){var t,n,o=this.options.delimiter;return o?1===(n=(t=this.currentValue).split(o)).length?e:t.substr(0,t.length-n[n.length-1].length)+e:e},dispose:function(){this.el.off(".autocomplete").removeData("autocomplete"),e(window).off("resize.autocomplete",this.fixPositionCapture),e(this.suggestionsContainer).remove()}},e.fn.devbridgeAutocomplete=function(t,n){var o="autocomplete";return arguments.length?this.each(function(){var s=e(this),i=s.data(o);"string"==typeof t?i&&"function"==typeof i[t]&&i[t](n):(i&&i.dispose&&i.dispose(),i=new l(this,t),s.data(o,i))}):this.first().data(o)},e.fn.autocomplete||(e.fn.autocomplete=e.fn.devbridgeAutocomplete)});
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(window.jQuery||window.Zepto)}(function(e){var t,n,i,o,r,a,s="Close",l="BeforeClose",c="MarkupParse",d="Open",p="Change",u="mfp",f="."+u,m="mfp-ready",g="mfp-removing",h="mfp-prevent-close",v=function(){},y=!!window.jQuery,C=e(window),w=function(e,n){t.ev.on(u+e+f,n)},b=function(t,n,i,o){var r=document.createElement("div");return r.className="mfp-"+t,i&&(r.innerHTML=i),o?n&&n.appendChild(r):(r=e(r),n&&r.appendTo(n)),r},I=function(n,i){t.ev.triggerHandler(u+n,i),t.st.callbacks&&(n=n.charAt(0).toLowerCase()+n.slice(1),t.st.callbacks[n]&&t.st.callbacks[n].apply(t,e.isArray(i)?i:[i]))},x=function(n){return n===a&&t.currTemplate.closeBtn||(t.currTemplate.closeBtn=e(t.st.closeMarkup.replace("%title%",t.st.tClose)),a=n),t.currTemplate.closeBtn},k=function(){e.magnificPopup.instance||((t=new v).init(),e.magnificPopup.instance=t)};v.prototype={constructor:v,init:function(){var n=navigator.appVersion;t.isLowIE=t.isIE8=document.all&&!document.addEventListener,t.isAndroid=/android/gi.test(n),t.isIOS=/iphone|ipad|ipod/gi.test(n),t.supportsTransition=function(){var e=document.createElement("p").style,t=["ms","O","Moz","Webkit"];if(void 0!==e.transition)return!0;for(;t.length;)if(t.pop()+"Transition"in e)return!0;return!1}(),t.probablyMobile=t.isAndroid||t.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),i=e(document),t.popupsCache={}},open:function(n){var o;if(!1===n.isObj){t.items=n.items.toArray(),t.index=0;var a,s=n.items;for(o=0;o<s.length;o++)if((a=s[o]).parsed&&(a=a.el[0]),a===n.el[0]){t.index=o;break}}else t.items=e.isArray(n.items)?n.items:[n.items],t.index=n.index||0;if(!t.isOpen){t.types=[],r="",n.mainEl&&n.mainEl.length?t.ev=n.mainEl.eq(0):t.ev=i,n.key?(t.popupsCache[n.key]||(t.popupsCache[n.key]={}),t.currTemplate=t.popupsCache[n.key]):t.currTemplate={},t.st=e.extend(!0,{},e.magnificPopup.defaults,n),t.fixedContentPos="auto"===t.st.fixedContentPos?!t.probablyMobile:t.st.fixedContentPos,t.st.modal&&(t.st.closeOnContentClick=!1,t.st.closeOnBgClick=!1,t.st.showCloseBtn=!1,t.st.enableEscapeKey=!1),t.bgOverlay||(t.bgOverlay=b("bg").on("click"+f,function(){t.close()}),t.wrap=b("wrap").attr("tabindex",-1).on("click"+f,function(e){t._checkIfClose(e.target)&&t.close()}),t.container=b("container",t.wrap)),t.contentContainer=b("content"),t.st.preloader&&(t.preloader=b("preloader",t.container,t.st.tLoading));var l=e.magnificPopup.modules;for(o=0;o<l.length;o++){var p=l[o];p=p.charAt(0).toUpperCase()+p.slice(1),t["init"+p].call(t)}I("BeforeOpen"),t.st.showCloseBtn&&(t.st.closeBtnInside?(w(c,function(e,t,n,i){n.close_replaceWith=x(i.type)}),r+=" mfp-close-btn-in"):t.wrap.append(x())),t.st.alignTop&&(r+=" mfp-align-top"),t.fixedContentPos?t.wrap.css({overflow:t.st.overflowY,overflowX:"hidden",overflowY:t.st.overflowY}):t.wrap.css({top:C.scrollTop(),position:"absolute"}),(!1===t.st.fixedBgPos||"auto"===t.st.fixedBgPos&&!t.fixedContentPos)&&t.bgOverlay.css({height:i.height(),position:"absolute"}),t.st.enableEscapeKey&&i.on("keyup"+f,function(e){27===e.keyCode&&t.close()}),C.on("resize"+f,function(){t.updateSize()}),t.st.closeOnContentClick||(r+=" mfp-auto-cursor"),r&&t.wrap.addClass(r);var u=t.wH=C.height(),g={};if(t.fixedContentPos&&t._hasScrollBar(u)){var h=t._getScrollbarSize();h&&(g.marginRight=h)}t.fixedContentPos&&(t.isIE7?e("body, html").css("overflow","hidden"):g.overflow="hidden");var v=t.st.mainClass;return t.isIE7&&(v+=" mfp-ie7"),v&&t._addClassToMFP(v),t.updateItemHTML(),I("BuildControls"),e("html").css(g),t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo||e(document.body)),t._lastFocusedEl=document.activeElement,setTimeout(function(){t.content?(t._addClassToMFP(m),t._setFocus()):t.bgOverlay.addClass(m),i.on("focusin"+f,t._onFocusIn)},16),t.isOpen=!0,t.updateSize(u),I(d),n}t.updateItemHTML()},close:function(){t.isOpen&&(I(l),t.isOpen=!1,t.st.removalDelay&&!t.isLowIE&&t.supportsTransition?(t._addClassToMFP(g),setTimeout(function(){t._close()},t.st.removalDelay)):t._close())},_close:function(){I(s);var n=g+" "+m+" ";if(t.bgOverlay.detach(),t.wrap.detach(),t.container.empty(),t.st.mainClass&&(n+=t.st.mainClass+" "),t._removeClassFromMFP(n),t.fixedContentPos){var o={marginRight:""};t.isIE7?e("body, html").css("overflow",""):o.overflow="",e("html").css(o)}i.off("keyup.mfp focusin"+f),t.ev.off(f),t.wrap.attr("class","mfp-wrap").removeAttr("style"),t.bgOverlay.attr("class","mfp-bg"),t.container.attr("class","mfp-container"),!t.st.showCloseBtn||t.st.closeBtnInside&&!0!==t.currTemplate[t.currItem.type]||t.currTemplate.closeBtn&&t.currTemplate.closeBtn.detach(),t.st.autoFocusLast&&t._lastFocusedEl&&e(t._lastFocusedEl).focus(),t.currItem=null,t.content=null,t.currTemplate=null,t.prevHeight=0,I("AfterClose")},updateSize:function(e){if(t.isIOS){var n=document.documentElement.clientWidth/window.innerWidth,i=window.innerHeight*n;t.wrap.css("height",i),t.wH=i}else t.wH=e||C.height();t.fixedContentPos||t.wrap.css("height",t.wH),I("Resize")},updateItemHTML:function(){var n=t.items[t.index];t.contentContainer.detach(),t.content&&t.content.detach(),n.parsed||(n=t.parseEl(t.index));var i=n.type;if(I("BeforeChange",[t.currItem?t.currItem.type:"",i]),t.currItem=n,!t.currTemplate[i]){var r=!!t.st[i]&&t.st[i].markup;I("FirstMarkupParse",r),t.currTemplate[i]=!r||e(r)}o&&o!==n.type&&t.container.removeClass("mfp-"+o+"-holder");var a=t["get"+i.charAt(0).toUpperCase()+i.slice(1)](n,t.currTemplate[i]);t.appendContent(a,i),n.preloaded=!0,I(p,n),o=n.type,t.container.prepend(t.contentContainer),I("AfterChange")},appendContent:function(e,n){t.content=e,e?t.st.showCloseBtn&&t.st.closeBtnInside&&!0===t.currTemplate[n]?t.content.find(".mfp-close").length||t.content.append(x()):t.content=e:t.content="",I("BeforeAppend"),t.container.addClass("mfp-"+n+"-holder"),t.contentContainer.append(t.content)},parseEl:function(n){var i,o=t.items[n];if(o.tagName?o={el:e(o)}:(i=o.type,o={data:o,src:o.src}),o.el){for(var r=t.types,a=0;a<r.length;a++)if(o.el.hasClass("mfp-"+r[a])){i=r[a];break}o.src=o.el.attr("data-mfp-src"),o.src||(o.src=o.el.attr("href"))}return o.type=i||t.st.type||"inline",o.index=n,o.parsed=!0,t.items[n]=o,I("ElementParse",o),t.items[n]},addGroup:function(e,n){var i=function(i){i.mfpEl=this,t._openClick(i,e,n)};n||(n={});var o="click.magnificPopup";n.mainEl=e,n.items?(n.isObj=!0,e.off(o).on(o,i)):(n.isObj=!1,n.delegate?e.off(o).on(o,n.delegate,i):(n.items=e,e.off(o).on(o,i)))},_openClick:function(n,i,o){if((void 0!==o.midClick?o.midClick:e.magnificPopup.defaults.midClick)||!(2===n.which||n.ctrlKey||n.metaKey||n.altKey||n.shiftKey)){var r=void 0!==o.disableOn?o.disableOn:e.magnificPopup.defaults.disableOn;if(r)if(e.isFunction(r)){if(!r.call(t))return!0}else if(C.width()<r)return!0;n.type&&(n.preventDefault(),t.isOpen&&n.stopPropagation()),o.el=e(n.mfpEl),o.delegate&&(o.items=i.find(o.delegate)),t.open(o)}},updateStatus:function(e,i){if(t.preloader){n!==e&&t.container.removeClass("mfp-s-"+n),i||"loading"!==e||(i=t.st.tLoading);var o={status:e,text:i};I("UpdateStatus",o),e=o.status,i=o.text,t.preloader.html(i),t.preloader.find("a").on("click",function(e){e.stopImmediatePropagation()}),t.container.addClass("mfp-s-"+e),n=e}},_checkIfClose:function(n){if(!e(n).hasClass(h)){var i=t.st.closeOnContentClick,o=t.st.closeOnBgClick;if(i&&o)return!0;if(!t.content||e(n).hasClass("mfp-close")||t.preloader&&n===t.preloader[0])return!0;if(n===t.content[0]||e.contains(t.content[0],n)){if(i)return!0}else if(o&&e.contains(document,n))return!0;return!1}},_addClassToMFP:function(e){t.bgOverlay.addClass(e),t.wrap.addClass(e)},_removeClassFromMFP:function(e){this.bgOverlay.removeClass(e),t.wrap.removeClass(e)},_hasScrollBar:function(e){return(t.isIE7?i.height():document.body.scrollHeight)>(e||C.height())},_setFocus:function(){(t.st.focus?t.content.find(t.st.focus).eq(0):t.wrap).focus()},_onFocusIn:function(n){if(n.target!==t.wrap[0]&&!e.contains(t.wrap[0],n.target))return t._setFocus(),!1},_parseMarkup:function(t,n,i){var o;i.data&&(n=e.extend(i.data,n)),I(c,[t,n,i]),e.each(n,function(n,i){if(void 0===i||!1===i)return!0;if((o=n.split("_")).length>1){var r=t.find(f+"-"+o[0]);if(r.length>0){var a=o[1];"replaceWith"===a?r[0]!==i[0]&&r.replaceWith(i):"img"===a?r.is("img")?r.attr("src",i):r.replaceWith(e("<img>").attr("src",i).attr("class",r.attr("class"))):r.attr(o[1],i)}}else t.find(f+"-"+n).html(i)})},_getScrollbarSize:function(){if(void 0===t.scrollbarSize){var e=document.createElement("div");e.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(e),t.scrollbarSize=e.offsetWidth-e.clientWidth,document.body.removeChild(e)}return t.scrollbarSize}},e.magnificPopup={instance:null,proto:v.prototype,modules:[],open:function(t,n){return k(),(t=t?e.extend(!0,{},t):{}).isObj=!0,t.index=n||0,this.instance.open(t)},close:function(){return e.magnificPopup.instance&&e.magnificPopup.instance.close()},registerModule:function(t,n){n.options&&(e.magnificPopup.defaults[t]=n.options),e.extend(this.proto,n.proto),this.modules.push(t)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},e.fn.magnificPopup=function(n){k();var i=e(this);if("string"==typeof n)if("open"===n){var o,r=y?i.data("magnificPopup"):i[0].magnificPopup,a=parseInt(arguments[1],10)||0;r.items?o=r.items[a]:(o=i,r.delegate&&(o=o.find(r.delegate)),o=o.eq(a)),t._openClick({mfpEl:o},i,r)}else t.isOpen&&t[n].apply(t,Array.prototype.slice.call(arguments,1));else n=e.extend(!0,{},n),y?i.data("magnificPopup",n):i[0].magnificPopup=n,t.addGroup(i,n);return i};var T,_,P,S="inline",E=function(){P&&(_.after(P.addClass(T)).detach(),P=null)};e.magnificPopup.registerModule(S,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){t.types.push(S),w(s+"."+S,function(){E()})},getInline:function(n,i){if(E(),n.src){var o=t.st.inline,r=e(n.src);if(r.length){var a=r[0].parentNode;a&&a.tagName&&(_||(T=o.hiddenClass,_=b(T),T="mfp-"+T),P=r.after(_).detach().removeClass(T)),t.updateStatus("ready")}else t.updateStatus("error",o.tNotFound),r=e("<div>");return n.inlineElement=r,r}return t.updateStatus("ready"),t._parseMarkup(i,{},n),i}}});var z,O="ajax",M=function(){z&&e(document.body).removeClass(z)},B=function(){M(),t.req&&t.req.abort()};e.magnificPopup.registerModule(O,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){t.types.push(O),z=t.st.ajax.cursor,w(s+"."+O,B),w("BeforeChange."+O,B)},getAjax:function(n){z&&e(document.body).addClass(z),t.updateStatus("loading");var i=e.extend({url:n.src,success:function(i,o,r){var a={data:i,xhr:r};I("ParseAjax",a),t.appendContent(e(a.data),O),n.finished=!0,M(),t._setFocus(),setTimeout(function(){t.wrap.addClass(m)},16),t.updateStatus("ready"),I("AjaxContentAdded")},error:function(){M(),n.finished=n.loadError=!0,t.updateStatus("error",t.st.ajax.tError.replace("%url%",n.src))}},t.st.ajax.settings);return t.req=e.ajax(i),""}}});var L;e.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure onclick="return false;"><span class="mfp-progress-line"><span></span></span><div class="mfp-img hren"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var n=t.st.image,i=".image";t.types.push("image"),w(d+i,function(){"image"===t.currItem.type&&n.cursor&&e(document.body).addClass(n.cursor)}),w(s+i,function(){n.cursor&&e(document.body).removeClass(n.cursor),C.off("resize"+f)}),w("Resize"+i,t.resizeImage),t.isLowIE&&w("AfterChange",t.resizeImage)},resizeImage:function(){var e=t.currItem;if(e&&e.img&&t.st.image.verticalFit){var n=0;t.isLowIE&&(n=parseInt(e.img.css("padding-top"),10)+parseInt(e.img.css("padding-bottom"),10)),e.img.css("max-height",t.wH-n)}},_onImageHasSize:function(e){e.img&&(e.hasSize=!0,L&&clearInterval(L),e.isCheckingImgSize=!1,I("ImageHasSize",e),e.imgHidden&&(t.content&&t.content.removeClass("mfp-loading"),e.imgHidden=!1))},findImageSize:function(e){var n=0,i=e.img[0],o=function(r){L&&clearInterval(L),L=setInterval(function(){i.naturalWidth>0?t._onImageHasSize(e):(n>200&&clearInterval(L),3===++n?o(10):40===n?o(50):100===n&&o(500))},r)};o(1)},getImage:function(n,i){var o=0,r=function(){n&&(n.img[0].complete?(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("ready")),n.hasSize=!0,n.loaded=!0,I("ImageLoadComplete")):++o<200?setTimeout(r,100):a())},a=function(){n&&(n.img.off(".mfploader"),n===t.currItem&&(t._onImageHasSize(n),t.updateStatus("error",s.tError.replace("%url%",n.src))),n.hasSize=!0,n.loaded=!0,n.loadError=!0)},s=t.st.image,l=i.find(".mfp-img");if(l.length){var c=document.createElement("img");c.className="mfp-img",n.el&&n.el.find("img").length&&(c.alt=n.el.find("img").attr("alt")),n.img=e(c).on("load.mfploader",r).on("error.mfploader",a),c.src=n.src,l.is("img")&&(n.img=n.img.clone()),(c=n.img[0]).naturalWidth>0?n.hasSize=!0:c.width||(n.hasSize=!1)}return t._parseMarkup(i,{title:function(n){if(n.data&&void 0!==n.data.title)return n.data.title;var i=t.st.image.titleSrc;if(i){if(e.isFunction(i))return i.call(t,n);if(n.el)return n.el.attr(i)||""}return""}(n),img_replaceWith:n.img},n),t.resizeImage(),n.hasSize?(L&&clearInterval(L),n.loadError?(i.addClass("mfp-loading"),t.updateStatus("error",s.tError.replace("%url%",n.src))):(i.removeClass("mfp-loading"),t.updateStatus("ready")),i):(t.updateStatus("loading"),n.loading=!0,n.hasSize||(n.imgHidden=!0,i.addClass("mfp-loading"),t.findImageSize(n)),i)}}});var H;e.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(e){return e.is("img")?e:e.find("img")}},proto:{initZoom:function(){var e,n=t.st.zoom,i=".zoom";if(n.enabled&&t.supportsTransition){var o,r,a=n.duration,c=function(e){var t=e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),i="all "+n.duration/1e3+"s "+n.easing,o={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},r="transition";return o["-webkit-"+r]=o["-moz-"+r]=o["-o-"+r]=o[r]=i,t.css(o),t},d=function(){t.content.css("visibility","visible")};w("BuildControls"+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.content.css("visibility","hidden"),!(e=t._getItemToZoom()))return void d();(r=c(e)).css(t._getOffset()),t.wrap.append(r),o=setTimeout(function(){r.css(t._getOffset(!0)),o=setTimeout(function(){d(),setTimeout(function(){r.remove(),e=r=null,I("ZoomAnimationEnded")},16)},a)},16)}}),w(l+i,function(){if(t._allowZoom()){if(clearTimeout(o),t.st.removalDelay=a,!e){if(!(e=t._getItemToZoom()))return;r=c(e)}r.css(t._getOffset(!0)),t.wrap.append(r),t.content.css("visibility","hidden"),setTimeout(function(){r.css(t._getOffset())},16)}}),w(s+i,function(){t._allowZoom()&&(d(),r&&r.remove(),e=null)})}},_allowZoom:function(){return"image"===t.currItem.type},_getItemToZoom:function(){return!!t.currItem.hasSize&&t.currItem.img},_getOffset:function(n){var i,o=(i=n?t.currItem.img:t.st.zoom.opener(t.currItem.el||t.currItem)).offset(),r=parseInt(i.css("padding-top"),10),a=parseInt(i.css("padding-bottom"),10);o.top-=e(window).scrollTop()-r;var s={width:i.width(),height:(y?i.innerHeight():i[0].offsetHeight)-a-r};return void 0===H&&(H=void 0!==document.createElement("p").style.MozTransform),H?s["-moz-transform"]=s.transform="translate("+o.left+"px,"+o.top+"px)":(s.left=o.left,s.top=o.top),s}}});var A="iframe",F=function(e){if(t.currTemplate[A]){var n=t.currTemplate[A].find("iframe");n.length&&(e||(n[0].src="//about:blank"),t.isIE8&&n.css("display",e?"block":"none"))}};e.magnificPopup.registerModule(A,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){t.types.push(A),w("BeforeChange",function(e,t,n){t!==n&&(t===A?F():n===A&&F(!0))}),w(s+"."+A,function(){F()})},getIframe:function(n,i){var o=n.src,r=t.st.iframe;e.each(r.patterns,function(){if(o.indexOf(this.index)>-1)return this.id&&(o="string"==typeof this.id?o.substr(o.lastIndexOf(this.id)+this.id.length,o.length):this.id.call(this,o)),o=this.src.replace("%id%",o),!1});var a={};return r.srcAction&&(a[r.srcAction]=o),t._parseMarkup(i,a,n),t.updateStatus("ready"),i}}});var j=function(e){var n=t.items.length;return e>n-1?e-n:e<0?n+e:e},W=function(e,t,n){return e.replace(/%curr%/gi,t+1).replace(/%total%/gi,n)};e.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var n=t.st.gallery,o=".mfp-gallery";if(t.direction=!0,!n||!n.enabled)return!1;r+=" mfp-gallery",w(d+o,function(){n.navigateByImgClick&&t.wrap.on("click"+o,".mfp-img",function(){if(t.items.length>1)return t.next(),!1}),i.on("keydown"+o,function(e){37===e.keyCode?t.prev():39===e.keyCode&&t.next()})}),w("UpdateStatus"+o,function(e,n){n.text&&(n.text=W(n.text,t.currItem.index,t.items.length))}),w(c+o,function(e,i,o,r){var a=t.items.length;o.counter=a>1?W(n.tCounter,r.index,a):""}),w("BuildControls"+o,function(){if(t.items.length>1&&n.arrows&&!t.arrowLeft){var i=n.arrowMarkup,o=t.arrowLeft=e(i.replace(/%title%/gi,n.tPrev).replace(/%dir%/gi,"left")).addClass(h),r=t.arrowRight=e(i.replace(/%title%/gi,n.tNext).replace(/%dir%/gi,"right")).addClass(h);o.click(function(){t.prev()}),r.click(function(){t.next()}),t.container.append(o.add(r))}}),w(p+o,function(){t._preloadTimeout&&clearTimeout(t._preloadTimeout),t._preloadTimeout=setTimeout(function(){t.preloadNearbyImages(),t._preloadTimeout=null},16)}),w(s+o,function(){i.off(o),t.wrap.off("click"+o),t.arrowRight=t.arrowLeft=null})},next:function(e){t.direction=!0,t.index=j(t.index+1),t.updateItemHTML(),1==e&&Wo_StoryProgress()},prev:function(){t.index=j(t.index-1),t.updateItemHTML()},goTo:function(e){t.direction=e>=t.index,t.index=e,t.updateItemHTML()},preloadNearbyImages:function(){var e,n=t.st.gallery.preload,i=Math.min(n[0],t.items.length),o=Math.min(n[1],t.items.length);for(e=1;e<=(t.direction?o:i);e++)t._preloadItem(t.index+e);for(e=1;e<=(t.direction?i:o);e++)t._preloadItem(t.index-e)},_preloadItem:function(n){if(n=j(n),!t.items[n].preloaded){var i=t.items[n];i.parsed||(i=t.parseEl(n)),I("LazyLoad",i),"image"===i.type&&(i.img=e('<img class="mfp-img"/>').on("load.mfploader",function(){i.hasSize=!0}).on("error.mfploader",function(){i.hasSize=!0,i.loadError=!0,I("LazyLoadError",i)}).attr("src",i.src)),i.preloaded=!0}}}});var N="retina";e.magnificPopup.registerModule(N,{options:{replaceSrc:function(e){return e.src.replace(/\.\w+$/,function(e){return"@2x"+e})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var e=t.st.retina,n=e.ratio;(n=isNaN(n)?n():n)>1&&(w("ImageHasSize."+N,function(e,t){t.img.css({"max-width":t.img[0].naturalWidth/n,width:"100%"})}),w("ElementParse."+N,function(t,i){i.src=e.replaceSrc(i,n)}))}}}}),k()});
!function(t){t.rcrop={settings:{full:!1,minSize:[20,20],maxSize:[null,null],preserveAspectRatio:!1,inputs:!0,inputsPrefix:"",grid:!1,preview:{display:!1,size:[50,50],wrapper:""}}},ResponsiveCrop=function(e,i){var r=this,a="rcrop-",o={x:0,y:0,width:0,height:0};this.el=e instanceof t?e:t(e),this.image={instance:null,width:0,height:0},this.wrapper=t("<div>",{class:"rcrop-wrapper"}),this.cropArea=t("<div>",{class:"rcrop-croparea"}),this.cropData={width:0,height:0,x:0,y:0},this.outer={wrapper:t("<div>",{class:"rcrop-outer-wrapper"}),left:t("<div>",{class:"rcrop-outer rcrop-outer-left"}),right:t("<div>",{class:"rcrop-outer rcrop-outer-right"}),top:t("<div>",{class:"rcrop-outer rcrop-outer-top"}),bottom:t("<div>",{class:"rcrop-outer rcrop-outer-bottom"})},this.cropAspectRatio,this.preview=null,this.clayfy,this.settings=t.extend(!0,{},t.rcrop.settings,i);var n=function(){if(r.wrapper.insertAfter(r.el),r.wrapper.append(r.el),r.wrapper.append(r.outer.wrapper),r.outer.wrapper.append(r.outer.left,r.outer.right,r.outer.top,r.outer.bottom),r.wrapper.append(r.cropArea),r.cropArea.append('<div class="rcrop-croparea-inner">'),r.settings.grid){var e='<div class="rcrop-grid-line"></div>';r.cropArea.append('<div class="rcrop-grid">'+e+e+"</div>")}if(p(),r.settings.inputs){var i=0!=r.settings.inputsPrefix?r.settings.inputsPrefix+"-":"",a=["x","y","width","height"];t.each(a,function(t,e){r.wrapper.append('<input type="hidden" name="'+i+e+'[]">')})}},p=function(){var e=t('<div class="rcrop-handler-wrapper"></div>');isTouchDevice()?e.append('<div class="rcrop-handler-bottom-right rcrop-handler-corner""></div>'):(t.each(["top-left","top-right","bottom-left","bottom-right"],function(t,i){e.append('<div class="rcrop-handler-'+i+" "+a+'handler-corner""></div>')}),t.each(["top","right","bottom","left"],function(t,i){e.append('<div class="rcrop-handler-'+i+" "+a+'handler-border"></div>')})),r.cropArea.append(e)},c=function(){var t=r.cropArea.position();o={width:Math.round(r.cropArea.width()),height:Math.round(r.cropArea.height()),x:Math.round(t.left),y:Math.round(t.top)}},h=function(){var t=r.cropArea.position(),e=o.width!==Math.round(r.cropArea.width()),i=o.height!==Math.round(r.cropArea.height()),a=o.x!==Math.round(t.left),n=o.y!==Math.round(t.top);s(e,i,a,n)},s=function(e,i,a,o){if(!1!==e&&(r.cropData.width="number"==typeof e?e:z(r.clayfy.newSize.width),r.cropData.width=Math.max(r.cropData.width,r.settings.minSize[0]),r.settings.maxSize[0]&&(r.cropData.width=Math.min(r.cropData.width,r.settings.maxSize[0]))),!1!==i&&(r.cropData.height="number"==typeof i?i:z(r.clayfy.newSize.height),r.cropData.height=Math.max(r.cropData.height,r.settings.minSize[1]),r.settings.maxSize[1]&&(r.cropData.height=Math.min(r.cropData.height,r.settings.maxSize[1]))),(!1!==i||!1!==e)&&r.settings.preserveAspectRatio){var n={max:r.settings.maxSize[0]||r.image.width,min:r.settings.minSize[0]};r.cropData.height*r.cropAspectRatio>n.max||r.cropData.height*r.cropAspectRatio<n.min?r.cropData.height=Math.round(r.cropData.width/r.cropAspectRatio):r.cropData.width=Math.round(r.cropData.height*r.cropAspectRatio)}!1!==a&&(r.cropData.x="number"==typeof a?a:z(r.clayfy.newSize.left),r.cropData.x+r.cropData.width>r.image.width&&(r.cropData.x=r.image.width-r.cropData.width)),!1!==o&&(r.cropData.y="number"==typeof o?o:z(r.clayfy.newSize.top),r.cropData.y+r.cropData.height>r.image.height&&(r.cropData.y=r.image.height-r.cropData.height)),r.settings.inputs&&t.each(["width","height","x","y"],function(t,e){r.wrapper.find('[name$="'+e+'[]"]').val(r.cropData[e])}),r.settings.preview.display&&w()},g=function(){var t=r.el[0].getBoundingClientRect(),e=t.width,i=t.height,a=r.clayfy.newSize,o={width:a.width,height:a.height,top:a.top,left:a.left};r.cropArea.css({width:o.width/e*100+"%",height:o.height/i*100+"%",top:o.top/i*100+"%",left:o.left/e*100+"%"}),r.outer.left.width(o.left/e*100+"%"),r.outer.top.height(o.top/i*100+"%"),r.outer.bottom.css({top:(o.top+o.height)/i*100+"%"}),r.outer.right.css({left:(o.left+o.width)/e*100+"%"})},d=function(){var t=r.clayfy.newSize;r.outer.left.width(t.left),r.outer.top.height(t.top),r.outer.bottom.css({top:t.top+t.outerHeight}),r.outer.right.css({left:t.left+t.outerWidth})},l=function(){var t=r.settings,e=r.clayfy.settings;e.minSize=v(t.minSize),e.maxSize=v(t.maxSize),r.clayfy.draggable.setBounderies()},f=function(){var t=r.settings;r.cropArea.clayfy({type:"resizable",container:r.wrapper,preserveAspectRatio:t.preserveAspectRatio,minSize:v(t.minSize),maxSize:v(t.maxSize)}),r.clayfy=r.cropArea.clayfy("instance"),r.clayfy.originalSize.width=r.settings.minSize[0],r.clayfy.originalSize.height=r.settings.minSize[1];var e=t.full?r.image.height:Math.max(.8*r.image.height,t.minSize[1]),i=t.full?r.image.width:Math.max(.8*r.image.width,t.minSize[0]);r.resize(i,e,"center","center"),r.cropArea.on("mousedown touchstart",l),r.cropArea.on("clayfy-resizestart clayfy-dragstart",c),r.cropArea.on("clayfy-resizeend clayfy-drop",h),r.cropArea.on("clayfy-resize clayfy-drag",d),r.settings.preview.display&&(r.cropArea.on("clayfy-resize clayfy-drag",w),r.cropArea.on("clayfy-cancel",w)),r.cropArea.on("clayfy-resizeend clayfy-drop",g),r.cropArea.on("clayfy-cancel",g),r.cropArea.on("clayfy-resizeend clayfy-drop",function(){r.el.trigger("rcrop-changed",[r])}),r.cropArea.on("clayfy-drag clayfy-resize",function(){r.el.trigger("rcrop-change",[r])})},u=function(){var t=r.settings.preview.size,e=[],i=r.clayfy?r.clayfy.newSize:{width:r.cropArea.width(),height:r.cropArea.height()};return"string"==typeof t[0]&&t[0].indexOf("%")>-1?e[0]=Number(t[0].replace("%",""))/100*i.width:e[0]=t[0],"string"==typeof t[1]&&t[1].indexOf("%")>-1?e[1]=Number(t[1].replace("%",""))/100*i.height:e[1]=t[1],e},y=function(){var e=r.settings.preview.wrapper;e&&(e=e instanceof t?e:t(e)),e&&e.length||(e=t("<div>",{class:"rcrop-preview-wrapper"}),r.wrapper.after(e));var i=u();r.preview=t('<canvas width="'+i[0]+'" height="'+i[1]+'"></canvas>'),r.preview.appendTo(e)},w=function(t){var e=r.cropData;t&&(e=z({width:r.clayfy.newSize.width,height:r.clayfy.newSize.height,x:r.clayfy.newSize.left,y:r.clayfy.newSize.top}));var i=u();r.preview.attr({width:i[0],height:i[1]}),r.preview[0].getContext("2d").drawImage(r.image.instance,e.x,e.y,e.width,e.height,0,0,i[0],i[1])},m=function(t,e){if("object"==typeof t){var i=t instanceof Array?[]:{};for(var r in t)i[r]="number"!=typeof t[r]?null:Math.round(t[r]*e);return i}return Math.round(t*e)},v=function(t){return m(t,r.el.width()/r.image.width)},z=function(t){return m(t,r.image.width/r.el.width())};this.getValues=function(){return{width:r.cropData.width,height:r.cropData.height,y:r.cropData.y,x:r.cropData.x}},this.getRealSize=function(t){var e=new Image;e.onload=function(){return r.image.width=this.width,r.image.height=this.height,"function"==typeof t&&t(),{width:r.image.width,height:r.image.height}},e.onerror=function(){return{width:null,height:null}},e.src=r.el.attr("src"),r.image.instance=e},this.getDataURL=function(e,i){e=e||r.cropData.width,i=i||r.cropData.height;var a=t('<canvas width="'+e+'" height="'+i+'"></canvas>');return a[0].getContext("2d").drawImage(r.image.instance,r.cropData.x,r.cropData.y,r.cropData.width,r.cropData.height,0,0,e,i),a[0].toDataURL()},this.resize=function(t,e,i,a){var o,n,p,c,h=r.settings;t=h.maxSize[0]?Math.min(t,r.image.width,h.maxSize[0]):Math.min(t,r.image.width),e=h.maxSize[1]?Math.min(e,r.image.height,h.maxSize[1]):Math.min(e,r.image.height),t=h.minSize[0]?Math.max(t,h.minSize[0]):t,e=h.minSize[1]?Math.max(e,h.minSize[1]):e,h.preserveAspectRatio&&(t/e>r.cropAspectRatio?t=e*r.cropAspectRatio:e=t/r.cropAspectRatio),t=Math.round(t),e=Math.round(e),o=v(t),n=v(e),(a=void 0===a?r.cropArea.position().top:"center"===a?Math.round((r.image.height-e)/2):Math.round(a))+e>r.image.height&&(a=r.image.height-e),c=v(a),(i=void 0===i?r.cropData.x?z(r.cropArea.position().left):r.cropData.x:"center"===i?Math.round((r.image.width-t)/2):Math.round(i))+t>r.image.width&&(i=r.image.width-t),p=v(i),r.cropArea.css({width:o,height:n,top:c,left:p}),r.clayfy.newSize=r.clayfy.getNewSize(),s(t,e,i,a),d(),g(),r.settings.preview.display&&w()},this.destroy=function(){var t=r.el;r.wrapper.replaceWith(t),t.attr("style","")},function(){r.cropAspectRatio=r.settings.minSize[0]/r.settings.minSize[1],n(),r.settings.preview.display&&y(),r.getRealSize(function(){f(),r.el.trigger("rcrop-ready")})}()};var e=ResponsiveCrop;t.fn.rcrop=function(i){var r=arguments;if(void 0===i||"object"==typeof i)return this.each(function(){t.data(this,"rcrop")||t.data(this,"rcrop",new e(this,i))});if("string"==typeof i&&"_"!==i[0]&&"init"!==i){if("instance"===i)return this.length?t.data(this[0],"rcrop"):null;if(-1!=t.inArray(i,t.fn.rcrop.getters)){var a=t.data(this[0],"rcrop");return a[i].apply(a,Array.prototype.slice.call(r,1))}return this.each(function(){var a=t.data(this,"rcrop");a instanceof e&&"function"==typeof a[i]&&a[i].apply(a,Array.prototype.slice.call(r,1))})}},t.fn.rcrop.getters=["getDataURL","getValues","getRealSize"]}(jQuery);
!function(){function e(e,i){function o(e){return e.el[0].scrollHeight-e.el.scrollTop()===e.innerHeight}function r(e){return e.el[0].scrollWidth-e.el.scrollLeft()===e.innerWidth}this.el=e instanceof $?e:$(e),this.draggableBox,this.x,this.y,this.dX,this.dY,this.diffDX,this.diffDY,this.history={dX:[0,0,0],dY:[0,0,0],diffDX:0,diffDY:0},this.actualPos,this.originalPos,this.initPos={y:0,x:0,scrollTop:null,scrollLeft:null},this.bounderies={},this.droppedTarget,this.scrollable=[],this.container={},this.tempContainer=$("<div>",{style:"position: absolute; top:0; left:0"}),this.droppable={dragElement:[],dropArea:[]},this.status="ready",this.settings=$.extend(!0,{},$.clayfy.settings,i);var a,n,s=this,l=!1,d=!0,g=$("<div>",{style:"height:100%;width:100%;position:fixed;top:0;left:0"});this.contentGhost;var p=function(){s.settings.ghost?(!0===s.settings.ghost?(s.draggableBox=s.el.clone(),s.draggableBox.addClass("clayfy-ghost-opacity")):(s.draggableBox=$("<div>",{margin:s.el.css("margin")}),s.contentGhost=$('<div class="clayfy-ghost-content" style="position:absolute"></div>'),s.draggableBox.append(s.contentGhost)),s.draggableBox.css({position:"absolute",width:"100%",height:"100%"}).addClass("clayfy-ghost")):s.draggableBox=s.el},f=function(e){var t=s.getPosition(s.el),i=s.settings.overflow?s.tempContainer:s.el.parent(),o=s.el.offset(),r=s.initPos.parent?s.initPos.parent.scrollTop():0,a=s.initPos.parent?s.initPos.parent.scrollLeft():0,n={width:s.el.width(),height:s.el.height(),top:t.y,left:t.x};if(!0!==s.settings.ghost&&(n={top:e.pageY-o.top+t.y+5-r,left:e.pageX-o.left+t.x+5-a,width:"auto",height:"auto"}),s.settings.overflow&&(n.top=o.top-r,n.left=o.left-a,!0!==s.settings.ghost&&(n.top=e.pageY-r+5,n.left=e.pageX-a+5)),s.draggableBox.css(n),s.draggableBox.appendTo(i),s.contentGhost){s.contentGhost.html("");var l;switch(typeof s.settings.ghost){case"string":l=s.settings.ghost;break;case"function":l=s.settings.ghost()}if(s.contentGhost.append(l),s.container.offset){var d=s.container.offset.innerBottom,g=s.container.offset.innerRight,p=s.draggableBox.offset(),f=p.top+s.contentGhost.outerHeight()-d,c=p.left+s.contentGhost.outerWidth()-g;f>0&&s.draggableBox.css({top:e.pageY-o.top+t.y+5-f}),c>0&&s.draggableBox.css({left:e.pageX-o.left+t.x+5-c})}}},c=function(e){if("canceling"!==s.status&&s.settings.move){var t=s.getPosition(),i=s.draggableBox.offset();s.contentGhost?s.contentGhost:s.draggableBox;if(s.container.offset){var o=s.container.offset.innerBottom,r=s.container.offset.innerRight;i.top>=o-s.el.outerHeight()&&(t.y+=o-s.el.outerHeight()-i.top),i.left>=r-s.el.outerWidth()&&(t.x+=r-s.el.outerWidth()-i.left)}if(s.el.css({top:t.y,left:t.x}),"clayfy-dropinside"===e.type){var o=e.area.offset.innerBottom,r=e.area.offset.innerRight;i.top>=o-s.el.outerHeight()&&(t.y+=o-s.el.outerHeight()-i.top),i.left>=r-s.el.outerWidth()&&(t.x+=r-s.el.outerWidth()-i.left),s.el.css({top:t.y,left:t.x})}}s.draggableBox.detach()},h=function(){var e=s.settings.container;e instanceof t?s.container=e:s.settings.container&&(s.container=new t(s.el,e))},y=function(e){27===e.keyCode&&s.cancel(e)};this.cancel=function(e){s.status="canceling",s.draggableBox.animate({top:s.initPos.y,left:s.initPos.x},100,function(){s.draggableBox.trigger("mouseup"),s.status="ready"}),null!==s.initPos.scrollTop&&s.initPos.parent.animate({scrollTop:s.initPos.scrollTop},100),null!==s.initPos.scrollLeft&&s.initPos.parent.animate({scrollLeft:s.initPos.scrollLeft},100)},s.scrollables=[];var u,b,v,m,x=function(){$(s.settings.scrollable).each(function(){var e=$(this);if(!e.length)return!0;var t=w(e);if(!t.x&&!t.y)return!0;var i=e[0].getBoundingClientRect(),o=z(e),r=parseInt(e.css("border-top-width")),a=parseInt(e.css("border-left-width")),n={el:e,top:i.top+r,bottom:i.top+o.innerHeight+r,left:i.left+a,right:i.left+o.innerWidth+a,innerHeight:o.innerHeight,innerWidth:o.innerWidth,interval:{top:!1,bottom:!1,left:!1,right:!1},isParent:!s.settings.overflow&&s.el.offsetParent().is(e),isBody:e.is("body")};if(n.isBody){var l=$(window);n.top=0,n.left=0,n.bottom=l.height(),n.right=l.width(),n.innerHeight=l.height(),n.innerWidth=l.width()}s.scrollables.push(n)})},w=function(e){var t=!1,i=!1,o=$(window),r=$("body");return e.is("body")?(r.height()>o.height()&&(i=!0),r.width()>o.width()&&(t=!0)):(e[0].scrollHeight>e.height()&&(i=!0),e[0].scrollWidth>e.width()&&(t=!0)),{x:t,y:i}},z=function(e){var t,i,o,r,a,n,s,l=e instanceof $?e:$(e);return l.length?(t=l[0].style.position,"static"===l.css("position")&&l.css({position:"relative"}),o=$("<div>",{style:"position:absolute;top:0;left:0;bottom:0;right:0"}),i=$("<div>",{style:"position:absolute;top:0;left:0;width:100%;height:100%"}),o.append(i),l.append(o),r=i.width(),a=i.height(),n=parseInt(i.css("border-top-width")),s=parseInt(i.css("border-left-width")),o.remove(),l[0].style.position=t,{innerWidth:r,innerHeight:a,innerOffset:{top:n,left:s,bottom:a+n,right:r+s}}):{width:0,height:0}},B=function(e){var t=s.contentGhost?s.contentGhost:s.draggableBox,i=s.draggableBox[0].getBoundingClientRect(),a=t.offset(),n={top:i.top,bottom:i.top+t.outerHeight(),left:i.left,right:i.left+t.outerWidth(),x:0,y:0};n.x=(n.right-n.left)/2+n.left,n.y=(n.bottom-n.top)/2+n.top,s.history.diffDY>0&&u&&(u=!1,s.y=Math.min(a.top+t.outerHeight(),e.pageY)),s.history.diffDY<0&&b&&(b=!1,s.y=Math.max(a.top,e.pageY)),s.history.diffDX>0&&m&&(m=!1,s.x=Math.min(a.left+t.outerWidth(),e.pageX)),s.history.diffDX<0&&v&&(v=!1,s.x=Math.max(a.left,e.pageX));for(var l=0,d=s.scrollables.length;l<d;l++){var g=s.scrollables[l],p=0,f={top:n.top-g.top,bottom:g.bottom-n.bottom,left:n.left-g.left,right:g.right-n.right,x:n.x<g.right&&n.x>g.left,y:n.y<g.bottom&&n.y>g.top};if(!o(g)&&f.bottom<6&&(f.bottom>-6||g.isBody)&&f.x?(P(e,g,"bottom"),D(g,"top"),p++):(D(g,"bottom"),g.el.scrollTop()&&f.top<6&&(f.top>-6||g.isBody)&&f.x?(P(e,g,"top"),p++):D(g,"top")),g.el.scrollLeft()&&f.left<6&&(f.left>-6||g.isBody)&&f.y?(P(e,g,"left"),D(g,"right"),p++):(D(g,"left"),!r(g)&&f.right<6&&(f.right>-6||g.isBody)&&f.y?(P(e,g,"right"),p++):D(g,"right")),p)break}},P=function(e,t,i){t.interval[i]&&clearInterval(t.interval[i]);var o=function(e){};switch(i){case"bottom":o=function(i){i=i||10,t.el.scrollTop(t.el.scrollTop()+i),t.isParent&&(s.x=e.pageX,s.setBounderies(),s.updateDropArea(),u=!0)};break;case"top":o=function(i){i=i||10,t.el.scrollTop(t.el.scrollTop()-i),t.isParent&&(s.x=e.pageX,s.setBounderies(),s.updateDropArea(),b=!0)};break;case"left":o=function(i){i=i||10,t.el.scrollLeft(t.el.scrollLeft()-i),t.isParent&&(s.y=e.pageY,s.setBounderies(),s.updateDropArea(),v=!0)};break;case"right":o=function(i){i=i||10,t.el.scrollLeft(t.el.scrollLeft()+i),t.isParent&&(s.y=e.pageY,s.setBounderies(),s.updateDropArea(),m=!0)}}o(3),t.isParent||(t.interval[i]=setInterval(o,50))},D=function(e,t){if(t)e.interval[t]&&(clearInterval(e.interval[t]),e.interval[t]=!1);else for(var i in s.scrollables){var o=s.scrollables[i].interval;for(var r in o)o[r]&&(clearInterval(o[r]),o[r]=!1)}};this.appendTo=function(e,t){if(t=t||s.el,(e=e instanceof $?e:$(e)).length){var i=t.offset(),o=e.offset(),r={top:i.top-o.top-parseInt(e.css("border-top-width"))+e.scrollTop(),left:i.left-o.left-parseInt(e.css("border-left-width"))+e.scrollLeft()};"static"===e.css("position")&&e.css("position","relative"),t.appendTo(e).css(r)}};var S=function(){s.el.on("clayfy-dragstart",s.updateDragElement),s.el.on("clayfy-dragstart",s.updateDropArea),s.el.on("clayfy-drag",H),s.el.on("clayfy-drop",W),s.settings.ghost&&(s.el.on("clayfy-dropinside",c),s.el.on("clayfy-dropoutside",c)),s.el.on("clayfy-dragstart",function(){X()||(s.el.removeClass("clayfy-dropinside"),s.draggableBox.removeClass("clayfy-dropinside"))}),s.el.on("clayfy-dragenter",function(e){s.el.addClass("clayfy-dragenter"),s.draggableBox.addClass("clayfy-dragenter"),e.droparea.addClass("clayfy-dragenter"),s.el[0].id&&e.droparea.addClass("clayfy-dragenter-"+s.el[0].id)}),s.el.on("clayfy-dragleave",function(e){s.el.removeClass("clayfy-dropinside"),s.draggableBox.removeClass("clayfy-dropinside"),e.droparea.removeClass("clayfy-dropinside"),s.el[0].id&&e.droparea.removeClass("clayfy-dropinside-"+s.el[0].id)}),s.el.on("clayfy-dragleave clayfy-drop",function(e){s.el.removeClass("clayfy-dragenter"),s.draggableBox.removeClass("clayfy-dragenter"),$(".clayfy-dragenter").removeClass("clayfy-dragenter"),s.el[0].id&&$(".clayfy-dragenter-"+s.el[0].id).removeClass("clayfy-dragenter-"+s.el[0].id)}),s.el.on("clayfy-dropinside",function(e){s.el.addClass("clayfy-dropinside"),s.draggableBox.addClass("clayfy-dropinside"),e.droparea.addClass("clayfy-dropinside"),s.el[0].id&&e.droparea.addClass("clayfy-dropinside-"+s.el[0].id),s.settings.migrate&&s.appendTo(e.droparea)})};this.updateDropArea=function(e){s.droppable.dropArea=[];var t=s.settings.droppable instanceof $?s.settings.droppable:$(s.settings.droppable);s.addDroppable(t)},this.updateDragElement=function(){s.droppable.dragElement=[],s.droppable.dragElement={originalPos:s.getPosition(),id:s.el[0].id,originalDropArea:null,width:s.draggableBox.width(),height:s.draggableBox.height(),x:0,y:0};var e=s.droppable.dragElement;e.setCenter=function(){var t=s.draggableBox.offset();e.x=t.left+e.width/2,e.y=t.top+e.height/2},e.setCenter(),e.originalDropArea=X()},this.resetDroppable=function(e){e&&(s.settings.droppable=e),s.updateDragElement(),s.updateDropArea()},this.addDroppable=function(e){(e instanceof $?e:$(e)).each(function(){var e=$(this),t=e.offset(),i=e.outerHeight(),o=e.outerWidth(),r=parseInt(e.css("border-top-width")),a=parseInt(e.css("border-left-width")),n=$.clayfy.getInner(e);s.droppable.dropArea.push({el:e,id:this.id,left:t.left,top:t.top,width:o,height:i,innerWidth:n.innerWidth,innerHeight:n.innerHeight,offset:{innerTop:t.top+r,innerLeft:t.left+a,innerBottom:n.innerHeight+t.top+r,innerRight:n.innerWidth+t.left+a},right:t.left+o,bottom:t.top+i,active:!1,triggered:!1})})};var H=function(e){var t=s.droppable.dragElement;t.setCenter();for(var i=0,o=s.droppable.dropArea.length;i<o;i++){var r=s.droppable.dropArea[i];r&&(t.x>r.left&&t.x<r.right&&t.y>r.top&&t.y<r.bottom?r.active=!0:r.active=!1,!r.triggered&&r.active?(r.triggered=!0,s.el.trigger($.Event("clayfy-dragenter",{target:r.el[0],droparea:r.el}))):r.triggered&&!r.active&&(r.triggered=!1,s.el.trigger($.Event("clayfy-dragleave",{target:r.el[0],droparea:r.el,area:r}))))}},X=function(){var e=s.droppable.dragElement;e.setCenter();for(var t=!1,i=0,o=s.droppable.dropArea.length;i<o;i++){var r=s.droppable.dropArea[i];r&&(e.x>r.left&&e.x<r.right&&e.y>r.top&&e.y<r.bottom&&(r.active=!0,r.triggered=!0,t=r))}return t},Y=function(e){var t=s.contentGhost?s.contentGhost:s.draggableBox,i={},o=s.el.offset(),r={top:o.top,left:o.left,right:s.droppable.dragElement.width+o.left,bottom:s.droppable.dragElement.height+o.top};t.outerWidth()<e.innerWidth&&(r.right>e.offset.innerRight&&(i.left=parseInt(t.css("left"))+e.offset.innerRight-r.right),r.left<e.offset.innerLeft&&(i.left=parseInt(t.css("left"))+e.offset.innerLeft-r.left)),t.outerHeight()<e.innerHeight&&(r.bottom>e.offset.innerBottom&&(i.top=parseInt(t.css("top"))+e.offset.innerBottom-r.bottom),r.top<e.offset.innerTop&&(i.top=parseInt(s.el.css("top"))+e.offset.innerTop-r.top)),s.el.css(i)},A=function(){var e=s.droppable.dragElement.originalDropArea;e&&s.el.trigger($.Event("clayfy-dropinside",{target:e.el[0],droparea:e.el})),s.settings.overflow&&!s.settings.ghost?s.el.css({left:s.initPos.x-s.initPos.parent.offset().left-parseInt(s.initPos.parent.css("border-left-width"))+s.initPos.scrollLeft,top:s.initPos.y-s.initPos.parent.offset().top-parseInt(s.initPos.parent.css("border-top-width"))+s.initPos.scrollTop}):s.el.css({left:s.initPos.x,top:s.initPos.y})},W=function(){for(var e,t=0,i=s.droppable.dropArea.length;t<i;t++)s.droppable.dropArea[t].active&&(e=s.droppable.dropArea[t]);if("canceling"===s.status){if(e&&(e.active=!1,e.triggered=!1,s.el.trigger($.Event("clayfy-dragleave",{target:e.el[0],droparea:e.el}))),!(e=s.droppable.dragElement.originalDropArea))return;e.active=!0,e.triggered=!0}e?(s.el.trigger($.Event("clayfy-dropinside",{target:e.el[0],droparea:e.el,area:e})),s.settings.fit&&Y(e)):(s.el.trigger("clayfy-dropoutside"),s.settings.dropoutside||A(),s.settings.dropoutside&&s.settings.migrate&&s.settings.overflow&&s.appendTo(s.tempContainer)),e&&(s.droppedTarget=e.el[0])},T=function(e){var t=e.pageX-s.el.offset().left,i=e.pageY-s.el.offset().top,o=$("<div>",{style:"position:absolute;left:0;top:0;width:100%;height:100%"});s.el.append(o);var r=o.width(),a=o.height();return o.remove(),!(t>r)&&!(i>a)},C=function(e){n.is(e.target)||s.el.has(e.target).length&&!s.settings.propagate||(isTouchDevice()||void 0===e.which||1===e.which)&&(e.preventDefault(),T(e)&&(s.settings.coverScreen&&E(),l=!0,document.body.style.cursor=a,s.settings.dragstart.call(s,e),s.el.trigger("clayfy-dragstart"),$(document).on("mousemove touchmove",I).on("mouseup touchend",R)))},R=function(e){if(l){e.preventDefault(),l=!1,d=!0,document.body.style.cursor="",s.settings.overflow&&(s.appendTo(s.initPos.parent,s.draggableBox),s.appendTo(s.initPos.parent)),s.settings.coverScreen&&k(),s.settings.drop.call(s);var t=$.Event("clayfy-drop",{pageX:e.pageX,pageY:e.pageY,screenX:e.screenX,screenY:e.screenY});s.el.trigger(t),$(document).off("mousemove touchmove",I).off("mouseup touchend",R)}},I=function(e){if(l){if(e.preventDefault(),e.originalEvent.touches&&1==e.originalEvent.touches.length)var e=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0];if(d){d=!1;var t=s.el.parent();s.initPos.parent=t,s.settings.overflow&&s.appendTo(s.tempContainer,s.draggableBox),s.settings.ghost&&f(e),s.x=e.pageX,s.y=e.pageY,s.setBounderies();var i=s.getPosition(s.el);s.initPos={x:i.x,y:i.y,scrollLeft:t.scrollLeft(),scrollTop:t.scrollTop(),parent:t},s.history={dX:[0,0,0],dY:[0,0,0],diffDX:0,diffDY:0}}s.dX=e.pageX-s.x,s.dY=e.pageY-s.y,$.clayfy.dX=s.dX,$.clayfy.dY=s.dY,s.history.diffDX=(s.history.dX[0]+s.history.dX[1]-(s.history.dX[2]+s.dX))/2,s.history.diffDY=(s.history.dY[0]+s.history.dY[1]-(s.history.dY[2]+s.dY))/2,s.history.dX=[s.history.dX[1],s.history.dX[2],s.dX],s.history.dY=[s.history.dY[1],s.history.dY[2],s.dY],s.fixDeltasWithBounderies(),(s.settings.move||s.settings.ghost)&&s.move(),s.settings.drag.call(s,e);var o=$.Event("clayfy-drag",{shiftKey:e.shiftKey,pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY,altKey:e.altKey});s.el.trigger(o)}},E=function(){$("body").append(g)},k=function(){g.detach()};this.getContainerBounderies=function(){if(!s.container.type)return!1;var e,t,i=s.draggableBox.offset(),o={};return s.container.update(),e=s.contentGhost?s.contentGhost.outerWidth():s.draggableBox.outerWidth(),t=s.contentGhost?s.contentGhost.outerHeight():s.draggableBox.outerHeight(),o={top:i.top-s.container.offset.innerTop,right:s.container.offset.innerRight-i.left-e,bottom:s.container.offset.innerBottom-i.top-t,left:i.left-s.container.offset.innerLeft},isNaN(o.top)&&(o={top:1e13,right:1e13,bottom:1e13,left:1e13}),o},this.setBounderies=function(){var e=s.settings.bounderies;s.actualPos=s.getPosition(),s.bounderies={top:-e[0],right:e[1],bottom:e[2],left:-e[3]};var t=s.getContainerBounderies();t&&(s.bounderies={top:Math.max(-t.top,s.bounderies.top),right:Math.min(t.right,s.bounderies.right),bottom:Math.min(t.bottom,s.bounderies.bottom),left:Math.max(-t.left,s.bounderies.left)})},this.move=function(){s.draggableBox.css({top:s.actualPos.y+$.clayfy.dY,left:s.actualPos.x+$.clayfy.dX})},this.getPosition=function(e){var t,i=s.el.offsetParent(),o=(t=void 0===e?s.draggableBox||s.el:e).position();return{y:o.top+i.scrollTop(),x:o.left+i.scrollLeft()}},this.fixDeltasWithBounderies=function(){$.clayfy.dX>s.bounderies.right&&($.clayfy.dX=s.bounderies.right),$.clayfy.dX<s.bounderies.left&&($.clayfy.dX=s.bounderies.left),$.clayfy.dY<s.bounderies.top&&($.clayfy.dY=s.bounderies.top),$.clayfy.dY>s.bounderies.bottom&&($.clayfy.dY=s.bounderies.bottom),s.settings.moveX||($.clayfy.dX=0),s.settings.moveY||($.clayfy.dY=0)},this.destroy=function(){},function(){s.originalPos=s.getPosition(),s.actualPos=s.originalPos,h(),p(),s.el.addClass("clayfy-box"),s.settings.move||s.el.addClass("clayfy-not-move"),a=s.el.css("cursor"),n=$(s.settings.not),s.settings.overflow&&$("body").append(s.tempContainer),s.el.on("mousedown touchstart",C),$("body").on("mouseup touchend",R),s.settings.escape&&(s.el.on("clayfy-dragstart",function(e){e.stopPropagation(),$(window).on("keydown",y)}),s.el.on("clayfy-drop",function(){$(window).off("keydown",y)})),!1!==s.settings.scrollable&&"node"===s.container.type&&(s.settings.container instanceof t||("string"==typeof s.settings.scrollable?s.settings.scrollable=s.settings.scrollable?s.settings.scrollable+" , "+s.settings.container:s.settings.container:s.settings.scrollable instanceof $&&(s.settings.scrollable=s.settings.scrollable.add(s.settings.container)))),s.el.on("clayfy-dragstart",x),s.el.on("clayfy-drag",B),s.el.on("clayfy-drop",D),0!=s.settings.droppable?(s.updateDragElement(),s.updateDropArea(),S()):s.settings.ghost&&s.el.on("clayfy-drop",c)}()}function t(e,t){this.draggableEl=e instanceof $?e:$(e),this.values,this.el,this.type,this.originalDraggable,this.width=0,this.height=0,this.innerHeight=0,this.innerWidth=0,this.offset={top:0,left:0,innerBottom:0,innerRight:0,innerLeft:0,innerTop:0};var i=this,o=function(){var e=a(i.el);i.width=i.el.width(),i.height=i.el.height(),i.innerWidth=e.innerWidth,i.innerHeight=e.innerHeight,i.offset=i.el.offset(),i.offset.innerTop=i.offset.top+parseInt(i.el.css("border-top-width")),i.offset.innerLeft=i.offset.left+parseInt(i.el.css("border-left-width")),i.offset.innerBottom=i.offset.innerTop+i.innerHeight,i.offset.innerRight=i.offset.innerLeft+i.innerWidth},r=function(){var e=i.getDraggableValues();i.offset={top:e.offset.top-(e.position.top-i.originalDraggable.position.top)-i.values[0],left:e.offset.left-(e.position.left-i.originalDraggable.position.left)-i.values[3]},i.width=i.originalDraggable.outerWidth+i.values[3]+i.values[1],i.height=i.originalDraggable.outerHeight+i.values[0]+i.values[2],i.innerWidth=i.width,i.innerHeight=i.height,i.offset.innerTop=i.offset.top,i.offset.innerLeft=i.offset.left,i.offset.innerBottom=i.offset.top+i.height,i.offset.innerRight=i.offset.left+i.width},a=function(e){var t,i,o,r,a,n=e instanceof $?e:$(e);return n.length?(t=n[0].style.position,"static"===n.css("position")&&n.css({position:"relative"}),o=$("<div>",{style:"position:absolute;top:0;left:0;bottom:0;right:0"}),i=$("<div>",{style:"position:absolute;top:0;left:0;width:100%;height:100%"}),o.append(i),n.append(o),r=i.width(),a=i.height(),o.remove(),n[0].style.position=t,{innerWidth:r,innerHeight:a}):{width:0,height:0}};this.getDraggableValues=function(){var e=i.draggableEl.offset(),t=i.draggableEl.offsetParent();return{position:{top:i.draggableEl.position().top+t.scrollTop(),left:i.draggableEl.position().left+t.scrollLeft()},offset:e,outerWidth:i.draggableEl.outerWidth(),outerHeight:i.draggableEl.outerHeight()}},function(){"string"==typeof t||t instanceof $?(i.el=t instanceof $?t:$(t),i.type="node","static"===i.el.css("position")&&i.el.css("position","relative"),i.update=o):(i.values=t,i.type="object",i.update=r,i.originalDraggable=i.getDraggableValues()),i.update()}()}function i(t,i){this.el=t instanceof $?t:$(t),this.originalSize={},this.initSize={},this.handlers=[],this.actualSize,this.newSize,this.draggable,this.preserveAspectRatio=!1,this.shift=!1,this.status="ready",this.touchableDevice;var r=$.extend(!0,{},$.clayfy.settings,{callbacks:{resizestart:function(){},resize:function(){},resizeend:function(){}}});this.settings=$.extend(!0,{},r,i);var a,n=this,s=!1,l=function(e){27===e.keyCode&&n.cancel()},d=function(){var t=["top left","top right","bottom left","bottom right","left","right","top","bottom"];n.touchableDevice&&(t=["bottom right"]),"static"===n.el.css("position")&&n.el.css("position","relative"),n.cssPosition=n.el.css("position");var i={container:n.settings.container,not:".clayfy-handler",escape:!1,droppable:n.settings.droppable};i=$.extend(!0,{},n.settings,i),n.settings.move&&"relative"!==n.cssPosition||(i.move=!1),n.draggable=new e(n.el,i);for(var r=0;r<t.length;r++){var a=t[r].split(" "),s=!0;for(var l in a)n.settings.hasOwnProperty(a[l])&&n.settings[a[l]]||(s=!1);s&&n.handlers.push(new o(t[r],n))}n.touchableDevice&&n.el.addClass("clayfy-touch-device")};this.getSize=function(){n.parent=n.el.offsetParent();var e=n.parent,t=n.el.position();return{width:n.el.width(),height:n.el.height(),left:t.left+e.scrollLeft(),top:t.top+e.scrollTop(),outerWidth:n.el.outerWidth(),outerHeight:n.el.outerHeight()}},this.getNewSize=function(){var e=n.el.outerHeight(),t=n.el.outerWidth(),i=n.el.position(),o=i.left+n.parent.scrollLeft(),r=i.top+n.parent.scrollTop();return{outerWidth:t,outerHeight:e,top:r,left:o,right:o+t,bottom:r+e,width:n.el.width(),height:n.el.height()}},this.resize={left:function(){n.el.width(n.actualSize.width-$.clayfy.dX),"relative"!==n.cssPosition&&n.el.css({left:n.actualSize.left+$.clayfy.dX})},top:function(){n.el.height(n.actualSize.height-$.clayfy.dY),"relative"!==n.cssPosition&&n.el.css({top:n.actualSize.top+$.clayfy.dY})},bottom:function(){n.el.height(n.actualSize.height+$.clayfy.dY)},right:function(){n.el.width(n.actualSize.width+$.clayfy.dX)}},this.hideHandlers=function(){"ready"===n.status&&($.each(n.handlers,function(e,t){t.el.css("display","none")}),s=!1)},this.showHandlers=function(){s||"ready"!==n.status&&!n.touchableDevice||($.each(n.handlers,function(e,t){t.el.css("display","block")}),s=!0,n.updateHandlersPosition())},this.updateHandlersPosition=function(){n.newSize=n.getNewSize(),$.each(n.handlers,function(e,t){t.updatePosition()})},this.cancel=function(){console.log("cancelled"),n.status="ready",n.hideHandlers(),n.status="canceling",$("body").trigger("mouseup");var e="relative"!==n.cssPosition?n.initSize:{width:n.initSize.width,height:n.initSize.height};n.el.animate(e,100,function(){n.status="ready",n.el.is(":hover")&&n.showHandlers(),n.el.trigger("clayfy-cancel")})},function(){n.touchableDevice=isTouchDevice(),n.originalSize=n.getSize(),n.actualSize=n.originalSize,n.newSize=n.getNewSize(),d(),n.preserveAspectRatio=n.settings.preserveAspectRatio,n.el.on("clayfy-resizestart",function(e){n.initSize=n.getNewSize(),$(window).on("keydown",l),n.status="resizing"}),n.el.on("clayfy-resizeend",function(){$(window).off("keydown",l),n.status="ready"}),n.el.on("clayfy-dragstart",function(e){e.stopPropagation(),n.initSize=n.getSize(),n.status="dragging"}),n.el.on("clayfy-drop",function(e){e.stopPropagation(),n.status="ready"}),n.el.on("clayfy-resize clayfy-drag",n.updateHandlersPosition),$(window).on("resize",n.updateHandlersPosition),n.el.on("clayfy-dragstart",function(e){e.stopPropagation(),$(window).on("keydown",l)}),n.el.on("clayfy-drop",function(e){e.stopPropagation(),$(window).off("keydown",l)});var e=n.el;$.each(n.handlers,function(t,i){n.hideHandlers(),e=e.add(i.el)}),e.on("mouseover",function(){a&&clearTimeout(a),n.showHandlers()}),e.on("mouseout",function(){a=setTimeout(n.hideHandlers,20)}),n.el.on("clayfy-resizeend clayfy-drop",function(e){e.stopPropagation(),n.el.parent().find(":hover").length||n.touchableDevice||(s=!1,n.el.trigger("mouseout"))}),n.touchableDevice&&(e.on("touchstart",function(){a&&clearTimeout(a),n.showHandlers(),a=setTimeout(n.hideHandlers,4e3)}),n.el.on("clayfy-resizeend clayfy-drop",function(){n.el.trigger("click")}))}()}function o(t,i){this.el=$("<div>",{class:"clayfy-handler clayfy-"+t,style:"position: absolute"}),this.resizable=i,this.position=t,this.draggable;var o=this,r=!1;this.updatePosition=function(){var e=i.newSize;switch(o.position){case"left":o.el.css({width:5,left:e.left,top:e.top,height:e.outerHeight});break;case"right":o.el.css({width:5,left:e.right-5,top:e.top,height:e.outerHeight});break;case"top":o.el.css({height:5,left:e.left,top:e.top,width:e.outerWidth});break;case"bottom":o.el.css({height:5,left:e.left,top:e.bottom-5,width:e.outerWidth});break;case"top left":o.el.css({width:8,height:8,left:e.left,top:e.top});break;case"top right":o.el.css({width:8,height:8,left:e.right-8,top:e.top});break;case"bottom left":o.el.css({width:8,height:8,left:e.left,top:e.bottom-8});break;case"bottom right":o.resizable.touchableDevice?o.el.css({width:18,height:18,left:e.right-20,top:e.bottom-20}):o.el.css({width:8,height:8,left:e.right-8,top:e.bottom-8})}},this.setBounderies=function(e){var t,i,r,a,n=e||[1e5,1e5,1e5,1e5],s=[];o.resizable.actualSize=o.resizable.getSize(),t=o.resizable.actualSize,i=o.resizable.settings,r=o.resizable.originalSize.width/o.resizable.originalSize.height,(a=o.draggable.getContainerBounderies())||(a={top:1e13,right:1e13,bottom:1e13,left:1e13});for(var l=0,d=i.maxSize.length;l<d;l++)null===i.maxSize[l]&&(i.maxSize[l]=1e13);$.clayfy.getInner(o.draggable.el);"left"!==o.position&&"top"!==o.position&&"top left"!==o.position||(n[1]=t.outerWidth-i.minSize[0],n[3]=i.maxSize[0]-t.outerWidth,n[2]=t.outerHeight-i.minSize[1],n[0]=i.maxSize[1]-t.outerHeight,o.draggable.settings.bounderies=n,s[3]=Math.min(a.left,n[3],a.top*r,n[0]*r),s[0]=Math.min(a.top,n[0],a.left/r,n[3]/r),s[1]=Math.min(a.right,n[1],a.bottom*r+n[2],n[2]*r),s[2]=Math.min(a.bottom,n[2],a.right/r+n[1],n[1]/r)),"right"!==o.position&&"bottom"!==o.position&&"bottom right"!==o.position||(n[3]=t.outerWidth-i.minSize[0],n[1]=i.maxSize[0]-t.outerWidth,n[0]=t.outerHeight-i.minSize[1],n[2]=i.maxSize[1]-t.outerHeight,o.draggable.settings.bounderies=n,s[1]=Math.min(a.right,n[1],a.bottom*r,n[2]*r),s[2]=Math.min(a.bottom,n[2],a.right/r,n[1]/r),s[3]=Math.min(a.left,n[3],a.top*r+n[0],n[0]*r),s[0]=Math.min(a.top,n[0],a.left/r+n[3],n[3]/r)),"bottom left"===o.position&&(n[0]=t.outerHeight-i.minSize[1],n[1]=t.outerWidth-i.minSize[0],n[2]=i.maxSize[1]-t.outerHeight,n[3]=i.maxSize[0]-t.outerWidth,o.draggable.settings.bounderies=n,s[3]=parseInt(Math.min(a.left,n[3],a.bottom*r,n[2]*r)),s[2]=parseInt(Math.min(a.bottom,n[2],a.left/r,n[3]/r)),s[0]=parseInt(Math.min(a.top,n[0],a.right/r+n[1],n[1]/r)),s[1]=parseInt(Math.min(a.right,n[1],a.top*r+n[0],n[0]*r))),"top right"===o.position&&(n[0]=i.maxSize[1]-t.outerHeight,n[1]=i.maxSize[0]-t.outerWidth,n[2]=t.outerHeight-i.minSize[1],n[3]=t.outerWidth-i.minSize[0],o.draggable.settings.bounderies=n,s[0]=parseInt(Math.min(a.top,n[0],a.right/r,n[1]/r)),s[1]=parseInt(Math.min(a.right,n[1],a.top*r,n[0]*r)),s[3]=parseInt(Math.min(a.left,n[3],a.bottom*r+n[2],n[2]*r)),s[2]=parseInt(Math.min(a.bottom,n[2],a.left/r+n[3],n[3]/r))),o.originalBounderies={top:-n[0],right:n[1],bottom:n[2],left:-n[3]},o.aspectRatioBounderies={top:-s[0],right:s[1],bottom:s[2],left:-s[3]},o.draggable.bounderies=o.resizable.preserveAspectRatio?o.aspectRatioBounderies:o.originalBounderies},this.fixDeltas=function(){var e=$.clayfy;if(o.resizable.preserveAspectRatio)t=o.resizable.originalSize.width/o.resizable.originalSize.height;if(!o.resizable.preserveAspectRatio&&o.resizable.shiftKey)var t=o.resizable.actualSize.width/o.resizable.actualSize.height;(o.resizable.preserveAspectRatio||o.resizable.shiftKey)&&("right"===o.position&&(e.dY=e.dX/t),"bottom"===o.position&&(e.dX=e.dY*t),"left"===o.position&&(e.dY=e.dX/t),"top"===o.position&&(e.dX=e.dY*t),"top left"===o.position&&(e.dY=e.dX/t),"top right"===o.position&&(e.dY=-e.dX/t),"bottom left"===o.position&&(e.dY=-e.dX/t),"bottom right"===o.position&&(e.dY=e.dX/t))},function(){i.settings.className&&o.el.addClass(i.settings.className),o.updatePosition(),o.resizable.el.after(o.el),o.draggable=new e(o.el,{move:!1,container:i.draggable.container,scroll:!1,escape:!1}),o.draggable.el.on("clayfy-drop",function(e){i.el.trigger("clayfy-resizeend"),i.settings.callbacks.resizeend()}),o.draggable.el.on("clayfy-dragstart",function(e){e.stopPropagation(),o.resizable.preserveAspectRatio||(o.resizable.originalSize=o.resizable.getSize()),i.el.trigger("clayfy-beforeresize"),o.setBounderies(),i.el.trigger("clayfy-resizestart"),i.settings.callbacks.resizestart(),r=!1}),o.draggable.el.on("clayfy-drag",function(e){e.shiftKey&&!i.preserveAspectRatio&&(i.shiftKey=!0),e.shiftKey||(i.shiftKey=!1),!r||e.shiftKey||i.preserveAspectRatio||(console.log("Desactivate: preserve aspect ratio"),o.draggable.bounderies=o.originalBounderies,r=!1),r||!e.shiftKey||i.preserveAspectRatio||(console.log("Activate: preserve aspect ratio"),o.draggable.bounderies=o.aspectRatioBounderies,r=!0),i.preserveAspectRatio&&!i.shiftKey&&(o.draggable.bounderies=o.aspectRatioBounderies)}),t.indexOf("left")>-1&&o.draggable.el.on("clayfy-drag",function(e){(i.preserveAspectRatio||i.shiftKey)&&(o.fixDeltas(),"left"===t&&i.resize.top()),i.resize.left()}),t.indexOf("top")>-1&&o.draggable.el.on("clayfy-drag",function(e){(i.preserveAspectRatio||i.shiftKey)&&(o.fixDeltas(),"top"===t&&i.resize.left()),i.resize.top()}),t.indexOf("right")>-1&&o.draggable.el.on("clayfy-drag",function(e){(i.preserveAspectRatio||i.shiftKey)&&(o.fixDeltas(),"right"===t&&i.resize.bottom()),i.resize.right()}),t.indexOf("bottom")>-1&&o.draggable.el.on("clayfy-drag",function(e){(i.preserveAspectRatio||i.shiftKey)&&(o.fixDeltas(),"bottom"===t&&i.resize.right()),i.resize.bottom()}),o.draggable.el.on("clayfy-drag",function(e){i.el.trigger("clayfy-resize"),i.settings.callbacks.resize()}),o.resizable.touchableDevice&&o.el.addClass("clayfy-touch-device")}()}function r(t,i){this.el=t instanceof $?t:$(t),this.draggableBox,this.dropArea=$("<div>",{class:"clayfy-sort-droparea"}),this.draggable,this.droppable,this.droppableParent,this.index,this.indexRelative,this.parent,this.settings=$.extend(!0,{},$.clayfy.settings,i);var o,r=this,a=function(e){27===e.keyCode&&r.cancel()},n=function(){r.draggableBox=r.el.clone(),r.draggableBox.css({position:"absolute",width:"100%",height:"100%"}).addClass("clayfy-sort-dragging");var e=r.el.parent();"static"===e.css("position")&&e.css("position","relative")},s=function(){f(),c(),r.index=r.droppable.index(r.el),r.parent=r.el.parent(),r.indexRelative=r.parent.find(r.droppable).index(r.el),r.draggableBox.css({width:r.el.outerWidth(),height:r.el.outerHeight(),top:r.el.position().top,left:r.el.position().left}),l(),r.draggableBox.appendTo(r.parent),r.el.css({visibility:"hidden"})},l=function(){r.dropArea.appendTo(r.el.parent()),r.dropArea.css({position:"absolute",width:r.el.outerWidth(),height:r.el.outerHeight(),top:r.el.position().top+parseInt(r.el.css("margin-top"))-parseInt(r.dropArea.css("border-top-width")),left:r.el.position().left+parseInt(r.el.css("margin-left"))-parseInt(r.dropArea.css("border-left-width"))})},d=function(e){var t=r.parent.find(r.droppable);if(r.parent.is($(r.droppedTarget).parent())){var i=t.index(r.el);r.indexRelative<i?t.eq(r.indexRelative).before(r.el):t.eq(r.indexRelative).after(r.el)}else t.length?t.eq(r.indexRelative).before(r.el):r.parent.append(r.el);l()},g=function(e){f(),(!1===r.el.triggerHandler("validateChange")||!r.parent.is($(r.droppedTarget).parent())&&!r.settings.export||o)&&d();var t=r.dropArea.parent().offset(),i=r.draggableBox.parent().offset(),a=r.el.position().left+(t.left-i.left),n=r.el.position().top+(t.top-i.top);return r.draggableBox.animate({top:n,left:a},200,function(){r.dropArea.detach(),r.el[0].style.visibility="",r.draggableBox.detach(),f();var e=r.droppable.index(r.el);e!=r.index&&(r.index=e,r.el.trigger($.Event("clayfy-changeorder",{index:r.index,order:r.droppable}))),r.el.parent().find(".clayfy-sort-helper").remove()}),o=!1,!1},p=function(e){if(!r.el.is(e.target)){f();var t=r.droppable.index(e.target),i=r.droppable.index(r.el);r.droppedTarget=e.target,t>i?$(e.target).after(r.el):$(e.target).before(r.el),l(),r.draggable.updateDropArea(),r.parent.find(r.droppable).length<2?r.parent.find(".clayfy-sort-helper").length||r.parent.append('<div class="clayfy-sort-helper" style="position: absolute; width: 100%; height: 100%; top: 0; left:0"></div>'):r.parent.find(".clayfy-sort-helper").remove(),$(".clayfy-sort-helper").each(function(){var e=$(this);e.parent().is(r.droppableParent)&&r.draggable.addDroppable(e)})}},f=function(){r.settings.siblings?r.droppable=r.settings.siblings instanceof $?r.settings.siblings:$(r.settings.siblings):r.droppable=r.el.siblings().andSelf()},c=function(){r.droppableParent||(r.droppableParent=r.el.parent()),r.droppable.each(function(){r.droppableParent=r.droppableParent.add($(this).parent())})};this.cancel=function(){o=!0,$("body").trigger("mouseup")},function(){f(),c(),n(),r.el.on("mousedown touchstart",function(e){"mousedown"===e.type&&1!==e.which||(s(),r.draggableBox.trigger($.Event(e.type,e)))});var t=$.extend(!0,{},r.settings,{droppable:r.droppable,escape:!1,dropoutside:!0});r.draggable=new e(r.draggableBox,t),r.draggableBox.on("clayfy-drop",g),r.draggableBox.on("clayfy-dropoutside",function(e){return!1}),r.draggableBox.on("clayfy-dragenter",p),r.draggableBox.on("clayfy-dragstart",function(){r.draggable.resetDroppable(r.droppable),$(".clayfy-sort-helper").each(function(){var e=$(this);e.parent().is(r.droppableParent)&&r.draggable.addDroppable(e)})}),r.draggableBox.on("clayfy-dragstart",function(e){e.stopPropagation(),$(window).on("keydown",a)}),r.draggableBox.on("clayfy-drop",function(){$(window).off("keydown",a)})}()}$.clayfy={dX:0,dY:0,container:function(e,i){return new t(e,i)},settings:{type:"draggable",bounderies:[1e7,1e7,1e7,1e7],container:"",moveX:!0,moveY:!0,move:!0,not:"",ghost:!1,coverScreen:!0,scrollable:"",droppable:"",fit:!0,dropoutside:!1,migrate:!1,overflow:!1,escape:!0,propagate:!0,preserveAspectRatio:!1,maxSize:[500,200],minSize:[100,50],left:!0,top:!0,right:!0,bottom:!0,className:"",siblings:"",export:!0,dragstart:function(e){},drag:function(e){},drop:function(e){}},getInner:function(e){var t,i,o,r,a,n=e instanceof $?e:$(e);return n.length?(t=n[0].style.position,"static"===n.css("position")&&n.css({position:"relative"}),o=$("<div>",{style:"position:absolute;top:0;left:0;bottom:0;right:0"}),i=$("<div>",{style:"position:absolute;top:0;left:0;width:100%;height:100%"}),o.append(i),n.append(o),r=i.width(),a=i.height(),o.remove(),n[0].style.position=t,{innerWidth:r,innerHeight:a}):{width:0,height:0}}};var a;$.fn.clayfy=function(t){var o=arguments;if(void 0===t||"object"==typeof t){var n=$.clayfy.settings.type;switch(void 0!==t&&void 0!==t.type&&(n=t.type),n){case"draggable":a=e;break;case"resizable":a=i;break;case"sortable":a=r}return this.each(function(){$.data(this,"clayfy")||$.data(this,"clayfy",new a(this,t))})}if("string"==typeof t&&"_"!==t[0]&&"init"!==t){if("instance"===t)return this.length?$.data(this[0],"clayfy"):null;if(0==Array.prototype.slice.call(o,1).length&&-1!=$.inArray(t,$.fn.clayfy.getters)){var s=$.data(this[0],"clayfy");return s[t].apply(s,Array.prototype.slice.call(o,1))}return this.each(function(){var e=$.data(this,"clayfy");"function"==typeof e[t]&&e[t].apply(e,Array.prototype.slice.call(o,1))})}},$.fn.clayfy.getters=["getPosition"]}(jQuery);
isTouchDevice=function(){return"ontouchstart"in window||navigator.maxTouchPoints};

!function(a,u){a.guessLanguage=(a.module||{}).exports=new function(){var e=a._languageData||{};"object"==typeof module&&module.exports===a&&(e=require("./_languageData")||{});var n=20,i=300,t={ab:"Abkhazian",af:"Afrikaans",ar:"Arabic",az:"Azeri",be:"Belarusian",bg:"Bulgarian",bn:"Bengali",bo:"Tibetan",br:"Breton",ca:"Catalan",ceb:"Cebuano",cs:"Czech",cy:"Welsh",da:"Danish",de:"German",el:"Greek",en:"English",eo:"Esperanto",es:"Spanish",et:"Estonian",eu:"Basque",fa:"Farsi",fi:"Finnish",fo:"Faroese",fr:"French",fy:"Frisian",gd:"Scots Gaelic",gl:"Galician",gu:"Gujarati",ha:"Hausa",haw:"Hawaiian",he:"Hebrew",hi:"Hindi",hmn:"Pahawh Hmong",hr:"Croatian",hu:"Hungarian",hy:"Armenian",id:"Indonesian",is:"Icelandic",it:"Italian",ja:"Japanese",ka:"Georgian",kk:"Kazakh",km:"Cambodian",ko:"Korean",ku:"Kurdish",ky:"Kyrgyz",la:"Latin",lt:"Lithuanian",lv:"Latvian",mg:"Malagasy",mk:"Macedonian",ml:"Malayalam",mn:"Mongolian",mr:"Marathi",ms:"Malay",nd:"Ndebele",ne:"Nepali",nl:"Dutch",nn:"Nynorsk",no:"Norwegian",nso:"Sepedi",pa:"Punjabi",pl:"Polish",ps:"Pashto",pt:"Portuguese","pt-PT":"Portuguese (Portugal)","pt-BR":"Portuguese (Brazil)",ro:"Romanian",ru:"Russian",sa:"Sanskrit",bs:"Serbo-Croatian",sk:"Slovak",sl:"Slovene",so:"Somali",sq:"Albanian",sr:"Serbian",sv:"Swedish",sw:"Swahili",ta:"Tamil",te:"Telugu",th:"Thai",tl:"Tagalog",tlh:"Klingon",tn:"Setswana",tr:"Turkish",ts:"Tsonga",tw:"Twi",uk:"Ukrainian",ur:"Urdu",uz:"Uzbek",ve:"Venda",vi:"Vietnamese",xh:"Xhosa",zh:"Chinese","zh-TW":"Traditional Chinese (Taiwan)",zu:"Zulu"},r={ab:12026,af:40,ar:26020,az:26030,be:11890,bg:26050,bn:26040,bo:26601,br:1361,ca:3,ceb:26060,cs:26080,cy:26560,da:26090,de:26160,el:26165,en:26110,eo:11933,es:26460,et:26120,eu:1232,fa:26130,fi:26140,fo:11817,fr:26150,fy:1353,gd:65555,gl:1252,gu:26599,ha:26170,haw:26180,he:26592,hi:26190,hr:26070,hu:26200,hy:26597,id:26220,is:26210,it:26230,ja:26235,ka:26600,kk:26240,km:1222,ko:26255,ku:11815,ky:26260,la:26280,lt:26300,lv:26290,mg:1362,mk:26310,ml:26598,mn:26320,mr:1201,ms:1147,ne:26330,nl:26100,nn:172,no:26340,pa:65550,pl:26380,ps:26350,pt:26390,ro:26400,ru:26410,sa:1500,bs:1399,sk:26430,sl:26440,so:26450,sq:26010,sr:26420,sv:26480,sw:26470,ta:26595,te:26596,th:26594,tl:26490,tlh:26250,tn:65578,tr:26500,tw:1499,uk:26520,ur:26530,uz:26540,vi:26550,zh:26065,"zh-TW":22},F=[["Armenian","hy"],["Hebrew","he"],["Bengali","bn"],["Gurmukhi","pa"],["Greek","el"],["Gujarati","gu"],["Oriya","or"],["Tamil","ta"],["Telugu","te"],["Kannada","kn"],["Malayalam","ml"],["Sinhala","si"],["Thai","th"],["Lao","lo"],["Tibetan","bo"],["Burmese","my"],["Georgian","ka"],["Mongolian","mn"],["Khmer","km"],["Pahawh Hmong","hmn"]],o="unknown",g=["cs","af","pl","hr","ro","sk","sl","tr","hu","az","et","sq","ca","es","fr","de","nl","it","da","is","no","sv","fi","lv","pt","ve","lt","tl","cy","vi"],l=["en","ceb","ha","so","tlh","id","haw","la","sw","eu","nr","nso","zu","xh","ss","st","tn","ts"].concat(g),s=["ru","uk","kk","uz","mn","sr","mk","bg","ky"],h=["ar","fa","ps","ur"],c=["hi","ne"],p=["pt-BR","pt-PT"],m={"Basic Latin":/[\u0000-\u007F]/g,"Latin-1 Supplement":/[\u0080-\u00FF]/g,"Latin Extended-A":/[\u0100-\u017F]/g,"Latin Extended-B":/[\u0180-\u024F]/g,"IPA Extensions":/[\u0250-\u02AF]/g,"Spacing Modifier Letters":/[\u02B0-\u02FF]/g,"Combining Diacritical Marks":/[\u0300-\u036F]/g,"Greek and Coptic":/[\u0370-\u03FF]/g,Cyrillic:/[\u0400-\u04FF]/g,"Cyrillic Supplement":/[\u0500-\u052F]/g,Armenian:/[\u0530-\u058F]/g,Hebrew:/[\u0590-\u05FF]/g,Arabic:/[\u0600-\u06FF]/g,Syriac:/[\u0700-\u074F]/g,"Arabic Supplement":/[\u0750-\u077F]/g,Thaana:/[\u0780-\u07BF]/g,NKo:/[\u07C0-\u07FF]/g,Devanagari:/[\u0900-\u097F]/g,Bengali:/[\u0980-\u09FF]/g,Gurmukhi:/[\u0A00-\u0A7F]/g,Gujarati:/[\u0A80-\u0AFF]/g,Oriya:/[\u0B00-\u0B7F]/g,Tamil:/[\u0B80-\u0BFF]/g,Telugu:/[\u0C00-\u0C7F]/g,Kannada:/[\u0C80-\u0CFF]/g,Malayalam:/[\u0D00-\u0D7F]/g,Sinhala:/[\u0D80-\u0DFF]/g,Thai:/[\u0E00-\u0E7F]/g,Lao:/[\u0E80-\u0EFF]/g,Tibetan:/[\u0F00-\u0FFF]/g,Burmese:/[\u1000-\u109F]/g,Georgian:/[\u10A0-\u10FF]/g,"Hangul Jamo":/[\u1100-\u11FF]/g,Ethiopic:/[\u1200-\u137F]/g,"Ethiopic Supplement":/[\u1380-\u139F]/g,Cherokee:/[\u13A0-\u13FF]/g,"Unified Canadian Aboriginal Syllabics":/[\u1400-\u167F]/g,Ogham:/[\u1680-\u169F]/g,Runic:/[\u16A0-\u16FF]/g,"Pahawh Hmong":/[\u16B0-\u16B8]/g,Tagalog:/[\u1700-\u171F]/g,Hanunoo:/[\u1720-\u173F]/g,Buhid:/[\u1740-\u175F]/g,Tagbanwa:/[\u1760-\u177F]/g,Khmer:/[\u1780-\u17FF]/g,Mongolian:/[\u1800-\u18AF]/g,Limbu:/[\u1900-\u194F]/g,"Tai Le":/[\u1950-\u197F]/g,"New Tai Lue":/[\u1980-\u19DF]/g,"Khmer Symbols":/[\u19E0-\u19FF]/g,Buginese:/[\u1A00-\u1A1F]/g,Balinese:/[\u1B00-\u1B7F]/g,"Phonetic Extensions":/[\u1D00-\u1D7F]/g,"Phonetic Extensions Supplement":/[\u1D80-\u1DBF]/g,"Combining Diacritical Marks Supplement":/[\u1DC0-\u1DFF]/g,"Latin Extended Additional":/[\u1E00-\u1EFF]/g,"Greek Extended":/[\u1F00-\u1FFF]/g,"General Punctuation":/[\u2000-\u206F]/g,"Superscripts and Subscripts":/[\u2070-\u209F]/g,"Currency Symbols":/[\u20A0-\u20CF]/g,"Combining Diacritical Marks for Symbols":/[\u20D0-\u20FF]/g,"Letterlike Symbols":/[\u2100-\u214F]/g,"Number Forms":/[\u2150-\u218F]/g,Arrows:/[\u2190-\u21FF]/g,"Mathematical Operators":/[\u2200-\u22FF]/g,"Miscellaneous Technical":/[\u2300-\u23FF]/g,"Control Pictures":/[\u2400-\u243F]/g,"Optical Character Recognition":/[\u2440-\u245F]/g,"Enclosed Alphanumerics":/[\u2460-\u24FF]/g,"Box Drawing":/[\u2500-\u257F]/g,"Block Elements":/[\u2580-\u259F]/g,"Geometric Shapes":/[\u25A0-\u25FF]/g,"Miscellaneous Symbols":/[\u2600-\u26FF]/g,Dingbats:/[\u2700-\u27BF]/g,"Miscellaneous Mathematical Symbols-A":/[\u27C0-\u27EF]/g,"Supplemental Arrows-A":/[\u27F0-\u27FF]/g,"Braille Patterns":/[\u2800-\u28FF]/g,"Supplemental Arrows-B":/[\u2900-\u297F]/g,"Miscellaneous Mathematical Symbols-B":/[\u2980-\u29FF]/g,"Supplemental Mathematical Operators":/[\u2A00-\u2AFF]/g,"Miscellaneous Symbols and Arrows":/[\u2B00-\u2BFF]/g,Glagolitic:/[\u2C00-\u2C5F]/g,"Latin Extended-C":/[\u2C60-\u2C7F]/g,Coptic:/[\u2C80-\u2CFF]/g,"Georgian Supplement":/[\u2D00-\u2D2F]/g,Tifinagh:/[\u2D30-\u2D7F]/g,"Ethiopic Extended":/[\u2D80-\u2DDF]/g,"Supplemental Punctuation":/[\u2E00-\u2E7F]/g,"CJK Radicals Supplement":/[\u2E80-\u2EFF]/g,"KangXi Radicals":/[\u2F00-\u2FDF]/g,"Ideographic Description Characters":/[\u2FF0-\u2FFF]/g,"CJK Symbols and Punctuation":/[\u3000-\u303F]/g,Hiragana:/[\u3040-\u309F]/g,Katakana:/[\u30A0-\u30FF]/g,Bopomofo:/[\u3100-\u312F]/g,"Hangul Compatibility Jamo":/[\u3130-\u318F]/g,Kanbun:/[\u3190-\u319F]/g,"Bopomofo Extended":/[\u31A0-\u31BF]/g,"CJK Strokes":/[\u31C0-\u31EF]/g,"Katakana Phonetic Extensions":/[\u31F0-\u31FF]/g,"Enclosed CJK Letters and Months":/[\u3200-\u32FF]/g,"CJK Compatibility":/[\u3300-\u33FF]/g,"CJK Unified Ideographs Extension A":/[\u3400-\u4DBF]/g,"Yijing Hexagram Symbols":/[\u4DC0-\u4DFF]/g,"CJK Unified Ideographs":/[\u4E00-\u9FFF]/g,"Yi Syllables":/[\uA000-\uA48F]/g,"Yi Radicals":/[\uA490-\uA4CF]/g,"Modifier Tone Letters":/[\uA700-\uA71F]/g,"Latin Extended-D":/[\uA720-\uA7FF]/g,"Syloti Nagri":/[\uA800-\uA82F]/g,"Phags-pa":/[\uA840-\uA87F]/g,"Hangul Syllables":/[\uAC00-\uD7AF]/g,"High Surrogates":/[\uD800-\uDB7F]/g,"High Private Use Surrogates":/[\uDB80-\uDBFF]/g,"Low Surrogates":/[\uDC00-\uDFFF]/g,"Private Use Area":/[\uE000-\uF8FF]/g,"CJK Compatibility Ideographs":/[\uF900-\uFAFF]/g,"Alphabetic Presentation Forms":/[\uFB00-\uFB4F]/g,"Arabic Presentation Forms-A":/[\uFB50-\uFDFF]/g,"Variation Selectors":/[\uFE00-\uFE0F]/g,"Vertical Forms":/[\uFE10-\uFE1F]/g,"Combining Half Marks":/[\uFE20-\uFE2F]/g,"CJK Compatibility Forms":/[\uFE30-\uFE4F]/g,"Small Form Variants":/[\uFE50-\uFE6F]/g,"Arabic Presentation Forms-B":/[\uFE70-\uFEFF]/g,"Halfwidth and Fullwidth Forms":/[\uFF00-\uFFEF]/g,Specials:/[\uFFF0-\uFFFF]/g};function d(a,e){var n=function(a){var u={};for(var e in m){var n=a.match(m[e]),i=(n?n.length:0)/a.length;u[e]=i}return u}(a);if(n["Hangul Syllables"]+n["Hangul Jamo"]+n["Hangul Compatibility Jamo"]>=.4)e.apply(u,["ko"]);else if(n["Greek and Coptic"]>=.4)e.apply(u,["el"]);else if(n.Hiragana+n.Katakana+n["Katakana Phonetic Extensions"]>=.2)e.apply(u,["ja"]);else if(n["CJK Unified Ideographs"]+n.Bopomofo+n["Bopomofo Extended"]+n["KangXi Radicals"]>=.4)e.apply(u,["zh"]);else if(n.Cyrillic>=.4)b(a,s,e);else if(n.Arabic+n["Arabic Presentation Forms-A"]+n["Arabic Presentation Forms-B"]>=.4)b(a,h,e);else if(n.Devanagari>=.4)b(a,c,e);else{for(var i=0,t=F.length;i<t;i++)if(n[F[i][0]]>=.4)return void e.apply(u,[F[i][1]]);n["Latin-1 Supplement"]+n["Latin Extended-A"]+n["IPA Extensions"]>=.4?b(a,g,function(n){"pt"==n?b(a,p,e):e.apply(u,[n])}):n["Basic Latin"]>=.15?b(a,l,e):e.apply(u,[o])}}function b(a,e,i){if(a.length<n)i.apply(u,[o]);else{for(var t={},r=function(a){for(var u={},e=[],n=(a=a.toLowerCase()).split(""),i=0,t=n.length-2;i<t;i++){var r=n[i]+n[i+1]+n[i+2]+"";u[r]?u[r]+=1:u[r]=1}for(var i in u)e[e.length]=[i,u[i]];return e.sort(function(a,u){return u[1]-a[1]})}(a),F=0,g=e.length;F<g;F++){var l=e[F].toLowerCase(),s=y(l)||null;s&&(t[l]=A(r,s))}var h=[];for(var c in t)h.push([c,t[c]]);if(0!=h.length){var p=h.sort(function(a,u){return a[1]-u[1]});i.apply(u,[p[0][0]])}else i.apply(u,[o])}}var f={};function y(a){if(f[a])return f[a];var u=e[a];if(!u)return{};for(var n=u.match(/([\s\S]{1,3})/g),i={},t=0,r=n.length;t<r;t++)i[n[t]]=t;return f[a]=i,i}function A(a,u){for(var e=0,n=0,t=a.length;n<t;n++)u[a[n][0]]?e+=Math.abs(a[n][1]-u[a[n][0]]):e+=i;return e}return{detect:function(a,e){a?d(a=a.substr(0,4096).replace(/[\u0021-\u0040]/g,""),e):e.apply(u,[o])},info:function(a,e){this.detect(a,function(a){a!==o?e.apply(u,[[a,r[a],t[a]]]):e.apply(u,[[o,o,o]])})},code:function(a,e){this.detect(a,function(a){a!==o?e.apply(u,[r[a]]):e.apply(u,[-1])})},name:function(a,e){this.detect(a,function(a){a!==o?e.apply(u,[t[a]]):e.apply(u,[o])})}}}}(this);
!function(t,e,i,s){t.widget("ui.triggeredAutocomplete",t.extend(!0,{},t.ui.autocomplete.prototype,{options:{trigger:"@",allowDuplicates:!1},_create:function(){var e=this;this.id_map=new Object,this.stopIndex=-1,this.stopLength=-1,this.contents="",this.cursorPos=0,this.element.bind("keydown.autocomplete.fix",function(i){switch(i.keyCode){case t.ui.keyCode.ESCAPE:e.close(i),i.stopImmediatePropagation();break;case t.ui.keyCode.UP:case t.ui.keyCode.DOWN:e.menu.element.is(":visible")||i.stopImmediatePropagation()}});var i=this.element.attr("id_map");i&&(this.id_map=jQuery.parseJSON(i)),this.ac=t.ui.autocomplete.prototype,this.ac._create.apply(this,arguments),this.updateHidden(),this.options.select=function(t,i){var s=e.contents,n=e.cursorPos,o=s.substring(n,s.length),r=s.substring(0,n);r=r.substring(0,r.lastIndexOf(e.options.trigger));var a=e.element.scrollTop();this.value=r+e.options.trigger+i.item.username+" "+o,e.element.scrollTop(a),e.id_map[i.item.label]=i.item.value,e.updateHidden();var l=r.length+e.options.trigger.length+i.item.username.length+2;if(this.createTextRange){var u=this.createTextRange();u.move("character",l),u.select()}else this.setSelectionRange&&this.setSelectionRange(l,l);return!1},this.options.focus=function(t,e){return!1},this.menu.options.blur=function(t,e){return!1},this.element.focus(function(){e.updateHidden()}),this.element.change(function(){e.updateHidden()})},_renderItem:function(e,i){return void 0!=i.img?t("<li></li>").data("item.autocomplete",i).append("<a><img src='"+i.img+"' /><span>"+i.label+" <span class='small-mention'>@"+i.username+"</span></span></a>").appendTo(e):t("<li></li>").data("item.autocomplete",i).append(t("<a></a>").text(i.label)).appendTo(e)},_move:function(t,e){this.menu.element.is(":visible")?this.menu.first()&&/^previous/.test(t)||this.menu.last()&&/^next/.test(t)?this.menu.deactivate():this.menu[t](e):this.search(null,e)},search:function(t,e){var i=this.element.val(),s=this.getCursor();this.contents=i,this.cursorPos=s;i.substring(i.lastIndexOf(this.options.trigger)-1,s),new RegExp("\\B\\"+this.options.trigger+"([\\w\\-]+)");if(i.indexOf(this.options.trigger)>=0){var n=(i=i.substring(0,s)).substring(i.lastIndexOf(this.options.trigger)+1,i.length);if(this.stopIndex==i.lastIndexOf(this.options.trigger)&&n.length>this.stopLength&&(n=""),n.length>0)return this.updateHidden(),this._search(n);this.close()}},_initSource:function(){var e,i,s=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,s){s(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,n){s.xhr&&s.xhr.abort(),s.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(i){null!=i?(n(t.map(i,function(t){if(label="string"==typeof t?t:t.label,!s.id_map[label]||s.options.allowDuplicates)return t})),s.stopLength=-1,s.stopIndex=-1):(s.stopLength=e.term.length,s.stopIndex=s.contents.lastIndexOf(s.options.trigger),s.close())}})}):this.source=this.options.source},destroy:function(){t.Widget.prototype.destroy.call(this)},getCursor:function(){var t=this.element[0];if(t.selectionStart)return t.selectionStart;if(t.ownerDocument.selection){var e=t.ownerDocument.selection.createRange();if(!e)return 0;var i=t.createTextRange(),s=i.duplicate();return i.moveToBookmark(e.getBookmark()),s.setEndPoint("EndToStart",i),s.text.length}},updateHidden:function(){var e=this.options.trigger,i=this.element.scrollTop(),s=this.element.val();for(var n in this.id_map){var o=e+n;o=o.replace(/[^a-zA-Z 0-9@]+/g,"\\$&");var r=new RegExp(o,"g");s==(s=s.replace(r,e+"["+this.id_map[n]+"]"))&&delete this.id_map[n]}t(this.options.hidden).val(s),this.element.scrollTop(i)}}))}(jQuery,window,document);

!function($){$.fn.extend({limit:function(limit,element){var interval,f,self=$(this);$(this).focus(function(){interval=window.setInterval(substring,100)}),$(this).blur(function(){clearInterval(interval),substring()}),substringFunction="function substring(){ var val = $(self).val();var length = val.length;if(length > limit){$(self).val($(self).val().substring(0,limit));}",void 0!==element&&(substringFunction+="if($(element).html() != limit-length){$(element).html((limit-length<=0)?'0':limit-length);}"),substringFunction+="}",eval(substringFunction),substring()}})}(jQuery);

/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});

/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.4",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.4",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.4",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.4",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.4",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.4",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){
var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.4",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a(document.body).height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);

function Wo_progressIconLoader(e){e.each(function(){return progress_icon_elem=$(this).find("i.progress-icon"),default_icon=progress_icon_elem.attr("data-icon"),hide_back=!1,1==progress_icon_elem.hasClass("hidde")&&(hide_back=!0),1==$(this).find("i.fa-spinner").length?(progress_icon_elem.removeClass("fa-spinner").removeClass("fa-spin").addClass("fa-"+default_icon),1==hide_back&&progress_icon_elem.hide()):progress_icon_elem.removeClass("fa-"+default_icon).addClass("fa-spinner fa-spin").show(),!0})}function Wo_StartBar(){$(".loader").css("display","block")}function Wo_FinishBar(){$(".loader").css("display","none")}$(document).ready(function(){$(".nav-footer-toggle").on("click",function(e){e.preventDefault(),$(this).parent().toggleClass("Wide-Footer"),$(".nav-footer-toggle i").toggleClass("fa-arrow-circle-up fa-arrow-circle-down")})});

!function(e){if(!e.hasInitialised){var t={escapeRegExp:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},hasClass:function(e,t){var i=" ";return 1===e.nodeType&&(i+e.className+i).replace(/[\n\t]/g,i).indexOf(i+t+i)>=0},addClass:function(e,t){e.className+=" "+t},removeClass:function(e,t){var i=new RegExp("\\b"+this.escapeRegExp(t)+"\\b");e.className=e.className.replace(i,"")},interpolateString:function(e,t){var i=/{{([a-z][a-z0-9\-_]*)}}/gi;return e.replace(i,function(e){return t(arguments[1])||""})},getCookie:function(e){var t="; "+document.cookie,i=t.split("; "+e+"=");return 2!=i.length?void 0:i.pop().split(";").shift()},setCookie:function(e,t,i,n,o){var s=new Date;s.setDate(s.getDate()+(i||365));var r=[e+"="+t,"expires="+s.toUTCString(),"path="+(o||"/")];n&&r.push("domain="+n),document.cookie=r.join(";")},deepExtend:function(e,t){for(var i in t)t.hasOwnProperty(i)&&(i in e&&this.isPlainObject(e[i])&&this.isPlainObject(t[i])?this.deepExtend(e[i],t[i]):e[i]=t[i]);return e},throttle:function(e,t){var i=!1;return function(){i||(e.apply(this,arguments),i=!0,setTimeout(function(){i=!1},t))}},hash:function(e){var t,i,n,o=0;if(0===e.length)return o;for(t=0,n=e.length;t<n;++t)i=e.charCodeAt(t),o=(o<<5)-o+i,o|=0;return o},normaliseHex:function(e){return"#"==e[0]&&(e=e.substr(1)),3==e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),e},getContrast:function(e){e=this.normaliseHex(e);var t=parseInt(e.substr(0,2),16),i=parseInt(e.substr(2,2),16),n=parseInt(e.substr(4,2),16),o=(299*t+587*i+114*n)/1e3;return o>=128?"#000":"#fff"},getLuminance:function(e){var t=parseInt(this.normaliseHex(e),16),i=38,n=(t>>16)+i,o=(t>>8&255)+i,s=(255&t)+i,r=(16777216+65536*(n<255?n<1?0:n:255)+256*(o<255?o<1?0:o:255)+(s<255?s<1?0:s:255)).toString(16).slice(1);return"#"+r},isMobile:function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},isPlainObject:function(e){return"object"==typeof e&&null!==e&&e.constructor==Object}};e.status={deny:"deny",allow:"allow",dismiss:"dismiss"},e.transitionEnd=function(){var e=document.createElement("div"),t={t:"transitionend",OT:"oTransitionEnd",msT:"MSTransitionEnd",MozT:"transitionend",WebkitT:"webkitTransitionEnd"};for(var i in t)if(t.hasOwnProperty(i)&&"undefined"!=typeof e.style[i+"ransition"])return t[i];return""}(),e.hasTransition=!!e.transitionEnd;var i=Object.keys(e.status).map(t.escapeRegExp);e.customStyles={},e.Popup=function(){function n(){this.initialise.apply(this,arguments)}function o(e){this.openingTimeout=null,t.removeClass(e,"cc-invisible")}function s(t){t.style.display="none",t.removeEventListener(e.transitionEnd,this.afterTransition),this.afterTransition=null}function r(){var t=this.options.onInitialise.bind(this);if(!window.navigator.cookieEnabled)return t(e.status.deny),!0;if(window.CookiesOK||window.navigator.CookiesOK)return t(e.status.allow),!0;var i=Object.keys(e.status),n=this.getStatus(),o=i.indexOf(n)>=0;return o&&t(n),o}function a(){var e=this.options.position.split("-"),t=[];return e.forEach(function(e){t.push("cc-"+e)}),t}function c(){var e=this.options,i="top"==e.position||"bottom"==e.position?"banner":"floating";t.isMobile()&&(i="floating");var n=["cc-"+i,"cc-type-"+e.type,"cc-theme-"+e.theme];e["static"]&&n.push("cc-static"),n.push.apply(n,a.call(this));p.call(this,this.options.palette);return this.customStyleSelector&&n.push(this.customStyleSelector),n}function l(){var e={},i=this.options;i.showLink||(i.elements.link="",i.elements.messagelink=i.elements.message),Object.keys(i.elements).forEach(function(n){e[n]=t.interpolateString(i.elements[n],function(e){var t=i.content[e];return e&&"string"==typeof t&&t.length?t:""})});var n=i.compliance[i.type];n||(n=i.compliance.info),e.compliance=t.interpolateString(n,function(t){return e[t]});var o=i.layouts[i.layout];return o||(o=i.layouts.basic),t.interpolateString(o,function(t){return e[t]})}function u(i){var n=this.options,o=document.createElement("div"),s=n.container&&1===n.container.nodeType?n.container:document.body;o.innerHTML=i;var r=o.children[0];return r.style.display="none",t.hasClass(r,"cc-window")&&e.hasTransition&&t.addClass(r,"cc-invisible"),this.onButtonClick=h.bind(this),r.addEventListener("click",this.onButtonClick),n.autoAttach&&(s.firstChild?s.insertBefore(r,s.firstChild):s.appendChild(r)),r}function h(n){var o=n.target;if(t.hasClass(o,"cc-btn")){var s=o.className.match(new RegExp("\\bcc-("+i.join("|")+")\\b")),r=s&&s[1]||!1;r&&(this.setStatus(r),this.close(!0))}t.hasClass(o,"cc-close")&&(this.setStatus(e.status.dismiss),this.close(!0)),t.hasClass(o,"cc-revoke")&&this.revokeChoice()}function p(e){var i=t.hash(JSON.stringify(e)),n="cc-color-override-"+i,o=t.isPlainObject(e);return this.customStyleSelector=o?n:null,o&&d(i,e,"."+n),o}function d(i,n,o){if(e.customStyles[i])return void++e.customStyles[i].references;var s={},r=n.popup,a=n.button,c=n.highlight;r&&(r.text=r.text?r.text:t.getContrast(r.background),r.link=r.link?r.link:r.text,s[o+".cc-window"]=["color: "+r.text,"background-color: "+r.background],s[o+".cc-revoke"]=["color: "+r.text,"background-color: "+r.background],s[o+" .cc-link,"+o+" .cc-link:active,"+o+" .cc-link:visited"]=["color: "+r.link],a&&(a.text=a.text?a.text:t.getContrast(a.background),a.border=a.border?a.border:"transparent",s[o+" .cc-btn"]=["color: "+a.text,"border-color: "+a.border,"background-color: "+a.background],"transparent"!=a.background&&(s[o+" .cc-btn:hover, "+o+" .cc-btn:focus"]=["background-color: "+v(a.background)]),c?(c.text=c.text?c.text:t.getContrast(c.background),c.border=c.border?c.border:"transparent",s[o+" .cc-highlight .cc-btn:first-child"]=["color: "+c.text,"border-color: "+c.border,"background-color: "+c.background]):s[o+" .cc-highlight .cc-btn:first-child"]=["color: "+r.text]));var l=document.createElement("style");document.head.appendChild(l),e.customStyles[i]={references:1,element:l.sheet};var u=-1;for(var h in s)s.hasOwnProperty(h)&&l.sheet.insertRule(h+"{"+s[h].join(";")+"}",++u)}function v(e){return e=t.normaliseHex(e),"000000"==e?"#222":t.getLuminance(e)}function f(i){if(t.isPlainObject(i)){var n=t.hash(JSON.stringify(i)),o=e.customStyles[n];if(o&&!--o.references){var s=o.element.ownerNode;s&&s.parentNode&&s.parentNode.removeChild(s),e.customStyles[n]=null}}}function m(e,t){for(var i=0,n=e.length;i<n;++i){var o=e[i];if(o instanceof RegExp&&o.test(t)||"string"==typeof o&&o.length&&o===t)return!0}return!1}function b(){var t=this.setStatus.bind(this),i=this.options.dismissOnTimeout;"number"==typeof i&&i>=0&&(this.dismissTimeout=window.setTimeout(function(){t(e.status.dismiss)},Math.floor(i)));var n=this.options.dismissOnScroll;if("number"==typeof n&&n>=0){var o=function(i){window.pageYOffset>Math.floor(n)&&(t(e.status.dismiss),window.removeEventListener("scroll",o),this.onWindowScroll=null)};this.onWindowScroll=o,window.addEventListener("scroll",o)}}function y(){if("info"!=this.options.type&&(this.options.revokable=!0),t.isMobile()&&(this.options.animateRevokable=!1),this.options.revokable){var e=a.call(this);this.options.animateRevokable&&e.push("cc-animate"),this.customStyleSelector&&e.push(this.customStyleSelector);var i=this.options.revokeBtn.replace("{{classes}}",e.join(" "));this.revokeBtn=u.call(this,i);var n=this.revokeBtn;if(this.options.animateRevokable){var o=t.throttle(function(e){var i=!1,o=20,s=window.innerHeight-20;t.hasClass(n,"cc-top")&&e.clientY<o&&(i=!0),t.hasClass(n,"cc-bottom")&&e.clientY>s&&(i=!0),i?t.hasClass(n,"cc-active")||t.addClass(n,"cc-active"):t.hasClass(n,"cc-active")&&t.removeClass(n,"cc-active")},200);this.onMouseMove=o,window.addEventListener("mousemove",o)}}}var g={enabled:!0,container:null,cookie:{name:"cookieconsent_status",path:"/",domain:"",expiryDays:365},onPopupOpen:function(){},onPopupClose:function(){},onInitialise:function(e){},onStatusChange:function(e,t){},onRevokeChoice:function(){},content:{header:"Cookies used on the website!",message:"This website uses cookies to ensure you get the best experience on our website.",dismiss:"Got it!",allow:"Allow cookies",deny:"Decline",link:"Learn more",href:"http://cookiesandyou.com",close:"&#x274c;"},elements:{header:'<span class="cc-header">{{header}}</span>&nbsp;',message:'<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',messagelink:'<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a></span>',dismiss:'<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',allow:'<a aria-label="allow cookies" role=button tabindex="0"  class="cc-btn cc-allow">{{allow}}</a>',deny:'<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',link:'<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',close:'<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>'},window:'<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}"><!--googleoff: all-->{{children}}<!--googleon: all--></div>',revokeBtn:'<div class="cc-revoke {{classes}}">Cookie Policy</div>',compliance:{info:'<div class="cc-compliance">{{dismiss}}</div>',"opt-in":'<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}</div>',"opt-out":'<div class="cc-compliance cc-highlight">{{deny}}{{dismiss}}</div>'},type:"info",layouts:{basic:"{{messagelink}}{{compliance}}","basic-close":"{{messagelink}}{{compliance}}{{close}}","basic-header":"{{header}}{{message}}{{link}}{{compliance}}"},layout:"basic",position:"bottom",theme:"block","static":!1,palette:null,revokable:!1,animateRevokable:!0,showLink:!0,dismissOnScroll:!1,dismissOnTimeout:!1,autoOpen:!0,autoAttach:!0,whitelistPage:[],blacklistPage:[],overrideHTML:null};return n.prototype.initialise=function(e){this.options&&this.destroy(),t.deepExtend(this.options={},g),t.isPlainObject(e)&&t.deepExtend(this.options,e),r.call(this)&&(this.options.enabled=!1),m(this.options.blacklistPage,location.pathname)&&(this.options.enabled=!1),m(this.options.whitelistPage,location.pathname)&&(this.options.enabled=!0);var i=this.options.window.replace("{{classes}}",c.call(this).join(" ")).replace("{{children}}",l.call(this)),n=this.options.overrideHTML;if("string"==typeof n&&n.length&&(i=n),this.options["static"]){var o=u.call(this,'<div class="cc-grower">'+i+"</div>");o.style.display="",this.element=o.firstChild,this.element.style.display="none",t.addClass(this.element,"cc-invisible")}else this.element=u.call(this,i);b.call(this),y.call(this),this.options.autoOpen&&this.autoOpen()},n.prototype.destroy=function(){this.onButtonClick&&this.element&&(this.element.removeEventListener("click",this.onButtonClick),this.onButtonClick=null),this.dismissTimeout&&(clearTimeout(this.dismissTimeout),this.dismissTimeout=null),this.onWindowScroll&&(window.removeEventListener("scroll",this.onWindowScroll),this.onWindowScroll=null),this.onMouseMove&&(window.removeEventListener("mousemove",this.onMouseMove),this.onMouseMove=null),this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null,this.revokeBtn&&this.revokeBtn.parentNode&&this.revokeBtn.parentNode.removeChild(this.revokeBtn),this.revokeBtn=null,f(this.options.palette),this.options=null},n.prototype.open=function(t){if(this.element)return this.isOpen()||(e.hasTransition?this.fadeIn():this.element.style.display="",this.options.revokable&&this.toggleRevokeButton(),this.options.onPopupOpen.call(this)),this},n.prototype.close=function(t){if(this.element)return this.isOpen()&&(e.hasTransition?this.fadeOut():this.element.style.display="none",t&&this.options.revokable&&this.toggleRevokeButton(!0),this.options.onPopupClose.call(this)),this},n.prototype.fadeIn=function(){var i=this.element;if(e.hasTransition&&i&&(this.afterTransition&&s.call(this,i),t.hasClass(i,"cc-invisible"))){if(i.style.display="",this.options["static"]){var n=this.element.clientHeight;this.element.parentNode.style.maxHeight=n+"px"}var r=20;this.openingTimeout=setTimeout(o.bind(this,i),r)}},n.prototype.fadeOut=function(){var i=this.element;e.hasTransition&&i&&(this.openingTimeout&&(clearTimeout(this.openingTimeout),o.bind(this,i)),t.hasClass(i,"cc-invisible")||(this.options["static"]&&(this.element.parentNode.style.maxHeight=""),this.afterTransition=s.bind(this,i),i.addEventListener(e.transitionEnd,this.afterTransition),t.addClass(i,"cc-invisible")))},n.prototype.isOpen=function(){return this.element&&""==this.element.style.display&&(!e.hasTransition||!t.hasClass(this.element,"cc-invisible"))},n.prototype.toggleRevokeButton=function(e){this.revokeBtn&&(this.revokeBtn.style.display=e?"":"none")},n.prototype.revokeChoice=function(e){this.options.enabled=!0,this.clearStatus(),this.options.onRevokeChoice.call(this),e||this.autoOpen()},n.prototype.hasAnswered=function(t){return Object.keys(e.status).indexOf(this.getStatus())>=0},n.prototype.hasConsented=function(t){var i=this.getStatus();return i==e.status.allow||i==e.status.dismiss},n.prototype.autoOpen=function(e){!this.hasAnswered()&&this.options.enabled&&this.open()},n.prototype.setStatus=function(i){var n=this.options.cookie,o=t.getCookie(n.name),s=Object.keys(e.status).indexOf(o)>=0;Object.keys(e.status).indexOf(i)>=0?(t.setCookie(n.name,i,n.expiryDays,n.domain,n.path),this.options.onStatusChange.call(this,i,s)):this.clearStatus()},n.prototype.getStatus=function(){return t.getCookie(this.options.cookie.name)},n.prototype.clearStatus=function(){var e=this.options.cookie;t.setCookie(e.name,"",-1,e.domain,e.path)},n}(),e.Location=function(){function e(e){t.deepExtend(this.options={},s),t.isPlainObject(e)&&t.deepExtend(this.options,e),this.currentServiceIndex=-1}function i(e,t,i){var n,o=document.createElement("script");o.type="text/"+(e.type||"javascript"),o.src=e.src||e,o.async=!1,o.onreadystatechange=o.onload=function(){var e=o.readyState;clearTimeout(n),t.done||e&&!/loaded|complete/.test(e)||(t.done=!0,t(),o.onreadystatechange=o.onload=null)},document.body.appendChild(o),n=setTimeout(function(){t.done=!0,t(),o.onreadystatechange=o.onload=null},i)}function n(e,t,i,n,o){var s=new(window.XMLHttpRequest||window.ActiveXObject)("MSXML2.XMLHTTP.3.0");if(s.open(n?"POST":"GET",e,1),s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.setRequestHeader("Content-type","application/x-www-form-urlencoded"),Array.isArray(o))for(var r=0,a=o.length;r<a;++r){var c=o[r].split(":",2);s.setRequestHeader(c[0].replace(/^\s+|\s+$/g,""),c[1].replace(/^\s+|\s+$/g,""))}"function"==typeof t&&(s.onreadystatechange=function(){s.readyState>3&&t(s)}),s.send(n)}function o(e){return new Error("Error ["+(e.code||"UNKNOWN")+"]: "+e.error)}var s={timeout:5e3,services:["freegeoip","ipinfo","maxmind"],serviceDefinitions:{freegeoip:function(){return{url:"//freegeoip.net/json/?callback={callback}",isScript:!0,callback:function(e,t){try{var i=JSON.parse(t);return i.error?o(i):{code:i.country_code}}catch(n){return o({error:"Invalid response ("+n+")"})}}}},ipinfo:function(){return{url:"//ipinfo.io",headers:["Accept: application/json"],callback:function(e,t){try{var i=JSON.parse(t);return i.error?o(i):{code:i.country}}catch(n){return o({error:"Invalid response ("+n+")"})}}}},ipinfodb:function(e){return{url:"//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",isScript:!0,callback:function(e,t){try{var i=JSON.parse(t);return"ERROR"==i.statusCode?o({error:i.statusMessage}):{code:i.countryCode}}catch(n){return o({error:"Invalid response ("+n+")"})}}}},maxmind:function(){return{url:"//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",isScript:!0,callback:function(e){return window.geoip2?void geoip2.country(function(t){try{e({code:t.country.iso_code})}catch(i){e(o(i))}},function(t){e(o(t))}):void e(new Error("Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"))}}}}};return e.prototype.getNextService=function(){var e;do e=this.getServiceByIdx(++this.currentServiceIndex);while(this.currentServiceIndex<this.options.services.length&&!e);return e},e.prototype.getServiceByIdx=function(e){var i=this.options.services[e];if("function"==typeof i){var n=i();return n.name&&t.deepExtend(n,this.options.serviceDefinitions[n.name](n)),n}return"string"==typeof i?this.options.serviceDefinitions[i]():t.isPlainObject(i)?this.options.serviceDefinitions[i.name](i):null},e.prototype.locate=function(e,t){var i=this.getNextService();return i?(this.callbackComplete=e,this.callbackError=t,void this.runService(i,this.runNextServiceOnError.bind(this))):void t(new Error("No services to run"))},e.prototype.setupUrl=function(e){var t=this.getCurrentServiceOpts();return e.url.replace(/\{(.*?)\}/g,function(i,n){if("callback"===n){var o="callback"+Date.now();return window[o]=function(t){e.__JSONP_DATA=JSON.stringify(t)},o}if(n in t.interpolateUrl)return t.interpolateUrl[n]})},e.prototype.runService=function(e,t){var o=this;if(e&&e.url&&e.callback){var s=e.isScript?i:n,r=this.setupUrl(e);s(r,function(i){var n=i?i.responseText:"";e.__JSONP_DATA&&(n=e.__JSONP_DATA,delete e.__JSONP_DATA),o.runServiceCallback.call(o,t,e,n)},this.options.timeout,e.data,e.headers)}},e.prototype.runServiceCallback=function(e,t,i){var n=this,o=function(t){s||n.onServiceResult.call(n,e,t)},s=t.callback(o,i);s&&this.onServiceResult.call(this,e,s)},e.prototype.onServiceResult=function(e,t){t instanceof Error||t&&t.error?e.call(this,t,null):e.call(this,null,t)},e.prototype.runNextServiceOnError=function(e,t){if(e){this.logError(e);var i=this.getNextService();i?this.runService(i,this.runNextServiceOnError.bind(this)):this.completeService.call(this,this.callbackError,new Error("All services failed"))}else this.completeService.call(this,this.callbackComplete,t)},e.prototype.getCurrentServiceOpts=function(){var e=this.options.services[this.currentServiceIndex];return"string"==typeof e?{name:e}:"function"==typeof e?e():t.isPlainObject(e)?e:{}},e.prototype.completeService=function(e,t){this.currentServiceIndex=-1,e&&e(t)},e.prototype.logError=function(e){var t=this.currentServiceIndex,i=this.getServiceByIdx(t);console.error("The service["+t+"] ("+i.url+") responded with the following error",e)},e}(),e.Law=function(){function e(e){this.initialise.apply(this,arguments)}var i={regionalLaw:!0,hasLaw:["AT","BE","BG","HR","CZ","CY","DK","EE","FI","FR","DE","EL","HU","IE","IT","LV","LT","LU","MT","NL","PL","PT","SK","SI","ES","SE","GB","UK"],revokable:["HR","CY","DK","EE","FR","DE","LV","LT","NL","PT","ES"],explicitAction:["HR","IT","ES"]};return e.prototype.initialise=function(e){t.deepExtend(this.options={},i),t.isPlainObject(e)&&t.deepExtend(this.options,e)},e.prototype.get=function(e){var t=this.options;return{hasLaw:t.hasLaw.indexOf(e)>=0,revokable:t.revokable.indexOf(e)>=0,explicitAction:t.explicitAction.indexOf(e)>=0}},e.prototype.applyLaw=function(e,t){var i=this.get(t);return i.hasLaw||(e.enabled=!1),this.options.regionalLaw&&(i.revokable&&(e.revokable=!0),i.explicitAction&&(e.dismissOnScroll=!1,e.dismissOnTimeout=!1)),e},e}(),e.initialise=function(t,i,n){var o=new e.Law(t.law);i||(i=function(){}),n||(n=function(){}),e.getCountryCode(t,function(n){delete t.law,delete t.location,n.code&&(t=o.applyLaw(t,n.code)),i(new e.Popup(t))},function(i){delete t.law,delete t.location,n(i,new e.Popup(t))})},e.getCountryCode=function(t,i,n){if(t.law&&t.law.countryCode)return void i({code:t.law.countryCode});if(t.location){var o=new e.Location(t.location);return void o.locate(function(e){i(e||{})},n)}i({})},e.utils=t,e.hasInitialised=!0,window.cookieconsent=e}}(window.cookieconsent||{});
/*!
 * @preserve
 *
 * Readmore.js jQuery plugin
 * Author: @jed_foster
 * Project home: http://jedfoster.github.io/Readmore.js
 * Licensed under the MIT license
 *
 * Debounce function from http://davidwalsh.name/javascript-debounce-function
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){"use strict";function e(t,e,i){var o;return function(){var n=this,a=arguments,s=function(){o=null,i||t.apply(n,a)},r=i&&!o;clearTimeout(o),o=setTimeout(s,e),r&&t.apply(n,a)}}function i(t){var e=++h;return String(null==t?"rmjs-":t)+e}function o(t){var e=t.clone().css({height:"auto",width:t.width(),maxHeight:"none",overflow:"hidden"}).insertAfter(t),i=e.outerHeight(),o=parseInt(e.css({maxHeight:""}).css("max-height").replace(/[^-\d\.]/g,""),10),n=t.data("defaultHeight");e.remove();var a=o||t.data("collapsedHeight")||n;t.data({expandedHeight:i,maxHeight:o,collapsedHeight:a}).css({maxHeight:"none"})}function n(t){if(!d[t.selector]){var e=" ";t.embedCSS&&""!==t.blockCSS&&(e+=t.selector+" + [data-readmore-toggle], "+t.selector+"[data-readmore]{"+t.blockCSS+"}"),e+=t.selector+"[data-readmore]{transition: height "+t.speed+"ms;overflow: hidden;}",function(t,e){var i=t.createElement("style");i.type="text/css",i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),t.getElementsByTagName("head")[0].appendChild(i)}(document,e),d[t.selector]=!0}}function a(e,i){this.element=e,this.options=t.extend({},r,i),n(this.options),this._defaults=r,this._name=s,this.init(),window.addEventListener?(window.addEventListener("load",c),window.addEventListener("resize",c)):(window.attachEvent("load",c),window.attachEvent("resize",c))}var s="readmore",r={speed:100,collapsedHeight:200,heightMargin:16,moreLink:'<a href="#">Read More</a>',lessLink:'<a href="#">Close</a>',embedCSS:!0,blockCSS:"display: block; width: 100%;",startOpen:!1,blockProcessed:function(){},beforeToggle:function(){},afterToggle:function(){}},d={},h=0,c=e(function(){t("[data-readmore]").each(function(){var e=t(this),i="true"===e.attr("aria-expanded");o(e),e.css({height:e.data(i?"expandedHeight":"collapsedHeight")})})},100);a.prototype={init:function(){var e=t(this.element);e.data({defaultHeight:this.options.collapsedHeight,heightMargin:this.options.heightMargin}),o(e);var n=e.data("collapsedHeight"),a=e.data("heightMargin");if(e.outerHeight(!0)<=n+a)return this.options.blockProcessed&&"function"==typeof this.options.blockProcessed&&this.options.blockProcessed(e,!1),!0;var s=e.attr("id")||i(),r=this.options.startOpen?this.options.lessLink:this.options.moreLink;e.attr({"data-readmore":"","aria-expanded":this.options.startOpen,id:s}),e.after(t(r).on("click",function(t){return function(i){t.toggle(this,e[0],i)}}(this)).attr({"data-readmore-toggle":s,"aria-controls":s})),this.options.startOpen||e.css({height:n}),this.options.blockProcessed&&"function"==typeof this.options.blockProcessed&&this.options.blockProcessed(e,!0)},toggle:function(e,i,o){o&&o.preventDefault(),e||(e=t('[aria-controls="'+this.element.id+'"]')[0]),i||(i=this.element);var n=t(i),a="",s="",r=!1,d=n.data("collapsedHeight");n.height()<=d?(a=n.data("expandedHeight")+"px",s="lessLink",r=!0):(a=d,s="moreLink"),this.options.beforeToggle&&"function"==typeof this.options.beforeToggle&&this.options.beforeToggle(e,n,!r),n.css({height:a}),n.on("transitionend",function(i){return function(){i.options.afterToggle&&"function"==typeof i.options.afterToggle&&i.options.afterToggle(e,n,r),t(this).attr({"aria-expanded":r}).off("transitionend")}}(this)),t(e).replaceWith(t(this.options[s]).on("click",function(t){return function(e){t.toggle(this,i,e)}}(this)).attr({"data-readmore-toggle":n.attr("id"),"aria-controls":n.attr("id")}))},destroy:function(){t(this.element).each(function(){var e=t(this);e.attr({"data-readmore":null,"aria-expanded":null}).css({maxHeight:"",height:""}).next("[data-readmore-toggle]").remove(),e.removeData()})}},t.fn.readmore=function(e){var i=arguments,o=this.selector;return e=e||{},"object"==typeof e?this.each(function(){if(t.data(this,"plugin_"+s)){var i=t.data(this,"plugin_"+s);i.destroy.apply(i)}e.selector=o,t.data(this,"plugin_"+s,new a(this,e))}):"string"==typeof e&&"_"!==e[0]&&"init"!==e?this.each(function(){var o=t.data(this,"plugin_"+s);o instanceof a&&"function"==typeof o[e]&&o[e].apply(o,Array.prototype.slice.call(i,1))}):void 0}});