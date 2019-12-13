// fancybox
jQuery("#cancelpop").click(function(){
	parent.jQuery.fancybox.close();
});


$(".fancybox").fancybox({
	autoScale : false,
	type       :'iframe',
	padding    : 0,
	closeClick : false,
	// other options
	beforeLoad : function(){
		var url= $(this.element).attr("id");
		this.href = url
	}
});


$(document).ready(function() {
	$(".playnewsvideo").fancybox({
		maxWidth  : '100%',
		maxHeight : '100%',
		fitToView : false,
		width   : '100%',
		height    : '100%',
		autoSize  : false,
		closeClick  : false,
		openEffect  : 'none',
		closeEffect : 'none'
	});
});


$('.content-body .right').stick_in_parent({parent: '.content-body', spacer: '.list'});
$(document).ready(function() {
	$(".editData a").fancybox({
	maxWidth  : '728px',
	minHeight : '600px',
	fitToView : false,
	width   : '728px',
	height    : '80%',
	autoSize  : false,
	closeClick  : false,
	openEffect  : 'none',
	closeEffect : 'none'
	});
});

$(document).ready(function() {
	$(".sinlge-page .editData a").fancybox({
	maxWidth  : '100%',
	minHeight : '100%',
	fitToView : false,
	width   : '100%',
	height    : '100%',
	autoSize  : false,
	closeClick  : false,
	openEffect  : 'none',
	closeEffect : 'none'
	});
});

$('.go_comment').click(function(){ $('html,body').animate({scrollTop:$('#commentsBox').offset().top}, 1500); }); 

// fancybox

///hhhannnn
window.button_enable = true;

var global_hashtag = "";
var login_rf = "";

function login(hashtag, rf) {
	if (hashtag) {
		global_hashtag = hashtag;
	} else {
		global_hashtag = "";
	}
		
	if (rf) {
		login_rf = rf;
	} else {
		login_rf = "";
	}

	$("body").addClass("openPopup");
}



function ExitVideo() {
	if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	} else {
		document.webkitCancelFullScreen();
	}
}

function fblogin() {
	if (global_hashtag) {
		if(login_rf)
			location.href="login.php?rf="+login_rf+"#"+global_hashtag;
		else
			location.href="login.php?rf="+window.location.pathname+"#"+global_hashtag;
	} else {
		if(login_rf)
			location.href="login.php?rf="+login_rf;
		else
			location.href="login.php?rf="+window.location.pathname;
	}
}

function logout() {
	location.href="logout.php?rf="+window.location.pathname;
}

function twitchlogin() {
	window.open("twitch_login.php", "遊戲大亂鬥 Twitch 登入", "width=400, height=600");
}

function twitchislogin(b) {

	token = b;

	if (follow_twitchid && follow_act) {

		twitch_follow_unfollow();

	} else {

		halert("串接twitch完成");

		setTimeout(function(){
			parent.location.reload();
		},1000);
	}
}


function autogrow(textarea) {
	var adjustedHeight = textarea.clientHeight;

	adjustedHeight = Math.max(textarea.scrollHeight,adjustedHeight);
	
	if (adjustedHeight > textarea.clientHeight) {
		textarea.style.height = adjustedHeight+'px';
	}
}

function report_init(){

	$(".report a").unbind("click");
	$(".closeBox").unbind("click");

	$(".closeBox").click(function(){
		$('.logBoxIDnav,.MajiaNav,.reportDiv,.dropdownBar,.list_live_menu .datos,.dropdown_bt .datos').css({'display':'none'});
	});

	$(".report a").click(function(){
		$(this).next(".reportDiv").show();
	});
}

var tags = [];

$("#article_tags, #tags, #videolist_tag").autocomplete({
	source: 'ajax/get_tag.php',
	minLength: 1,
	delay: 300,
	select: function( event, ui ) {
		if (ui.item.pid) {
			insert_tag(this, ui.item);
			$("#article_tags, #tags, #videolist_tag").val("");
		}
	},
	close: function( event, ui ) {
		tags = [];
	},
	response: function(event, ui) {
		tags = ui.content;
	}
}).data("uiAutocomplete")._renderItem = function (ul, item) {
	return $("<li />")
		.data("item.autocomplete", item)
		.append("<a>" + item.label + "</a>")
		.appendTo(ul);
};

// if no tag already, create new one after enter
$("#article_tags, #tags, #videolist_tag").keypress(function(e){
	code = (e.keyCode ? e.keyCode : e.which);

	if (code == 13 || code == 44) {
		var term = $(this).val();

		// 檢查有沒有在搜尋結果裡面
		for (key in tags) {
			if (term == tags[key].label) {
				insert_tag({
					label: term,
					pid: tags[key].pid
				});

				return false;
			}
		}

		var tag_input = this;

		// 沒有就新增
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "ajax/new_tag.php",
			data: {
				term: term
			},
			success: function(response){
				insert_tag(tag_input, {
					label: term,
					pid: response.tag_id
				});
			}
		});

		$(this).parent().find(".popuptagsok").show();
		$(this).autocomplete("close");
		$(this).val("");
	}
});

