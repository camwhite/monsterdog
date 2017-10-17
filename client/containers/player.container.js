'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSounds } from '../actions/sound.actions'

// Component imports
import Loading from '../components/loading.component'
import Tracks from '../components/tracks.component'
import Audio from '../components/audio.component'
import Description from '../components/description.component'

class Player extends Component {

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    const { dispatch } = this.props
    dispatch(getSounds())
  }

  render () {
    const { sounds, results, isFetching } = this.props
    if (!sounds) {
      return <Loading />
    }
    return (
      <div className="player layout">
        <div className="grid_8">
          <Audio />
          <Description />
          <div className="crowd"></div>
        </div>
        <div className="grid_4">
          <Tracks sounds={sounds}
                  results={results}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { sounds } = state.soundsFetch
  const { results, isFetching } = state.soundsQuery

  return {
    sounds,
    results,
    isFetching
  }
}

export default connect(mapStateToProps)(Player)
