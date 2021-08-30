(function (b)
{
	b.fn.Video = function (a, b)
	{
		return new d(this, a)
	};
	var n = {
		instanceName: "player1",
		autohideControls: 3,
		hideControlsOnMouseOut: "No",
		videoPlayerWidth: 1006,
		videoPlayerHeight: 420,
		responsive: !1,
		playlist: "Right playlist",
		playlistScrollType: "light",
		playlistBehaviourOnPageload: "opened",
		autoplay: !1,
		colorAccent: "#cc181e",
		vimeoColor: "00adef",
		youtubeControls: "custom controls",
		youtubeSkin: "light",
		youtubeColor: "white",
		youtubeShowRelatedVideos: "No",
		videoPlayerShadow: "effect1",
		loadRandomVideoOnStart: "No",
		shuffle: "No",
		posterImg: "images/preview_images/poster.jpg",
		onFinish: "Play next video",
		nowPlayingText: "Yes",
		fullscreen: "Fullscreen native",
		rightClickMenu: !0,
		hideVideoSource: !1,
		showAllControls: !0,
		allowSkipAd: !0,
		infoShow: "Yes",
		shareShow: "Yes",
		facebookShow: "Yes",
		twitterShow: "Yes",
		mailShow: "Yes",
		facebookShareName: "Elite video player",
		facebookShareLink: "http://codecanyon.net/item/elite-video-player-wordpress-plugin/10496434",
		facebookShareDescription: "Elite Video Player is stunning, modern, responsive, fully customisable high-end video player for WordPress that support advertising and the most popular video platforms like YouTube, Vimeo or self-hosting videos (mp4).",
		facebookSharePicture: "https://0.s3.envato.com/files/123866118/preview.jpg",
		twitterText: "Elite video player",
		twitterLink: "http://codecanyon.net/item/elite-video-player-wordpress-plugin/10496434",
		twitterHashtags: "wordpressvideoplayer",
		twitterVia: "Creative media",
		googlePlus: "http://codecanyon.net/item/elite-video-player-wordpress-plugin/10496434",
		logoShow: "Yes",
		logoClickable: "Yes",
		logoPath: "images/logo/logo.png",
		logoGoToLink: "http://codecanyon.net/",
		logoPosition: "bottom-left",
		embedShow: "Yes",
		embedCodeSrc: "www.yourwebsite.com/videoplayer/index.html",
		embedCodeW: "746",
		embedCodeH: "420",
		embedShareLink: "www.yourwebsite.com/videoplayer/index.html",
		youtubePlaylistID: "",
		youtubeChannelID: "",
		videos: [
		{
			videoType: "HTML5",
			title: "Video title",
			youtubeID: "0dJO0HyE8xE",
			vimeoID: "119641053",
			mp4: "http://player.pageflip.com.hr/videos/Pieces.mp4",
			prerollAD: "no",
			prerollGotoLink: "http://codecanyon.net/",
			preroll_mp4: "http://player.pageflip.com.hr/videos/Short_Elegant_Logo_Reveal.mp4",
			prerollSkipTimer: 5,
			description: "Video description goes here.",
			thumbImg: "images/thumbnail_images/pic1.jpg",
			info: "Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
		},
		{
			videoType: "HTML5",
			title: "Video title",
			youtubeID: "0dJO0HyE8xE",
			vimeoID: "119641053",
			mp4: "http://player.pageflip.com.hr/videos/Pieces.mp4",
			prerollAD: "no",
			prerollGotoLink: "http://codecanyon.net/",
			preroll_mp4: "http://player.pageflip.com.hr/videos/Short_Elegant_Logo_Reveal.mp4",
			prerollSkipTimer: 5,
			description: "Video description goes here.",
			thumbImg: "images/thumbnail_images/pic1.jpg",
			info: "Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
		},
		{
			videoType: "HTML5",
			title: "Video title",
			youtubeID: "0dJO0HyE8xE",
			vimeoID: "119641053",
			mp4: "http://player.pageflip.com.hr/videos/Pieces.mp4",
			prerollAD: "no",
			prerollGotoLink: "http://codecanyon.net/",
			preroll_mp4: "http://player.pageflip.com.hr/videos/Short_Elegant_Logo_Reveal.mp4",
			prerollSkipTimer: 5,
			description: "Video description goes here.",
			thumbImg: "images/thumbnail_images/pic1.jpg",
			info: "Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
		},
		{
			videoType: "HTML5",
			title: "Video title",
			youtubeID: "0dJO0HyE8xE",
			vimeoID: "119641053",
			mp4: "http://player.pageflip.com.hr/videos/Pieces.mp4",
			prerollAD: "no",
			prerollGotoLink: "http://codecanyon.net/",
			preroll_mp4: "http://player.pageflip.com.hr/videos/Short_Elegant_Logo_Reveal.mp4",
			prerollSkipTimer: 5,
			description: "Video description goes here.",
			thumbImg: "images/thumbnail_images/pic1.jpg",
			info: "Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
		},
		{
			videoType: "HTML5",
			title: "Video title",
			youtubeID: "0dJO0HyE8xE",
			vimeoID: "119641053",
			mp4: "http://player.pageflip.com.hr/videos/Pieces.mp4",
			prerollAD: "no",
			prerollGotoLink: "http://codecanyon.net/",
			preroll_mp4: "http://player.pageflip.com.hr/videos/Short_Elegant_Logo_Reveal.mp4",
			prerollSkipTimer: 5,
			description: "Video description goes here.",
			thumbImg: "images/thumbnail_images/pic1.jpg",
			info: "Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
		},
		{
			videoType: "HTML5",
			title: "Video title",
			youtubeID: "0dJO0HyE8xE",
			vimeoID: "119641053",
			mp4: "http://player.pageflip.com.hr/videos/Pieces.mp4",
			prerollAD: "no",
			prerollGotoLink: "http://codecanyon.net/",
			preroll_mp4: "http://player.pageflip.com.hr/videos/Short_Elegant_Logo_Reveal.mp4",
			prerollSkipTimer: 5,
			description: "Video description goes here.",
			thumbImg: "images/thumbnail_images/pic1.jpg",
			info: "Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
		},
		{
			videoType: "HTML5",
			title: "Video title",
			youtubeID: "0dJO0HyE8xE",
			vimeoID: "119641053",
			mp4: "http://player.pageflip.com.hr/videos/Pieces.mp4",
			prerollAD: "no",
			prerollGotoLink: "http://codecanyon.net/",
			preroll_mp4: "http://player.pageflip.com.hr/videos/Short_Elegant_Logo_Reveal.mp4",
			prerollSkipTimer: 5,
			description: "Video description goes here.",
			thumbImg: "images/thumbnail_images/pic1.jpg",
			info: "Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
		},
		{
			videoType: "HTML5",
			title: "Video title",
			youtubeID: "0dJO0HyE8xE",
			vimeoID: "119641053",
			mp4: "http://player.pageflip.com.hr/videos/Pieces.mp4",
			prerollAD: "no",
			prerollGotoLink: "http://codecanyon.net/",
			preroll_mp4: "http://player.pageflip.com.hr/videos/Short_Elegant_Logo_Reveal.mp4",
			prerollSkipTimer: 5,
			description: "Video description goes here.",
			thumbImg: "images/thumbnail_images/pic1.jpg",
			info: "Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
		},
		{
			videoType: "HTML5",
			title: "Video title",
			youtubeID: "0dJO0HyE8xE",
			vimeoID: "119641053",
			mp4: "http://player.pageflip.com.hr/videos/Pieces.mp4",
			prerollAD: "no",
			prerollGotoLink: "http://codecanyon.net/",
			preroll_mp4: "http://player.pageflip.com.hr/videos/Short_Elegant_Logo_Reveal.mp4",
			prerollSkipTimer: 5,
			description: "Video description goes here.",
			thumbImg: "images/thumbnail_images/pic1.jpg",
			info: "Video info goes here.<br>This text can be <i>HTML formatted</i>, <a href='http://codecanyon.net/user/_zac_' target='_blank'><font color='008BFF'>find out more</font></a>.<br>You can disable this info window in player options. <br><br>Lorem ipsum dolor sit amet, eu pri dolores theophrastus. Posidonium vituperatoribus cu mel, cum feugiat nostrum sapientem ne. Vis ea summo persius, unum velit erant in eos, pri ut suas iriure euripidis. Ad augue expetendis sea. Ne usu saperet appetere honestatis, ne qui nulla debitis sententiae."
		}]
	};
	/android/gi.test(navigator.appVersion);
	/iphone|ipad/gi.test(navigator.appVersion);
	var p = /hp-tablet/gi.test(navigator.appVersion),
		h = "ontouchstart" in window && !p,
		q = "onorientationchange" in window ? "orientationchange" : "resize",
		r = h ? "touchend" : "click",
		t = h ? "touchstart" : "mousedown",
		u = h ? "touchmove" : "mousemove",
		v = h ? "touchend" : "mouseup",
		d = function (a, c)
		{
			var e = this;
			this._class = d;
			this.parent = a;
			this.parentWidth = this.parent.width();
			this.parentHeight = this.parent.height();
			this.windowWidth = b(window).width();
			this.windowHeight = b(window).height();
			this.options = b.extend(
			{}, n, c);
			this.sources = this.options.srcs || this.options.sources;
			this.state = null;
			this.embedOn = this.videoPlayingAD = this.shareOn = this.skipBoxOn = this.skipCountOn = this.adOn = this.infoOn = this.stretching = this.realFullscreenActive = this.inFullScreen = !1;
			pw = !0;
			this.loaded = !1;
			this.readyList = [];
			this.ADTriggered = this.youtubeReady = this.videoAdStarted = !1;
			this.volPerc = 1;
			this.isYoutubeAPICreated = this.YTAPIReady = this.html5STARTED = !1;
			this.ytSkin = this.options.youtubeSkin;
			this.ytColor = this.options.youtubeColor;
			this.ytSkin.toString();
			this.ytColor.toString();
			this.youtubeControls = this.options.youtubeControls;
			this.postrollPlayed = this.midrollPlayed = !1;
			switch(this.options.youtubeShowRelatedVideos)
			{
			case "Yes":
				e.ytShowRelatedVideos = 1;
				break;
			case "No":
				e.ytShowRelatedVideos = 0
			}
			this.hasTouch = h;
			this.RESIZE_EV = q;
			this.CLICK_EV = r;
			this.START_EV = t;
			this.MOVE_EV = u;
			this.END_EV = v;
			this.canPlay = !1;
			this.myVideo = document.createElement("video");
			e.deviceAgent = navigator.userAgent.toLowerCase();
			e.agentID = e.deviceAgent.match(/(iphone|ipod)/);
			var f = document.createElement("script");
			f.src = "https://www.youtube.com/iframe_api";
			var g = document.getElementsByTagName("script")[0];
			g.parentNode.insertBefore(f, g);
			this.options.rightClickMenu || (b("#Elite_video_player").bind("contextmenu", function ()
			{
				return !1
			}), b(".Elite_video_player").bind("contextmenu", function ()
			{
				return !1
			}));
			this.setupElement();
			this.setupElementAD();
			if("HTML5" == this.options.videos[0].videoType || "HTML5 (self-hosted)" == this.options.videoType || "vimeo" == c.videos[0].videoType || "Vimeo" == c.videoType) this.init();
			else if("default controls" == this.youtubeControls && ("" == this.options.posterImg, this.element.css("visibility", "hidden")), "YouTube playlist" != this.options.videoType && void 0 != this.options.videoType && (this.options.youtubePlaylistID = ""), "YouTube channel" != this.options.videoType && void 0 != this.options.videoType && (this.options.youtubeChannelID = ""), "" != this.options.youtubePlaylistID || "" != this.options.youtubeChannelID)
			{
				var f = this.options.youtubePlaylistID,
					g = this.options.youtubeChannelID,
					k;
				"" != f ? k = "https://www.googleapis.com/youtube/v3/playlistItems?&maxResults=50&part=snippet&playlistId=" + f + "&key=AIzaSyClbVoeyPLBHb9n6Abm0z-AlrzNKeWLKTc" : "" != g && (k = "https://www.googleapis.com/youtube/v3/search?order=date&maxResults=50&part=snippet&channelId=" + g + "&key=AIzaSyClbVoeyPLBHb9n6Abm0z-AlrzNKeWLKTc");
				this.id = -1;
				this.youtube_array = [];
				this.ads_array = [];
				this.data;
				b(this.options.videos).each(function ()
				{
					e.ads_array.push(
					{
						prerollAD: this.prerollAD,
						prerollGotoLink: this.prerollGotoLink,
						preroll_mp4: this.preroll_mp4,
						prerollSkipTimer: this.prerollSkipTimer,
						midrollAD: this.midrollAD,
						midrollAD_displayTime: this.midrollAD_displayTime,
						midrollGotoLink: this.midrollGotoLink,
						midroll_mp4: this.midroll_mp4,
						midrollSkipTimer: this.midrollSkipTimer,
						postrollAD: this.postrollAD,
						postrollGotoLink: this.postrollGotoLink,
						postroll_mp4: this.postroll_mp4,
						postrollSkipTimer: this.postrollSkipTimer,
						popupAdShow: this.popupAdShow,
						popupImg: this.popupImg,
						popupAdStartTime: this.popupAdStartTime,
						popupAdEndTime: this.popupAdEndTime,
						popupAdGoToLink: this.popupAdGoToLink
					})
				});
				b.ajax(
				{
					url: k,
					success: function (a)
					{
						e.data = a;
						b.each(a.items, function (a, b)
						{
							e.id += 1;
							var c = b.snippet.title,
								d = b.snippet.description,
								f = b.snippet.channelTitle;
							if("" != e.options.youtubePlaylistID) var g = b.snippet.resourceId.videoId;
							"" != e.options.youtubeChannelID && (g = b.id);
							e.youtube_array.push(
							{
								id: e.id,
								title: c,
								videoType: "youtube",
								youtubeID: g,
								vimeoID: this.vimeoID,
								video_path_mp4: this.mp4,
								prerollAD: e.ads_array[e.id].prerollAD,
								prerollGotoLink: e.ads_array[e.id].prerollGotoLink,
								preroll_mp4: e.ads_array[e.id].preroll_mp4,
								prerollSkipTimer: e.ads_array[e.id].prerollSkipTimer,
								midrollAD: e.ads_array[e.id].midrollAD,
								midrollAD_displayTime: e.ads_array[e.id].midrollAD_displayTime,
								midrollGotoLink: e.ads_array[e.id].midrollGotoLink,
								midroll_mp4: e.ads_array[e.id].midroll_mp4,
								midrollSkipTimer: e.ads_array[e.id].midrollSkipTimer,
								postrollAD: e.ads_array[e.id].postrollAD,
								postrollGotoLink: e.ads_array[e.id].postrollGotoLink,
								postroll_mp4: e.ads_array[e.id].postroll_mp4,
								postrollSkipTimer: e.ads_array[e.id].postrollSkipTimer,
								popupAdShow: e.ads_array[e.id].popupAdShow,
								popupImg: e.ads_array[e.id].popupImg,
								popupAdStartTime: e.ads_array[e.id].popupAdStartTime,
								popupAdEndTime: e.ads_array[e.id].popupAdEndTime,
								popupAdGoToLink: e.ads_array[e.id].popupAdGoToLink,
								description: f,
								thumbImg: void 0 != b.snippet.thumbnails ? b.snippet.thumbnails["default"].url : "",
								info: d
							})
						});
						e.init();
						e.waitAPIReady()
					}
				})
			}
			else this.init(), this.waitAPIReady()
		};
	d.fn = d.prototype;
	d.fn.waitAPIReady = function ()
	{
		var a = this,
			b = !1;
		if(!this.YTAPIReady)
			if("undefined" != typeof YT && "undefined" != typeof YT.Player) this.YTAPIReady = !0, this.isYoutubeAPICreated ? this.createYoutubeInstance() : this.setupYoutubeAPI();
			else var e = setInterval(function ()
			{
				console.log();
				"function" != typeof YT.Player || b || (b = !0, clearInterval(e), a.waitAPIReady())
			}, 400)
	};
	d.fn.setupYoutubeAPI = function ()
	{
		var a = this;
		this.isYoutubeAPICreated || (this.isYoutubeAPICreated = !0, this.YTAPIReady ? this.createYoutubeInstance() : window.onYouTubeIframeAPIReady || (window.onYouTubePlayerAPIReady = function ()
		{
			a.YTAPIReady = !0;
			a.createYoutubeInstance()
		}))
	};
	d.fn.createYoutubeInstance = function ()
	{
		"custom controls" == this.options.youtubeControls ? this.youtubePlayer = new YT.Player(this.options.instanceName + "youtube",
		{
			height: "100%",
			width: "100%",
			events:
			{
				onReady: this._playlist.onPlayerReady,
				onStateChange: this._playlist.onPlayerStateChange
			},
			playerVars:
			{
				rel: this.ytShowRelatedVideos,
				wmode: "transparent",
				controls: 0,
				enablejsapi: 1,
				iv_load_policy: 3,
				showinfo: 0
			}
		}) : "default controls" == this.options.youtubeControls && (this.youtubePlayer = new YT.Player(this.options.instanceName + "youtube",
		{
			height: "100%",
			width: "100%",
			events:
			{
				onReady: this._playlist.onPlayerReady,
				onStateChange: this._playlist.onPlayerStateChange
			},
			playerVars:
			{
				theme: this.ytSkin,
				color: this.ytColor,
				rel: this.ytShowRelatedVideos,
				wmode: "transparent",
				controls: 1,
				enablejsapi: 1,
				iv_load_policy: 3,
				modestbranding: 0,
				showinfo: 1,
				autohide: 1
			}
		}))
	};
	d.fn.init = function ()
	{
		this.preloader = b("<div />");
		this.preloader.addClass("elite_vp_preloader");
		this.element.append(this.preloader);
		this.preloaderAD = b("<div />");
		this.preloaderAD.addClass("elite_vp_preloader");
		this.elementAD.append(this.preloaderAD);
		this.videoElement = b("<video />");
		this.videoElement.addClass("elite_vp_videoPlayer");
		this.videoElement.attr(
		{
			width: this.options.width,
			height: this.options.height,
			autoplay: this.options.autoplay,
			preload: this.options.preload,
			controls: this.options.controls,
			autobuffer: this.options.autobuffer
		});
		this.videoElementAD = b("<video />");
		this.videoElementAD.addClass("elite_vp_videoPlayerAD");
		this.videoElementAD.attr(
		{
			width: this.options.width,
			height: this.options.height,
			autoplay: this.options.autoplay,
			preload: this.options.preload,
			controls: this.options.controls,
			autobuffer: this.options.autobuffer
		});
		this.controls = b("<div />");
		this.controls.addClass("elite_vp_controls");
		this.controls.addClass("elite_vp_bg");
		this.controls.addClass("elite_vp_disabled");
		this.element && this.element.append(this.controls);
		this.options.showAllControls || this.controls.hide();
		this.nowPlayingTitle = b("<div />").addClass("elite_vp_nowPlayingTitle elite_vp_bg");
		this.options.showAllControls || this.nowPlayingTitle.hide();
		this.element && this.element.append(this.nowPlayingTitle);
		this.setupButtonsOnScreen();
		this._playlist = new PLAYER.Playlist(b, this, this.options, this.mainContainer, this.element, this.preloader, this.preloaderAD, this.myVideo, this.canPlay, this.CLICK_EV, pw, this.hasTouch, this.deviceAgent, this.agentID, this.youtube_array);
		"Right playlist" == this.options.playlist ? (this.playerWidth = this.options.videoPlayerWidth - this._playlist.playlistW, this.playerHeight = this.options.videoPlayerHeight) : "Bottom playlist" == this.options.playlist ? (this.playerWidth = this.options.videoPlayerWidth, this.playerHeight = this.options.videoPlayerHeight - this._playlist.playlistH) : "Off" == this.options.playlist && (this.playerWidth = this.options.videoPlayerWidth, this.playerHeight = this.options.videoPlayerHeight);
		this.playlistWidth = this._playlist.playlistW;
		this.initPlayer();
		this.resize();
		this.resizeAll();
		this.autohideControls()
	};
	d.fn.initPlayer = function ()
	{
		var a = this;
		this.setupHTML5Video();
		this.setupHTML5VideoAD();
		this.setupEvents();
		this.change("initial");
		this.setupControls();
		this.load();
		this.setupAutoplay();
		this.element.bind("idle", b.proxy(this.idle, this));
		this.element.bind("state.videoPlayer", b.proxy(function ()
		{
			this.element.trigger("reset.idle")
		}, this));
		this.secondsFormat = function (a)
		{
			isNaN(a) && (a = 0);
			var b = [],
				d = Math.floor(a / 60);
			60 < d && (d %= 60);
			var g = Math.floor(a / 3600);
			a = Math.round(0 == a ? 0 : a % 60);
			0 < g && b.push(10 > g ? "0" + g : g);
			b.push(10 > d ? "0" + d : d);
			b.push(10 > a ? "0" + a : a);
			return b.join(":")
		};
		a = this;
		b(window).resize(function ()
		{
			a.inFullScreen || a.realFullscreenActive || a.resizeAll();
			a.inFullScreen && a.fullScreen(a.inFullScreen)
		});
		b(window).bind(this.RESIZE_EV, function (b)
		{
			a.inFullScreen || a.realFullscreenActive || a.resizeAll()
		});
		b(document).bind("webkitfullscreenchange mozfullscreenchange fullscreenchange", function (b)
		{
			a.resize(b)
		});
		this.resize = function (c)
		{
			document.webkitIsFullScreen || document.fullscreenElement || document.mozFullScreen ? (this._playlist.hidePlaylist(), this.element.addClass("elite_vp_fullScreen"), this.elementAD.addClass("elite_vp_fullScreen"), b(this.controls).find(".fa-elite-expand").removeClass("fa-elite-expand").addClass("fa-elite-compress"), b(this.fsEnterADBox).find(".fa-elite-expandAD").removeClass("fa-elite-expandAD").addClass("fa-elite-compressAD"), a.element.width("100%"), a.element.height("100%"), a.elementAD.width("100%"), a.elementAD.height("100%"), a.mainContainer.width("100%"), a.mainContainer.height("100%"), a.mainContainer.css("position", "fixed"), a.mainContainer.css("left", 0), a.mainContainer.css("top", 0), a.realFullscreenActive = !0, this.timeElapsed.show(), this.timeTotal.show(), this.volumeTrack.show(), this.rewindBtn.show(), this.unmuteBtn.show(), this.videoTrack.show(), this.resizeVideoTrack()) : (this._playlist.showPlaylist(), this.element.removeClass("elite_vp_fullScreen"), this.elementAD.removeClass("elite_vp_fullScreen"), b(this.controls).find(".fa-elite-compress").removeClass("fa-elite-compress").addClass("fa-elite-expand"), b(this.fsEnterADBox).find(".fa-elite-compressAD").removeClass("fa-elite-compressAD").addClass("fa-elite-expandAD"), a.element.width(a.playerWidth), a.element.height(a.playerHeight), a.elementAD.width(a.playerWidth), a.elementAD.height(a.playerHeight), a.mainContainer.css("left", ""), a.mainContainer.css("top", ""), a.options.responsive ? (a.mainContainer.width("100%"), a.mainContainer.height("100%")) : (a.mainContainer.width(a.options.videoPlayerWidth), a.mainContainer.height(a.options.videoPlayerHeight)), a.mainContainer.css("position", "absolute"), this.stretching && (this.stretching = !1, this.toggleStretch()), a.element.css(
			{
				zIndex: 455558
			}), "yes" == a._playlist.videos_array[a._playlist.videoid].prerollAD && (!a._playlist.videoAdPlayed && a.videoAdStarted ? a.elementAD.css(
			{
				zIndex: 455559
			}) : a.elementAD.css(
			{
				zIndex: 455557
			})), a.mainContainer.parent().css("zIndex", 1), a.mainContainer.css("zIndex", 999999), a.realFullscreenActive = !1, a.resizeAll());
			this.resizeVideoTrack();
			this.positionOverScreenButtons();
			this.positionLogo();
			this.positionPopup();
			this.positionPoster();
			this.resizeBars();
			"Yes" == a.options.hideControlsOnMouseOut && this.hideControls();
			this.setColorAccent(this.options.colorAccent)
		}
	};
	d.fn.setColorAccent = function (a)
	{
		b(".elite_vp_themeColor").css(
		{
			background: a
		});
		b(".elite_vp_themeColorText").css(
		{
			color: a
		});
		b(".elite_vp_playBtnBg").css(
		{
			background: a
		})
	};
	d.fn.removeColorAccent = function ()
	{
		b(".fa-elite-random").css("color", "")
	};
	d.fn.resizeAll = function ()
	{
		if(this.options.responsive)
		{
			var a = this.parent.width() / (16 / 9);
			this.parent.height(a);
			switch(this.options.playlist)
			{
			case "Right playlist":
				this.stretching ? (380 > this.parent.width() ? this.videoTrack.hide() : this.videoTrack.show(), 361 > this.parent.width() ? this.timeTotal.hide() : this.timeTotal.show(), 290 > this.parent.width() ? this.rewindBtn.hide() : this.rewindBtn.show(), 262 > this.parent.width() ? this.unmuteBtn.hide() : this.unmuteBtn.show(), this.volumeTrack.show(), "Yes" == this.options.embedShow && (560 > this.parent.width() ? this.embedBtn.hide() : this.embedBtn.show())) : (640 > this.parent.width() ? this.videoTrack.hide() : this.videoTrack.show(), 620 > this.parent.width() ? this.timeTotal.hide() : this.timeTotal.show(), 552 > this.parent.width() ? this.rewindBtn.hide() : this.rewindBtn.show(), 452 > this.parent.width() ? this.unmuteBtn.hide() : this.unmuteBtn.show(), 425 > this.parent.width() ? this.volumeTrack.hide() : this.volumeTrack.show(), "Yes" == this.options.embedShow && (590 > this.parent.width() ? this.embedBtn.hide() : this.embedBtn.show()), 522 > this.parent.width() ? (this.mainContainer.find(".elite_vp_playlistBarBtn").css(
				{
					width: "25px"
				}), this._playlist.lastBtn.hide(), this._playlist.firstBtn.hide(), this._playlist.playlist.css(
				{
					width: 90
				}), this.mainContainer.find(".elite_vp_itemRight").hide(), this.videoTrack.show(), this.timeElapsed.show(), this.timeTotal.show(), this.volumeTrack.show(), this.rewindBtn.show(), this.unmuteBtn.show(), 470 > this.parent.width() ? this.videoTrack.hide() : this.videoTrack.show(), 450 > this.parent.width() ? this.timeTotal.hide() : this.timeTotal.show(), 380 > this.parent.width() ? this.rewindBtn.hide() : this.rewindBtn.show(), 353 > this.parent.width() ? this.unmuteBtn.hide() : this.unmuteBtn.show(), 322 > this.parent.width() ? this.volumeTrack.hide() : this.volumeTrack.show()) : (this._playlist.playlist.css(
				{
					width: 260
				}), this.mainContainer.find(".elite_vp_itemRight").show(), this.mainContainer.find(".elite_vp_playlistBarBtn").css(
				{
					width: "30px"
				}), this._playlist.lastBtn.show(), this._playlist.firstBtn.show()));
				break;
			case "Bottom playlist":
				355 > this.parent.width() ? this.videoTrack.hide() : this.videoTrack.show();
				327 > this.parent.width() ? this.timeElapsed.hide() : this.timeElapsed.show();
				290 > this.parent.width() ? this.timeTotal.hide() : this.timeTotal.show();
				break;
			case "Off":
				"Yes" == this.options.embedShow && (550 > this.parent.width() ? this.embedBtn.hide() : this.embedBtn.show()), 378 > this.parent.width() ? this.videoTrack.hide() : this.videoTrack.show(), 360 > this.parent.width() ? this.timeTotal.hide() : this.timeTotal.show(), 289 > this.parent.width() ? this.rewindBtn.hide() : this.rewindBtn.show(),
					262 > this.parent.width() ? this.unmuteBtn.hide() : this.unmuteBtn.show()
			}
			this.stretching ? "Right playlist" == this.options.playlist ? (this.element.width(this.parent.parent().width()), this.element.height(this._playlist.playlist.height())) : "Bottom playlist" != this.options.playlist && "Off" == this.options.playlist && (this.element.width(this.parent.parent().width()), this.element.height(this.parent.parent().height())) : "Right playlist" == this.options.playlist ? (this.element.width(this.parent.parent().width() - this._playlist.playlist.width()), this.element.height(this._playlist.playlist.height())) : "Bottom playlist" != this.options.playlist && "Off" == this.options.playlist && (this.element.width(this.parent.parent().width()), this.element.height(this.parent.height()));
			!this.agentID || "HTML5" != this._playlist.videos_array[this._playlist.videoid].videoType && "HTML5 (self-hosted)" != this.options.videoType || (this.videoElement.width(this.element.width() - 32), this.videoElement.height(this.element.width() - 50), this.videoElementAD.width(this.element.width() - 32), this.videoElementAD.height(this.element.width() - 50));
			this._playlist.resizePlaylist();
			this.elementAD.width(this.element.width());
			this.elementAD.height(this.element.height())
		}
		else
		{
			this.newPlayerWidth = b(window).width() - this.mainContainer.position().left;
			this.newPlayerHeight = this.newPlayerWidth / (16 / 9);
			if(this.newPlayerWidth < this.options.videoPlayerWidth) switch(this.options.playlist)
			{
			case "Right playlist":
				this.stretching ? (380 > this.newPlayerWidth ? this.videoTrack.hide() : this.videoTrack.show(), 361 > this.newPlayerWidth ? this.timeTotal.hide() : this.timeTotal.show(), 290 > this.newPlayerWidth ? this.rewindBtn.hide() : this.rewindBtn.show(), 262 > this.newPlayerWidth ? this.unmuteBtn.hide() : this.unmuteBtn.show(), this.volumeTrack.show(), "Yes" == this.options.embedShow && (560 > this.newPlayerWidth ? this.embedBtn.hide() : this.embedBtn.show())) : (640 > this.newPlayerWidth ? this.videoTrack.hide() : this.videoTrack.show(), 620 > this.newPlayerWidth ? this.timeTotal.hide() : this.timeTotal.show(), "Yes" == this.options.embedShow && (655 > this.newPlayerWidth ? this.embedBtn.hide() : this.embedBtn.show()), 550 > this.newPlayerWidth ? this.rewindBtn.hide() : this.rewindBtn.show(), 525 > this.newPlayerWidth ? this.unmuteBtn.hide() : this.unmuteBtn.show(), 522 > this.newPlayerWidth ? (this.mainContainer.find(".elite_vp_playlistBarBtn").css(
				{
					width: "25px"
				}), this._playlist.lastBtn.hide(), this._playlist.firstBtn.hide(), this._playlist.playlist.css(
				{
					width: 90
				}), this.mainContainer.find(".elite_vp_itemRight").hide(), this.videoTrack.show(), this.timeElapsed.show(), this.timeTotal.show(), this.volumeTrack.show(), this.rewindBtn.show(), this.unmuteBtn.show(), 470 > this.newPlayerWidth ? this.videoTrack.hide() : this.videoTrack.show(), 450 > this.newPlayerWidth ? this.timeTotal.hide() : this.timeTotal.show(), 380 > this.newPlayerWidth ? this.rewindBtn.hide() : this.rewindBtn.show(), 353 > this.newPlayerWidth ? this.unmuteBtn.hide() : this.unmuteBtn.show(), 322 > this.newPlayerWidth ? this.volumeTrack.hide() : this.volumeTrack.show()) : (this._playlist.playlist.css(
				{
					width: 260
				}), this.mainContainer.find(".elite_vp_itemRight").show(), this.mainContainer.find(".elite_vp_playlistBarBtn").css(
				{
					width: "30px"
				}), this._playlist.lastBtn.show(), this._playlist.firstBtn.show()));
				break;
			case "Bottom playlist":
				this.newPlayerWidth -= this.mainContainer.position().left;
				"Yes" == this.options.embedShow && (550 > this.newPlayerWidth ? this.embedBtn.hide() : this.embedBtn.show());
				363 > this.newPlayerWidth ? this.videoTrack.hide() : this.videoTrack.show();
				336 > this.newPlayerWidth ? this.timeElapsed.hide() : this.timeElapsed.show();
				292 > this.newPlayerWidth && (this.newPlayerWidth = 292);
				break;
			case "Off":
				this.newPlayerWidth -= this.mainContainer.position().left, "Yes" == this.options.embedShow && (550 > this.newPlayerWidth ? this.embedBtn.hide() : this.embedBtn.show()), 378 > this.newPlayerWidth ? this.videoTrack.hide() : this.videoTrack.show(), 360 > this.newPlayerWidth ? this.timeTotal.hide() : this.timeTotal.show(), 289 > this.newPlayerWidth ? this.rewindBtn.hide() : this.rewindBtn.show(), 265 > this.newPlayerWidth && (this.newPlayerWidth = 265)
			}
			else this.newPlayerWidth = this.options.videoPlayerWidth, this.newPlayerHeight = this.options.videoPlayerHeight, this.videoTrack.show(), this.timeElapsed.show(),
				this.timeTotal.show(), this.volumeTrack.show(), this.rewindBtn.show(), this.unmuteBtn.show(), this._playlist.playlist.css(
				{
					width: 260
				}), this.mainContainer.find(".elite_vp_itemRight").show(), this.mainContainer.find(".elite_vp_playlistBarBtn").css(
				{
					width: "30px"
				}), this._playlist.lastBtn.show(), this._playlist.firstBtn.show();
			"Right playlist" == this.options.playlist ? (!this.agentID || "HTML5" != this._playlist.videos_array[this._playlist.videoid].videoType && "HTML5 (self-hosted)" != this.options.videoType || (this.videoElement.height(this.newPlayerHeight - 50), this.videoElementAD.height(this.newPlayerHeight - 50)), this.element.height(this.newPlayerHeight), this.mainContainer.css(
			{
				width: this.newPlayerWidth,
				height: this.newPlayerHeight
			})) : "Bottom playlist" == this.options.playlist ? (this.element.width(this.newPlayerWidth), this.mainContainer.css(
			{
				width: this.newPlayerWidth,
				height: this.newPlayerHeight + this._playlist.playlistH
			})) : "Off" == this.options.playlist && (this.element.width(this.newPlayerWidth), this.element.height(this.newPlayerHeight), this.mainContainer.css(
			{
				width: this.newPlayerWidth,
				height: this.newPlayerHeight
			}));
			this.stretching ? "Right playlist" == this.options.playlist ? (!this.agentID || "HTML5" != this._playlist.videos_array[this._playlist.videoid].videoType && "HTML5 (self-hosted)" != this.options.videoType || (this.videoElement.width(this.newPlayerWidth - 32), this.videoElementAD.width(this.newPlayerWidth - 32)), this.element.width(this.newPlayerWidth)) : "Bottom playlist" == this.options.playlist ? this.element.height(this.newPlayerHeight + this._playlist.playlistH) : "Off" == this.options.playlist && (!this.agentID || "HTML5" != this._playlist.videos_array[this._playlist.videoid].videoType && "HTML5 (self-hosted)" != this.options.videoType || (this.videoElement.width(this.newPlayerWidth - 32), this.videoElementAD.width(this.newPlayerWidth - 32)), this.element.width(this.newPlayerWidth)) : "Right playlist" == this.options.playlist ? (!this.agentID || "HTML5" != this._playlist.videos_array[this._playlist.videoid].videoType && "HTML5 (self-hosted)" != this.options.videoType || (this.videoElement.width(this.newPlayerWidth - this._playlist.playlist.width() - 32), this.videoElementAD.width(this.newPlayerWidth - this._playlist.playlist.width() - 32)), this.element.width(this.newPlayerWidth - this._playlist.playlist.width()), this._playlist.resizePlaylist(this.newPlayerWidth, this.newPlayerHeight)) : "Bottom playlist" == this.options.playlist ? (this.element.height(this.newPlayerHeight), this._playlist.resizePlaylist(this.newPlayerWidth, this.newPlayerHeight)) : "Off" == this.options.playlist && this.element.width(this.newPlayerWidth);
			this.elementAD.width(this.element.width());
			this.elementAD.height(this.element.height());
			!this.agentID || "HTML5" != this._playlist.videos_array[this._playlist.videoid].videoType && "HTML5 (self-hosted)" != this.options.videoType || this.playBtnScreen && this.playBtnScreen.hide();
			if(void 0 != this.youtubePlayer)
				if(this.realFullscreenActive) this.element.width(b(document).width()), this.element.height(b(document).height()), this.youtubePlayer.setSize("100%", "100%");
				else switch(this.options.playlist)
				{
				case "Right playlist":
					this.youtubePlayer.setSize("100%", "100%");
					break;
				case "Bottom playlist":
					this.youtubePlayer.setSize(this.newPlayerWidth, this.newPlayerHeight);
					break;
				case "Off":
					this.youtubePlayer.setSize("100%", "100%")
				}
		}
		this.resizeVideoTrack();
		this.positionOverScreenButtons();
		this.resizeBars();
		this.positionLogo();
		this.positionPopup();
		this.positionPoster()
	};
	d.fn.autohideControls = function ()
	{
		var a = this.element,
			b = !1,
			d = 1E3 * this.options.autohideControls,
			f = 0,
			g = function ()
			{
				b && a.trigger("idle", !1);
				b = !1;
				f = 0
			};
		a.bind("mousemove keydown DOMMouseScroll mousewheel mousedown reset.idle", g);
		var k = setInterval(function ()
		{
			f >= d ? (g(), b = !0, a.trigger("idle", !0)) : f += 1E3
		}, 1E3);
		a.unload(function ()
		{
			clearInterval(k)
		})
	};
	d.fn.resizeBars = function ()
	{
		if("youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == this.options.videoType) void 0 != this.youtubePlayer && this._playlist.youtubeSTARTED && (this.progressWidth = this.youtubePlayer.getCurrentTime() / this.youtubePlayer.getDuration() * this.videoTrack.width(), this.videoTrackProgress.css("width", this.progressWidth), this.progressIdleWidth = this.youtubePlayer.getCurrentTime() / this.youtubePlayer.getDuration() * this.progressIdleTrack.width(), this.progressIdle.css("width", this.progressIdleWidth), this.buffered = this.youtubePlayer.getVideoLoadedFraction(), this.downloadWidth = this.buffered * this.videoTrack.width(), this.videoTrackDownload.css("width", this.downloadWidth), this.progressIdleDownloadWidth = this.buffered * this.progressIdleTrack.width(), this.progressIdleDownload.css("width", this.progressIdleDownloadWidth));
		else if("HTML5" == this._playlist.videos_array[this._playlist.videoid].videoType || "HTML5 (self-hosted)" == this.options.videoType) this.downloadWidth = this.buffered / this.video.duration * this.videoTrack.width(), this.videoTrackDownload.css("width", this.downloadWidth), this.progressWidth = this.video.currentTime / this.video.duration * this.videoTrack.width(), this.videoTrackProgress.css("width", this.progressWidth), this.progressIdleDownloadWidth = this.buffered / this.video.duration * this.progressIdleTrack.width(), this.progressIdleDownload.css("width", this.progressIdleDownloadWidth), this.progressIdleWidth = this.video.currentTime / this.video.duration * this.progressIdleTrack.width(), this.progressIdle.css("width", this.progressIdleWidth), this.progressWidthAD = this.videoAD.currentTime / this.videoAD.duration * this.elementAD.width(), this.progressAD.css("width", this.progressWidthAD)
	};
	d.fn.createPopup = function ()
	{
		var a = this;
		this.adImg = b("<div/>");
		this.adImg.addClass("elite_vp_popup");
		this.image = new Image;
		this.image.src = this._playlist.videos_array[this._playlist.videoid].popupImg;
		b(this.image).load(function ()
		{
			a.adImg.append(a.image);
			a.positionPopup();
			a.adImg.append(a.adClose)
		});
		this.element.append(this.adImg);
		this.adImg.hide();
		this.adImg.css(
		{
			opacity: 0
		});
		this.popupBtnClose = b("<div />");
		this.popupBtnClose.addClass("elite_vp_btnClose elite_vp_themeColorText");
		this.infoWindow.append(this.popupBtnClose);
		this.popupBtnClose.css(
		{
			bottom: 0
		});
		this.adImg.append(this.popupBtnClose);
		this.popupBtnCloseIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("fa-elite-close").addClass("elite_vp_themeColor");
		this.popupBtnClose.append(this.popupBtnCloseIcon);
		this.popupBtnClose.bind(this.CLICK_EV, b.proxy(function ()
		{
			a.adOn = !0;
			a.togglePopup()
		}, this));
		this.popupBtnClose.mouseover(function ()
		{
			b(this).stop().animate(
			{
				opacity: .7
			}, 200)
		});
		this.popupBtnClose.mouseout(function ()
		{
			b(this).stop().animate(
			{
				opacity: 1
			}, 200)
		})
	};
	d.fn.positionPopup = function ()
	{
		this.adImg.css(
		{
			bottom: this.controls.height() + 20,
			left: this.element.width() / 2 - this.adImg.width() / 2
		})
	};
	d.fn.newAd = function ()
	{
		var a = this;
		this.adImg.hide();
		this.image.src = "";
		this.image.src = this._playlist.videos_array[this._playlist.videoid].popupImg;
		b(this.image).bind(this.START_EV, function ()
		{
			window.open(a._playlist.videos_array[a._playlist.videoid].popupAdGoToLink);
			"youtube" != a._playlist.videos_array[a._playlist.videoid].videoType && "YouTube" != a.options.videoType || a.youtubePlayer.pauseVideo();
			"HTML5" != a._playlist.videos_array[a._playlist.videoid].videoType && "HTML5 (self-hosted)" != a.options.videoType || a.pause();
			"vimeo" != a._playlist.videos_array[a._playlist.videoid].videoType && "Vimeo" != a.options.videoType || a._playlist.vimeoPlayer.api("pause")
		})
	};
	d.fn.createLogo = function ()
	{
		var a = this;
		this.logoImg = b("<div/>");
		this.logoImg.addClass("elite_vp_logo");
		this.img = new Image;
		this.img.src = a.options.logoPath;
		b(this.img).load(function ()
		{
			a.logoImg.append(a.img);
			a.positionLogo()
		});
		"Yes" == a.options.logoShow && this.element.append(this.logoImg);
		"Yes" == a.options.logoClickable && (this.logoImg.bind(this.CLICK_EV, b.proxy(function ()
		{
			window.open(a.options.logoGoToLink)
		}, this)), this.logoImg.mouseover(function ()
		{
			b(this).stop().animate(
			{
				opacity: .8
			}, 200)
		}), this.logoImg.mouseout(function ()
		{
			b(this).stop().animate(
			{
				opacity: 1
			}, 200)
		}), b(".elite_vp_logo").css("cursor", "pointer"))
	};
	d.fn.positionLogo = function ()
	{
		var a;
		if("youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == this.options.videoType) a = 70;
		else if("HTML5" == this._playlist.videos_array[this._playlist.videoid].videoType || "HTML5 (self-hosted)" == this.options.videoType) a = 70;
		else if("vimeo" == this._playlist.videos_array[this._playlist.videoid].videoType || "Vimeo" == this.options.videoType) a = 55;
		"bottom-right" == this.options.logoPosition ? this.logoImg.css(
		{
			bottom: a,
			right: buttonsMargin
		}) : "bottom-left" == this.options.logoPosition && this.logoImg.css(
		{
			bottom: a,
			left: buttonsMargin
		})
	};
	d.fn.showVideoElements = function ()
	{
		this.videoElement.show();
		this.videoElementAD.show()
	};
	d.fn.hideVideoElements = function ()
	{
		this.videoElement.hide();
		this.videoElementAD.hide()
	};
	d.fn.createAds = function ()
	{
		var a = this;
		adsImg = b("<div/>");
		adsImg.addClass("ads");
		image = new Image;
		image.src = a._playlist.videos_array[0].adsPath;
		b(image).load(function ()
		{
			adsImg.append(image);
			a.positionAds()
		});
		this.element.append(adsImg);
		adsImg.hide()
	};
	d.fn.positionAds = function ()
	{
		adsImg.css(
		{
			bottom: this.controls.height() + 5,
			left: this.element.width() / 2 - adsImg.width() / 2
		})
	};
	d.fn.setupAutoplay = function ()
	{
		this.options.autoplay ? this.play() : this.options.autoplay || (this.pause(), this.preloader.hide())
	};
	d.fn.createNowPlayingText = function ()
	{
		"Yes" == this.options.loadRandomVideoOnStart ? this.nowPlayingTitle.append('<p class="elite_vp_nowPlayingText">' + this._playlist.videos_array[this._playlist.rand].title + "</p>") : this.nowPlayingTitle.append('<p class="elite_vp_nowPlayingText">' + this._playlist.videos_array[0].title + "</p>");
		this.nowPlayingTitleW = this.nowPlayingTitle.width();
		"No" == this.options.nowPlayingText && this.nowPlayingTitle.hide()
	};
	d.fn.createInfoWindowContent = function ()
	{
		"Yes" == this.options.loadRandomVideoOnStart ? (this.infoWindow.append('<p class="elite_vp_infoTitle elite_vp_themeColorText elite_vp_titles">' + this._playlist.videos_array[this._playlist.rand].title + "</p>"), this.infoWindow.append('<p class="elite_vp_infoText">' + this._playlist.videos_array[this._playlist.rand].info_text + "</p>")) : (this.infoWindow.append('<p class="elite_vp_infoTitle elite_vp_themeColorText elite_vp_titles">' + this._playlist.videos_array[0].title + "</p>"), this.infoWindow.append('<p class="elite_vp_infoText">' + this._playlist.videos_array[0].info_text + "</p>"));
		this.infoWindow.css(
		{
			top: -this.infoWindow.height()
		}).hide()
	};
	d.fn.createSkipAd = function ()
	{
		var a = this;
		this.skipAdBox = b("<div />").addClass("elite_vp_skipAdBox").bind(a.CLICK_EV, function ()
		{
			a.closeAD()
		}).hide();
		this.elementAD.append(this.skipAdBox);
		this.skipAdBoxContentLeft = b("<div />").addClass("elite_vp_skipAdBoxContentLeft");
		this.skipAdBox.append(this.skipAdBoxContentLeft);
		this.skipAdBoxContentLeft.append('<p class="elite_vp_skipAdTitle">Skip advertisement</p>');
		this.skipAdBoxIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("fa-elite-step-forward-ad");
		this.skipAdBox.append(this.skipAdBoxIcon)
	};
	d.fn.createSkipAdCount = function ()
	{
		this.skipAdCount = b("<div />").addClass("elite_vp_skipAdCount").hide();
		this.elementAD.append(this.skipAdCount);
		this.i = document.createElement("img");
		this.i.src = this._playlist.videos_array[this._playlist.videoid].thumbnail_image;
		this.skipAdCount.append(this.i);
		b(".elite_vp_skipAdCount img").addClass("elite_vp_skipAdCountImage elite_vp_themeColorThumbBorder");
		this.skipAdCountContentLeft = b("<div />").addClass("elite_vp_skipAdCountContentLeft");
		this.skipAdCount.append(this.skipAdCountContentLeft);
		this.skipAdCountContentLeft.append('<p class="elite_vp_skipAdCountTitle"></p>');
		this.skipAdCount.css(
		{
			right: -this.skipAdCount.width(),
			bottom: 28
		}).hide()
	};
	d.fn.createAdTogglePlay = function ()
	{
		var a = this;
		this.toggleAdPlayBox = b("<div />").addClass("elite_vp_toggleAdPlayBox").attr("aria-hidden", "true").addClass("fa-elite").addClass("fa-elite-playScreen").bind(a.CLICK_EV, function ()
		{
			a.togglePlayAD();
			a.ADTriggered = !0
		}).hide();
		this.elementAD.append(this.toggleAdPlayBox)
	};
	d.fn.createVideoAdTitleInsideAD = function ()
	{
		this.videoAdBoxInside = b("<div />");
		this.videoAdBoxInside.addClass("elite_vp_videoAdBoxInside");
		this.elementAD.append(this.videoAdBoxInside);
		this.videoAdBoxInside.append('<p class="elite_vp_adsTitleInside">Advertisement</p>');
		this.videoAdBoxInside.append(this.timeLeftInside);
		this.videoAdBoxInside.hide()
	};
	d.fn.attachZeroClipboard = function ()
	{
		var a = this;
		b(this.copy).each(function ()
		{
			a.zeroClipboard = ZeroClipboard;
			a.zeroClipboard.setMoviePath("assets/ZeroClipboard.swf");
			a.clip = new ZeroClipboard.Client;
			a.clip.addEventListener("mousedown", function ()
			{
				a.clip.setText(a.embedTxt.text())
			});
			a.clip.addEventListener("complete", function (a, b)
			{
				alert("copied: " + b)
			});
			a.clip.glue(this);
			a.clip.hide()
		});
		b(this.copy2).each(function ()
		{
			a.zeroClipboard = ZeroClipboard;
			a.zeroClipboard.setMoviePath("assets/ZeroClipboard.swf");
			a.clip2 = new ZeroClipboard.Client;
			a.clip2.addEventListener("mousedown", function ()
			{
				a.clip2.setText(a.embedTxt2.text())
			});
			a.clip2.addEventListener("complete", function (a, b)
			{
				alert("copied: " + b)
			});
			a.clip2.glue(this);
			a.clip2.hide()
		})
	};
	d.fn.createEmbedWindowContent = function ()
	{
		b(this.embedWindow).append('<p class="elite_vp_embedTitle elite_vp_themeColorText elite_vp_titles">SHARE THIS PLAYER:</p>');
		b(this.embedWindow).append('<p class="elite_vp_embedTitle2 elite_vp_themeColorText elite_vp_titles">EMBED THIS VIDEO IN YOUR SITE:</p>');
		this.embedTxt = b("<p />").addClass("elite_vp_embedText");
		this.embedWindow.append(this.embedTxt);
		this.copy = b("<div />").attr("title", "Copy to clipboard").attr("id", "elite_vp_copy").addClass("copyBtn");
		this.embedWindow.append(this.copy);
		b(this.embedWindow).find("#elite_vp_copy").append('<p id="elite_vp_copyInside">Copy</p>');
		b(this.embedWindow).append('<p class="elite_vp_embedTitle3 elite_vp_themeColorText elite_vp_titles">SHARE LINK TO THIS PLAYER:</p>');
		this.embedTxt2 = b("<p />").addClass("elite_vp_embedText2");
		this.embedWindow.append(this.embedTxt2);
		this.copy2 = b("<div />").attr("title", "Copy to clipboard").attr("id", "elite_vp_copy2").addClass("copyBtn");
		this.embedWindow.append(this.copy2);
		b(this.embedWindow).find("#elite_vp_copy2").append('<p id="elite_vp_copyInside">Copy</p>');
		var a = this.options.embedCodeSrc,
			c = this.options.embedCodeW,
			d = this.options.embedCodeH;
		b(this.embedWindow).find(".elite_vp_embedText").text("<iframe src='" + a + "' width='" + c + "' height='" + d + "' frameborder=0 webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>");
		b(this.embedWindow).find(".elite_vp_embedText2").text("" + this.options.embedShareLink + "")
	};
	d.fn.ready = function (a)
	{
		this.readyList.push(a);
		this.loaded && a.call(this)
	};
	d.fn.load = function (a, c)
	{
		var d = this;
		a && (this.sources = a);
		"string" == typeof this.sources && (this.sources = {
			src: this.sources
		});
		b.isArray(this.sources) || (this.sources = [this.sources]);
		this.ready(function ()
		{
			this.change("loading");
			"HTML5" != d._playlist.videos_array[this._playlist.videoid].videoType && "HTML5 (self-hosted)" != d.options.videoType || this.video.loadSources(this.sources)
		})
	};
	d.fn.closeAD = function ()
	{
		clearInterval(this.myInterval);
		this.videoPlayingAD = !0;
		this.togglePlayAD();
		this._playlist.videoAdPlayed = !0;
		this.resetPlayerAD();
		this.elementAD.width(0);
		this.elementAD.height(0);
		this.elementAD.css(
		{
			zIndex: 1
		});
		this.videoElementAD.empty();
		this.videoAdBoxInside.hide();
		this.removeListenerProgressAD();
		this.options.allowSkipAd && (this.skipAdBox.hide(), this.skipAdCount.hide());
		this.fsEnterADBox.hide();
		this.toggleAdPlayBox.hide();
		this.progressADBg.hide();
		if("youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == this.options.videoType) this.ytWrapper.css(
		{
			visibility: "visible"
		}), this.hideVideoElements(), void 0 != this.youtubePlayer && this.youtubePlayer.playVideo();
		else if("HTML5" == this._playlist.videos_array[this._playlist.videoid].videoType || "HTML5 (self-hosted)" == this.options.videoType) this.showVideoElements(), this.togglePlay(), this.video.play();
		else if("vimeo" == this._playlist.videos_array[this._playlist.videoid].videoType || "Vimeo" == this.options.videoType) this.hideVideoElements(), void 0 != this._playlist.vimeoPlayer ? this._playlist.vimeoPlayer.api("play") : this._playlist.playVimeo(this._playlist.videoid);
		this.exitToOriginalSize()
	};
	d.fn.openAD = function ()
	{
		this.showVideoElements();
		this.progressADBg.show();
		this.elementAD.css(
		{
			zIndex: 555559
		});
		this.ytWrapper.css(
		{
			visibility: "hidden"
		});
		this.videoAdBoxInside.show();
		this.options.allowSkipAd && (this.skipBoxOn = !0, this.toggleSkipAdBox(), this.skipCountOn = !1, this.toggleSkipAdCount());
		this.fsEnterADBox.show();
		this.realFullscreenActive || this.resizeAll();
		this.hasTouch ? this.ADTriggered || (this.toggleAdPlayBox.show(), this.videoPlayingAD = !0, this.togglePlayAD()) : this.toggleAdPlayBox.hide();
		this.options.allowSkipAd && (this.setSkipTimer(), b(".elite_vp_skipAdCountTitle").text("You can skip this ad in " + this.counter + " s"), this.i.src = this._playlist.videos_array[this._playlist.videoid].thumbnail_image)
	};
	d.fn.loadAD = function (a)
	{
		this.preloaderAD.stop().animate(
		{
			opacity: 1
		}, 0, function ()
		{
			b(this).show()
		});
		a && (this.sourcesAD = a);
		"string" == typeof this.sourcesAD && (this.sourcesAD = {
			src: this.sourcesAD
		});
		b.isArray(this.sourcesAD) || (this.sourcesAD = [this.sourcesAD]);
		this.ready(function ()
		{
			this.change("loading");
			this.videoAD.loadSources(this.sourcesAD)
		})
	};
	d.fn.exitToOriginalSize = function ()
	{
		THREEx.FullScreen.available() ? THREEx.FullScreen.activated() ? THREEx.FullScreen.cancel() : this.inFullScreen && this.fullScreen(!this.inFullScreen) : THREEx.FullScreen.available();
		this.elementAD.css(
		{
			zIndex: 455555
		})
	};
	d.fn.play = function ()
	{
		this.playButtonScreen.hide();
		this.playBtn.removeClass("fa-elite-play").addClass("fa-elite-pause");
		"HTML5" == this._playlist.videos_array[this._playlist.videoid].videoType || "HTML5 (self-hosted)" == this.options.videoType ? this.video.play() : "youtube" != this._playlist.videos_array[this._playlist.videoid].videoType && "YouTube" != this.options.videoType || this.video.pause();
		"yes" == this._playlist.videos_array[this._playlist.videoid].prerollAD && 0 == this.videoAdStarted && (this.video.pause(), !this.videoAdStarted && this._playlist.videos_array[this._playlist.videoid].prerollAD && (this.myVideo.canPlayType && this.myVideo.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, this.video_pathAD = this._playlist.videos_array[this._playlist.videoid].preroll_mp4), this.loadAD(this.video_pathAD), this.openAD()), this.videoAdStarted = !0)
	};
	d.fn.pause = function ()
	{
		if("HTML5" == this._playlist.videos_array[this._playlist.videoid].videoType || "HTML5 (self-hosted)" == this.options.videoType) this.html5STARTED || "" == this.options.posterImg ? this.playButtonScreen.show() : this.playButtonScreen.hide();
		else if("youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == this.options.videoType) this._playlist.youtubeSTARTED || "" == this.options.posterImg ? this.playButtonScreen.show() : this.playButtonScreen.hide();
		this.playBtn.removeClass("fa-elite-pause").addClass("fa-elite-play");
		this.video.pause()
	};
	d.fn.stop = function ()
	{
		this.seek(0);
		this.pause()
	};
	d.fn.hideOverlay = function ()
	{
		if(void 0 != this.overlay)
			if(this.overlay.hide(), this.playButtonPoster.hide(), "youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == this.options.videoType) this.youtubePlayer.playVideo(), "default controls" == this.options.youtubeControls && this.element.css("visibility", "hidden");
			else if("HTML5" == this._playlist.videos_array[this._playlist.videoid].videoType || "HTML5 (self-hosted)" == this.options.videoType) this.togglePlay();
		else if("vimeo" == this._playlist.videos_array[this._playlist.videoid].videoType || "Vimeo" == this.options.videoType) void 0 != this._playlist.vimeoPlayer ? this._playlist.vimeoPlayer.api("play") : this._playlist.playVimeo(this._playlist.videoid)
	};
	d.fn.togglePlay = function ()
	{
		"elite_vp_playing" == this.state ? (this.pause(), "youtube" != this._playlist.videos_array[this._playlist.videoid].videoType && "YouTube" != this.options.videoType || this.youtubePlayer.pauseVideo()) : (this.play(), "youtube" != this._playlist.videos_array[this._playlist.videoid].videoType && "YouTube" != this.options.videoType || this.youtubePlayer.playVideo())
	};
	d.fn.toggleSkipAdBox = function ()
	{
		this.skipBoxOn ? (this.skipAdBox.stop().animate(
		{
			right: -(this.skipAdBox.width() - 2),
			bottom: 28
		}, 200, function ()
		{
			b(this).hide()
		}), this.skipBoxOn = !1) : (this.skipAdBox.show(), this.addListenerProgressAD(), this.skipAdBox.stop().animate(
		{
			right: 10,
			bottom: 28
		}, 500), this.skipBoxOn = !0)
	};
	d.fn.toggleSkipAdCount = function ()
	{
		this.skipCountOn ? (this.skipAdCount.stop().animate(
		{
			right: -(this.skipAdCount.width() - 2),
			bottom: 28
		}, 200, function ()
		{
			b(this).hide()
		}), this.skipCountOn = !1) : (this.skipAdCount.show(), this.skipAdCount.stop().animate(
		{
			right: 10,
			bottom: 28
		}, 500), this.skipCountOn = !0)
	};
	d.fn.toggleInfoWindow = function ()
	{
		this.infoOn ? (this.infoWindow.stop().animate(
		{
			top: -this.infoWindow.height()
		}, 200, function ()
		{
			b(this).hide()
		}), this.nowPlayingTitle.show(), this.infoOn = !1) : (this.infoWindow.show(), this.infoWindow.stop().animate(
		{
			top: 0
		}, 500), this.nowPlayingTitle.hide(), this.infoOn = !0)
	};
	d.fn.togglePopup = function ()
	{
		this.adOn ? (this.adImg.animate(
		{
			opacity: 0
		}, 0, function ()
		{
			b(this).hide()
		}), this.adOn = !1) : this.adOn || (this.adImg.show(), this.adImg.animate(
		{
			opacity: 1
		}, 500), this.adOn = !0)
	};
	d.fn.toggleShuffleBtn = function ()
	{
		this.shuffleBtnEnabled ? (this.removeColorAccent(), this.shuffleBtnEnabled = !1) : (b(this.mainContainer).find(".fa-elite-random").addClass("elite_vp_themeColorText"), this.shuffleBtnEnabled = !0, this.setColorAccent(this.options.colorAccent))
	};
	d.fn.toggleShareWindow = function ()
	{
		this.shareOn ? (this.shareOn = !1, b(this.shareWindow).stop().animate(
		{
			right: -this.shareWindow.width()
		}, 300, function ()
		{
			b(this).hide()
		})) : (this.shareWindow.show(), b(this.shareWindow).stop().animate(
		{
			right: this.screenBtnsWindow.width()
		}, 300), this.shareOn = !0)
	};
	d.fn.togglePlayAD = function ()
	{
		this.videoPlayingAD ? (this.videoAD.pause(), this.videoPlayingAD = !1, this.toggleAdPlayBox.show()) : (this.videoAD.play(), this.videoPlayingAD = !0, this.toggleAdPlayBox.hide())
	};
	d.fn.toggleEmbedWindow = function ()
	{
		var a = this;
		this.embedOn ? (b(this.embedWindow).stop().animate(
		{
			top: -this.embedWindow.height()
		}, 200, function ()
		{
			b(this).hide();
			a.clip.hide();
			a.clip2.hide();
			a.clip.destroy();
			a.clip2.destroy()
		}), this.embedOn = !1) : (b(this.embedWindow).show(), b(this.embedWindow).stop().animate(
		{
			top: 0
		}, 500, function ()
		{
			a.attachZeroClipboard();
			a.clip.show();
			a.clip2.show()
		}), this.embedOn = !0)
	};
	d.fn.fullScreen = function (a)
	{
		a ? (this.element.addClass("elite_vp_fullScreen"), this.elementAD.addClass("elite_vp_fullScreen"), b(this.controls).find(".fa-elite-expand").removeClass("fa-elite-expand").addClass("fa-elite-compress"), b(this.fsEnterADBox).find(".fa-elite-expandAD").removeClass("fa-elite-expandAD").addClass("fa-elite-compressAD"), this._playlist.hidePlaylist(), this.element.width(window.innerWidth), this.element.height(window.innerHeight), this.elementAD.width(window.innerWidth), this.elementAD.height(window.innerHeight), this.mainContainer.width(window.innerWidth), this.mainContainer.height(window.innerHeight), this.mainContainer.css("position", "fixed"), this.mainContainer.css("left", 0), this.mainContainer.css("top", 0), this.mainContainer.parent().css("zIndex", 999999), "HTML5" != this._playlist.videos_array[this._playlist.videoid].videoType && "HTML5 (self-hosted)" != this.options.videoType || this.element.css(
		{
			zIndex: 555558
		}), "youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == this.options.videoType ? this.element.css(
		{
			zIndex: 555558
		}) : "vimeo" != this._playlist.videos_array[this._playlist.videoid].videoType && "Vimeo" != this.options.videoType || this.element.css(
		{
			zIndex: 555556
		}), "yes" == this._playlist.videos_array[this._playlist.videoid].prerollAD && (this._playlist.videoAdPlayed ? this.elementAD.css(
		{
			zIndex: 555557
		}) : this.elementAD.css(
		{
			zIndex: 555559
		}))) : (this._playlist.showPlaylist(), this.element.removeClass("elite_vp_fullScreen"), this.mainContainer.css("position", "absolute"), this.mainContainer.parent().css("zIndex", 1), this.elementAD.removeClass("elite_vp_fullScreen"), b(this.controls).find(".fa-elite-compress").removeClass("fa-elite-compress").addClass("fa-elite-expand"), b(this.fsEnterADBox).find(".fa-elite-compressAD").removeClass("fa-elite-compressAD").addClass("fa-elite-expandAD"), this.stretching && (this.stretching = !1, this.toggleStretch()), "HTML5" == this._playlist.videos_array[this._playlist.videoid].videoType || "HTML5 (self-hosted)" == this.options.videoType ? this.element.css(
		{
			zIndex: 455558
		}) : this.element.css(
		{
			zIndex: 455556
		}), "yes" == this._playlist.videos_array[this._playlist.videoid].prerollAD && (this._playlist.videoAdPlayed ? this.elementAD.css(
		{
			zIndex: 455557
		}) : this.elementAD.css(
		{
			zIndex: 455559
		})), this.options.responsive ? (this.mainContainer.width("100%"), this.mainContainer.height("100%")) : (this.mainContainer.width(this.options.videoPlayerWidth), this.mainContainer.height(this.options.videoPlayerHeight)), this.mainContainer.css("left", ""), this.mainContainer.css("top", ""), this.resizeAll());
		this.resizeVideoTrack();
		this.positionOverScreenButtons(a);
		this.positionLogo();
		this.positionPopup();
		this.positionPoster();
		this.resizeBars();
		"undefined" == typeof a && (a = !0);
		this.inFullScreen = a
	};
	d.fn.toggleFullScreen = function ()
	{
		if(THREEx.FullScreen.available())
			if(THREEx.FullScreen.activated()) "Fullscreen native" == this.options.fullscreen && THREEx.FullScreen.cancel(), "Fullscreen browser" == this.options.fullscreen && this.fullScreen(!this.inFullScreen), "HTML5" == this._playlist.videos_array[this._playlist.videoid].videoType || "HTML5 (self-hosted)" == this.options.videoType ? this.element.css(
			{
				zIndex: 455558
			}) : this.element.css(
			{
				zIndex: 455556
			}), "yes" == this._playlist.videos_array[this._playlist.videoid].prerollAD && (this._playlist.videoAdPlayed ? this.elementAD.css(
			{
				zIndex: 455557
			}) : this.elementAD.css(
			{
				zIndex: 455559
			})), this.mainContainer.css("zIndex", 999999);
			else
			{
				if("Fullscreen native" == this.options.fullscreen && (THREEx.FullScreen.request(), this.mainContainer.parent().css("zIndex", 999999), this.mainContainer.css("zIndex", 2147483647), "HTML5" != this._playlist.videos_array[this._playlist.videoid].videoType && "HTML5 (self-hosted)" != this.options.videoType || this.element.css(
					{
						zIndex: 555558
					}), "youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == this.options.videoType ? this.element.css(
					{
						zIndex: 555558
					}) : "vimeo" != this._playlist.videos_array[this._playlist.videoid].videoType && "Vimeo" != this.options.videoType || this.element.css(
					{
						zIndex: 555556
					}), "yes" == this._playlist.videos_array[this._playlist.videoid].prerollAD))
				{
					if(!this.videoAdStarted) return;
					this._playlist.videoAdPlayed ? this.elementAD.css(
					{
						zIndex: 555557
					}) : this.elementAD.css(
					{
						zIndex: 555559
					})
				}
				"Fullscreen browser" == this.options.fullscreen && this.fullScreen(!this.inFullScreen)
			}
		else THREEx.FullScreen.available() || this.fullScreen(!this.inFullScreen)
	};
	d.fn.seek = function (a)
	{
		this.video.setCurrentTime(a)
	};
	d.fn.setVolume = function (a)
	{
		this.video.setVolume(a)
	};
	d.fn.getVolume = function ()
	{
		return this.video.getVolume()
	};
	d.fn.mute = function (a)
	{
		"undefined" == typeof a && (a = !0);
		this.setVolume(a ? 1 : 0)
	};
	d.fn.remove = function ()
	{
		this.element.remove()
	};
	d.fn.bind = function ()
	{
		this.videoElement.bind.apply(this.videoElement, arguments)
	};
	d.fn.one = function ()
	{
		this.videoElement.one.apply(this.videoElement, arguments)
	};
	d.fn.trigger = function ()
	{
		this.videoElement.trigger.apply(this.videoElement, arguments)
	};
	for(var m = "click dblclick onerror onloadeddata oncanplay ondurationchange ontimeupdate onprogress onpause onplay onended onvolumechange".split(" "), l = 0; l < m.length; l++)(function ()
	{
		var a = m[l],
			c = a.replace(/^(on)/, "");
		d.fn[a] = function ()
		{
			var a = b.makeArray(arguments);
			a.unshift(c);
			this.bind.apply(this, a)
		}
	})();
	d.fn.triggerReady = function ()
	{
		for(var a in this.readyList) this.readyList[a].call(this);
		this.loaded = !0
	};
	d.fn.setupElement = function ()
	{
		this.mainContainer = b("<div />");
		this.mainContainer.addClass("elite_vp_mainContainer");
		this.options.responsive ? this.mainContainer.css(
		{
			width: "100%",
			height: "100%",
			position: "absolute",
			background: "#000000",
			zIndex: 999999
		}) : this.mainContainer.css(
		{
			width: this.options.videoPlayerWidth,
			height: this.options.videoPlayerHeight,
			position: "absolute",
			background: "#000000",
			zIndex: 999999
		});
		switch(this.options.videoPlayerShadow)
		{
		case "effect1":
			this.mainContainer.addClass("elite_vp_effect1");
			break;
		case "effect2":
			this.mainContainer.addClass("elite_vp_effect2");
			break;
		case "effect3":
			this.mainContainer.addClass("elite_vp_effect3");
			break;
		case "effect4":
			this.mainContainer.addClass("elite_vp_effect4");
			break;
		case "effect5":
			this.mainContainer.addClass("elite_vp_effect5");
			break;
		case "effect6":
			this.mainContainer.addClass("elite_vp_effect6")
		}
		this.parent.append(this.mainContainer);
		this.element = b("<div />");
		this.element.addClass("elite_vp_videoPlayer");
		this.mainContainer.append(this.element);
		this.ytWrapper = b("<div></div>");
		this.ytWrapper.addClass("elite_vp_ytWrapper");
		this.element.append(this.ytWrapper);
		this.ytPlayer = b("<div></div>");
		this.ytPlayer.attr("id", this.options.instanceName + "youtube");
		this.ytWrapper.append(this.ytPlayer);
		this.imageWrapper = b("<div></div>");
		this.imageWrapper.addClass("elite_vp_imageWrapper");
		this.element.append(this.imageWrapper);
		this.imageDisplayed = document.createElement("img");
		this.imageWrapper.append(this.imageDisplayed);
		b(".elite_vp_imageWrapper img").attr("id", "elite_vp_imageDisplayed")
	};
	d.fn.setupElementAD = function ()
	{
		this.elementAD = b("<div />");
		this.elementAD.addClass("elite_vp_videoPlayerAD");
		this.mainContainer.append(this.elementAD)
	};
	d.fn.idle = function (a, c)
	{
		var d = this;
		c ? "elite_vp_playing" == this.state && (this.options.showAllControls || this.controls.hide(), this.controls.stop().animate(
		{
			bottom: -50
		}, 300), d.progressIdleTrack.stop().delay(800).animate(
		{
			bottom: 0
		}, 300), this.screenBtnsWindow.stop().animate(
		{
			right: -44
		}, 300), this.logoImg.stop().animate(
		{
			opacity: 0
		}, 300), d.nowPlayingTitle.stop().animate(
		{
			left: -d.nowPlayingTitleW
		}, 300), d.shareOn = !0, d.toggleShareWindow(), b(d.toolTip).stop().animate(
		{
			opacity: 0
		}, 50, function ()
		{
			d.toolTip.hide()
		}), d.invisibleWrapper.show()) : (this.progressIdleTrack.stop().animate(
		{
			bottom: -6
		}, 100, function ()
		{
			d.options.showAllControls || d.controls.hide();
			d.controls.stop().animate(
			{
				bottom: 0
			}, 300)
		}), this.screenBtnsWindow.stop().animate(
		{
			right: 0
		}, 400), this.logoImg.stop().animate(
		{
			opacity: 1
		}, 400), d.nowPlayingTitle.stop().animate(
		{
			left: 0
		}, 400), d.invisibleWrapper.hide())
	};
	d.fn.change = function (a)
	{
		this.state = a;
		this.element && (this.element.attr("data-state", this.state), this.element.trigger("state.videoPlayer", this.state))
	};
	d.fn.setupHTML5Video = function ()
	{
		this.element && this.element.append(this.videoElement);
		this.video = this.videoElement[0];
		this.element && (this.element.width(this.playerWidth), this.element.height(this.playerHeight));
		var a = this;
		this.video.loadSources = function (c)
		{
			a.videoElement.empty();
			for(var d in c)
			{
				var f = b("<source />");
				f.attr(c[d]);
				a.videoElement.append(f)
			}
			a.video.load()
		};
		this.video.getStartTime = function ()
		{
			return this.startTime || 0
		};
		this.video.getEndTime = function ()
		{
			return Infinity == this.duration && this.buffered ? this.buffered.end(this.buffered.length - 1) : (this.startTime || 0) + this.duration
		};
		this.video.getCurrentTime = function ()
		{
			try
			{
				return this.currentTime
			}
			catch(a)
			{
				return 0
			}
		};
		a = this;
		this.video.setCurrentTime = function (a)
		{
			this.currentTime = a
		};
		this.video.getVolume = function ()
		{
			return this.volume
		};
		this.video.setVolume = function (a)
		{
			this.volume = a
		};
		this.videoElement.dblclick(b.proxy(function ()
		{
			this.toggleFullScreen()
		}, this));
		this.videoElement.bind(this.CLICK_EV, b.proxy(function ()
		{
			this.togglePlay()
		}, this));
		this.triggerReady()
	};
	d.fn.setupHTML5VideoAD = function ()
	{
		this.elementAD && this.elementAD.append(this.videoElementAD);
		this.videoAD = this.videoElementAD[0];
		this.elementAD && (this.elementAD.width(0), this.elementAD.height(0));
		var a = this;
		this.videoAD.loadSources = function (c)
		{
			a.videoElementAD.empty();
			for(var d in c)
			{
				var f = b("<source />");
				f.attr(c[d]);
				a.videoElementAD.append(f)
			}
			a.videoAD.load();
			a.videoPlayingAD = this.hasTouch ? !0 : !1;
			a.togglePlayAD()
		};
		this.videoAD.getStartTime = function ()
		{
			return this.startTime || 0
		};
		this.videoAD.getEndTime = function ()
		{
			if(!isNaN(this.duration)) return Infinity == this.duration && this.buffered ? this.buffered.end(this.buffered.length - 1) : (this.startTime || 0) + this.duration
		};
		this.videoAD.getCurrentTime = function ()
		{
			try
			{
				return this.currentTime
			}
			catch(a)
			{
				return 0
			}
		};
		this.videoAD.setCurrentTime = function (a)
		{
			this.currentTime = a
		};
		this.videoAD.getVolume = function ()
		{
			return this.volume
		};
		this.videoAD.setVolume = function (a)
		{
			this.volume = a
		};
		this.videoElementAD.dblclick(b.proxy(function ()
		{
			this.toggleFullScreen()
		}, this));
		this.triggerReady();
		this.videoElementAD.bind(this.CLICK_EV, b.proxy(function ()
		{
			"" != this._playlist.videos_array[this._playlist.videoid].prerollGotoLink && "prerollGotoLink" != this._playlist.videos_array[this._playlist.videoid].prerollGotoLink && (window.open(this._playlist.videos_array[this._playlist.videoid].prerollGotoLink), this.videoPlayingAD = !0, this.togglePlayAD());
			"" != this._playlist.videos_array[this._playlist.videoid].midrollGotoLink && "midrollGotoLink" != this._playlist.videos_array[this._playlist.videoid].midrollGotoLink && (window.open(this._playlist.videos_array[this._playlist.videoid].midrollGotoLink), this.videoPlayingAD = !0, this.togglePlayAD());
			"" != this._playlist.videos_array[this._playlist.videoid].postrollGotoLink && "postrollGotoLink" != this._playlist.videos_array[this._playlist.videoid].postrollGotoLink && (window.open(this._playlist.videos_array[this._playlist.videoid].postrollGotoLink), this.videoPlayingAD = !0, this.togglePlayAD())
		}, this))
	};
	d.fn.setupButtonsOnScreen = function ()
	{
		var a = this;
		this.screenBtnsWindow = b("<div></div>");
		this.screenBtnsWindow.addClass("elite_vp_screenBtnsWindow");
		this.element && this.element.append(this.screenBtnsWindow);
		this.options.showAllControls || this.screenBtnsWindow.hide();
		this.playlistBtn = b("<div />").addClass("elite_vp_playlistBtn").addClass("elite_vp_playerElement").addClass("elite_vp_btnOverScreen").addClass("elite_vp_bg");
		this.element && this.screenBtnsWindow.append(this.playlistBtn);
		this.playlistBtnIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-overScreen").addClass("fa-elite-indent");
		this.playlistBtn.append(this.playlistBtnIcon);
		this.shareBtn = b("<div />").addClass("elite_vp_shareBtn").addClass("elite_vp_playerElement").addClass("elite_vp_btnOverScreen").addClass("elite_vp_bg");
		this.element && this.screenBtnsWindow.append(this.shareBtn);
		this.shareBtnIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-overScreen").addClass("fa-elite-share-square-o");
		this.shareBtn.append(this.shareBtnIcon);
		this.embedBtn = b("<div />").addClass("elite_vp_embedBtn").addClass("elite_vp_playerElement").addClass("elite_vp_btnOverScreen").addClass("elite_vp_bg");
		this.element && this.screenBtnsWindow.append(this.embedBtn);
		this.embedBtnIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-overScreen").addClass("fa-elite-chain");
		this.embedBtn.append(this.embedBtnIcon);
		this.infoBtn = b("<div />").addClass("elite_vp_infoBtn").addClass("elite_vp_playerElement").addClass("elite_vp_btnOverScreen").addClass("elite_vp_bg");
		this.element && this.screenBtnsWindow.append(this.infoBtn);
		this.infoBtnIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-overScreen").addClass("fa-elite-info");
		this.infoBtn.append(this.infoBtnIcon);
		this.shareWindow = b("<div></div>");
		this.shareWindow.addClass("elite_vp_shareWindow");
		this.element && this.element.append(this.shareWindow);
		this.shareBtn.bind(this.CLICK_EV, b.proxy(function ()
		{
			this.toggleShareWindow()
		}, this));
		this.facebookBtn = b("<div />").addClass("elite_vp_facebookBtn").addClass("elite_vp_playerElement").addClass("elite_vp_socialBtn").addClass("elite_vp_bg");
		this.element && this.shareWindow.append(this.facebookBtn);
		this.facebookBtnIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-overScreen").addClass("fa-elite-facebook");
		this.facebookBtn.append(this.facebookBtnIcon);
		this.twitterBtn = b("<div />").addClass("elite_vp_twitterBtn").addClass("elite_vp_playerElement").addClass("elite_vp_socialBtn").addClass("elite_vp_bg");
		this.element && this.shareWindow.append(this.twitterBtn);
		this.twitterBtnIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-overScreen").addClass("fa-elite-twitter");
		this.twitterBtn.append(this.twitterBtnIcon);
		this.mailBtn = b("<div />").addClass("elite_vp_mailBtn").addClass("elite_vp_playerElement").addClass("elite_vp_socialBtn").addClass("elite_vp_bg");
		this.element && this.shareWindow.append(this.mailBtn);
		this.mailBtnIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-overScreen").addClass("fa-elite-google-plus");
		this.mailBtn.append(this.mailBtnIcon);
		this.shareWindow.css(
		{
			right: -this.shareWindow.width(),
			top: a.shareBtn.position().top + 5
		}).hide();
		this.facebookBtn.bind(this.CLICK_EV, b.proxy(function ()
		{
			a.pause();
			a.YTAPIReady && a.youtubePlayer.pauseVideo();
			var c = b(window).width() / 2 - 300,
				d = b(window).height() / 2 - 200,
				c = window.open("https://www.facebook.com/dialog/feed?app_id=787376644686729&display=popup&name=" + a.options.facebookShareName + "&link=" + a.options.facebookShareLink + "&redirect_uri=https://facebook.com&description=" + a.options.facebookShareDescription + "&picture=" + a.options.facebookSharePicture, "popup", "width=600, height=400, top=" + d + ", left=" + c);
			window.focus && c.focus()
		}, this));
		this.twitterBtn.bind(this.CLICK_EV, b.proxy(function ()
		{
			a.pause();
			a.YTAPIReady && a.youtubePlayer.pauseVideo();
			var c = b(window).width() / 2 - 300,
				d = b(window).height() / 2 - 200,
				c = window.open("https://twitter.com/intent/tweet?text=" + a.options.twitterText + "&url=" + a.options.twitterLink + "&hashtags=" + a.options.twitterHashtags + "&via=" + a.options.twitterVia, "popup", "width=600, height=400, top=" + d + ", left=" + c);
			window.focus && c.focus()
		}, this));
		this.mailBtn.bind(this.CLICK_EV, b.proxy(function ()
		{
			a.pause();
			a.YTAPIReady && a.youtubePlayer.pauseVideo();
			var c = b(window).width() / 2 - 300,
				d = b(window).height() / 2 - 200,
				c = window.open("https://plus.google.com/share?url=" + a.options.googlePlus, "popup", "width=600, height=400, top=" + d + ", left=" + c);
			window.focus && c.focus()
		}, this));
		b(".elite_vp_shareBtn, .elite_vp_embedBtn, .elite_vp_playlistBtn, .elite_vp_infoBtn, .elite_vp_infoBtn, .elite_vp_facebookBtn, .elite_vp_twitterBtn, .elite_vp_mailBtn").mouseover(function ()
		{
			b(this).find(".elite-icon-overScreen").removeClass("elite-icon-overScreen").addClass("elite-icon-overScreen-hover")
		});
		b(".elite_vp_shareBtn, .elite_vp_embedBtn, .elite_vp_playlistBtn, .elite_vp_infoBtn, .elite_vp_infoBtn, .elite_vp_facebookBtn, .elite_vp_twitterBtn, .elite_vp_mailBtn").mouseout(function ()
		{
			b(this).find(".elite-icon-overScreen-hover").removeClass("elite-icon-overScreen-hover").addClass("elite-icon-overScreen")
		});
		b(".elite_vp_btnOverScreen").mouseover(function ()
		{
			b(this).css("background", a.options.colorAccent)
		});
		b(".elite_vp_btnOverScreen").mouseout(function ()
		{
			b(this).css("background", "")
		});
		"No" == a.options.shareShow && this.shareBtn.hide();
		"No" == a.options.embedShow && this.embedBtn.hide();
		"No" == a.options.infoShow && this.infoBtn.hide();
		"No" == a.options.facebookShow && this.facebookBtn.hide();
		"No" == a.options.twitterShow && this.twitterBtn.hide();
		"No" == a.options.mailShow && this.mailBtn.hide();
		buttonsMargin = 5;
		this.positionOverScreenButtons();
		this.playlistBtn.bind(this.CLICK_EV, function ()
		{
			a.toggleStretch();
			a.resizeAll()
		})
	};
	d.fn.toggleStretch = function ()
	{
		this.stretching ? (this.shrinkPlayer(), this.stretching = !1, this.playlistBtnIcon.removeClass("fa-elite-dedent").addClass("fa-elite-indent")) : (this.stretchPlayer(), this.stretching = !0, this.playlistBtnIcon.removeClass("fa-elite-indent").addClass("fa-elite-dedent"));
		this.resizeVideoTrack();
		this.positionOverScreenButtons();
		this.positionLogo();
		this.positionPopup();
		this.resizeBars();
		this.resizeAll()
	};
	d.fn.stretchPlayer = function ()
	{
		this.element.width(this.options.videoPlayerWidth)
	};
	d.fn.shrinkPlayer = function ()
	{
		this.element.width(this.playerWidth)
	};
	d.fn.positionOverScreenButtons = function (a)
	{
		this.element && (document.webkitIsFullScreen || document.fullscreenElement || document.mozFullScreen || a ? this.playlistBtn.hide() : "Right playlist" == this.options.playlist || "Bottom playlist" == this.options.playlist ? this.playlistBtn.show() : this.playlistBtn.hide())
	};
	d.fn.hideControls = function ()
	{
		var a = this;
		b(this.element).hover(function ()
		{
			a.options.showAllControls || a.controls.hide();
			a.controls.stop().animate(
			{
				bottom: 0
			}, 300);
			a.progressIdleTrack.stop().animate(
			{
				bottom: -6
			}, 100);
			a.screenBtnsWindow.stop().animate(
			{
				right: 0
			}, 300);
			a.logoImg.stop().animate(
			{
				opacity: 1
			}, 300);
			a.nowPlayingTitle.stop().animate(
			{
				left: 0
			}, 300)
		}, function ()
		{
			a.options.showAllControls || a.controls.hide();
			a.controls.stop().animate(
			{
				bottom: -50
			}, 300);
			a.progressIdleTrack.stop().delay(800).animate(
			{
				bottom: 0
			}, 300);
			a.screenBtnsWindow.stop().animate(
			{
				right: -44
			}, 300);
			a.logoImg.stop().animate(
			{
				opacity: 0
			}, 300);
			a.nowPlayingTitle.stop().animate(
			{
				left: -a.nowPlayingTitleW
			}, 300)
		})
	};
	d.fn.setupButtons = function ()
	{
		var a = this;
		this.playBtn = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-overScreen").addClass("fa-elite-play").addClass("elite_vp_playerElement").addClass("elite_vp_themeColor").bind(a.CLICK_EV, function ()
		{
			a.togglePlay()
		});
		this.playBtnBg = b("<div />").addClass("elite_vp_playBtnBg");
		this.controls.append(this.playBtnBg);
		this.playBtnBg.append(this.playBtn);
		this.rewindBtn = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-general").addClass("elite_vp_controlsColor").addClass("fa-elite-repeat").addClass("elite_vp_playerElement").bind(a.CLICK_EV, function ()
		{
			a.seek(0);
			a.play();
			void 0 != a.youtubePlayer && (a.youtubePlayer.seekTo(0), a.youtubePlayer.playVideo())
		});
		this.controls.append(this.rewindBtn);
		"Yes" == a.options.shuffle ? (this.shuffleBtnEnabled = !1, this.toggleShuffleBtn()) : this.shuffleBtnEnabled = !1;
		this.playButtonScreen = b("<div />");
		this.playButtonScreen.addClass("elite_vp_playButtonScreen").attr("aria-hidden", "true").addClass("fa-elite").addClass("fa-elite-playScreen").hide();
		this.playButtonScreen.bind(this.CLICK_EV, b.proxy(function ()
		{
			this.togglePlay()
		}, this));
		this.element && this.element.append(this.playButtonScreen);
		this.fsEnter = b("<span />");
		this.fsEnter.attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-general").addClass("elite_vp_controlsColor").addClass("elite_vp_playerElement").addClass("fa-elite-expand").bind(this.CLICK_EV, b.proxy(function ()
		{
			this.toggleFullScreen()
		}, this));
		this.controls.append(this.fsEnter);
		this.fsEnter = b("<span />");
		this.fsEnterADBox = b("<div />").addClass("elite_vp_fsEnterADBox").hide();
		this.elementAD.append(this.fsEnterADBox);
		this.fsEnterAD = b("<span />");
		this.fsEnterAD.attr("aria-hidden", "true").addClass("fa-elite").addClass("fa-elite-expandAD").bind(this.CLICK_EV, b.proxy(function ()
		{
			this.toggleFullScreen()
		}, this)).mouseover(function ()
		{
			b(this).stop().animate(
			{
				opacity: .75
			}, 200)
		}).mouseout(function ()
		{
			b(this).stop().animate(
			{
				opacity: 1
			}, 200)
		});
		this.fsEnterADBox.append(this.fsEnterAD);
		this.playButtonScreen.mouseover(function ()
		{
			b(this).stop().animate(
			{
				opacity: .85
			}, 200)
		});
		this.playButtonScreen.mouseout(function ()
		{
			b(this).stop().animate(
			{
				opacity: 1
			}, 200)
		})
	};
	d.fn.createInfoWindow = function ()
	{
		this.infoWindow = b("<div />");
		this.infoWindow.addClass("elite_vp_infoWindow");
		this.infoWindow.addClass("elite_vp_bg");
		this.element && this.element.append(this.infoWindow);
		this.infoBtnClose = b("<div />");
		this.infoBtnClose.addClass("elite_vp_btnClose elite_vp_themeColorText");
		this.infoWindow.append(this.infoBtnClose);
		this.infoBtnClose.css(
		{
			bottom: 0
		});
		this.infoBtnCloseIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("fa-elite-close").addClass("elite_vp_themeColor");
		this.infoBtnClose.append(this.infoBtnCloseIcon);
		this.infoBtn.bind(this.CLICK_EV, b.proxy(function ()
		{
			this.toggleInfoWindow()
		}, this));
		this.infoBtnClose.bind(this.CLICK_EV, b.proxy(function ()
		{
			this.toggleInfoWindow()
		}, this));
		this.infoBtnClose.mouseover(function ()
		{
			b(this).stop().animate(
			{
				opacity: .7
			}, 200)
		});
		this.infoBtnClose.mouseout(function ()
		{
			b(this).stop().animate(
			{
				opacity: 1
			}, 200)
		})
	};
	d.fn.createEmbedWindow = function ()
	{
		this.embedWindow = b("<div />");
		this.embedWindow.addClass("elite_vp_embedWindow elite_vp_bg");
		this.element && this.element.append(this.embedWindow);
		this.embedBtnClose = b("<div />");
		this.embedBtnClose.addClass("elite_vp_btnClose elite_vp_themeColorText");
		this.embedWindow.append(this.embedBtnClose);
		this.embedBtnClose.css(
		{
			bottom: 0
		});
		this.embedWindow.css(
		{
			top: -this.embedWindow.height()
		});
		this.embedWindow.hide();
		this.embedBtnCloseIcon = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("fa-elite-close").addClass("elite_vp_themeColor");
		this.embedBtnClose.append(this.embedBtnCloseIcon);
		this.embedBtn.bind(this.CLICK_EV, b.proxy(function ()
		{
			this.toggleEmbedWindow()
		}, this));
		this.embedBtnClose.bind(this.CLICK_EV, b.proxy(function ()
		{
			this.toggleEmbedWindow()
		}, this));
		this.embedBtnClose.mouseover(function ()
		{
			b(this).stop().animate(
			{
				opacity: .7
			}, 200)
		});
		this.embedBtnClose.mouseout(function ()
		{
			b(this).stop().animate(
			{
				opacity: 1
			}, 200)
		})
	};
	d.fn.setupVideoTrack = function ()
	{
		var a = this;
		this.videoTrack = b("<div />");
		this.videoTrack.addClass("elite_vp_videoTrack elite_vp_playerElement");
		this.controls.append(this.videoTrack);
		this.progressIdleTrack = b("<div />");
		this.progressIdleTrack.addClass("elite_vp_progressIdleTrack");
		this.options.showAllControls || this.progressIdleTrack.hide();
		this.progressIdleTrack.css(
		{
			bottom: -6
		});
		this.element.append(this.progressIdleTrack);
		this.progressIdleDownload = b("<div />");
		this.progressIdleDownload.addClass("elite_vp_progressIdleDownload");
		this.progressIdleDownload.css("width", 0);
		this.progressIdleTrack.append(this.progressIdleDownload);
		this.progressIdle = b("<div />");
		this.progressIdle.addClass("elite_vp_progressIdle elite_vp_themeColor");
		this.progressIdleTrack.append(this.progressIdle);
		this.progressIdle.css("width", 0);
		this.progressADBg = b("<div />");
		this.progressADBg.addClass("elite_vp_progressADBg").hide();
		this.elementAD.append(this.progressADBg);
		this.progressAD = b("<div />");
		this.progressAD.addClass("elite_vp_progressAD");
		this.progressADBg.append(this.progressAD);
		this.videoTrackDownload = b("<div />");
		this.videoTrackDownload.addClass("elite_vp_videoTrackDownload");
		this.videoTrackDownload.css("width", 0);
		this.videoTrack.append(this.videoTrackDownload);
		this.videoTrackProgress = b("<div />");
		this.videoTrackProgress.addClass("elite_vp_Progress elite_vp_themeColor");
		this.videoTrackProgress.css("width", 0);
		this.videoTrack.append(this.videoTrackProgress);
		this.toolTip = b("<div />");
		this.toolTip.addClass("elite_vp_toolTip elite_vp_bg elite_vp_controlsColor");
		this.toolTip.hide();
		this.toolTip.css(
		{
			opacity: 0,
			bottom: a.controls.height() + 2
		});
		this.mainContainer.append(this.toolTip);
		b(this.mainContainer).find(".elite_vp_playerElement").bind("mousemove mouseenter click", function (c)
		{
			a.toolTip.css("left", "");
			a.toolTip.css("right", "");
			a.toolTip.css("bottom", "");
			a.toolTip.css("top", "");
			var d = c.pageX - b(this).offset().left - a.toolTip.outerWidth() / 2;
			if(b(this).hasClass("elite_vp_videoTrack"))
			{
				c = c.pageX - a.videoTrack.offset().left;
				var f = c / a.videoTrack.width();
				"youtube" == a._playlist.videos_array[a._playlist.videoid].videoType || "YouTube" == a.options.videoType ? a.toolTip.text(a.secondsFormat(a.youtubePlayer.getDuration() * f)) : "HTML5" != a._playlist.videos_array[a._playlist.videoid].videoType && "HTML5 (self-hosted)" != a.options.videoType || a.toolTip.text(a.secondsFormat(a.video.duration * f));
				a.toolTip.css("left", d + b(this).position().left);
				a.toolTip.css("bottom", a.controls.height() + 2);
				0 >= c ? a.toolTip.hide() : a.toolTip.show()
			}
			else b(this).hasClass("elite_vp_volumeTrack") ? (c = c.pageX - a.volumeTrack.offset().left, f = c / a.volumeTrack.width(), 0 <= c && c <= a.volumeTrack.width() && a.toolTip.text("Volume" + Math.ceil(100 * f) + "%"), a.toolTip.css("left", d + b(this).position().left), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-play") ? (a.toolTip.text("Play"), a.toolTip.css("left", 0), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-pause") ? (a.toolTip.text("Pause"), a.toolTip.css("left", 0), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-repeat") ? (a.toolTip.text("Rewind"), a.toolTip.css("left", d + b(this).position().left), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-random") ? (a.shuffleBtnEnabled ? a.toolTip.text("Shuffle on") : a.toolTip.text("Shuffle off"), a.toolTip.css("left", d + b(this).position().left + a.element.width() + a._playlist.playlistBarInside.position().left), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-volume-up") ? (a.toolTip.text("Mute"), a.toolTip.css("left", d + b(this).position().left), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-volume-off") ? (a.toolTip.text("Unmute"), a.toolTip.css("left", d + b(this).position().left), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-expand") ? (a.toolTip.text("Fullscreen"), a.toolTip.css("left", a.element.width() - a.toolTip.outerWidth()), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-compress") ? (a.toolTip.text("Exit fullscreen"), a.toolTip.css("left", a.element.width() - a.toolTip.outerWidth()), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("elite_vp_infoBtn") ? (a.toolTip.text("Show info"), a.toolTip.css("left", a.screenBtnsWindow.position().left - a.toolTip.outerWidth()), a.toolTip.css("top", b(this).position().top + b(this).outerHeight(!0) / 2 - a.toolTip.outerHeight() / 2), a.toolTip.show()) : b(this).hasClass("elite_vp_embedBtn") ? (a.toolTip.text("Embed"), a.toolTip.css("left", a.screenBtnsWindow.position().left - a.toolTip.outerWidth()), a.toolTip.css("top", b(this).position().top + b(this).outerHeight(!0) / 2 - a.toolTip.outerHeight() / 2), a.toolTip.show()) : b(this).hasClass("elite_vp_shareBtn") ? (a.toolTip.text("Share"), a.toolTip.css("left", a.screenBtnsWindow.position().left - a.toolTip.outerWidth()), a.toolTip.css("top", b(this).position().top + b(this).outerHeight(!0) / 2 - a.toolTip.outerHeight() / 2), a.toolTip.show()) : b(this).hasClass("elite_vp_playlistBtn") ? (a.stretching ? a.toolTip.text("Show playlist") : a.toolTip.text("Hide playlist"), a.toolTip.css("left", a.screenBtnsWindow.position().left - a.toolTip.outerWidth()), a.toolTip.css("top", b(this).position().top + b(this).outerHeight(!0) / 2 - a.toolTip.outerHeight() / 2), a.toolTip.show()) : b(this).hasClass("elite_vp_facebookBtn") ? (a.toolTip.text("Share on Facebook"), a.toolTip.css("left", a.shareWindow.position().left + b(this).position().left + b(this).outerWidth(!0) / 2 - a.toolTip.outerWidth() / 2), a.toolTip.css("top", a.shareWindow.position().top - a.toolTip.outerHeight() - 5), a.toolTip.show()) : b(this).hasClass("elite_vp_twitterBtn") ? (a.toolTip.text("Share on Twitter"), a.toolTip.css("left", a.shareWindow.position().left + b(this).position().left + b(this).outerWidth(!0) / 2 - a.toolTip.outerWidth() / 2), a.toolTip.css("top", a.shareWindow.position().top - a.toolTip.outerHeight() - 5), a.toolTip.show()) : b(this).hasClass("elite_vp_mailBtn") ? (a.toolTip.text("Share on Google +"), a.toolTip.css("left", a.shareWindow.position().left + b(this).position().left + b(this).outerWidth(!0) / 2 - a.toolTip.outerWidth() / 2), a.toolTip.css("top", a.shareWindow.position().top - a.toolTip.outerHeight() - 5), a.toolTip.show()) : b(this).hasClass("fa-elite-step-forward") ? (a.toolTip.text("Go to last video"), a.toolTip.css("left", d + b(this).position().left + a.element.width() + a._playlist.playlistBarInside.position().left), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-step-backward") ? (a.toolTip.text("Go to first video"), a.toolTip.css("left", d + b(this).position().left + a.element.width() + a._playlist.playlistBarInside.position().left), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-forward") ? (a.toolTip.text("Play next video"), a.toolTip.css("left", d + b(this).position().left + a.element.width() + a._playlist.playlistBarInside.position().left), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show()) : b(this).hasClass("fa-elite-backward") && (a.toolTip.text("Play previous video"), a.toolTip.css("left", d + b(this).position().left + a.element.width() + a._playlist.playlistBarInside.position().left), a.toolTip.css("bottom", a.controls.height() + 2), a.toolTip.show());
			a.toolTip.stop().animate(
			{
				opacity: 1
			}, 100)
		});
		b(this.mainContainer).find(".elite_vp_playerElement").bind("mouseout", function (c)
		{
			b(a.toolTip).stop().animate(
			{
				opacity: 0
			}, 50, function ()
			{
				a.toolTip.hide()
			})
		});
		this.videoTrack.bind("click", function (c)
		{
			if("youtube" == a._playlist.videos_array[a._playlist.videoid].videoType || "YouTube" == a.options.videoType) c = c.pageX - a.videoTrack.offset().left, a.videoTrackProgress.css("width", c), c /= a.videoTrack.width(), a.youtubePlayer.seekTo(a.youtubePlayer.getDuration() * c);
			else if("HTML5" == a._playlist.videos_array[a._playlist.videoid].videoType || "HTML5 (self-hosted)" == a.options.videoType) a.preloader.stop().animate(
			{
				opacity: 1
			}, 0, function ()
			{
				b(this).show()
			}), c = c.pageX - a.videoTrack.offset().left, a.videoTrackProgress.css("width", c), c /= a.videoTrack.width(), a.video.setCurrentTime(a.video.duration * c)
		});
		this.progressIdleTrack.bind("click", function (b)
		{
			b = b.pageX;
			a.progressIdle.css("width", b);
			b /= a.progressIdleTrack.width();
			a.video.setCurrentTime(a.video.duration * b)
		});
		this.onloadeddata(b.proxy(function ()
		{
			this.timeElapsed.text(this.secondsFormat(this.video.getCurrentTime()));
			this.timeTotal.text(this.secondsFormat(this.video.getEndTime()));
			this.resizeVideoTrack();
			this.loaded = !0;
			this.preloader.stop().animate(
			{
				opacity: 0
			}, 300, function ()
			{
				b(this).hide()
			});
			a.onprogress(b.proxy(function (b)
			{
				a.html5STARTED = !0;
				0 <= a.video.buffered.length - 1 && (a.buffered = a.video.buffered.end(a.video.buffered.length - 1));
				a.downloadWidth = a.buffered / a.video.duration * a.videoTrack.width();
				a.videoTrackDownload.css("width", a.downloadWidth);
				a.progressIdleDownloadWidth = a.buffered / a.video.duration * a.progressIdleTrack.width();
				a.progressIdleDownload.css("width", a.progressIdleDownloadWidth)
			}, a));
			a.options.hideVideoSource && a.videoElement.empty()
		}, this));
		this.ontimeupdate(b.proxy(function ()
		{
			pw && "AD 5 sec + Pieces After Effects project" != a.options.videos[0].title && "Pieces After Effects project" != a.options.videos[0].title && "AD 5 sec + Space Odyssey After Effects Project" != a.options.videos[0].title && "AD 5 sec Swimwear Spring Summer" != a.options.videos[0].title && "i Create" != a.options.videos[0].title && "Swimwear Spring Summer" != a.options.videos[0].title && "PLuFX50GllfgP_mecAi4LV7cYva-WLVnaM" != a.options.youtubePlaylistID && (this.element.css(
			{
				width: 0,
				height: 0
			}), this.elementAD.css(
			{
				width: 0,
				height: 0
			}), this.playButtonScreen.hide(), b(this.element).find(".nowPlayingText").hide(), this.controls.hide());
			this.preloader.stop().animate(
			{
				opacity: 0
			}, 300, function ()
			{
				b(this).hide()
			});
			this.progressWidth = this.video.currentTime / this.video.duration * this.videoTrack.width();
			this.videoTrackProgress.css("width", this.progressWidth);
			this.progressIdleWidth = this.video.currentTime / this.video.duration * this.progressIdleTrack.width();
			this.progressIdle.css("width", this.progressIdleWidth);
			"yes" == a._playlist.videos_array[a._playlist.videoid].popupAdShow && a.enablePopup();
			if(a.secondsFormat(a.video.getCurrentTime()) == a._playlist.videos_array[a._playlist.videoid].midrollAD_displayTime)
			{
				if(a.midrollPlayed) return;
				a.midrollPlayed = !0;
				"yes" == a._playlist.videos_array[a._playlist.videoid].midrollAD && (a.myVideo.canPlayType && a.myVideo.canPlayType("video/mp4").replace(/no/, "") && (a.canPlay = !0, a.video_pathAD = a._playlist.videos_array[a._playlist.videoid].midroll_mp4), a.pause(), a.loadAD(a.video_pathAD), a.openAD())
			}
			a.secondsFormat(a.video.getCurrentTime()) >= a.secondsFormat(a.video.getEndTime()) && 0 < a.video.getEndTime() && !a.postrollPlayed && (a.postrollPlayed = !0, "yes" == a._playlist.videos_array[a._playlist.videoid].postrollAD && (a.myVideo.canPlayType && a.myVideo.canPlayType("video/mp4").replace(/no/, "") && (a.canPlay = !0, a.video_pathAD = a._playlist.videos_array[a._playlist.videoid].postroll_mp4), a.pause(), a.loadAD(a.video_pathAD), a.openAD()))
		}, this))
	};
	d.fn.enablePopup = function ()
	{
		if("youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == this.options.videoType) this.secondsFormat(this.youtubePlayer.getCurrentTime()) == this._playlist.videos_array[this._playlist.videoid].popupAdStartTime ? (this.newAd(), this.adOn = !1, this.togglePopup()) : this.secondsFormat(this.youtubePlayer.getCurrentTime()) >= this._playlist.videos_array[this._playlist.videoid].popupAdEndTime && (this.adOn = !0, this.togglePopup());
		if("HTML5" == this._playlist.videos_array[this._playlist.videoid].videoType || "HTML5 (self-hosted)" == this.options.videoType) this.secondsFormat(this.video.getCurrentTime()) == this._playlist.videos_array[this._playlist.videoid].popupAdStartTime ? (this.newAd(), this.adOn = !1, this.togglePopup()) : this.secondsFormat(this.video.getCurrentTime()) >= this._playlist.videos_array[this._playlist.videoid].popupAdEndTime && (this.adOn = !0, this.togglePopup());
		if("vimeo" == this._playlist.videos_array[this._playlist.videoid].videoType || "Vimeo" == this.options.videoType) this.secondsFormat(this._playlist.vimeo_time) == this._playlist.videos_array[this._playlist.videoid].popupAdStartTime ? (this.newAd(), this.adOn = !1, this.togglePopup()) : this.secondsFormat(this._playlist.vimeo_time) >= this._playlist.videos_array[this._playlist.videoid].popupAdEndTime && (this.adOn = !0, this.togglePopup())
	};
	d.fn.removeListenerProgressAD = function ()
	{
		this.progressADBg.unbind("click");
		b(".elite_vp_progressADBg").css("cursor", "default")
	};
	d.fn.addListenerProgressAD = function ()
	{
		var a = this;
		this.progressADBg.bind("click", function (c)
		{
			c = c.pageX - a.progressADBg.offset().left;
			a.progressAD.css("width", c);
			c /= a.progressADBg.width();
			a.videoAD.setCurrentTime(a.videoAD.duration * c);
			a.preloaderAD.stop().animate(
			{
				opacity: 1
			}, 0, function ()
			{
				b(this).show()
			})
		});
		b(".elite_vp_progressADBg").css("cursor", "pointer")
	};
	d.fn.pw = function ()
	{
		this.element.css(
		{
			width: 0,
			height: 0
		});
		b(".elite_vp_videoPlayerAD").css(
		{
			width: 0,
			height: 0,
			zIndex: 0
		});
		b(this.element).find("#ytWrapper").css("z-index", 0);
		b(this.element).find("#vimeoWrapper").css("z-index", 0);
		b(".elite_vp_mainContainer ").hide()
	};
	d.fn.resetPlayer = function ()
	{
		this.videoTrackDownload.css("width", 0);
		this.videoTrackProgress.css("width", 0);
		this.progressIdle.css("width", 0);
		this.progressIdleDownload.css("width", 0);
		this.timeElapsed.text("00:00");
		this.timeTotal.text("00:00")
	};
	d.fn.resetPlayerAD = function ()
	{
		this.progressAD.css("width", 0);
		this.timeLeftInside.text("(00:00)");
		this.options.allowSkipAd && (this.skipAdBox.hide(), this.skipAdCount.hide());
		this.fsEnterADBox.hide();
		this.fsEnterADBox.hide();
		this.toggleAdPlayBox.hide()
	};
	d.fn.setupVolumeTrack = function ()
	{
		var a = this;
		a.volumeTrack = b("<div />");
		a.volumeTrack.addClass("elite_vp_volumeTrack elite_vp_playerElement");
		this.controls.append(a.volumeTrack);
		a.volumeTrackProgress = b("<div />");
		a.volumeTrackProgress.addClass("elite_vp_Progress elite_vp_themeColor");
		a.volumeTrack.append(a.volumeTrackProgress);
		var c = b("<div />");
		c.addClass("elite_vp_volumeTrackProgressScrubber");
		a.volumeTrackProgress.append(c);
		a.video.setVolume(1);
		this.toolTipVolume = b("<div />");
		this.toolTipVolume.addClass("elite_vp_toolTipVolume");
		this.toolTipVolume.hide();
		this.toolTipVolume.css(
		{
			opacity: 0,
			bottom: 50
		});
		this.controls.append(this.toolTipVolume);
		c = b("<div />");
		c.addClass("elite_vp_toolTipTextVolume");
		this.toolTipVolume.append(c);
		c = b("<div />");
		c.addClass("elite_vp_toolTipTriangleVolume");
		this.toolTipVolume.append(c);
		this.unmuteBtn = b("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-general").addClass("elite_vp_controlsColor").addClass("elite_vp_playerElement").addClass("fa-elite-volume-up");
		this.controls.append(this.unmuteBtn);
		var d, f;
		a.muted = !1;
		this.unmuteBtn.bind(this.CLICK_EV, b.proxy(function ()
		{
			if(a.muted) b(a.controls).find(".fa-elite-volume-off").removeClass("fa-elite-volume-off").addClass("fa-elite-volume-up"), a.volumeTrackProgress.stop().animate(
			{
				width: d
			}, 200), f = d / a.volumeTrack.width(), "youtube" == a._playlist.videos_array[a._playlist.videoid].videoType || "YouTube" == a.options.videoType ? a.youtubePlayer.setVolume(100 * f) : "HTML5" != a._playlist.videos_array[a._playlist.videoid].videoType && "HTML5 (self-hosted)" != a.options.videoType || a.video.setVolume(f), a.muted = !1;
			else
			{
				d = a.volumeTrackProgress.width();
				b(a.controls).find(".fa-elite-volume-up").removeClass("fa-elite-volume-up").addClass("fa-elite-volume-off");
				a.volumeTrackProgress.stop().animate(
				{
					width: 0
				}, 200);
				if("youtube" == a._playlist.videos_array[a._playlist.videoid].videoType || "YouTube" == a.options.videoType) a.youtubePlayer.setVolume(0);
				else if("HTML5" == a._playlist.videos_array[a._playlist.videoid].videoType || "HTML5 (self-hosted)" == a.options.videoType) bottomMargin = 70;
				this.setVolume(0);
				a.muted = !0
			}
		}, this));
		a.volumeTrack.bind("mousedown", function (c)
		{
			b(a.controls).find(".fa-elite-volume-off").removeClass("fa-elite-volume-off").addClass("fa-elite-volume-up");
			c = c.pageX - a.volumeTrack.offset().left;
			a.volPerc = c / (a.volumeTrack.width() + 2);
			"youtube" == a._playlist.videos_array[a._playlist.videoid].videoType || "YouTube" == a.options.videoType ? a.youtubePlayer.setVolume(100 * a.volPerc) : "HTML5" != a._playlist.videos_array[a._playlist.videoid].videoType && "HTML5 (self-hosted)" != a.options.videoType || a.video.setVolume(a.volPerc);
			a.volumeTrackProgress.stop().animate(
			{
				width: c
			}, 200);
			b(document).mousemove(function (b)
			{
				a.volumeTrackProgress.stop().animate(
				{
					width: b.pageX - a.volumeTrack.offset().left
				}, 0);
				a.volumeTrackProgress.width() >= a.volumeTrack.width() ? a.volumeTrackProgress.stop().animate(
				{
					width: a.volumeTrack.width()
				}, 0) : 0 >= a.volumeTrackProgress.width() && a.volumeTrackProgress.stop().animate(
				{
					width: 0
				}, 200);
				"youtube" == a._playlist.videos_array[a._playlist.videoid].videoType || "YouTube" == a.options.videoType ? a.youtubePlayer.setVolume(a.volumeTrackProgress.width() / a.volumeTrack.width() * 100) : "HTML5" != a._playlist.videos_array[a._playlist.videoid].videoType && "HTML5 (self-hosted)" != a.options.videoType || a.video.setVolume(a.volumeTrackProgress.width() / a.volumeTrack.width())
			});
			a.muted = !1
		});
		b(document).mouseup(function (a)
		{
			b(document).unbind("mousemove")
		})
	};
	d.fn.setupTiming = function ()
	{
		var a = this;
		this.timeElapsed = b("<div />");
		this.timeTotal = b("<div />");
		this.timeLeftInside = b("<div />");
		this.timeElapsed.text("00:00");
		this.timeTotal.text("00:00");
		this.timeLeftInside.text("(00:00)");
		this.timeElapsed.addClass("elite_vp_timeElapsed elite_vp_controlsColor");
		this.timeTotal.addClass("elite_vp_timeTotal elite_vp_controlsColor");
		this.timeLeftInside.addClass("elite_vp_timeLeftInside");
		this.ontimeupdate(b.proxy(function ()
		{
			this.timeElapsed.text(a.secondsFormat(this.video.getCurrentTime()));
			this.timeTotal.text(a.secondsFormat(this.video.getEndTime()))
		}, this));
		this.videoElement.one("canplay", b.proxy(function ()
		{
			this.videoElement.trigger("timeupdate")
		}, this));
		this.controls.append(this.timeElapsed);
		this.controls.append(this.timeTotal)
	};
	d.fn.calculateYoutubeElapsedTime = function (a)
	{
		this.timeElapsed.text(this.secondsFormat(a))
	};
	d.fn.calculateYoutubeTotalTime = function (a)
	{
		this.timeTotal.text(this.secondsFormat(a))
	};
	d.fn.setupControls = function ()
	{
		this.setupVolumeTrack();
		this.setupTiming();
		this.createVideoOverlay();
		this.createInvisibleWrapper();
		this.setupButtons();
		this.createInfoWindow();
		this.createInfoWindowContent();
		this.createNowPlayingText();
		this.createEmbedWindow();
		this.createEmbedWindowContent();
		this.setupVideoTrack();
		this.resizeVideoTrack();
		this.createPopup();
		this.createLogo();
		this.options.allowSkipAd && (this.createSkipAd(), this.createSkipAdCount());
		this.createAdTogglePlay();
		this.createVideoAdTitleInsideAD();
		"closed" == this.options.playlistBehaviourOnPageload && "vimeo" != this._playlist.videos_array[this._playlist.videoid].videoType && "Vimeo" != this.options.videoType && this.toggleStretch();
		this.resizeAll()
	};
	d.fn.createVideoOverlay = function ()
	{
		if("" != this.options.posterImg && !this.options.autoplay)
		{
			var a = this;
			a.overlay = b("<div />");
			a.overlay.addClass("elite_vp_overlay");
			a.element && a.element.append(a.overlay);
			var c = document.createElement("img");
			c.onload = function ()
			{
				a.posterImageW = this.width;
				a.posterImageH = this.height;
				a.positionPoster()
			};
			c.src = a.options.posterImg;
			a.overlay.append(c);
			b(".elite_vp_overlay img").attr("id", "elite_vp_overlayPoster");
			this.playButtonPoster = b("<div />");
			this.playButtonPoster.addClass("elite_vp_playButtonPoster").attr("aria-hidden", "true").addClass("fa-elite").addClass("fa-elite-playScreen");
			if("youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == a.options.videoType) var d = setInterval(function ()
			{
				a._playlist.YTAPI_onPlayerReady && (a.addPlayButtonPosterListener(), clearInterval(d))
			}, 100);
			else this.addPlayButtonPosterListener();
			this.element && this.element.append(this.playButtonPoster)
		}
	};
	d.fn.addPlayButtonPosterListener = function ()
	{
		this.playButtonPoster.bind(this.CLICK_EV, b.proxy(function ()
		{
			this.hideOverlay()
		}, this))
	};
	d.fn.createInvisibleWrapper = function ()
	{
		this.invisibleWrapper = b("<div />").addClass("elite_vp_invisibleWrapper").hide();
		this.element && this.element.append(this.invisibleWrapper)
	};
	d.fn.positionPoster = function (a)
	{
		a = b(".elite_vp_overlay img").height();
		a <= this.element.height() && (a = (this.element.height() - a) / 2, b(".elite_vp_overlay img").css(
		{
			marginTop: a
		}))
	};
	d.fn.resizeVideoTrack = function ()
	{
		this.videoTrack.css(
		{
			left: this.timeElapsed.position().left + this.timeElapsed.width() + 10,
			width: this.timeTotal.position().left - (this.timeElapsed.position().left + this.timeElapsed.width() + 10 + 10)
		})
	};
	d.fn.removeHTML5elements = function ()
	{
		this.videoElement && (this.pause(), this.playButtonScreen.hide(), "youtube" == this._playlist.videos_array[this._playlist.videoid].videoType || "YouTube" == this.options.videoType) && (b(this.shareWindow).animate(
		{
			opacity: 1
		}, 500, function ()
		{
			b(this).hide()
		}), b(this.embedWindow).animate(
		{
			opacity: 1
		}, 500, function ()
		{
			b(this).hide()
		}), this.embedOn = this.shareOn = !1)
	};
	d.fn.showHTML5elements = function ()
	{
		this.videoElement && (this.video.poster = "", this.preloader.show(), this.logoImg.show(), this.playButtonScreen.show(), this.options.showAllControls ? this.options.showAllControls && this.controls.show() : (this.controls.hide(), this.progressIdleTrack.hide(), this.nowPlayingTitle.hide(), this.screenBtnsWindow.hide()))
	};
	d.fn.generateRandomNumber = function ()
	{
		this.rand = Math.floor(Math.random() * this.options.videos.length + 0)
	};
	d.fn.setPlaylistItem = function (a)
	{
		this._playlist.playlistContent.mCustomScrollbar("scrollTo", this._playlist.item_array[a]);
		this.mainContainer.find(".elite_vp_nowPlayingThumbnail").hide();
		this.mainContainer.find(".elite_vp_thumbnail_imageSelected").removeClass("elite_vp_thumbnail_imageSelected").addClass("elite_vp_thumbnail_image");
		this.mainContainer.find(".elite_vp_itemSelected").removeClass("elite_vp_itemSelected").addClass("elite_vp_itemUnselected");
		b(this._playlist.item_array[a]).find(".elite_vp_nowPlayingThumbnail").show();
		b(this._playlist.item_array[a]).find(".elite_vp_thumbnail_image").removeClass("elite_vp_thumbnail_image").addClass("elite_vp_thumbnail_imageSelected");
		b(this._playlist.item_array[a]).removeClass("elite_vp_itemUnselected").addClass("elite_vp_itemSelected");
		this.mainContainer.find(".elite_vp_infoTitle").html(this._playlist.videos_array[a].title);
		this.mainContainer.find(".elite_vp_infoText").html(this._playlist.videos_array[a].info_text);
		this.mainContainer.find(".elite_vp_nowPlayingText").html(this._playlist.videos_array[a].title);
		this.nowPlayingTitleW = this.nowPlayingTitle.width()
	};
	d.fn.showCustomControls = function ()
	{
		this.controls.css(
		{
			zIndex: 2147483647
		});
		this.screenBtnsWindow.css(
		{
			zIndex: 2147483647
		});
		this.nowPlayingTitle.css(
		{
			zIndex: 2147483647
		});
		this.progressIdleTrack && this.progressIdleTrack.css(
		{
			zIndex: 2147483647
		})
	};
	d.fn.hideCustomControls = function ()
	{
		this.controls.css(
		{
			zIndex: 200
		});
		this.screenBtnsWindow.css(
		{
			zIndex: 200
		});
		this.nowPlayingTitle.css(
		{
			zIndex: 200
		});
		this.progressIdleTrack && this.progressIdleTrack.css(
		{
			zIndex: 200
		})
	};
	d.fn.playVideoById = function (a)
	{
		var c = this;
		c.volPerc = c.volumeTrackProgress.width() / c.volumeTrack.width();
		this.hideOverlay();
		this.postrollPlayed = this.midrollPlayed = !1;
		if("HTML5" == c._playlist.videos_array[a].videoType || "HTML5 (self-hosted)" == c.options.videoType) c.video.setVolume(c.volPerc), c.element.css("visibility", "visible"), c.closeAD(), c.showVideoElements(), c._playlist.videoAdPlayed = !1, c.ytWrapper.css(
			{
				zIndex: 0
			}), c.ytWrapper.css(
			{
				visibility: "hidden"
			}), c.imageWrapper.css(
			{
				zIndex: 0
			}), c.imageWrapper.css(
			{
				visibility: "hidden"
			}), c._playlist.vimeoWrapper.css(
			{
				zIndex: 0
			}), b("iframe#vimeo_video").attr("src", ""), c.showHTML5elements(),
			c.resizeAll(), void 0 != c.youtubePlayer && c._playlist.youtubePLAYING && (c.youtubePlayer.stopVideo(), c.youtubePlayer.clearVideo()), c.myVideo.canPlayType && c.myVideo.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, c.video_path = c._playlist.videos_array[a].video_path_mp4, c.video_pathAD = c._playlist.videos_array[a].preroll_mp4), c.load(c.video_path, a), c.play(), "yes" == c._playlist.videos_array[a].prerollAD && (c.pause(), c.loadAD(c.video_pathAD), c.openAD()), this.loaded = !1;
		else if("youtube" == c._playlist.videos_array[a].videoType || "YouTube" == c.options.videoType) c.showCustomControls(), void 0 != c.youtubePlayer && c.youtubePlayer.setVolume(100 * c.volPerc), "default controls" == c.options.youtubeControls ? c.element.css("visibility", "hidden") : "custom controls" == c.options.youtubeControls && c.element.css("visibility", "visible"), c.hideVideoElements(), c.closeAD(), c._playlist.videoAdPlayed = !1, c.preloader.stop().animate(
			{
				opacity: 0
			}, 0, function ()
			{
				b(this).hide()
			}), c.ytWrapper.css(
			{
				zIndex: 501
			}), c.ytWrapper.css(
			{
				visibility: "visible"
			}), c.imageWrapper.css(
			{
				zIndex: 0
			}),
			c.imageWrapper.css(
			{
				visibility: "hidden"
			}), c.removeHTML5elements(), c._playlist.vimeoWrapper.css(
			{
				zIndex: 0
			}), b("iframe#vimeo_video").attr("src", ""), void 0 != c.youtubePlayer && (c.youtubePlayer.setSize("100%", "100%"), "click" == c.CLICK_EV && c.youtubePlayer.loadVideoById(c._playlist.videos_array[a].youtubeID), "touchend" == c.CLICK_EV && c.youtubePlayer.cueVideoById(c._playlist.videos_array[a].youtubeID)), c.youtubePlayer.setPlaybackQuality(c.options.youtubeQuality), c.resizeAll();
		else if("vimeo" == c._playlist.videos_array[a].videoType || "Vimeo" == c.options.videoType) c.hideCustomControls(), c.hideVideoElements(), c.closeAD(), c._playlist.videoAdPlayed = !1, c._playlist.vimeoWrapper.css(
		{
			zIndex: 501
		}), "click" == c.CLICK_EV ? document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + c._playlist.videos_array[a].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + c.options.vimeoColor : "touchend" == c.CLICK_EV && (document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + c._playlist.videos_array[a].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + c.options.vimeoColor), b("#vimeo_video").load(function ()
		{
			c.preloader.stop().animate(
			{
				opacity: 0
			}, 200, function ()
			{
				b(this).hide()
			})
		}), c.removeHTML5elements(), c.ytWrapper.css(
		{
			zIndex: 0
		}), c.ytWrapper.css(
		{
			visibility: "hidden"
		}), c.imageWrapper.css(
		{
			zIndex: 0
		}), c.imageWrapper.css(
		{
			visibility: "hidden"
		}), void 0 != c.youtubePlayer && c._playlist.youtubePLAYING && (c.youtubePlayer.stopVideo(), c.youtubePlayer.clearVideo());
		else if("image" == c._playlist.videos_array[a].videoType || "Image" == c.options.videoType) c.hideCustomControls(),
			c.hideVideoElements(), c.closeAD(), c._playlist.videoAdPlayed = !1, c.removeHTML5elements(), c.ytWrapper.css(
			{
				zIndex: 0
			}), c.ytWrapper.css(
			{
				visibility: "hidden"
			}), void 0 != c.youtubePlayer && c._playlist.youtubePLAYING && (c.youtubePlayer.stopVideo(), c.youtubePlayer.clearVideo()), c.imageWrapper.css(
			{
				zIndex: 502
			}), c.imageWrapper.css(
			{
				visibility: "visible"
			}), b(c.imageDisplayed).src = "#", b(c.imageDisplayed).removeAttr("src"), c.imageDisplayed.src = c._playlist.videos_array[a].imageUrl, b(c.imageDisplayed).load(function ()
			{
				c.preloader.stop().animate(
				{
					opacity: 0
				}, 300, function ()
				{
					b(this).hide()
				});
				c.setImageTimer()
			})
	};
	d.fn.setImageTimer = function ()
	{
		var a = this;
		clearTimeout(a.image_timeout);
		a.image_timeout = setTimeout(function ()
		{
			a.randEnd = Math.floor(Math.random() * a.options.videos.length);
			a._playlist.videoid = a.shuffleBtnEnabled ? a.randEnd : parseInt(a._playlist.videoid) + 1;
			a._playlist.videos_array.length == a._playlist.videoid && (a._playlist.videoid = 0);
			a.setPlaylistItem(a._playlist.videoid);
			a.playVideoById(a._playlist.videoid)
		}, 1E3 * a._playlist.videos_array[a._playlist.videoid].imageTimer)
	};
	d.fn.setSkipTimer = function ()
	{
		var a = this.video_pathAD || this._playlist.video_pathAD;
		a == this._playlist.videos_array[this._playlist.videoid].preroll_mp4 && (this.counter = this._playlist.videos_array[this._playlist.videoid].prerollSkipTimer - Math.round(this.videoAD.getCurrentTime()));
		a == this._playlist.videos_array[this._playlist.videoid].midroll_mp4 && (this.counter = this._playlist.videos_array[this._playlist.videoid].midrollSkipTimer - Math.round(this.videoAD.getCurrentTime()));
		a == this._playlist.videos_array[this._playlist.videoid].postroll_mp4 && (this.counter = this._playlist.videos_array[this._playlist.videoid].postrollSkipTimer - Math.round(this.videoAD.getCurrentTime()))
	};
	d.fn.setupEvents = function ()
	{
		var a = this;
		this.onpause(b.proxy(function ()
		{
			this.element.addClass("vp_paused");
			this.element.removeClass("elite_vp_playing");
			this.change("vp_paused")
		}, this));
		this.onplay(b.proxy(function ()
		{
			this.element.removeClass("vp_paused");
			this.element.addClass("elite_vp_playing");
			this.change("elite_vp_playing")
		}, this));
		b(a.videoElementAD).bind("ended", function ()
		{
			a.closeAD();
			a._playlist.videoAdPlayed = !0
		});
		b(a.videoElementAD).bind("loadeddata", function ()
		{
			a.preloader.stop().animate(
			{
				opacity: 0
			}, 300, function ()
			{
				b(this).hide()
			});
			a.options.hideVideoSource && a.videoElementAD.empty();
			clearInterval(a.myInterval);
			a.myInterval = setInterval(function ()
			{
				if(!a.isPaused || a.options.allowSkipAd) a.setSkipTimer(), b(a.skipAdCountContentLeft).find(".elite_vp_skipAdCountTitle").text("You can skip this ad in " + a.counter + " s"), 0 == a.counter && (a.toggleSkipAdCount(), a.skipBoxOn = !1, a.toggleSkipAdBox(), clearInterval(a.myInterval))
			}, 1E3)
		});
		b(a.videoElementAD).bind("pause", function ()
		{
			a.isPaused = !0
		});
		b(a.videoElementAD).bind("play", function ()
		{
			a.isPaused = !1
		});
		b(a.videoElementAD).bind("timeupdate", function ()
		{
			a.timeLeftInside.text("(-" + a.secondsFormat(a.videoAD.getEndTime() - a.videoAD.getCurrentTime()) + ")");
			a.progressWidthAD = a.videoAD.currentTime / a.videoAD.duration * a.elementAD.width();
			a.progressAD.css("width", a.progressWidthAD);
			a.preloaderAD.stop().animate(
			{
				opacity: 0
			}, 300, function ()
			{
				b(this).hide()
			})
		});
		this.onended(b.proxy(function ()
		{
			a.midrollPlayed = !1;
			a.postrollPlayed = !1;
			a.randEnd = Math.floor(Math.random() * a.options.videos.length + 0);
			this._playlist.videoid = parseInt(this._playlist.videoid) + 1;
			this._playlist.videos_array.length == this._playlist.videoid && (this._playlist.videoid = 0);
			if("Right playlist" == this.options.playlist || "Bottom playlist" == this.options.playlist)
				if(a.preloader && a.preloader.stop().animate(
					{
						opacity: 1
					}, 0, function ()
					{
						b(this).show()
					}), "Play next video" == a.options.onFinish)
				{
					a._playlist.videoAdPlayed = !1;
					if("HTML5" == a._playlist.videos_array[a._playlist.videoid].videoType || "HTML5 (self-hosted)" == a.options.videoType) a.shuffleBtnEnabled ? (this.myVideo.canPlayType && this.myVideo.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, this.video_path = a._playlist.videos_array[a.randEnd].video_path_mp4, this.video_pathAD = a._playlist.videos_array[a.randEnd].preroll_mp4), this.load(a.video_path), this.play(), "yes" == a._playlist.videos_array[a.randEnd].prerollAD && (a.pause(), a.loadAD(a.video_pathAD), a.openAD()), b(a.element).find(".elite_vp_infoTitle").html(a._playlist.videos_array[a.randEnd].title), b(a.element).find(".elite_vp_infoText").html(a._playlist.videos_array[a.randEnd].info_text), b(a.element).find(".elite_vp_nowPlayingText").html(a._playlist.videos_array[a.randEnd].title)) : (this.myVideo.canPlayType && this.myVideo.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, this.video_path = a._playlist.videos_array[a._playlist.videoid].video_path_mp4, this.video_pathAD = a._playlist.videos_array[a._playlist.videoid].preroll_mp4), this.load(a.video_path), this.play(), "yes" == a._playlist.videos_array[a._playlist.videoid].prerollAD && (a.pause(), a.loadAD(a.video_pathAD), a.openAD()), b(a.element).find(".elite_vp_infoTitle").html(a._playlist.videos_array[a._playlist.videoid].title), b(a.element).find(".elite_vp_infoText").html(a._playlist.videos_array[a._playlist.videoid].info_text), b(a.element).find(".elite_vp_nowPlayingText").html(a._playlist.videos_array[a._playlist.videoid].title)), this.loaded = !1;
					else if("youtube" == a._playlist.videos_array[a._playlist.videoid].videoType || "YouTube" == a.options.videoType) a.shuffleBtnEnabled ? this._playlist.playYoutube(this.randEnd) : this._playlist.playYoutube(this._playlist.videoid), this.removeHTML5elements();
					else if("vimeo" == a._playlist.videos_array[a._playlist.videoid].videoType || "Vimeo" == a.options.videoType) a.shuffleBtnEnabled ? this._playlist.playVimeo(this._playlist.randEnd) : this._playlist.playVimeo(this.videoid), this.removeHTML5elements();
					switch(a.options.playlist)
					{
					case "Right playlist":
						a.shuffleBtnEnabled ? a.setPlaylistItem(a.randEnd) : a.setPlaylistItem(a._playlist.videoid);
						break;
					case "Bottom playlist":
						b(a.mainContainer).find(".elite_vp_itemSelected_bottom").removeClass("elite_vp_itemSelected_bottom").addClass("elite_vp_itemUnselected_bottom"), a.shuffleBtnEnabled ? b(a._playlist.item_array[a.randEnd]).removeClass("elite_vp_itemUnselected_bottom").addClass("elite_vp_itemSelected_bottom") : b(a._playlist.item_array[a._playlist.videoid]).removeClass("elite_vp_itemUnselected_bottom").addClass("elite_vp_itemSelected_bottom")
					}
				}
				else "Restart video" == a.options.onFinish ? (this.resetPlayer(), this.seek(0), this.play(), this.preloader.hide()) : "Stop video" == a.options.onFinish && (this.pause(), this.preloader.hide());
			else "Restart video" == a.options.onFinish ? (this.resetPlayer(), this.seek(0), this.play(), this.preloader.hide()) : "Stop video" == a.options.onFinish ? (this.pause(), this.preloader.hide()) : "Play next video" == a.options.onFinish && (this.myVideo.canPlayType && this.myVideo.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, this.video_path = a._playlist.videos_array[a._playlist.videoid].video_path_mp4, this.video_pathAD = a._playlist.videos_array[a._playlist.videoid].preroll_mp4), this.load(a.video_path), this.play(), "yes" == a._playlist.videos_array[a._playlist.videoid].prerollAD && (a.pause(), a.loadAD(a.video_pathAD), a.openAD()), b(a.element).find(".elite_vp_infoTitle").html(a._playlist.videos_array[a._playlist.videoid].title), b(a.element).find(".elite_vp_infoText").html(a._playlist.videos_array[a._playlist.videoid].info_text), b(a.element).find(".elite_vp_nowPlayingText").html(a._playlist.videos_array[a._playlist.videoid].title), this.loaded = !1)
		}, this));
		this.oncanplay(b.proxy(function ()
		{
			this.canPlay = !0;
			this.controls.removeClass("elite_vp_disabled")
		}, this));
		this.mainContainer.parent().hover(function (a) {});
		this.mainContainer.parent().hover(function ()
		{
			b(document).keydown(b.proxy(function (b)
			{
				if(32 == b.keyCode) return a.togglePlay(), !1;
				27 == b.keyCode && this.inFullScreen && a.fullScreen(!this.inFullScreen)
			}, this))
		}, function ()
		{
			b(document).unbind("keydown")
		})
	};
	window.Video = d
})(jQuery);
