/*

ga(document).ready(function(){
ga('#new-buc').BUC(

{
        host: _THEME + '/js/cmd/BUC/',
		open_button: '<a class="bopen_button" href="javascript:void(0);">Demo</a>',

        // Background style
        vegas: {
            overlay: true,
            shuffle: true,

            firstTransition: 'fade',
            firstTransitionDuration: 8000,

            delay: 26000,
            preloadImage: true,
            transition: ['fade', 'fade2', 'blur', 'blur2'],

            transitionDuration: 2000,
            slides: [

                {
                    src: _THEME + '/js/cmd/BUC/assets/vegas/images/1.png?v=2'
                },
                {
                    src: _THEME + '/js/cmd/BUC/assets/vegas/images/2.png?v=2'
                },
                {
                    src: _THEME + '/js/cmd/BUC/assets/vegas/images/3.jpg?v=2'
                },
                {
                    src: _THEME + '/js/cmd/BUC/assets/vegas/images/4.png?v=2'
                },
                {
                    src: _THEME + '/js/cmd/BUC/assets/vegas/images/5.jpg?v=2'
                },
                {
                    src: _THEME + '/js/cmd/BUC/assets/vegas/images/6.jpg?v=2'
                },
                {
                    src: _THEME + '/js/cmd/BUC/assets/vegas/images/7.jpg?v=2'
                },
                {
                    src: _THEME + '/js/cmd/BUC/assets/vegas/images/8.jpg?v=2'
                }
            ]
        },

        blocks: [

            // calendar
            {
                html: '<div data-social="birthday" class="birthday_cnt"><div class="celeb_info">\
															<div class="celeb_name">&nbsp;</div>\
															<div class="celeb_age">&nbsp;</div>\
															<div class="celeb_twitter">&nbsp;</div>\
															</div>\
															<div class="today_date"><div class="today_number t_number"></div><div class="today_day_name"></div></div></div>',

                color: '#603cba',
                size: 'size21'


            },

            // weather
            {
                title: 'Block One',
                color: '#3498db',
                size: 'size22',
                html: '<div data-social="weather" class="weather_forecast">\
													<div class="weather_forecast_img" id="weather_forecast_img"></div>\
													<div class="weather_data_cnt">\
													<div class="weather_cnt_padding">\
													<div class="weather_grades_celsius t_number"></div>\
													<div class="weather_city_name ff"></div>\
													<div class="weather_descr ff"></div>\
													<div class="weather_icon"><img/></div>\
													<ul class="weather_bottom_i">\
													<li><div class="weatherli">Pressure:<span id="weather_pressure"></span></div></li>\
													<li><div class="weatherli">Humidity:<span id="weather_humidity"></span></div></li>\
													</ul>\
													</div>\
													</div>\
													</div>'

            },

            // instagram
            {
                html: '<header buc-open-gallery data-categ="instagram" class="instagram_top_header_ic"><i class="instagram_logo"></i></header><div data-social="instagram" class="nano" id="instagramnano"><div  id="instagramfeed" class="cycle-slideshow nano-content"></div></div>',

                color: '#fafafa',
                size: 'size23'


            },

            // flickr
            {
                html: '<header buc-open-gallery data-categ="flickr" class="flickr_top_header_ic"><i class="flickr_logo"></i></header><div data-social="flickr" class="flickr_im"></div>',

                color: '#333',
                size: 'size21'


            },


            // twitter
            {
                html: '<header buc-open-gallery data-categ="twitter" class="twt_top_header_ic"><i class="twt_logo"></i></header><div data-social="twitter" class="twtnano nano"><div id="twt_wall" class="twt_wall nano-content"></div></div>',

                color: '#1da1f2',
                size: 'size44'



            },

            // pinterest
            {
                html: '<header buc-open-gallery data-categ="pinterest" class="pinterest_top_header_ic"><i class="pinterest_logo"></i></header><div data-social="pinterest" class="pinterestnano nano" id="pinterestnano"><div class="pinterest_wall nano-content"></div></div>',

                color: '#bd081c',
                size: 'size44'


            },


            // news
            {
                html: '<header style="display:none;" buc-open-gallery data-categ="news" class="news_top_header_ic"></header><div data-social="news" id="news_wall" class="news_wall"></div>',

                color: '#b11840',
                size: 'size21'



            },


            //facebook
            {
                html: '<header buc-open-gallery data-categ="facebook" class="facebook_top_header_ic"><i class="facebook_logo"></i></header><div data-social="facebook" class="nano" id="facebooknano"><div id="facebookwall" class="facebook_wall nano-content"></div></div>',

                color: '#4457a5',
                size: 'size23'

            },

            //youtube
            {
                html: '<header buc-open-gallery data-categ="youtube" class="youtube_top_header_ic"><i class="youtube_logo"></i></header><div data-social="youtube" id="youtubewall" class="youtube_wall"><div id="yt-slider-cnt" class="yt-slider-cnt"></div></div>',

                color: '#f00',
                size: 'size21'


            },
            // tumblr
            {
                html: '<header buc-open-gallery data-categ="tumblr" class="tumblr_top_header_ic"><i class="tumblr_logo"></i></header><div data-social="tumblr" id="tumblrnano" class="nano tumblr_wall"><div id="tb-slider-cnt" class="tb-slider-cnt nano-content"></div></div>',

                color: '#36465d',
                size: 'size44'


            },

            // maps
            {
                html: '<div id="gmaps" class="gmaps"></div>',

                color: '#ddd',
                size: 'size23'

            }

        ],
        // Social Networks
        wall: {


            news: {

                newsurl: _THEME + '/js/cmd/BUC/templates/news/news-api.php', // url api
                apiKey: '1a3fe735a7aa41cc9e926c4aa045538f', // your api key
                source: 'bbc-news', // list of sources here https://newsapi.org/sources
                category: 'general', // available categories [business, entertainment, gaming, general, music, politics, science-and-nature, sport, technology].
                //sortby: 'latest', // available options [latest,popular,top]
                language: 'en', // Possible options: en, de, fr.
                country: 'us', // Possible options: au, de, gb, in, it, us.
                markup: '<div class="news-block-img bucblockitem" style="background-image:url({{news-image}})">\
					<a href="{{news-link}}" target="_blank" class="news-block-a"></a>\
					<div class="news-title"><div class="news-title1"><a href="javascript:void(0);" onclick="$(\'.news_top_header_ic\').trigger(\'click\');" buc-open-gallery data-categ="news"><i class="news-ic"></i></a><span class="news-title-text">{{news-title}}</div></div></div></div>'
            },
			instagram: {
				
                get: 'user',
                userId: '22832340',// INSTAGRAM PAGE ID 

                accessToken: '4784198969.ba4c844.62f855e7f91f480eb231516c3bf768f4', // YOUR accessToken

                filter_result_limit: 40, // Limit of posts in filter mode
			    limit: 15, // limit of posts
				
				
				template: '<div  class="instagram_feed bucblockitem"><div class="instgr_header">' +
                    '<div class="instgr_profile_picture"><img src="{{model.caption.from.profile_picture}}"/></div>' +
                    '<div class="instgr_feedtitle"><div class="instgr_profile_name instgr_074f">{{model.caption.from.username}}</div>' +
                    '<div class="instgr_location instgr_074f">{{model.location.name}}</div>' +
                    '</div></div>' +

                    '<div class="instgr_cnt">' +
                    '{{model.template_vd_img}}' +
                    '</div>' +

                    '<div class="instgr_footer">' +
                    '<span class="instgr_likes instgr_footer_counts">{{model.likes.roundcount}} likes</span>' +
                    '<span class="instgr_footer_bullet">&#8226;</span>' +
                    '<span class="instgr_comments instgr_footer_counts">{{model.comments.count}} comments</span>' +
                    '<div class="instgr_caption_descr">{{model.caption.text}}</div>' +
                    '<div class="instgr_added_feed_time">{{model.time}} ago</div>' +
                    '</div>' +

                    '</div>'
				
				
			},
            facebook: {
                fburl: _THEME + '/js/cmd/BUC/templates/facebook/fb-api.php',
                fb_app_id: '315846842541009', // YOUR FACEBOOK APP ID
                fb_app_secret: '12230f21541963b3ac835428fc604fa7', // YOUR FACEBOOK APP SECRET
                page: 'ufc', // FACEBOOK PAGE NAME OR ID 
                result_limit: 4, // POSTS LIMIT
                filter_result_limit: 40, // POSTS LIMIT IN FILTERED 
                wall_type: 'feed', // FEED OR POSTS,
                markup: {


                    wall: '<div class="fbwall-block bucblockitem">\
					\
					\
								  <header class="fb-header">\
								  <div class="fbpg-ic"><img src="{{fb-header-ic}}" /></div>\
								  <div class="fb-header-txt"><div class="fb-header-name">{{fb-header-name}}</div>\
								  <div class="fb-header-added">{{fb-header-created}}</div></div>\
								  </header>\
					\
					\
									<div class="fb-content">\
									<div class="fb-descr">{{fb-cnt-description}}</div>\
										{{fb-attachment-type}}\
									</div>\
									<div class="fb-footer"><div class="fb-comm-count">{{fb-comments-count}} comments</div><span class="fb_footer_bullet">&#8226;</span><div class="fb-likes-count">{{fb-likes-count}} likes</div></div>\
								  </div>',

                    _cnt_video: '<div id="fbwallvd{{fb-wall-id}}" class="fb-wall-video-cnt">  \
				  <div class="fb_video_controls_play" button-vd-play="1" onclick="document.getElementById(\'fbwallvd{{fb-wall-id}}\').classList.add(\'playing\');var fb_video_tag = document.getElementById(\'fb_player_{{fb-wall-id}}\');fb_video_tag.setAttribute(\'controls\',\'true\');fb_video_tag.play()">\
				  <div class="fb_ic_play">&nbsp;</div>\
				  </div>\
				  <div class="fb_video_controls_pause" button-vd-pause="1" onclick="document.getElementById(\'fbwallvd{{fb-wall-id}}\').classList.remove(\'playing\');var fb_video_tag = document.getElementById(\'fb_player_{{fb-wall-id}}\'); fb_video_tag.removeAttribute(\'controls\');fb_video_tag.pause()">\
				  <div class="fb_ic_pause">&nbsp;</div>\
				  </div>\
				  <video id="fb_player_{{fb-wall-id}}" width="100%" height="auto" style="max-height:{{fb-max-video-height}}px;" poster="{{fb-video-poster}}" loop="false">\
				  <source src="{{fb-video-src}}" type="video/mp4" /></video>\
				  </div>',

                    _cnt_image: '<div class="fb-wall-image"><img src="{{fb-image-src}}" /></div>'

                }
            },
            youtube: {

                yturl: 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=',
                channelID: 'UCk8XGxi7fsTqQQRVq9LSraw', // channel id
                order: 'date', // available opts [ date, rating, relevance, title ]
                key: 'AIzaSyDkWfm9LViG3qKV5yEHazHbs_dguSEUV2o', // YOUTUBE API KEY
                limit: 9, // Results limit
                filter_result_limit: 40, // POSTS LIMIT IN FILTER MODE
                markup: '<div class="ytwall-block bucblockitem"><div class="yt-bg-thumb" style="background-image:url({{yt-thumb}});"><div class="yt-video-btn"><div id="{{yt-vd-id}}" class="yt_video_play_btn" title="Play"></div></div></div><div class="yt-text"><div class="yt-title"><a href="https://www.youtube.com/watch?v={{yt-vd-id}}" target="_blank">{{yt-title}}</a></div><div class="yt-added">{{yt-added}}</div></div></div>'


            },

            twitter: {
                twturl: _THEME + '/js/cmd/BUC/templates/twitter/twitter-api.php',
                twt_consumer_key: 'lJhiGPKLflNXM9GT49SwJs5RE', // YOUR TWT CONSUMER KEY
                twt_consumer_secret: '0dpL7SDUNpHSW7jvMNLlINck4hAU5O5MyXDHczCvoN2CqXs0Vb', // YOUR TWT CONSUMER KEY SECRET
                twt_oauth_access_token: '3110872181-0gRZk1bBj9SxRpJCHpMj057Fm7GA8J3BLATOrCz', // YOUR TWT ACCESS TOKEN 
                twt_oauth_access_token_secret: 'QECmXT1u67a0YI3TB3HRB1l21G72hTQbwQERul3nOGUg4', // YOUR TWT ACCESS TOKEN SECRET
                page: 'ufc', // PAGE NAME
                result_limit: 4, // LIMIT
                filter_result_limit: 40, // POSTS LIMIT IN FILTER MODE
                exclude_replies: true,
                include_rts: false,
                include_entities: true,
                markup: {


                    wall: '<div class="twtwall-block bucblockitem">\
					\
					\
								  <header class="twt-header">\
								  <div class="twtpg-ic"><img src="{{twt-header-ic}}" /></div>\
								  <div class="twt-header-txt"><div class="twt-header-name"><span class="twt-hdname">{{twt-header-name}}</span>&nbsp;<span class="twt-username">@{{twt-username}}</span><span class="twt_separator_bullet">&#8226;</span><span class="twt-created">{{twt-header-created}}</span></div>\
								  <div class="twt-header-descr">{{twt-cnt-description}}</div></div>\
								  </header>\
					\
					\
									<div class="twt-content">\
										{{twt-attachment-type}}\
									</div>\
									<div class="twt-footer"></div>\
								  </div>',

                    _cnt_video: '<div id="twtwallvd{{twt-wall-id}}" class="twt-wall-video-cnt">  \
				  <div class="twt_video_controls_play" button-vd-play="1" onclick="document.getElementById(\'twtwallvd{{twt-wall-id}}\').classList.add(\'playing\');var twt_video_tag = document.getElementById(\'twt_player_{{twt-wall-id}}\');twt_video_tag.setAttribute(\'controls\',\'true\');twt_video_tag.play()">\
				  <div class="twt_ic_play">&nbsp;</div>\
				  </div>\
				  <div class="twt_video_controls_pause" button-vd-pause="1" onclick="document.getElementById(\'twtwallvd{{twt-wall-id}}\').classList.remove(\'playing\');var twt_video_tag = document.getElementById(\'twt_player_{{twt-wall-id}}\'); twt_video_tag.removeAttribute(\'controls\');twt_video_tag.pause()">\
				  <div class="twt_ic_pause">&nbsp;</div>\
				  </div>\
				  <video id="twt_player_{{twt-wall-id}}" width="100%" height="auto" style="max-height:{{twt-max-video-height}}px;" poster="{{twt-video-poster}}" loop="false">\
				  <source src="{{twt-video-src}}" type="video/mp4" /></video>\
				  </div>',

                    _cnt_image: '<div class="twt-wall-image"><img src="{{twt-image-src}}" /></div>'

                }
            },


            pinterest: {
                pinurl: _THEME + '/js/cmd/BUC/templates/rss/rss.php',
                page: 'ufc', // PAGE NAME
                limit: 4, // LIMIT
                filter_result_limit: 25, // LIMIT OF POSTS IN FILTER MODE
                markup: {


                    wall: '<div class="pinwall-block bucblockitem">\
				\
									<div class="pin-content">\
										<div class="pin-attch"><img src="{{pin-image-src}}" /></div>\
										<div class="pin-text">{{pin-text}}</div>\
									</div>\
									<div class="pin-footer"><div class="pin-avatar"><img class="round" width="24" height="24" avatar="{{pin-feed-title}}"></div><div class="pin-feedtitle">{{pin-feed-title}}</div><div class="pin-created">{{pin-created}}</div></div>\
								  </div>'

                }
            },

            tumblr: {

                page: 'ufc', // PAGE NAME
                limit: 6, // POSTS LIMIT
                filter_result_limit: 40, // LIMIT OF POSTS IN FILTER MODE
                markup: {


                    wall: '<div class="tumblrwall-block bucblockitem">\
				\
									<div class="tumblr-content">\
										<div class="tumblr-caption">{{tumblr-caption}}</div>\
										<div class="tumblr-attach"><a href="{{tb-post-url}}" target="_blank">{{tb-attachment-type}}</a></div>\
									</div>\
									<div class="tumblr-footer"><div class="tb-page-ic"><img src="{{tb-page-ic}}" /></div><A href="{{tb-page-url}}" target="_blank"><div class="tb-pagetitle">{{tb-title}}</div></a><div class="tb-right-time">{{tb-timestamp}}</div></div>\
								  </div>',
                    _cnt_video: '<div class="tb-wall-video">{{tumblr-video}}</div>',



                    _cnt_image: '<div class="tb-wall-image"><img src="{{tb-image-src}}" /></div>'

                }



            },

            gmaps: {

                url: 'https://maps.googleapis.com/maps/api/js?',
                apikey: 'AIzaSyCLlnEW1shPJ5ubJBfJ0eCt8_02zRsQFEE',
                center: {
                    lat: -34.397,
                    lng: 150.644
                },
                zoom: 6



            }


        }

    }

);
});

*/