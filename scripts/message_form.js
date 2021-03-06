(function() {
	'use strict';
	function toogleLabel(form_group, showLabel) {
		var $label = $(form_group).find('label'), 
			inputValue = $(form_group).find('.form-control').val();
			
		if (showLabel && !inputValue) {
			$label.show();
		} else { 
			$label.hide();
		}
	}
	
	window.hideLabelsOnFocuse = function () {
		$('.message-form').on('focus', '.form-group', function() {
			toogleLabel(this, false);
		});
		$('.message-form').on('blur', '.form-group', function() {
			toogleLabel(this, true);
		});
		$('.message-form').on('click', '.form-group label', function() {
			$(this).parent().find('.form-control').focus();
		})
	}
	
	window.validateFormOnSend = function () {
    var form = document.querySelector('.message-form');
    
    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } 
        form.classList.add('was-validated');
        //block data sending
        event.preventDefault();
        event.stopPropagation();
    });
    
  }
})();
