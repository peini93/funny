function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

$("#submit").click(function(){

	var virtual = $('#order input[name=virtual]').val();

	if(virtual != 1){
		var name = $('#order input[name=name]').val();
		var errorMsg = "";
		if(name == ""){
			errorMsg += "姓名未填<br>";
		}

		var email = $('#order input[name=email]').val();
		if(email == ""){
			errorMsg += "E-mail未填<br>";
		}else if(!validateEmail(email)){
			errorMsg += "E-mail格式不合法<br>";
		}

		var phone = $('#order input[name=phone]').val();
		if(phone == ""){
			errorMsg += "電話未填<br>";
		}

		var address = $('#order input[name=address]').val();
		if(address == ""){
			errorMsg += "地址未填<br>";
		}

		if(errorMsg != ""){
			halert(errorMsg, "error");
			return;
		}
	}

	var form = $('#order');
	var formData = form.serialize();
	var formURL = form.attr("action");
	var formMethod = form.attr("method");
	
	fetch(formURL, {
		method: formMethod,
		headers:{
			"Content-Type": "application/x-www-form-urlencoded"
		},
		credentials: "same-origin",
		body: formData
	}).then(function(response){
		return response.text();
	}, function(e){

	}).then(function(text){
		console.log(text);
		result = JSON.parse(text);

		switch(result.msg){
			case "success":
				if(result.mail_id < 0){
					halert("通知信有誤", "error");
				}else{
					halert("兌換成功，請查看站內信件。<br>將於五秒後自動跳轉...", "ok", "/mailbox-detail/"+result.mail_id);
					setTimeout(function(){ window.location = "/mailbox-detail/"+result.mail_id; }, 1500);
				}
				break;
			case "mail_verify":
				halert("尚未認證Email，3秒後自動跳轉至認證頁", "ok", "/editprofile");

				setTimeout(function(){ location.href="/editprofile";}, 3000);
				break;
			case "gold not enough":
				halert("您的鬥幣餘額不足。<br>將於3秒後跳轉回市集首頁...", "ok", "/market");
				setTimeout(function(){ window.location = "/market"; }, 3000);
				break;
			case "jewels not enough":
				halert("您的紅寶石餘額不足。<br>將於3秒後跳轉回市集首頁...", "ok", "/market");
				setTimeout(function(){ window.location = "/market"; }, 3000);
				break;
			case "not enough":
				halert("物品餘額不足。<br>將於3秒後跳轉回市集首頁...", "ok", "/market");
				setTimeout(function(){ window.location = "/market"; }, 3000);
				break;
			case "no serial number":
				halert("物品餘額不足。<br>將於3秒後跳轉回市集首頁...", "ok", "/market");
				setTimeout(function(){ window.location = "/market"; }, 3000);
				break;
			case "no uid":
				halert("使用者身分有誤。", "error");
				break;
			case "no gid":
				halert("物品資料有誤。", "error");
				break;
			case "ban":
				halert("哈哈 你被Ban了", "error");
				break;
			default:
				halert("不知名錯誤發生。", "error");
		}
	});
});