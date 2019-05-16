

	eventBind_loginBtn();
	function eventBind_loginBtn(){
		
		$(".btn_register").click(function(event){
			event.preventDefault();
			
			var form_account = $(".input_register")[0].value;
			var form_name = $(".input_register")[1].value;
			var form_password = $(".input_register")[2].value;
			var form_repassword = $(".input_register")[3].value;
			var form_phone = $(".input_register")[4].value;
			
			if(form_password != form_repassword){
				alert("请确认密码");
			} else{
				ajax(form_account, form_password , form_name, form_phone);
			}

		})
	}
	
	function ajax(account_in, password_in, name_in, phone_in){
		
		$.ajax(
			{
				url: 'http://101.132.184.238:81/v0/user/register',
				type: 'post',
				data: {
					userid: account_in,
					userpass: password_in,
					username: name_in,
					userphone: phone_in,
				},
				dataType:'json',
				success:function(data){
					console.log("连接成功"); 
					console.log(data.message );
					if(data.message == "success"){
						alert("注册成功");	
						//swal("注册成功", "前往登陆","error");
					} else {
						//swal("用户密码错误", "请检查输入","success");
					}
				},
				error: function(data){
					console.log("连接出错");
					console.log(data.message);
				}
			}
		);
	}
