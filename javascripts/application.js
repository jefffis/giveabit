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

Stripe.setPublishableKey('pk_YOUR_PUBLISHABLE_KEY');

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
	var $search = $('#search');
	var $select = $('#select');
	var $selects = $('#select').find('li');
	var $select_span = $select.find('span');
	var $payment = $('#payment');
	var $charity = $('#charity');
	var $half = $('#half');
	var $input = $('input[type=text]');
	var $input_invalid = $('input.invalid');
	//var $input_invalid_val = $input_invalid.val();
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

	var $outro = $('a.outro');

	var $header_link = $('header a');

	$html.removeClass('no-js');

	$header_link.on('click',function(){
		return false;
	});

	/*if($input_invalid.val()!=''){
		$input_invalid.removeClass('input');
	}*/

	$ajax.on('click',function(){
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
			window.location = $url;
			//$('body').load($url+' #wrap');
			//$.getScript('javascripts/application.js');
		}, 500);
		
		//return false;
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

	/*$submit.on('click',function(){
		var $this = $(this);
		if($input_invalid.length > 0){
			$('input.invalid').addClass('fix-me');
			//var $show_errors = $this.parent().prepend($errors);
			return false;
		}else{
			alert('fefe');
		}
		
	});*/

	$input.on('blur',function(){
		var $this = $(this);
		if($this.val()!=''){
			$this.removeClass('fix-me invalid').addClass('good');
		}
		console.log($('.invalid').length);
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
		$radio.removeClass('invalid');
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

	$submit.on('click',function(){
		var $this = $(this);
		if($input_invalid){
			$('input.invalid').addClass('fix-me');
			$('input.invalid:first').focus();
		}
		return false;		
	});

	/*function addInputNames() {
        // Not ideal, but jQuery's validate plugin requires fields to have names
        // so we add them at the last possible minute, in case any javascript 
        // exceptions have caused other parts of the script to fail.
        $(".card-number").attr("name", "card-number")
        $(".card-cvc").attr("name", "card-cvc")
        $(".card-expiry-year").attr("name", "card-expiry-year")
    }*/

    function removeInputNames() {
        $(".card-number").removeAttr("name")
        $(".card-cvc").removeAttr("name")
        $(".card-expiry-year").removeAttr("name")
    }

    function submit(form) {
        // remove the input field names for security
        // we do this *before* anything else which might throw an exception
        removeInputNames(); // THIS IS IMPORTANT!

        // given a valid form, submit the payment details to stripe
        $submit.attr("disabled", "disabled");

        Stripe.createToken({
            number: $('.card-number').val(),
            cvc: $('.card-cvc').val(),
            exp_month: $('.card-expiry-month').val(), 
            exp_year: $('.card-expiry-year').val()
        }, function(status, response) {
            if (response.error) {
                // re-enable the submit button
                $('#submit').removeAttr("disabled")

                // show the error
                $(".payment-errors").html(response.error.message);
                
                // we add these names back in so we can revalidate properly
                addInputNames();

            } else {
                // token contains id, last4, and card type
                var token = response['id'];

                // insert the stripe token
                var input = $("<input name='stripeToken' value='" + token + "' style='display:none;' />");
                form.appendChild(input[0])

                // and submit
                form.submit();
            }
        });
        
        return false;
    }

    $submit.on('click',function(){
    	var $this = $(this);
		if($('.invalid').length>=1){
			$('input.invalid').addClass('fix-me');
			$('input.invalid:first').focus();
			//console.log($('.invalid').length);
			return false;
		}else{
			submit('#submit-donation');
		}
    });
    
    // add custom rules for credit card validating
    /*$.validator.addMethod("cardNumber", Stripe.validateCardNumber, "Please enter a valid card number");
    $.validator.addMethod("cardCVC", Stripe.validateCVC, "Please enter a valid security code");
    $.validator.addMethod("cardExpiry", function() {
        return Stripe.validateExpiry($(".card-expiry-month").val(), 
                                     $(".card-expiry-year").val())
    }, "Please enter a valid expiration");*/

    // We use the jQuery validate plugin to validate required params on submit
    /*$("#submit-donation").validate({
        submitHandler: submit,
        rules: {
            "card-cvc" : {
                cardCVC: true,
                required: true
            },
            "card-number" : {
                cardNumber: true,
                required: true
            },
            "card-expiry-year" : "cardExpiry" // we don't validate month separately
        }
    });*/

    // adding the input field names is the last step, in case an earlier step errors

});