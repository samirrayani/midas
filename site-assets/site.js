$(document).ready(function(){
	$.get("/Midas.js?"+Math.random(), undefined, function(data) {
		$('#midasjs').text(data);
		hljs.initHighlighting();
	});

	$.get("/LICENSE.txt?"+Math.random(), undefined, function(data) {
		$('#license').text(data);
		hljs.initHighlighting();
	});

	$('code.hljs').each(function(i, block) {
		hljs.lineNumbersBlock(block);
	});
});