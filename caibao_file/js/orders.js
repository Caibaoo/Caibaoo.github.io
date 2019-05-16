
	//----------------页面初始化之基础初始化 start---------------------------
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
			var cart_Json = getLocalStorageCart();
			if(cart_Json != null){
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
	//----------------页面初始化之基础初始化 end---------------------------

	
	//--------------------动态改变下单数量 start----------------------------------
	
	eventBind_change_qty();
	function eventBind_change_qty(){
		$(".icon_plus").click(function(event){
			event.preventDefault()
			
			var num = parseInt($(this).parent().find(".icon_operate_target").text())
			$(this).parent().find(".icon_operate_target").text(++num)
		})
		
		$(".icon_minus").click(function(event){
			event.preventDefault()
			var num = parseInt($(this).parent().find(".icon_operate_target").text())
			
			if(num > 0 ){
				$(this).parent().find(".icon_operate_target").text(--num)
			} else {
				$(this).parent().find(".icon_operate_target").text(0)
			}
		})
	}
	
	//--------------------动态改变下单数量和总价 end----------------------------------
	
	//----------------------加入购物车 放入localStorage  start------------------------------
	add_item_to_cart()
	function add_item_to_cart(){
		var menuList = [
			{ id: "v190001", name: "金枪鱼排", untiprice: "76"},
			{ id: "v190002", name: "草莓", untiprice: "13"},
			{ id: "v190003", name: "菲力牛排", untiprice: "42"},
			{ id: "v190004", name: "龙虾", untiprice: "123"},
			{ id: "v190005", name: "土豆", untiprice: "5"},
			{ id: "v190006", name: "牡蛎", untiprice: "23"},
			{ id: "v190007", name: "鱿鱼圈", untiprice: "35"},
			{ id: "v190008", name: "什锦蔬菜", untiprice: "7"},
			{ id: "v190009", name: "猪肋骨", untiprice: "31"},
			{ id: "v190010", name: "猪腿肉", untiprice: "28"},
			{ id: "v190011", name: "田螺", untiprice: "38"},
			{ id: "v190012", name: "美国草莓", untiprice: "18"},
			{ id: "v190013", name: "菠菜", untiprice: "6"},
			{ id: "v190014", name: "时令蔬菜", untiprice: "8"},
		]
		
		//存在本地 ，显示在网页——加入购物车
		$(".cart_add").click(function(e){
			var itemName = $(this).parent().parent().find(".itemName").text();
			var price = parseInt($(this).parent().find(".untiPrice").text());
			var qty = parseInt($(this).parent().find(".icon_operate_target").text());
			
			//找到菜品的代号
			for(var i in menuList){
				if(menuList[i].name == itemName){
					var itemId = menuList[i].id;
					break;
				};
			}
			
			var arrayPush_switch = true;
			//看看当前Json数组中有没有相同的记录,有则只是更新数量,同时关闭数组push的开关
			var cart_add_before = getLocalStorageCart();
			for(var j in cart_add_before){
				if(cart_add_before[j].vegname == itemName){
					updateLocalStorageCart(cart_add_before[j].vegname, qty);
					arrayPush_switch = false;
					break;
				};
			}
			//若数量大于零，则添加到订单Json数组中
			if(qty > 0 && arrayPush_switch){
				pushLocalStorageCart(itemId,itemName,qty,price);
			}
			
		   	if(qty > 0){
		   		swal({
		   			title:"成功加入购物车",
		   			text:"",
		   			type: "success",
		   			imageUrl: "", 
		   			timer: 1000
		   		});
		   		initHtml();
		   	}
		});
	}
	
	//----------------------加入购物车 放入localStorage  end------------------------------
	
	
	//---------常用操作封装----------------------
	function getLocalStorageCart(){
		var storage = window.localStorage;
		var cart_str = storage.getItem("orderList");
		var cart_Json = JSON.parse(cart_str);
		
		//console.log(cart_Json);
		//console.log("购物车获取成功");
		return cart_Json;
	}
	function updateLocalStorageCart(itemName_in, qty_in){
		var storage = window.localStorage;
		var cart_str = storage.getItem("orderList");
		var cart_Json = JSON.parse(cart_str);
		
		for(var i in cart_Json){
			if(cart_Json[i].vegname == itemName_in){
				cart_Json[i].vegnum = qty_in;
			}
		}
		
		var arrayData = JSON.stringify(cart_Json);
	   	storage.setItem("orderList", arrayData);
	   	
		//console.log("购物车更新成功");
	   	//console.log(JSON.parse(window.localStorage.orderList));
	}
	function pushLocalStorageCart(itemId_in, itemName_in, qty_in, price_in){
		var storage = window.localStorage;
		var cart_str = storage.getItem("orderList");
		var cart_Json = JSON.parse(cart_str);
		
		if(cart_Json == null){
			cart_Json = [];
		}
		cart_Json.push({ vegid: itemId_in, vegname: itemName_in, vegnum: qty_in, untiprice: price_in});
		
		var arrayData = JSON.stringify(cart_Json);
	   	storage.setItem("orderList", arrayData);
	   	
		//console.log("购物车添加成功");
	   	//console.log(JSON.parse(window.localStorage.orderList));
	}
	function clearLocalStorageCart(){
		var storage = window.localStorage;
		storage.clear();
		console.log("购物车清空成功");
	}
	
	function getLocalStorageUserInfo(){
		var storage = window.localStorage;
		var userInfo_str = storage.getItem("userInfo");
		var userInfo_Json = JSON.parse(userInfo_str);
		
		return userInfo_Json;
	}