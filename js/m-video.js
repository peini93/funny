var isVideoJSLoaded = true;

var playlist = {};

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
	//var ad_code = "123";
	


	this.play_prev = function () {};
	this.play_next = function () {};
	this.play = function () {};
	this.stop = function () {};
	this.index = index;
	this.source = source;

	//if(index%2 == 1){
		if(index == 2){
	
		this.container = $("<p>")
			.attr("id", "player-container-"+index)
			.append("<span>影片" + (index+1) + "</span>")
			.append(player_dom)
			.append('<iframe src="/banner320x50.html" style="width:320px;height:50px;border:0px;"></iframe>')
			.appendTo("#contents");
			

			
	}else{	
		this.container = $("<p>")
			.attr("id", "player-container-"+index)
			.append("<span>影片" + (index+1) + "</span>")
			.append(player_dom)
			.appendTo("#contents");
	}


	this.ready = function () {
		if (this.index == 0 && playlist.current === undefined) {
			this.play();
		}
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
			height: "100%",
			width: "100%",
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

		this.stop = function () {
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
			.attr("poster", source['src'])
			.append(src);

		GM_Video.call(this, index, source, video);

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

			instance.player.setCurrentTime(0);
			instance.player.play();
		};

		this.stop = function () {
			instance.player.pause();
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
			screenfull.exit();
		};
	}
};


function Playlist(sources) {
	
	playlist.players = sources.map(function (source, index) {
		return new Video[source['type']](index, source);
	});
}

function onYouTubeIframeAPIReady() {
	Playlist(sources);
}