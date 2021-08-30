/*

Kontackt License Agreement (DMCA License)

Copyright (c) 2015, Alex Dobrovolscki (dobriisasa@gmail.com)
All rights reserved.

* Redistributions of source code is strictly forbidden.

* By using Kontackt you may have your own purchase copy, if you are not own a license, you can buy one from https://codecanyon.net/user/dobrovolscki/portfolio.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

//Settings
var settings = {


    host: __SITEURL, // your hostname

    catselectoninit: 'popular', // set category in the left menu when the initialize. You can choose -> [ playlist, upload, purchased, radio, MYmusic ]

    musicpth: '/music/', // folder name of files

    manageMyMusic: 'ajax/exec_query', // filename and location where execute all ajax queries

    search_engine: 'search/index', // file that generates search suggestions

    phpFileName: 'index', // the filename from all folders. [default index.php], you can change whatever you want.

    uploadFolder: '/mp3Files/', // name of the folder where all the mp3 files will be uploaded.

    playerLoaderClass: 'mus_player_loader', // loader class when music player is initializing

    ajaxLoadingIcon: false, // boolen: true/false, show or not the ajax loading icon in the top right

    cr_audioTag: jQuery('<audio></audio>').attr({
        'src': '',
        'id': 'audioTag',
        'preload': 'auto'
    }), // construct the audio tag

    MusicWIndowTitle: ' - Music', // the second title of page, when music is visible on screen

    originalTitle: document.title, // the original title of site

    ajax_loader: '../music/images/light/light_load.gif', // simple loader icon, when music is initialize

    noReadPlaylistCover: '/music/images/collection.png', // the default cover for all songs who don't have a cover

    artistCoverError: '/music/css/images/feed_cover.png', // replace the dead covers with our default cover

    layerPopup: 'popup/enable_popup.php', // filename that run the popups

    errorReportingCSS: 'mus_errorReporting', // error reporting style ['mus_errorReporting', 'm_s_song_error']

    showPlayingNotification: true, /// boolean: true/false, show or not "now playing" bar in left bottom of page

    showShare: 'block', // show or not Share button on top header, use: 'block' or 'none', NOTE: you need to build your sharing engine

    displayLyrics: 'block', /// display or not lyrics button

    show_admin: 'block', // display or not feedback panel, use: block or none

    socplusMusicLayerWidth: 970, // this work only for resizing

    socplusMusicLayerHeight: 710, // is only for resizing

    popupLayerZ: false, // increases the oemusic popup, boolean: true/false, only in chrome

    popupLayerToCenter: false, // set the socplusMusic popup to center of page

    changeDOCtitle: true, // change the title of document with the current playing song

    loader_img: '/music/css/images/loader.gif', // simple loader icon, but isn't in use

    uploadfile: 'upload/index.php', // the filename for upload mp3 files

    feedbackUpload: 'feedback/uploadFile.php', // the filename for uploading feedback attachments

    defaultVolume: 33, // the default volume of player, max value is 220. NOTE: the default volume works only when the user deletes cookies

    uphistorylist: false, // update the history of songs heard after every song played

    maximumFileUpload: '4', // you can upload multiple files at once, here set limit, default value 0 = 20, you can choose a number between 1-20

    errorTimeout: 9000, // error reporting close, time in milliseconds

    showLoaderTimeout: 500, // time in milliseconds, when the server is busy show loader icon

    load_without_ovr: false, // boolean: true|false, show loading icon without overlay

    AjaxLoadingTimeOut: 25000, /// timeout for ajax request, milliseconds.

    errorAutoClose: true, // auto close error reporting, boolean: true | false

    errorMaximumFileTxt: "Error! Your action can't be continued, you cannot upload more than %s files.", // informative text.

    AnimateSortable: false, // boolean: true|false, the items will animate with the default duration, OR [number] the duration for the animation, in milliseconds.

    AnimateCoverTime: 500, // slow/fast or number, - time in milliseconds for animation of cover

    autoplay: false, // autoplay the first song, boolean: true/false

    playerTrackError: false, // boolean: true/false, if the song does not play, show error.

    playerTrackErrorText: 'Error at loading song, please try again, or make an refresh.', // informative text. 

    updatePLDOTNotif: 5, // time in minutes. check for new music in my collections, and turn on the green lamp.

    hideOnESC: true, // boolean: true|false, hide the socplusMusic popup when ESCkey is pressed

    hideOnOverlay: true, // boolean: true|false, hide the socplusMusic popup at overlay click event

    delete_died_covers: false // boolean: true|false, delete died covers for save memory



};


// vars
var m_custom_width = 988;
var activeclass = '__active';
var disabledClass = '__disabled';
var hiddenClass = 'm_hidden';
var pl_playing_class = 'mus_card__playing';
var pl_added_class = 'mus_card__added';
var pointerClass = "__pointer_none";
var mu_i_play = 'mus_album_i_play';
var mcontent = jQuery('#msic_content');
var ur = window.location.href;
var filesPath = settings.musicpth + settings.uploadFolder;
var $window = jQuery(window);
var $document = jQuery(document);
var $body = jQuery('body');
var overlay = jQuery('.layer_ovr');
var socplusMusicLcnt = jQuery('.layer_cnt');
var socplusMusicLTop = jQuery('.layer_top');
var hback = jQuery('.mus_back');
var sTargetId = 'msic_content';
var updated_ListofTracks, definedNext, K_ListOfTracks, d_storedTrack;
var audio_tg = jQuery('audio');
var popular = jQuery('#lmSecm_sec_best'),
    playlist = jQuery('#lmSecm_sec_collections'),
    upload = jQuery('#lmSecm_sec_upload'),
    purchased = jQuery('#lmSecm_sec_downloaded'),
    radio = jQuery('#lmSecm_sec_my_radio'),
    my_music = jQuery('#lmSecm_sec_klass'),
    my_musUpl = jQuery('#uploadedmu'),
    createPlaylist = jQuery('#mus_createPlaylist'),
    mus_usersearch = jQuery('.mus_user-search'),
    mus_notif_c = jQuery('.mml_notif'),
    ol_li = socplusMusicLcnt.find('ol li'),
    left_side_scroll = jQuery('#mlLM'),
    btn_search_gl = jQuery('#mus_search_gl'),
    search_input_gl = jQuery('input.search-input_it'),
    my_music_dot_notif = jQuery('#mus_sec_dot_m_sec_klass'),
    m_maft_sh = jQuery('.mus_inds'),
    sl_vol_m_y = readCookie('mus_dfvl'),
    current_h_addr = window.location.href,
    layer_popups = false,
    d_w_l = 0,
    d_h_l = 0,
    l_m_cnt = jQuery('.layer_main_cnt'),
    m_l_col = jQuery('.layer_col-aux'),
    sl_vol_m = sl_vol_m_y,
    df_o = 0,
    errorOcurred = 0,
    curr_playing_song = 0,
    curr_history_addr_sl_ie_b_th_9 = (isIE() ? 5 : 2),
    curr_history_addr_sl_ie_s_th_9 = 8,
    find_track_df_height = null,
    isShuffle = readCookie('mus_shuffle'),
    isRepeat = readCookie('mus_repeat'),
    my_mus_notif = jQuery('#sec_cnt_m_sec_klass'),
    leftcollection = jQuery('ul#lmPPLlst'),
    pl_card = 'mml_ucard_img',
    up_h_meth = 'h_in',
    search_typingTimer = null,
    search_doneTypingInterval = 500,
    activeTab = false,
    __manip_toolbar_btn = null,
    myMusSubCat = false,
    contenteditable = false,
    act_header_dropDown,
    recently_added = 0,
    radio_active = false,
    curr_history_addr = null,
    no_mus_preview_loader = false,
    mus_sroll_ov,
    M_toEndPlayList,
    run_layer_popup,
    close_layer_popup,
    close_recent_dropDown,
    sharing_dropDown_active,
    lyrics_dropDown_active,
    last_upl_dropDown_active,
    isProcessing,
    _song_id,
    update_cover_timeout,
    remove_dot_notif,
    shrink_popups,
    upload_success = false,
    mus_shmore_brgq = false,
    mbsubc = false,
    video_stopped_audio = false,
    windowTabActive = true,
    s_all_fr = false,
    search_suggestion_disable = false,
    rnfn = false,
    global_scrolling = false,
    add_pl_one_req = false,
    get_lyrics,
    rptmus = true,
    my_mus_page,
    my_ply_page,
    upload_popup,
    no_cach,
    doneTyping_Interval,
    livesearch_res,
    ajax_return_prev_page,
    history_playing = false,
    radio_mus_data = null,
    radio_playing = false,
    sliderOn = false,
    readFromPopup = false,
    dropDownActive = false,
    recommendation_loaded = false,
    upd_hb_count = false,
    playing_playlist = null,
    selectDb = null,
    up_prev_shuffle = audio_tg.attr('track-id'),
    up_next = 0,
    up_prev = 0,
    newSession = false,
    endSessionTabs = false,
    defaultPlayLst = false,
    loaded_more_s = false,
    mus_loading_scroll = true,
    xmlHttpTimeout = null,
    Aj_high_load = null,
    upPrev = null,
    m_noAjax,
    upload_poup_qued,
    upload_count,
    clear_suggestion,
    definedPrev = null,
    ListofTracks = null,
    uploaded_in_playlist = null,
    defaultVolumefst = null,
    dropDownTimeout = null,
    videos_pushed,
    initsessiongtus = false,
    track_loading_progress = false,
    saddedHTML = null,
    now_playing = true,
    lngofol = 0,
    stop_update = 0,
    timeoutGetData = 1000,
    selctdC = 0,
    history_up_time = 0,
    taimout = 0,
    bIsLoading = 0,
    hbk_count = 0,
    mus_zooming = 0,
    a_page = 1,
    recommended = false,
    selectedTabCount = 0,
    troubl_prev_pages = 2,
    ajax_update_href_links = null,
    db_check_mus_updated = true,
    selectedTabCreateHTML = '',
    selectedTabDb = {},
    createdListofTracks = {},
    playListIndexTrack = {},
    db_user_history = [],
    db_check_mymus = [],
    db_check_my_playlist = [],
    db_playlists_from_search = [],
    db_navigation_ajax = [],
    db_loaded_content = [],
    db_videos = [];




var __constructPlayer = new(function(h, o, g, e) {

    // append audio tag
    jQuery('<img></img>').attr({
        'src': settings.loader_img,
        'border': '0',
        'class': settings.playerLoaderClass
    }).appendTo('div.layer_top.usel-off');
    jQuery('.' + settings.playerLoaderClass).replaceWith(settings.cr_audioTag);

    var p = function() {
        //  for (var b = /audio(.min)?.js.*/, a = document.getElementsByTagName("script"), c = 0, d = a.length; c < d; c++) {
        //  var e = a[c].getAttribute("src");
        // if (b.test(e)) return e.replace(b, "")
        // }
    }();
    g[h] = {
        instanceCount: 0,
        instances: {},
        flashSource: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;">' +
            '<param name="movie" value="$2?playerInstance=' + h + '.instances[\'$1\']&datetime=$3"> ' +
            '<param name="allowscriptaccess" value="always"><embed name="$1" src="$2?playerInstance=' +
            h + '.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always">       </object>',

        // settings for player
        settings: {
            autoplay: settings.autoplay,
            loop: false,
            preload: true,
            imageLocation: '', ///p + "player-graphics.gif",
            swfLocation: settings.host + settings.musicpth + "swf/player.swf",
            useFlash: function() {
                var b = document.createElement("audio");
                return !(b.canPlayType && b.canPlayType("audio/mpeg;").replace(/no/, ""))
            }(),
            hasFlash: function() {
                if (navigator.plugins && navigator.plugins.length && navigator.plugins["Shockwave Flash"]) return true;
                else if (navigator.mimeTypes && navigator.mimeTypes.length) {
                    var b =
                        navigator.mimeTypes["application/x-shockwave-flash"];
                    return b && b.enabledPlugin
                } else try {
                    new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    return true
                } catch (a) {}
                return false
            }(),

            // player controls html template
            createPlayer: {
                markup: '<span id="create_markup_ready" style="display:none;"><div class="mus_player-controls mus_header_i">' +
                    '<div class="mus_player-controls_i __back" title="Previous song"></div>' +
                    '<div class="mus_player-controls_i __play __pause" title="Play"></div>' +
                    '<div class="mus_player-controls_i __forward" title="The next song"></div></div>' +
                    '<div class="mus_player-volume mus_header_i">' +
                    '<div class="mus_player-volume_ic mus_player-volume_i" title="Volume"></div>' +
                    '<div class="mus_player-slider_w mus_player-volume_i"> ' +
                    '<div class="mus_player-slider __volume __anim">' +
                    '<div class="mus_player-slider_fill"></div>' +
                    '<div class="mus_player-slider_drag" style="width: 68px;"></div>' +
                    '<div class="mus_player-slider_tooltip" style="left: 68px;"></div></div> </div></div>' +
                    '<div class="mus_player_cover mus_player_i"> ' +
                    '<img class="mus_player_cover-img" aria-hidden="true" onerror=\'this.style.display="none";\' style="display:none;" src="">' +
                    '<div class="mus_player_cover-empty"></div> ' +
                    '<a class="mus_player_cover-overlay" data-header-video="0" target="_blank" onclick="jQuery.socplusMusic(\'get_track_video\',this.getAttribute(\'data-header-video\'))"> </a> </div>' +
                    '<div class="mus_player_seek mus_player_i">' +
                    '<div class="mus_player_seek mus_player_i">' +
                    '<div class="mus_player-slider_w">' +
                    '<div class="mus_player-slider __player musScrubber"> ' +
                    '<div class="mus_player-slider_fill musLoaded"></div> ' +
                    '<div class="mus_player-slider_drag progressMus" style="width: 0px;"></div> ' +
                    '<div class="mus_player-slider_tooltip progressTooltip" style="left: 0px;"></div> </div> </div></div>' +
                    '<div class="mus_player_seek-artist ellip" style="visibility: visible;">' +
                    '<div class="mus_player_artist-cnt"><span class="mus_player_artist" data-href="search" data-action="true">-</span></div>' +
                    '<span>&nbsp;-&nbsp;</span><span class="mus_player_song" data-href="search" data-action="true">-</span></div> ' +
                    '<div class="mus_player_time" id="mlSeekTime"> <span class="mus_player_played" style="visibility: visible;">0:00</span>' +
                    '<span class="mus_player_duration" style="visibility: visible;">&nbsp;/&nbsp;0:00</span> </div> ' +
                    '<div class="mus_player_info" aria-hidden="false"><div class="mus_player_status">' +
                    '<div class="mus_player_playing" aria-hidden="false"><span class="mus_player_playing-cnt">' +
                    '<span class="mus_player_playing-ic"></span>Now playing</span></div> ' +
                    '<span class="mus_player_status-uploader ' + activeclass + '"></span> </div>' +
                    '<span aria-hidden="false" class="mus_player_actions __add" id="forAdded"> ' +
                    '<span onclick=\'act_header_dropDown(document.getElementById("audioTag").getAttribute("track-id"),document.getElementById("dd_header"),document.getElementById("forAdded"),true)\'><span class="mus_player_actions-ic __add"></span> <span>add</span></span>' +
                    '<span class="mus_player_actions-cnt"> <span class="mus_player_actions-arrow" onclick=\'act_header_dropDown(document.getElementById("audioTag").getAttribute("track-id"),document.getElementById("dd_header"),document.getElementById("forAdded"))\'><div id="dd_header"></div>' +
                    '</span> </span> </span> ' +
                    /*'<div class="mus_player_actions __lyrics" style="display:'+settings.displayLyrics+';" onclick="return get_lyrics(jQuery(\'.mus_player_artist\'),jQuery(\'.mus_player_song\'));"><span class="lyrics_dropdown"></span> lyrics <span id="_lyrics_content"></span></div>' +
                     */
                    '<span class="mus_player_actions" uid="shareThisSong" style="display:' + settings.showShare + '" onclick=\'as_status(this,document.getElementById("audioTag").getAttribute("track-id"),jQuery(".mus_player_artist").text(),jQuery(".mus_player_song").text())\'> ' +
                    '<span class="mus_player_actions-ic __to-status"></span>' +
                    '<span id="mus_status_created">' + lang.music_post_to_status + '</span></span>' +

                    /* '<span style="display:'+settings.show_admin+';margin-right: 5px;" class="mus_player_actions fdbk-m_ad" data-href="feedback"><span class="glyphicon glyphicon-flag" style="font-size: 10px;  padding-right: 5px;"></span><span style="padding-left:1px;">admin</span>'+*/
                    '</span></div> </div>' +
                    '<div class="mus_player_i mus_player_shuffle" title="Shuffle"></div>' +
                    '<div class="mus_player_i mus_player_repeat" title="Loop"></div>' +
                    '<div class="mml_ac">' +
                    '<a title="Feedback" class="mml_ac_i ic mml_ic_help" onclick=\'return jQuery.socplusMusic("feedback");\'></a>' +
                    '<span title="Hide" class="mml_ac_i ic mml_ic_close" onclick=\'return jQuery.socplusMusic("hide");\'></span></div>' +
                    '<div class="mus_loadingProcess" id="m_lodingpr"></div></span>',
                playPauseClass: "__play __pause",
                scrubberClass: "musScrubber",
                progressClass: "progressMus",
                progrssTooltip: "progressTooltip",
                loaderClass: "musLoaded",
                timeClass: "mus_player_time",
                durationClass: "mus_player_duration",
                playedClass: "mus_player_played",
                errorMessageClass: "error-message",
                playingClass: "__play",
                pauseClass: "__pause",
                loadingClass: "loading",
                errorClass: "error",
                coverClass: "mus_player_cover"
            },
            css: '',
            trackEnded: function() {},
            flashError: function() {

                /*    var b = this.settings.createPlayer,
                            a = j(b.errorMessageClass, this.wrapper),
                            c = 'Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';
                    if (this.mp3) c += ' <a href="' + this.mp3 + '">Download audio file</a>.';
                    g[h].helpers.removeClass(this.wrapper, b.loadingClass);
                    g[h].helpers.addClass(this.wrapper, b.errorClass);
                    a.innerHTML = c*/
                jQuery.socplusMusic('error', null, 'Flash Error');
            },

            // show error reporting when load song
            loadError: function() {
                /* var b = this.settings.createPlayer,
                         a = j(b.errorMessageClass, this.wrapper);
                 g[h].helpers.removeClass(this.wrapper,
                         b.loadingClass);
                 g[h].helpers.addClass(this.wrapper, b.errorClass);
                 a.innerHTML = 'Error loading: "' + this.mp3 + '"'*/

                settings.playerTrackError === true ? jQuery.socplusMusic('error', null, settings.playerTrackErrorText) : null;
            },
            // initialize the player
            init: function() {
                jQuery('.mus_player_cover').addClass('initPlayer');
                //g[h].helpers.addClass(this.wrapper, this.settings.createPlayer.loadingClass)
            },
            // song started playing
            loadStarted: function() {
                var b = this.settings.createPlayer,
                    a = j(b.durationClass, this.wrapper),
                    c = Math.floor(this.duration / 60),
                    d = Math.floor(this.duration % 60);


                g[h].helpers.removeClass(this.wrapper, b.loadingClass);

                if (c >= 60) {
                    f = Math.floor(c / 60);
                    k = c % 60;
                    c = f + ':' + k;
                }

                a.innerHTML = '&nbsp;/&nbsp;' + (c < 10 ? "" : "") + c + ":" + (d < 10 ? "0" : "") + d;
				// for mini player
				//$('.mini_player.mus_player_duration').html( '&nbsp;/&nbsp;' + (c < 10 ? "" : "") + c + ":" + (d < 10 ? "0" : "") + d);
            },
            // scrubber load
            loadProgress: function(b) {
                var a = this.settings.createPlayer,
                    c = j(a.scrubberClass, this.wrapper);
                j(a.loaderClass, this.wrapper).style.width = c.offsetWidth * b + "px";
				var mini_player_scrubber = $('.header_play_scrubber');
				mini_player_scrubber.find('.mini_player_loaderClass').width(mini_player_scrubber.width() * b);
            },
            // play/pause the current playing song
            playPause: function() {
                this.playing ? this.settings.play() : this.settings.pause()
            },
            // play song
            play: function() {
                if (jQuery('audio').attr('src') == '')
                    socplusMusicLcnt.find('ol li').find('span#' + jQuery('audio').attr('track-id')).trigger('click');

                var playingTrackId = jQuery('audio#audioTag').attr('track-id');
                socplusMusicLcnt.find('ol li').find('span#' + playingTrackId)
                    .addClass(this.settings.createPlayer.pauseClass)
                    .attr('title', 'Pause')
                    .closest('li')
                    .find('div:first')
                    .addClass(activeclass);
                jQuery('.' + this.settings.createPlayer.playingClass).removeClass(this.settings.createPlayer.playingClass);
                __manip_toolbar_btn('play');
                jQuery('body #' + playingTrackId).addClass('m_portal_track_pause');

            },
            // stop playing [pause]
            pause: function() {
                var pausedTrackId = jQuery('audio#audioTag').attr('track-id');
                socplusMusicLcnt.find('ol li').find('span#' + pausedTrackId)
                    .removeClass(this.settings.createPlayer.pauseClass)
                    .attr('title', 'Play');
                jQuery('.' + this.settings.createPlayer.pauseClass).addClass(this.settings.createPlayer.playingClass);
                __manip_toolbar_btn('pause');
                jQuery('body #' + pausedTrackId).removeClass('m_portal_track_pause');
            },
            // update player head [seconds, minutes, scrubber]
            updatePlayhead: function(b) {

                var a = this.settings.createPlayer,
                    o = a,
                    c = j(a.scrubberClass, this.wrapper),
                    h = j(a.scrubberClass, this.wrapper),
                    jL = socplusMusicLcnt.find('.' + a.progressClass),
                    jT = socplusMusicLcnt.find('.' + a.progrssTooltip),
                    jS = socplusMusicLcnt.find('.' + a.scrubberClass),
                    jM = socplusMusicLcnt.find('.' + a.loaderClass),
                    g = this.duration,
                    v = jS.css('width').split('px')[0],
                    m = j(a.playedClass, this.wrapper);
                clearTimeout(track_loading_progress);
                socplusMusicLcnt.find('ol').find('span.m_play_track_load').removeClass('m_play_track_load'); //each(function() {
                ///jQuery(this).removeClass('m_play_track_load');
                ///});
                if (!sliderOn) {

                    j(o.progressClass, this.wrapper).style.width =
                        h.offsetWidth * b + "px";
                    j(o.progrssTooltip, this.wrapper).style.left =
                        h.offsetWidth * b + "px";
						
				
						
					// for mini player	
					var mini_player_sc = $('.header_play_scrubber');
                    $('.mini_progressbar').width( mini_player_sc.width() * b );
                    $('.mini_progressTooltip').css( 'left',mini_player_sc.width() * b );

                    a = j(a.playedClass, this.wrapper);
                    c = this.duration * b;
                    b = Math.floor(c / 60);
                    c = Math.floor(c % 60);

                    if (b >= 60) {
                        f = Math.floor(b / 60);
                        k = b % 60;
                        n = (k < 10 ? "0" : "");
                        k = n + k;
                        b = f + ':' + k;
                    }

                    if (b === 0 && c === 30) history_up_time++;

                    // update history
                    if (history_up_time === 1) {
                        var audio_s_id = jQuery('audio#audioTag').attr('track-id'),
                            g_curr_s_l = (audio_s_id.split('_').length - 1),
                            get_curr_i = audio_s_id.split('_')[g_curr_s_l];
                        if (db_user_history[get_curr_i] && settings.uphistorylist === true)
                            up_h_meth = 'h_up';
                        else if (!db_user_history[get_curr_i])
                            up_h_meth = 'h_in';
                        else
                            up_h_meth = null;
                        jQuery.post(settings.musicpth + settings.manageMyMusic, {
                                action: 'update_history',
                                track: get_curr_i,
                                b: up_h_meth
                            })
                            .done(function(x) {
                                if (x === '1') {
                                    db_user_history[get_curr_i] = get_curr_i;
                                    history_up_time = 0;
                                }
                            });

                    }
                    a.innerHTML = (b < 10 ? "&nbsp;" : "") + b + ":" + (c < 10 ? "0" : "") + c
                }




                jS.slider({
                    range: "min",
                    min: 0,
                    max: v,
                    value: 0,
                    start: function() {
                        sliderOn = true;
                    },
                    stop: function() {
                        sliderOn = false;
                        rmactive('.' + o.timeClass);
                        audio.play();
                    },
                    slide: function(er, sVl) {
                        jmv = jM.css('width').split('px')[0];
                        if (sVl.value > jmv) {
                            jT.css('left', jmv);
                            jL.css('width', jmv);
                            return;
                        }

                        jL.css('width', sVl.value);
                        jT.css('left', sVl.value);

                        w = g * (sVl.value / v);
                        q = Math.floor(w / 60);
                        w = Math.floor(w % 60);

                        if (q >= 60) {
                            f = Math.floor(q / 60);
                            k = q % 60;
                            n = (k < 10 ? "0" : "");
                            k = n + k;
                            q = f + ':' + k;
                        }

                        r = (q < 10 ? "&nbsp;" : "") + q + ":" + (w < 10 ? "0" : "") + w;
                        jQuery(m).html(r);
                        aactive(null, '.' + o.timeClass);

                    }
                });

				
				// mini player slider (created appart for no confilct)
			    var 
                    MjL = $('.mini_progressbar'),
                    MjT = $('.mini_progressTooltip'),
                    MjS = $('.mini_player_loader_controls'),
                    MjM = $('.mini_player_loaderClass'),
                    Mv = MjS.css('width').split('px')[0],
					Mm = j(a.playedClass, this.wrapper);
                MjS.slider({
                    range: "min",
                    min: 0,
                    max: Mv,
                    value: 0,
                    start: function() {
                        sliderOn = true;
                    },
                    stop: function() {
                        sliderOn = false;
                        //rmactive('.' + o.timeClass);
                        audio.play();
                    },
                    slide: function(er, MsVl) {
                        var jmv = MjM.css('width').split('px')[0];
                        if (MsVl.value > jmv) {
                            MjT.css('left', jmv);
                            MjL.css('width', jmv);
                            return;
                        }

                        MjL.css('width', MsVl.value);
                        MjT.css('left', MsVl.value);

                        Mw = g * (MsVl.value / Mv);
                        Mq = Math.floor(Mw / 60);
                        Mw = Math.floor(Mw % 60);

                        if (Mq >= 60) {
                            f = Math.floor(Mq / 60);
                            k = Mq % 60;
                            n = (k < 10 ? "0" : "");
                            k = n + k;
                            Mq = f + ':' + k;
                        }

                        r = (Mq < 10 ? "&nbsp;" : "") + Mq + ":" + (Mw < 10 ? "0" : "") + Mw;
                    //    jQuery(m).html(r);
                       // aactive(null, '.' + o.timeClass);

                    }
                });


            }
        },
        // create one instance
        create: function(b, a) {
            a = a || {};
            return b.length ? this.createAll(a, b) : this.newInstance(b, a)
        },
        // create all avalaible instances
        createAll: function(b, a) {
            var c = a || document.getElementsByTagName("audio"),
                d = [];
            b = b || {};
            for (var e = 0, i = c.length; e < i; e++) d.push(this.newInstance(c[e], b));
            return d
        },
        // prepare new instance
        newInstance: function(b, a) {
            var c = this.helpers.clone(this.settings),
                d = "waudio" + this.instanceCount,
                e = "waudio_wrapper" + this.instanceCount;
            this.instanceCount++;
            if (b.getAttribute("autoplay") != null) c.autoplay = true;
            if (b.getAttribute("loop") != null) c.loop = true;
            if (b.getAttribute("preload") == "none") c.preload = false;
            a && this.helpers.merge(c, a);
            if (c.createPlayer.markup) b = this.createPlayer(b, c.createPlayer, e);
            else b.parentNode.setAttribute("id", e);
            e = new g[o](b, c);
            c.css && this.helpers.injectCss(e, c.css);
            if (c.useFlash && c.hasFlash) {
                this.injectFlash(e, d);
                this.attachFlashEvents(e.wrapper, e)
            } else c.useFlash && !c.hasFlash &&
                this.settings.flashError.apply(e);
            if (!c.useFlash || c.useFlash && c.hasFlash) this.attachEvents(e.wrapper, e);
            return this.instances[d] = e
        },
        // inject player template [html]
        createPlayer: function(b, a, c) {
            var d = document.createElement("div"),
                e = b.cloneNode(true);

            d.setAttribute("class", "waudio");
            d.setAttribute("className", "waudio");
            d.setAttribute("id", c);
            if (e.outerHTML && !document.createElement("audio").canPlayType) {

                e = this.helpers.cloneHtml5Node(b);
                d.innerHTML = a.markup;
                d.appendChild(e);
                b.outerHTML = d.outerHTML;
                d = document.getElementById(c);
            } else {
                d.appendChild(e);
                d.innerHTML += a.markup;
                b.parentNode.replaceChild(d, b);
                setTimeout(function() {
                    jQuery('#create_markup_ready').removeAttr('style');

                }, 200);

            }
            return d.getElementsByTagName("audio")[0]
        },
        attachEvents: function(b, a) {


            if (a.settings.createPlayer) {
                var c = a.settings.createPlayer,
                    d = j(c.playPauseClass, b),
                    e = j(c.scrubberClass, b);

				// mini player play/pause button
				$('.mini_player_play_pause').off('click').on('click', function(e){
					a.playPause.apply(a)
				});

                g[h].events.addListener(d, "click", function() {
                    a.playPause.apply(a)
                });
                g[h].events.addListener(e, "click", function(i) {
                    i = (mus_zooming ? i.clientX + mus_zooming : i.clientX);
                    var f = this,
                        k = 0;
                    if (f.offsetParent) {
                        do k += f.offsetLeft; while (f = f.offsetParent)
                    };

                    a.skipTo((i - k) / e.offsetWidth)

                });

				// mini player skipTo
				var mini_player_controls = $('.mini_player_loader_controls');
				mini_player_controls.off('click').on('click',function(e){
                    var i = (mus_zooming ? e.clientX + mus_zooming : e.clientX);
                    var f = this,
                        k = 0;
                    if (f.offsetParent) {
                        do k += f.offsetLeft; while (f = f.offsetParent)
                    };

                    a.skipTo((i - k) / mini_player_controls[0].offsetWidth)
				});
				
                if (!a.settings.useFlash) {
                    g[h].events.trackLoadProgress(a);
                    g[h].events.addListener(a.element, "timeupdate", function() {
                        a.updatePlayhead.apply(a)
                    });
                    g[h].events.addListener(a.element, "ended", function() {
                        a.trackEnded.apply(a)
                    });
                    g[h].events.addListener(a.source, "error", function() {
                        clearInterval(a.readyTimer);
                        clearInterval(a.loadTimer);
                        a.settings.loadError.apply(a)
                    })
                }
            }
        },
        attachFlashEvents: function(b, a) {
            a.swfReady = false;
            a.load = function(c) {
                a.mp3 = c;
                a.swfReady && a.element.load(c)
            };
            a.loadProgress = function(c, d) {
                a.loadedPercent = c;
                a.duration = d;
                a.settings.loadStarted.apply(a);
                a.settings.loadProgress.apply(a, [c])
            };
            a.skipTo = function(c) {
                if (!(c > a.loadedPercent)) {
                    a.updatePlayhead.call(a, [c]);
                    a.element.skipTo(c)
                }
            };
            a.updatePlayhead = function(c) {
                a.settings.updatePlayhead.apply(a, [c])
            };
            a.play = function() {
                if (!a.settings.preload) {
                    a.settings.preload = true;
                    a.element.init(a.mp3)
                }
                a.playing = true;
                a.element.pplay();
                a.settings.play.apply(a)
            };
            a.pause = function() {
                a.playing = false;
                a.element.ppause();
                a.settings.pause.apply(a)
            };
            a.setVolume = function(c) {
                a.element.setVolume(c)
            };
            a.loadStarted = function() {
                a.swfReady =
                    true;
                a.settings.preload && a.element.init(a.mp3);
                a.settings.autoplay && a.play.apply(a)
            }
        },
        injectFlash: function(b, a) {
            var c = this.flashSource.replace(/\$1/g, a);
            c = c.replace(/\$2/g, b.settings.swfLocation);
            c = c.replace(/\$3/g, +new Date + Math.random());
            var d = b.wrapper.innerHTML,
                e = document.createElement("div");
            e.innerHTML = c + d;
            b.wrapper.innerHTML = e.innerHTML;
            b.element = this.helpers.getSwf(a)
        },
        helpers: {
            merge: function(b, a) {
                for (attr in a)
                    if (b.hasOwnProperty(attr) || a.hasOwnProperty(attr)) b[attr] = a[attr]
            },
            clone: function(b) {
                if (b ==
                    null || typeof b !== "object") return b;
                var a = new b.constructor,
                    c;
                for (c in b) a[c] = arguments.callee(b[c]);
                return a
            },
            addClass: function(b, a) {
                RegExp("(\\s|^)" + a + "(\\s|$)").test(b.className) || (b.className += " " + a)
            },
            removeClass: function(b, a) {
                b.className = b.className.replace(RegExp("(\\s|^)" + a + "(\\s|$)"), " ")
            },
            injectCss: function(b, a) {
                for (var c = "", d = document.getElementsByTagName("style"), e = a.replace(/\$1/g, b.settings.imageLocation), i = 0, f = d.length; i < f; i++) {
                    var k = d[i].getAttribute("title");
                    if (k && ~k.indexOf("waudio")) {
                        f =
                            d[i];
                        if (f.innerHTML === e) return;
                        c = f.innerHTML;
                        break
                    }
                }
                d = document.getElementsByTagName("head")[0];
                i = d.firstChild;
                f = document.createElement("style");
                if (d) {
                    f.setAttribute("type", "text/css");
                    f.setAttribute("title", "waudio");
                    if (f.styleSheet) f.styleSheet.cssText = c + e;
                    else f.appendChild(document.createTextNode(c + e));
                    i ? d.insertBefore(f, i) : d.appendChild(styleElement)
                }
            },
            cloneHtml5Node: function(b) {
                var a = document.createDocumentFragment(),
                    c = a.createElement ? a : document;
                c.createElement("audio");
                c = c.createElement("div");
                a.appendChild(c);
                c.innerHTML = b.outerHTML;
                return c.firstChild
            },
            getSwf: function(b) {
                b = document[b] || window[b];
                return b.length > 1 ? b[b.length - 1] : b
            }
        },
        events: {
            memoryLeaking: false,
            listeners: [],
            addListener: function(b, a, c) {
                if (b.addEventListener) b.addEventListener(a, c, false);
                else if (b.attachEvent) {
                    this.listeners.push(b);
                    if (!this.memoryLeaking) {
                        window.attachEvent("onunload", function() {
                            if (this.listeners)
                                for (var d = 0, e = this.listeners.length; d < e; d++) g[h].events.purge(this.listeners[d])
                        });
                        this.memoryLeaking = true
                    }
                    b.attachEvent("on" +
                        a,
                        function() {
                            c.call(b, window.event)
                        })
                }
            },
            trackLoadProgress: function(b) {

                if (b.settings.preload) {
                    var a, c;
                    b = b;
                    var d = /(ipod|iphone|ipad)/i.test(navigator.userAgent);
                    a = setInterval(function() {
                        if (b.element.readyState > -1) d || b.init.apply(b);
                        if (b.element.readyState > 1) {
                            b.settings.autoplay && b.play.apply(b);
                            clearInterval(a);
                            c = setInterval(function() {
                                b.loadProgress.apply(b);
                                b.loadedPercent >= 1 && clearInterval(c);
                            })
                        }
                    }, 10);
                    b.readyTimer = a;
                    b.loadTimer = c
                }
            },
            purge: function(b) {
                var a = b.attributes,
                    c;
                if (a)
                    for (c = 0; c < a.length; c +=
                        1)
                        if (typeof b[a[c].name] === "function") b[a[c].name] = null;
                if (a = b.childNodes)
                    for (c = 0; c < a.length; c += 1) purge(b.childNodes[c])
            },
            ready: function() {


                return function(b) {
                    var a = window,
                        c = false,
                        d = true,
                        e = a.document,
                        i = e.documentElement,
                        f = e.addEventListener ? "addEventListener" : "attachEvent",
                        k = e.addEventListener ? "removeEventListener" : "detachEvent",
                        n = e.addEventListener ? "" : "on",
                        m = function(l) {
                            if (!(l.type == "readystatechange" && e.readyState != "complete")) {
                                (l.type == "load" ? a : e)[k](n + l.type, m, false);
                                if (!c && (c = true)) b.call(a, l.type ||
                                    l)
                            }
                        },
                        q = function() {
                            try {
                                i.doScroll("left")
                            } catch (l) {
                                setTimeout(q, 50);
                                return
                            }
                            m("poll")
                        };
                    if (e.readyState == "complete") b.call(a, "lazy");
                    else {
                        if (e.createEventObject && i.doScroll) {
                            try {
                                d = !a.frameElement
                            } catch (r) {}
                            d && q()
                        }
                        e[f](n + "DOMContentLoaded", m, false);
                        e[f](n + "readystatechange", m, false);
                        a[f](n + "load", m, false)
                    }
                }
            }()
        }
    };
    g[o] = function(b, a) {
        this.element = b;
        this.wrapper = b.parentNode;
        this.source = b.getElementsByTagName("source")[0] || b;
        this.mp3 = function(c) {
            var d = c.getElementsByTagName("source")[0];
            return c.getAttribute("src") ||
                (d ? d.getAttribute("src") : null)
        }(b);
        this.settings = a;
        this.loadStartedCalled = false;
        this.loadedPercent = 0;
        this.duration = 1;
        this.playing = false
    };
    g[o].prototype = {
        updatePlayhead: function() {
            this.settings.updatePlayhead.apply(this, [this.element.currentTime / this.duration])
        },
        skipTo: function(b) {
            if (!(b > this.loadedPercent)) {
                this.element.currentTime = this.duration * b;
                this.updatePlayhead()
            } else {
                this.element.currentTime = this.duration * this.loadedPercent;
                this.updatePlayhead()
            }
        },
        load: function(b, TrackId) {
            up_prev_shuffle = this.source.getAttribute('track-id');
            this.loadStartedCalled = false;
            jQuery(this.source).attr({
                'src': b,
                'track-id': TrackId
            });
            this.element.load();
            this.mp3 = b;
            g[h].events.trackLoadProgress(this)
        },
        loadError: function(b) {
            this.settings.loadError.apply(this);

        },
        init: function() {
            this.settings.init.apply(this);
        },
        loadStarted: function() {
            if (!this.element.duration) return false;
            this.duration = this.element.duration;
            this.updatePlayhead();
            this.settings.loadStarted.apply(this)
        },
        loadProgress: function() {
            if (this.element.buffered != null && this.element.buffered.length) {
                if (!this.loadStartedCalled) this.loadStartedCalled = this.loadStarted();
                this.loadedPercent = this.element.buffered.end(this.element.buffered.length - 1) / this.duration;
                this.settings.loadProgress.apply(this, [this.loadedPercent])
            }
        },
        playPause: function() {
            this.playing ? this.pause() : this.play()
        },
        play: function() {
            /(ipod|iphone|ipad)/i.test(navigator.userAgent) && this.element.readyState == 0 && this.init.apply(this);
            if (!this.settings.preload) {
                this.settings.preload = true;
                this.element.setAttribute("preload", "auto");
                g[h].events.trackLoadProgress(this)
            }
            this.playing = true;
            this.element.play();
            this.settings.play.apply(this);
            socplusMusicLcnt.find('div#crdI_' + playing_playlist).addClass(pl_playing_class);
            socplusMusicLcnt.find('.' + mu_i_play).addClass('mus_album_i_play__pause');
			$('.mini_player_play_pause').addClass('__pause');
        },
        pause: function() {
            this.playing = false;
            this.element.pause();
            this.settings.pause.apply(this);
            socplusMusicLcnt.find('.' + pl_playing_class).removeClass(pl_playing_class);
            socplusMusicLcnt.find('.' + mu_i_play).removeClass('mus_album_i_play__pause');
			$('.mini_player_play_pause').removeClass('__pause');
        },
        setVolume: function(b, c, s) {

            if (s) {
                this.element.volume = s;
                return;
            }
            var y = parseInt(100),
                x = parseInt(68),
                el = this.element;
            b = ((parseInt(100) / parseInt(68)) * b) / y;

            setTimeout(function() {
                el.muted = c;
                el.volume = b;
            }, 10);
        },
        trackEnded: function() {
            this.skipTo.apply(this, [0]);
            this.settings.loop || this.pause.apply(this);
            this.settings.trackEnded.apply(this)
        }
    };
    var j = function(b, a) {
        var c = [];
        a = a || document;
        if (a.getElementsByClassName) c = a.getElementsByClassName(b);
        else {
            var d, e, i = a.getElementsByTagName("*"),
                f = RegExp("(^|\\s)" + b + "(\\s|$)");
            d = 0;
            for (e = i.length; d < e; d++) f.test(i[d].className) && c.push(i[d])
        }
        return c.length > 1 ? c : c[0]
		
    }

})("waudio", "waudioInstance", this);



