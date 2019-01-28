if( $ ) {
	$(document).ready(function(){		
		
		$.get("/LICENSE.txt?"+Math.random(), undefined, function(data) {
			$('#license').text(data);
		});

		$.get("/Midas.gs?"+Math.random(), undefined, function(data) {
			$('#midasjs').text(data);
			//
			$('#midasjs').each(function(i, block) {
				hljs.lineNumbersBlock(block);
			});
			hljs.initHighlighting();
		});

	});
}