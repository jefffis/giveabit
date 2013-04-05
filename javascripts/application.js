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
	var $details = $('#details');
	var $donate = $('#donate');
	var $donate_label = $donate.find('label');
	var $amount = $('#amount');
	var $chng = $('.chng');
	var $more = $('#more');

	var $ajax = $('a.ajax');
	var $info = $('#info');
	var $load = $('#load');
	var $loader = $('<h3 id="loader" class="loader">Loading&hellip;</h3>');
	var $info_cls = $load.next('span');

	var $header_link = $('header a');

	$header_link.on('click',function(){
		return false;
	});

	$ajax.on('click',function(e){
		//e.preventDefault();
		var $this = $(this);
		var $this_url = $this.attr('href');
		$load.html($loader);
		$load.load($this_url, function(){
			$load.find($loader).remove();
		}).addClass('show');
		$info_cls.addClass('show');
		//$info.addClass('show');
		//$.getScript('javascripts/application.js');
		return false;
	});

	$donate_label.on('click',function(){
		var $this = $(this);
		var $this_radio = $this.find('input');
		$this_radio.attr('checked',true);
		//alert(typeof $this_radio);
	});

	$info_cls.on('click',function(){
		$load.removeClass('show');
		$info_cls.removeClass('show');
	});

	$select_span.on('click',function(){
		$select.find('.intro').toggleClass('hide');
		$select.toggleClass('show');
	});

	$selects.on('click',function(){
		var $this = $(this);
		var $this_charity = $this.text();
		var $this_image = $this.data('img');
		var $this_href = $this.data('url');
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
		$more.attr('href',$this_href);
		$charity.text($this_charity);
		$load.removeClass('show');
		$info_cls.removeClass('show');
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
		if($input_invalid.length > 0){
			$('input.invalid').addClass('fix-me');
			//var $show_errors = $this.parent().prepend($errors);
			return false;
		}else{
			alert('fefe');
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
		var $this_value = $this.val();
		$radio.parent().removeClass('selected');
		$this.parent().addClass('selected');
		$amount.html('Great, you chose to donate <strong>'+$this_value+'!</strong>').addClass('yep');
		$chng.addClass('yep');
		$donate.addClass('yep').removeClass('init');
		$details.removeClass('not-yet');
	});

	$chng.on('click',function(){
		$details.addClass('not-yet');
		$donate.removeClass('yep').addClass('init');
		$chng.removeClass('yep');
	});

});