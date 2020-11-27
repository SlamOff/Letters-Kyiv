$(document).ready(function() {
	// remove placeholder after click
	$('input, textarea').focus(function(){
		$(this).data('placeholder', $(this).attr('placeholder'))
		$(this).attr('placeholder', '');
	});
	$('input, textarea').blur(function(){
		$(this).attr('placeholder', $(this).data('placeholder'));
	});

	$('.scroll').click( function(){
	var scrollEl = $(this).attr('href');
		if ($(scrollEl).length != 0) {
			$('html, body').animate({ scrollTop: $(scrollEl).offset().top }, 800);
		}
		return false;
	});

	// set mobile gallery img eq h
	function setImgEqualHeight(){
		var img = $('.gal');
		var w = img.width();
		img.css({'height': w + 'px'});
	}

	if($(window).width() < 768) {
		setImgEqualHeight();
	}
	
	$(window).resize($.debounce(250, setImgEqualHeight));

	//popup
	$('.popup').magnificPopup({
		type: 'inline'
	});
	
	// photo magnific gallery
	$('.photo_popup').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	$('.photo_popup2').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	// Form
	function submitForm(form){
		var form = $(form);
		var wrapper = form.parent();
		wrapper.addClass('sent');
		form.trigger('reset');
		setTimeout(function(){
			wrapper.removeClass('sent');
			$('.mfp-close').trigger('click');
		}, 3000);
		
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize()
			}).done(function(serverData) {
				
			}).fail(function() {
				console.error('Data sending failed');
		});
	}

	// Mask
	jQuery(function($){
		$('.phone_input').mask('+38(099) 999-9999');
	});

	$('#form').validate({
		submitHandler: function(form, e) {
			submitForm(form);
		},
		rules: {
			name: {
				required: true
			},
			phone: {
				required: true
			}
		},
		messages: {
			name: {
				required: 'Обязательно для заполнения'
			},
			phone: {
				required: 'Введите корректный номер'
			}
		}
	});
});