function removetag(pid) {
	$("span[pid='"+pid+"']").remove();
	if ($(".popuptagsok").children().length == 0) {
		$(".popuptagsok").hide();
	}
}

function insert_tag(dom, tag){

	var exist = 0 ;
	var popuptagsok = $(dom).parent().find(".popuptagsok");

	popuptagsok.find("span").each(function( index ) {
		console.log(tag.pid, $(this).attr("pid"));
		if (tag.pid == $(this).attr("pid")) {
			exist = 1;          
		}
	});

	if (!exist) {
		popuptagsok.show();

		var closeButton = $("<i class='closetag'>×</i>");
		closeButton.on("click", remove_tag);
		var span = $("<span></span>");
		span.attr("pid", tag.pid);
		span.append(tag.label);
		span.append(closeButton);

		popuptagsok.append(span);

	} else {
		halert(tag.label+" 已經新增過了!", "oops");
	}
}

function remove_tag(e){
	var parent = this.parentNode.parentNode;
	parent.removeChild(this.parentNode);
	if(parent.childElementCount == 0){
		parent.style.display = 'none';
	}
}

$("#post_video").click(function() {

	var fid = $(".postPoppup input[name=fid]").val();
	var message = $("#message").val();
	var video_url = $("#video_url").val();
	var video_mp4 = $("#video_mp4").val();
	var game = $("#video_game").val();
	var video_content = $("#video_content").val();
	var cat = $("#video_cat").val();
	var tags = "";

	$(".post_video .popuptagsok:first span").each(function(index) {  
		if (tags) {
			tags += ','+$(this).attr("pid");
		} else {
			tags = $(this).attr("pid");
		}
	}); 
	
	if (window.button_enable) {

		window.button_enable = false ; 

		$.ajax({
			type: "POST",
			dataType: "json",
			url: "ajax/post_video.php",
			data: {
				fid: fid,
				message: message,
				tags: tags,
				video_url: video_url,
				video_mp4: video_mp4,
				game: game,
				cat: cat,
				video_content: video_content
			},
			success: function(response) { 
				
				if (response.error) {

					window.button_enable = true;
					
					if (response.error=='login') {
						login();
					} else if (response.error=='exist') {

						halert("影片已經存在","oops");

						setTimeout(function() {
							top.location.href = response.redirect;
						}, 2000);
					} else {
						halert(response.error,"error");
					}
				} else {
					if (response.coin) {
						halert(response.success, "doucoin", "https://goo.gl/4u3TfQ", 0, "了解賺鬥幣>>");
					} else {
						halert(response.success, "ok", "https://goo.gl/4u3TfQ", 0, "了解賺鬥幣>>");
					}
					$(".alertBG").on("close_halert",function(){
						top.location.href = response.redirect;
					});
				}
	
			},
			error: function(error) {
				console.log(error);
			}
		});
	}  

	return false;
});

$("#post_article").click(function() {

	var fid     = $(".postPoppup input[name=fid]").val();
	var message = $("#article_title").val();
	var content = $("#article_content").val();
	var cover   = $("#post_photo .img img").attr("_src");
	var game    = $("#article_game").val();
	var cat     = $("#article_cat").val();
	var tags    = "";

	$(".post_article .popuptagsok:first span").each(function( index ) {
		if (tags) {
			tags += ','+$(this).attr("pid");
		} else {
			tags = $(this).attr("pid");
		}
	});

	if (window.button_enable) {

		window.button_enable = false; 
	
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "ajax/post_article.php",
			data: {
				fid: fid,
				message: message,
				tags: tags,
				content: content,
				game: game,
				cover: cover,
				cat: cat
			},
			success: function(response) { 

				if (response.error) {
					
					window.button_enable = true;

					if (response.error=='login') {
						login();
					} else {
						halert(response.error,"error");
					}
				} else {

					if (response.coin) {

						halert(response.success, "doucoin", "https://goo.gl/4u3TfQ", 0, "了解賺鬥幣>>");
					} else {
						halert(response.success, "ok", "https://goo.gl/4u3TfQ", 0, "了解賺鬥幣>>");
					}

					$(".alertBG").on("close_halert", function() {
						top.location.href = response.redirect;
					});
				}
		
			},
			error: function(error) {
				halert(error, "error");
			}
		});
	}

	return false;
});

