
	initHtml();
	function initHtml(){
		
		//导航条用户是否登陆显示
		var userinfo = getLocalStorageUserInfo();
		if(userinfo == null){
			$(".login_section").css("display", "block");
			$(".logining_section").css("display", "none");
		} else {
			$(".login_section").css("display", "none");
			$(".logining_section").css("display", "block");
			$(".logining_section_name").text(userinfo[0].username);
		}
	}

	eventBind_loginBtn();
	function eventBind_loginBtn(){
		
		$(".btn_login").click(function(event){
			event.preventDefault();
			
			var form_account = $(".input_login")[0].value;
			var form_password = $(".input_login")[1].value;
			ajax(form_account, form_password);
		})
	}
	
	function ajax(account_in, password_in){
		
		$.ajax(
			{
				url: 'http://101.132.184.238:81/v0/user/logincheck',
				type: 'post',
				data: {
					userid: account_in,
					userpass: password_in,
				},
				dataType:'json',
				success:function(data){
					console.log("连接成功"); 
					console.log(data.message );
					if(data.message == "iderror"){
						swal("用户账号不存在", "请检查账号信息","error");
					} else if(data.message == "passerror"){
						swal("用户密码错误", "请检查输入","info");
					} else if(data.message == "success") {
						//swal("登陆成功", "开始买菜吧","success");
						
						swal({    
							title: "登陆成功",
							text: "开始买菜吧",
							type: "success",   
							showCancelButton: true,
							cancelButtonText: "取消",
							confirmButtonColor: "info",   
							confirmButtonText: "买菜去",   
							closeOnConfirm: false,
						},
							function(){
								 $(location).attr('href', 'orders.html');
							}
						);
						
						console.log(data);
						console.log(data.userdata.UserName);
						showLoginState_inNav(data.userdata.UserName);
						pushLocalStorageUserInfo(data.userdata.UserName,data.userdata.UserPhone);
					}
				},
				error: function(data){
					console.log("连接出错");
					console.log(data.message);
				}
			}
		);
	}
	
	function showLoginState_inNav(username_in){
		$(".login_section").css("display", "none");
		$(".logining_section").css("display", "block");
		$(".logining_section_name").text(username_in);
	}


	//---------常用操作封装----------------------
	function pushLocalStorageUserInfo(userName_in, userPhone_in){
		
		//判断是否有重名的
		
		var storage = window.localStorage;
		var userInfo_str = storage.getItem("userInfo");
		var userInfo_Json = JSON.parse(userInfo_str);
		
		if(userInfo_Json == null){
			userInfo_Json = [];
		}
		userInfo_Json.push({ username: userName_in, phone: userPhone_in});
		
		var arrayData = JSON.stringify(userInfo_Json);
	   	storage.setItem("userInfo", arrayData);
	}
	

	function getLocalStorageUserInfo(){
		var storage = window.localStorage;
		var userInfo_str = storage.getItem("userInfo");
		var userInfo_Json = JSON.parse(userInfo_str);
		
		return userInfo_Json;
	}