var get_browser = function() {
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE';
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) {
            return 'Opera'
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[0];
};


var getNavigator = function() {
    var ua = navigator.userAgent,
        doc = document.documentElement,
        res = 'undefined';
    // ie 9
    if (document.all && !window.atob) {
        res = window.location.href.split('/')[curr_history_addr_sl_ie_s_th_9];
        // ie 10
    } else if ((ua.match(/MSIE 10.0/i))) {
        res = window.location.href.split('/')[curr_history_addr_sl_ie_b_th_9];

        // ie 11
    } else if ((ua.match(/rv:11.0/i))) {
        res = window.location.href.split('/')[curr_history_addr_sl_ie_b_th_9];
    } else {
        // opera, safari, chrome, firefox
        res = window.location.pathname.split('/')[curr_history_addr_sl_ie_b_th_9];
    }

    return res;

};


// resize the music popup layer
var resizesocplusMusicLayer = function() {

    var m_c_radio = jQuery('.mus_radio'),
        m_n_count = jQuery('.mml_notif'),
        m_sc_ovr_l = jQuery('.mus_scroll-overlay'),
        m_n_count_subcat = jQuery('ul.mml_subcat_ul').find('.mml_notif'),
        m_rec_visbile_t = jQuery('.m_recommendations_w'),
        m_scrollable_cnt = jQuery('#socplusMusic_search_container .m_c_s_scrollable'),
        m_custm_scrolling = jQuery('.m_c_s_scrollable:first'),
        m_playlist_new_emblem = jQuery('.mus_card_new'),
        m_dot_noitification = jQuery('span.dot_notification'),
        m_overlay_fr_init = jQuery('[open-mth]'),
        m_aria_content = jQuery('[data-m-container]'),
        nav_apple = navigator.userAgent.match(/(iPod|iPhone|iPad)/),
        curr_page = curr_history_addr,
        w_hg = $window.prop('innerHeight');

    var repeat_and_shuffle_arr = function(m) {
        var m_head_player_shuffle = jQuery('.mus_player_shuffle'),
            m_head_player_repeat = jQuery('.mus_player_repeat');


        if (!m) {
            m_head_player_repeat.css({
                'margin-top': '-19px',
                'margin-left': '-21px'
            });
            m_head_player_shuffle.css({
                'margin-top': '21px',
                'margin-left': '8px'
            });
        } else {
            m_head_player_repeat.removeAttr('style');
            m_head_player_shuffle.removeAttr('style');
        }

    };

    // resize for height, the minimum resizing is 500px
    if (w_hg > 500) {
        socplusMusicLcnt.css({
            'height': w_hg - (nav_apple ? 90 : 85),
            'zoom': '1'
        });
        var x = socplusMusicLcnt.height() - socplusMusicLTop.height(),
            x2 = 85;
        if (m_rec_visbile_t.is(':visible') || curr_page === 'playlist') x2 += m_rec_visbile_t.height() + 15;
        left_side_scroll.css('height', x);
        m_custm_scrolling.css({
            'height': x - x2
        });
        m_l_col.css('height', x);
        m_scrollable_cnt.css('height', x - x2);

        if (curr_page === 'radio') {
            iy = socplusMusicLcnt.height() - (mcontent.height() - m_c_radio.height());
            mcontent.find('.mus-custom-scrolling').css('height', (socplusMusicLcnt.height() - socplusMusicLTop.height()) - m_c_radio.height() - 55);

        }

        mcontent.find(':scrollable').each(function() {

            /*
		if(curr_page !== 'radio')
		jQuery(this).css('height',x-x2);
		else{ iy = socplusMusicLcnt.height()-(mcontent.height()-m_c_radio.height());
		jQuery(this).css('height',iy+'px');}

		*/

            if (curr_page === 'search')
                jQuery(this).css('height', x - x2);
        });
        find_track_df_height = x - x2;

    }



    // resize for width, the minimum resizing is 970px (ipad2 screen width)
    if ($window.width() < d_w_l) {

        socplusMusicLcnt.css({
            'width': '970',
            'zoom': '1'
        });
        var x = socplusMusicLcnt.width() - mcontent.width();
        m_l_col.css('width', x - 1);
        repeat_and_shuffle_arr();

        if (left_side_scroll.find(m_sc_ovr_l).height() + 50 > socplusMusicLcnt.height()) {
            m_n_count_subcat.animate({
                right: '34'
            });
        } else {
            m_n_count.animate({
                right: '9'
            });
        }
        l_m_cnt.css('margin-left', '-32px');
        m_dot_noitification.css('right', '75px');
    } else {
        var q = socplusMusicLcnt.height(),
            zm = w_hg >= 850 && settings.popupLayerZ ? (get_browser() === 'Chrome' ? 1.088 : 1) : 1;
        l_m_cnt.removeAttr('style');
        m_l_col.removeAttr('style');
        set_width_ly = (nav_apple ? '970' : $window.width() - ($window.width() - socplusMusicLcnt.width() - 100));
        socplusMusicLcnt.css({
            'width': set_width_ly,
            'zoom': zm
        });
        if (nav_apple) {
            repeat_and_shuffle_arr();
            socplusMusicLcnt.css({
                'margin-left': ($window.width() - socplusMusicLcnt.width()) / 2 + 'px',
                'zoom': '1'
            })
        } else repeat_and_shuffle_arr(true);
        // setting to center of page
        if (settings.popupLayerToCenter) socplusMusicLcnt.position({
            of: $window
        }).css({
            'zoom': '1'
        });
        m_n_count.animate({
            right: '9'
        });
        m_dot_noitification.css('right', '50px');
        // for player
        if (zm > 1 && get_browser() !== 'Firefox') {
            jQuery('.__player').css({
                'width': '600',
                'zoom': 'reset'
            });
            jQuery('.__volume').css('zoom', 'reset');
            mus_zooming = -38;
            socplusMusicLcnt.css('max-height', '710px');

        } else {
            jQuery('.__player').css({
                'width': '540',
                'zoom': 'reset'

            });
            jQuery('.__volume').css('zoom', 'reset');
            mus_zooming = 0;
            m_l_col.css('height', w_hg - (nav_apple ? 90 : 100));
            mcontent.css('height', w_hg - (nav_apple ? 90 : 100));

        }



    }

    ///  if(get_browser() === 'Firefox') {socplusMusicLcnt.css('margin-top','+=40px');}

    m_playlist_new_emblem.css('zoom', 'reset');
    m_aria_content.css('opacity', '1');
    m_overlay_fr_init.remove();

};


Array.prototype.indxf = function(val) {
    var i = this.length;

    while (i--) {
        if (this[i] == val) return i;
    }
    return -1;
}

var updateArrayIndex = function(array) {
    var result = [];
    for (var key in array)
        result.push(array[key]);
    return result;
};

var arrayRemoveIndexLetters = function(array, j) {

    var result = {};
    for (var key in array) {

        key = key.match(/\d/g).join('');
        result[key] = key;

    }

    return result;
};

var animateNumCount = function(element, timer) {
    element.removeClass('__on');
    setTimeout(function() {
        element.addClass('__on');
    }, timer);
};

var printf = function(format, data) {

    var arg = arguments;
    var i = 1;
    return format.replace(/%((%)|s)/g, function(m) {
        return m[2] || arg[i++]
    })
};

var ractive = function() {
    jQuery("ul.mml_subcat_ul>li>div." + activeclass).removeClass(activeclass);
    jQuery("ul.mus_nav_lst>li>div." + activeclass).removeClass(activeclass);
    jQuery('.mml_subcat_ul').find('a[data-mymus-subcat="true"].' + activeclass).removeClass(activeclass);

}
var rmactive = function(x) {
    jQuery(x).removeClass(activeclass);
};
var aactive = function(element, v, o) {
    if (element === 'mymusic') return jQuery('div[data-href="mymusic"]').addClass(activeclass);

    if (v)
        jQuery(v).addClass(activeclass);
    else
        jQuery('ul.mus_nav_lst>li[data-href="' + element + '"]>div:first').addClass(activeclass);

    if (o)
        o.removeClass('mus__opac');
};

var randomNumbers = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

var getByGenre = function(el, c) {

    jQuery(el).addClass(activeclass);

};
var searchStringInArray = function(str, strArray) {
    for (var j = 0; j < strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}
var updateTrackId = function(x) {

    if (typeof x == 'undefined')
        return;
    else if (x === null)
        x = "";
    else
        x = x + '_';

    socplusMusicLcnt.find('ol li').each(function() {
        var $this = jQuery(this),
            $thisId = $this.find('[data-action="play"]').attr('id'),
            $target = $this.attr('target'),
            $sublin = typeof $target != 'undefined' ? $target.split('#')[1] : '';
        if ($this.attr('song_by_genre')) return;
        $this.attr({
            'song_by_genre': 'true',
            'target': '#' + x + $sublin
        });
        $this.find('[data-action="play"]').attr('id', x + $thisId);

    });


};

__manip_toolbar_btn = function(m) {

    element = $('#topPanelMusicPlayerControl');
    if (m === 'play') {
        element.addClass('__pause');
        this.pause = true;
    } else {
        element.removeClass('__pause');
        this.pause = false;
    }


};

var delete_died_covers = function(cv) {

    if (settings.delete_died_covers) {
        jQuery.post(settings.musicpth + settings.manageMyMusic, {
            action: 'died_covers',
            track: '0',
            b: cv
        });
    }
};
// remove dot notification
var get_length_of_updates_playlist = function() {
    var pl_updates_notif = jQuery('[data-playlist-update]');
    return pl_updates_notif.length;
};
remove_dot_notif = function($this) {

    $this.removeAttr('data-playlist-update').find('.mus_dot').addClass(hiddenClass).removeClass('dot_notification');
    if (get_length_of_updates_playlist() <= 0) my_music_dot_notif.addClass(hiddenClass);
};
var get_playing_track_name = function(e, g) {
    if (g) {
        document.title = settings.originalTitle + settings.MusicWIndowTitle;
        return;
    }
    document.title = settings.originalTitle + ' .: ' + e.find('span:first').text() + ' - ' + e.find('span:last').text();
};

var __add_playlist_to_my_collection = function(C, B, K, R, O, H) {

    mus_pr_pl_add = (ajax_update_href_links !== null ? '' : 'mus_proaspat_added');

    var $this = (C !== null ? C : ''),
        $collection_data = ($this ? JSON.parse($this.attr('data-collection')) : ''),
        my_playlists_HTML = '<li id="myplst" class="' + mus_pr_pl_add + ' mml_subcat_li" data-href="playlist" data-action="true" data-query="?action=my&i=%s"><div style="padding-bottom:5px;" class="mus_mt0 mml_subcat_btn" id="ppl_%s" title="%s">' +
        '<div class="mml_ucard ">' +
        '<div class="' + pl_card + '"><img style="width: 100%; height: 100%;vertical-align: baseline;" src="%s"><img src="' + settings.host + settings.noReadPlaylistCover + '">' +
        '</div><div class="mplst_mt15">' +
        '<div class="mml_ucard_n va_target"><div class="mml_ucard_n_f">%s</div></div>' +
        '</div></div><span class="mus_dot m_hidden"></span><span class="mml_notif mml_notif__num" ><span class="inlineBlock ic ic12 ic12_anim-upload"></span></span>' +
        '<div class="mml_notif mml_notif__num __on" id="pplCount">%s</div></div></li>';

    if (K && R && O && !H) {
        my_playlists_r = printf(my_playlists_HTML, K, K, decodeURIComponent(R), O, decodeURIComponent(R), '1');

        leftcollection.find('li:first').after(my_playlists_r);
        jQuery('.' + pl_card).find('img:first').error(function() {
            var $this = jQuery(this);
            delete_died_covers($this.attr('src'));
            $this.unbind('error').attr('src', settings.noReadPlaylistCover);
        });
        if (ajax_update_href_links !== null) ajax_update_href_links();
        return false;
    }
    collection_id = (!H ? $collection_data['collection_id'] : decodeURIComponent(B));
    jQuery.ajax({
        url: settings.musicpth + settings.manageMyMusic,
        type: 'POST',
        data: jQuery.param({
            action: 'add_collection',
            track: '0',
            b: collection_id,
            c: (H ? 1 : null),
            n: (H ? encodeURIComponent(K) : null),
            m: (H ? decodeURIComponent(R) : null),
            l: (H ? decodeURIComponent(B) : null),
            i: (H ? encodeURIComponent(O) : null)
        }) + '&' + H,
        cache: false,
        success: function(d) {
            if (d === '0') jQuery.socplusMusic('error', null, 'Error occured to add playlist, please try again');
            else {
                delete db_navigation_ajax[my_mus_page];

                if (B && !H) {
                    $this.closest('[uid="card"]').addClass(pl_added_class);
                    $this.find('span:first').addClass('__success').parent('div').find('span:last').text('Added');
                }
                if (H) {
                    my_playlists_r = printf(my_playlists_HTML, d, d, decodeURIComponent(K), decodeURIComponent(O), decodeURIComponent(K), decodeURIComponent(R));
                    db_playlists_from_search.push(B);
                } else my_playlists_r = printf(my_playlists_HTML, $collection_data['collection_id'], $collection_data['collection_id'], decodeURIComponent($collection_data['collection_name']), $collection_data['collection_cover'], decodeURIComponent($collection_data['collection_name']), $collection_data['collection_count']);
                leftcollection.find('li:first').after(my_playlists_r);
                jQuery('.' + pl_card).find('img:first').error(function() {
                    var $this = jQuery(this);
                    delete_died_covers($this.attr('src'));
                    $this.unbind('error').attr('src', settings.noReadPlaylistCover);
                });
                db_check_my_playlist.push(collection_id);
                if (ajax_update_href_links !== null) ajax_update_href_links();
            }


        }
    });

    return false;
};

var __appear_added_songs = function(thisli) {


    var track_html = '<li style="opacity:0.6;pointer-events:none;"><div class="mus-tr_i  __has-video soh-s mus_track __highlighted">' +
        '<div class="mus-tr_hld __pr-m">' +
        '<span class="mus-tr_restore">' +
        '<span class="mus-tr_restore_tx">' +
        '<span class="mus-tr_il js-mus-tr_restore" data-action="restore">Restore?</span>&nbsp;&nbsp;&#8211;&nbsp;</span>' +
        '</span><span class="mus-tr_play __play js-mus-tr_play" id="pm_sec" title="Play" data-action="play"></span>' +
        '<div class="mus-tr_cnt"><a class="mus-tr_a mus-tr_artist">%s</a>&nbsp;&#8211;&nbsp;<a class="mus-tr_a mus-tr_song">%s</a><span style="display:none;" class="foh-s mus-tr_info">&nbsp;from&nbsp;<a class="mus-tr_a mus-tr_album"><span class="mus-tr_album-ic ic10_album"></span>%s</a></span></div>' +
        '<div class="mus-tr_right-controls foh-s"  id="rc_m_sec_klass"><span class="js-mus_dropdown_trigger mus-tr_il mus-tr_right-controls_a">Add to the playlist</span><span class="mus-tr_edit js-mus-tr_edit " title="Edit" data-action="edit"></span><span class="mus-tr_delete js-mus-tr_delete " title="Remove from my list" trackId="track" data-action="delete"></span>' +
        '</div><span class="mus-tr_time">%s</span>' +
        '</div>' +
        '</div></li>',
        ad_artist = thisli.find('a.mus-tr_artist').text(),
        ad_song = thisli.find('a.mus-tr_song').text(),
        ad_album = thisli.find('.mus-tr_album-ic').text(),
        ad_time = thisli.find('.mus-tr_time').text(),
        track_html = printf(track_html, ad_artist, ad_song, ad_album, ad_time);
    socplusMusicLcnt.find('ol:first').prepend(track_html);
    mcontent.find(':scrollable').animate({
        scrollTop: 1
    });
    setTimeout(function() {
        socplusMusicLcnt.find('ol:first').find('.__highlighted').removeClass('__highlighted');
    }, 1500);
    return false;

};

act_header_dropDown = function(i, b, c, g) {
    if (!i) return;
    i = i.split('_');
    song_id = i[i.length - 1];


    // if g is true add to my music
    if (g) {

        jQuery.ajax({
            url: settings.musicpth + settings.manageMyMusic,
            type: 'POST',
            data: {
                action: 'addTrack',
                track: song_id,
                b: 'm',
                c: 0
            },
            cache: false,
            success: function(d) {
                if (d !== '0') {
                    if (my_mus_page) delete db_navigation_ajax[my_mus_page];
                    db_check_mymus.push(song_id);
                    animateNumCount(my_mus_notif, 200);
                    my_mus_notif.html(d);
                    jQuery(c).addClass('__done').find('span:eq(2)').text('Added');
                    setTimeout(function() {
                        jQuery(c).addClass('__disabled curDefault');
                    }, 2000);
                } else return jQuery.socplusMusic('error', null, 'An error occured to add the track ' + song_id + ', please try again');


            }
        });


        return;
    }

    jQuery.ajax({
        url: settings.musicpth + settings.manageMyMusic,
        type: 'POST',
        data: {
            action: 'addToPlaylist',
            track: 0,
            d: '1'
        },
        cache: false,
        success: function(d) {
            b.innerHTML = d;

            var remove_dropdown = function() {
                b.innerHTML = '';
            };

            var cl_cr_pl = jQuery('[data-hv-pl="true"]'),
                drp_add__pl = jQuery('.mus_dropdown_f_a'),
                pr_pp_pt = jQuery('#addPersonalPLInputWrapper');

            cl_cr_pl.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var $this = jQuery(this),
                    pl_id = $this.attr('pid'),
                    left_side_f_pl = jQuery('#myplst>div#ppl_' + pl_id),
                    left_side_f_pl_c = left_side_f_pl.find('#pplCount');
                jQuery.ajax({
                    url: settings.musicpth + settings.manageMyMusic,
                    type: 'POST',
                    data: {
                        action: 'addToPlaylist',
                        track: song_id,
                        b: 'exist_playlist',
                        c: pl_id
                    },
                    cache: false,
                    success: function(d) {
                        if (d === '0') {
                            return jQuery.socplusMusic('error', null, 'An error occured to add track to the playlist, please try again.');
                        } else {
                            if (my_ply_page) delete db_navigation_ajax[my_ply_page.split('&i')[0] + '&i=' + pl_id];
                            db_check_mymus.push(song_id);
                            animateNumCount(left_side_f_pl_c, 200);
                            left_side_f_pl_c.html(d.split(':><:')[1]);
                            jQuery(c).addClass('__done').find('span:eq(2)').text('Added');
                            setTimeout(function() {
                                jQuery(c).addClass('__disabled curDefault');
                            }, 2000);
                            b.innerHTML = '';
                        }

                    }


                });


            });


            $document.on('click', function() {
                b.innerHTML = '';
            });



        }


    });



};