$("#post_videolist").click(function(e) {
	console.log("post_videolist");

	var fid = $(".postPoppup input[name=fid]").val();
	var message = $("#videolist_title").val();
	var video_url = $("input[name=url]").map(function(){
		return $(this).val();
	}).get();

	var game = $("#videolist_game").val();
	var video_content = $("#videolist_content").val();
	var cat = $("#videolist_cat").val();
	var tags = "";

	$(".post_videolist .popuptagsok:first span").each(function( index ) {	 
		if (tags) {
			tags+=','+$(this).attr("pid");
		} else {
			tags = $(this).attr("pid");
		}
	});
	

	console.log({
		fid: fid,
		message: message,
		tags: tags,
		video_url: video_url,
		game: game,
		cat: cat,
		video_content: video_content
	});

	if (window.button_enable) {

		window.button_enable = false ; 

		$.ajax({
			type: "POST",
			dataType: "json",
			url: "ajax/post_videolist.php",
			data: {
				fid: fid,
				message: message,
				tags: tags,
				video_url: video_url,
				game: game,
				cat: cat,
				video_content: video_content
			},
			success: function( response ) {
				if (response.error) {
					console.log(response);
					window.button_enable = true;
					
					if (response.error=='login') {
						
						login();

					} else if(response.error == 'exist') {

						halert("影片已經存在","oops");

						setTimeout(function(){
							top.location.href = response.redirect;
						}, 2000);
						
					} else {
						halert(response.error, "error");
					}
				} else {
				
					if (response.coin) {
						halert(response.success, "doucoin", "https://goo.gl/4u3TfQ", 0, "了解賺鬥幣>>");
					} else {
						halert(response.success, "ok", "https://goo.gl/4u3TfQ", 0, "了解賺鬥幣>>");
					}

					$(".alertBG").on("close_halert", function() {
						top.location.href = response.redirect;
					});
				}
			}
		});
	}

	return false;
});


/*發文框 上傳圖*/
$("#post_photo").click(function(e) {

	if (!$(event.target).hasClass('close_photo')) {
		if ($(this).find(".img").is(':hidden')) {
			$(".review.back").click();
			$("#article_pic").click();
		}
	}

	}).children(".close_photo").click(function() {
		$("#post_photo .img").hide();
		$("#post_photo .close_photo").hide();
		$("#post_photo .img img").attr("src","img/loading_spinner.gif");
		$("#post_photo .img img").attr("_src","");
	});

	$('#article_pic').change(function() { 
		// select the form and submit
		$('#article_pic_form').submit(); 
		$('#article_pic').val('');
	});  

	$("#article_pic_form").on('submit',(function(e) {
		e.preventDefault();
		$("#post_photo .img").show();
		$("#post_photo .close_photo").show();
			
		$.ajax({
		url: "ajax/upload_photo_imgur.php",
		type: "POST",
		data:  new FormData(this),
		contentType: false,
		cache: false,
		processData:false,
		dataType: "json",
		success: function(data) {
			console.log(data);
			if (data.error) {
				if(data.error=='login') {
					login();
				} else {
					halert(data.error,"error");
				}

			} else {

				var caretpos = caretPos("article_content");
				var strBegin = $('#article_content').val().substring(0, caretpos);
				var strEnd   = $('#article_content').val().substring(caretpos);
						
				if ($('#article_content').val()=='') {

					$('#article_content').val(data.attach['small']);

				} else {
						
					if (strBegin) {

						if (strEnd) {

							$('#article_content').val( strBegin + "\r\n" + data.attach['small'] + "\r\n" + strEnd);

						} else {


							$('#article_content').val( strBegin + "\r\n" + data.attach['small']);

						}

					} else {
						if (strEnd) {
							$('#article_content').val(data.attach['small'] + "\r\n" + strEnd);
						} else {
							$('#article_content').val(data.attach['small']);
						}
					}
				}
						
				$("#post_photo .img").hide();
				$("#post_photo .close_photo").hide();
			}
		},
		error: function() {}           
	});
}));
/*發文框 上傳圖*/


