$(function () {
	var body_class = $("body").attr("class");
	
	if ( body_class != "sinlgeArticlePage sinlgeLotto" && body_class != "sinlge-page sinlge-article sinlgeLotto") {
		var selector = "#contents img, #comment_rect .text img";
	} else {
		var selector = "#comment_rect .text img";
	}
	
	var items = $(selector).map(function(index) {
		var src = $(this).attr("origin");
		
		if (src == undefined || src == "" || src == null) {
			src = $(this).attr("src");
		}

		if (src == undefined || src == "" || src == null) {
			src = $(this).attr("data-cfsrc");
		}

		return {
			src: src,
			w:0,
			h:0,
			pid: index+1
		};
	});

	var openPhotoSwipe = function(index, disableAnimation, fromURL) {
		var pswpElement = document.querySelectorAll('.pswp')[0],
			gallery,
			options,

		options = {};

		// PhotoSwipe opened from URL
		if(fromURL) {
			if(options.galleryPIDs) {
				// parse real index when custom PIDs are used 
				// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
				for(var j = 0; j < items.length; j++) {
					if(items[j].pid == index) {
						options.index = j;
						break;
					}
				}
			} else {
				// in URL indexes start from 1
				options.index = parseInt(index, 10) - 1;
			}
		} else {
			options.index = parseInt(index, 10);
		}

		// exit if index not found
		if( isNaN(options.index) ) {
			return;
		}


		if(disableAnimation) {
			options.showAnimationDuration = 0;
		}

		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

		// for unknown size photo
		gallery.listen('gettingData', function(index, item) {
			if (item.w < 1 || item.h < 1) { // unknown size
				var img = new Image(); 
				img.onload = function() { // will get size after load
					item.w = this.width; // set image width
					item.h = this.height; // set image height
					gallery.invalidateCurrItems(); // reinit Items
					gallery.updateSize(true); // reinit Items
				}
				img.src = item.src; // let's download image
			}
		});

		gallery.init();
	};

	var onThumbnailsClick = function(e){
		e = e || window.event;
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		openPhotoSwipe($(this).attr("index"));
	};
	if ( body_class != "sinlgeArticlePage sinlgeLotto" && body_class != "sinlge-page sinlge-article sinlgeLotto") {
		
			$("#contents img,#comment_rect .text img").each(function(index){
				$(this).attr("index", index);
				$(this).click(onThumbnailsClick);
			});
	} else {
		
		$("#comment_rect .text img").each(function(index){
				$(this).attr("index", index);
				$(this).click(onThumbnailsClick);
			});
	}

	// parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function() {
		var hash = window.location.hash.substring(1),
		params = {};

		if(hash.length < 5) {
			return params;
		}

		var vars = hash.split('&');
		for (var i = 0; i < vars.length; i++) {
			if(!vars[i]) {
					continue;
			}
			var pair = vars[i].split('=');
			if(pair.length < 2) {
					continue;
			}
			params[pair[0]] = pair[1];
		}

		if(params.gid) {
			params.gid = parseInt(params.gid, 10);
		}

		return params;
	};

	var hashData = photoswipeParseHash();

	if(hashData.pid && hashData.gid) {
		openPhotoSwipe( hashData.pid, true, true );
	}

});
