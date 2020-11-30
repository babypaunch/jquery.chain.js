/*
* chaning dynamic ui: $.chain
* jquery DOM 선택 이동함수를 활용: prev()/next()/parent()/children()
*/
$.chain = function(object, element, attr = {}, direction = "append"){
	if(element instanceof $){
		$(object)[direction](element);
		return element;
	}else{
		let $element = $(`<${element}/>`, {...attr});
		$(object)[direction]($element);
		return $element;
	}
}

$.fn.$append = function(element, attr = {}){
	return $.chain(this, element, attr, "append");
}

$.fn.$prepend = function(element, attr = {}){
	return $.chain(this, element, attr, "prepend");
}

$.fn.$after = function(element, attr = {}){
	return $.chain(this, element, attr, "after");
}

$.fn.$before = function(element, attr = {}){
	return $.chain(this, element, attr, "before");
}

/*
* 동일한 동작을 여러번 실행해서 DOM을 생성하는 경우 활용
*/
$.chains = function(object, element, attrs = [], direction = "append"){
	for(let i = 0; i < attrs.length; i++){
		$(object)[direction]($(`<${element || ""}/>`, {...attrs[i]}));
	}
	return object;
}

$.fn.appends = function(element, attrs = []){
	return $.chains(this, element, attrs, "append");
}

$.fn.prepends = function(element, attrs = []){
	return $.chains(this, element, attrs, "prepend");
}

$.fn.afters = function(element, attrs = []){
	return $.chains(this, element, attrs, "after");
}

$.fn.befores = function(element, attrs = []){
	return $.chains(this, element, attrs, "before");
}