/* 留言框 上傳圖 */
$("#post_comment_photo").click(function(e) {

	if (!$(event.target).hasClass('close_photo')) {
		if ($(this).find(".img").is(':hidden')) {
			$("#comment_pic").click();
		}
	}

	}).children(".close_photo").click(function() {
		$("#post_comment_photo .img").hide();
		$("#post_comment_photo .close_photo").hide();
		$("#post_comment_photo .img img").attr("src", "img/loading_spinner.gif");
		$("#post_comment_photo .img img").attr("_src", "");
	});
	 

	$('#comment_pic').change(function() { 
		// select the form and submit
		$('#comment_pic_form').submit(); 
		//halert("目前還未開放上傳功能 請稍等片刻","oops");
		$('#comment_pic').val('');
	});  

	$("#comment_pic_form").on('submit',(function(e) {
		e.preventDefault();
		$("#post_comment_photo .img").show();
		$("#post_comment_photo .close_photo").show();

		$.ajax({
			url: "ajax/upload_photo_imgur.php",
			type: "POST",
			data:  new FormData(this),
			contentType: false,
			cache: false,
			processData:false,
			dataType: "json",
			success: function(data) {

				if (data.error) {
					if(data.error=='login'){
						login();
					}else{
						halert(data.error,"error");
					}

				} else {

					var caretpos = caretPos("comment_textarea");
					var strBegin = $('#comment_textarea').val().substring(0, caretpos);
					var strEnd   = $('#comment_textarea').val().substring(caretpos);
					
					if ($('#comment_textarea').val() == '') {

						$('#comment_textarea').val(data.attach['small']);

					} else {
					
						if (strBegin) {

							if (strEnd) {
								$('#comment_textarea').val( strBegin + "\r\n" + data.attach['small'] + "\r\n" + strEnd);
							} else {
								$('#comment_textarea').val( strBegin + "\r\n" + data.attach['small']);
							}

						} else {

							if (strEnd) {
								$('#comment_textarea').val(data.attach['small'] + "\r\n" + strEnd);
							} else {
								$('#comment_textarea').val(data.attach['small']);
							}
						}
					}

					$("#post_comment_photo .img").hide();
					$("#post_comment_photo .close_photo").hide();

				}
			}
		});
	}));
/* 留言框 上傳圖*/


/* 回文框 上傳圖 */

$("#post_reply_photo").click(function(e) {

	if (!$(event.target).hasClass('close_photo')) {

		if ($(this).find(".img").is(':hidden')) {
			$("#reply_pic").click();
		}
	}
}).children(".close_photo").click(function() {

	$("#post_reply_photo .img").hide();
	$("#post_reply_photo .close_photo").hide();
	$("#post_reply_photo .img img").attr("src","img/loading_spinner.gif");
	$("#post_reply_photo .img img").attr("_src","");
});
	 

$('#reply_pic').change(function() { 
	// select the form and submit
	$('#reply_pic_form').submit(); 
	//halert("目前還未開放上傳功能 請稍等片刻","oops");
	$('#reply_pic').val('');
});

$("#reply_pic_form").on('submit', (function(e) {
	e.preventDefault();
	$("#post_reply_photo .img").show();
	$("#post_reply_photo .close_photo").show();

	$.ajax({
		url: "ajax/upload_photo_imgur.php",
		type: "POST",
		data:  new FormData(this),
		contentType: false,
		cache: false,
		processData:false,
		dataType: "json",
		success: function(data) {

			if (data.error) {
				if (data.error=='login') {
					login();
				} else {
					halert(data.error,"error");
				}
			} else {

				var caretpos = caretPos("reply_textarea");
				var strBegin = $('#reply_textarea').val().substring(0, caretpos);
				var strEnd   = $('#reply_textarea').val().substring(caretpos);
						
				if ($('#reply_textarea').val()=='') {

					$('#reply_textarea').val(data.attach['small']);

				} else {
						
					if (strBegin) {
						if (strEnd) {
							$('#reply_textarea').val( strBegin + "\r\n" + data.attach['small'] + "\r\n" + strEnd);
						} else {
							$('#reply_textarea').val( strBegin + "\r\n" + data.attach['small']);
						}
					} else {
						if (strEnd) {
							$('#reply_textarea').val(data.attach['small'] + "\r\n" + strEnd);
						} else {
							$('#reply_textarea').val(data.attach['small']);
						}
					}
				}

				$("#post_reply_photo .img").hide();
				$("#post_reply_photo .close_photo").hide();

			}
		}      
	});
}));
/* 留言框 上傳圖*/

//hank 新加入 emotion 
$(".emotes").click(function(e) {
	//console.log(e.target);
	var target = $( event.target );
	if (target.is("span")) {
		if ($(this).find(".emotesDiv").is(":visible")) {
			$(this).find(".emotesDiv").hide();
		} else {
			$(this).find(".emotesDiv").show();
		}
	}
});

function caretPos(textarea_id) {
	var textarea_id = textarea_id;
	var el = document.getElementById(textarea_id);
	var pos = 0;
	// IE Support
	if (document.selection) {
		el.focus();
		var Sel = document.selection.createRange();
		var SelLength = document.selection.createRange().text.length;
		Sel.moveStart ('character', -el.value.length);
		pos = Sel.text.length - SelLength;
	}
	// Firefox support
	else if (el.selectionStart || el.selectionStart == '0')
		pos = el.selectionStart;

	return pos;
}

