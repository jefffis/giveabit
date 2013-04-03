// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//

$(function(){
	var $search = $('#search');
	var $select = $('#select');
	var $selects = $('#select').find('li');
	var $select_span = $select.find('span');

	$select_span.on('click',function(){
		$select.toggleClass('show');
	});

	$selects.on('click',function(){
		var $this = $(this);
		if(!$select.hasClass('show')){
			$select.addClass('show');
			return;
		}
		$selects.removeClass('selected');
		$this.addClass('selected');
		$select.removeClass('show');
	});

	$search.on('focus',function(){
		$select.removeClass('show');
	});

	$search.on('blur',function(){
		var $this = $(this);
		if($this.val()==''){
			$this.removeClass('show');
			return;
		}
		$this.addClass('show');
	});

});