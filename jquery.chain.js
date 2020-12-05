/*
* emmet 기능중 id와 class 부분만 기능함.
*/
$.emmet = function(str){
	let arr = str.split("#"); //id를 먼저 분리
	let tag = arr[0]; //id를 분리한 0번째 값을 tag에 대입
	let id = arr[1] || ""; //id를 분리한 1번째 값이 없으면 공백을 대입
	let classes = id === "" ? tag.split(".") : id.split("."); //id 값이 없으면 tag에서 class를 분리, 아니면 id에서 class를 분리

	let returns = []; //return할 배열
	returns.push(classes.length > 1 ? classes[0] : tag); //0번째에 tagName을 대입

	let json = {}; //returns 1번째에 포함시킬 json
	if(id !== ""){ //id가 있을 경우에만
		json.id = id; //json에 id로 대입
	}
	for(let i = 1; i < classes.length; i++){ //classes가 있으면 1번째부터 동작, 0번째는 무조건 tagName에 해당됨.
		json.class = json.class ? json.class + " " + classes[i] : classes[i]; //json.class가 undefined 즉, 처음 동작되면 바로 json.class를 대입하고 그 이후부터는 json.class 뒤에 공백 + 새로운 classes를 붙여 대입한다.
	}
	returns.push(json); //조립된 json을 1번째로 대입

	return returns;
}

/*
* chaning dynamic ui: $.chain
* jquery DOM 선택 이동함수를 활용: prev()/next()/parent()/children()
*/
$.chain = function(object, element, attr = {}, direction = "append"){
	if(element instanceof $){
		$(object)[direction](element);
		return element;
	}else{
		let [ tag, _attr ] = $.emmet(element); //emmet으로 처리된 tag와 attributes를 받는다.
		$.extend(true, attr, _attr); //emmet으로 입력된 값이 우선권을 갖도록 처리하고 attr을 사용하도록 함.

		let $element = $(`<${tag}/>`, {...attr});
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

$.fn.$appends = function(element, attrs = []){
	return $.chains(this, element, attrs, "append");
}

$.fn.$prepends = function(element, attrs = []){
	return $.chains(this, element, attrs, "prepend");
}

$.fn.$afters = function(element, attrs = []){
	return $.chains(this, element, attrs, "after");
}

$.fn.$befores = function(element, attrs = []){
	return $.chains(this, element, attrs, "before");
}
