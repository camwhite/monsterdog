'use strict'

import React from 'react'
import { connect } from 'react-redux'
import ShowMore from 'react-show-more'

const Description = ({ track }) => (
  <div className="description">
    <ShowMore
      lines={3}
      more='Show more'
      less='Show less'
      anchorClass=''
    >
      {track ? track.description : ''}
    </ShowMore>
  </div>
)

const mapStateToProps = (state) => {
  const { track } = state.trackChanged
  return {
    track
  }
}

export default connect(mapStateToProps)(Description)