// create the dropDown menu
var activateDropDown = function(r, b) {
    close_recent_dropDown();
    var saddedHTML = '<div class="mus-tr_right-controls foh-s">' +
        '<span class="muc-tr_right-controls_tx">' +
        '<span class="mus-tr_right-controls_message">Song added</span></span></div>';

    if (b) {
        var jb = jQuery(b),
            cr_trackid = jb.parent('div').attr('id').split('_'),
            posOfDropDown = jb.offset().top - mcontent.offset().top,
            m_content = mcontent.height() - jb.outerHeight();
        cr_trackid = cr_trackid[cr_trackid.length - 1];
    }

    clearTimeout(dropDownTimeout);
    if (r === true) {

        jQuery.ajax({
            url: settings.musicpth + settings.manageMyMusic,
            type: 'POST',
            data: {
                action: 'addToPlaylist',
                track: '0'
            },
            cache: false,
            success: function(d) {
                b.innerHTML = d;
                var first_div = jQuery('.mus_dropdown_w');
                first_div.attr('dropDown_to_pl', 'true');
                if (posOfDropDown + 200 >= m_content) first_div.addClass('__up');
                first_div.on('mouseenter click', function(e) {
                    dropDownActive = 'active';
                    e.stopPropagation();
                    e.preventDefault();
                    var cl_cr_pl = jQuery('[data-hv-pl="true"]'),
                        drp_add__pl = jQuery('.mus_dropdown_f_a'),
                        pr_pp_pt = jQuery('#addPersonalPLInputWrapper');

                    // add song in exists playlists
                    cl_cr_pl.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var $this = jQuery(this),
                            pl_id = $this.attr('pid'),
                            left_side_f_pl = jQuery('#myplst>div#ppl_' + pl_id),
                            left_side_f_pl_c = left_side_f_pl.find('#pplCount');
                        setTimeout(function() {
                            delete_page_content();
                        }, 200);
                        if (my_ply_page) delete db_navigation_ajax[my_ply_page.split('i=')[0] + 'i=' + pl_id];
                        jQuery.ajax({
                            url: settings.musicpth + settings.manageMyMusic,
                            type: 'POST',
                            data: {
                                action: 'addToPlaylist',
                                track: cr_trackid,
                                b: 'exist_playlist',
                                c: pl_id
                            },
                            cache: false,
                            success: function(d) {
                                if (d === '0') {
                                    return jQuery.socplusMusic('error', null, 'An error occured to add track to the playlist, please try again.');
                                } else {
                                    db_check_mymus.push(cr_trackid);
                                    animateNumCount(left_side_f_pl_c, 200);
                                    left_side_f_pl_c.html(d.split(':><:')[1]);
                                    if (left_side_f_pl.find('div.' + pl_card).find('img').attr('df-img') === 'true')
                                        left_side_f_pl.find('div.' + pl_card).find('img').attr('src', d.split(':><:')[0]).removeAttr('df-img');
                                    if (jb && recently_added !== cr_trackid && jQuery('div[data-mus-my-playlist]').data('mus-my-playlist') == pl_id) {
                                        recently_added = cr_trackid;
                                        __appear_added_songs(jb.closest('li'));
                                    }
                                    jb.parent('div').replaceWith(saddedHTML);
                                    activateDropDown(false);

                                }
                            }


                        });


                    });

                    // add playlist in the right dropdown 
                    drp_add__pl.on('click', function() {
                        var $this = jQuery(this),
                            giataBtn = jQuery('.m_ppl_input_enter');
                        $this.hide()
                            .closest('div.mus_dropdown_f')
                            .addClass('mus_dropdown_f' + activeclass)
                            .find('[uid="pplName"]').focus()
                            .on('keyup', function(e) {
                                pr_pp_pt.removeAttr('style');
                                if (e.keyCode == 13) giataBtn.click();
                            });
                        giataBtn.on('click', function(e) {
                            e.preventDefault();
                            e.stopImmediatePropagation();

                            var $pl_name = jQuery('[uid="pplName"]'),
                                $pl_name_h = jQuery.trim($pl_name.val());

                            if ($pl_name_h && !add_pl_one_req) {
                                $this.addClass(disabledClass);
                                jQuery.ajax({
                                    url: settings.musicpth + settings.manageMyMusic,
                                    type: 'POST',
                                    data: {
                                        action: 'addToPlaylist',
                                        track: cr_trackid,
                                        b: $pl_name_h
                                    },
                                    cache: false,
                                    success: function(d) {
                                        if (d === '0') {
                                            return jQuery.socplusMusic('error', null, 'An error occured to add playlist, please try again.');
                                        } else {
                                            add_pl_one_req = true;
                                            d1 = d.split('*-*')[0],
                                                d2 = d.split('*-*')[1];
                                            __add_playlist_to_my_collection(null, null, d1, $pl_name_h, d2);
                                            activateDropDown(false);
                                            jb.parent('div').replaceWith(saddedHTML);
                                            setTimeout(function() {
                                                add_pl_one_req = false;
                                            }, 5000);
                                        }
                                    }


                                });

                            } else pr_pp_pt.css('border-color', 'rgb(255, 0, 0)').find('input').focus();

                        });
                    });
                });
                dropDownActive = true;
                jQuery(first_div, jb).hover(function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    clearTimeout(dropDownTimeout);
                    if (first_div.is(':visible'))
                        dropDownActive = true;
                    else
                        dropDownActive = false;
                    return false;
                }, function() {
                    dropDownActive = true;
                    if (first_div.is(':visible') && dropDownActive === true) {
                        dropDownTimeout = setTimeout(function() {
                            jb.click()
                        }, 900);


                    }

                });



            }
        });


    } else {
        jQuery('[dropDown_to_pl="true"]').remove();
        dropDownActive = false;

    }


};
var set_href_to_songs = function(a) {

    var check = a.find('a.mus-tr_artist');
    if (!check.data('href')) {
        a.each(function() {
            var $this = jQuery(this),
                this_artist = $this.find('a.mus-tr_artist'),
                this_song = $this.find('a.mus-tr_song'),
                this_album = $this.find('a.mus-tr_album');

            this_artist.attr({
                'data-href': 'search',
                'data-action': 'true',
                'data-query': '?action=searchResult&method=inx&key=' + encodeURIComponent(this_artist.text())
            }).on('click', function() {
                search_input_gl.val(this_artist.text())
            });

            this_song.attr({
                'data-href': 'search',
                'data-action': 'true',
                'data-query': '?action=searchResult&method=songs&key=' + encodeURIComponent(this_song.text())
            }).on('click', function() {
                search_input_gl.val(this_song.text())
            });

            this_album.attr({
                'data-href': 'search',
                'data-action': 'true',
                'data-query': '?action=searchResult&method=album&key=' + encodeURIComponent(this_artist.text()) + '&alb=' + encodeURIComponent(this_album.text())
            }).on('click', function() {
                search_input_gl.val(this_album.text())
            });


        });
    }
};

