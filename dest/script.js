(function() {
	'use strict';
	
	var jsonNodeToHTML = {
		convert: function (node) {
			return node? '<div class="col-md-6">\
			  				<div class="card shadow-sm">\
								<div class="card-body">' + 
									this.getDateHTML() + 
									this.getNameHTML(node.name) + 
								'</div>' +
								this.getImgListHTML(node.cams) +
							'</div>\
						</div>' : '';
		},
		
		getNameHTML: function (name) {
			return '<h3>'+ name +'</h3>';
		},
		
		regExp: /\//g,
		
		getDateHTML: function () {
			var dateStr = (new Date()).toLocaleDateString("en-GB").replace(this.regExp,'-');
			return '<p class="card-date">' + dateStr + '</p>';
		},
	
		getImgListHTML: function (cams) {
			var index, cam, resHTML = '';
		
			if(cams) {
				for (index in cams) {
					if ( cams.hasOwnProperty( index ) ) {
						cam = cams[index];
						resHTML += '<img class="card-img-bottom" alt="'+ cam.name +'" src="'+ cam.url +'">';
					}
				}
			}
		
			return resHTML;		
		},
		
	};
	
	var camsJsonToHTML = {
		_names: [],
		_json: [],
		_list: {},
		
		init: function (camNames, json) {
			this._names = camNames;
			this._json = json;
			
			this._selectFromJsonByNames(json);
		},
		
		_selectFromJsonByNames: function(data) {
			var index, pointName;
			
			for (index in data) {
				pointName = data[index].name;
				
				if ( data.hasOwnProperty(index) && this._names.indexOf(pointName) >= 0) {
					this._list[pointName] = data[index];
				} 
			}
		},
		
		convert: function() {
			var html, pointsList = this._list, rowIsOpen = false;
			
			html = this._names.reduce(function(html, pointName, index) {
				if (index % 2 == 0) {
					rowIsOpen = true;
					html += '<div class="row">';
				}
				
				html += jsonNodeToHTML.convert(pointsList[pointName]);
								
				if (index % 2 != 0) {
					rowIsOpen = false;
					html += '</div>';
				}
				return html;
			}, '');
			
			if(rowIsOpen) {
				html += '</div>';
			}
			
			return html;
		}
	};
	
	function putImages(data) {
		camsJsonToHTML.init(['Andalo', 'Monte Bondone', 'Alpe Devero', 'Valle Aurina'], data);
		var html = camsJsonToHTML.convert();
		
		$('#skicams .container').html(html);
	}
	
	window.sendRequestToCamsAPI = function () {
		$.ajaxSetup({
		  headers : {   
			 'X-Mashape-Key' : 'kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw', 
		  },
		  //cache : false,
		});
		$.getJSON('https://makevoid-skicams.p.mashape.com/cams.json', putImages);
	}
})();

$(function() {
	'use strict';
	hideLabelsOnFocuse();
	validateFormOnSend();
	sendRequestToCamsAPI();
});

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
