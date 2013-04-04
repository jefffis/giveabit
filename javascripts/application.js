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
	var $payment = $('#payment');
	var $charity = $('#charity');
	var $half = $('#half');
	var $input = $('input[type=text]');
	var $input_invalid = $('input.invalid');
	var $input_cc = $('.n input');
	var $submit = $('#submit');
	var $errors = '<h3>Please correct these errors first.</h3>';
	var $radio = $('input[type=radio]');

	$select_span.on('click',function(){
		$select.find('.intro').toggleClass('hide');
		$select.toggleClass('show');
	});

	$selects.on('click',function(){
		var $this = $(this);
		var $this_charity = $this.text();
		var $this_image = $this.data('img');
		$select.find('.intro').toggleClass('hide');
		if(!$select.hasClass('show')){
			$select.addClass('show');
			return;
		}
		if($this.data('intro')){
			//$select.addClass('show');
			return;
		}
		$selects.removeClass('selected');
		$this.addClass('selected');
		$select.removeClass('show');
		$half.css('background-image','url('+$this_image+')').addClass('show');
		$charity.text($this_charity);
		$payment.addClass('show');
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

	$submit.on('click',function(){
		var $this = $(this);
		if($input_invalid.length >= 1){
			$('input.invalid').addClass('fix-me');
			//var $show_errors = $this.parent().prepend($errors);
			return false;
		}
	});

	$input.on('blur',function(){
		var $this = $(this);
		if($this.val()!=''){
			$this.removeClass('fix-me invalid').addClass('good');
		}
		/*if($input_invalid.length <= 0){
			alert('better');
			//$show_errors.remove();
		}*/
	});

	$input_cc.on('blur',function(){
		var $this = $(this);
		var $this_num = $this.val();
		var $first = $this_num.substring(0, 1);
		
		if($first=='4'){
			$this.parent().addClass('cc visa');
		}
		if(($first=='4') && ($this_num.length == 16)) {
			$this.removeClass('fix-me invalid');
		} else {
			$this.addClass('fix-me invalid');
		}

		//alert($this_num.length);

	});

	$radio.on('click',function(){
		var $this = $(this);
		$radio.parent().removeClass('selected');
		$this.parent().addClass('selected');
	});

});