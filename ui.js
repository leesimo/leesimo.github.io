var dosearch=function(){
	var tofind =document.getElementById("tofind").value;
	var arr = search(tofind);
	document.getElementById("result").innerHTML=arr.join("<br/>");
}