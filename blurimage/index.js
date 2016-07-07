//function drawBlur(radior) {
    var canvasWidth = 800, canvasHeight = 600;
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    var image = new Image();
    var clipRadio={};
    image.src = "image.jpg";
    image.onload = function () {
        initCanvas();
    };
    function initCanvas() {
        clipRadio.x=Math.random()*(canvasWidth-2*50)+50;
        clipRadio.y=Math.random()*(canvasWidth-2*50)+50;
        clipRadio.r=50;
        draw(image, clipRadio);

    }

    function setClipRadio(clipRadio) {
        context.beginPath();
        context.arc(clipRadio.x, clipRadio.y, clipRadio.r, 0, Math.PI * 2, false);
        context.clip();
    }

    function draw(image, clipRadio) {
        console.log( clipRadio);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        setClipRadio(clipRadio);
        context.drawImage(image, 0, 0);
        context.restore();
    }
//}
function reset(){
    initCanvas();
}
function show(){
  var Interval=setInterval(function(){
      clipRadio.r+=10;
      if(clipRadio.r>800){
          clearInterval(Interval);
      }
	 draw(image,clipRadio);

  },30);
} 