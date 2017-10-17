'use strict'

import React from 'react'
import Search from './search.component'

const Nav = () => (
  <nav className="nav-bar">
    <div className="logo">
      <h4>monsterdog</h4>
      <em>the monstercat jukebox</em>
    </div>
    <Search />
  </nav>
)

export default Nav
