var noti_page = 1 ;
var noti_load = 0 ;
var noti_is_end = 0 ;
var noti_first_time = 1;

$(".bell a").click(function(){
	noti_load =1 ;

	if(noti_first_time){

		$(".bell .options1 span").remove();

		noti_first_time = 0 ; 
			
		$.ajax({
			url: "ajax/load_notification.php?page="+noti_page,
			success: function(html) {   
				noti_load =0 ;
				if (html) {	
					$("#mCSB_1_container").html(html);
					noti_init();
					dropdownBar_init();
				} else {	
					noti_is_end = 1;
				}
				noti_page++;
			},
			error: function(e) {
				noti_is_end = 1;
			}
		});
	}
});
$(function(){
	$(".dropdownBar ul").mCustomScrollbar({
		callbacks:{
			onTotalScroll: function(){

				if(!noti_is_end){
					$.ajax({
						url: "ajax/load_notification.php?page="+noti_page,
						success: function(html) {   

							noti_load =0 ;

							if (html) {
							
								$("#mCSB_1_container").append(html);
								console.log("END");
								noti_init();

							} else {	
								noti_is_end = 1;
							}
							noti_page++;
						},
						error : function(e) {
							noti_is_end = 1;
						}
					});
				}
			}
		}
	});
});

function dropdownBar_init(){

}

function noti_init(){
	$("#noti_ul li").unbind("click");

	$("#noti_ul li").click(function(){

		var no_id = $(this).attr("no_id");

		if(no_id){

			$.ajax({
			
				type: "POST",
				dataType: "json",
				url: "ajax/noti_is_read.php",
				data: {no_id:no_id},
				success: function( response ) { 
						
					if(!response.error){
							
						$("li[no_id="+no_id+"]").attr("class","unread haveread");
					}

				},
				error: function( error ) {}
			});
		}
	});
}