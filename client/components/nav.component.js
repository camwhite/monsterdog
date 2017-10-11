'use strict'

import React from 'react'
import Search from './search.component'

const Nav = () => (
  <nav className="nav-bar">
    <Search />
    <div className="logo">
      <h4>monsterdog</h4>
      <em>jukebox</em>
    </div>
  </nav>
)

export default Nav