function open_post (type, fid) {
	console.log(type);
	$("html, body").animate({ scrollTop: 0 });
	$(".review.back").click();
	$("#article_content").css({"height":''});

	if (fid) {
		
		$(".postPoppup input[name=fid]").val(fid);
		$(".post_subtitle").hide();
		$(".editposttitle").show();

		$.ajax({  
			type: "POST",
			dataType: "json",
			url: "ajax/get_post_info.php",
			data: {fid:fid},
			success: function(response) {
			
				if (response.error) {
					halert( error , "error");
				} else {

					$(".popuptagsok").html("");
					console.log(response);
					if (type == 'article') {

						$("#article_title").val(response.data.f_desc);
						$("#article_content").val(response.data.f_attachment);
						$("#article_game option[value="+response.data.f_game_type+"]").attr("selected","selected");
					
						game_cat(response.data.f_game_type,"article_cat",response.data.f_cat);  

					} else if (type == "playlist") {
						
						$("#videolist_title").val(response.data.f_desc);

						$(".post_url ol li").remove();

						//$("#video_url").val(response.data.f_attachment[0].video_url);
						for (i=0; i<response.data.f_attachment.length; i++) {
							var li = $("<li>")
								.appendTo(".additembox ol");
							$("<input>")
								.attr("type", "text")
								.attr("name", "url")
								.attr("placeholder", "輸入 youtube, facebook, Twitch Clip 影片網址")
								.attr("autocomplete", "off")
								.val(response.data.f_attachment[i].video_url)
								.appendTo(li);
						}
						
						$("#videolist_content").val(response.data.video_content);
						
						$("#videolist_game option[value="+response.data.f_game_type+"]").attr("selected","selected");

						game_cat(response.data.f_game_type,"videolist_cat",response.data.f_cat);

					} else {

						$("#message").val(response.data.f_desc);
						$("#video_url").val(response.data.video_url);
						$("#video_content").val(response.data.video_content);
						$("#video_game option[value="+response.data.f_game_type+"]").attr("selected","selected");

						game_cat(response.data.f_game_type,"video_cat",response.data.f_cat);  

					}

					$.each(response.data.f_tags_info, function(i, item) {
						$(".popuptagsok").show();
						$(".popuptagsok").append('<span pid='+item.pid+'>'+item.p_name+'<i class="closetag" onclick="removetag(\''+item.pid+'\');return false;">×</i></span>');
					});

					autogrow(document.getElementById("article_content"));
				}
			},
			error: function( error ) {
				halert( error , "error");
			}
		});

	}else{

		$(".post_subtitle").show();
		$(".editposttitle").hide();
		//全清空
		//
		if ($(".postPoppup input[name=fid]").val()) {

			$(".postPoppup input[name=fid]").val('');
			$("#article_title").val('');
			$("#article_content").val('');
			$("#article_game option[value=0]").attr("selected","selected");
			$("#article_game").change();
			$("#message").val('');
			$("#video_url").val('');
			$("#video_game option[value=0]").attr("selected","selected");
			$("#video_game").change();
			$(".popuptagsok").html("");
			$(".popuptagsok").hide();
		}
	}

	if (type == 'article') {
		$("body").addClass("openPopuppost");

		$(".postPoppup .post_subtitle .text").addClass("on");
		$('.postPoppup .post_subtitle .video').removeClass("on");
		$('.postPoppup .post_subtitle .videolist').removeClass("on");

		$('.postPoppup .post_article').css('display','block');
		$('.postPoppup .post_video').css('display','none');
		$('.postPoppup .post_videolist').css('display', 'none');
	} else if (type == 'video') {
		$("body").addClass("openPopuppost");

		$(".postPoppup .post_subtitle .video").addClass("on");
		$('.postPoppup .post_subtitle .text').removeClass("on");
		$('.postPoppup .post_subtitle .videolist').removeClass("on");

		$('.postPoppup .post_video').css('display', 'block');
		$('.postPoppup .post_article').css('display', 'none');
		$('.postPoppup .post_videolist').css('display', 'none');
	} else if (type == 'playlist') {
		$("body").addClass("openPopuppost");

		$('.postPoppup .post_subtitle .videolist').addClass("on");
		$(".postPoppup .post_subtitle .video").removeClass("on");
		$('.postPoppup .post_subtitle .text').removeClass("on");

		$('.postPoppup .post_videolist').css('display', 'block');
		$('.postPoppup .post_video').css('display', 'none');
		$('.postPoppup .post_article').css('display', 'none');
	}
}
function halert(msg, act, url, mining, button_word) {

	if (mining) {
		if (act == 'goldget') {
			$(".alertBG div:first").attr("class","miningStyle goldcoinGet");
			$(".alertBG .popupBody").html('<span class="t">站內互動：按↑或↓，可挖礦！</span><div class="noGold Gold"><p class="t2">鬥幣挖礦中...</p><i class="loadingLine"><strong class="loadingLine2"></strong></i></div><div class="noGold_t3 Gold_t3"><p class="t3">'+msg+'</p></div>');
		} else if (act == 'goldnotGet') {
			$(".alertBG div:first").attr("class","miningStyle");
			$(".alertBG .popupBody").html('<span class="t">站內互動：按↑或↓，可挖礦！</span><div class="noGold Gold"><p class="t2">鬥幣挖礦中...</p><i class="loadingLine"><strong class="loadingLine2"></strong></i></div><div class="noGold_t3"><p class="t3">啊呀！這次沒挖到鬥幣！</p></div>');
		}

	} else {

		$(".alertBG .popupBody").html("<span></span>");

		switch (act) {

			case "ok":
			$(".alertBG .popupBody").attr("class","popupBody ok");
			break ; 

			case "error":
			$(".alertBG .popupBody").attr("class","popupBody error");
			break ; 

			case "oops":

			$(".alertBG .popupBody").attr("class","popupBody oops");
			break ;

			case "doucoin":

			$(".alertBG .popupBody").attr("class","popupBody doucoin");

			break; 

			default : 

			$(".alertBG .popupBody").attr("class","popupBody ok");
			
			break; 
		}


		if (url) {
			
			$(".alertBG .popupButton").show();

			$(".alertBG .popupButton a").attr("href",url);

		} else {

			$(".alertBG .popupButton").hide();

		}

		if(button_word){

			$(".alertBG .popupButton .okay").html(button_word);

		}else{

			$(".alertBG .popupButton .okay").html("確定");

		}

		$(".alertBG .popupBody span").html(msg);
	}

	$(".alertBG").show();
}

