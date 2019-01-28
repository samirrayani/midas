$(document).ready(function(){
	$.get("/Midas.js?"+Math.random(), undefined, function(data) {
		$('#midasjs').text(data);
		hljs.initHighlighting();
	});
});