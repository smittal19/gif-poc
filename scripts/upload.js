      
        var canvas = new fabric.Canvas('canvas');
        var picexists = false;
        document.getElementsByClassName("upload-button")[0].addEventListener('click',function(){
            document.getElementById('imgLoader').click();
        },false);          
        
        document.getElementById("canvas").addEventListener('click',function(){
            console.log('clicked');
            canvas.item(0).hasControls ? canvas.item(0).hasControls=false:canvas.item(0).hasControls=true;
            canvas.item(0).hasBorders ? canvas.item(0).hasBorders = false:canvas.item(0).hasBorders = true;
        },false);        
        
        document.getElementsByClassName("crop-button")[0].addEventListener('click',function(){
            var objs = canvas.getObjects().map(function(o) {
                return o.set('active', true);
            });
            
            if(objs.length===0){
                console.log('Add a photo first !');
                return false;
            }
            else{
                uploadEx();
            }
        },false);

        document.getElementById('imgLoader').onchange = function handleImage(e) {
            var reader = new FileReader();
            reader.onload = function (event) { console.log('fdsf');
                var imgObj = new Image();
                imgObj.src = event.target.result;
                imgObj.onload = function () {
                    // start fabricJS stuff
					$('.demo').croppie({
						url: imgObj.src,
					});
					
					
					
						
                    var image = new fabric.Image(imgObj);
                    image.set({
                        left: 0,
                        top: 0,
                        angle: 0,
                        padding: 10,
                        cornersize: 10
                    });
                    //image.scale(getRandomNum(0.1, 0.25)).setCoords();
                    
                    removeAll();
                    //canvas.add(image);
                    var group = new fabric.Group([ circle, image ], { 
					   left: 0, top: 0
					 });
					canvas.add(group);
                    document.getElementById('canvas').style.backgroundImage="none";

                    // end fabricJS stuff

                }

            }
            reader.readAsDataURL(e.target.files[0]);
        }    
        
        
        function removeAll() {
            
            var objs = canvas.getObjects().map(function(o) {
                return o.set('active', true);
            });
                    
            if(objs.length>0){
                            canvas.clear();
            }
            
        }

        function uploadEx() {
            var canvas1 = document.getElementById("canvas");
            canvas1.click();
            var dataURL = canvas.toDataURL("image/png");
            document.getElementById('hidden_data').value = dataURL;
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