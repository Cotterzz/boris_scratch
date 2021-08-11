var buttons = document.getElementById("overlay_right");
// ADD BUTTONS
buttons.innerHTML = "<button type='button' id='buttonPlaySound'>PlaySound</button><br/>";
buttons.innerHTML += "<button type='button' id='button2'>button2</button><br/>";
// ADD BUTTON FUNCTION CALLS
document.getElementById("buttonPlaySound").onclick = function () { if(moving){moving=false}else{moving=true} };
//document.getElementById("button2").onclick = function () { };


const audioContext = new AudioContext()
await audioContext.audioWorklet.addModule('white-noise-processor.js')
const whiteNoiseNode = new AudioWorkletNode(audioContext, 'white-noise-processor')
whiteNoiseNode.connect(audioContext.destination)