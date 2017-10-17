'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTrack } from '../actions/sound.actions'
import Loading from './loading.component'

const CLIENT_ID = '?client_id=480c18c7ce22bbe09e989422102de2c8'

class Audio extends Component {

  constructor () {
    super()
    this.audioCtx = new AudioContext()
    this.analyser = this.audioCtx.createAnalyser()
    this.analyser.fftSize = 32768

    // Canvas visualizer config
    this.meterWidth = 6 //width of the meters in the spectrum
    this.gap = 2 //gap between meters
    this.capHeight = 2
    this.capStyle = '#333'
    this.meterNum = 1000 / (8 + 2) //count of the meters
    this.capYPositionArray = [] //store the vertical position of the caps for the preivous frame

  }

  handleAudio = (audio) => {
    this.source = this.audioCtx.createMediaElementSource(audio)
    //const bassFilter = context.createBiquadFilter()

    //bassFilter.type = 'lowshelf'
    //bassFilter.frequency.value = 1100

    //this.source.connect(bassFilter)
    //bassFilter.connect(context.destination)
  }

  handleEnding = () => {
    const { sounds, track, dispatch } = this.props
    const previous = sounds.indexOf(track)

    dispatch(changeTrack(sounds[previous + 1]))
  }

  initializeVisualizer = (canvas) => {
    this.source.connect(this.analyser)
    this.analyser.connect(this.audioCtx.destination)

    this.cwidth = canvas.width
    this.cheight = canvas.height
    this.ctx = canvas.getContext('2d')

    this.renderFrame()
  }

  renderFrame = () => {
    const array = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(array);
    const step = Math.round(array.length / this.meterNum); //sample limited data from the total array
    this.ctx.clearRect(0, 0, this.cwidth, this.cheight);
    for (let i = 0; i < this.meterNum; i++) {
      let value = array[i * step];
      if (this.capYPositionArray.length < Math.round(this.meterNum)) {
        this.capYPositionArray.push(value);
      };
      this.ctx.fillStyle = this.capStyle;
      //draw the cap, with transition effect
      if (value < this.capYPositionArray[i]) {
        this.ctx.fillRect(i * 8, this.cheight - (--this.capYPositionArray[i]), this.meterWidth, this.capHeight);
      } else {
        this.ctx.fillRect(i * 8, this.cheight - value, this.meterWidth, this.capHeight);
        this.capYPositionArray[i] = value;
      };
      this.ctx.fillStyle = '#333'; //set the filllStyle to gradient for a better look
      this.ctx.fillRect(i * 8 /*meterWidth+gap*/ , this.cheight - value + this.capHeight, this.meterWidth, this.cheight); //the meter
    }
    requestAnimationFrame(this.renderFrame)
  }

  render () {
    const { track } = this.props

    if (!track) {
      return <Loading />
    }

    return(
      <div className="controls">
        <audio autoPlay controls crossOrigin="anonymous"
               src={track.stream_url + CLIENT_ID}
               onEnded={() => this.handleEnding()}
               ref={this.handleAudio}
        >
        </audio>
        <canvas ref={this.initializeVisualizer}></canvas>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const { track } = state.trackChanged
  const { sounds } = state.soundsFetch
  return {
    track,
    sounds
  }
}

export default connect(mapStateToProps)(Audio)
