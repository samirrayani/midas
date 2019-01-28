if( $ ) {
	$(document).ready(function(){
		$.get("/Midas.js?"+Math.random(), undefined, function(data) {
			$('#midasjs').text(data);
			hljs.initHighlighting();

			$('#midasjs').each(function(i, block) {
				hljs.lineNumbersBlock(block);
			});
		});

		$.get("/LICENSE.txt?"+Math.random(), undefined, function(data) {
			$('#license').text(data);
			hljs.initHighlighting();
		});
	});
}