$(".alertBG .closeAlert a").click(function(){

	$(".alertBG").hide();
	$(".alertBG").trigger("close_halert");
});

//hank end 
$(".review").click(function(){
	var review_element = $(this);


	if(review_element.hasClass("back")){

		$(".post_review").hide();
		$(".post_article .post_title").show();
		$(".post_article .post_comment").show();
		$(".post_article .post_tag").show();
		$(".post_article .post_photo").show();
		$("#article_game").show();
		$("#article_cat").show();
		review_element.removeClass("back");
		review_element.html("預覽");
		$("html, body").animate({ scrollTop: 0 });
	}else{

		var contents  = $("#article_content").val();

		$.ajax({
	
			type: "POST",
			dataType: "html",
			url: "ajax/edit_to_content.php",
			data: {contents:contents},
			success: function( response ) { 

				$(".post_review .conetents").html(response);
				$(".post_review .text h1").html($("#article_title").val());
				$(".post_review").show();
				$(".post_article .post_title").hide();
				$(".post_article .post_comment").hide();
				$(".post_article .post_tag").hide();
				$(".post_article .post_photo").hide();
				$("#article_game").hide();
				$("#article_cat").hide();
				review_element.addClass("back");
				review_element.html("繼續編輯");
				$("html, body").animate({ scrollTop: 0 });
			}
		});
	}
});


$("#post_mail").click(function(){

	var uid = $(".popupMail .to_uid").val();
	var title = $("#mail_title").val();
	var message = $("#mail_content").val();
	var to_parent_umid = $(".popupMail .to_parent_umid").val();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "ajax/post_mail.php",
		data: {uid:uid,title:title,message:message,to_parent_umid:to_parent_umid},
		success: function( response ) { 
		
			if(response.error){
				if(response.error=='login'){

					$("body").removeClass("openPopup_newMail");
					login();
				}else{
					halert(response.error,"error");
				}
			}else{

				$("body").removeClass("openPopup_newMail");
				halert(response.success);
			}

		},
		error: function( error ) {
			$("body").removeClass("openPopup_newMail");
			halert( error ,"error");
		}
			
	});
});

$("#video_game, #article_game, #videolist_game").change(function(){
	var cat_selector = $(this).attr("catid");
	var game = $(this).val();
	game_cat(game,cat_selector);
});

function game_cat(game,cat_selector,org_cat){
	$.ajax({
		type: "get",
		async: false,
		url: "ajax/get_board_cat.php?game_type="+game,
		dataType: "jsonp",
		success: function(json){

			var option_strs = '';

			if(json){
				$.each(json.b_catelogue, function(i, item){

					if(org_cat==item['bc_id']){
						option_strs+= "<option value='"+item['bc_id']+"' selected='selected'>"+item['bc_name']+"</option>";
					}else{
						option_strs+= "<option value='"+item['bc_id']+"'>"+item['bc_name']+"</option>";
					}
				});
			}else{
				option_strs = "<option value=''>選擇分類</option>";
			}

			$("#"+cat_selector).html(option_strs);
		},
		error: function(){
			console.log('fail');
		}
	});
}


