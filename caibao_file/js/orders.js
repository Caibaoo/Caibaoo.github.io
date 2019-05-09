
	//----------------页面初始化之基础初始化 start---------------------------
		initHtml();
		function initHtml(){
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
				cart_totalPrice += parseInt(cart_Json[i].quantity) * parseInt(cart_Json[i].untiprice);
			}
			$(".nav_cart_total").text("￥" + cart_totalPrice + ".0");
		}
	//----------------页面初始化之基础初始化 end---------------------------

	
	//--------------------动态改变下单数量和总价 start----------------------------------
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
	
	//--------------------动态改变下单数量和总价 end----------------------------------
	
	//----------------------加入购物车 放入localStorage  start------------------------------
	var menuList = [
		{ id: "v190001", name: "金枪鱼排", untiprice: "76"},
		{ id: "v190002", name: "草莓", untiprice: "13"},
		{ id: "v190003", name: "菲力牛排", untiprice: "42"},
		{ id: "v190004", name: "龙虾", untiprice: "123"},
		{ id: "v190005", name: "土豆", untiprice: "5"},
		{ id: "v190006", name: "牡蛎", untiprice: "23"},
		{ id: "v190007", name: "鱿鱼圈", untiprice: "35"},
		{ id: "v190008", name: "时令蔬菜", untiprice: "7"},
		{ id: "v190009", name: "猪肋骨", untiprice: "31"},
		{ id: "v190010", name: "猪腿肉", untiprice: "28"},
		{ id: "v190011", name: "田螺", untiprice: "38"},
		{ id: "v190012", name: "美国草莓", untiprice: "18"},
		{ id: "v190013", name: "菠菜", untiprice: "6"},
		{ id: "v190014", name: "什锦蔬菜", untiprice: "8"},
	]
	
	for(var i in menuList){
		if(menuList[i].name == "美国草莓"){
			console.log(menuList[i].untiprice);
		};
	}
	
	//用来存放当前购物车菜品信息
	var orderList = []
	
	//存在本地 ，显示在网页——加入购物车
	$(".cart_add").click(function(e){
		var itemName = $(this).parent().parent().find(".itemName").text();
		var Price = parseInt($(this).parent().find(".untiPrice").text());
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
		for(var j in orderList){
			if(orderList[j].name == itemName){
				orderList[j].quantity = qty;
				arrayPush_switch = false;
				break;
			};
		}
		//若数量大于零，则添加到订单Json数组中
		if(qty > 0 && arrayPush_switch){
			orderList.push({ id: itemId, name: itemName, quantity: qty, untiprice: Price});
		}
		
		//存入本地 
		var arrayData = JSON.stringify(orderList);
	   	var storage = window.localStorage;
	   	storage.setItem("orderList", arrayData);
	   	console.log(window.localStorage)
	   	if(qty > 0){
	   		swal({
	   			title:"成功加入购物车",
	   			text:"",
	   			type: "success",
	   			imageUrl: "", 
	   			timer: 1000
	   		});
	   	}
	});
	
	//----------------------加入购物车 放入localStorage  end------------------------------
	
