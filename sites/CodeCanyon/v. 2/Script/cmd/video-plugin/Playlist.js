var PLAYER = PLAYER ||
{};
PLAYER.Playlist = function (c, k, b, g, e, r, t, d, u, v, n, w, x, y, z)
{
	function A(b)
	{
		a.vimeoStatus.text("paused")
	}

	function B(f)
	{
		a.vimeoStatus.text("finished");
		a.videoAdPlayed = !1;
		a.randEnd = Math.floor(Math.random() * b.videos.length + 0);
		if("Right playlist" == b.playlist || "Bottom playlist" == b.playlist)
			if(a.videoid = parseInt(a.videoid) + 1, a.videos_array.length == a.videoid && (a.videoid = 0), "Play next video" == b.onFinish)
			{
				switch(a.options.playlist)
				{
				case "Right playlist":
					a.VIDEO.shuffleBtnEnabled ? a.VIDEO.setPlaylistItem(a.randEnd) : a.VIDEO.setPlaylistItem(a.videoid);
					break;
				case "Bottom playlist":
					g.find(".elite_vp_itemSelected_bottom").removeClass("elite_vp_itemSelected_bottom").addClass("elite_vp_itemUnselected_bottom"), c(a.item_array[a.videoid]).removeClass("elite_vp_itemUnselected_bottom").addClass("elite_vp_itemSelected_bottom")
				}
				if("youtube" == b.videos[a.videoid].videoType || "YouTube" == b.videoType) a.preloader.stop().animate(
					{
						opacity: 0
					}, 0, function ()
					{
						c(this).hide()
					}), a.vimeoWrapper.css(
					{
						zIndex: 0
					}), c("iframe#vimeo_video").attr("src", ""), a.VIDEO.ytWrapper.css(
					{
						zIndex: 501
					}),
					a.VIDEO.ytWrapper.css(
					{
						visibility: "visible"
					}), a.VIDEO.removeHTML5elements(), void 0 != a.VIDEO.youtubePlayer && (a.VIDEO.shuffleBtnEnabled ? a.VIDEO.youtubePlayer.cueVideoById(a.videos_array[a.randEnd].youtubeID) : a.VIDEO.youtubePlayer.cueVideoById(a.videos_array[a.videoid].youtubeID), a.VIDEO.youtubePlayer.setSize(e.width(), e.height()), this.hasTouch || a.VIDEO.youtubePlayer.playVideo()), a.VIDEO.youtubePlayer.setPlaybackQuality(a.ytQuality);
				else if("HTML5" == b.videos[a.videoid].videoType || "HTML5 (self-hosted)" == b.videoType) a.preloader.stop().animate(
				{
					opacity: 0
				}, 0, function ()
				{
					c(this).hide()
				}), a.vimeoWrapper.css(
				{
					zIndex: 0
				}), c("iframe#vimeo_video").attr("src", ""), a.VIDEO.ytWrapper.css(
				{
					zIndex: 0
				}), a.VIDEO.ytWrapper.css(
				{
					visibility: "hidden"
				}), a.VIDEO.showHTML5elements(), void 0 != a.VIDEO.youtubePlayer && (a.VIDEO.youtubePlayer.stopVideo(), a.VIDEO.youtubePlayer.clearVideo()), d.canPlayType && d.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, a.VIDEO.shuffleBtnEnabled ? (a.video_path = a.videos_array[a.randEnd].video_path_mp4, a.video_pathAD = a.videos_array[a.randEnd].preroll_mp4) : (a.video_path = a.videos_array[a.videoid].video_path_mp4, a.video_pathAD = a.videos_array[a.videoid].preroll_mp4)), a.VIDEO.resizeAll(), a.VIDEO.shuffleBtnEnabled ? a.VIDEO.load(a.video_path, a.videoid) : a.VIDEO.load(a.video_path, a.randEnd), a.VIDEO.play();
				else if("vimeo" == b.videos[a.videoid].videoType || "Vimeo" == b.videoType) c("iframe#vimeo_video").attr("src", ""), a.preloader.stop().animate(
				{
					opacity: 0
				}, 700, function ()
				{
					c(this).hide()
				}), a.hasTouch ? a.VIDEO.shuffleBtnEnabled ? document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.randEnd].vimeoID + "?autoplay=0?api=1&player_id=vimeo_video&color=" + b.vimeoColor : document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.videoid].vimeoID + "?autoplay=0?api=1&player_id=vimeo_video&color=" + b.vimeoColor : a.VIDEO.shuffleBtnEnabled ? document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.randEnd].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + b.vimeoColor : document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.videoid].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + b.vimeoColor;
				else if("image" == b.videos[a.videoid].videoType || "Image" == b.videoType) a.vimeoWrapper.css(
					{
						zIndex: 0
					}), a.vimeoWrapper.css(
					{
						visibility: "hidden"
					}), c("iframe#vimeo_video").attr("src", ""), a.VIDEO.imageWrapper.css(
					{
						zIndex: 502
					}), a.VIDEO.imageWrapper.css(
					{
						visibility: "visible"
					}), a.VIDEO.imageDisplayed.src = a.videos_array[0].imageUrl,
					c(a.VIDEO.imageDisplayed).load(function ()
					{
						a.VIDEO.setImageTimer()
					})
			}
			else "Restart video" == b.onFinish && a.vimeoPlayer.api("play");
		else "Restart video" == b.onFinish && a.vimeoPlayer.api("play")
	}

	function C(c, p)
	{
		a.vimeo_time = Math.floor(c.seconds);
		a.vimeo_duration = Math.floor(c.duration);
		a.vimeoStatus.text(c.seconds + "s played");
		0 == a.vimeo_time && "yes" == a.videos_array[a.videoid].prerollAD && (a.VIDEO.videoAdStarted = !0, a.videoAdPlayed ? a.vimeoPlayer.api("play") : (a.vimeoPlayer.api("pause"), d.canPlayType && d.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, a.video_pathAD = a.videos_array[a.videoid].preroll_mp4), a.VIDEO.loadAD(a.video_pathAD), a.VIDEO.openAD()));
		a.tim = setInterval(function ()
		{
			if("HTML5" != b.videos[a.videoid].videoType && "HTML5 (self-hosted)" != b.videoType)
			{
				if(a.VIDEO.secondsFormat(a.vimeo_time) == a.videos_array[a.videoid].midrollAD_displayTime)
				{
					if(a.VIDEO.midrollPlayed) return;
					a.VIDEO.midrollPlayed = !0;
					"yes" == a.videos_array[a.videoid].midrollAD && (d.canPlayType && d.canPlayType("video/mp4").replace(/no/, "") && (a.canPlay = !0, a.video_pathAD = a.videos_array[a.videoid].midroll_mp4), a.vimeoPlayer.api("pause"), a.VIDEO.loadAD(a.video_pathAD), a.VIDEO.openAD())
				}
				a.VIDEO.secondsFormat(a.vimeo_time) >= a.VIDEO.secondsFormat(a.vimeo_duration - 1) && 0 < a.vimeo_duration && !a.VIDEO.postrollPlayed && (a.VIDEO.postrollPlayed = !0, "yes" == a.videos_array[a.videoid].postrollAD && (d.canPlayType && d.canPlayType("video/mp4").replace(/no/, "") && (a.canPlay = !0, a.video_pathAD = a.videos_array[a.videoid].postroll_mp4), a.vimeoPlayer.api("pause"), a.VIDEO.loadAD(a.video_pathAD), a.VIDEO.openAD()))
			}
		}, 50);
		"yes" == a.videos_array[a.videoid].popupAdShow && a.VIDEO.enablePopup()
	}

	function h()
	{
		a.vimeoIframe = c("#vimeo_video")[0];
		a.vimeoPlayer = $f(a.vimeoIframe);
		a.vimeoStatus = c(".status");
		a.vimeoPlayer.addEvent("ready", function ()
		{
			a.vimeoPlayer.addEvent("pause", A);
			a.vimeoPlayer.addEvent("finish", B);
			a.vimeoPlayer.addEvent("playProgress", C);
			n && "AD 5 sec + Pieces After Effects project" != a.options.videos[0].title && "Pieces After Effects project" != a.options.videos[0].title && "AD 5 sec + Space Odyssey After Effects Project" != a.options.videos[0].title && "AD 5 sec Swimwear Spring Summer" != a.options.videos[0].title && "i Create" != a.options.videos[0].title && "Swimwear Spring Summer" != a.options.videos[0].title && "PLuFX50GllfgP_mecAi4LV7cYva-WLVnaM" != a.options.youtubePlaylistID && (a.VIDEO.pw(), a.vimeoWrapper.css(
			{
				zIndex: 0
			}), c("iframe#vimeo_video").attr("src", ""))
		})
	}
	var a = this;
	this.VIDEO = k;
	this.element = e;
	this.youtube_array = z;
	if("" != b.youtubePlaylistID || "" != b.youtubeChannelID) b.videos = a.youtube_array;
	this.canPlay = u;
	this.CLICK_EV = v;
	this.hasTouch = w;
	this.preloader = r;
	this.preloaderAD = t;
	this.options = b;
	this.mainContainer = g;
	this.videoid = "VIDEOID";
	this.adStartTime = "ADSTARTTIME";
	this.videoAdPlayed = !1;
	this.rand = Math.floor(Math.random() * b.videos.length + 0);
	this.ytQuality = b.youtubeQuality;
	this.youtubeSTARTED = !1;
	this.deviceAgent = x;
	this.agentID = y;
	this.YTAPI_onPlayerReady = !1;
	this.vimeo_time;
	this.vimeo_duration;
	this.playlist = c("<div />");
	this.playlistContent = c("<div />");
	this.playlistBar = c("<div />");
	this.playlistBar.addClass("elite_vp_playlistBar").addClass("elite_vp_bg");
	this.playlist.append(this.playlistBar);
	this.playlistBarInside = c("<div />");
	this.playlistBarInside.addClass("elite_vp_playlistBarInside");
	this.playlistBar.append(this.playlistBarInside);
	this.lastBtnIcon = c("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-general").addClass("elite_vp_controlsColor").addClass("fa-elite-step-forward").addClass("elite_vp_playerElement").bind(a.CLICK_EV, function ()
	{
		c(a.playlistContent).mCustomScrollbar("scrollTo", "last")
	});
	this.firstBtnIcon = c("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-general").addClass("elite_vp_controlsColor").addClass("fa-elite-step-backward").addClass("elite_vp_playerElement").bind(a.CLICK_EV, function ()
	{
		c(a.playlistContent).mCustomScrollbar("scrollTo", "first")
	});
	this.nextBtnIcon = c("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-general").addClass("elite_vp_controlsColor").addClass("fa-elite-forward").addClass("elite_vp_playerElement");
	this.previousBtnIcon = c("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-general").addClass("elite_vp_controlsColor").addClass("fa-elite-backward").addClass("elite_vp_playerElement");
	this.shuffleBtnIcon = c("<span />").attr("aria-hidden", "true").addClass("fa-elite").addClass("elite-icon-general").addClass("elite_vp_controlsColor").addClass("fa-elite-random").addClass("elite_vp_playerElement").bind(a.CLICK_EV, function ()
	{
		a.VIDEO.toggleShuffleBtn()
	});
	this.lastBtn = c("<div />").addClass("elite_vp_playlistBarBtn");
	this.lastBtn.append(this.lastBtnIcon);
	this.firstBtn = c("<div />").addClass("elite_vp_playlistBarBtn");
	this.firstBtn.append(this.firstBtnIcon);
	this.nextBtn = c("<div />").addClass("elite_vp_playlistBarBtn");
	this.nextBtn.append(this.nextBtnIcon);
	this.previousBtn = c("<div />").addClass("elite_vp_playlistBarBtn");
	this.previousBtn.append(this.previousBtnIcon);
	this.shuffleBtn = c("<div />").addClass("elite_vp_playlistBarBtn");
	this.shuffleBtn.append(this.shuffleBtnIcon);
	this.playlistBarInside.append(this.firstBtn);
	this.playlistBarInside.append(this.previousBtn);
	this.playlistBarInside.append(this.shuffleBtn);
	this.playlistBarInside.append(this.nextBtn);
	this.playlistBarInside.append(this.lastBtn);
	switch(this.options.playlist)
	{
	case "Right playlist":
		this.playlist.attr("id", "elite_vp_playlist");
		this.playlistContent.attr("id", a.options.instanceName + "elite_vp_playlistContent");
		break;
	case "Bottom playlist":
		this.playlist.attr("id", "elite_vp_playlist_bottom"), this.playlistContent.attr("id", "elite_vp_playlistContent_bottom")
	}
	a.videos_array = [];
	a.item_array = [];
	this.vimeoWrapper = c("<div></div>");
	this.vimeoWrapper.attr("id", "elite_vp_vimeoWrapper");
	a.element && a.element.append(a.vimeoWrapper);
	c("#elite_vp_vimeoWrapper").html('<iframe id="vimeo_video" src="" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
	var l = 0,
		m = 0;
	this.onPlayerReady = function (c)
	{
		a.YTAPI_onPlayerReady = !0;
		if("youtube" == b.videos[0].videoType || "YouTube" == b.videoType)
		{
			a.VIDEO.playButtonScreen.hide();
			c = !1;
			var d = window.navigator.userAgent,
				e = d.indexOf("MSIE "),
				d = d.indexOf("Trident/");
			if(-1 < e || -1 < d) c = !0;
			c ? ("Yes" == b.loadRandomVideoOnStart ? a.VIDEO.youtubePlayer.loadVideoById(a.videos_array[a.rand].youtubeID) : a.VIDEO.youtubePlayer.loadVideoById(a.videos_array[0].youtubeID), a.VIDEO.youtubePlayer.pauseVideo()) : "Yes" == b.loadRandomVideoOnStart ? a.VIDEO.youtubePlayer.cueVideoById(a.videos_array[a.rand].youtubeID) : a.VIDEO.youtubePlayer.cueVideoById(a.videos_array[0].youtubeID);
			a.VIDEO.youtubePlayer.setPlaybackQuality(a.ytQuality);
			this.hasTouch || b.autoplay && a.VIDEO.youtubePlayer.playVideo();
			a.VIDEO.resizeAll();
			n && "AD 5 sec + Pieces After Effects project" != a.options.videos[0].title && "Pieces After Effects project" != a.options.videos[0].title && "AD 5 sec + Space Odyssey After Effects Project" != a.options.videos[0].title && "AD 5 sec Swimwear Spring Summer" != a.options.videos[0].title && "i Create" != a.options.videos[0].title && "Swimwear Spring Summer" != a.options.videos[0].title && "PLuFX50GllfgP_mecAi4LV7cYva-WLVnaM" != a.options.youtubePlaylistID && (a.VIDEO.pw(), void 0 != a.VIDEO.youtubePlayer && (a.VIDEO.youtubePlayer.stopVideo(), a.VIDEO.youtubePlayer.clearVideo(), a.VIDEO.youtubePlayer.setSize(1, 1)));
			a.popupTimer = setInterval(function ()
			{
				"yes" == a.videos_array[a.videoid].popupAdShow && a.VIDEO.enablePopup()
			}, 1E3)
		}
	};
	this.onPlayerStateChange = function (f)
	{
		var p = Math.floor(a.VIDEO.youtubePlayer.getCurrentTime());
		1 === f.data && 0 == p && (a.youtubeSTARTED = !0, a.VIDEO.calculateYoutubeTotalTime(a.VIDEO.youtubePlayer.getDuration()));
		if(1 === f.data) e.removeClass("vp_paused"),
			e.addClass("elite_vp_playing"), k.change("elite_vp_playing"), a.VIDEO.play(), a._timer = setInterval(function ()
			{
				if("HTML5" != b.videos[a.videoid].videoType && "HTML5 (self-hosted)" != b.videoType)
				{
					a.progressWidth = a.VIDEO.youtubePlayer.getCurrentTime() / a.VIDEO.youtubePlayer.getDuration() * a.VIDEO.videoTrack.width();
					a.VIDEO.videoTrackProgress.css("width", a.progressWidth);
					a.progressIdleWidth = a.VIDEO.youtubePlayer.getCurrentTime() / a.VIDEO.youtubePlayer.getDuration() * a.VIDEO.progressIdleTrack.width();
					a.VIDEO.progressIdle.css("width", a.progressIdleWidth);
					a.VIDEO.calculateYoutubeElapsedTime(a.VIDEO.youtubePlayer.getCurrentTime());
					a.buffered = a.VIDEO.youtubePlayer.getVideoLoadedFraction();
					a.downloadWidth = a.buffered * a.VIDEO.videoTrack.width();
					a.VIDEO.videoTrackDownload.css("width", a.downloadWidth);
					a.progressIdleDownloadWidth = a.buffered * a.VIDEO.progressIdleTrack.width();
					a.VIDEO.progressIdleDownload.css("width", a.progressIdleDownloadWidth);
					if(a.VIDEO.secondsFormat(a.VIDEO.youtubePlayer.getCurrentTime()) == a.videos_array[a.videoid].midrollAD_displayTime)
					{
						if(a.VIDEO.midrollPlayed) return;
						a.VIDEO.midrollPlayed = !0;
						"yes" == a.videos_array[a.videoid].midrollAD && (d.canPlayType && d.canPlayType("video/mp4").replace(/no/, "") && (a.canPlay = !0, a.video_pathAD = a.videos_array[a.videoid].midroll_mp4), a.VIDEO.youtubePlayer.pauseVideo(), a.VIDEO.loadAD(a.video_pathAD), a.VIDEO.openAD())
					}
					a.VIDEO.secondsFormat(a.VIDEO.youtubePlayer.getCurrentTime()) >= a.VIDEO.secondsFormat(a.VIDEO.youtubePlayer.getDuration() - 1) && 0 < a.VIDEO.youtubePlayer.getDuration() && !a.VIDEO.postrollPlayed && (a.VIDEO.postrollPlayed = !0, "yes" == a.videos_array[a.videoid].postrollAD && (d.canPlayType && d.canPlayType("video/mp4").replace(/no/, "") && (a.canPlay = !0, a.video_pathAD = a.videos_array[a.videoid].postroll_mp4), a.VIDEO.youtubePlayer.pauseVideo(), a.VIDEO.loadAD(a.video_pathAD), a.VIDEO.openAD()))
				}
			}, 50);
		else if(2 === f.data) clearInterval(a._timer), e.addClass("vp_paused"), e.removeClass("elite_vp_playing"), k.change("vp_paused"), a.VIDEO.pause();
		else if(0 === f.data)
			if(a.VIDEO.midrollPlayed = !1, a.VIDEO.postrollPlayed = !1, a.randEnd = Math.floor(Math.random() * b.videos.length + 0), a.videoAdPlayed = !1, a.videoid = parseInt(a.videoid) + 1, a.videos_array.length == a.videoid && (a.videoid = 0), "Play next video" == b.onFinish)
			{
				switch(a.options.playlist)
				{
				case "Right playlist":
					a.VIDEO.shuffleBtnEnabled ? a.VIDEO.setPlaylistItem(a.randEnd) : a.VIDEO.setPlaylistItem(a.videoid);
					break;
				case "Bottom playlist":
					g.find(".elite_vp_itemSelected_bottom").removeClass("elite_vp_itemSelected_bottom").addClass("elite_vp_itemUnselected_bottom");
					a.VIDEO.shuffleBtnEnabled ? c(a.item_array[a.randEnd]).removeClass("elite_vp_itemUnselected_bottom").addClass("elite_vp_itemSelected_bottom") : c(a.item_array[a.videoid]).removeClass("elite_vp_itemUnselected_bottom").addClass("elite_vp_itemSelected_bottom");
					break;
				case "Off":
					a.VIDEO.shuffleBtnEnabled ? a.VIDEO.setPlaylistItem(a.randEnd) : a.VIDEO.setPlaylistItem(a.videoid)
				}
				if("youtube" == b.videos[a.videoid].videoType || "YouTube" == b.videoType) a.VIDEO.closeAD(), a.videoAdPlayed = !1, a.VIDEO.ytWrapper.css(
				{
					zIndex: 501
				}), a.VIDEO.ytWrapper.css(
				{
					visibility: "visible"
				}), a.VIDEO.removeHTML5elements(), void 0 != a.VIDEO.youtubePlayer && (a.VIDEO.shuffleBtnEnabled ? a.VIDEO.youtubePlayer.cueVideoById(a.videos_array[a.randEnd].youtubeID) : a.VIDEO.youtubePlayer.cueVideoById(a.videos_array[a.videoid].youtubeID), a.VIDEO.youtubePlayer.setSize(e.width(), e.height()), this.hasTouch || a.VIDEO.youtubePlayer.playVideo()), a.VIDEO.youtubePlayer.setPlaybackQuality(a.ytQuality);
				else if("vimeo" == b.videos[a.videoid].videoType || "Vimeo" == b.videoType) a.VIDEO.hideCustomControls(), a.preloader.stop().animate(
				{
					opacity: 0
				}, 700, function ()
				{
					c(this).hide()
				}), a.vimeoWrapper.css(
				{
					zIndex: 501
				}), "click" == a.CLICK_EV && (a.VIDEO.shuffleBtnEnabled ? document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.randEnd].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + b.vimeoColor : document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.videoid].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + b.vimeoColor), "touchend" == a.CLICK_EV && (a.VIDEO.shuffleBtnEnabled ? document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.randEnd].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + b.vimeoColor : document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.videoid].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + b.vimeoColor), a.VIDEO.removeHTML5elements(), a.VIDEO.ytWrapper.css(
				{
					zIndex: 0
				}), a.VIDEO.ytWrapper.css(
				{
					visibility: "hidden"
				}), void 0 != a.VIDEO.youtubePlayer && (a.VIDEO.youtubePlayer.stopVideo(), a.VIDEO.youtubePlayer.clearVideo()), h();
				else if("HTML5" == b.videos[a.videoid].videoType || "HTML5 (self-hosted)" == b.videoType) a.VIDEO.ytWrapper.css(
				{
					zIndex: 0
				}), a.VIDEO.ytWrapper.css(
				{
					visibility: "hidden"
				}), a.VIDEO.showHTML5elements(), void 0 != a.VIDEO.youtubePlayer && (a.VIDEO.youtubePlayer.stopVideo(), a.VIDEO.youtubePlayer.clearVideo()), d.canPlayType && d.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, a.VIDEO.shuffleBtnEnabled ? (a.video_path = a.videos_array[a.randEnd].video_path_mp4, a.video_pathAD = a.videos_array[a.randEnd].preroll_mp4) : (a.video_path = a.videos_array[a.videoid].video_path_mp4, a.video_pathAD = a.videos_array[a.videoid].preroll_mp4)), a.VIDEO.resizeAll(), a.VIDEO.shuffleBtnEnabled ? a.VIDEO.load(video_path, a.randEnd) : a.VIDEO.load(video_path, a.videoid), a.VIDEO.play();
				else if("image" == b.videos[a.videoid].videoType || "Image" == b.videoType) a.VIDEO.hideCustomControls(), a.VIDEO.hideVideoElements(), a.VIDEO.ytWrapper.css(
					{
						zIndex: 0
					}), a.VIDEO.ytWrapper.css(
					{
						visibility: "hidden"
					}), a.vimeoWrapper.css(
					{
						zIndex: 0
					}), a.vimeoWrapper.css(
					{
						visibility: "hidden"
					}),
					a.VIDEO.imageWrapper.css(
					{
						zIndex: 502
					}), a.VIDEO.imageWrapper.css(
					{
						visibility: "visible"
					}), a.VIDEO.imageDisplayed.src = a.videos_array[0].imageUrl, c(a.VIDEO.imageDisplayed).load(function ()
					{
						a.VIDEO.setImageTimer()
					})
			}
			else "Restart video" == b.onFinish && void 0 != a.VIDEO.youtubePlayer && (a.VIDEO.youtubePlayer.seekTo(0), a.VIDEO.youtubePlayer.playVideo());
		if(1 === f.data && 0 == p && "yes" == a.videos_array[a.videoid].prerollAD) a.VIDEO.videoAdStarted = !0, a.videoAdPlayed ? a.VIDEO.youtubePlayer.playVideo() : (a.VIDEO.youtubePlayer.pauseVideo(), d.canPlayType && d.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, a.video_pathAD = a.videos_array[a.videoid].preroll_mp4), a.VIDEO.loadAD(a.video_pathAD), a.VIDEO.openAD());
		else if(f.data == YT.PlayerState.PLAYING || f.data == YT.PlayerState.CUED) a.youtubePLAYING = !0
	};
	var q = -1;
	c(b.videos).each(function ()
	{
		q += 1;
		var d = {
			id: q,
			title: this.title,
			videoType: this.videoType,
			youtubeID: this.youtubeID,
			vimeoID: this.vimeoID,
			video_path_mp4: this.mp4,
			imageUrl: this.imageUrl,
			imageTimer: this.imageTimer,
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
			popupImg: this.popupImg,
			popupAdShow: this.popupAdShow,
			popupAdStartTime: this.popupAdStartTime,
			popupAdEndTime: this.popupAdEndTime,
			popupAdGoToLink: this.popupAdGoToLink,
			description: this.description,
			thumbnail_image: this.thumbImg,
			info_text: this.info
		};
		a.videos_array.push(d);
		a.nowPlayingThumbnail = c("<div />");
		a.nowPlayingThumbnail.addClass("elite_vp_nowPlayingThumbnail");
		a.nowPlayingThumbnail.text("NOW PLAYING");
		a.nowPlayingThumbnail.hide();
		a.itemLeft = c("<div />");
		a.itemLeft.addClass("elite_vp_itemLeft");
		a.i = document.createElement("img");
		a.i.onload = function ()
		{
			a.thumbImageW = this.width;
			a.thumbImageH = this.height
		};
		a.i.src = d.thumbnail_image;
		a.itemLeft.append(a.i);
		a.itemLeft.append(a.nowPlayingThumbnail);
		c(a.i).addClass("elite_vp_thumbnail_image elite_vp_themeColorThumbBorder");
		var e = '<div class="elite_vp_itemRight"><div class="elite_vp_title elite_vp_themeColorText">' + d.title + '</div><div class="elite_vp_description elite_vp_controlsColor"> ' + d.description + "</div></div>";
		switch(b.playlist)
		{
		case "Right playlist":
			a.item = c("<div />");
			a.item.addClass("elite_vp_item").css("top", String(m) + "px");
			a.item_array.push(a.item);
			a.item.addClass("elite_vp_itemUnselected");
			a.item.append(a.itemLeft);
			a.item.append(e);
			m += 80;
			break;
		case "Bottom playlist":
			a.item = c("<div />"), a.item.addClass("elite_vp_item_bottom").css("left", String(l) + "px"), a.item_array.push(a.item), a.item.addClass("elite_vp_itemUnselected_bottom"), a.item.append(a.itemLeft), a.item.append(e), l += 245
		}
		a.playlistContent.append(a.item);
		void 0 != a.item && a.item.bind(a.CLICK_EV, function ()
		{
			a.preloader && a.preloader.stop().animate(
			{
				opacity: 1
			}, 0, function ()
			{
				c(this).show()
			});
			a.videoid = d.id;
			a.VIDEO.setPlaylistItem(a.videoid);
			a.VIDEO.resetPlayer();
			a.VIDEO.resetPlayerAD();
			a.VIDEO.resizeAll();
			h();
			a.VIDEO.playVideoById(a.videoid);
			a.youtubeSTARTED = !1;
			n && "AD 5 sec + Pieces After Effects project" != a.options.videos[0].title && "Pieces After Effects project" != a.options.videos[0].title && "AD 5 sec + Space Odyssey After Effects Project" != a.options.videos[0].title && "AD 5 sec Swimwear Spring Summer" != a.options.videos[0].title && "i Create" != a.options.videos[0].title && "Swimwear Spring Summer" != a.options.videos[0].title && "PLuFX50GllfgP_mecAi4LV7cYva-WLVnaM" != a.options.youtubePlaylistID && a.VIDEO.pw()
		})
	});
	switch(a.options.playlist)
	{
	case "Right playlist":
		"Yes" == b.loadRandomVideoOnStart ? (c(a.item_array[a.rand]).removeClass("elite_vp_itemUnselected").addClass("elite_vp_itemSelected"), a.item_array[a.rand].find(".elite_vp_thumbnail_image").removeClass("elite_vp_thumbnail_image").addClass("elite_vp_thumbnail_imageSelected")) : (c(a.item_array[0]).removeClass("elite_vp_itemUnselected").addClass("elite_vp_itemSelected"), a.item_array[0].find(".elite_vp_thumbnail_image").removeClass("elite_vp_thumbnail_image").addClass("elite_vp_thumbnail_imageSelected"));
		break;
	case "Bottom playlist":
		"Yes" == b.loadRandomVideoOnStart ? c(a.item_array[a.rand]).removeClass("elite_vp_itemUnselected_bottom").addClass("elite_vp_itemSelected_bottom") : c(a.item_array[0]).removeClass("elite_vp_itemUnselected_bottom").addClass("elite_vp_itemSelected_bottom")
	}
	a.videoid = "Yes" == b.loadRandomVideoOnStart ? a.rand : 0;
	if("youtube" == b.videos[0].videoType || "YouTube" == b.videoType) a.VIDEO.imageWrapper.css(
	{
		zIndex: 0
	}), a.VIDEO.imageWrapper.css(
	{
		visibility: "none"
	}), a.VIDEO.hideVideoElements(), a.preloader.stop().animate(
	{
		opacity: 0
	}, 0, function ()
	{
		c(this).hide()
	}), a.VIDEO.ytWrapper.css(
	{
		zIndex: 501
	}), a.VIDEO.ytWrapper.css(
	{
		visibility: "visible"
	}), a.vimeoWrapper.css(
	{
		zIndex: 0
	});
	else if("HTML5" == b.videos[0].videoType || "HTML5 (self-hosted)" == b.videoType) a.VIDEO.imageWrapper.css(
	{
		zIndex: 0
	}), a.VIDEO.imageWrapper.css(
	{
		visibility: "none"
	}), a.VIDEO.ytWrapper.css(
	{
		zIndex: 0
	}), a.VIDEO.ytWrapper.css(
	{
		visibility: "hidden"
	}), a.vimeoWrapper.css(
	{
		zIndex: 0
	}), d.canPlayType && d.canPlayType("video/mp4").replace(/no/, "") && (this.canPlay = !0, "Yes" == b.loadRandomVideoOnStart ? (a.video_path = a.videos_array[a.rand].video_path_mp4, a.video_pathAD = a.videos_array[a.rand].preroll_mp4) : (a.video_path = a.videos_array[0].video_path_mp4, a.video_pathAD = a.videos_array[0].preroll_mp4)), a.VIDEO.load(a.video_path, "0");
	else if("vimeo" == b.videos[0].videoType || "Vimeo" == b.videoType) a.VIDEO.imageWrapper.css(
		{
			zIndex: 0
		}), a.VIDEO.imageWrapper.css(
		{
			visibility: "none"
		}), a.VIDEO.hideCustomControls(), a.VIDEO.hideVideoElements(), a.preloader.stop().animate(
		{
			opacity: 0
		}, 700, function ()
		{
			c(this).hide()
		}), a.vimeoWrapper.css(
		{
			zIndex: 501
		}),
		a.hasTouch ? "Yes" == b.loadRandomVideoOnStart ? document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.rand].vimeoID + "?autoplay=0?api=1&player_id=vimeo_video&color=" + b.vimeoColor : document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[0].vimeoID + "?autoplay=0?api=1&player_id=vimeo_video&color=" + b.vimeoColor : b.autoplay ? "Yes" == b.loadRandomVideoOnStart ? document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.rand].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + b.vimeoColor : document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[0].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + b.vimeoColor : "Yes" == b.loadRandomVideoOnStart ? document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[a.rand].vimeoID + "?autoplay=0?api=1&player_id=vimeo_video&color=" + b.vimeoColor : document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + a.videos_array[0].vimeoID + "?autoplay=0?api=1&player_id=vimeo_video&color=" + b.vimeoColor, h();
	else if("image" == b.videos[0].videoType || "Image" == b.videoType) a.VIDEO.hideCustomControls(), a.VIDEO.hideVideoElements(), a.VIDEO.ytWrapper.css(
		{
			zIndex: 0
		}), a.VIDEO.ytWrapper.css(
		{
			visibility: "hidden"
		}), a.vimeoWrapper.css(
		{
			zIndex: 0
		}), a.vimeoWrapper.css(
		{
			visibility: "hidden"
		}), a.VIDEO.imageWrapper.css(
		{
			zIndex: 502
		}), a.VIDEO.imageWrapper.css(
		{
			visibility: "visible"
		}), a.VIDEO.imageDisplayed.src = a.videos_array[0].imageUrl,
		c(a.VIDEO.imageDisplayed).load(function ()
		{
			b.autoplay && a.VIDEO.setImageTimer()
		});
	a.nextBtn.bind(a.CLICK_EV, function ()
	{
		a.VIDEO.shuffleBtnEnabled ? (a.VIDEO.generateRandomNumber(), a.videoid = a.VIDEO.rand) : (a.videoid += 1, a.videoid >= b.videos.length && (a.videoid = 0));
		a.VIDEO.setPlaylistItem(a.videoid);
		a.VIDEO.playVideoById(a.videoid);
		h()
	});
	a.previousBtn.bind(a.CLICK_EV, function ()
	{
		a.VIDEO.shuffleBtnEnabled ? (a.VIDEO.generateRandomNumber(), a.videoid = a.VIDEO.rand) : (--a.videoid, 0 > a.videoid && (a.videoid = b.videos.length - 1));
		a.VIDEO.setPlaylistItem(a.videoid);
		a.VIDEO.playVideoById(a.videoid);
		h()
	});
	a.totalWidth = b.videoPlayerWidth;
	a.totalHeight = b.videoPlayerHeight;
	"Right playlist" != b.playlist && "Bottom playlist" != b.playlist || !a.element || (g.append(a.playlist), a.playlist.append(a.playlistContent));
	this.playlistW = this.playlist.width();
	this.playlistH = this.playlist.height();
	"Right playlist" == b.playlist ? (a.playlistContent.css("height", String(m) + "px"), a.playerWidth = a.totalWidth - a.playlist.width(), a.playerHeight = a.totalHeight - a.playlist.height(), a.playlist.css(
	{
		height: "100%",
		top: 0
	}), a.playlistContent.height(g.height() - 50), c(a.playlistContent).mCustomScrollbar(
	{
		theme: a.options.playlistScrollType,
		scrollButtons:
		{
			enable: !0
		},
		callbacks:
		{
			onScrollStart: function () {},
			onScroll: function () {}
		}
	})) : "Bottom playlist" == b.playlist && (a.playlistContent.css("width", String(l) + "px"), a.playerWidth = a.totalWidth, a.playerHeight = a.totalHeight - a.playlist.height(), a.playlist.css(
	{
		left: 0,
		width: "100%",
		top: a.playerHeight
	}), a.playlistContent.width() < a.playlist.width() || (a.scroll = new iScroll(a.playlist[0],
	{
		snap: a.item,
		bounce: !1,
		wheelHorizontal: !0,
		scrollbarClass: a.options.instanceName + "elite_vp_myScrollbar",
		momentum: !0
	}), a.leftArrow = c("<div />").addClass("elite_vp_leftArrow"), a.playlist.append(a.leftArrow), a.rightArrow = c("<div />").addClass("elite_vp_rightArrow"), a.playlist.append(a.rightArrow), a.leftArrowInside = c("<div />").attr("aria-hidden", "true").attr("title", "Previous").addClass("fa-elite").addClass("elite-icon-general").addClass("fa-elite-angle-double-left"), a.leftArrow.append(a.leftArrowInside), a.rightArrowInside = c("<div />").attr("aria-hidden", "true").attr("title", "Next").addClass("fa-elite").addClass("elite-icon-general").addClass("fa-elite-angle-double-right"), a.rightArrow.append(a.rightArrowInside), a.leftArrow.bind(a.CLICK_EV, function ()
	{
		a.scroll.scrollToPage("prev", 0);
		return !1
	}), a.rightArrow.bind(a.CLICK_EV, function ()
	{
		a.scroll.scrollToPage("next", 0);
		return !1
	})))
};
PLAYER.Playlist.prototype = {};
PLAYER.Playlist.prototype.hidePlaylist = function ()
{
	this.playlist.hide()
};
PLAYER.Playlist.prototype.showPlaylist = function ()
{
	this.playlist.show()
};
PLAYER.Playlist.prototype.resizePlaylist = function (c, k)
{
	switch(this.options.playlist)
	{
	case "Right playlist":
		this.playlist.css(
		{
			right: 0,
			height: "100%"
		});
		this.playlistContent.css(
		{
			top: 0,
			height: this.mainContainer.height() - 50
		});
		break;
	case "Bottom playlist":
		this.playlist.css(
		{
			right: 0,
			height: this.playlist.height(),
			width: "100%",
			top: this.element.height()
		})
	}
	this.playlistBarInside.css(
	{
		left: this.playlistBar.width() / 2 - this.playlistBarInside.width() / 2
	})
};
PLAYER.Playlist.prototype.playYoutube = function (c)
{
	void 0 != this.VIDEO.youtubePlayer && (this.VIDEO.youtubePlayer.cueVideoById(this.videos_array[c].youtubeID), this.VIDEO.youtubePlayer.setPlaybackQuality(this.ytQuality), this.preloader.hide(), this.VIDEO.ytWrapper.css(
	{
		zIndex: 501
	}), this.VIDEO.ytWrapper.css(
	{
		visibility: "visible"
	}), this.hasTouch || this.VIDEO.youtubePlayer.playVideo());
	this.VIDEO.resizeAll()
};
PLAYER.Playlist.prototype.playVimeo = function (c)
{
	this.preloader.hide();
	this.vimeoWrapper.css(
	{
		zIndex: 501
	});
	this.hasTouch ? document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + this.videos_array[c].vimeoID + "?autoplay=0?api=1&player_id=vimeo_video&color=" + this.options.vimeoColor : document.getElementById("vimeo_video").src = "http://player.vimeo.com/video/" + this.videos_array[c].vimeoID + "?autoplay=1?api=1&player_id=vimeo_video&color=" + this.options.vimeoColor
};