(function(jQuery) {

    jQuery.extend(jQuery.expr[":"], {
        scrollable: function(element) {
            var vertically_scrollable, horizontally_scrollable;
            if (jQuery(element).css('overflow') == 'scroll' || jQuery(element).css('overflowX') == 'scroll' || jQuery(element).css('overflowY') == 'scroll') return true;

            vertically_scrollable = (element.clientHeight < element.scrollHeight) && (
                jQuery.inArray(jQuery(element).css('overflowY'), ['scroll', 'auto']) != -1 || jQuery.inArray(jQuery(element).css('overflow'), ['scroll', 'auto']) != -1);

            if (vertically_scrollable) return true;

            horizontally_scrollable = (element.clientWidth < element.scrollWidth) && (
                jQuery.inArray(jQuery(element).css('overflowX'), ['scroll', 'auto']) != -1 || jQuery.inArray(jQuery(element).css('overflow'), ['scroll', 'auto']) != -1);
            return horizontally_scrollable;
        }
    });




    var turn_on_shuffle = function(db) {
        return randomNumbers(0, Object.keys(db).length);
    };

    var __getBigCover = function(myMusicselectCover, underCoverArtistName, t) {

        var $this = t;

        if ($this.length !== 0 && $this.closest('ol').hasClass('rec_pl') === false) {

            if (myMusicselectCover.find('img').attr('src') !== $this.data('quest')['cover']) {
                myMusicselectCover.slideUp(settings.AnimateCoverTime, 'swing', function() {

                    jQuery(this).fadeIn().find('img').attr('src', $this.data('quest')['cover']);
                    underCoverArtistName.attr('title', $this.next().find('a:first').text()).text($this.next().find('a:first').text());

                    mcontent.find('img').error(function() {
                        var $this = jQuery(this);
                        delete_died_covers($this.attr('src'));
                        $this.unbind('error').attr('src', settings.artistCoverError).show();
                    });

                });

            }



        }

    };
    var newPlaylist = function(a, data, okbtn, cancelbtn, act) {
        var newData = {},
            ndata = 'empty';

        if (!isNaN(act)) action = 'editCreatedPlaylist';
        else {
            action = act;
            act = 0;
        }

        if (data === false) data = 'empty';
        else {
            data = Object.keys(arrayRemoveIndexLetters(data));
        }


        var newplaylistAjax = jQuery.ajax({
            url: settings.musicpth + settings.manageMyMusic,
            type: 'POST',
            data: {
                action: action,
                track: act,
                dt: data,
                b: a
            },
            cache: false
        });
        newplaylistAjax.done(function(a) {
            if (a !== '0') {
                if (act === 0) {
                    db_check_my_playlist.push(a);
                    return close_layer_popup(a);
                } else return close_layer_popup(act);
            } else {
                okbtn.removeClass('mus_disbl').text('Retry');
                cancelbtn.removeClass('mus_disbl').after('<span id="mus_crpl_error" style="color:rgb(224, 198, 0);"><br/>!Error occured at create playlist, please try again.</span>');
            }
        });

        newplaylistAjax.fail(function(a, b) {
            return jQuery.socplusMusic('error', 'navigation', b.status);
        });

    };

    var __constructPlaylist = function() {
        var song_query;
        //create playlist
        socplusMusicLcnt.find('ol li').each(function(a) {
            if (jQuery(this).closest('ol').hasClass('rec_pl')) return;

            var $this_f = jQuery(this).find('span[data-action="play"]');
            var getId = $this_f.attr('id');
            ///var sortByIdInNumbers = getId.match(/\d/g),
            ///v = sortByIdInNumbers.join("");
            playListIndexTrack[getId] = $this_f.closest('li').index();
            song_query = $this_f.data('quest');

            createdListofTracks[a] = getId + '*' +
                song_query['song'] + '*' +
                song_query['cover'] + '*' +
                $this_f.nextAll('div').find('a:first').text() + '*' +
                $this_f.nextAll('div').find('a:first').next().text() + '*' +
                $this_f.closest('li').next().find('span[data-action="play"]').attr('id') + '*' +
                $this_f.closest('li').prev().find('span[data-action="play"]').attr('id') + '*' +
                ($this_f.closest('li').find('[data-showvideo="true"]').length !== 0 ? $this_f.closest('li').find('[data-showvideo="true"]').data('video') : 0);



        });



        return createdListofTracks;


    };

    var update_recommendation = function(v, ev, r, rcmp, scroll) {
        var loading_ic = jQuery('<div></div>').addClass('mus_loading_scroll');
        r.append(loading_ic);
        jQuery.ajax({
            url: settings.musicpth + settings.manageMyMusic,
            type: 'POST',
            data: {
                action: 'updRecommendations',
                track: '0',
                b: v
            },
            cache: false,
            success: function(c) {
                r.html(c).removeAttr('style');
                if (r.find('ol li').length === 0) rcmp.remove();
                jQuery.socplusMusic('updatesocplusMusicHead', 'undefined', true);
                if (r.html().length !== 0 && !recommendation_loaded && r.find('ol li').length != 0) {
                    scroll.animate({
                        height: '-=90px'
                    });
                    recommendation_loaded = true;
                } else if (r.find('ol li').length <= 0)
                    scroll.animate({
                        height: '+=90px'
                    });


            }
        });

    };

    var triggerPlayBtn = function(myMusicselectCover, underCoverArtistName, tg, e, v, j, t) {



        if (jQuery('.m_ppl_title').length !== 0) playing_playlist = jQuery('.m_ppl_title').data('id');
        if (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
        mplDis(false);
        newSession = true;
        defaultPlayLst = true;
        history_up_time = 0;

        var $this = tg,
            mus_pl_playing = jQuery('.mus_player_playing-cnt');
        if (!t) {
            playListIndexTrack = [];
            createdListofTracks = new Array();
            updated_ListofTracks = __constructPlaylist();
        }

        if ($this.closest('ol').hasClass('rec_pl'))
            mplDis(true);

        // play/pause track on click o pause/play btn
        if ($this.attr('title') == 'Pause') {
            audio.playPause();
            this.playback = true;
            return false;
        } else if (this.playback) {
            audio.playPause();
            this.playback = false;
            return false;
        }

        if (v) {
            v.css('top', '-' + j + 'px');
            $this.closest('ol').find('div.' + activeclass).removeClass(activeclass);
            $this.closest('li').find('div:first').addClass(activeclass);
        }

        __getBigCover(myMusicselectCover, underCoverArtistName, $this);

        // set current playing song button
        mus_pl_playing.attr({
            'data-href': curr_history_addr,
            'data-action': 'true',
            'data-query': window.location.search
        });


        jQuery.socplusMusic('playThisSong',
            null,
            $this.data('quest')['song'],
            $this.attr('id'),
            $this.data('quest')['cover'],
            $this.nextAll('div').find('a:first').text(),
            $this.nextAll('div').find('a:first').next().text());
        if (!t) {
            up_next = $this.closest('li').index() + 1;
            up_prev = $this.closest('li').index();
        } else {
            up_next = $this.closest('li').index() + j;
            up_prev = $this.closest('li').index() + (j - 2);

        }

    };


    var __get_more_songs = function(o, l, m, c, p) {

        if (!no_cach) {
            no_cach = true;
            setTimeout(function() {

                df_o = (df_o === 0 ? o.html() : df_o);
                var loading_scroll = jQuery('<div></div>').addClass('mus_loading_scroll');
                o.html(loading_scroll).addClass(pointerClass);
                var up_shm_pl = function() {
                    playListIndexTrack = [];
                    createdListofTracks = new Array();

                }

                ///if(window.location.href in db_loaded_content) a_page = db_loaded_content[window.location.href];

                var sr1 = 0;
                ++a_page;

                if (c === 'users')
                    sr1 = o.attr('data-user');
                var reqSortUpdate = jQuery.ajax({
                    url: settings.musicpth + settings.manageMyMusic,
                    type: 'POST',
                    data: {
                        action: 'load_scroll_more_songs',
                        track: '0',
                        b: c,
                        c: a_page,
                        d: sr1,
                        pl: p,
                        start_at: mcontent.find('ol:first li').length
                    },
                    cache: false
                });
                reqSortUpdate.done(function(d) {
                    no_cach = false;
                    if (d === '0') jQuery.socplusMusic('error', null, "An error occured at loading tracks");
                    else if (d === 'end') {
                        mus_loading_scroll = false;
                        /*o.animate({
                            opacity: 0.4,
                            marginLeft: '+=200',
                            fontSize: "9px"
                        }, 500, "linear", function() {
                            this.style.visibility = 'hidden';
                        });*/
                        ///db_loaded_content[window.location.href] = a_page;
                        o.hide();
                        setTimeout(function() {
                            update_page_content();
                            ajax_update_href_links();
                        }, 100);
                    } else {


                        mcontent.find('ol:first>li:last').append(d);

                        mcontent.find('ol:first').each(function() {
                            jQuery(this).find('span[data-action="play"]').filter('.datanw').on('click', function(e) {
                                mus_shmore_brgq = true;
                                up_shm_pl();
                                triggerPlayBtn(l, m, jQuery(this), e, null, lngofol, true);
                            });
                        });
                        if (mus_shmore_brgq) {
                            up_shm_pl();
                        }
                        o.html(df_o).removeClass(pointerClass);
                        jQuery.socplusMusic('updatesocplusMusicHead', 'undefined', true);
                        updated_ListofTracks = __constructPlaylist();
                        setTimeout(function() {
                            update_page_content();
                            ajax_update_href_links();
                        }, 100);

                    }


                });
                reqSortUpdate.fail(function(b, c) {
                    jQuery.socplusMusic('error', 'navigation', "Request failed: " + b.status);
                });

            }, 700);
        }
    };


    //auto scroll to the current playing song
    var animateScrolling = function(s, e, g, k) {

        if (g === 0)
            return;


        var elHeight = jQuery(e).height(),
            posOfTrack = jQuery(e).offset().top - mcontent.offset().top,
            m_content = mcontent.height() - jQuery(e).outerHeight(),
            gr = jQuery(e).offset().top - mcontent.height(),
            offtr;

        switch (k) {
            case 'down':
                if (posOfTrack >= find_track_df_height)
                    offtr = s.scrollTop() + (find_track_df_height - jQuery(e).outerHeight()); //s.scrollTop()+(mcontent.height()-jQuery(e).outerHeight()*2);
                break;
            case 'up':
                if (posOfTrack < elHeight)
                    offtr = s.scrollTop() - (elHeight * 2.5);
                break;
            case 'shuffle':
                offtr = (s.scrollTop() + posOfTrack) - elHeight * 1.5;
                break;
            default:
                if (posOfTrack > m_content)
                    offtr = posOfTrack - (elHeight * 1.5);
        }

        /* s.animate({
             scrollTop: offtr
         }); */
        s.scrollTop(offtr);

    };




    var mplaceholder = function(th, j) {

        if (j) return j.next('span').hide();

        jQuery(th).each(function() {
            var inp = jQuery(this),
                $ths = inp.next();
            inp.focus();

            inp.on('keyup keypress', function() {
                var placeholder = $ths;

                jQuery(this).val().length >= 1 ? placeholder.hide() : placeholder.show();



            });
        });


    };



    // popup created, add playlist
    var addPLaylistPopupTrackClick = function(q, selectedCount, r, t, y) {
        selectedTabCreateHTML = '';
        if (y === 's' && Object.keys(selectedTabDb).length === 0) {
            r.html(t);
        } else if (y === 's' && Object.keys(selectedTabDb).length !== 0) {
            jQuery.each(selectedTabDb, function(i, l) {
                selectedTabCreateHTML += l;
            });
            r.html('<ul>' + selectedTabCreateHTML + '</ul>');

            if (audio.playing) {
                this.pla = true;
                var gp = jQuery('audio').attr('track-id');
                jQuery('[title="Pause"]').attr('title', 'Play').removeClass('__pause');
                r.find('span#' + gp).attr('title', 'Pause').addClass('__pause');
            }

            endSessionTabs = true;
        } else if (y === 'my') {
            r.html(t);

            if (audio.playing) {
                var gp = jQuery('audio').attr('track-id');
                jQuery('[title="Pause"]').attr('title', 'Play').removeClass('__pause');
                r.find('span#' + gp).attr('title', 'Pause').addClass('__pause');
            }

            for (x in selectedTabDb)
                r.find('span#' + x).closest('li').find('div:first').addClass('__selected');
        }

        q.find('.__play').on('click touchstart', function(e) {
            readFromPopup = true;
            createdListofTracks = new Array();
            $this = jQuery(this);
            $this.closest('ul').find('.__pause').removeClass('__pause').addClass('__play').attr('title', 'Play');
            if (!this.pla) {
                $this.addClass('__pause').removeClass('__play').attr('title', 'Pause');
                jQuery.socplusMusic('playThisSong',
                    null,
                    $this.data('quest')['song'],
                    $this.attr('id'),
                    $this.data('quest')['cover'],
                    $this.nextAll('div').find('span:first').text(),
                    $this.nextAll('div').find('span:first').next().text());

                this.pla = true;
            } else {
                audio.playPause();
                $this.removeClass('__pause').addClass('__play').attr('title', 'Play');
                this.pla = false;
            }
            return false;

        });
        q.css("top", "25px").find('.__selectable').on('click touchstart', function() {
            var $ac = jQuery(this),
                $th = $ac.find('span:first'),
                $th0 = $ac.find('div:last').prev();

            if ($ac.hasClass('__selected') === false) {
                $ac.addClass('__selected');
                selectedTabDb[$th.attr('id')] =
                    printf('<li><div data-selected="%s" class="mus-tr_i __selectable soh-s __selected">' +
                        '<div class="mus-tr_hld">' +
                        '<span class="mus-tr_play __play js-mus-tr_play" id="%s" data-quest=\'{"song":"%s","cover":"%s"}\' title="Play"></span>' +
                        '<div class="mus-tr_cnt"> <span class="mus-tr_artist">%s</span>&nbsp;&#8211;&nbsp; <span class="mus-tr_song">%s</span> </div>' +
                        '<div class="mus-tr_right-controls foh-s"> <span class="mus-tr_add"></span> </div>' +
                        '</div></div></li>', selectedTabCount, $th.attr('id'), $th.data('quest')['song'], $th.data('quest')['cover'], $th0.find('span:first').text(), $th0.find('span:last').text());
                if (endSessionTabs == true) selctdC = selectedTabCount;
                endSessionTabs = false;
                selectedTabCount++;
                selectedCount.html(selectedTabCount);
            } else {
                delete selectedTabDb[$th.attr('id')];
                $ac.removeAttr('data-selected');
                jQuery(this).removeClass('__selected');
                endSessionTabs = true;
                selectedTabCount--;
                selectedCount.html(selectedTabCount);

            }
        });
        // resize popup layer		     
        ///q.find(':scrollable').css('height', socplusMusicLcnt.height() - 300);
    }; //end function


    var rd = function(a, trackId, w, s, x, y) {


        var req_rd = jQuery.ajax({
            url: settings.musicpth + settings.manageMyMusic,
            type: 'POST',
            data: {
                action: a,
                track: trackId,
                b: w,
                c: s,
                d: x,
                v: y

            },


            cache: false
        });
        req_rd.done(function(act) {


            if (a == 'trackSaveChanges') {
                jQuery('div[edit-track-id="' + trackId + '"]').each(function() {
                    var thisAlbumText = jQuery(this).find("a.mus-tr_album").html().split('>');
                    thisAlbumText = thisAlbumText[0] + '>' + thisAlbumText[1] + '>';
                    jQuery(this).find("a.mus-tr_artist").text(w);
                    jQuery(this).find("a.mus-tr_song").text(s);
                    jQuery(this).find("a.mus-tr_album").html(thisAlbumText + x);

                }).animate({
                    left: '+=50px',
                    opacity: '0.5'
                }, 500, "linear", function() {
                    jQuery(this).animate({
                        "left": "-=50px",
                        "opacity": "1"
                    }, 200);
                });
            }



            if (a === 'delete' || a === 'restore') {

                var my_pl_c_nt = jQuery('ul#lmPPLlst').find('div.' + activeclass + '>div.mml_notif__num');
                var n_c_fr_pl_m = (x === 'm' ? my_mus_notif : my_pl_c_nt);
                var myMusCount = parseInt(n_c_fr_pl_m.html()),
                    cf = null;
                var find_in_array_song_id = db_check_mymus.indxf(trackId);


                if (a === 'restore')
                    db_check_mymus.push(trackId);
                else if (a === 'delete')
                    delete db_check_mymus[find_in_array_song_id];

                if (a === 'delete' && audio.playing == true && trackId === jQuery('audio#audioTag').attr('track-id').match(/\d/g).join("")) {
                    audio.trackEnded(null, true);
                };
                cf = (a === 'delete' ? myMusCount - parseInt(1) : myMusCount + parseInt(1));
                animateNumCount(n_c_fr_pl_m, 200);
                n_c_fr_pl_m.html(cf);
            }

            if (a === 'deletePlaylist' && act === '1') {
                var find_in_array_id_pl = db_check_my_playlist.indxf(w);
                delete db_check_my_playlist[find_in_array_id_pl];
                delete db_playlists_from_search[find_in_array_id_pl];
                delete_page_content();
                return close_layer_popup(true);


            }

            if (act != '1')
                jQuery.socplusMusic('error', null, act);
        });
        req_rd.fail(function(b, c) {
            jQuery.socplusMusic('error', null, "Request failed: " + b.status);
        });
    };
    shrink_popups = function(a, b) {

        if (b) {
            var lyrics_dropDown = jQuery('.mus_dropdown');

            if (b == 'lyric_content') return lyrics_dropDown.find(':scrollable').css('max-height', socplusMusicLcnt.height() - 150);

            lyrics_dropDown.css('max-height', socplusMusicLcnt.height() - 100);

            return;
        }
        var popup = jQuery('#layer_popup');
        var ovr = jQuery('.layer_ovr');
        var pop = popup.find('.layer_ovr').find('div:eq(1)');
        var top = (ovr.height() / 2) - (pop.prop('height') / 2);

        pop.css({
            'top': top,
            'max-height': socplusMusicLcnt.height() - 10
        });

        if (jQuery('.mus_playlist-add_tracks').length !== 0)
            jQuery('.mus_playlist-add_tracks').css('max-height', socplusMusicLcnt.height() - 300);

        if (jQuery('iframe').length !== 0)
            jQuery('iframe').css('max-height', socplusMusicLcnt.height() - 300);

    };
    upload_popup = function() {

        if (upload_poup_qued) {
            upload_poup_qued = false;
            setTimeout(function() {
                run_layer_popup('uploadFiles', mcontent);
            }, 500);
        }

    };
    run_layer_popup = function(ac, appTo, id, at, vb) {

        close_layer_popup()
        if (!id)
            id = '';
        layer_popups = true;

        if (ac === 'uploadFiles' && document.all && !window.atob)
            return jQuery.socplusMusic('error', null, 'Sorry, but your browser needs improvements to use socplusMusic, please update your browse with a latest version.');


        var reqLayerPopup = jQuery.ajax({
            url: settings.musicpth + settings.layerPopup,
            type: 'POST',
            data: {
                action: ac,
                track: id,
                song: at,
                artist: vb
            },
            cache: false
        });
        reqLayerPopup.done(function(a) {
            if (a == '0') {
                jQuery.socplusMusic('error', null, "An error occured when loading popup layer");
            } else {
                jQuery(a).appendTo(appTo).find(".layer_close,.layer_ovr,.vl_a-sw").on('click', function(e) {
                    if (ac === 'get_video' && video_stopped_audio)
                        audio.play();
                    video_stopped_audio = false;
                    close_layer_popup()
                });
                // resize popups
                shrink_popups(appTo);

                if (vb) ac = "uploadFiles_PL";

                if (ac === 'confirmation') {
                    var confirmbtn = jQuery('span[ac="confirmBtn"]');
                    $document.on('keyup', function(e) {
                        if (e.keyCode == 13) confirmbtn.click()
                    });
                    confirmbtn.on('click', function() {
                        return rd('deletePlaylist', id, at);
                    });

                }

                // upload for feedback
                if (ac === 'feedback') {
                    var mus_feedback_button = jQuery('[send-m-feedback]');
                    jQuery('form#m_feedback_form').change(function() {
                        return jQuery.socplusMusic('upload', jQuery(this), 'feedback');
                    });

                    mus_feedback_button.on('click', function(e) {
                        e.preventDefault();
                        var $this = jQuery('div[feedback-popup-layer]');
                        var get_user_full_name = $this.find('input[name="m_feedback_field_name"]').val(),
                            get_user_email_adr = $this.find('input[name="m_feedback_u_email"]').val(),
                            get_feedback_subjc = $this.find('input[name="m_feedback_u_subject"]').val(),
                            get_feedback_descr = $this.find('textarea[name="m_feedback_u_message"]').val();
                        get_feedback_image = $this.find('input#feedback_upl_file').val();

                        if (!jQuery.trim(get_user_full_name) || !jQuery.trim(get_user_email_adr) || !jQuery.trim(get_feedback_subjc) || !jQuery.trim(get_feedback_descr))
                            return jQuery('#feedback_upload_output').html('<font color="red">* All fields are required.</font>');

                        jQuery.post(settings.musicpth + settings.manageMyMusic, {
                                action: 'send_feedback',
                                track: '0',
                                b: get_user_full_name,
                                c: get_user_email_adr,
                                s: get_feedback_subjc,
                                m: get_feedback_descr,
                                d: get_feedback_image
                            },
                            function(dt) {
                                if (dt === '0') return jQuery.socplusMusic('error', null, dt);
                                else return close_layer_popup();
                            });

                    });

                }

                // for upload files in my music
                if (ac === 'uploadFiles') {
                    jQuery('form#musicform').change(function(e) {
                        e.preventDefault();
                        return jQuery.socplusMusic('upload', jQuery(this));
                    });
                } else
                // for upload files in playlist
                if (ac === 'uploadFiles_PL') {
                    jQuery('form#musicform').find('[data-upload-hiden="true"]').val(id)
                        .closest('form#musicform').find('[data-upload-playlist-cover="true"]').val(at)
                        .closest('form#musicform').change(function() {
                            return jQuery.socplusMusic('upload', jQuery(this), id);
                        });
                }

                if (ac === 'download_song') return buy_song(close_layer_popup);

                if (ac === 'addPlaylist') {
                    var gwtHTML = '<div class="grt-HTML">You haven\'t chosen any songs to add to your playlist.</div>',
                        gwtFT = false,
                        action = 'createNewPlaylist',
                        gwt = jQuery('.grt-HTML'),
                        plListLPadd = jQuery('#emptyPlayList'),
                        RP = jQuery('#emptyPlayList'),
                        layerAddPlayList = jQuery('.playlist_add_layer_cnt'),
                        hiddenClass = 'm_hidden',
                        selectedCount = jQuery('.mus_tabs_i_a_count'),
                        myTab = jQuery('.mus_playlist-add_h').find('.mus_tabs_i:first'),
                        selectedTab = jQuery('.mus_playlist-add_h').find('.mus_tabs_i:last'),
                        errorDiv = jQuery('div.form_i'),
                        popupAddPlContent = jQuery('.mus_playlist-add_lst'),
                        popupAddPlContentDFH = popupAddPlContent.html(),
                        nameOfAlbum = jQuery('#nameOfAlbum'),
                        liveSearch = jQuery('#livesearch'),
                        btnCancel = jQuery('.vl_a-sw'),
                        btnCreate = jQuery('#gwt-uid');


                    RP.on('click', function(e) {
                        if (!at)
                            jQuery('#nameOfAlbum').focus();
                        else {
                            mplaceholder(null, jQuery('#nameOfAlbum'));
                            jQuery('#nameOfAlbum').focus().val(decodeURIComponent(at));
                            jQuery('.playlist_add_layer_cnt').find('div:first').text('Edit the playlist');
                            btnCreate.text('Save');
                            action = id;
                        }

                        layerAddPlayList.find('.mus_playlist-add_hld').removeClass(hiddenClass);
                        jQuery(this).addClass(hiddenClass);
                        addPLaylistPopupTrackClick(layerAddPlayList, selectedCount);
                    });
                    if (at) RP.click();
                    $document.on('keyup', function(e) {
                        if (e.keyCode == 13) btnCreate.trigger('click')
                    });


                    var manip_tabs = function(R) {
                        if (R === true) {
                            setTimeout(function() {
                                rmactive(myTab);
                                rmactive(selectedTab);
                            }, 50);
                        } else if (R === 2) {
                            rmactive(myTab);
                            aactive(null, selectedTab);
                            addPLaylistPopupTrackClick(layerAddPlayList, selectedCount, popupAddPlContent, gwtHTML, 's');
                        } else {
                            rmactive(selectedTab);
                            aactive(null, myTab);
                            addPLaylistPopupTrackClick(layerAddPlayList, selectedCount, popupAddPlContent, popupAddPlContentDFH, 'my');

                        }
                    }

                    livesearch_res = function(acesta, e) {
                        e.preventDefault();
                        var $this = acesta,
                            searchAddShadow = jQuery('.mus_playlist-add_shadow');
                        manip_tabs(true);
                        if (jQuery.trim($this.val())) {
                            $this.parent('div').find('span:last').addClass('__loading');
                            searchAddShadow.removeClass(hiddenClass);
                            var inpcont = jQuery.trim($this.val());
                            var searchRequest = jQuery.ajax({
                                url: settings.musicpth + settings.manageMyMusic,
                                type: 'POST',
                                data: {
                                    action: 'add_pl_search',
                                    b: jQuery.trim($this.val())
                                },
                                cache: false
                            });
                            searchRequest.done(function(d) {

                                $this.parent('div').find('span:last').removeClass('__loading').addClass('__clear').click(function(e) {
                                    e.preventDefault();
                                    $this.val('');
                                    jQuery(this).removeClass('__clear');
                                    popupAddPlContent.html(gwtHTML);
                                });
                                searchAddShadow.addClass(hiddenClass);
                                if (d === '0')
                                    popupAddPlContent.html(gwtHTML);
                                else {
                                    popupAddPlContent.html(d);
                                    addPLaylistPopupTrackClick(layerAddPlayList, selectedCount);
                                    if (audio.playing) {
                                        var gp = jQuery('audio').attr('track-id');
                                        jQuery('[title="Pause"]').attr('title', 'Play').removeClass('__pause');
                                        popupAddPlContent.find('span#' + gp).attr('title', 'Pause').addClass('__pause');
                                    }
                                    for (k in selectedTabDb)
                                        popupAddPlContent.find('span#' + k).closest('li').find('div:first').addClass('__selected');
                                }

                            });

                            searchRequest.fail(function(a, b) {
                                jQuery.socplusMusic('error', null, b.status);
                            });
                        } else popupAddPlContent.html(gwtHTML);

                        /// });
                    };

                    liveSearch.on('keyup', function(e) {
                        clearTimeout(doneTyping_Interval);
                        doneTyping_Interval = setTimeout(function() {
                            livesearch_res(liveSearch, e);
                        }, 500)
                    });
                    liveSearch.on('keydown keypress', function(e) {
                        clearTimeout(doneTyping_Interval)
                    });
                    //btnCancel.click(function(){jQuery.socplusMusic('goBack')});

                    myTab.on('click', function(e) {
                        e.preventDefault();
                        manip_tabs();
                    });

                    selectedTab.on('click', function(e) {
                        e.preventDefault();
                        manip_tabs(2);

                    });
                    btnCreate.on('click', function(e) {
                        e.preventDefault();

                        if (jQuery.trim(nameOfAlbum.val()) === '') {
                            nameOfAlbum.focus();
                            return errorDiv.addClass('form_i__error');
                        } else
                            playlistData = (Object.keys(selectedTabDb).length !== 0 ? selectedTabDb : false);
                        btnCreate.addClass('mus_disbl').text('Processing...').next().addClass('mus_disbl');
                        newPlaylist(nameOfAlbum.val(), playlistData, btnCreate, btnCreate.next(), action);
                        errorDiv.removeClass('form_i__error');
                        jQuery('#mus_crpl_error').remove();

                    });



                }

                // update changes of track
                if (ac == 'editTrack') {
                    var buttonSave = jQuery("button[data-action='trackSaveChanges']"),
                        track_artist = jQuery("input.tred[data-query='mus_artist']"),
                        track_title = jQuery("input.tred[data-query='mus_title']"),
                        track_album = jQuery("input.tred[data-query='mus_album']"),
                        track_cover = jQuery("input.tred[data-query='mus_cover']"),
                        allow_cover = track_cover.length != 0 ? true : false;
                    jQuery('input').on('keypress', function() {
                        jQuery('.form_i__error').removeClass('form_i__error');
                    });
                    buttonSave.click(function() {
                        var $this = jQuery(this),
                            bt = jQuery('.vl_a-sw'),
                            bm = jQuery('[data-action="trackSaveChanges"]');
                        if (!jQuery.trim(track_artist.val())) {
                            track_artist.parent('div').addClass('form_i__error');
                            return;
                        } else if (/^\d+$/.test(track_artist.val())) {
                            return jQuery.socplusMusic('error', null, 'Please enter a valid artist name.');
                        } else if (!jQuery.trim(track_title.val())) {
                            track_title.parent('div').addClass('form_i__error');
                            return;
                        } else if (/^\d+$/.test(track_title.val())) {
                            return jQuery.socplusMusic('error', null, 'Please enter a valid song name.');
                        } else if (!jQuery.trim(track_album.val())) {
                            track_album.parent('div').addClass('form_i__error');
                            return;
                        } else if (/^\d+$/.test(track_album.val())) {
                            return jQuery.socplusMusic('error', null, 'Please enter a valid album name.');
                        } else if (allow_cover && track_cover.val().substr(0, 7) != 'http://') {
                            return jQuery.socplusMusic('error', null, 'Address for image must begin with http://');
                        } else if (!jQuery.trim(track_cover.val()) && allow_cover) {
                            track_cover.parent('div').addClass('form_i__error');
                            return;
                        } else if (jQuery.trim(track_cover.val()) && allow_cover) {
                            bm.text('Validating cover...');
                            var __calback_func = function(resp) {

                                if (resp == 'error') {
                                    bm.text('Retry');
                                    return jQuery.socplusMusic('error', null, 'Please enter a valid cover URL, the current url you entered is not like a cover.');
                                } else if (resp == 'timeout') {
                                    bm.text('Retry');
                                    return jQuery.socplusMusic('error', null, 'During verification of the cover has elapsed, please try again.');
                                } else {
                                    bm.text('Ready');
                                    setTimeout(function() {
                                        bt.trigger('click');
                                    }, 200);
                                    return rd('trackSaveChanges', $this.attr('data-track'), track_artist.val(), track_title.val(), track_album.val(), allow_cover ? track_cover.val() : '');
                                }

                            };
                            var cv_tmout = 9000;
                            var timedOut = false,
                                timer;
                            var img = new Image();
                            img.onerror = img.onabort = function() {
                                if (!timedOut) {
                                    clearTimeout(timer);
                                    __calback_func('error');
                                }
                            };
                            img.onload = function() {
                                if (!timedOut) {
                                    clearTimeout(timer);
                                    __calback_func('success');
                                }
                            };
                            img.src = track_cover.val();
                            timer = setTimeout(function() {
                                timedOut = true;
                                __calback_func('timeout');
                            }, cv_tmout);

                            return;
                        }

                        setTimeout(function() {
                            bt.trigger('click');
                        }, 200);
                        return rd('trackSaveChanges', $this.attr('data-track'), track_artist.val(), track_title.val(), track_album.val(), allow_cover ? track_cover.val() : '');
                    });

                }



                // hide/show placeholder
                var $inpt = jQuery('input'),
                    $placeholder = jQuery('div>input').next();
                $inpt.on('keypress keyup', function() {
                    mplaceholder(jQuery(this));
                });
                $placeholder.on('click', function() {
                    mplaceholder(jQuery(this).prev());
                });

                // when layer is opened set focus for first input
                setTimeout(function() {
                    jQuery('#layer_popup').find('input:first').focus();
                }, 100);

            }
        });
        reqLayerPopup.fail(function(b, c) {
            jQuery.socplusMusic('error', null, "Request failed: " + b.status);
        });
    };
    var closeErrorReporting = function(z) {
        jQuery('div[data-error="' + z + '"]').remove();
    };

    var mplDis = function(Q) {
        var s_forWard = jQuery('.__forward'),
            s_backBtn = jQuery('.__back'),
            s_playBtn = jQuery('.__play');

        if (Q) {
            s_forWard.addClass(disabledClass);
            s_backBtn.addClass(disabledClass);
            s_playBtn.addClass(disabledClass);
        } else {
            s_forWard.removeClass(disabledClass);
            s_backBtn.removeClass(disabledClass);
            s_playBtn.removeClass(disabledClass);
        }

    };
    close_layer_popup = function(r) {
        if (audio.playing && readFromPopup === true) {
            mplDis(true);
            playListEnd();
        }
        //destroy session of last created playlist
        selectedTabDb = {}, selectedTabCount = 0;
        closeErrorReporting('maxfiles');
        socplusMusicLcnt.find("#layer_popup").remove();
        $body.find("#layer_popup").remove();
        if (r) {
            m_noAjax = false;
            jQuery.socplusMusic('getUserData', r);
        }

        layer_popups = false;
    };

    // implemented in v1.5
    close_recent_dropDown = function() {
        layer_popups = false;
        socplusMusicLcnt.find('div.mus_dropDown_active').remove();
    };

    ListofTracks = __constructPlaylist();
    var methods = {
        init: function(options, x) {
            createCookie("inited", true, '1');
            createCookie("tk_m", Math.random(), '1');
            createCookie('srch_display_tracks', false, '1');
            jQuery.getScript(settings.host + settings.musicpth + 'javascript/jquery.history.js');
            jQuery.getScript(settings.host + settings.musicpth + 'javascript/jquery.form.js');
            jQuery.getScript(settings.host + settings.musicpth + 'javascript/jquery.ui.touch-punch.min.js');
            jQuery.socplusMusic('getsocplusMusicHTML', 'initstart');
			if(!mus_start_invisible)jQuery('html').addClass('musicon');
			mus_start_invisible = !true;
			// show header mini player
			jQuery('.header_play_scrubber').addClass('_inline');
            $window.resize(function() {
                resizesocplusMusicLayer();
            });

            /*
            if (x === true) {
                bu = bu.split('/');
                jQuery.socplusMusic('onGbk', bu[2], true);
                bu = "";
            }*/
            var inslct_nam, inslct_num;
            switch (settings.catselectoninit) {
                case 'popular':
                    inslct_nam = popular;
                    inslct_num = 1;
                    break;
                case 'playlist':
                    inslct_nam = playlist;
                    inslct_num = 2;
                    break;
                case 'upload':
                    inslct_nam = upload;
                    inslct_num = 3;
                    break;
                case 'purchased':
                    inslct_nam = purchased;
                    inslct_num = 4;
                    break;
                case 'radio':
                    inslct_nam = radio;
                    inslct_num = 5;
                    break;
                case 'MYmusic':
                    inslct_nam = my_music;
                    inslct_num = 6;
                    break;
                default:
                    inslct_nam = popular;
                    inslct_num = 1;
            }
            // init  #default category selected
            //jQuery.socplusMusic('leftmenu',inslct_nam,inslct_num);

            // hide the body scroll bar 
            jQuery('body').css('overflow', 'hidden');

            setTimeout(function() {
                inslct_nam.click();
                if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) search_input_gl.focus();
				// for mini player, activate buttons when the music is inited
				$('.header_mus_player').addClass('__on');
            }, 10);

            // upload
            upload.on('click', function(e) {
                e.preventDefault();
                mbsubc = true;
                upload_poup_qued = true;
                my_music.children(':first').trigger('click');
                myMusSubCat = true;
                return;
            });
            // popular music
            popular.click(function() {
                ///   jQuery.socplusMusic('leftmenu', jQuery(this), 1);
            });
            // playlist
            playlist.click(function() {
                /// jQuery.socplusMusic('leftmenu', jQuery(this), 2);
            });
            // purchased
            purchased.click(function() {
                // jQuery.socplusMusic('leftmenu', jQuery(this), 4);
            });
            // radio
            radio.click(function() {
                //  jQuery.socplusMusic('leftmenu', jQuery(this), 5);
            });

            mus_usersearch.click(function(e) {
                e.stopPropagation();
                jQuery(this).addClass('__opened').find('input:first').focus();
            });

            $document.on('click', function(e) {
                if (dropDownTimeout !== null) {
                    clearTimeout(dropDownTimeout);
                }
                activateDropDown(false);
                dropDownActive = false;
                mus_usersearch.removeClass('__opened');
                close_recent_dropDown();
                sharing_dropDown_active = false;
                lyrics_dropDown_active = false;
                last_upl_dropDown_active = false;
                layer_popups = false;
            });




            // get lyrics of current playing song,  (this module was implemented in v1.5)
            get_lyrics = function(artist, song) {
                close_recent_dropDown();

                if (lyrics_dropDown_active) {
                    lyrics_dropDown_active = false;
                    layer_popups = false;
                    contenteditable = false;
                    return;
                }
                var reqLyricsDropDown = jQuery.ajax({
                    url: settings.musicpth + settings.manageMyMusic,
                    type: 'POST',
                    data: {
                        action: 'lyricDropDown',
                        track: 0
                    },
                    cache: false
                });

                reqLyricsDropDown.done(function(data) {


                    if (data !== 0) {
                        jQuery('#_lyrics_content').html(data).click(function(e) {
                            e.preventDefault();
                            e.stopPropagation()
                        });
                        jQuery('.lyric_close').on('click', function(e) {
                            e.preventDefault();
                            lyrics_dropDown_active = false;
                            layer_popups = false;
                            contenteditable = false;
                            jQuery('#_lyrics_content').html('');
                        });
                        shrink_popups(null, true);
                        lyrics_dropDown_active = true;
                        layer_popups = true;
                        // check if for this song is avalaible lyrics
                        var reqLyrics = jQuery.ajax({
                            url: settings.musicpth + settings.manageMyMusic,
                            type: 'POST',
                            data: {
                                action: 'Lyrics',
                                track: 0,
                                b: jQuery('.mus_player_artist').text(),
                                c: jQuery('.mus_player_song').text()
                            },
                            dataType: 'json',
                            cache: false
                        });

                        reqLyrics.done(function(response) {
                            var lyrrics_popup_error_msg = '<div class="lyrics_msg_error">' +
                                '<span class="lyrics_error_text">%s.</span>' +
                                '<span class="lyrics_trashed"></span></div>';

                            var lyrics_popup_content = '<div class="lyrics_resp_success_result">' +
                                '<div class="lyric_cover_url"><img src="%s" border="0">' +
                                '<br/>' +
                                '<span class="lyric_artist_name">%s</span>' +
                                ' - ' +
                                '<span class="lyric_song_name">%s</span>' +
                                '</div>' +
                                '<div class="lyric_text"><p onclick="set_editable(this);">%s</p></div>' +
                                '</div>';



                            for (var key in response) {
                                if (response.hasOwnProperty(key) && response[key]['l_error'] === '0') {

                                    var l_a = typeof response[key]['l_artist'] == 'object' ? response[key]['l_artist'][0] : response[key]['l_artist'],
                                        l_s = typeof response[key]['l_song_name'] == 'object' ? response[key]['l_song_name'][0] : response[key]['l_song_name'],
                                        l_t = typeof response[key]['l_text'] == 'object' ? response[key]['l_text'][0] : response[key]['l_text'],
                                        l_c = response[key]["l_cover"];

                                    jQuery('#lyrics_popup_content').html(printf(lyrics_popup_content, l_c, l_a, l_s, l_t));
                                    shrink_popups(null, 'lyric_content');
                                } else jQuery('#lyrics_popup_content').html(printf(lyrrics_popup_error_msg, response[key]['l_error']));
                            }

                        });
                        reqLyrics.fail(function(a, b) {
                            return jQuery.socplusMusic('error', null, "Request failed: " + b)
                        });
                    }




                });


                reqLyricsDropDown.fail(function(a, b) {
                    return jQuery.socplusMusic('error', null, "Request failed: " + b)
                });


            };



            // get the count of my music
            jQuery.ajax({
                url: settings.musicpth + settings.manageMyMusic,
                type: 'POST',
                data: {
                    action: 'myMusCount'
                },
                cache: false,
                success: function(d) {
                    animateNumCount(my_mus_notif, 1000);
                    my_mus_notif.html(d)
                }
            });

            // get history
            jQuery.post(settings.musicpth + settings.manageMyMusic, {
                    action: 'update_history',
                    track: '0',
                    b: 'getData'
                })
                .done(function(d) {
                    jQuery.each(JSON.parse(d), function(i, s) {
                        db_user_history[s] = s;
                    });
                });

            // check for my music and add class "Song added"
            jQuery.post(settings.musicpth + settings.manageMyMusic, {
                    action: 'checkMyMusic',
                    track: '0'
                })
                .done(function(d) {
                    jQuery.each(JSON.parse(d), function(i, items) {
                        db_check_mymus[i] = items;
                    });
                });

            // check for playlists if exists into my collection add class Added
            jQuery.post(settings.musicpth + settings.manageMyMusic, {
                    action: 'checkMyCollection',
                    track: '0'
                })
                .done(function(d) {
                    jQuery.each(JSON.parse(d), function(i, items) {
                        db_check_my_playlist[i] = items;

                        if (/-/i.test(items)) {
                            ow = db_check_my_playlist.indxf(items);
                            db_playlists_from_search.push(items.split('-')[1]);
                            delete db_check_my_playlist[ow];
                        }

                    });
                });

            // check for updated playlists and turn on the green lamp
            setInterval(function() {
                jQuery.post(settings.musicpth + settings.manageMyMusic, {
                        action: 'get_playlist_notif',
                        track: '0'
                    })
                    .done(function(d) {
                        if (d === '00') return;
                        jQuery.each(JSON.parse(d), function(i, id) {
                            jQuery("#lmPPLlst").find('div#ppl_' + id).closest('li').attr('data-playlist-update', 'true').find('span.mus_dot').removeClass(hiddenClass).addClass('dot_notification');
                            my_music_dot_notif.removeClass(hiddenClass);
                        });
                    });
            }, 1000 * 60 * settings.updatePLDOTNotif);


            // hide on esc
            ///$document.on('keyup',function(e) { if(e.keyCode == 27 && settings.hideOnESC && layer_popups === false) jQuery.socplusMusic('hide'); });
            // hide on overlay
            overlay.on('click', function() {
                if (settings.hideOnOverlay) jQuery.socplusMusic('hide');
            });

            // search friends 
            jQuery(".mus_user-search_it").on('keyup', function() {


                var filter = jQuery(this).val(),
                    count = 0,
                    $this = jQuery(this),
                    show_all_friends = jQuery('#mus_show_all_friends'),
                    th = $this.closest('.mus_user-search').find('span.mus_user-search_ic'),
                    loadingClass = '__loading',
                    loadedClass = '__loaded';


                $this.closest('.mus_user-search').find('span.mus_user-search_ic').removeClass(loadedClass).addClass(loadingClass);

                var opw = function() {
                    th.removeClass(loadedClass + ' ' + loadingClass);
                    $this.val('');
                    jQuery(".mus_friends").show();
                    jQuery('.mus_user-search_empty').find('p:first').text('');
                    jQuery(".mus_friends").filter('[aria-hidden="true"]').hide();
                    if (s_all_fr)
                        jQuery(".mus_user-search_empty").find('p:last').hide();

                };

                if (filter != "") {
                    jQuery('.mus_user-search_empty').find('p:first').text('');
                    th.addClass(loadedClass).click(function() {
                        opw()
                    });
                } else {
                    opw();
                }

                jQuery(".mus_friends").each(function() {
                    var $this = jQuery(this),
                        nm_fs = $this.text().replace('<br>', ' ');
                    if (nm_fs.search(new RegExp(filter, "i")) < 0) {
                        $this.hide();
                    } else {
                        $this.show();
                        count++;
                    }
                    if (filter === "") $this.filter('[aria-hidden="true"]').hide();
                });


                var numberItems = count;
                if (!numberItems) {
                    jQuery('.mus_user-search_empty-tx').show().find('a').show();
                    jQuery('.mus_user-search_empty').show().find('p:first').show().text('You don\'t have friends with such a name.');
                }


            });



            // my music click
            my_music.on('click.showb', function(e) {
 
 
                if (mbsubc == false) {

                    jQuery('#lmPPLlst').addClass('mus_playlist_lst__on');
                    my_music.find('span>i').addClass('__open');
                    if (!myMusSubCat)
                        this.sbcat = true;

                    if (my_music.hasClass(activeclass) == true) {



                        if (!this.sbcat) {
                            this.sbcat = true;
                            my_music.find('span>i').addClass('__open');
                            jQuery('#lmPPLlst').addClass('mus_playlist_lst__on');
                        } else {
                            this.sbcat = false;
                            my_music.find('span>i').removeClass('__open');
                            jQuery('#lmPPLlst').removeClass('mus_playlist_lst__on');
                        }

                    }

                    myMusSubCat = true;

                }

                mbsubc = false;
                socplusMusicLcnt.find('img').error(function() {
                    var $this = jQuery(this);
                    delete_died_covers($this.attr('src'));
                    $this.unbind('error').hide().attr({
                        'aria-hidden': 'true',
                        'df-img': 'true'
                    });
                });


            });

            createPlaylist.click(function(e) {
                // e.preventDefault();e.stopPropagation();
                return run_layer_popup('addPlaylist', socplusMusicLcnt);

            });

            // when uploaded file
            my_musUpl.click(function() {
                // jQuery.socplusMusic('leftmenu', my_music, 7);
            });
            // back page <
            hback.on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                jQuery.socplusMusic('goBack');

            });

            // search suggestions
            var bl_m_srch_cnt = jQuery('#hook_Block_MusicSearch');
            clear_suggestion = function() {
                    clearTimeout(search_typingTimer);
                    bl_m_srch_cnt.hide().html('');
                },
                __search_html = ' <div id="_hook_MS_"></div>' +
                ' <div class="search_suggest_w suggest __active __dark">' +
                ' <a id="ts_def" class="search_suggest_show-all_w js-ts_it" data-search-sugg="all" data-href="search" data-action="true">' +
                ' <div class="search_suggest_show-all">All results</div>' +
                ' </a>' +
                ' <div class="search_suggest">' +
                ' <div class="search_suggest_block" id="sg_artists" data-search-sugg="artist" data-href="search" data-action="true" style="display:none;"><a data-mode="Artist" propagate="true" class="search_suggest_t"><span class="search_suggest_t_hld textWrap ellip">Artists</span></a></div>' +
                ' <div class="search_suggest_block" id="sg_albums"  data-search-sugg="album"  data-href="search" data-action="true" style="display:none;"><a data-mode="Album" propagate="true" class="search_suggest_t"><span class="search_suggest_t_hld textWrap ellip">Albums</span></a>' +
                ' </div></div></div></div></div></div></div></div>',

                __search_html_artists = ' <div class="suggest_ul">' +
                ' <div class="suggest_li">' +
                ' <div id="tsi_%s" class="ucard js-ts_it"><span title="%s" data-href="search" data-action="true" data-query="?action=searchResult&method=inx&key=%s" search-suggestions="true" class="js-ts_link ucard_main-link"></span>' +
                ' <div class="ucard_img ucard_img stub-img stub-img__50 stub-img__musicartist"><span class="ucard_img_a"><img class="ucard_img_cnt" src="%s"></span>' +
                ' </div>' +
                ' <div class="ucard_info">' +
                ' <div class="ucard_info_name ellip"><span class="ellip">%s</span>' +
                ' </div></div></div></div></div></div>',

                __search_html_albums = ' <div class="suggest_ul">' +
                ' <div class="suggest_li">' +
                ' <div id="tsi_%s" class="ucard js-ts_it"><span title="%s"  data-href="search" data-action="true" data-query="?action=searchResult&method=album&key=%s&alb=%s" search-suggestions="true" class="js-ts_link ucard_main-link"></span>' +
                ' <div class="ucard_img ucard_img stub-img stub-img__50 stub-img__musicset"><span class="ucard_img_a"><img class="ucard_img_cnt" src="%s"></span>' +
                ' </div>' +
                ' <div class="ucard_info">' +
                ' <div class="ucard_info_name ellip"><span class="ellip">%s</span>' +
                ' </div>' +
                ' <div class="ucard_add-info">' +
                ' <div class="ucard_add-info_i"><span class="ellip">%s</span>';


            var __mus_search_eng = function(x, $this) {

                if (x) {
                    $this.parent('label')
                        .find('span:last>i')
                        .removeClass('mml_ic_search')
                        .addClass('ic_close-g').on('click', function(e) {
                            $this.val('').focus();
                            __mus_search_eng(false, $this);
                        });


                    var m_searchAjax = jQuery.ajax({
                        url: settings.musicpth + settings.search_engine,
                        type: 'GET',
                        data: {
                            action: 'live_srch',
                            tk: readCookie('tk_m'),
                            key: encodeURIComponent(jQuery.trim($this.val()))
                        },
                        //dataType:'json',
                        cache: false

                    });

                    m_searchAjax.done(function(data) {

                        if (data !== '0') {

                            bl_m_srch_cnt.show().html(__search_html).find('[data-search-sugg="all"]').on('click', function(e) {
                                e.preventDefault();
                                clear_suggestion()
                            }).attr('data-query', '?action=searchResult&method=inx&key=' + encodeURIComponent($this.val()));
                            bl_m_srch_cnt.find('[data-search-sugg="artist"]').on('click', function(e) {
                                e.preventDefault();
                                clear_suggestion()
                            }).attr('data-query', '?action=searchResult&method=artists&key=' + encodeURIComponent($this.val()));
                            bl_m_srch_cnt.find('[data-search-sugg="album"]').on('click', function(e) {
                                e.preventDefault();
                                clear_suggestion()
                            }).attr('data-query', '?action=searchResult&method=inx&key=' + encodeURIComponent($this.val()));


                            // for artists
                            jQuery.each(data.artists, function(i, item) {
                                bl_m_srch_cnt.find('#sg_artists').show().append(printf(__search_html_artists, item.id, item.an, encodeURIComponent(item.an), item.cv, item.an))
                                    .find('img').error(function() {
                                        var $this = jQuery(this);
                                        delete_died_covers($this.attr('src'));
                                        $this.unbind('error').attr('src', settings.artistCoverError);
                                    });
                                ajax_update_href_links();
                            });
                            // for albums
                            jQuery.each(data.albums, function(i, item) {

                                bl_m_srch_cnt.find('#sg_albums').show().append(printf(__search_html_albums, item.id, item.an, encodeURIComponent(item.aa), encodeURIComponent(item.an), item.cv, item.an, item.aa))
                                    .find('img').error(function() {
                                        var $this = jQuery(this);
                                        delete_died_covers($this.attr('src'));
                                        $this.unbind('error').attr('src', settings.noReadPlaylistCover);
                                    });

                                //__search_html = printf(jQuery(__search_html).find('div#sg_albums').attr('data-query'),encodeURIComponent(item.an),encodeURIComponent(item.aa));
                                ajax_update_href_links();

                            });



                        } else jQuery.socplusMusic('error', null, 'Error occured at searching, please try again');




                    });
                    m_searchAjax.fail(function(a, b) {
                        jQuery.socplusMusic('error', null, 'Error occured at send data, error: ' + b.status);
                    });



                } else {
                    $this.parent('label')
                        .find('span:last>i')
                        .addClass('mml_ic_search')
                        .removeClass('ic_close-g');
                    return clear_suggestion();
                }
            };

            var search_doneTyping = function($this) {

                if (!search_suggestion_disable) {
                    if (!jQuery.trim($this.val()))
                        __mus_search_eng(false, $this);
                    else
                        __mus_search_eng(true, $this);
                }
            };

            search_input_gl.on('keyup', function(e) {
                var $this = jQuery(this);
                btn_search_gl.attr('data-query', '?action=searchResult&method=inx&key=' + encodeURIComponent(jQuery.trim($this.val())));
                if (e.keyCode == 13 && jQuery.trim($this.val())) {
                    clear_suggestion();
                    return btn_search_gl.trigger('click');
                }
                clearTimeout(search_typingTimer);
                if (e.keyCode != 13)
                    search_typingTimer = setTimeout(function() {
                        search_doneTyping($this);
                    }, search_doneTypingInterval);
                else clear_suggestion();

            });

            search_input_gl.on('keydown', function(e) {
                clearTimeout(search_typingTimer);
            });
            // click on search btn
            btn_search_gl.mouseover(function(e) {
                e.preventDefault();
                jQuery(this).attr('data-query', '?action=searchResult&method=inx&key=' + encodeURIComponent(jQuery.trim(search_input_gl.val())))
            }).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                search_suggestion_disable = true;
                clearTimeout(search_typingTimer);
                clear_suggestion();
            }).removeAttr(disabledClass);
            /*
            // create small play pause button on toolbar menu
	    var toolbar_music_play_pause_el_a = jQuery('<a href="javascript:;"></a>');
	    var toolbar_music_play_pause_el_d = jQuery('<div id="tb_bt_small" onclick="audio.playPause();"></div>').addClass('d_layer_toolbar_ic_pl');   
	    var toolbar_music_play_pause = toolbar_music_play_pause_el_a.html(toolbar_music_play_pause_el_d);
	    jQuery('[plpsbtn="1"]').append(toolbar_music_play_pause);
	   */

        },
        getsocplusMusicHTML: function(x) {

            var leftside = jQuery('#mus_space_for_friends'),
                no_flash_blk = jQuery('.m_no_flash_block'),
                mloading = jQuery('.mus_loading_ic'),
                hh08 = jQuery('#lmPPLlst');


            if (x === 'initstart') {

                ///mcontent.append('<div class="mus_loading_ic"></div>');
                hh08.removeClass(hiddenClass);
                no_flash_blk.attr('aria-hidden', 'true').hide();
                left_side_scroll.removeAttr('style');
                m_maft_sh.removeAttr('style');

                var getFriendsAjaxRequest = jQuery.ajax({
                    url: settings.musicpth + settings.manageMyMusic,
                    type: 'POST',
                    data: {
                        action: 'getFriends',
                        track: '0'
                    },
                    cache: false
                });

                getFriendsAjaxRequest.done(function(d) {
                    if (d === '0') {
                        jQuery('.mus_user-search').addClass('curDefault __na');
                        leftside.html('<div class="taCenter"><br>Your friends will be displayed in this section</div>');
                    } else
                        leftside.html(d);
                    ajax_update_href_links();
                });
                getFriendsAjaxRequest.fail(function(a, b) {
                    jQuery.socplusMusic('error', null, b.status);
                });

            } else if (x === 'load')
                mcontent.append('<div class="mus_loading_ic mus_loading"></div>');
            else if (x === 'ajax_timeout')
                no_flash_blk.css('z-index', '300').attr('aria-hidden', 'false').show();
            else if (x === 'ok') {
                mcontent.find(mloading).remove();
                no_flash_blk.attr('aria-hidden', 'true').hide();
            }

        },
        error: function(z, tx) {
            var randomId = Math.floor((Math.random() * 1000) + 1);
            var timeON = 0;
            var msg = "Error",
                maxFiles = (settings.maximumFileUpload == 0 ? '20' : settings.maximumFileUpload);
            jQuery(".mus_errorReporting,.layer_ovr_err").remove();
            switch (z) {
                case 'maxfiles':
                    msg = printf(settings.errorMaximumFileTxt, maxFiles);
                    break;
                case 'uploadFile':
                    msg = tx;
                    break;
                case 'navigation':
                    msg = '[ SERVER ] ' + tx;
                    break;
                default:
                    msg = tx;
            }


            var cdiv = jQuery('<div></div>');
            cdiv.addClass(settings.errorReportingCSS);
            if (settings.errorReportingCSS === 'm_s_song_error')
                msg = '<div class="m_s_error_close"></div><div class="m_s_song_error_label">' + msg + '</div>';
            cdiv.html(msg).appendTo(mcontent.find('div:first')).attr({
                'id': 'musct_' + randomId,
                'data-error': z
            });
            if (settings.errorAutoClose === true)
                setTimeout(function() {
                    jQuery('#layer_ovr_err_' + randomId + ', #musct_' + randomId).remove();
                }, settings.errorTimeout);
            jQuery('<div class="layer_ovr_err" data-error="' + z + '" id="layer_ovr_err_' + randomId + '"></div>').appendTo(mcontent);
            jQuery('.' + settings.errorReportingCSS).click(function() {
                var thisId = jQuery(this).attr('id'),
                    ovrId = thisId.split('_');
                jQuery('#layer_ovr_err_' + ovrId[1] + ', #' + thisId).remove();
            });
            jQuery('.layer_ovr_err').click(function() {
                var thisId = jQuery(this).attr('id'),
                    errId = thisId.split('_');
                jQuery('#' + thisId + ', #musct_' + errId[3]).remove();
            });
            errorOcurred = 1;
            setTimeout(function() {
                errorOcurred = 0;
            }, 100);

        },
        updatesocplusMusicHead: function(ct, rcm) {

            var sortCursor = 'pointer',
                trackoff = jQuery(".mus_track"),
                setPosition = jQuery(".js-pl-edit"),
                spupl = jQuery("#mus_spupl"),
                mus_info = jQuery(".mus-tr_info,.mus-tr_right-controls"),
                mus_time = jQuery(".mus-tr_time"),
                finishEdit = jQuery(".js-pl-edit-finish"),
                finishUpdt = jQuery('.finish_my_music'),
                sortMus = jQuery("div#mus_sort"),
                editTrack = jQuery("[data-action='edit']"),
                addPlList = jQuery("#myMusicPPLCreateText"),
                radio_station = jQuery('.mus_radio_stations_i'),
                mus_add = jQuery('.js-mus-tr_add'),
                add_collection = jQuery('#add_collection'),
                audioTag = jQuery('audio'),
                firstTrack = null,
                mus_playBtn = jQuery('[data-action="play"]'),
                mus_playBtn_first = jQuery('[data-action="play"]:first'),
                m_custm_scrolling = mcontent.find('.m_c_s_scrollable:first'),
                myMusicselectCover = jQuery('.mus_album_side:last'),
                underCoverArtistName = jQuery('div.mus_album_i__fixed>.m_c_s_c_go_to'),
                cvmmumen = jQuery('.mus_album_i__fixed'),
                currentPlayingSong = jQuery('audio').attr('track-id'),
                dropDown = jQuery('.mus-tr_dropdown'),
                height_of_pl = jQuery('.mus_album-list'),
                pl_tr_nm = jQuery('.mus_player_seek-artist'),
                mus_f_m_songs = jQuery('[d-more-songs="true"]'),
                video_play = jQuery('[data-showVideo="true"]'),
                show_all_friends = jQuery('#mus_show_all_friends'),
                mus_f_m_users_songs = jQuery('[data-users-mr-sng="true"]'),
                my_playlist_upload_music = jQuery('[data-pl-upload]'),
                download_track = jQuery('.js-mus-tr_download'),
                ol_li = socplusMusicLcnt.find('ol li'),
                tabs = jQuery('.__multitop'),
                allGenre = tabs.find('div.1'),
                hp = tabs.find('div.2'),
                trance = tabs.find('div.3'),
                popDance = tabs.find('div.4'),
                rock = tabs.find('div.5'),
                other = tabs.find('div.6'),
                forWard = jQuery('.__forward'),
                backBtn = jQuery('.__back'),
                mus_scroll_down = jQuery('.m_c_s_scrollable'),
                playlistnomus = jQuery('.ppl_empty_layer_cnt'),
                playlistedit_actions = jQuery('#playlist_nemp_manip'),
                mus_pl_playing = jQuery('.mus_player_playing-cnt'),
                recommendations = jQuery('.m_recommendations_w'),
                rc_data = jQuery('.m_recommendations_track-list'),
                leftcollection = jQuery('ul#lmPPLlst'),
                playlist_tr = jQuery('.col-card'),
                in_page_exist_pl = jQuery('.pl-mb-90'),
                search_result_artistalbums = jQuery('[mus-search-result="artist_albums"]'),
                search_result_more_songs = jQuery('[data-srch-rs-mr="true"]'),
                search_result_more_sm_ar = jQuery('[data-srch-mr-sm-ar="true"]'),
                pl_updates_notif = jQuery('[data-playlist-update]'),
                pl_auto_play = jQuery('#this_playlist_active'),
                pl_f_title = jQuery('[m_ppl_title]'),
                pl_f_pause = jQuery('[uid="pause"]'),
                pl_my_edit = jQuery('[data-pl-edit]'),
                pl_srch_res = jQuery('[data-search-res-add]'),
                pl_title_name = 'mus_card_n',
                pl_create_il_play = null,
                pl_f_play_pause = false,
                vrq = false,
                radio_play_pause = false,
                hv_track_time_show = true,
                video_timeout_h = null,
                ip_touch = '',
                dftscr = 0,
                auto_load_scroll = 0,
                rcmpage = 1,
                scrollreturn = false,
                scrollcountminus = 230,
                scrollcountminus_y = 100,
                errorOcurred = 0;
            mus_sroll_ov = jQuery('.mus-tr_lst');
            curr_history_addr = getNavigator();

            saddedHTML = '<div class="mus-tr_right-controls foh-s">' +
                '<span class="muc-tr_right-controls_tx">' +
                '<span class="mus-tr_right-controls_message">Song added</span></span></div>';

            var get_pl_song_in_src_res = function() {

                if (search_result_more_songs.length !== 0 && search_result_more_songs.is(':visible') && ol_li.find('span#' + jQuery('audio#audioTag').attr('track-id')).closest('li').attr('aria-hidden') === 'true')
                    return search_result_more_songs.click();
            };


            // download song
            if (getNavigator() !== 'downloads') {
                download_track.on('click', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return call_buy_popup(this);
                });
            };

            // video 
            video_play.hover(
                function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    jQuery.socplusMusic('showVideoPopup', jQuery(this));
                },
                function(e) {
                    e.preventDefault();
                    jQuery.socplusMusic('removeVideoLabel', jQuery(this));
                }
            ).on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return jQuery.socplusMusic('get_track_video', jQuery(this).data('video'));
            });

            // last uploads
            jQuery('.m_last_uploads').on('click', function(e) {
                var $this = jQuery(this),
                    x = jQuery('.mus_tabs_i.1');
                close_recent_dropDown();
                if (x.hasClass(activeclass)) {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    if (!last_upl_dropDown_active) {

                        jQuery.ajax({
                            url: settings.musicpth + settings.manageMyMusic,
                            type: 'POST',
                            data: {
                                action: 'Last_Files',
                                track: 0,

                            },
                            cache: false,
                            success: function(res) {
                                last_upl_dropDown_active = true;
                                jQuery('#m_l_f_dropDown').html(res);
                                ajax_update_href_links();
                            },
                            error: function(a, b, c) {
                                return jQuery.socplusMusic('error', null, b);
                            }
                        });
                    } else {
                        last_upl_dropDown_active = false;
                        close_recent_dropDown();
                    }

                } else jQuery('.mus_tabs_i.1').trigger('click');
            });

            jQuery('.mus_tabs_i.1').on('click', function() {
                l_upl_dr_act(true)
            });

            //dropDown menu
            dropDown.on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                mcontent.find('.mus_dropdown_w').each(function() {
                    jQuery(this).remove();
                });

                if (!this.d_ac && dropDownActive) {
                    dropDownActive = false;
                    this.d_ac = true;
                }

                //dropDownActive
                if (dropDownActive === 'active')
                    return;

                if (!dropDownActive)
                    activateDropDown(true, this);
                else
                    activateDropDown(false, this);



            });

            // add track to my music
            mus_add.on('click', function(e) {

                jQuery.socplusMusic('addTrack', e, this);

            });

            // search results manipulation
            search_result_artistalbums.on('click', function(e) {
                e.preventDefault();
                global_scrolling = 'artists_albums';
            });
            search_result_more_sm_ar.on('click', function(e) {
                var $this = jQuery(this);
                e.preventDefault();
                $this.closest('[m_mus_similar_artists="1"]')
                    .find('div[aria-hidden="true"]').each(function() {
                        jQuery(this).attr('aria-hidden', 'false').show()
                    });
                $this.parent('div').remove();
            });
            search_result_more_songs.on('click', function(e) {
                e.preventDefault();
                var $this = jQuery(this);

                $this.closest('ol')
                    .find('li[aria-hidden="true"]')
                    .each(function() {
                        jQuery(this).show();
                        //slideDown(600, function() {
                        //resizesocplusMusicLayer()
                        ///})
                    });
                $this.parent('div').remove();
                createCookie('srch_display_tracks', true, '1');
            });

            if (rcm) {

                mus_playBtn.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = jQuery(this);
                    if ($this.closest('ol').hasClass('rec_pl') !== true) {
                        rcm = false;
                        return true;
                    } else {
                        triggerPlayBtn(myMusicselectCover, underCoverArtistName, $this, e);
                    }
                });
                return;

            }



            // if the cover of track is corrupted, hide it
            socplusMusicLcnt.find('img').error(function() {
                var $this = jQuery(this);
                delete_died_covers($this.attr('src'));
                $this.unbind('error').hide().attr({
                    'aria-hidden': 'true',
                    'df-img': 'true'
                });
            });

            if (upd_hb_count) {
                hbk_count = hbk_count - 1;
                upd_hb_count = false;
            } else hbk_count++;

            if (hbk_count >= 2)
                hback.removeClass(disabledClass);
            else
                hback.addClass(disabledClass);

            switch (get_browser()) {
                case 'Chrome':
                case 'Opera':
                case 'Safari':
                    sortCursor = '-webkit-grabbing';
                    break;
                case 'Firefox':
                    sortCursor = '-moz-grabbing';
                    break;
                default:
                    sortCursor = sortCursor;
            }

            if (typeof ct.split(',')[1] !== 'undefined') {
                switch (ct.split(',')[1]) {

                    case 'hipHop':
                        aactive(null, hp, mus_sroll_ov);
                        break;
                    case 'trance':
                        aactive(null, trance, mus_sroll_ov);
                        break;
                    case 'popDance':
                        aactive(null, popDance, mus_sroll_ov);
                        break;
                    case 'rock':
                        aactive(null, rock, mus_sroll_ov);
                        break;
                    case 'other':
                        aactive(null, other, mus_sroll_ov);
                        break;
                    case 'today':
                    case 'week':
                    case 'month':
                        l_upl_dr_act();
                        break;
                    default:
                        aactive(null, allGenre, mus_sroll_ov);

                }

            };


            if (curr_history_addr === 'popular' || curr_history_addr === 'users') {
                ip_touch = ' touchstart';
            }
            // if active page is popular set song added to the songs who exists into my music category
            if (in_page_exist_pl.length !== 0 && initsessiongtus)
                jQuery.socplusMusic('getUserData', null, true);


            //click on disabled btn
            jQuery('.' + disabledClass).on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return;
            });

            if (currentPlayingSong) {
                splTrackId = currentPlayingSong.split('_')[0];
                splTrackId !== 'pm' ? popular.closest('li').attr({
                    'data-action': 'true',
                    'data-query': '?ct=' + splTrackId
                }) : popular.closest('li').attr({
                    'data-action': 'true',
                    'data-query': '?cta'
                });
            }


            //genre tabs manipulation
            tabs.find('[index-ovr="true"]').on('click', function(e) {
                e.preventDefault();
                no_mus_preview_loader = true;
                mus_sroll_ov.addClass('mus__opac');
            });

            // [DISABLED in v1.9] add active class to the current playing song
            var __no_found_song_in_page_re_search = function(c) {

                var cr_pl_s_id_x = c.split('_'),
                    cr_pl_s_id_y = cr_pl_s_id_x[2],
                    cr_pl_s_id = cr_pl_s_id_x[cr_pl_s_id_x.length - 1],
                    ex_tr_id = (curr_history_addr === 'users' ? socplusMusicLcnt.find('ol').find('li:first>div:first').attr('id').split('_')[1] : 0),
                    pl_find_scroll = mcontent.find(':scrollable');

                /*

                // for users page
                if (cr_pl_s_id_y === ex_tr_id) {
                    jQuery.socplusMusic('getsocplusMusicHTML', 'load');
                    mus_f_m_songs.click();
                    setTimeout(function() {
                        jQuery.socplusMusic('getsocplusMusicHTML', 'ok');
                        m_get_current_playing_song();
                    }, 100);
                }
                // for my music page
                else if (cr_pl_s_id && jQuery('#mus_more_song_my_mus').length !== 0 && jQuery('audio#audioTag').attr('track-id').split('_')[1] === 'mymusic') {
                    jQuery.socplusMusic('getsocplusMusicHTML', 'load');
                    mus_f_m_songs.click();
                    setTimeout(function() {
                        jQuery.socplusMusic('getsocplusMusicHTML', 'ok');
                        m_get_current_playing_song();
                    }, 100);
                }
                // for playlists page
                else if (cr_pl_s_id_x[1] === 'playlist' && window.location.search.split('&i=')[1] === cr_pl_s_id_y) {
                    pl_find_scroll.scrollTop(pl_find_scroll[0].scrollHeight);
                    jQuery.socplusMusic('getsocplusMusicHTML', 'load');
                    setTimeout(function() {
                        jQuery.socplusMusic('getsocplusMusicHTML', 'ok');
                        m_get_current_playing_song();
                    }, 100);
                }
                // for searching page
                else if (cr_pl_s_id_x[1] === 'search-song' && jQuery('[data-search-key]').data('search-key') === cr_pl_s_id_y) {
                    pl_find_scroll.scrollTop(pl_find_scroll[0].scrollHeight);
                    jQuery.socplusMusic('getsocplusMusicHTML', 'load');
                    setTimeout(function() {
                        jQuery.socplusMusic('getsocplusMusicHTML', 'ok');
                        m_get_current_playing_song();
                    }, 100);
                }
*/
            };

            var m_get_current_playing_song = function() {
                var curr_playing_ac = ol_li.find('.' + activeclass);
                var curr_playing_pl = ol_li.find('.__pause');
                var findPlayingSong = ol_li.find('span#' + currentPlayingSong),
                    trackTarget = findPlayingSong.closest('ol').find('li[target="#' + currentPlayingSong + '"]').attr('target'),
                    tlength = findPlayingSong.length;

                // v1.9   
                curr_playing_pl.removeClass('__pause');
                curr_playing_ac.find('span:first')
                    .removeClass('__pause')
                    .attr('title', 'Play')
                    .closest('li')
                    .find('div:first')
                    .removeClass(activeclass);

                if (audio.playing) {

                    findPlayingSong
                        .addClass('__pause')
                        .attr('title', 'Pause')
                        .closest('li')
                        .find('div:first')
                        .addClass(activeclass);

                    //for mymusic category, change cover
                    if (myMusicselectCover.is(':visible') == true && findPlayingSong.attr('title') === 'Pause')
                        __getBigCover(myMusicselectCover, underCoverArtistName, findPlayingSong);

                    // if in page exist [More songs] , auto load more when the track has founded 
                    ///if (findPlayingSong.length === 0 && jQuery('[d-more-songs="true"]').length !== 0 && audio.playing)
                    /// __no_found_song_in_page_re_search(currentPlayingSong);

                    animateScrolling(mus_scroll_down, trackTarget, tlength);


                }
            };




            // add active class to the current playing song
            m_get_current_playing_song();

            // more songs click for users page
            mus_f_m_users_songs.on('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                __get_more_songs(jQuery(this), myMusicselectCover, underCoverArtistName, 'users');
                auto_load_scroll++;
            });

            if (mcontent.find('div#mus_more_song').length !== 0 && mcontent.find('#user_have_playlist').length == 0 && mcontent.find('div#mus_more_song').offset().top - mcontent.offset().top > mcontent.height())
                mcontent.find(':scrollable').bind('scroll', function() {
                    var $this = jQuery(this);
                    if ($this.scrollTop() > $this[0].scrollHeight - mcontent.height() && auto_load_scroll <= 10) {
                        mus_f_m_users_songs.trigger('click');
                    }
                });


            //recommendation section
            if (curr_history_addr === 'playlist') rcmpage = '2';
            else if (curr_history_addr === 'downloads') {
                rcmpage = '3';
                if (!recommended) setTimeout(function() {
                    recommendations.addClass('__visible-teaser');
                    recommendations.find('.m_c_s_c_go_to:last').trigger('click');
                    recommended = false;
                }, 500);
            }
            /*
                        if (recommended && !bIsLoading) {
                            setTimeout(function() {
                                recommendations.addClass('__visible-teaser');
                                recommendations.find('.m_c_s_c_go_to:last').trigger('click');
                            }, 500);
                        }*/

            if (recommendations.is(':visible') || curr_history_addr === 'users') {
                var recomm_height = jQuery('.m_recommendations_w').height();
                if (curr_history_addr === 'mymusic' || curr_history_addr === 'users') {
                    mus_scroll_down.bind('scroll', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var $this = jQuery(this),
                            playlists_height = height_of_pl.height();


                        if ($this.scrollTop() > $this[0].scrollHeight - (playlists_height + cvmmumen.height() + 100) && !scrollreturn) {
                            cvmmumen.css({
                                'position': 'absolute',
                                'top': $this[0].scrollHeight - (playlists_height + cvmmumen.height() + 100)
                            });
                            scrollreturn = true;
                        }
                        if ($this.scrollTop() < $this[0].scrollHeight - (playlists_height + cvmmumen.height() + 100) && scrollreturn) {
                            cvmmumen.removeAttr('style');
                            scrollreturn = false;
                        }
                    });
                };


                recommendations.find('.m_c_s_c_go_to:first').on('click', function(ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    rc_data.css('opacity', '0.1');
                    update_recommendation(rcmpage, ev, rc_data, recommendations, m_custm_scrolling);
                    return false;
                });


                //recommendations show
                recommendations.find('.m_c_s_c_go_to:last').on('click', function(e) {
                    e.preventDefault();
                    recommended = true;
                    vhm = (recommendation_loaded && rc_data.html().length !== 0 ? 120 : 30);
                    m_custm_scrolling.animate({
                        height: '-=' + vhm + 'px'
                    });
                    update_recommendation(rcmpage, e, rc_data, recommendations, m_custm_scrolling);
                    jQuery(this).closest(recommendations).removeClass('__visible-teaser');
                });

                // recommendations hide
                recommendations.find('.m_recommendations_close').on('click', function(e) {
                    e.preventDefault();
                    recommended = false;
                    vhm = (recommendation_loaded && rc_data.html().length !== 0 ? 120 : 30);
                    recommendation_loaded = true;
                    m_custm_scrolling.animate({
                        height: '+=' + vhm + 'px'
                    });
                    jQuery(this).closest(recommendations).addClass('__visible-teaser');
                });



            }



            if (newSession == false) {

                K_ListofTracks = __constructPlaylist();
                if (ol_li.length > 0) {
                    var upFirst = ListofTracks[up_next].split('*');

                    jQuery.socplusMusic('playThisSong', 'init',
                        upFirst[1],
                        upFirst[0],
                        upFirst[2],
                        upFirst[3],
                        upFirst[4],
                        upFirst[7]);

                    up_next++;

                }
                newSession = true;

            }



            var removeFocusesClass = function() {
                setTimeout(function() {
                    nextTrack.removeClass('__forwardShortcut');
                    prevTrack.removeClass('__backShortcut');
                }, 200);
            };


            // next/prev track
            audio.trackEnded = function(p, l, radio_m) {

                var currentPlayingSong_rc = jQuery('audio#audioTag').attr('track-id'),
                    rm_dropdown_header = true;
                history_up_time = 0;

                removeOutPlayBtn();
                if (M_toEndPlayList) return playListEnd();

                // for search page
                get_pl_song_in_src_res();

                enable_pst_btn();

                if (currentPlayingSong_rc.split('_')[0] === 'recommendation') return playListEnd();

                if (up_prev === 'undefined' || up_prev === -1 && p === true) return backBtn.addClass(disabledClass);
                else backBtn.removeClass(disabledClass);

                if (up_next === -1 || up_next === 'undefined') return forward.addClass(disabledClass);
                else forWard.removeClass(disabledClass);

                selectDb = (defaultPlayLst === true ? updated_ListofTracks : ListofTracks);

                // radio control
                if (radio_playing && curr_history_addr === 'radio') {
                    playListIndexTrack = [];
                    createdListofTracks = new Array();
                    updated_ListofTracks = __constructPlaylist();
                    if (!radio_m) radio_m = 26;
                    var a = jQuery('div#radio_station_tracks'),
                        b = jQuery('.mus_radio_tracks');
                    $g_p_mr = (jQuery('#' + jQuery('audio#audioTag').attr('track-id')).offset().top - a.offset().top) + radio_m;
                    b.css('top', '-' + $g_p_mr + 'px');

                }


                if (!l) {

                    //if repeat 1 song is active
                    if (readCookie('mus_repeat') === '1') {
                        up_next = up_next - 1;
                        up_prev = up_prev + 1;
                        rm_dropdown_header = false;
                    } else
                    // if shuffle is active
                    if (readCookie('mus_shuffle') === 'yes') {
                        up_next = turn_on_shuffle(selectDb);
                        up_prev = playListIndexTrack[up_prev_shuffle];
                    }
                    // if repeat all list is active
                    else if (readCookie('mus_repeat') === 'yes' && up_next === Object.keys(selectDb).length) {
                        up_next = 0;
                        up_prev = 0;

                    }

                }

                // remove added class from top header dropdown menu
                if (rm_dropdown_header)
                    jQuery("#forAdded").removeClass('__done __disabled curDefault').find('span:eq(2)').text('add');

                // previous song
                if (p === true) {
                    up_next = up_prev + 1;
                    if (up_prev === 'undefined' || up_prev === -1) {
                        backBtn.addClass('__disabled');
                        jQuery.socplusMusic('playThisSong', null,
                            audioTag.attr('src'),
                            currentPlayingSong,
                            null,
                            null,
                            null, null,
                            true);

                        prevTrack.removeClass('__backShortcut');
                        return;
                    }

                    if (defaultPlayLst === true) {

                        upPrev = updated_ListofTracks[up_prev].split('*');
                        up_prev = up_next - 2;
                        __getBigCover(myMusicselectCover, underCoverArtistName, socplusMusicLcnt.find('ol li').find('span#' + upPrev[0]));

                    } else {

                        upPrev = typeof ListofTracks[up_prev] != 'undefined' ? ListofTracks[up_prev].split('*') : 0;
                        --up_prev;
                    }

					if(upPrev <= 0) return;
                    jQuery.socplusMusic('playThisSong', null,
                        upPrev[1],
                        upPrev[0],
                        upPrev[2],
                        upPrev[3],
                        upPrev[4],
                        upPrev[7]);

                    removeFocusesClass();
                    readCookie('mus_shuffle') === 'yes' ? scrollUD = 'shuffle' : scrollUD = 'up';
                    tl = jQuery('span#' + jQuery('audio').attr('track-id')).length;
                    animateScrolling(mus_scroll_down, '#' + upPrev[0], tl, scrollUD);
                    return;
                }



                if (l === true && up_next === Object.keys(selectDb).length)
                    playListEnd();

                c_mus_repeat = !readCookie('mus_repeat') ? 'no' : readCookie('mus_repeat');

                c_mus_shuffle = !readCookie('mus_shuffle') ? 'no' : readCookie('mus_shuffle');

                if (c_mus_repeat === 'no' && up_next === Object.keys(selectDb).length && c_mus_shuffle === 'no')
                    playListEnd();

                switch (defaultPlayLst) {

                    case true:
                        d_storedTrack = typeof updated_ListofTracks[up_next] != 'undefined' ? updated_ListofTracks[up_next].split('*') : 0;
                        up_prev = up_next - 1;
                        up_next++;
                        __getBigCover(myMusicselectCover, underCoverArtistName, socplusMusicLcnt.find('ol li').find('span#' + d_storedTrack[0]));

                        break;

                    case false:
                        d_storedTrack = typeof ListofTracks[up_next] != 'undefined' ? ListofTracks[up_next].split('*') : 0;
                        up_prev = up_next - 1;
                        up_next++;
                        break;


                }

                var d_nextTrkId = d_storedTrack[0],
                    d_nextTrack = d_storedTrack[1],
                    d_nextCover = d_storedTrack[2],
                    d_nextArtNm = d_storedTrack[3],
                    d_nextSngNm = d_storedTrack[4],
                    d_nextVideo = d_storedTrack[7];

                readCookie('mus_shuffle') === 'yes' ? scrollUD = 'shuffle' : scrollUD = 'down';

                jQuery.socplusMusic('playThisSong', null,
                    d_nextTrack,
                    d_nextTrkId,
                    d_nextCover,
                    d_nextArtNm,
                    d_nextSngNm,
                    d_nextVideo);

                if (!windowTabActive)
                    get_playing_track_name(pl_tr_nm);
                tl = jQuery('span#' + jQuery('audio').attr('track-id')).length;
                animateScrolling(mus_scroll_down, '#' + d_nextTrkId, tl, scrollUD);
                removeFocusesClass();


            };


            // click on play button
            mus_playBtn.on('click' + ip_touch, function(e) {
                socplusMusicLcnt.find('ol').find('span.m_play_track_load').each(function() {
                    jQuery(this).removeClass('m_play_track_load');
                });
                removeOutPlayBtn();
                if (curr_playing_song != $(this).attr('id').split('_')[$(this).attr('id').split('_').length - 1]) enable_pst_btn();
                mplDis(false);
                newSession = true;
                defaultPlayLst = true;
                e.preventDefault();
                e.stopImmediatePropagation();
                var $this = jQuery(this);
                playing_playlist = null;
                radio_playing = false;
                history_up_time = 0;

                if (pl_f_title.length !== 0) playing_playlist = pl_f_title.data('id');
                else socplusMusicLcnt.find('.' + pl_playing_class).removeClass(pl_playing_class);
                track_loading_progress = setTimeout(function() {
                    $this.not('.__mus_out').addClass('m_play_track_load')
                }, 900);

                // set current playing song button
                d_query = (typeof window.location.search.split('&play') !== 'undefined' ? window.location.search.split('&play')[0] : window.location.search);
                mus_pl_playing.attr({
                    'data-href': curr_history_addr,
                    'data-action': 'true',
                    'data-query': d_query
                });


                playListIndexTrack = [];
                createdListofTracks = new Array();
                updated_ListofTracks = __constructPlaylist();


                if ($this.closest('ol').hasClass('rec_pl'))
                    mplDis(true);

                // play/pause track on click o pause/play btn
                if ($this.attr('title') == 'Pause') {
                    audio.playPause();
                    this.playback = true;
                    return false;
                } else if (this.playback) {
                    audio.playPause();
                    this.playback = false;
                    return false;
                }

                __getBigCover(myMusicselectCover, underCoverArtistName, $this);




                jQuery.socplusMusic('playThisSong',
                    null,
                    $this.data('quest')['song'],
                    $this.attr('id'),
                    $this.data('quest')['cover'],
                    $this.nextAll('div').find('a:first').text(),
                    $this.nextAll('div').find('a:first').next().text());


                up_next = $this.closest('li').index() + 1;
                up_prev = $this.closest('li').index();

            });




            // change document title with playing song name
            $window.on('blur', function() {
                if (audio.playing && settings.changeDOCtitle) {
                    windowTabActive = false;
                    get_playing_track_name(pl_tr_nm);
                };

            }).on('focus', function() {
                if (settings.changeDOCtitle) {
                    windowTabActive = true;
                    get_playing_track_name(null, true);
                };
            });


            // auto play playlist
            if (pl_auto_play.length !== 0) mus_playBtn_first.on('click', function(e) {
                setTimeout(function() {
                    playing_playlist = pl_auto_play.attr('data-collection-play')
                }, 500);
            }).trigger('click');

            // playlist hover, pause btn
            pl_f_pause.on('click', function(e) {
                e.preventDefault();
                var $this = jQuery(this),
                    search_page_active = jQuery('.m_c_s_searchResult').length,
                    change_ac = $this.prev('span').attr('data-query'),
                    cr_new_ac = (!search_page_active ? $this.prev('span').attr({
                        'play-button': 'true',
                        'data-query': change_ac.split('&')[0] + '&i=' + change_ac.split('&i=')[1]
                    }) : $this.prev('span').attr({
                        'play-button': 'true',
                        'data-query': change_ac.split('&play')[0]
                    }));
                pl_f_play_pause = true;
                audio.pause();
            });

            jQuery('[uid="pl"]').on('click', function(e) {
                e.preventDefault();
                var $this = jQuery(this);
                setTimeout(function() {
                    mus_pl_playing.attr({
                        'data-href': $this.data('href'),
                        'data-action': 'true',
                        'data-query': $this.data('query').replace('&play', '&p_tk')
                    });
                }, 3000);
            });
            /*
                        // hide time on hover
                        ol_li.hover(function() {
                            if (hv_track_time_show) jQuery(this).find(mus_time).hide();
                        }, function() {
                            if (hv_track_time_show) jQuery(this).find(mus_time).show();
                        });*/

            // edit track popup
            editTrack.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return run_layer_popup('editTrack', socplusMusicLcnt, jQuery(this).attr('trackid').split('_')[1]);
            });
            // add playlist popup
            addPlList.on('click', function() {
                return createPlaylist.trigger('click');
            });
            spupl.on('click', function() {
                upload.trigger('click');
            });

            // sorting my music
            sortMus.sortable({
                items: "> ol > li",
                revert: settings.AnimateSortable,
                cursor: sortCursor,
                opacity: 0.9
            }).disableSelection();
            sortMus.on('sortstart', function(e) {
                jQuery(this).css('zoom', 'reset')
            }).on('sortstop', function() {
                update_page_content();
                mcontent.find(':scrollable').animate({
                    scrollTop: '+=0'
                });
                jQuery(this).removeAttr('style')
            }).on('sortupdate', function(event, track) {

                var ac = (this.getAttribute('data-act') === 'my' ? 'sortmy' : 'sortpl'),
                    pli = 0;
                if (ac === 'sortpl') pli = this.getAttribute('data-plid');

                var d = jQuery(this).sortable('serialize');

                var reqSortUpdate = jQuery.ajax({
                    url: settings.musicpth + settings.manageMyMusic,
                    type: 'POST',
                    data: d + '&' + jQuery.param({
                        'track': '0',
                        'pl': pli,
                        'action': ac
                    }),
                    cache: false
                });
                reqSortUpdate.done(function(a) {
                    if (a != '1')
                        jQuery.socplusMusic('error', null, "An error occured, at update playlist");
                });
                reqSortUpdate.fail(function(b, c) {
                    jQuery.socplusMusic('error', null, "Request failed: " + b.status);
                });
            });

            trackoff.each(function() {
                jQuery(this).hover(function() {
                    jQuery("#" + jQuery(this).attr('id')).find('.mus-tr_info, .mus-tr_right-controls').show();
                    jQuery(this).find(".mus-tr_time").hide();
                }, function() {
                    mus_info.hide();
                    mus_time.show();
                });
            });

            //delete song 
            jQuery('[data-action="delete"]').on('click', function() {
                var $this = jQuery(this);
                var trackId = $this.attr('trackId');
                var removeFrom = ($this.hasClass('js_remove_pl') ? 'p' : 'm');
                expltrackd = trackId.split('_');
                ntrackid = expltrackd[0] + 's';
                htrackid = ntrackid + '_' + expltrackd[1];
                jQuery('#' + htrackid).find('.mus-tr_restore').addClass(activeclass);
                m_noAjax = false;
                delete_page_content();
                return rd('delete', trackId.split('_')[1], (removeFrom === 'p' ? $this.data('dl-pl-id') : null), null, removeFrom);
            });
            // restore song
            jQuery('[data-action="restore"]').on('click', function() {
                var $this = jQuery(this);
                var restoreIn = ($this.hasClass('js_restore_in_pl') ? 'p' : 'm');
                var trackId = $this.attr('trackId'),
                    match_trackid = trackId.match(/\d/g).join(""),
                    pos = (restoreIn === 'm' ? jQuery('li#tracks_' + match_trackid + '>div:first').attr('data-position') : jQuery('li#tracks_' + match_trackid).find('div:first').data('position')),
                    added = jQuery('li#tracks_' + match_trackid + '>div:first').attr('data-added'),
                    expltrackd = trackId.split('_');
                ntrackid = expltrackd[0] + 's';
                htrackid = ntrackid + '_' + expltrackd[1];
                jQuery('#' + htrackid).find('.mus-tr_restore').removeClass(activeclass);
                m_noAjax = false;
                delete_page_content();
                return rd('restore', expltrackd[1], pos, (restoreIn === 'm' ? added : $this.data('dl-pl-id')), restoreIn);
            });

            // radio 
            setTimeout(function() {

                if (!radio_active && curr_history_addr === 'radio') {
                    if (document.all && !window.atob) jQuery.socplusMusic('error', null, 'Sorry, but your browser needs improvements to use socplusMusic, please update your browse with latest version.');
                    else radio_station.first().trigger('click');
                } else if (radio_active && curr_history_addr === 'radio')
                    radio_station.parent('div').find('[data-id="' + radio_active + '"]').trigger('click');

            }, 10);
            // the play button above the cover of track in radio
            jQuery('.' + mu_i_play).on('click', function(e) {
                e.preventDefault();
                if (radio_play_pause || radio_playing) return audio.playPause();
                else {
                    radio_play_pause = true;
                    socplusMusicLcnt.find('ol>li:eq(3)').find('span:first').trigger('click');
                }
            });
            radio_station.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var $this = jQuery(this),
                    genre = $this.attr('id'),
                    tracks_of_radiostation = jQuery('.mus_radio_tracks'),
                    radio_search = null,
                    search_br_timeout = 10;
                if (vrq) {
                    search_br_timeout = 2000;
                    radio_search = setInterval(function() {
                        var opc = Math.floor(Math.random() * 7) + 1;
                        socplusMusicLcnt.find('ol li').each(function() {
                            jQuery(this).find('div:first').css('opacity', '0.' + opc);
                            jQuery(this).find('span[title="Pause"]').closest('li').find('div:first').css('opacity', '1');
                        });
                    }, 50);
                }
                radio_active = $this.attr('data-id');

                var radioAjax = jQuery.ajax({
                    url: window.location.pathname,
                    type: 'GET',
                    data: {
                        tk: readCookie('tk_m'),
                        station: genre
                    },
                    cache: false
                });

                radioAjax.done(function(a) {
                    if (a === '0')
                        jQuery.socplusMusic('error', null, "An error occured to play this radio station, please try again.");
                    else {
                        var radio_get_tracks = tracks_of_radiostation.find('div#radio_station_tracks'),
                            fc = jQuery('.mus_album_side__a>img');
                        setTimeout(function() {
                            tracks_of_radiostation.css('top', '-90px');
                            radio_get_tracks.html(a);
                            rmactive(radio_station);
                            aactive(null, $this);
                            radio_get_tracks.find('li').each(function(i) {
                                var $acesta = jQuery(this);
                                $acesta.attr('s-number', i);
                                if (i == 3) $acesta.find('div:first').addClass(activeclass);
                            });
                            radio_mus_data = a;
                            fc.attr('src', radio_get_tracks.find('div.' + activeclass).find('span:first').data('quest')['cover']);

                            jQuery('[data-action="play"]').on('click touchend', function(e) {
                                // set current playing song button
                                mus_pl_playing.attr('data-href', curr_history_addr).removeAttr('data-query').removeAttr('data-action');
                                radio_playing = true;
                                var $th = jQuery(this),
                                    $s_p = ($th.offset().top - radio_get_tracks.offset().top) - 4;
                                if (fc.attr('src') !== $th.data('quest')['cover'])
                                    fc.slideUp('fast', 'swing', function() {
                                        jQuery(this).attr('src', $th.data('quest')['cover']).fadeIn('slow');
                                    });
                                triggerPlayBtn(myMusicselectCover, underCoverArtistName, jQuery(this), e, tracks_of_radiostation, $s_p);
                            });
                            if (radio_search) {
                                clearTimeout(radio_search);
                                radio_search = null;
                                search_br_timeout = 10;
                                setTimeout(function() {
                                    socplusMusicLcnt.find('ol li[s-number="3"]').find('[data-action="play"]').click();
                                }, 500);
                            }
                            if (radio_playing && audio.playing) {
                                setTimeout(function() {
                                    audio.play();
                                    $gb_p_mr = jQuery('#' + jQuery('audio#audioTag').attr('track-id')),
                                        $g_p_mr = ($gb_p_mr.offset().top - radio_get_tracks.offset().top) - 4;
                                    tracks_of_radiostation.css('top', '-' + $g_p_mr + 'px');
                                    fc.attr('src', $gb_p_mr.data('quest')['cover']);
                                }, 500);
                            }

                            jQuery.socplusMusic('updatesocplusMusicHead', 'undefined', true);

                        }, search_br_timeout);
                        vrq = true;


                    }
                });
                radioAjax.fail(function(b, c) {
                    jQuery.socplusMusic('error', null, "Request failed: " + b.status);
                });

            });

            // my music page loading scroll
            if (jQuery('#mymusic_active_page').length !== 0) {
                var mus_count = ol_li.length,
                    last_li = ol_li.find('li:last'),
                    mr_songs_hr_click = jQuery('[data-more-songs="mymusic"]');

                if (mr_songs_hr_click.data('disp-songs') <= mus_count) {
                    mr_songs_hr_click.on('click', function(e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        __get_more_songs(jQuery(this), myMusicselectCover, underCoverArtistName, 'mymusic');
                    });


                } else mr_songs_hr_click.remove();

            };


            // add playlist to my playlist collection
            add_collection.on('click', function(e) {
                e.preventDefault();
                __add_playlist_to_my_collection(jQuery(this));
                jQuery(this).find('span:first').addClass('__success curDefault'); //.css('pointer-events', 'none');
                update_page_content();
            });

            // add artist, albums to my playlist collection
            pl_srch_res.on('click', function(e) {
                e.preventDefault();
                var $this = jQuery(this),
                    cr_sr_params = [],
                    data_for_serialize = socplusMusicLcnt.find('ol[data-for-serialize] li');

                data_for_serialize.each(function(i) {
                    _this = jQuery(this);
                    _this.find(mus_info).replaceWith(saddedHTML);
                    generate_id = _this.find('div:first').attr('id').split('_');
                    cr_sr_params[i] = generate_id[generate_id.length - 1];
                });


                a = encodeURIComponent($this.data('search-res-add'));
                b = encodeURIComponent($this.data('search-res-name').replace('+', ' '));
                c = encodeURIComponent($this.data('search-res-count'));
                d = encodeURIComponent($this.closest('div[parent-for-cover]').find('img').attr('src'));

                __add_playlist_to_my_collection(null, a, b, c, d, decodeURIComponent(jQuery.param({
                    song: cr_sr_params
                })));
                jQuery(this).css('pointer-events', 'none').addClass('__success');
            });

            // after edited my music page
            finishUpdt.on('click', function(e) {
                e.preventDefault();
                delete db_navigation_ajax[window.location.href];
                delete db_navigation_ajax[window.location.href.replace('?action=playListEdit', '')];
            });

            // edit full playlist
            pl_my_edit.on('click', function(e) {
                e.preventDefault();
                hv_track_time_show = false;
                contenteditable = true;
                selected_covers = [];
                var count = 0;

                // hide all default data and add css for edit
                var $this = jQuery(this),
                    songs_count = ol_li.length,
                    edit_controls = jQuery('.mus_card_edit_controls'),
                    df_name_pl = jQuery('li#myplst').find('div.' + activeclass).find('div.mml_ucard_n_f').text(),
                    edit_pl_page = jQuery('div.mus_subinfo'),
                    edit_pl_id = edit_pl_page.data('edit-playlist-id'),
                    set_cover = null,
                    img_view = 1;


                jQuery('.m_ppl_title').attr('contenteditable', 'true');
                $this.parent('div').find('a.mtico').addClass(hiddenClass).parent('div').find('a:last').removeClass(hiddenClass).closest(edit_pl_page).addClass('__edit');
                mcontent.find(':scrollable').animate({
                    height: '+=' + recommendations.height() + 'px'
                });
                recommendations.fadeOut(500);
                jQuery('.js-pl-edit-finish').attr({
                    'data-href': 'playlist',
                    'data-action': 'true',
                    'data-query': window.location.search
                }).on('click', function(e) {
                    e.preventDefault();
                    delete_page_content();
                    contenteditable = false;
                });


                socplusMusicLcnt.find('ol li').each(function(i) {

                    var $this = jQuery(this).find('span[data-action="play"]'),
                        covers = $this.data('quest')['cover'],
                        download_ic = jQuery(this).find('div.__download');
                    download_ic.removeClass('__download');


                    if (covers !== settings.host + settings.artistCoverError && selected_covers.indxf(covers) < 0) {
                        count++;
                        selected_covers[count] = covers;
                    }

                    if (i + 1 == songs_count && selected_covers.length <= 0)
                        edit_controls.find('div.data-with-image_i_h').addClass(hiddenClass).promise().done(function() {
                            edit_controls.find('div#pl_no_covers').removeClass(hiddenClass);
                        });
                    else if (i + 1 == songs_count && (selected_covers.length <= 1 && jQuery('.mus_card_img').attr('src') != settings.host + settings.artistCoverError))
                        edit_controls.find('div:first>div').addClass('curDefault').hide().closest(edit_controls).find('div:first>div:first').show();

                });

                edit_controls.removeClass(hiddenClass);

                jQuery('div.m_ppl_title[data-id]').on('keyup', function(e) {

                    var change_name_pl = function(value) {
                        jQuery.post(settings.musicpth + settings.manageMyMusic, {
                                action: 'update_playlist_cover',
                                track: edit_pl_id,
                                b: value,
                                cv_or: 'update_name_of_pl'
                            })
                            .done(function(d) {
                                if (d !== '1') return jQuery.socplusMusic('error', null, 'Sorry,the name of playlist have not changed');
                            });
                    }

                    e.preventDefault();
                    value = jQuery(this).text();
                    if (jQuery.trim(value)) {
                        jQuery('li#myplst').find('div.' + activeclass).find('div.mml_ucard_n_f').text(value);
                        setTimeout(function() {
                            change_name_pl(value);
                        }, 10);
                    } else {
                        jQuery('li#myplst').find('div.' + activeclass).find('div.mml_ucard_n_f').text(df_name_pl);
                        change_name_pl(df_name_pl);
                    }

                });
                var __waiting_cov = function(cover) {
                    edit_controls.find('.__waiting').removeClass(hiddenClass);
                    edit_controls.prev('img').attr('src', cover).load(function() {
                        edit_controls.find('.__waiting').addClass(hiddenClass);
                    });
                };
                var __disable_enable_ready_btn = function(b) {

                    switch (b) {
                        case '0':
                            jQuery('.vl_btn.js-pl-edit-finish').addClass('curDefault').css({
                                'opacity': '0.7',
                                'cursor': 'not-allowed'
                            });
                            break;
                        case '1':
                            jQuery('.vl_btn.js-pl-edit-finish').removeClass('curDefault').removeAttr('style');
                            break;
                    }
                };
                var __update_cover = function(id, cover) {

                    __waiting_cov(cover);
                    __disable_enable_ready_btn('0');
                    update_cover_timeout = setTimeout(function() {
                        jQuery.post(settings.musicpth + settings.manageMyMusic, {
                                action: 'update_playlist_cover',
                                track: edit_pl_id,
                                cv_or: cover
                            })
                            .done(function(d) {
                                if (d !== '1') return jQuery.socplusMusic('error', null, d);
                                else edit_controls.prev('img').show();
                                __disable_enable_ready_btn('1');

                            });
                    }, 500);

                    jQuery('li#myplst').find('div.' + activeclass).find('img:first').attr('src', cover);
                    update_top_count_slider(img_view);

                };
                var update_top_count_slider = function(c) {

                    if (!edit_controls.parent().find('img:first').attr('src')) {
                        c = 0;
                        img_view = 0;
                    }

                    jQuery('div.data-with-image_i_h__top').removeClass('curDefault').find('div:first').text(c + ' / ' + Object.keys(selected_covers).length);
                    if (selected_covers.length <= 1 && c === 1)
                        jQuery('div.data-with-image_i_h__top').addClass('curDefault').find('div:eq(1)').hide().parent('div').find('div:eq(2)').hide();

                };

                img_view = selected_covers.indxf(edit_controls.parent().find('img:first').attr('src'));
                if (img_view <= 0) img_view = 1;

                update_top_count_slider(img_view);

                jQuery('div.data-with-image_i_nav__right').on('click', function(e) {

                    e.preventDefault();
                    e.stopPropagation();
                    clearTimeout(update_cover_timeout);
                    img_view++;

                    if (img_view > Object.keys(selected_covers).length) img_view = 1;
                    set_cover = selected_covers[img_view];

                    return __update_cover(img_view, set_cover);


                });
                jQuery('div.data-with-image_i_nav__left').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    clearTimeout(update_cover_timeout);

                    --img_view;
                    if (img_view < 1) img_view = Object.keys(selected_covers).length;
                    set_cover = selected_covers[img_view];


                    return __update_cover(img_view, set_cover);


                });

                // remove cover
                jQuery('[data-pl-edit-rm-cv]').on('click', function(e) {
                    e.preventDefault();
                    var $this = jQuery(this);
                    var playlis_curr_cover = jQuery('li#myplst').find('div#ppl_' + $this.data('pl-edit-rm-cv')).find('img:first');
                    if (!this.clktr) {
                        edit_controls.prev('img').hide();
                        $this.text('Return cover');
                        playlis_curr_cover.fadeOut();
                        jQuery.post(settings.musicpth + settings.manageMyMusic, {
                            action: 'update_playlist_cover',
                            track: edit_pl_id,
                            cv_or: ''
                        });
                        this.clktr = true;
                    } else {
                        edit_controls.prev('img').show();
                        $this.text('Remove cover');
                        jQuery.post(settings.musicpth + settings.manageMyMusic, {
                            action: 'update_playlist_cover',
                            track: edit_pl_id,
                            cv_or: playlis_curr_cover.attr('src')
                        });
                        playlis_curr_cover.fadeIn('fast');
                        this.clktr = false;
                    }
                });

                ajax_update_href_links();
            });

            // check for added playlists
            if (curr_history_addr == 'playlist' && jQuery('#add_collection').length != 0) {
                var collec = jQuery('#add_collection'),
                    collection_inf = collec.data('collection');
                if (collec.length != 0 && collection_inf) {
                    jQuery.each(db_check_my_playlist, function(i, id) {
                        if (id == collection_inf['collection_id']) collec.find('span:first').addClass('__success curDefault').parent().css('pointer-events', 'none').find('span:last').text('Added');
                    });
                }
            }



            // edit playlist 
            playlistedit_actions.find('a.mus-dl:first').next('a').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return run_layer_popup('addPlaylist', socplusMusicLcnt, jQuery(this).attr('data-playlist-id'), jQuery(this).attr('data-playlist-name'));
            });

            // delete playlist 
            playlistedit_actions.find('a.mus-dl:last').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return run_layer_popup('confirmation', socplusMusicLcnt, jQuery(this).attr('data-playlist-id'), jQuery(this).data('original-playlist-id'));
            });

            // edit empty playlist
            playlistnomus.find('a.mus-dl:first').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return run_layer_popup('addPlaylist', socplusMusicLcnt, jQuery(this).attr('data-playlist-id'), jQuery(this).attr('data-playlist-name'));
            });

            // delete empty playlist
            playlistnomus.find('a.mus-dl:last').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return run_layer_popup('confirmation', socplusMusicLcnt, jQuery(this).attr('data-playlist-id'), jQuery(this).data('original-playlist-id'));
            });

            playlist_tr.find('img').on('click', function() {
                jQuery(this).closest('[uid="card"]').find('div.' + pl_title_name).click();
            });

            // playlist load more songs to the scrolling event
            if (jQuery('[data-playlist-scroll-event]').length !== 0) {

                mcontent.find(':scrollable').bind('scroll', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var $this = jQuery(this),
                        songs_count = ol_li.length;

                    if ($this.scrollTop() >= $this[0].scrollHeight - mcontent.height() && songs_count === jQuery('[data-playlist-scroll-event]').data('playlist-scroll-event'))
                        __get_more_songs(jQuery('#pl_scroll_event'), myMusicselectCover, underCoverArtistName, 'playlist', jQuery('[data-playlist-scroll-event]').data('this-pl-id'));

                });

            };

            // check playlist cover, if playlist dosen't have cover add default cover for playlist
            jQuery('[uid="card"]').each(function() {
                var $this = jQuery(this).find('img');
                if ($this.attr('src') === settings.host + settings.artistCoverError) $this.remove();
            });

            // add added class to playlists from search page
            if (jQuery('#socplusMusic_search_container').length !== 0) {
                jQuery.each(db_playlists_from_search, function(i, item) {
                    mcontent.find('[data-search-res-add="' + item + '"]').addClass('__success curDefault').css('pointer-events', 'none').find('span:first').text('Added to my music');

                });

            };

            // upload music in playlist
            my_playlist_upload_music.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return run_layer_popup('uploadFiles', mcontent, jQuery(this).data('pl-upload'), jQuery(this).closest('.mus_album_i__fixed').find('img.mus_card_img').attr('src'), true);
            });

            // history page load more tracks
            if (jQuery('#history_page_active').length !== 0) {
                mcontent.find(':scrollable').bind('scroll', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var $this = jQuery(this);

                    if ($this.scrollTop() >= $this[0].scrollHeight - mcontent.height() && mus_loading_scroll)
                        __get_more_songs(jQuery('#history_dmm_scr_load'), myMusicselectCover, underCoverArtistName, 'history');

                });
            };


            // search result load more songs to the scrolling event
            if (jQuery('[data-search-scroll-event]').length !== 0) {

                mcontent.find(':scrollable').bind('scroll', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var $this = jQuery(this),
                        songs_count = ol_li.length;

                    if ($this.scrollTop() >= $this[0].scrollHeight - mcontent.height() && songs_count >= jQuery('[data-search-scroll-event]').data('search-scroll-event'))
                        __get_more_songs(jQuery('#search_result_scr_ev'), myMusicselectCover, underCoverArtistName, 'search-song', jQuery('[data-search-scroll-event]').data('search-key'));

                });

            };

            // feedback page
            jQuery('[data-fdbk-m-img]').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return run_layer_popup('feedback_img', socplusMusicLcnt, jQuery(this).data('fdbk-m-img') + '~*~' + jQuery(this).data('fbdk-m-msg') + '~*~' + jQuery(this).data('fbdk-m-subject'));
            });

            // set to all tracks href to search
            set_href_to_songs(ol_li);

            cvmmumen.each(function() {
                var __this = jQuery(this).find('div.m_c_s_c_go_to:first');
                __this.attr({
                    'data-href': 'search',
                    'data-action': 'true',
                    'data-query': '?action=searchResult&method=inx&key=' + encodeURIComponent(__this.text())
                }).on('click', function() {
                    search_input_gl.val(__this.text())
                });
            });


            // show all friends button in left menu
            show_all_friends.on('click', function() {
                jQuery('.mus_friends[aria-hidden="true"]').each(function() {
                    jQuery(this).attr('aria-hidden', 'false').fadeIn();
                });
                s_all_fr = true;
                jQuery(this).hide().attr('aria-hidden', 'true');
                jQuery('.mus_user-search_empty-tx').find('p:first').text('');
                if (jQuery('.mus_user-search_ic').hasClass('__loaded')) jQuery('.mus_user-search_ic').click();
            });


            // find playlist who have style -> pointer-event
            leftcollection.each(function() {
                var $this = jQuery(this).find('li');
                if ($this.hasClass('mus_proaspat_added')) $this.filter('.mus_proaspat_added').removeClass('mus_proaspat_added');
            });

            if (curr_history_addr !== 'search') {
                search_input_gl.val('');
                if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) search_input_gl.focus();
            }
            setTimeout(function() {
                search_suggestion_disable = false;
            }, 1500);
            initsessiongtus = true;
            recommendation_loaded = false;
            mus_loading_scroll = true;
            a_page = 1;
            mus_shmore_brgq = false;
            d_w_l = (d_w_l === 0 ? socplusMusicLcnt.width() : settings.socplusMusicLayerWidth);
            d_h_l = (d_h_l === 0 ? socplusMusicLcnt.height() : settings.socplusMusicLayerHeight);
            lngofol = ol_li.length;
            resizesocplusMusicLayer();
            get_pl_song_in_src_res();



        },
        addTrack: function(e, el, z) {
            if(e) e.preventDefault();

            var $this = jQuery(el),
                k = z ? $this.parent('div').attr('id').split('_')[1] : $this.parent('div').attr('id').match(/\d/g).join(''),
                thisli = z ? $this.closest('div.track.js-track') : $this.closest('li'),
                pl_m_r_id = 0,
                my_playlist_open = false,
                add_where = null;


            switch (curr_history_addr) {
                case 'mymusic':
                    add_where = 'm';
                    break;
                case 'playlist':
                    add_where = 'p';
                    break;
            }
	    if(z) add_where = 'm';
            if (typeof window.location.search.split('i=')[1] !== 'undefined')
                pl_m_r_id = window.location.search.split('i=')[1];

            var myMusicajaxRequest = jQuery.ajax({
                url: settings.musicpth + settings.manageMyMusic,
                type: 'POST',
                data: {
                    action: 'addTrack',
                    track: k,
                    b: 'm',
                    c: pl_m_r_id
                },
                cache: false
            });
            myMusicajaxRequest.done(function(d) {
                if (d === '0') {
                    jQuery.socplusMusic('error', null, 'An error ocurred to add track into your music, please try again');
                } else {
                    db_check_mymus.push(k);
                    animateNumCount(my_mus_notif, 200);
                    my_mus_notif.html(d);
                    if(z) { 
$this.addClass('ic_added_w __disabled').attr('disabled',true);
		} else {
			$this.parent('div').replaceWith(saddedHTML);
                }    delete db_navigation_ajax[my_mus_page];
                    delete_page_content();
		   
                    if (!z && add_where === 'm' && window.location.search !== '?action=history')
                        __appear_added_songs(thisli);
                }
            });
            myMusicajaxRequest.fail(function(a, b) {
                jQuery.socplusMusic('error', null, b.status);
            });

        },
        playThisSong: function(start, song, tid, tcv, tar, tsn, V, R, Z) {
            var g = V;
            var has_video = V == 0 || typeof V == 'undefined' ? 0 : V,
                album = 'unknown';
            if (Z) {
                M_toEndPlayList = true;
                $('.mus_player-controls_i.__back').addClass(disabledClass);
                $('.mus_player-controls_i.__forward').addClass(disabledClass);
            } else {
                M_toEndPlayList = false;
            }
            if (socplusMusicLcnt.find('ol li').find('span#' + tid).length !== 0 && !V) {

                var this_song_hs_v = socplusMusicLcnt.find('ol').find('li[target="#' + tid + '"]'),
                    gh_vd = this_song_hs_v.find('[data-showvideo="true"]');
                album = this_song_hs_v.find('.mus-tr_album').text();
                has_video = gh_vd.length !== 0 ? gh_vd.data('video') : 0;

            }

            audio.load(filesPath + song, tid);

            if (!R)
                getTrackDetails(start, tid, tcv, tar, tsn, has_video, album);

            if (!start)
                audio.play();


        },
        video_archive_push: function(e, b, a) {
            e.preventDefault();
            e.stopPropagation();
            var store_videos, h, m;
            var now = new Date();
            var video_label = $body.find('[waiting-v-cont]');
            var new_video_mark = '<li id="%s" data-sanbox-video=\'{"vid":"%s","vart":"%s","vnam":"%s"}\' onclick="jQuery.socplusMusic(\'video_archive_push\',event,this,1); return jQuery.socplusMusic(\'get_track_video\',%s);"><div class="video_ovr"></div><div class="video_ifrm"><iframe src="//player.vimeo.com/video/%s?title=0&amp;byline=0&amp;portrait=0&amp;color=f08400&amp;autoplay=0" width="100" height="70" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><span class="artist">%s - %s</span><span class="time">%s</span></div></li>';

            if (a) {
                var decode_js = jQuery(b).data('sanbox-video');
                var get_video_index = db_videos.indxf(decode_js['vid'] + '@*' + decode_js['vart'] + '@*' + decode_js['vnam']);
                db_videos[get_video_index] = decode_js['vid'] + '@*' + decode_js['vart'] + '@*' + decode_js['vnam'] + '@*1';
                return jQuery(b).find('.video_ifrm').addClass('__watched').parent().addClass('__ok');
            }
            if (b) {
                db_videos = [];
                return video_label.remove();
            }

            if (!videos_pushed) {
                video_label.find('.video_cont>ul>li').remove();
                for (var i = 0; i < db_videos.length; i++) {
                    store_videos = db_videos[i].split('@*');
                    h = Math.floor(now.getHours() - store_videos[4]);
                    m = Math.floor(now.getMinutes() - store_videos[5]);
                    video_label.find('.video_cont>ul').prepend(printf(new_video_mark, store_videos[0], store_videos[0], store_videos[1], store_videos[2], store_videos[0], store_videos[0], store_videos[1], store_videos[2], m <= 0 ? 'just now' : (h >= 1 || m > 60 ? h + '&nbsp;hour&nbsp;' : m + '&nbsp;min.&nbsp;') + 'ago'));
                    if (store_videos[3] == '1') video_label.find('li#' + store_videos[0]).addClass('__ok').find('.video_ifrm').addClass('__watched');
                }
                video_label.find('.video_cont').removeClass('__minimized');
                video_label.find('.separator').show();
                videos_pushed = true;
            } else {
                videos_pushed = false;
                video_label.find('.video_cont').addClass('__minimized');
                video_label.find('.separator').hide();
                video_label.find('.video_cont>ul>li').remove();
            }

        },
        video_archive: function(videoId, videoArtist, videoName) {
            close_layer_popup();
            var n_date = new Date(),
                n_hour = n_date.getHours(),
                n_minutes = n_date.getMinutes();
            var archive_markup = '<div class="mus_video_label" waiting-v-cont="true">' +
                '<div class="header" onclick="return jQuery.socplusMusic(\'video_archive_push\',event);">Waiting to be watched</div>' +
                '<div class="separator" style="display:none;"><span class="text" onclick="return jQuery.socplusMusic(\'video_archive_push\',event,1);">Close</span></div>' +
                '<div class="video_cont __minimized">' +
                '<ul></ul>' +
                '</div>' +
                '</div>';

            var video_label = $body.find('[waiting-v-cont]');
            var new_video_mark = '<li id="%s" data-sanbox-video=\'{"vid":"%s","vart":"%s","vnam":"%s"}\' onclick="jQuery.socplusMusic(\'video_archive_push\',event,this,1); return jQuery.socplusMusic(\'get_track_video\',%s);"><div class="video_ovr"></div><div class="video_ifrm"><iframe src="//player.vimeo.com/video/%s?title=0&amp;byline=0&amp;portrait=0&amp;color=f08400&amp;autoplay=0" width="100" height="70" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><span class="artist">%s - %s</span><span class="time">%s</span></div></li>';


            if (video_label.length == 0)
                $body.append(printf(archive_markup, videoId, videoId, videoArtist, videoName, videoId, videoId, videoArtist, videoName, 'just now'));
            else if (!video_label.find('.video_cont').hasClass('__minimized'))
                video_label.find('.video_cont>ul').prepend(printf(new_video_mark, videoId, videoId, videoArtist, videoName, videoId, videoId, videoArtist, videoName, 'just now'));
            else if (video_label.find('.video_cont').hasClass('__minimized'))
                video_label.find('.header').fadeOut('fast', function() {
                    jQuery(this).fadeIn('fast');
                });
            db_videos.push(videoId + '@*' + videoArtist + '@*' + videoName + '@*0@*' + n_hour + '@*' + n_minutes);


        },
        get_track_video: function(id) {
            setTimeout(function() {
                audio.pause();
                video_stopped_audio = (audio.playing ? true : false);
            }, 1000);
            return run_layer_popup('get_video', $body, id);
        },
        showVideoPopup: function(el) {

            jQuery.socplusMusic('removeVideoLabel', el);
            var video_id = el.data('video');
            var __video_popup_html = '<div class="mus_dropdown_w js-video-preview-overlay"><div class="mus_dropdown"><div class="gwt-HTML active_video_label">' +
                '<div class="vid-card_cnt">' +
                '<iframe src="//player.vimeo.com/video/' + video_id + '?title=0&amp;byline=0&amp;portrait=0&amp;color=f08400&amp;autoplay=1" width="230" height="150" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' +
                '</div></div></div></div>';


            el.html(__video_popup_html).find('div:first').addClass(activeclass).attr('title', 'Click to enlarge').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return jQuery.socplusMusic('get_track_video', video_id);
            });
            setTimeout(function() {
                el.find('div:first[title]').removeAttr('title')
            }, 3000);

            var posOfVideo = el.offset().top - mcontent.offset().top,
                m_content = (socplusMusicLcnt.height() - socplusMusicLTop.height()) - 100;

            if (posOfVideo + el.find('iframe').height() > m_content) el.find('div:first').addClass('__up');
            if (audio.playing && !video_stopped_audio) {
                audio.pause();
                video_stopped_audio = true;
            }
        },
        removeVideoLabel: function(el) {
            if (video_stopped_audio) {
                audio.play();
                video_stopped_audio = false;
            }

            return el.html('').find('div:first').removeClass(activeclass).removeClass('__up');

        },
        upload: function(t, m) {
            var c_selected_f_upl_files = document.all && !window.atob ? t.find('input:file').get(0).files : parseInt(t.find('input:file', this)[0].files.length),
                pl_act_notif = jQuery('#lmPPLlst').find('#ppl_' + m + '>div#pplCount'),
                c_upl_x = 0,
                c_upl_y = 0,
                nm = (!m ? my_mus_notif : pl_act_notif),
                nmh = '<span class="inlineBlock ic ic12 ic12_anim-upload"></span>',
                nmw = (!m ? nm.html() : pl_act_notif.html()),
                upl_succ = jQuery("#upload_succ"),
                c_m_m = jQuery("#mus_mymusc"),
                progress_bar = jQuery('.mus_upload_prg_bar'),
                maxfiles = (settings.maximumFileUpload == 0 ? '20' : settings.maximumFileUpload),
                file_ext = t.find('input[type="file"]').val().split('.').pop().toLowerCase();
            t.attr("action", (m === 'feedback' ? settings.musicpth + settings.feedbackUpload : settings.musicpth + settings.uploadfile));

            if (jQuery.inArray(file_ext, ['audio/mpeg', 'mp3']) == -1 && m !== 'feedback') {
                var evt = event || window.event;
                evt.preventDefault();
                evt.stopImmediatePropagation();
                return jQuery.socplusMusic('error', 'uploadFile', 'Invalid file extension, only mp3 files, please try again.');
            }


            var options = {
                beforeSend: function() {
                    if (!errorOcurred) {
                        if (m === 'feedback') {
                            document.getElementById('feedback_upload_output').className = '';
                            document.getElementById('feedback_upload_output').innerHTML = '';
                            document.getElementById('fileTransferBar').style.display = '';
                            return;
                        } else {
                            close_layer_popup();
                            nm.html(nmh);
                            closeErrorReporting('maxfiles');
                            upl_succ.hide();
                            progress_bar.fadeIn('fast').find('.ellip').text('0 from 100%');
                        }
                    }
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    if (m === 'feedback') return;

                    if (percentComplete < 100)
                        progress_bar.fadeIn('fast').find('.ellip').text(percentComplete + '% from 100%').prev('.progress_bar').css('width', percentComplete + '%');
                    else {
                        progress_bar.fadeIn('fast').find('.ellip').text(c_selected_f_upl_files + ' from ' + c_selected_f_upl_files).prev('.progress_bar').css('width', '100%').closest(progress_bar).hide();
                        upl_succ.show().find('span:last').html('<span style="color:white;">Storing covers...</span>');
                        upl_succ.find('i:last').addClass('ic_cover_loading');

                    }


                },

                complete: function(response) {
                    if (!errorOcurred) {
                        if (m === 'feedback' && response.responseText.split('~')[0] !== '1') {

                            document.getElementById('fileTransferBar').style.display = 'none';
                            document.getElementById('feedback_upload_output').className = '';
                            document.getElementById('feedback_upload_output').innerHTML = '<font color="red">' + response.responseText.split('~')[1] + '</font>';
                            return;

                        } else if (m === 'feedback' && response.responseText.split('~')[0] === '1') {

                            document.getElementById('feedback_upload_output').className = 'feedback_upload__success';
                            document.getElementById('feedback_upload_output').innerHTML = '<font color="green">file has been uploaded</font>';
                            document.getElementById('fileTransferBar').style.display = 'none';
                            document.getElementById('feedback_upl_file').value = response.responseText.split('~')[1];
                            return;


                        } else if (jQuery.trim(response.responseText) === 'OK') {
                            m_noAjax = false;
                            delete db_navigation_ajax[window.location.href];
                            upload_count = c_selected_f_upl_files;
                            nmws = c_selected_f_upl_files + parseInt(nmw);

                            if (!m) {
                                animateNumCount(my_mus_notif, 200);
                                nm.html(nmws);
                                //my_musUpl.attr('data-query', '?action=1&c=' + c_selected_f_upl_files);
                                my_musUpl.trigger('click');
                            } else {
                                var playlist_upload_succ = jQuery('#mus_playlist_upload_succ');
                                animateNumCount(nm, 200);
                                nm.html(nmws);
                                //playlist_upload_succ.attr('data-query', '?action=my&upload_succes=' + c_selected_f_upl_files + '&i=' + m);
                                playlist_upload_succ.attr('data-query', '?action=my&i=' + m);
                                playlist_upload_succ.trigger('click');
                                uploaded_in_playlist = m;

                            }


                        } else {
                            nm.html(nmw);
                            jQuery.socplusMusic('error', 'uploadFile', response.responseText);
                        }
                    }
                },
                error: function() {
                    return jQuery.socplusMusic('error', 'uploadFile', 'Error ocurred');
                }
            };


            if (c_selected_f_upl_files > maxfiles) {
                nm.html(nmw);
                return jQuery.socplusMusic('error', 'maxfiles');
            } else
                t.ajaxForm(options).trigger('submit');




        },
        getUserData: function(y, x) {

            // if(m_noAjax) return;

            var saddedHTML = '<div class="stabil mus-tr_right-controls foh-s">' +
                '<span class="stabil muc-tr_right-controls_tx">' +
                '<span class="Xmus-tr_right-controls_message"></span></span></div>',

                my_playlists_HTML = '<li id="myplst" class="mml_subcat_li" %s data-href="playlist" data-action="true" data-query="?action=my&i=%s"><div style="padding-bottom:5px;" class="mus_mt0 mml_subcat_btn" id="ppl_%s" title="%s">' +
                '<div class="mml_ucard ">' +
                '<div class="' + pl_card + '"><img style="width: 100%; height: 100%;vertical-align: baseline;" onerror="this.style.display=\'none\';" src="%s"><img src="' + settings.noReadPlaylistCover + '">' +
                '</div><div class="mplst_mt15">' +
                '<div class="mml_ucard_n va_target"><div class="mml_ucard_n_f">%s</div></div>' +
                '</div></div><span class="mus_dot %s"></span><span class="mml_notif mml_notif__num" ><span class="inlineBlock ic ic12 ic12_anim-upload"></span></span>' +
                '<div class="mml_notif mml_notif__num __on" id="pplCount">%s</div></div></li>';


            setTimeout(function() {
                var each_playlists = jQuery('.pl-mb-90');


                // check for playlists if exists into my collection add class green Added
                jQuery.each(db_check_my_playlist, function(i, playlist) {
                    d = each_playlists.find('div[uid="card"]');
                    if (d.length !== 0) {
                        o1 = d.attr('id').split('_')[0];
                        each_playlists.find('div#' + o1 + '_' + playlist).addClass(pl_added_class).find('[uid="add"]').attr('uid', 'added');
                    }
                });


                // add pause class to the current playing playlist
                if (playing_playlist !== null && audio.playing) {
                    var _d = each_playlists.find('div[uid="card"]'),
                        _o1 = _d.attr('id') ? _d.attr('id').split('_')[0] : 0;
                    each_playlists.find('div.' + pl_playing_class).removeClass(pl_playing_class);
                    each_playlists.find('div#' + _o1 + '_' + playing_playlist).addClass(pl_playing_class);
                } else if (!audio.playing) each_playlists.find('div.' + pl_playing_class).removeClass(pl_playing_class);


                each_playlists.find('[uid="add"]').each(function() {
                    var $t = jQuery(this);
                    var __vbr = $t.closest('div[uid="card"]');

                    var cr_coll_attr = printf('{"collection_id":"%s","collection_name":"%s","collection_cover":"%s","collection_count":"%s"}', __vbr.attr('id').split('_')[1], __vbr.find('div:last>span').text(), __vbr.find('img').attr('src'), __vbr.attr('data-pl-count'));

                    $t.attr({
                        'id': '__hover_add_collection',
                        'data-collection': cr_coll_attr
                    });
                }).on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    __add_playlist_to_my_collection(jQuery(this), true);
                });


                // add "Song added" to music where exits into my music and playlists
                var oli = socplusMusicLcnt.find('ol li'),
                    exId = oli.find('span[data-action="play"]').attr('id');
                if (exId && $('#lmSecm_sec_klass div:first').hasClass('__active') == false){//curr_history_addr !== 'mymusic') {
                    var new_exId = '',
                        ex;
                    exId = exId.split('_');
                    ex = exId.length - 1;
                    for (i = 0; i < ex; i++) new_exId += exId[i] + '_';
                    jQuery.each(db_check_mymus, function(i, id) {
                        d = oli.find('span[data-action="play"]#' + new_exId + id), mus_add = jQuery('.mus-tr_right-controls');
                        d.closest('li').find(mus_add).replaceWith(saddedHTML);
                    });

                    db_check_mus_updated = false;
                };


                timeoutGetData = 50;
            }, timeoutGetData);



            if (!x) {

                // remove current playlists and add new
                jQuery('li#myplst').each(function() {
                    jQuery(this).remove();
                });

                // check for playlists and create
                jQuery.ajax({
                    url: settings.musicpth + settings.manageMyMusic,
                    type: 'POST',
                    data: {
                        action: 'checkPlaylists',
                        track: '0'
                    },
                    cache: false,
                    dataType: 'json',
                    success: function(d) { ///alert(d);

                        jQuery.each(d.items, function(i, item) {
                            playlistName = item.pn, //decodeURIComponent(item.pn),
                                playlistId = item.pi,
                                playlistCover = decodeURIComponent(item.pc),
                                playlistCount = item.po,
                                playlist_updt = (item.pu === 'yes' ? 'dot_notification' : 'm_hidden');
                            playlist_notif = (playlist_updt === 'dot_notification' ? 'data-playlist-update="yes"' : '');

                            my_playlists_r = printf(my_playlists_HTML, playlist_notif, playlistId, playlistId, playlistName, playlistCover, playlistName, playlist_updt, playlistCount);
                            jQuery('ul#lmPPLlst').find('li:first').after(my_playlists_r);
                            if (playlist_updt === 'dot_notification') my_music_dot_notif.removeClass(hiddenClass);
                            ajax_update_href_links();

                        });

                    }
                });
                if (y === true) {
                    jQuery('#mngplaylist').trigger('click');
                } else if (y !== true && y !== false && y) {
                    delete_page_content();
                    /// jQuery('#mngplaylist').trigger('click');
                    taimout = setInterval(function() {
                        jQuery('ul.mml_subcat_ul').find('div#ppl_' + y).parent('li').trigger('click');
                    }, 200);
                }

            } // if x is empty	


            setTimeout(function() {
                if (ajax_update_href_links !== null) ajax_update_href_links();
                update_page_content();
            }, 1000);

        },
        leftmenu: function(el) {
            ractive();
            aactive(el);
        },
        close: function() {
            jQuery('body').css('overflow', 'auto');
            jQuery.socplusMusic('destroy');
            if (history.pushState) {
                history.pushState(null, null, current_h_addr);
            } else {
                History.pushState(null, null, current_h_addr);
            }
            jQuery('[data-m-container]').remove();
        },
        hide: function() {
            document.title = settings.originalTitle;
            jQuery('body').css('overflow', 'auto');
            jQuery('[plpsbtn]').removeClass('__active');
			jQuery('html').removeClass('musicon');
            popup_music_is_showed = false;
            popup_music_is_constructed = window.location.href;
            if (history.pushState) history.pushState(null, null, current_h_addr);
            else History.pushState(null, null, current_h_addr);
            return jQuery('[data-multimedia-layer="visible"]').addClass('__hidden').attr('data-multimedia-layer', 'invisible');
        },
        show: function() {
            document.title += settings.MusicWIndowTitle;
            if (history.pushState) history.pushState(null, null, popup_music_is_constructed);
            else History.pushState(null, null, popup_music_is_constructed);
            $body.css('overflow', 'hidden');
            jQuery('[plpsbtn]').addClass('__active');
			if(!mus_start_invisible)jQuery('html').addClass('musicon');
			
			mus_start_invisible = false;
            return jQuery('[data-multimedia-layer="invisible"]').removeClass('__hidden').attr('data-multimedia-layer', 'visible');
        },
        feedback: function() {

            return run_layer_popup('feedback', $body);

        },
        goBack: function(b, evt) {

            var x = Object.keys(db_navigation_ajax)[Object.keys(db_navigation_ajax).length - troubl_prev_pages];

            if (b) {
                evt.preventDefault();
                return jQuery.socplusMusic('onGbk', getNavigator(), false, x);
            }


            if (history.pushState) {
                setTimeout(function() {

                    if (typeof getNavigator() == 'undefined')
                        jQuery.socplusMusic('hide');

                    jQuery.socplusMusic('onGbk', getNavigator(), false, x);
                }, 200);
            } else {


                setTimeout(function() {

                    if (typeof getNavigator() == 'undefined')
                        jQuery.socplusMusic('hide');

                    jQuery.socplusMusic('onGbk', getNavigator(), true, x);
                }, 200);
            }

            return false;
        },
        destroy: function() {
            document.title = settings.originalTitle;
            createCookie("tk_m", 0);
            createCookie("inited", false);

        },
        onGbk: function(b, n, y) {
            if (!y || y.indexOf(settings.musicpth) == -1) {
                hback.addClass(disabledClass);
                return jQuery.socplusMusic('hide');
            }
            if (y) return ajax_return_prev_page(y);
            else {
                return jQuery.socplusMusic('hide');
                //m_noAjax = false;
                //History.back();
            }
            upd_hb_count = true;
        }
    };
    jQuery.socplusMusic = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.init.apply(this, arguments);
        } else {
            alert('Method ' + methodOrOptions + ' does not exist on jQuery.socplusMusic');
        }
    };
})(jQuery);


