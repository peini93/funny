var isVideoJSLoaded = true;

var playlist = {};
if (isMobile === undefined) {
	isMobile = 0;
}

if (isMobile) {
	var player_width = 854;
	var player_height = 480;
} else {
	var player_width = 728;
	var player_height = 410;
}

$(function () {
	$("#fullscreen").on("click", function() {
		if (screenfull.enabled) {
			screenfull.request($(".videoBox")[0]);
			screenfull.on("change", function(){
				if (screenfull.isFullscreen) {
					playlist.current.fullscreen(true);
				} else {
					playlist.current.fullscreen(false);
				}
			});
		}
	});

	$(".videoBox").mouseover(function () {
		$(".playlist_bar").show();
	});
	$(".videoBox").mouseleave(function () {
		$(".playlist_bar").hide();
	});
	setTimeout(function() {
		$(".playlist_bar").hide();
		console.log("hide bar");
	}, 5000);

	$(".repaly a").on("click", function () {
		$(".videoBoxOver").hide();
		playlist.players[0].play();
	});
})

/**
 * video father object
 */
function GM_Video(index, source, player_dom) {
	var instance = this;

	this.play_prev = function () {};
	this.play_next = function () {};
	this.play = function () {};
	this.stop = function () {};
	this.index = index;
	this.source = source;

	this.container = $("<div>")
		.hide()
		.attr("id", "player-container-"+index)
		.append(player_dom)
		.appendTo("#player-group");

	this.button = $('<li class="item"><a href="javascript:;"></a></li>')
		.on("click", function() {
			if (playlist.current !== undefined) {
				playlist.current.stop();
			}
			
			instance.play();
		})
		.appendTo(".controls-direction-dot");

	this.ready = function () {
		if (this.index == 0 && playlist.current === undefined) {
			this.play();
		}
	}

	this._play = function () {
		playlist.current = instance;
		instance.change_Next_Prev();
		instance.button.addClass("on");
		instance.container.show();
	}

	this.change_Next_Prev = function () {
		if (this.index == 0) {
			$(".controls-prev").hide();
		} else {
			$(".controls-prev").show();
			$(".controls-prev").off("click");
			$(".controls-prev").on("click", function (){
				instance.stop();
				instance.play_prev()
			});
		}
		
		$(".controls-next").off("click");
		$(".controls-next").on("click", function (){
			instance.stop();
			instance.play_next()
		});
	}
}

var Video = {
	"youtube": function (index, source) {
		console.log("build youtube player");
		var instance = this;

		var player_id = "player-"+index;
		var video = $("<div>")
			.attr("id", player_id);

		GM_Video.call(this, index, source, video);

		this.player = new YT.Player("player-"+this.index, {
			height: player_height,
			width: player_width,
			videoId: this.source["object_id"],
			playerVars: {
				html5: 1,
				controls: 1,
				modestbranding: 1,
				showinfo: 1,
				start: this.source['start_time'],
				end: this.source['end_time'],
				loop : 1 
			},
			events: {
				onReady: function (event) {
					instance.ready();
				},
				onStateChange: function (event) {
					if(event.data === 0) {
						instance.stop();
						if (instance.play_next !== undefined) {
							instance.play_next();
						}
					}
				}
			}
		});

		this.play = function () {
			playlist.current = instance;
			instance.change_Next_Prev();
			instance.button.addClass("on");
			instance.container.show();

			if (instance.player.a !== null) {
				instance.player.playVideo();
			} else {
				instance.player = new YT.Player("player-"+instance.index, {
					height: player_height,
					width: player_width,
					videoId: instance.source["object_id"],
					playerVars: {
						html5: 1,
						controls: 1,
						modestbranding: 1,
						showinfo: 1,
						start: instance.source['start_time'],
						end: instance.source['end_time']
					},
					events: {
						onReady: function (event) {
							instance.play();
						},
						onStateChange: function (event) {
							if(event.data === 0) {
								instance.stop();
								if (instance.play_next !== undefined) {
									instance.play_next();
								}
							}
						}
					}
				});
			}
		}

		this.stop = function () {
			try {
				instance.player.destroy();
			} catch (e) {}
			
			instance.container.hide();
			instance.button.removeClass("on");

			screenfull.exit();
		}
	},

	"twitch_clip": function twitch_clip_Video(index, source) {
		console.log("build twitch_clip try");
		var instance = this;

		var player_id = "player-"+index;

		var src = $("<source>")
			.attr("type", "video/mp4")
			.attr("src", source['video_url']);

		var video = $("<video>")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("id", player_id)
			.append(src);

		GM_Video.call(this, index, source, video);

		if (this.index == 0 && playlist.current === undefined) {
			playlist.current = instance;
			this.change_Next_Prev();
			//video.attr("autoplay", "true");
			this.button.addClass("on");
			this.container.show();
		}

		this.player = new MediaElementPlayer('#'+player_id,{
			loop: false,
			autoRewind: false,
			success: function(media, node) {
				media.addEventListener('canplay', function (e) {
					if (this.index == 0 && playlist.current === undefined) {
						playlist.current = instance;
					}
				});
				media.addEventListener('ended', function (e) {
					instance.stop();
					if (instance.play_next !== undefined) {
						instance.play_next();
					}
				});
			}
		});

		this.play = function () {
			playlist.current = instance;

			instance.change_Next_Prev();
			instance.button.addClass("on");
			instance.container.show();

			instance.player.setCurrentTime(0);
			instance.player.play();
		};

		this.stop = function () {
			instance.player.pause();
			instance.container.hide();
			instance.button.removeClass("on");

			screenfull.exit();
		};
	},

	"fb_video": function (index, source) {
		console.log("build fb_video player");
		var instance = this;

		var player_id = "player-"+index;

		var video = $("<div>")
			.addClass("fb-video")
			.attr("id", "fb-video-"+index)
			.attr("data-href", source['video_url'])
			.attr("data-width", "auto")
			.attr("data-height", "auto")
			.attr("data-allowfullscreen", "true");

		GM_Video.call(this, index, source, video);

		this.player = function(){};

		FB.Event.subscribe('xfbml.ready', function(msg) {
			if (msg.type === 'video') {
				instance.player = msg.instance;
				
				if (instance.index == 0 /*&& playlist.current === undefined*/) {
					instance.play();
				}

				instance.player.subscribe('finishedPlaying', function(e) {
					instance.stop();
					instance.play_next();
				});
			}
		});

		this.play = function () {
			playlist.current = instance;
			instance.change_Next_Prev();
			instance.button.addClass("on");
			instance.container.show();

			instance.player.seek(0);
			instance.player.play();
		};

		this.stop = function () {
			instance.player.pause();
			instance.container.hide();
			instance.button.removeClass("on");

			screenfull.exit();
		};
	}
};


function Playlist(sources) {
	
	playlist.players = sources.map(function (source, index) {
		return new Video[source['type']](index, source);
	});

	for ( i=0 ; i<playlist.players.length-1; i++) {
		playlist.players[i].play_next = playlist.players[i+1].play;
	}

	playlist.players[playlist.players.length-1].play_next = function () {
		$(".videoBoxOver").show();
	}

	for ( i=1 ; i<playlist.players.length; i++) {
		playlist.players[i].play_prev = playlist.players[i-1].play;
	}

	playlist.stop_all = function() {
		for ( i=0 ; i<playlist.players.length; i++) {
			playlist.players[i].stop();
		}
	}
}

function onYouTubeIframeAPIReady() {
	Playlist(sources);
}