function del_post(fid){
	if(confirm("確定要刪除嗎?")){ 
	
		$.ajax({
					
			type: "POST",
			dataType: "json",
			url: "ajax/del_post.php",
			data: {fid: fid},
			success: function( response ) {
				
				if (response.error) {
					halert(response.error, "error");
				} else {
					location.reload();
				}
			},
			error: function(error) {
				halert(error, "error");
			}
					
		});
	}
}


function player_change(fid){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "ajax/player_change.php",
		data: {fid:fid},
		success: function( response ) { 
			
			if (response.error) {
				halert(response.error,"error");
			} else {
				location.reload();
			}
		},
		error: function( error ) {
			halert( error,"error");
		}
	});
}


function dissticky_post(fid){
	$.ajax({
	type: "POST",
	dataType: "json",
	url: "ajax/dissticky_post.php",
	data: {fid:fid},
	success: function( response ) { 
		
		if(response.error){
		halert(response.error,"error");
		}else{
		location.href=response.redirect;
		}

	},
	error: function( error ) {
		 halert( error,"error");
	} 
	});
}

function tosticky_post(fid){
	$.ajax({
	type: "POST",
	dataType: "json",
	url: "ajax/tosticky_post.php",
	data: {fid:fid},
	success: function( response ) { 
		
		if(response.error){
		halert(response.error,"error");
		}else{
		location.href=response.redirect;
		}

	},
	error: function( error ) {
		 halert( error,"error");
	} 
	});
}

function del_comment(cid){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "ajax/del_comment.php",
		data: {cid:cid},
		success: function( response ){ 
		
			if(response.error){
				halert(response.error,"error");
			}else{
				location.reload();
			}
		},
		error: function( error ){
			halert( error  , "error");
		}
	});
}

//hhhannn
function open_mail(uid,umid,um_title){

	$.ajax({
		type: "POST",
		dataType: "json",
		url: "ajax/uid_username_info.php",
		data: {uid:uid},
		success: function(response) { 
		
			if (response.error) {
				$("body").removeClass("openPopup_newMail");
			} else {
				if (um_title) {
					$("#mail_title").val("RE:"+um_title);
				}

				//填寫收信人進去input hidden and 顯示
				$(".popupMail .title a b").html(response.u_info["u_name"]);
				$(".popupMail .title a i").html("(ID:"+response.u_info['uid']+")");
				$(".popupMail .title img").attr("src",response.u_info['cover']);
				$(".popupMail .title a").attr("href","member-"+response.u_info['uid']+"-"+response.u_info['u_name']);
				$(".popupMail .to_uid").val(response.u_info['uid']);
				$(".popupMail .to_u_name").val(response.u_info['u_name']);
				if (umid) {
					$(".popupMail .to_parent_umid").val(umid);
				} else {
					$(".popupMail .to_parent_umid").val("0");
				}
				
				$("body").addClass("openPopup_newMail");
			}

		},
		error: function(error){
			halert(error, "error");
		}
	});
}


$(".closeDiv,.popupBoxBG").click(function(){ $("body").removeClass("openPopup_newMail");}); 
$(".loginPopupOpen a,.loginPopupOpen").click(function(){ $("body").addClass("openPopup");   $(".popupBoxBody").show();   });  
$(".popupBoxBG,.closeDiv").click(function(){ $("body").removeClass("openPopup");}); 
$(".popupBoxBG,.closeDiv,.pro_post").click(function(){ $("body").removeClass("openPopuppost");}); 


$(".tabMore").click(function(){ 
	$(".tabMore").addClass("on").removeClass('off');
	$(".tabMy").addClass("off").removeClass('on');
	$(".emotesDiv .my").addClass("closeDiv").removeClass('openDiv');
	$(".emotesDiv .more").addClass("openDiv").removeClass('closeDiv');
}); 

$(".tabMy").click(function(){ 
	$(".tabMy").addClass("on").removeClass('off');
	$(".tabMore").addClass("off").removeClass('on');
	$(".emotesDiv .more").addClass("closeDiv").removeClass('openDiv');
	$(".emotesDiv .my").addClass("openDiv").removeClass('closeDiv');
}); 

$('.logBoxID a,.Majia a,.bell a, .select_bt a').on('click', function(){
	$(this).next('.datos').slideToggle(0);
});

$(function() {
	$( ".Friends-botton" ).click(function() {
		$( ".Friends-botton" ).toggleClass( "Del", 1000 );
		return false;
	});
});