var wm_aud = waudio.createAll(),
    audio = wm_aud[0],
    nextTrack = jQuery('.__forward'),
    prevTrack = jQuery('.__back'),
    volumeBar = jQuery('.__volume'),
    volumeSlider = volumeBar.find(".mus_player-slider_drag"),
    vTooltip = volumeBar.find(".mus_player-slider_tooltip"),
    defaultVol = settings.defaultVolume,
    volumeic = jQuery('.mus_player-volume_ic'),
    mus_shuffle = jQuery('div.mus_player_shuffle'),
    mus_repeat = jQuery('.mus_player_repeat'),
    vlnws = false,
    manipVol = false,
    defaultArtistName,
    defaultTrackName,
    defaultCover,
    defaultCoverClass,
    defaultArtistNameData,
    defaultTrackNameData,
    defaultCoverData,
    defaultCoverClassData,
    coverCSSclasses,
    hiddenClass,
    time_played,
    playerDrag,
    playerTooltip,
    now_playing_html;



var getVars = function() {

    defaultArtistName = jQuery('span.mus_player_artist, .mini_player_artist'),
        defaultTrackName = jQuery('span.mus_player_song, .mini_player_song'),
        defaultCover = jQuery('.mus_player_cover'),
        defaultCoverClass = jQuery('.mus_player_cover-empty'),
        defaultArtistNameData = defaultArtistName.text(),
        defaultTrackNameData = defaultTrackName.text(),
        defaultCoverData = defaultCover.find('img').attr('src'),
        defaultCoverClassData = defaultCoverClass.attr('class'),
        coverCSSclasses = "__overlay __movie __ac";
    hiddenClass = "m_hidden",
        time_played = jQuery('.mus_player_played,.mus_player_duration'),
        playerDrag = jQuery('.__player> .mus_player-slider_drag, .mus_player-slider_fill'),
        playerTooltip = jQuery('.__player>.mus_player-slider_tooltip');

    now_playing_html = '<div class="music_play-ntf">Now playing' +
        '<div class="music_play-ntf_track inlineBlock ellip">&nbsp;%s - %s&nbsp;</div>from album' +
        '<div class="music_play-ntf_user inlineBlock">' +
        '<div class="music_play-ntf_name inlineBlock ellip">&nbsp;%s</div></div></div>';


};

