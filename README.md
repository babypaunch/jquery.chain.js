# jquery.chain.js - jquery chaining plugin

## 1. Base
jquery의 element 생성 문법 중에 object style로 생성하는 방법에 d3.js의 chaining 방식을 접목한 plugin.

## 1.1. usage
|구분|내용|
|---|---|
|$(selector).$append(elementTagNameString, {...attr})|jquery object 하위에서 뒤로 새로운 jquery object를 생성한다.|
|$(selector).$prepend(elementTagNameString, {...attr})|jquery object 하위에서 앞으로 새로운 jquery object를 생성한다.|
|$(selector).$after(elementTagNameString, {...attr})|jquery object 뒤에 새로운 jquery object를 생성한다.|
|$(selector).$before(elementTagNameString, {...attr})|jquery object 앞에 새로운 jquery object를 생성한다.|

## 1.2. parameter
|구분|Type|내용|
|----|----|----|
|elementTagNameString|String|동적으로 생성될 element의 tag name을 입력|
|{...attr}|json|동적으로 생성되는 element에 적용될 attributes를 입력|

## 1.3. return
$append/$prepend/$after/$before를 사용하면 첫 번째 파라미터에 해당하는 tag를 jquery object 형태로 return한다.

## 1.4. example
```
<div id="sample"></div>

<script src="jquery.chain.js"></script>
$(function{
	$("#sample")
	.$append("div", {text: "jquery.chain.js start"})
		.$append("div")
			.$append("span", {text: "개발자: "}).$after("span", {text: "정대규"}).parent()
		.$append("div")
			.$append("span", {text: "개발년도: "}).$after("span", {text: "2020"}).parent()
	;
});
```

## 2. extend
chaning에도 사용상의 한계가 있었는데, 동적으로 생성되는 부분을 다중 처리해서 중간에 넣는게 쉽지 않았다.
이 부분도 chaning 방식을 구현해서 사용성을 높여 보았다.

## 2.1. usage
|구분|내용|
|---|---|
|$(selector).$appends(elementTagNameString, [...attrs])|jquery object 하위에서 뒤로 새로운 jquery object를 여러번 생성한다.|
|$(selector).$prepends(elementTagNameString, [...attrs])|jquery object 하위에서 앞으로 새로운 jquery object를 여러번 생성한다.|
|$(selector).$afters(elementTagNameString, [...attrs])|jquery object 뒤에 새로운 jquery object를 여러번 생성한다.|
|$(selector).$befores(elementTagNameString, [...attrs])|jquery object 앞에 새로운 jquery object를 여러번 생성한다.|

## 2.2. parameter
|구분|Type|내용|
|----|----|----|
|elementTagNameString|String|동적으로 생성될 element의 tag name을 입력|
|[...attrs]|Array|동적으로 생성되는 element에 적용될 attributes를 입력 배열로 입력|

## 2.3. return
base와 마찬가지로 첫 번째 파라미터에 해당하는 tag를 jquery object 형태로 return한다.

## 2.4. example
```
<div id="sample"></div>

<script src="jquery.chain.js"></script>
$(function{
	let regions = [ //다중 처리 대상
		{value: "kor", text: "한국"}
		, {value: "usa", text: "미국"}
		, {value: "eng", text: "영국"}
	];

	//extend-case1
	var $select = $("<select/>").appends("option", regions); //동적 생성 부분
	$("#sample")
		.$append("div")
			.$append("span", {text: "지역: "})
			.$after($select).parent()
		.$after("div", {text: "- The End -"})
	;

	//extend-case2
	$("#sample")
		.$append("div")
			.$append("span", {text: "지역: "})
			.$after("select").appends("option", regions).parent()
		.$after("div", {text: "- The End -"})
	;
});
```