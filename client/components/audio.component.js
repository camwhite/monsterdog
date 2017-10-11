'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeTrack } from '../actions/sound.actions'
import Loading from './loading.component'

const CLIENT_ID = '?client_id=480c18c7ce22bbe09e989422102de2c8'

class Audio extends Component {

  handleEnding = () => {
    const { sounds, track, dispatch } = this.props
    const previous = sounds.indexOf(track)

    dispatch(changeTrack(sounds[previous + 1]))
  }

  render () {
    const { track } = this.props

    if (!track) {
      return <Loading />
    }

    return(
      <div className="controls">
        <audio autoPlay controls
               src={track.stream_url + CLIENT_ID}
               ref={(audio) => this.audio = audio}
               onEnded={() => this.handleEnding()}
        >
        </audio>
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
