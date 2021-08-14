var pixelHeight = 4;
var pixelWidth = pixelHeight;
var heightInPixels = 120;
var widthInPixels = 240;
var widthInSeconds = 4;
var sampleRate = 44100;
var samplesInTotal = widthInSeconds*sampleRate; // 176400
var samplesPerPixel = samplesInTotal/widthInPixels; // 735
var channels = 1;
var maxSampleValue = 1;
var minSampleValue = -maxSampleValue; // -1;
var displayWidth = pixelWidth*widthInPixels; // 1200
var displayHeight = pixelHeight*heightInPixels; // 600
var noteValues  =  [8.175,8.66,9.175,9.725,10.30,10.92,11.56,12.25,12.98,13.75,14.57,15.44,
					16.35,17.32,18.35,19.45,20.60,21.83,23.12,24.50,25.96,27.50,29.14,30.87,
					32.70,34.65,36.71,38.89,41.20,43.65,46.25,49.00,51.91,55.00,58.27,61.74,
					65.41,69.30,73.42,77.78,82.41,87.31,92.50,98.00,103.83,110.00,116.54,123.47,
					130.81,138.59,146.83,155.56,164.81,174.61,185.00,196.00,207.65,220.00,233.08,246.94,
					261.63,277.18,293.66,311.13,329.63,349.23,369.99,392.00,415.30,440.00,466.16,493.88,
					523.25,554.37,587.33,622.25,659.26,698.46,739.99,783.99,830.61,880.00,932.33,987.77,
					1046.50,1108.73,1174.66,1244.51,1318.51,1396.91,1479.98,1567.98,1661.22,1760.00,1864.66,1975.53,
					2093.00,2217.46,2349.32,2489.02,2637.02,2793.83,2959.96,3135.96,3322.44,3520.00,3729.31,3951.07,
					4186.01,4435,4699,4978,5274,5588,5920,6272,6645,7040,7459,7902,
					8372.02,8870,9398,9974,10548,11176,11840,12544,13290,14080,14918,15804];

var cMajor  =  	[130.81,146.83,164.81,174.61,196.00,220.00,246.94,261.63,293.66,329.63,349.23,392.00,440.00,493.88,523.25,587.33,659.26,698.46,783.99,880.00,987.77];

var twoPI = 6.2831853;

var audioCtx = new AudioContext();
var buffer = audioCtx.createBuffer(channels, samplesInTotal, sampleRate);

var source;



var imageContainer = document.createElement( 'div' );
document.body.appendChild( imageContainer );
imageContainer.style.position="absolute"
imageContainer.style.zIndex="1"

var imageOverlay = document.createElement( 'div' );
document.body.appendChild( imageOverlay );
imageOverlay.style.position="absolute"
imageOverlay.style.zIndex="-1"

var overlayCanvas = document.createElement( 'canvas' );
imageOverlay.appendChild(overlayCanvas)
overlayCanvas.width = displayWidth;
overlayCanvas.height = displayHeight;

var overlayContext=overlayCanvas.getContext("2d");
//overlayContext.globalAlpha = 0.5;
//overlayContext.fillStyle = 'rgba(0, 200, 0, 0.2)';
//overlayContext.fillStyle = "#00FF00";
overlayContext.strokeStyle='rgba(100, 100, 100, 0.2)';
overlayContext.lineWidth=".5";

for (var row = 0; row<heightInPixels; row+=2){
	overlayContext.rect(0,.5 + row*pixelHeight,displayWidth,pixelHeight);
}

for (var column = 0; column<widthInPixels; column+=2){
	overlayContext.rect(.5 + column*pixelWidth,0,pixelWidth,displayHeight);
}

overlayContext.rect(0,0,displayWidth,displayHeight);
overlayContext.stroke();
//overlayContext.fillRect(20,53,8,1);

var imageCanvas = document.createElement( 'canvas' );
imageContainer.appendChild(imageCanvas)
imageCanvas.width = displayWidth;
imageCanvas.height = displayHeight;

