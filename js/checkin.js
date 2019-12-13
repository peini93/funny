$(function(){
	$.ajax({
		url: "ajax/checkin.php",
		success: function(html) {
			$("body").prepend(html);
		},
		complete: function() {
			$(".checkinBox .closeDiv").on("click", function(){
				$(".checkinBox").remove();
			});
		}
	});
})