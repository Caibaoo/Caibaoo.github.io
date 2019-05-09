
	//--------------------常用代码记录区 start -------------------------
		
		//var arrayData = JSON.stringify(orderList);
	    //var orderList_Json = JSON.parse(orderList_string);
	

	//--------------------常用代码记录区 end  -------------------------


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
	
	
	
	
	//----------------------------------订单更改和下单 访问数据库 start -----------------------------------------
		$(".new_order").click(function(event){		
			event.preventDefault();
			var payMoney = $(".order_totalPrice_show").text();
			var payItem = $(".checkout_cart_qty").text();
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
					text: "总 " + payMoney + " 元 " + "共选购 " + payItem + " 项",
					type: "info",   
					showCancelButton: true,
					cancelButtonText: "取消",
					confirmButtonColor: "info",   
					confirmButtonText: "支付",   
					closeOnConfirm: false
				},
					function(){
						//取出购物车数据和总价
						var storage = window.localStorage;
					    var List_string = storage.getItem("orderList");
					    var List_Json = JSON.parse(List_string);
						
						var sumAll = parseInt($(".order_totalPrice_show").text());
						//console.log(sumAll);
						Ajax(List_Json, sumAll);
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
	    
		//总价 总项数 	 商品代号及对应购买数量----数组形式
		//为此需要做一个卖品的ID表，用来生成orderArray
		function Ajax(list_in, totalprice_in){
			$.ajax(
				{
					url: 'http://101.132.184.238:81/v0/order',
					type: 'post',
					data: {
						veglist: list_in,
						totalprice: totalprice_in,
					},
					dataType:'json',
					error: function(data){
						console.log("连接出错");
						console.log(data.message);
					},
					success:function(data){
						console.log("连接成功"); 
						console.log(data.message );
						
						if(data.message == "error"){
							swal("下单失败", "请检查网络","error");
						} else {
							swal("下单成功", "正在配送","success");
						}
						
					}
				}
			);
		}
	//----------------------------------订单更改和下单 访问数据库 end-----------------------------------------

	//----------------------事件绑定 动态改变下单数量和总价 start----------------------------------
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
	
	//----------------------动态改变下单数量和总价 end----------------------------------


	//--------------------购物车每一栏的展示和消失 start----------------------------------
	
		$('.close').each(function(){
			$(this).on('click', function(c){
				$(this).parent().fadeOut('slow', function(c){
					$(this).remove();
				});
			});	
		});
		

	//--------------------购物车每一栏的展示和消失 end----------------------------------

	//--------------------页面初始化之 购物车每一栏start----------------------------------
	
		//信息抽象
		//菜名 console.log($(".cart_item_itemName").find("a").text())
		//图片url$(".img-responsive")[0].src(); 
		//单价console.log($(".cart_item_unitPrice").text())
		//单项总价console.log($(".cart_item_itmeTotalPrice").text())
		//购买数量console.log($(".icon_operate_target").text())
		
		//**未解决**
		//配送费console.log($(".cart_item_deliveryPrice").text())
		//该菜品的标签console.log($(".qty").find("p").text())
		
		
		//判断当前页面的购物车的框的个数，初始为4（0 1 2 3 4）
		var cart_length = $(".cart-header").length;
		//渲染购物车信息
	    var storage = window.localStorage;
	    var orderList_string = storage.getItem("orderList");
	    
	    //判断购物车是否为空
	    if(orderList_string != null){
	    	var orderList_Json = JSON.parse(orderList_string);
		    //console.log(orderList_Json);
		    for(var i in orderList_Json){
		    	$(".img-responsive")[i].src = id_to_url(orderList_Json[i].id);
		    	$(".cart_item_itemName")[i].innerText = orderList_Json[i].name;
		    	$(".icon_operate_target")[i].innerText = orderList_Json[i].quantity;
		    	$(".cart_item_unitPrice")[i].innerText = orderList_Json[i].untiprice;
		    	
		    	//展示框不够了  退出
		    	if(i > 4){
		    		alert("没空间啦");
		    		break;
				    //不够用再加html代码
					//插入新的项   需要重新执行事件绑定
				    //cartAgainHtml = $(".cart-header").html();
					///$(".cart-gd").append("<div class='cart-header'>" + cartAgainHtml + "</div>");
		    	}
		    }
		    
		    //隐藏多余的框
		    for(i = orderList_Json.length || 0; i < cart_length; i ++){
		    	$(".cart-header")[i].style.display = "none";
		    }
		    
	    } else {
		    //隐藏所有的框  也就是购物车为空
		    for(i = 0; i < cart_length; i ++){
		    	$(".cart-header")[i].style.display = "none";
		    }
	    }

	//--------------------页面初始化之 购物车每一栏 end----------------------------------
	
	//--------------------页面初始化之 初次加载界面购物车算每一栏和总价start----------------------------------
		
		//初次加载界面算每一栏价格
		$(".icon_minus").each(function(i){
			var init_num = parseInt($(this).parent().parent().find(".icon_operate_target").text())
			var init_unitPrice = parseInt($(this).parent().parent().find(".cart_item_unitPrice").text())
			var init_deliveryPrice = parseInt($(this).parent().parent().find(".cart_item_deliveryPrice").text())
			
			if(init_num > 0 ){
				$(this).parent().parent().find(".cart_item_itmeTotalPrice").text(init_unitPrice * init_num + init_deliveryPrice)
			} else {
				$(this).parent().parent().find(".cart_item_itmeTotalPrice").text(0)
			}
		});


		//初次加载显示购物车页面项数
		if(orderList_string != null){
			$(".checkout_cart_qty").text(orderList_Json.length);
		} else {
			$(".checkout_cart_qty").text("0");
		}
		
		//初次加载界面计算订单总价
		var init_totalPrice = 0;
		$(".cart_item_itmeTotalPrice").each(function(i){
			if(orderList_string != null){
				if(i < orderList_Json.length){
					init_totalPrice += parseInt($(this).text());
				} else {
					return false;
				}
			} else{
				init_totalPrice = 0;
			}
		});
		$(".order_totalPrice").find(".order_totalPrice_show").text(init_totalPrice);
		

		
	//--------------------页面初始化之 初次加载界面购物车算总价 end----------------------------------
	


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