var playListEnd = function() {
    getVars();
    playing_playlist = null,
        readFromPopup = false;
    nextTrack.removeClass('__forwardShortcut').addClass('__disabled');
    prevTrack.removeClass('__backShortcut');
    defaultArtistName.text('');
    defaultTrackName.text('');
    defaultCover.removeClass(coverCSSclasses);
    defaultCover.find('img').hide();
    //defaultCoverClass.removeClass(hiddenClass);
    time_played.text(' 0:00');
    playerDrag.css('width', 0);
    playerTooltip.css('left', 0);
    audio.pause();
    jQuery('audio').removeAttr('src');
    return;

};

var getTrackDetails = function(n, trackID, cover, artistName, songName, has_video, album) {

    //vars
    getVars();


    var addCover = cover.split('/')[2],
        nw_playing = overlay.find('div.music_play-ntf'),
        now_playing_timeout = null;
    defaultCover = (has_video !== 0 ? defaultCover.addClass(coverCSSclasses) : defaultCover.removeClass(coverCSSclasses));

    // if exist cover ( if not default cover )
    if (addCover != settings.host.split('/')[2]) {
        defaultCover.find('img').attr({
            'aria-hidden': 'false',
            'src': cover
        }).show();
        defaultCover.find('[data-header-video]').attr('data-header-video', has_video);
    } else defaultCover.find('img').attr({
        'aria-hidden': 'true'
    }).hide();

    if (!n) {

        //remove from pause btn
        socplusMusicLcnt.find('ol li').find('span[title="Pause"]')
            .removeClass('__pause')
            .attr('title', 'Play')
            .closest('li')
            .find('div:first')
            .removeClass(activeclass);

        //remove active class
        socplusMusicLcnt.find('ol li').find('div.' + activeclass)
            .removeClass(activeclass);


        //add classes to this song
        socplusMusicLcnt.find('ol li').find("span#" + trackID)
            .addClass('__pause')
            .attr('title', 'Pause')
            .closest('li')
            .find('div:first')
            .addClass(activeclass);

    }


    // set artist name in player
    defaultArtistName.text(artistName).attr('data-query', '?action=searchResult&method=inx&key=' + artistName);

    // set song name in player
    defaultTrackName.text(songName).attr('data-query', '?action=searchResult&method=songs&key=' + songName);

    // add NOW PLAYING to left bottom of page
    if (settings.showPlayingNotification) {
        if (audio.playing && now_playing) {
            overlay.append(printf(now_playing_html, artistName, songName, album));
            now_playing = false;
        } else if (audio.playing && !now_playing) {
            nw_playing.replaceWith(printf(now_playing_html, artistName, songName, album));
            clearTimeout(now_playing_timeout);
        }
        now_playing_timeout = setTimeout(function() {
            overlay.find('div.music_play-ntf').addClass('__hide');
        }, 8000);
    }

};




