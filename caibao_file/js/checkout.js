
	//把导航条购物车去掉
	window.onload= function(){
		var cart_total = document.getElementsByClassName("simpleCart_total")[0];
		cart_total.innerText = "￥" + cart_total.innerText.substr(1)
	}
	
	
	//----------------------------------订单更改和下单 访问数据库 start -----------------------------------------
	$(".new_order").click(function(event){		
		event.preventDefault();
		var payMoney = $(".simpleCart_total").text();
		var payItem = $("#simpleCart_quantity").text();
		//swal("确认！", "请确认金额","success");
		
		//弹出框
		if(0){
			swal({    
				title: "您还未登陆",    
				type: "info",   
				showCancelButton: true,
				cancelButtonText: "取消",
				confirmButtonColor: "info",   
				confirmButtonText: "登陆",   
				closeOnConfirm: false
			},
				function(){   
					  window.location.href = "login.html";
				}
			);
		} else {
			swal({    
				title: "请确认金额",
				text: "总" + payMoney + " " + "共选购 " + payItem + " 项",
				type: "info",   
				showCancelButton: true,
				cancelButtonText: "取消",
				confirmButtonColor: "info",   
				confirmButtonText: "支付",   
				closeOnConfirm: false
			},
				function(){
					var storage = window.localStorage;
				    var List_string = storage.getItem("orderList");
				    var List_Json = JSON.parse(List_string);
					//Ajax(List_Json);
					swal("下单成了", "", "success")
				}
			);
		}
	});
	
	
	var list = [
		{ vegid: "v190001", name: "金枪鱼排", vegnum: "4", untiprice: "76"},
		{ vegid: "v190002", name: "草莓", vegnum: "2", untiprice: "13"},
	]
	
	var storage = window.localStorage;
    var List_string = storage.getItem("orderList");
    var List_Json = JSON.parse(List_string);
	//Ajax(List_Json);
	//总价 总项数 	 商品代号及对应购买数量----数组形式
	//为此需要做一个卖品的ID表，用来生成orderArray
	function Ajax(Money, Item, orderArray){
		$.ajax(
			{
				url: 'http://101.132.184.238:81/v0/cart',
				type: 'post',
				data: {
					veglist: list,
				},
				dataType:'json',
				error: function(data){
					console.log("连接出错");
					console.log(data.message);
				},
				success:function(data){
					console.log("连接成功"); 
					console.log(data.message );
					
//					if(data.message == "error"){
//						swal("下单失败！", "请检查网络","error");
//					} else {
//						swal("下单成功！", "正在配送","success");
//					}
					
				}
			}
		);
	}
	//----------------------------------订单更改和下单 访问数据库 end-----------------------------------------

	//--------------------动态改变下单数量和总价 start----------------------------------
	$(".icon_plus").click(function(event){
		event.preventDefault()
		
		var num = parseInt($(this).parent().parent().find(".icon_operate_target").text())
		$(this).parent().parent().find(".icon_operate_target").text(++num)
		
		//算单项总价
		var unitPrice = parseInt($(this).parent().parent().find(".cart_item_unitPrice").text())
		var deliveryPrice = parseInt($(this).parent().parent().find(".cart_item_deliveryPrice").text())
		$(this).parent().parent().find(".cart_item_itmeTotalPrice").text(unitPrice * num + deliveryPrice)
		
		
		//更新订单总价
		var totalPrice = 0;
		$(".cart_item_itmeTotalPrice").each(function(){
			totalPrice += parseInt($(this).text());
		});
		
		$(".order_totalPrice").find(".order_totalPrice_show").text(totalPrice);
		
	})
	
	$(".icon_minus").click(function(event){
		event.preventDefault()
		var num = parseInt($(this).parent().parent().find(".icon_operate_target").text())
		
		if(num > 0 ){
			$(this).parent().parent().find(".icon_operate_target").text(--num)
		} else {
			$(this).parent().parent().find(".icon_operate_target").text(0)
		}
		
		//算单项总价
		var unitPrice = parseInt($(this).parent().parent().find(".cart_item_unitPrice").text())
		var deliveryPrice = parseInt($(this).parent().parent().find(".cart_item_deliveryPrice").text())
		
		if(num > 0 ){
			$(this).parent().parent().find(".cart_item_itmeTotalPrice").text(unitPrice * num + deliveryPrice)
		} else {
			$(this).parent().parent().find(".cart_item_itmeTotalPrice").text(0)
		}
		
		
		//更新订单总价
		var totalPrice = 0;
		$(".cart_item_itmeTotalPrice").each(function(){
			totalPrice += parseInt($(this).text());
		});
		
		$(".order_totalPrice").find(".order_totalPrice_show").text(totalPrice);
	})
	
	//--------------------动态改变下单数量和总价 end----------------------------------


	//--------------------购物车每一栏的展示和消失 start----------------------------------

	$('.close').each(function(){
		$(this).on('click', function(c){
			$(this).parent().fadeOut('slow', function(c){
				$(this).remove();
			});
		});	
	});
		

	//--------------------购物车每一栏的展示和消失 end----------------------------------

	//--------------------页面初始化之 购物车每一栏信息抽象 start----------------------------------

	//菜名
	//console.log($(".cart_item_itemName").find("a").text())
	
	//图片url
	//$(".img-responsive")[0].src();
	
	//该菜品的标签
	//console.log($(".qty").find("p").text())
	
	//单价
	//console.log($(".cart_item_unitPrice").text())
	
	//配送费
	//console.log($(".cart_item_deliveryPrice").text())
	
	//单项总价
	//console.log($(".cart_item_itmeTotalPrice").text())
	
	//购买数量
	//console.log($(".icon_operate_target").text())
	
	//插入新的项   需要重新执行事件绑定
	var cart_length = $(".cart-header").length;
	
	//渲染购物车信息
    var storage = window.localStorage;
    var orderList_string = storage.getItem("orderList");
    var orderList_Json = JSON.parse(orderList_string);
    //console.log(orderList_Json);
    for(var i in orderList_Json){
    	$(".img-responsive")[i].src = id_to_url(orderList_Json[i].id);
    	$(".cart_item_itemName")[i].children.innerText = orderList_Json[i].name;
    	$(".icon_operate_target")[i].innerText = orderList_Json[i].quantity;
    	$(".cart_item_unitPrice")[i].innerText = orderList_Json[i].untiprice;
    	
    	//展示框不够了  退出
    	if(i > 4){
    		alert("没空间啦");
    		break;
		    //不够用再加html代码
		    //cartAgainHtml = $(".cart-header").html();
			///$(".cart-gd").append("<div class='cart-header'>" + cartAgainHtml + "</div>");
    	}
    }
    
    //隐藏多余的框
    for(i = orderList_Json.length; i < cart_length; i ++){
    	$(".cart-header")[i].style.display = "none";
    }
    
	
	
	//测试数据
	var arrayTest = {
		id: "v190001",
		name: "草莓",
		quantity: "4",
		untiprice: "13",
	}
	
	var veglist = [
		{ vegid: "v190001", name: "草莓", vegnum: "4", untiprice: "13"},
		{ vegid: "v190001", name: "草莓", vegnum: "4", untiprice: "13"}
	]
	veglist.push({ vegid: "v190002", name: "鱼肉", vegnum: "2", untiprice: "20"});
	
	//var arrayData = JSON.stringify(arrayTest);

	//--------------------页面初始化之 购物车每一栏信息抽象 end----------------------------------
	


	//--------------------菜品id和对应的图片地址函数-------------------------------------------
	function id_to_url(id){
		var imageUrl;
		switch(id){
			case "v190001": imageUrl = "images/caibao/img_1.jpg";break;
			case "v190002": imageUrl = "images/caibao/img_2.jpg";break;
			case "v190003": imageUrl = "images/caibao/img_3.jpg";break;
			case "v190004": imageUrl = "images/caibao/img_4.jpg";break;
			case "v190005": imageUrl = "images/caibao/img_5.jpg";break;
			case "v190006": imageUrl = "images/caibao/img_6.jpg";break;
			case "v190007": imageUrl = "images/caibao/img_7.jpg";break;
			case "v190008": imageUrl = "images/caibao/img_8.jpg";break;
			case "v190009": imageUrl = "images/caibao/img_9.jpg";break;
			case "v190010": imageUrl = "images/caibao/img_10.jpg";break;
			case "v190011": imageUrl = "images/caibao/img_11.jpg";break;
			case "v190012": imageUrl = "images/caibao/img_12.jpg";break;
			case "v190013": imageUrl = "images/caibao/img_13.jpg";break;
			case "v190014": imageUrl = "images/caibao/img_14.jpg";break;
			default: imageUrl = "images/caibao/img_1.jpg";
		}
		return imageUrl;
	}
