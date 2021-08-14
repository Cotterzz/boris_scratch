var buttons = document.getElementById("overlay_right");
// ADD BUTTONS
buttons.innerHTML = "<button type='button' id='buttonPlaySound'>PlaySound</button><br/>";
buttons.innerHTML += "<button type='button' id='button2'>button2</button><br/>";

async function setUpAudio(){
	const audioContext = new AudioContext()
	await audioContext.audioWorklet.addModule('audio/CustomWaveProcessor.js');
	const customWaveNode = new AudioWorkletNode(audioContext, 'CustomWaveProcessor')
	customWaveNode.connect(audioContext.destination);
}

// ADD BUTTON FUNCTION CALLS
document.getElementById("buttonPlaySound").onclick = function () { 
	setUpAudio();
}

//document.getElementById("button2").onclick = function () { };