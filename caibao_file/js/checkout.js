
	//把导航条购物车去掉
	window.onload= function(){
		var cart_total = document.getElementsByClassName("simpleCart_total")[0];
		cart_total.innerText = "￥" + cart_total.innerText.substr(1)
	}
	
	
	//下单
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
					//Ajax(payMoney,payItem);
				}
			);
		}


	});
	
	//总价 总项数 	 商品代号及对应购买数量----数组形式
	
	//为此需要做一个卖品的ID表，用来生成orderArray
	
	
	function Ajax(Money, Item, orderArray){
		$.ajax(
			{
				url: 'http://localhost:8080/glasses_php/test.php',
				type: 'post',
				data: {
					imgurl: Money,
					item: Item,
					orderarray: orderArray,
				},
				dataType:'json',
				error: function(data){
					console.log("连接出错");
					//console.log(data);
				},
				success:function(data){
					console.log("连接成功");
					//console.log(data);
					
					if(data == "false"){
						swal("下单失败！", "请检查网络","error");	
					} else {
						swal("下单成功！", "正在配送","success");
					}
					
				}
			}
		);
	}



	//动态改变下单数量和总价
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
