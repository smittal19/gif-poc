var Demo = (function() {

	function output(node) {
		var existing = $('#result .croppie-result');
		if (existing.length > 0) {
			existing[0].parentNode.replaceChild(node, existing[0]);
		}
		else {
			$('#result')[0].appendChild(node);
		}
	}

	function popupResult(result) {
		var html;
		if (result.html) {
			html = result.html;
		}
		if (result.src) {
			html = '<img src="' + result.src + '" />';
		}
		swal({
			title: '',
			html: true,
			text: html,
			allowOutsideClick: true
		});
		setTimeout(function(){
			$('.sweet-alert').css('margin', function() {
				var top = -1 * ($(this).height() / 2),
					left = -1 * ($(this).width() / 2);

				return top + 'px 0 0 ' + left + 'px';
			});
		}, 1);
	}

	function demoMain () {
		var mc = $('#cropper-1');
		mc.croppie({
			viewport: {
				width: 150,
				height: 150,
				type: 'circle'
			},
			url: 'demo/demo-1.jpg',
			// enforceBoundary: false
			// mouseWheelZoom: false
		});
		mc.on('update', function (ev, data) {
			console.log('jquery update', ev, data);
		});
		$('.js-main-image').on('click', function (ev) {
            mc.croppie('result', {
            	type: 'canvas',
            	format: 'png'
            }).then(function (resp) {
				popupResult({
					src: resp
				});
			});
		});
	}

	function demoUpload() {
		var $uploadCrop;

		function readFile(input) {
 			if (input.files && input.files[0]) {
	            var reader = new FileReader();
	            
	            reader.onload = function (e) {
					$('.upload-demo').addClass('ready');
	            	$uploadCrop.croppie('bind', {
	            		url: e.target.result
	            	}).then(function(){
	            		console.log('jQuery bind complete');
	            	});
	            	
	            }
	            
	            reader.readAsDataURL(input.files[0]);
	        }
	        else {
		        swal("Sorry - you're browser doesn't support the FileReader API");
		    }
		}

		$uploadCrop = $('#upload-demo').croppie({
			viewport: {
				width: 100,
				height: 100,
				type: 'circle'
			},
			boundary: {
				width: 150,
				height: 150
			},
			enableExif: true
		});

		$('#upload').on('change', function () { readFile(this); });
		$('.upload-result').on('click', function (ev) {
			$uploadCrop.croppie('result', {
				type: 'canvas',
				size: 'viewport'
			}).then(function (resp) {
				/*popupResult({
					src: resp
				});*/
				uploadEx(resp);
			});
			
		});
	}
	 function uploadEx(resp) {
				var img1 = new Image();
				
					img1.src = resp;
					
                 var canvas = document.getElementById("canvas");
				 var ctx = canvas.getContext('2d');
					ctx.drawImage(img1, 0, 0, 100, 100);
					//var dataURL = canvas.toDataURL("image/png");
					document.getElementById('hidden_data').value = resp;
					var fd = new FormData(document.forms["form1"]);
					var xhr = new XMLHttpRequest();
					xhr.open('POST', 'upload_data.php', true);
					xhr.upload.onprogress = function(e) {
						if (e.lengthComputable) {
							var percentComplete = (e.loaded / e.total) * 100;
							console.log(percentComplete + '% uploaded');
							console.log('Succesfully uploaded');
						}
					};
					xhr.onload = function() {                
					};
					xhr.send(fd);            
        };
	

	function init() {
		//bindNavigation();
		demoMain();
		demoUpload();
	}

	return {
		init: init
	};
})();


// Full version of `log` that:
//  * Prevents errors on console methods when no console present.
//  * Exposes a global 'log' function that preserves line numbering and formatting.
(function () {
  var method;
  var noop = function () { };
  var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});
 
  while (length--) {
    method = methods[length];
 
    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
  }
 
 
  if (Function.prototype.bind) {
    window.log = Function.prototype.bind.call(console.log, console);
  }
  else {
    window.log = function() { 
      Function.prototype.apply.call(console.log, console, arguments);
    };
  }
})();