var showidiom =function(idiom){
	return "<b>"+idiom.key+"</b>:"+idiom.zhuyin+idiom.def;
}
var dosearch=function(tofind){
	var arr=search(tofind);
	document.getElementById("result").innerHTML=arr.map(showidiom).join("<br>");
}