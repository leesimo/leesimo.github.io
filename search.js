var search = function(tofind){
	var out=[];
    var searchword=new RegExp(tofind,"g");
	for(var i=0;i<idioms.length;i++){
		//if (idioms[i].key.indexOf(tofind)>-1) {
		var find=idioms[i].key.match(searchword);
		if (find){
			//var colorkey=idioms[i].key;
		    var colorkey=idioms[i].key.replace(searchword,function(m){
		    	return "<span class='emp'>"+m+"</span>";
		   });
		   out.push({key:colorkey,def:idioms[i].def,zhuyin:idioms[i].zhuyin});
	    }
    }
	return out;
}