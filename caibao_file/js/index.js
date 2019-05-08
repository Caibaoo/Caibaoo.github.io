	window.onload= function(){
		var cart_total = document.getElementsByClassName("simpleCart_total")[0];
		cart_total.innerText = "￥" + cart_total.innerText.substr(1)
	}