var setVolumeIcon = function(v) {

    if (v <= 33 && v > 0) {
        volumeic.removeClass('__mute').addClass('__middle');
        volumeBar.removeClass('__disabled __empty');
    } else if (v == 0) {
        volumeic.removeClass('__middle').addClass('__mute');
        volumeBar.addClass('__disabled __empty');
    } else {
        volumeBar.removeClass('__disabled __empty');
        volumeic.removeClass('__mute __middle');
    }

};




// volume manipulation
volumeBar.slider({
    range: "min",
    min: 0,
    max: 68,
    animate: true,
    value: defaultVol,
    create: function(a, b) {
        setVolumeIcon(defaultVol);
        vTooltip.css('left', defaultVol + 'px');
        volumeSlider.css('width', defaultVol);
        defaultVol === 0 ? audio.setVolume(defaultVol, true) : audio.setVolume(defaultVol, false);
    },
    change: function(a, b) {
        manipVol = true;
        defaultVol = b.value;
        createCookie('mus_dfvl', defaultVol);
    },
    slide: function(e, vVl) {

        if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) return;
        volumeSlider.css('width', vVl.value);
        vTooltip.css('left', vVl.value);
        vVl.value === 0 ? audio.setVolume(vVl.value, true) : audio.setVolume(vVl.value, false);
        setVolumeIcon(vVl.value);

    }
}).on("slidecreate DOMMouseScroll mousewheel wheel", function(ev, i) {

    ev.preventDefault();
    value = volumeBar.slider("value");

    var evt = ev || e || window.event;

    var delta = evt.originalEvent.detail < 0 || evt.originalEvent.wheelDelta > 0 ? 1 : -1;
    r = 5;

    if (value <= 5 || value >= 63) r = 1;

    if (delta < 0) {

        value = value + r;
        if (value < 0 || value > 68) return;
        volumeBar.slider("value", value);
        volumeSlider.css('width', value);
        vTooltip.css('left', value);

        value === 0 ? audio.setVolume(value, true) : audio.setVolume(value, false)

        setVolumeIcon(value);

    } else {
        value = value - r;
        if (value < 0 || value > 68) return;
        volumeBar.slider("value", value);
        volumeSlider.css('width', value);
        vTooltip.css('left', value);
        value === 0 ? audio.setVolume(value, true) : audio.setVolume(value, false)
        setVolumeIcon(value);

    }
});


