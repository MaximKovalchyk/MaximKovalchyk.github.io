(function() {
  'use strict';
  window.addEventListener('load', function() {
    var form = document.querySelector('.message-form');
    
    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } 
        form.classList.add('was-validated');
    });
    
  }, false);
})();

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
	
	$(function() {
		$('.message-form').on('focus', '.form-group', function() {
			toogleLabel(this, false);
		});
		$('.message-form').on('blur', '.form-group', function() {
			toogleLabel(this, true);
		});
		$('.message-form').on('click', '.form-group label', function() {
			$(this).parent().find('.form-control').focus();
		})
		
	});
})();

(function() {
	'use strict';
	var pointsList = {
		names: ['Andalo', 'Monte Bondone', 'Alpe Devero', 'Valle Aurina'],
		_list: {}};
	
	function getNameHTML(name) {
		return '<h3>'+ name +'</h3>';
	}
	
	function getDateHTML() {
		var dateStr = (new Date()).toLocaleDateString("en-GB").replace(/\//g,'-');
		return '<p class="card-date">' + dateStr + '</p>'
	}
	
	function getImgListHTML(cams) {
		var index, cam, resHTML = '';
		
		for (index in cams) {
			if ( cams.hasOwnProperty( index ) ) {
				cam = cams[index];
				resHTML += '<img class="card-img-bottom" alt="'+ cam.name +'" src="'+ cam.url +'">';
			}
		}
		
		return resHTML;		
	}
	
	function putImages(data) {
		var index, pointName;
		for (index in data) {
			pointName = data[index].name;
			if ( data.hasOwnProperty(index) && pointsList.names.indexOf(pointName) >= 0) {
				pointsList._list[pointName] = data[index];
			} 
		}
		console.log(data);
		console.log(pointsList);
		var ht = pointsList.names.reduce(function(html, pointName, index) {
			var point = pointsList._list[pointName];
			if (index % 2 == 0) {
				//start row
				html += '<div class="row">';
			}
			html += '<div class="col-md-6">\
			  				<div class="card shadow-sm">\
								<div class="card-body">' + 
									getDateHTML() + 
									getNameHTML(point.name) + 
								'</div>' +
								getImgListHTML(point.cams) +
							'</div>\
						</div>';
								
			if (index % 2 != 0) {
				//end row
				html += '</div>';
			}
			return html;
		}, '');
		$('#skicams .container').html(ht);
		console.log(ht);
		
	}	
	$(function() {
		console.log('req');
		$.ajaxSetup({
		  headers : {   
			 'X-Mashape-Key' : 'kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw', 
		  },
		  //cache : false,
		});
		$.getJSON('https://makevoid-skicams.p.mashape.com/cams.json', putImages);
	});
})();
