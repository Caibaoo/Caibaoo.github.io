	window.onload= function(){
		var cart_total = document.getElementsByClassName("simpleCart_total")[0];
		cart_total.innerText = "￥" + cart_total.innerText.substr(1)
	}



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
		
		
		//把导航条购物车$去掉
		window.onload= function(){
			var cart_total = document.getElementsByClassName("nav_cart_total")[0];
			cart_total.innerText = "￥" + cart_total.innerText.substr(1)
		}
		//显示购物车金额和项目数
	    var storage = window.localStorage;
	    var cart_str = storage.getItem("orderList");
	    var cart_Json = JSON.parse(cart_str);
		if(cart_str != null){
			$(".nav_cart_qty").text(cart_Json.length);
		} else {
			$(".nav_cart_qty").text("0");
		}
		
		var cart_totalPrice = 0 
		for(var i in cart_Json){
			cart_totalPrice += parseInt(cart_Json[i].vegnum) * parseInt(cart_Json[i].untiprice);
		}
		
		$(".nav_cart_total").text("￥" + cart_totalPrice + ".0");
	}
	
	function getLocalStorageUserInfo(){
		var storage = window.localStorage;
		var userInfo_str = storage.getItem("userInfo");
		var userInfo_Json = JSON.parse(userInfo_str);
		
		return userInfo_Json;
	}