// volume icon click
volumeic.on('click', function() {
    var $this = jQuery(this);

    if ($this.hasClass('__mute') == true && vlnws == false) {
        vlnws = true;
        this.kbl = false;
        dfvl = settings.defaultVolume;
        volumeSlider.css('width', dfvl);
        vTooltip.css('left', dfvl + 'px');
        createCookie('mus_dfvl', dfvl);
        defaultVol = dfvl;
        setVolumeIcon(dfvl);
        audio.setVolume(dfvl, false);
        return;
    }
    if ($this.hasClass('__mute') == true) {
        if (defaultVol == '0') {
            defaultVol = settings.defaultVolume;
        }

        volumeSlider.css('width', defaultVol);
        vTooltip.css('left', defaultVol + 'px');
        this.kbl = false;
        createCookie('mus_dfvl', defaultVol);
        setVolumeIcon(defaultVol);
        audio.setVolume(defaultVol);
    } else
    if (!this.kbl) {
        vlnws = true;
        this.kbl = true;
        createCookie('mus_dfvl', '0');
        setVolumeIcon('0');
        audio.setVolume('0', true);
    } else {
        vlnws = true;
        this.kbl = false;
        createCookie('mus_dfvl', defaultVol);
        setVolumeIcon(defaultVol);
        audio.setVolume(defaultVol);
    }

});

//end volume control




// forward click
nextTrack.on('click', function(e) {
    if (jQuery(this).hasClass(disabledClass)) {
        e.stopPropagation();
        return false;
    } else return audio.trackEnded(null, null, 26);
});

// back click
prevTrack.on('click', function(e) {
    if (jQuery(this).hasClass(disabledClass)) {
        e.stopPropagation();
        return false;
    } else return audio.trackEnded(true, null, -34);
});

//repeat control
mus_repeat.on('click', function() {
    jQuery(this).removeClass('__one');

    if (!isRepeat || isRepeat === 'no') {
        createCookie('mus_repeat', 'yes');
        isRepeat = 'yes';
        aactive(null, this);
        return;
    } else if (isRepeat === 'yes') {
        createCookie('mus_repeat', '1');
        isRepeat = true;
        rmactive(this);
        jQuery(this).addClass('__one');
        return;
    } else {
        createCookie('mus_repeat', 'no');
        isRepeat = false;
        rmactive(this);
        return;
    }

});
/* add active class to repeat if is ON */
if (isRepeat === 'yes') aactive(null, mus_repeat);
else if (isRepeat === '1') mus_repeat.addClass('__one');


// shuffle control
mus_shuffle.on('click', function() {

    if (!isShuffle || isShuffle === 'no') {
        createCookie('mus_shuffle', 'yes');
        isShuffle = true;
        aactive(null, this);
        return;
    } else {
        createCookie('mus_shuffle', 'no');
        isShuffle = false;
        rmactive(this);
        return;
    }

});
/* add active class to shuffle if is ON */
if (isShuffle === 'yes') aactive(null, mus_shuffle);


// Keyboard shortcuts
$document.off('keyup.muss').on('keyup.muss', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var unicode = e.charCode ? e.charCode : e.keyCode;
    // down arrow
    if (unicode == 40 && document.activeElement.nodeName !== 'TEXTAREA' && document.activeElement.nodeName !== 'INPUT' && document.activeElement.isContentEditable === false) {
        nextTrack.addClass('__forwardShortcut').click();
        // back arrow
    } else if (unicode == 38 && document.activeElement.nodeName !== 'TEXTAREA' && document.activeElement.nodeName !== 'INPUT' && document.activeElement.isContentEditable === false) {
        prevTrack.addClass('__backShortcut').click();
        // spacebar
    } else if (unicode == 32 && document.activeElement.nodeName !== 'TEXTAREA' && document.activeElement.nodeName !== 'INPUT' && document.activeElement.isContentEditable === false) {
        audio.playPause();
    } else if (e.keyCode == 27) {

        if (settings.hideOnESC && layer_popups === false) jQuery.socplusMusic('hide');

        close_layer_popup();
        close_recent_dropDown();
        sharing_dropDown_active = false;
        lyrics_dropDown_active = false;

    } else if (e.keyCode == 8 && document.activeElement.nodeName !== 'INPUT' && contenteditable === false) return hback.trigger('click'); //jQuery.socplusMusic('goBack',true,e);

    return false;
});

function set_editable(el) {
    contenteditable = true;
    el.setAttribute('contenteditable', 'true');
}

function l_upl_dr_act(x) {
    var interval_t = setInterval(function() {
        if (jQuery('.m_last_uploads').length !== 0) {
            !x ? jQuery('.m_last_uploads, .mus_tabs_i.1').addClass('__active __on') : jQuery('.m_last_uploads').removeClass('__on');
            clearInterval(interval_t);
        }
    }, 1000);
}

// Payment Engine
function success_paied() {
    close_layer_popup();
    return purchased.click();
}

function get_p_met(x, button) {

    if (!x) x = 'skrill';

    var url_to_payment = '../downloads/download_song.php?action=%s&q=%s';
    var payment_iframe = jQuery('iframe.iframe');

    // remove active class
    jQuery('.p_tab').filter('.active').removeClass('active');
    // add active class to the current payment method
    jQuery(button).addClass('active');

    payment_iframe.attr('src', printf(url_to_payment, x, _song_id));


}

function call_buy_popup(el) {
    var element = jQuery(el);
    var song_id = element.prev().attr('id').split('_'),
        song_split_nm_id = song_id[song_id.length - 1];
    return run_layer_popup('download_song', socplusMusicLcnt, song_split_nm_id);

}

function buy_song(v) {
    var purchase_song = jQuery('[data-buy-song]');
    // click to buy button function
    purchase_song.on('click', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        ///window.open(settings.host + '/purchase.php', '_blank');
        _song_id = this.getAttribute('data-buy-song');
        return run_layer_popup('Payments', socplusMusicLcnt);
        /// return v();
    });

};


function isIE(userAgent) {
    userAgent = userAgent || navigator.userAgent;
    return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
}

function update_page_content() {
    db_navigation_ajax[window.location.href] = mcontent.html();
}

function delete_page_content() {
    delete db_navigation_ajax[window.location.href];
}


function load_external_images() {



    var images = [],
        timer = null,
        images_loaded;

    mcontent.find('img').each(function(i) {

        if (jQuery(this).offset().top > mcontent.scrollTop() + mcontent.height()) {
            images[i] = this.src;
            this.setAttribute('data-external-image', i);
            this.setAttribute('src', '');
        }
    });


    if (!images_loaded) {

        mcontent.find(':scrollable').on('scroll', function() {

            if (timer !== null) {
                clearTimeout(timer);
            }


            var elements = mcontent.find('img[data-external-image]');

            timer = setTimeout(function() {

                elements.each(function() {

                    var $this = jQuery(this),
                        t_id = $this.data('external-image');

                    jQuery.socplusMusic('getsocplusMusicHTML', 'load');
                    if ($this.offset().top < mcontent.scrollTop() + mcontent.height()) {
                        $this.load(function() {
                            jQuery.socplusMusic('getsocplusMusicHTML', 'ok');
                        });
                        $this.attr('src', images[t_id]).removeAttr('data-external-image').show();
                        delete images[t_id];
                        images_loaded = true;

                    }


                });

            }, 500);

        });

    }

}

function share_popup(netw) {
    if (!netw) return alert('Please select an option.');
    var w_size, h_size;
    var url = netw.getAttribute('data-url');
    var title = netw.getAttribute('data-title');
    var domain = url.split("/")[2];
    switch (domain) {
        case "www.facebook.com":
            w_size = 585;
            h_size = 368;
            break;
        case "www.twitter.com":
            w_size = 585;
            h_size = 261;
            break;
        case "plus.google.com":
            w_size = 517;
            h_size = 511;
            break;
        default:
            w_size = 585;
            h_size = 511;
    }

    var left = (screen.width / 2) - (w_size / 2);
    var top = (screen.height / 2) - (h_size / 2);
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + w_size + ',height=' + h_size + ',top=' + top + ',left=' + left);
    return false;

}

function as_status(o, id, artist, song) {
    id = id.split('_');
    id = id[id.length - 1];
    var send = jAjax('/profile', 'post', 'q=' + escape(artist + ' - ' + song) + '&cmd=pStatus&i=' + escape(id) + '&type=pos&view_as=json');
    // ajaxLoading();

    send.done(function(r) {
        var res = validateJson(r);
        curr_playing_song = id;
        // removeAjaxLoad();

        if (res && res['response'] != 'OK') {
            return displayErr(res['response']);
        } else {
            $(o).addClass('__done');
            $('#mus_status_created').text(lang.music_status_added);
            setTimeout(function() {
                $(o).addClass('__disabled');
		clickOnHome();
            }, 1000);
        }


    });

}

function enable_pst_btn() {
    $('[uid="shareThisSong"]').removeClass("__disabled __done");
    $('#mus_status_created').text(lang.music_post_to_status);
}

function om_share(id, a, s) {
    close_recent_dropDown();
    if (!id) return;
    if (!sharing_dropDown_active) {
        id = id.split('_');
        if (id[0] === 'recommendation') return jQuery.socplusMusic('error', null, 'Sorry this song can not be shared.');
        jQuery.ajax({
            url: settings.musicpth + settings.manageMyMusic,
            type: 'POST',
            data: {
                action: 'Sharing',
                track: id[id.length - 1],
                b: a,
                c: s
            },
            cache: false,
            success: function(res) {
                sharing_dropDown_active = true;
                layer_popups = true;
                jQuery('.__to-status').html(res).click(function(e) {
                    e.preventDefault();
                    e.stopPropagation()
                });
            },
            error: function(a, b, c) {
                return jQuery.socplusMusic('error', null, b);
            }
        });
    } else {
        sharing_dropDown_active = false;
        close_recent_dropDown();
    }
}


var ajaxRequest = new(function() {

    function closeReq() {
        oLoadingBox.parentNode && document.body.removeChild(oLoadingBox);
        bIsLoading = false;
        isProcessing = false;

    }

    function abortReq() {
        if (!bIsLoading) {
            return;
        }
        oReq.abort();
        closeReq();
    }

    function ajaxError() {
        //  alert("Unknown error.");
        jQuery.socplusMusic('error', 'navigation', 'Unknown error.');
    }

    function ajax_high_load() {
        jQuery.socplusMusic('getsocplusMusicHTML', 'load');
    }

    function ajaxTimeout() {
        ///oLoadingBox.style.display = 'block';
        jQuery.socplusMusic('getsocplusMusicHTML', 'ajax_timeout');

    }

    function after_succ_upload() {
        setTimeout(function() {

            if (upload_count && (curr_history_addr == 'mymusic' || curr_history_addr == 'playlist')) {
                var succ_text = mcontent.find('#upload_succ');
                succ_text.show();
                succ_text.find('.mus-text').text('Uploaded ' + upload_count + ' song' + (upload_count > 1 ? 's' : ''));
                upload_count = null;
            }

        }, 1500);

        if (uploaded_in_playlist) {
            jQuery('#lmPPLlst').find('.' + activeclass).removeClass(activeclass);
            jQuery('#lmPPLlst').find('#ppl_' + uploaded_in_playlist).addClass(activeclass);
            uploaded_in_playlist = null;
        }

    }

    function existContent(page, d) {
        var save_session;
        m_noAjax = true;

        save_session = db_navigation_ajax[page];
        document.getElementById(sTargetId).innerHTML = save_session;


        if (typeof History === 'undefined') {
            alert('an error occured, the program will be restarted.');
            window.location.reload();
        }
        History.pushState(null, settings.originalTitle + settings.MusicWIndowTitle, page);

        //if(curr_history_addr == 'search') load_external_images();
        no_mus_preview_loader = false;
        if (global_scrolling) {
            setTimeout(function() {
                var to_el = jQuery("#" + global_scrolling);
                mcontent.find(':scrollable').
                animate({
                    scrollTop: (to_el.offset().top - mcontent.offset().top) - (to_el.outerHeight() * 2)
                });
                global_scrolling = false;
            }, 200);
        }

        ct = page.split(new RegExp('[?=]', 'g'));

        ct[1] !== 'ct' ? updateTrackId(null) : updateTrackId(ct[2]);
        jQuery.socplusMusic('updatesocplusMusicHead', ct[1] + ',' + ct[2]);

        upload_popup();
        ajax_update_href_links();
        if (timeoutGetData > 50) jQuery.socplusMusic('getUserData');
        setTimeout(function() {

            delete_page_content();
            db_navigation_ajax[page] = save_session;
            if (curr_history_addr == 'downloads') delete_page_content();
            if (typeof curr_history_addr != null && curr_history_addr == 'search') ractive();
        }, 50);

        if (!d) troubl_prev_pages = 2;
        else {


            var ind;
            switch (curr_history_addr) {
                case 'popular':
                    ind = popular;
                    break;
                case 'playlist':
                    ind = playlist;
                    break;
                case 'upload':
                    ind = upload;
                    break;
                case 'downloads':
                    ind = purchased;
                    break;
                case 'mymusicUpload':
                    ind = my_musUpl;
                    break;
                case 'setPosition':
                    ind = my_music;
                    break;
                case 'radio':
                    ind = radio;
                    break;
                case 'mymusic':
                    ind = my_music;
                    break;
                case 'search':
                    return;
                    break;
                default:
                    ind = popular;
            }

            ractive();
            aactive(null, ind);
        }

        setTimeout(function() {
            mcontent.find('.mus_loading_ic').remove();
        }, 3000);
        return;
    }

 
    function ajaxLoad() {  
        var vMsg, ct, nStatus = this.status;
        switch (nStatus) {
            case 200:
 
                vMsg = this.responseText; //JSON.parse(this.responseText);
                //document.title = oPageInfo.title = vMsg.page;
                document.getElementById(sTargetId).innerHTML = vMsg;

               // jQuery('#' + sTargetId).find('.m_c_s_header').after(search_container);

                if (oReq.readyState == 4 && oReq.status == 200) {
                    clearTimeout(xmlHttpTimeout);
                    clearTimeout(Aj_high_load);
                    jQuery.socplusMusic('getsocplusMusicHTML', 'ok');
                }

                if (bUpdateURL) {
                    if (typeof History === 'undefined') {
                        alert('an error occured, the program will be restarted.');
                        window.location.reload();
                    }
                    History.pushState(null, settings.originalTitle + settings.MusicWIndowTitle, oPageInfo.url);
                    bUpdateURL = false;
                }

                // insert into virtual database as loaded page
                db_navigation_ajax[oPageInfo.url] = vMsg;
                after_succ_upload();

                if (mcontent.find('#mymusic_active_page').length != 0 && !my_mus_page) my_mus_page = oPageInfo.url;
                if (mcontent.find('#my_active_playlist').length != 0 && !my_ply_page) my_ply_page = oPageInfo.url;

                //if(curr_history_addr == 'search') load_external_images();
                no_mus_preview_loader = false;
                if (global_scrolling) {
                    setTimeout(function() {
                        var to_el = jQuery("#" + global_scrolling);
                        mcontent.find(':scrollable').
                        animate({
                            scrollTop: (to_el.offset().top - mcontent.offset().top) - (to_el.outerHeight() * 2)
                        });
                        global_scrolling = false;
                    }, 200);
                }

                ct = oPageInfo.url.split(new RegExp('[?=]', 'g'));

                ct[1] !== 'ct' ? updateTrackId(null) : updateTrackId(ct[2]);

                jQuery.socplusMusic('updatesocplusMusicHead', ct[1] + ',' + ct[2]);
                upload_popup();
                if (typeof curr_history_addr != null && curr_history_addr == 'search') ractive();
                if (timeoutGetData > 50) jQuery.socplusMusic('getUserData');
                init();

                break;
            default:
                vMsg = nStatus + ": " + (oHTTPStatus[nStatus] || "Unknown");
                switch (Math.floor(nStatus / 100)) {
                    /* 
                     case 1:
                         // Informational 1xx
                        console.log("Information code " + vMsg);
                         break;
                     case 2:
                         // Successful 2xx
                        console.log("Successful code " + vMsg);
                         break;
                     case 3:
                         // Redirection 3xx
                         console.log("Redirection code " + vMsg);
                         break;
                     */
                    case 4:
                        /* Client Error 4xx */
                        //alert("Client Error #" + vMsg);
                        jQuery.socplusMusic('error', 'navigation', 'Client Error #' + vMsg);
                        break;
                    case 5:
                        /* Server Error 5xx */
                        // alert("Server Error #" + vMsg);
                        jQuery.socplusMusic('error', 'navigation', 'Server Error #' + vMsg);
                        break;
                    default:
                        /* Unknown status */
                        ajaxError();
                }
        }
        closeReq();
    }

    function filterURL(sURL, sViewMode) {
        return sURL.replace(rSearch, "") + ("?" + sURL.replace(rHost, "&").replace(rView, sViewMode ? "&" + sViewKey + "=" + sViewMode : "").slice(1)).replace(rEndQstMark, "");
    }

    function flURL(url, param, value) {
        var a = document.createElement('a'),
            regex = /[?&]([^=]+)=([^&]*)/g;
        var match, str = [];
        a.href = url;
        value = value || "";
        while (match = regex.exec(a.search))
            if (encodeURIComponent(param) != match[1]) str.push(match[1] + "=" + match[2]);
        str.push(encodeURIComponent(param) + "=" + encodeURIComponent(value));
        a.search = (a.search.substring(0, 1) == "?" ? "" : "?") + str.join("&");
        return a.href.replace(' ', '');
    }


    function getXMLobject() {
        oReq = false;
        if (window.XMLHttpRequest) {
            try {
                oReq = new XMLHttpRequest()
            } catch (e) {
                oReq = false
            }
        } else {
            if (window.ActiveXObject) {
                try {
                    oReq = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (e) {
                    try {
                        oReq = new ActiveXObject("Microsoft.XMLHTTP")
                    } catch (e) {
                        oReq = false
                    }
                }
            }
        }
        return oReq;
    }

    function getPage(sPage) {

        if (isProcessing || m_noAjax) return;

        isProcessing = true;
        if (bIsLoading) {
            if (settings.ajaxLoadingIcon)
                oLoadingBox.style.display = 'block';

            return;
        }
        bIsLoading = true;
        oReq = getXMLobject();
        if (!oReq) return alert('Sorry an error occured at construct XMLHttpRequest.');
        switch (document.all && !window.atob) {
            case 'true':
                oReq.onreadystatechange = ajaxLoad;
                break;
            default:
                oReq.onload = ajaxLoad;
                oReq.onerror = ajaxError;
        }
        if (sPage) {
            oPageInfo.url = sPage;
        }
		 
        //oReq.open("GET", filterURL(oPageInfo.url, "json"), true);
        oReq.open("GET", flURL(sPage, "tk", readCookie("tk_m")), true);
        oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        oReq.send();
        !no_mus_preview_loader ? Aj_high_load = setTimeout(ajax_high_load, settings.showLoaderTimeout) : '';
        !no_mus_preview_loader ? xmlHttpTimeout = setTimeout(ajaxTimeout, settings.AjaxLoadingTimeOut) : '';
        document.body.appendChild(oLoadingBox) || oLoadingBox.parentNode;

    }

    function requestPage(sURL) {
        m_noAjax = false;
        if (settings.load_without_ovr) mcontent.html('');
        //if(mcontent.find('[mus-ajax-loader="true"]').length == 0) mcontent.append('<div mus-ajax-loader="true" class="mus_loading"><div class="mus_loading_shadow"></div> <div class="mus_loading_ic preloader" style="display: block;"></div></div>');

        if (history.pushState) {
            bUpdateURL = true;
            getPage(sURL);
        } else if (typeof history.pushState == 'undefined') {
            // IE
            sURL = sURL.split(settings.host);
            bUpdateURL = true;
            getPage('../' + sURL[1]);
        } else {
            ///* Ajax navigation is not supported */
            location.assign(sURL);
        }
    }

    function processLink(el) {
		el.removeClass('clicked');
        if (el.attr("play-button") === 'true') audio.play();
        else if (el.attr('search-suggestions') === 'true') clear_suggestion();
        else if (el.data('playlist-update') === 'yes') remove_dot_notif(el);
        else if (el.data('remove-dropdown') === 'yes') remove_media_dropdown();
        // if (this.getAttribute("data-href") === sAjaxClass) {
			var t_href = el.attr("data-href");
			
			if(t_href == 'index')
				t_href = '';
			else t_href = t_href+'/';
			
        if (el.attr("data-action") || el.attr("data-action") == "true") {

            var href_on = settings.host + settings.musicpth + t_href + settings.phpFileName + el.attr("data-query");
			
 
          /*  if (href_on in db_navigation_ajax) return existContent(href_on);
            else*/
                requestPage(href_on);
        } else {
            var href_off = settings.host + settings.musicpth + t_href + settings.phpFileName;
	 

           /* if (href_off in db_navigation_ajax) return existContent(href_off);
            else*/
                requestPage(href_off);

        }
        return false;
        //}
        //return true;

    }

    function init() {
        //  oPageInfo.title = document.title;
        // for (var oLink,nLen = [], nIdx = 0, nLen = document.body.getElementsByTagName("*").length; nIdx < nLen; nLen[nIdx++].getAttribute("data-href").onclick = processLink);
        jQuery("[data-href]").each(function() {
            var $this = jQuery(this);
            //rmactive();
            $this.off('click.globalajaxmus').on('click.globalajaxmus', function(e) { if($this.hasClass('clicked')){ e.stopImmediatePropagation(); return;}
			 
                e.preventDefault();
               // e.stopImmediatePropagation();
				$this.addClass('clicked');
                        if (taimout !== 0) {
                            clearTimeout(taimout);
                        }

                if ($this.find('div:first').hasClass(activeclass) == false) {
                    if ($this.hasClass('mml_subcat_li')) {

                        setTimeout(function() {
                            ractive();
                            if ($this.find('div:first').attr('id'))
                                aactive(null, '#' + $this.find('div:first').attr('id'), null);
                            else aactive(null, $this.find('a[data-mymus-subcat="true"]'), null);
                        }, 100);

                    } else if ($this.data('href') === 'playlist' && $this.data('query')) {
                        recieve_id_of_playlist = (typeof $this.data('query').split('&i=')[1] !== 'undefined' ? $this.data('query').split('&i=')[1] : false);
                        if (recieve_id_of_playlist !== false) {
                            ractive();
                            aactive(null, '#' + jQuery('ul#lmPPLlst').find('div#ppl_' + recieve_id_of_playlist).attr('id'));
                        } else ractive();
                    } else
                        jQuery.socplusMusic('leftmenu', $this.data('href'));
                    processLink($this);
                } else {
                    upload_popup();
                    return false;
                }

            });
        });
    }


    /* customizable vars */
    var sViewKey = "view_as",
        sAjaxClass = 'true',
        /* not customizable constants */
        rSearch = /\?.*$/,
        rHost = /^[^\?]*\?*&*/,
        rView = new RegExp("&" + sViewKey + "\\=[^&]*|&*$", "i"),
        rEndQstMark = /\?$/,
        oLoadingBox = document.getElementById('m_lodingpr'), ///document.createElement("div"),
        oCover = document.createElement("div"),
        oLoadingImg = new Image(),
        oPageInfo = {
            title: null,
            url: location.href
        },
        oHTTPStatus = /* http://www.iana.org/assignments/http-status-codes/http-status-codes.xml */ {
            100: "Continue",
            101: "Switching Protocols",
            102: "Processing",
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-Authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            207: "Multi-Status",
            208: "Already Reported",
            226: "IM Used",
            300: "Multiple Choices",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            306: "Reserved",
            307: "Temporary Redirect",
            308: "Permanent Redirect",
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Request Entity Too Large",
            414: "Request-URI Too Long",
            415: "Unsupported Media Type",
            416: "Requested Range Not Satisfiable",
            417: "Expectation Failed",
            422: "Unprocessable Entity",
            423: "Locked",
            424: "Failed Dependency",
            425: "Unassigned",
            426: "Upgrade Required",
            427: "Unassigned",
            428: "Precondition Required",
            429: "Too Many Requests",
            430: "Unassigned",
            431: "Request Header Fields Too Large",
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported",
            506: "Variant Also Negotiates (Experimental)",
            507: "Insufficient Storage",
            508: "Loop Detected",
            509: "Unassigned",
            510: "Not Extended",
            511: "Network Authentication Required"
        };
    var oReq, bIsLoading = false,
        bUpdateURL = false;
    // oLoadingBox.id = "ajax-loader";
    oLoadingBox.style.display = 'none';
    oCover.onclick = abortReq;
    oLoadingImg.src = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
    oCover.appendChild(oLoadingImg);
    oLoadingBox.appendChild(oCover);
    ajax_update_href_links = function() {
        return init()
    };
    ajax_return_prev_page = function(a) {
        if (!a in db_navigation_ajax) return jQuery.socplusMusic('hide');
        ++troubl_prev_pages;
        return existContent(a, true)
    };
    window.addEventListener("popstate", function() {
        return hback.trigger('click');
    });
    window.onpopstate = function(oEvent) {
		
		if(mus_module_hidden) return;
		
		
		
        if (window.location.href == settings.host) {
            jQuery.socplusMusic('hide');
        }
        bUpdateURL = false;
        //   oPageInfo.title = oEvent.state.title;
        oPageInfo.url = window.location.href;
        getPage(oPageInfo.url);
    };
    // window.addEventListener ? addEventListener("load", init, false) : window.attachEvent ? attachEvent("onload", init) : (onload = init);
    jQuery([window, document]).ready(function() {
        init();
    });
    // Public methods
    this.open = requestPage;
    this.stop = abortReq;
    this.rebuildLinks = init;
})();
//run socplusMusic
jQuery(document).ready(function() {
    resizesocplusMusicLayer();

    setTimeout(function() {

        jQuery.socplusMusic();
    }, 100);
});
 