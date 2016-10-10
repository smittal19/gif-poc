      
        var canvas = new fabric.Canvas('canvas');
        var picexists = false;
        var ctx1 = canvas.getContext("2d");
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
					
                    var image = new fabric.Image(imgObj);
                    image.set({
                        left: 0,
                        top: 0,
                        angle: 0,
                        padding: 10,
                        cornersize: 10
                    });
					removeAll();
                    //image.scale(getRandomNum(0.1, 0.25)).setCoords();
                     ctx1.save();
					ctx1.beginPath();
					var centerX = 50;
					var centerY = 50;
					var width = 100;
					var height = 100;

					ctx1.moveTo(centerX, centerY - height/2);
				  
					ctx1.bezierCurveTo(
						centerX + width/2, centerY - height/2,
						centerX + width/2, centerY + height/2,
						centerX, centerY + height/2);

					ctx1.bezierCurveTo(
						centerX - width/2, centerY + height/2,
						centerX - width/2, centerY - height/2,
						centerX, centerY - height/2);
				 
					ctx1.fillStyle = "black";
					ctx1.fill();
					ctx1.closePath();	
					ctx1.clip();
					ctx1.drawImage(imgObj, 1, 1, 98,98);
					ctx1.restore(); 
                    
                    //canvas.add(image);
                    
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