class CustomWaveProcessor extends AudioWorkletProcessor {
  pOffset = 0;
  pWavelength = null;
  pChannellength = null;
  freq = 440;
  rate = 44100;
  waveData = null;

  constructor(){
    super();
    this.pWavelength = Math.round(this.rate/this.freq);
    this.waveData = this.createWaveBuffer("sine", this.pWavelength, 10000);
  }

  process (inputs, outputs, parameters) {
    const output = outputs[0]
    output.forEach(channel => {
      this.pChannellength = channel.length;
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.waveData[this.pOffset+i];    //Math.random() * 2 - 1

      }
    })

    this.pOffset += this.pChannellength;
    this.pOffset = this.pOffset % this.pWavelength;
    return true
  }

  getBufferValues(bOffset, bLength){
    var vArray = this.waveData.slice(bOffset, bOffset+bLength);
    return vArray;
  }

  createWaveBuffer(waveType, wResolution, bResolution){
    //console.log("createWave");
    var waveData = new Array(bResolution);
    for (let i = 0; i < bResolution; i++) {
        waveData[i] = Math.sin((i*2*Math.PI)/wResolution);
      //  waveData[i] = (Math.random()*2)-1;
    }
    //console.log(waveData);
    return waveData;
  }
}

registerProcessor('CustomWaveProcessor', CustomWaveProcessor)