'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { querySounds } from '../actions/sound.actions'

class Search extends Component {

  onSubmit = (event) => {
    event.preventDefault()
    const { dispatch } = this.props

    dispatch(querySounds(this.search.value))
  }

  render () {
    return(
      <div className="search-field">
        <i className="fa fa-search" onClick={() => this.search.focus()}></i>
        <form name="search">
          <input type="search" ref={(search) => this.search = search} />
          <button type="submit" hidden="true" onClick={(event) => this.onSubmit(event)}>
          </button>
        </form>
      </div>
    )
  }

}

export default connect()(Search)
