var buttons = document.getElementById("overlay_right");
// ADD BUTTONS
buttons.innerHTML = "<button type='button' id='buttonPlaySound'>PlaySound</button><br/>";
buttons.innerHTML += "<button type='button' id='button2'>button2</button><br/>";



const audioContext = new AudioContext()
await audioContext.audioWorklet.addModule('white-noise-processor.js')
const whiteNoiseNode = new AudioWorkletNode(audioContext, 'white-noise-processor')
whiteNoiseNode.connect(audioContext.destination);

// ADD BUTTON FUNCTION CALLS
document.getElementById("buttonPlaySound").onclick = function () { whiteNoiseNode.play() };
//document.getElementById("button2").onclick = function () { };