var imageContext=imageCanvas.getContext("2d");
imageContext.scale(pixelWidth,pixelHeight);


//var hudContainer = document.createElement( 'div' );
//document.body.appendChild( hudContainer );
//hudContainer.style.position="fixed"
//hudContainer.style.zIndex="1"

var hudCanvas = document.createElement( 'canvas' );
imageContainer.appendChild(hudCanvas)
hudCanvas.width = displayWidth*2;
hudCanvas.height = 40;
var hudContext=hudCanvas.getContext("2d");
hudContext.fillStyle = "#00FF00";
hudContext.beginPath();
hudContext.moveTo(80, 20);
hudContext.lineTo(60, 35);
hudContext.lineTo(60, 5);
hudContext.fill();


hudContext.fillStyle = "#CCCCCC";
hudContext.beginPath();
hudContext.moveTo(200, 18);
hudContext.lineTo(204, 18);
hudContext.lineTo(204, 22);
hudContext.lineTo(200, 22);
hudContext.fill();

hudContext.beginPath();
hudContext.moveTo(300, 16);
hudContext.lineTo(308, 16);
hudContext.lineTo(308, 24);
hudContext.lineTo(300, 24);
hudContext.fill();

hudContext.beginPath();
hudContext.moveTo(400, 12);
hudContext.lineTo(416, 12);
hudContext.lineTo(416, 28);
hudContext.lineTo(400, 28);
hudContext.fill();

for (var i = 0; i<64; i++){
	hudContext.fillStyle = 'rgb(' + (i*4) + ', 0, 0, 1)';
	hudContext.beginPath();
	hudContext.moveTo(500 + (i*4), 12);
	hudContext.lineTo(504 + (i*4), 12);
	hudContext.lineTo(504 + (i*4), 28);
	hudContext.lineTo(500 + (i*4), 28);
	hudContext.fill();
}


// 53 53 53 57 60 60 55 55 55 51 51 50 48

//imageContext.fillStyle = 'rgb(200, 0, 0)';

imageContext.fillStyle = 'rgba(20, 0, 0, 1)';


/*
imageContext.fillRect(20,53,8,1);
imageContext.fillRect(30,53,8,1);
imageContext.fillRect(40,57,8,1);
imageContext.fillRect(50,60,16,1);
imageContext.fillRect(70,60,16,1);
imageContext.fillRect(90,55,16,1);
imageContext.fillRect(110,55,16,1);
imageContext.fillRect(130,55,8,1);
imageContext.fillRect(140,51,8,1);
imageContext.fillRect(150,51,8,1);
imageContext.fillRect(160,50,8,1);
imageContext.fillRect(170,48,8,1);
*/


imageContext.fillStyle = 'rgba(255, 0, 0, .2)';

//imageContext.fillStyle = 'rgb(256, 0, 0, 128)';
var columnTotals = [];
var columnPopulation = [];

function getElementPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}


