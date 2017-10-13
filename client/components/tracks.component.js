'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { changeTrack, getSounds } from '../actions/sound.actions'
import Loading from './loading.component'
import smoothScroll from 'smoothscroll'

class Tracks extends Component {

  componentWillMount () {
    const { dispatch, sounds } = this.props
    dispatch(changeTrack(sounds[0]))
  }

  componentDidUpdate () {
    const { playing, sounds } = this.props

    const container = document.querySelector('.track-list')
    const destination = document.getElementById(playing.id)

    smoothScroll(destination, 500, () => {
      container.style.paddingTop = destination.clientHeight + 'px'
    }, container)
  }

  loadMore = () => {
    const { dispatch, results } = this.props

    if (!results) {
      dispatch(getSounds())
    }
  }

  onSelect = (track) => {
    const { dispatch } = this.props
    dispatch(changeTrack(track))
  }

  render () {
    const { sounds, results, playing, err } = this.props
    const tracks = results || sounds

    return(
      <ul className='track-list'>
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={this.loadMore}
          hasMore={!results || err && err.status !== 400}
          useWindow={false}
          loader={<Loading />}
        >
          {tracks.map((track) => {
            return (<li id={track.id} key={track.id} className={playing && track.id === playing.id ? 'track playing' : 'track'}>
              <div className="title" onClick={() => this.onSelect(track)}>
                <img src={track.artwork_url} />
                <p>{track.title}</p>
              </div>
              <div className="stats">
                <div className="stat">
                  <i className="fa fa-play"></i>
                  <em>{track.playback_count}</em>
                </div>
                <div className="stat">
                  <i className="fa fa-heart"></i>
                  <em>{track.favoritings_count}</em>
                </div>
                <div className="stat">
                  <em className="genre">{track.genre}</em>
                </div>
              </div>
            </li>)
          })}
        </InfiniteScroll>
      </ul>
    )
  }

}

const mapStateToProps = (state) => {
  const { track } = state.trackChanged
  return {
    playing: track,
  }
}

export default connect(mapStateToProps)(Tracks)
