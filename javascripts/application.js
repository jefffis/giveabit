$(function(){

var supportsTransitions  = (function() {
    var s = document.createElement('div').style, // 's' for style. better to create an element if body yet to exist
        v = ['ms','O','Moz','Webkit']; // 'v' for vendor

    if( s['transition'] == '' ) return true; // check first for prefeixed-free support
    while( v.length ) // now go over the list of vendor prefixes and check support until one is found
        if( v.pop() + 'Transition' in s )
            return true;
    return false;
})();

//console.log(supportsTransitions);

	var $html = $('html');
	var $outro = $('a.outro');
	var $header_link = $('header a');

	$html.removeClass('no-js');

	$header_link.on('click',function(){
		return false;
	});

	$outro.on('click',function(e){

		e.preventDefault();
		
		var $this = $(this);
		var $this_url = $this.attr('href');
		var $url = $this_url;
		
		var $header = $('header');
		var $main = $('#main');

		setTimeout(function(){
			$header.addClass('out');
			$main.addClass('out');
		}, 10);

		setTimeout(function(){
			//window.location = $url;
			$('body').load($url+' #wrap').after('<div class="half" id="half"></div>');
			$.getScript('javascripts/ajaxload.js');
			$.getScript('https://js.stripe.com/v1/');
		}, 500);
		
		//return false;
	});

});