function getEventLocation(element,event){
    // Relies on the getElementPosition function.
    var pos = getElementPosition(element);
    
    return {
    	x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

var drawing = false;

var brushSize = 2;

hudCanvas.addEventListener("click", clickHud);

imageCanvas.addEventListener("mousedown", pressCanvas);

imageCanvas.addEventListener("mouseup", releaseCanvas);

imageCanvas.addEventListener("mousemove", moveCanvas);

imageCanvas.addEventListener("click", clickCanvas);

document.addEventListener('keydown', keyDown);

function clickHud(event){
	var eventLocation = getEventLocation(this,event);
	if(eventLocation.x<90){
		audioCtx.resume()
		getSoundFromImage();
	}

	if((eventLocation.x>150)&&(eventLocation.x<250)){
		brushSize = 1;
	}

	if((eventLocation.x>250)&&(eventLocation.x<350)){
		brushSize = 2;
	}

	if((eventLocation.x>350)&&(eventLocation.x<450)){
		brushSize = 3;
	}

	if((eventLocation.x>500)&&(eventLocation.x<756)){
		
		imageContext.fillStyle = 'rgb(255 , 0, 0, ' + (eventLocation.x-500)/1024 + ')';
	}

}


function clickCanvas(event){

		var eventLocation = getEventLocation(this,event);
		//var pixelData = imageContext.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;
		imageContext.fillRect(Math.round(eventLocation.x/pixelWidth),Math.round(eventLocation.y/pixelHeight),brushSize,brushSize);
}


function moveCanvas(event){

	if(drawing){
		var eventLocation = getEventLocation(this,event);
		//var pixelData = imageContext.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

		imageContext.fillRect(Math.round(eventLocation.x/pixelWidth),Math.round(eventLocation.y/pixelHeight),brushSize,brushSize);
	}

}


function keyDown(event){

	const keyName = event.key;

  	if (keyName === 'Enter') {
  		
  	}
}

function releaseCanvas(event){
	drawing = false;
}

function pressCanvas(event){
	drawing = true;
	//var eventLocation = getEventLocation(this,event);
	//var pixelData = imageContext.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

	//imageContext.fillRect(Math.round(eventLocation.x/5),Math.round(eventLocation.y/5),1,1);
	//console.log(pixelData)
}






function getSoundFromImage(){


	for (var column = 0; column<widthInPixels; column++){
	columnTotals[column] = [];
	columnPopulation[column] = 0;
	for (var i=0; i<samplesPerPixel; i++){
		columnTotals[column][i] = 0;
	}

	for (var row = 0; row<heightInPixels; row++){

		var pixelData;
		var nextPixelData;

		pixelData = imageContext.getImageData(column*pixelWidth, row*pixelHeight, 1, 1).data[3];

		if(column<(widthInPixels-1)){
			nextPixelData = imageContext.getImageData((column+1)*pixelWidth, row*pixelHeight, 1, 1).data[3];
		} else {
			nextPixelData = 0;
		}
		
		if((pixelData != 0)||(nextPixelData != 0)){
			//console.log(pixelData)
			columnPopulation[column] += 1;
			for (var i=0; i<samplesPerPixel; i++){

				var propA = i/samplesPerPixel;
				var propB = 1-propA;

				var amount = ((pixelData*propB)+(nextPixelData*propA));
				//console.log(amount,amount/256)
				var seconds  = ((column*samplesPerPixel)+i)/sampleRate;
				var sample = (amount/256) * Math.sin(seconds * noteValues[heightInPixels-row]*twoPI);
				if ((sample>1)||(sample<-1)){
					console.log(sample)

				}
				columnTotals[column][i] += sample;
			}
		}


	}
}

	var nowBuffering = buffer.getChannelData(0);
	for (var column = 0; column<widthInPixels; column++){
		for (var i=0; i<samplesPerPixel; i++){
			nowBuffering[(column*samplesPerPixel)+i] = columnTotals[column][i]; // /columnPopulation[column];
		}
	}


	//for (var channel = 0; channel < channels; channel++) {
		//var nowBuffering = buffer.getChannelData(channel);
		//for (var i = 0; i < buffer.length; i++) {
			//nowBuffering[i] = Math.random() * 2 - 1;

  		//}
	//}

	source = audioCtx.createBufferSource();
	// set the buffer in the AudioBufferSourceNode
	source.buffer = buffer;
	// connect the AudioBufferSourceNode to the
	// destination so we can hear the sound
	source.connect(audioCtx.destination);
	// start the source playing
	source.start();
	animateSound();
}

getSoundFromImage();

function animateSound(){
	//overlayContext.strokeStyle='rgba(100, 100, 100, 1)';
	//overlayContext.rect(audioCtx.currentTime *333, 0, 1,displayHeight)
	//overlayContext.stroke();
	//console.log(audioCtx.currentTime)

	if(audioCtx.currentTime<4){requestAnimationFrame(animateSound);}
}