$(function() {
	$(".postPoppup .video").on("click", function() {
		$(this).parent().find("span").removeClass("on");
		$(this).toggleClass("on", 1000);

		$('.postPoppup .post_video').css('display', 'block');
		$('.postPoppup .post_article').css('display', 'none');
		$('.postPoppup .post_videolist').css('display', 'none');
	});

	$(".postPoppup .text").on("click", function() {
		$(this).parent().find("span").removeClass("on");
		$(this).toggleClass("on", 1000);

		$('.postPoppup .post_article').css('display', 'block');
		$('.postPoppup .post_video').css('display', 'none');
		$('.postPoppup .post_videolist').css('display', 'none');
	});

	$(".postPoppup .videolist").on("click", function() {
		$(this).parent().find("span").removeClass("on");
		$(this).toggleClass("on", 1000);

		$('.postPoppup .post_videolist').css('display', 'block');
		$('.postPoppup .post_article').css('display', 'none');
		$('.postPoppup .post_video').css('display', 'none');
	});

	$(".search_form").submit(function(e){
		 e.preventDefault();
		
		location.href="/s/"+$(this).find("input").val();

		return false;
	});
	$( ".hot-keyword-body .show-button" ).click(function() {
		$(".hot-keyword-body").toggleClass( "show", 1000 );$(".hot-keyword-body").nextAll('.hidden').removeClass( 'show');
	});

	report_init();
});


$(document).on( 'scroll', function(){

	if ($(window).scrollTop() >= 340) {
		$('.sinlgeVideoPage .fix1').addClass('fix2').removeClass('fix1');
	} else {
		$('.sinlgeVideoPage .fix2').addClass('fix1').removeClass('fix2');
	}

	if ($(window).scrollTop() >= 150) {
		$('.Lfix1').addClass('Lfix2').removeClass('Lfix1');
	} else {
		$('.Lfix2').addClass('Lfix1').removeClass('Lfix2');
	}

	if ($(window).scrollTop() >= 400) {
		$('.sinlgeArticlePage .Rfix1,.category .Rfix1').addClass('Rfix2').removeClass('Rfix1');
	} else {
		$('.sinlgeArticlePage .Rfix2,.category .Rfix2').addClass('Rfix1').removeClass('Rfix2');
	}

	if ($(window).scrollTop() >= 237) {
		$('.sinlgeArticlePage .Lfix1').addClass('Lfix2').removeClass('Lfix1');
	} else {
		$('.sinlgeArticlePage .Lfix2').addClass('Lfix1').removeClass('Lfix2');
	}

	if ($(window).scrollTop() >= 30) {
		$('.Tfix1').addClass('Tfix2').removeClass('Tfix1');
	} else {
		$('.Tfix2').addClass('Tfix1').removeClass('Tfix2');
	}

	if ($(window).scrollTop() >= 470) {
		$('.Ffix1').addClass('Ffix2').removeClass('Ffix1');
	} else {
		$('.Ffix2').addClass('Ffix1').removeClass('Ffix2');
	}
});


// 置底出現
$(window).scroll(function () {
	if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
		 $('.Bfix1').addClass('Bfix2').removeClass('Bfix1');
	} else {
		$('.Bfix2').addClass('Bfix1').removeClass('Bfix2');
	}
});


//slideshow
(function(){
	
var counter = 0, // to keep track of current slide
	$items = document.querySelectorAll('.diy-slideshow .figure'), // a collection of all of the slides, caching for performance
	numItems = $items.length; // total number of slides

// this function is what cycles the slides, showing the next or previous slide and hiding all the others
var showCurrent = function(){
	var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show  
	
	// remove .show from whichever element currently has it 
	// http://stackoverflow.com/a/16053538/2006057
	[].forEach.call( $items, function(el){
	el.classList.remove('show');
	});
	
	// add .show to the one item that's supposed to have it
	$items[itemToShow].classList.add('show');    
};

// add click events to prev & next buttons 
/*
document.querySelector('.next').addEventListener('click', function() {
	 counter++;
	 showCurrent();
	}, false);

document.querySelector('.prev').addEventListener('click', function() {
	 counter--;
	 showCurrent();
	}, false);
	*/
})();  


//0819
(function($){
	$(window).on("load",function(){
		$(".left_navber").mCustomScrollbar();
		
	});
})(jQuery);


//0819
$('.left_navber_close a').on('click', function(){ 
	$('.left_navber').slideToggle(200);
});
	
$(".additem .popupBoxbutton").on("click", function () {
	$('<li><input type="text" name="url" placeholder="輸入 youtube, facebook, Twitch Clip 影片網址" autocomplete="off"></li>')
		.appendTo(".additembox ol");
});