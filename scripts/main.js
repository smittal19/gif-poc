 var urls = [
        'images/gif1/frame_0_delay-0.04s.gif',
        'images/gif1/frame_1_delay-0.04s.gif',
        'images/gif1/frame_2_delay-0.04s.gif',
        'images/gif1/frame_3_delay-0.04s.gif',
		'images/gif1/frame_4_delay-0.04s.gif',
        'images/gif1/frame_5_delay-0.04s.gif',
        'images/gif1/frame_6_delay-0.04s.gif',
        'images/gif1/frame_7_delay-0.04s.gif',
		'images/gif1/frame_8_delay-0.04s.gif',
		'images/gif1/frame_9_delay-0.04s.gif'
];
var w=500,h=500,gifCanvas, ctx, image;
var TO_RADIANS = Math.PI/180; 
var img1 = new Image();
	img1.src = 'upload/1475146283.png';
	function rotateAndPaintImage ( context, image, angleInRad , positionX, positionY, axisX, axisY ) {
		  context.translate( positionX, positionY );
		  context.rotate( angleInRad );
		  context.drawImage( image, -axisX, -axisY );
		  context.rotate( -angleInRad );
		  context.translate( -positionX, -positionY );
	}
     var addFrame = function(i, callback) {
        this.img = new Image();
        this.img.src = urls[i];
        // Wait for image to be loaded
		var img1 = new Image();				
		img1.src = 'upload/1475146283.png';

        img.onload = function() {
			// Clear canvas by painting white
			ctx.fillStyle = 'rgb(255, 255, 255)';
			ctx.fillRect(0, 0, img.width, img.height);
			// Copy image element onto canvas
			//ctx.globalAlpha = 0.5;
			ctx.drawImage(this, 0, 0, img.width, img.height);
			ctx.drawImage(img1, 195, 25, img1.width, img1.height);
			//rotateAndPaintImage ( ctx, img1, -45*TO_RADIANS, 100, 60, 60, 60 );
			// Add animation frame
			encoder.addFrame(ctx);
			  // Call next iteration only if there's more images left
			  if (urls[++i]) {
				// Time wait only for demo purpose
				setTimeout(function() {
				  callback(i, callback);
				}, 500);
			  } else {
				encoder.finish();
				generateGIF();
			  }
        };
      };

      var generateGIF = function() {
        // Create ArrayBuffer with unsigned int 8 bit view
        var bin = new Uint8Array(encoder.stream().bin);
        // Create Blob of GIF type
        var blob = new Blob([bin.buffer], {type:'image/gif'});
        // Create object URL from blob
        var url = URL.createObjectURL(blob);
        var image = document.getElementById('gif-image');
        //You can also generate DataURL from binary
         //var b64 = window.btoa(encode.stream().getData());
         //image.src = 'data:image/gif;base64,'+b64;
        var binary_gif = encoder.stream().getData();
       var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
		image.src = data_url;
		//image.src = url;
        image.onload = function() {
          // Don't forget to revoke object url after load
          URL.revokeObjectURL(url);
        }
      };

      window.onload = function() {
        gifCanvas = document.getElementById('gif-canvas');
        ctx = gifCanvas.getContext('2d');
        encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setDelay(100);
        encoder.setSize(w, h);
        gifCanvas.width = w;
        gifCanvas.height = h;
        encoder.start();
        addFrame(0, addFrame);
		
      }