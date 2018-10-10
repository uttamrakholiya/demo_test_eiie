var validUrlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
doubleQuoteRegex = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
var validRegex = "<span\b[^>]*>(.*?)</span>";

CKEDITOR.plugins.add( 'autourl', {	
	init: function( editor ) {
		editor.on( 'paste', function( evt ) {
			var data = evt.data.html;			
			//console.log('data');				
			//console.log(data);
			
			//var data = data.replace('font-weight: bold;', "padding: 0px 4px; font-weight: bold;");
			//var data = append(data);	
			//var data = data.replace(' ', ' <span > </span> ');
			// var data = data.replace(/([\S]*)\s(.*)/, "$1 <span >$2</span> ");			
			//var datas = data.replaceAll("</span>", "</span> ");
			//var text1 = data.replace(validRegex, "<span >$1</span>");         
			//var data = text1.replace(' ', '$1<span>$2</span> ');

			//data = data.replace(/([\S]*)\s(.*)/, "$1 <span>$2</span> ");
			var data = data.replace(/<\/span>/g, "</span> ");
			var data = data.replace(/<\/b>/g, "</b> ");
			if (data.match(/<a [^>]+>([^<]+)<\/a>/)) {				
			}else{
				var text1 = data.replace(validUrlRegex, "<a href='$1'>$1</a>");         
				var data = text1.replace(doubleQuoteRegex, '$1<a target="_blank" href="http://$2">$2</a>');
			}
			console.log(data);
			
			// If link was discovered, change the type to 'html'. This is important e.g. when pasting plain text in Chrome
			// where real type is correctly recognized.
			if ( data != evt.data.html ) {
				evt.data.type = 'html';
			}
			evt.data.html = data;
		} );
	}
} );