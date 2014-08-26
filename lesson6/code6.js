var commonChar=function(sutra) { //用字統計
	var out={};
	for (var i=0;i<sutra.length;i++) {
		for (var j=0;j<sutra[i].length;j++) {
			var ch=sutra[i][j];	
			if (!out[ch]) out[ch]=0;
			out[ch]++;
		}
	}
	return out;
}
var sortObject=function(obj) { //陣列排序
	var out=[];
	for (var i in obj) {
		out.push(obj[i]+' '+i);
	}
	var sortby = function(a,b) {
		return (parseInt(b)-parseInt(a))
	};
	out.sort(sortby);
	return out;
}
var commonPhrase=function(sutra) {  //句子統計
	var phrases=sutra.join("").split(/[。,，,　,、,：,「,」,！, ,；,『,』,？]/);
	console.log('phrases ',phrases.length);
	var out={},uniquePhrase=0;
	for (var i=0;i<phrases.length;i++) {
		var ph=phrases[i];
		if (!out[ph]) {
			out[ph]=0;
			uniquePhrase++;
		}
		out[ph]++;
	}
	console.log('uniquePhrase ',uniquePhrase);
	return out;
}
var search=function(sutra) {
	var out=[];
	var tf=tofind.value;
	for (var i=0;i<sutra.length;i++)  {
		if (sutra[i].indexOf( tf)>-1) {
			out.push( sutra[i]);
			//out.push( sutra[i].replace(tf,'<font color="red">'+tf+'</font>'));
		}
	}
	output.innerHTML=out.join('<br>');
}
var pattern=function(sutra) {
	var out={};
	var pat=new RegExp(tofind2.value,"g");
	sutra.join("").replace(pat,function(m) {
		if (!out[m]) out[m]=0;
		out[m]++;	
	});
	output.innerHTML=sortObject(out).join('<br>');	
}
var similarity=function(ph1,ph2) {  //計算相似度
	var score=0;
	for (var i=0;i<ph1.length;i++) {
		var ch=ph1[i];
		if (ph2.indexOf(ch)>-1) score++;
	}
	return score/ph1.length;
}
var stop=false;
var similarAnalyse=function(sutra) {  //找相似句
	var max=100, minsim=0.8;
	var PH=[],out=[];
	var start=new Date();
	
	var phrases=commonPhrase(sutra);
	for (var p in phrases) PH.push(p);

	console.log('total length'+PH.length);
	for (var i=0;i<PH.length;i++) {
		if (stop) break;
		var group=Math.floor(PH.length/100);
		if (i%group==0) {
			var percent=Math.floor(((i/PH.length)*100)) + 1;
			console.log( percent +'% found '+out.length);
		}		
		for (var j=0;j<PH.length;j++) {
			var sim=similarity(PH[i],PH[j]);
			if (sim<1 && sim>minsim && PH[i].length*1.5 > PH[j].length ) {
				//if (PH[i].indexOf('長阿含經')>-1)continue;
				out.push([sim,PH[i],PH[j]]);
			}
		}
		if (max && out.length>max) break;
	}	
	out.sort(function(a,b) { 
		return b[0]-a[0];
	});
	var elapse=new Date() - start;
	console.log( Math.floor(elapse / 1000) +' seconds');
	output.innerHTML=out.join("<br>");
	return out;
}
//console.log(sortObject('common char ',commonChar(n1)));
//console.log(sortObject('common phrase',commonPhrase(n1)));