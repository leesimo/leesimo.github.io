var glob=require("glob");
var fs=require("fs")


var processFile=function(fn){
	var out=[];
	var lines=fs.readFileSync(fn,"utf8").split("\n");
    var zhuyin="注音&nbsp;";
    var hanyu="漢語拼音&nbsp;";
   
	for(var i=200;i<lines.length;i++){
		var line=lines[i];
		if(line.indexOf("<!--layoutclass_second-->")>-1)break;

		line=line.replace(/<.*?>/g,"");

		var zhuyinstart=line.indexOf(zhuyin);
		var hanyustart=line.indexOf(hanyu);
        
		if(zhuyinstart>-1){
			out.push('zhuyin:"'+line.substr(zhuyinstart+8)+'"');
		}else if(hanyustart>-1){
			out.push('hanyu:"'+line.substr(hanyustart+9)+'"');
		}
	}
	return "{"+out.join(",")+"}";
}


glob("cw-data/*/*.html",function(err,files){
	var arr=files.map(processFile);
	var output="var idioms=["+arr.join(",\n")+"]"
	console.log(output);
})