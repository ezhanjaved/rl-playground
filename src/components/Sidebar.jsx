import React from 'react'
import "../styling/style.css"
import Library from './library'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <aside>
      <span className='circle'></span>
      <span className='circle'></span>
      <span className='circle'></span>
      <span className='circle'></span>
      <span className='circle'></span>
      </aside>
      <div className='sidebarContent'>
        <h2>Sidebar</h2>
        <Library/>
      </div>
    </aside>
  )
}

export default Sidebar