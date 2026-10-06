import React from 'react'
import "../nav.scss"
import {useNavigate} from 'react-router'

const Nav = () => {
  const navigate =useNavigate()

    return (
    <nav className='nav-bar'>
        <button className="wordmark" onClick={() => navigate("/feed")}>Pixly<span>×</span></button>
        <p className="nav-kicker">YOUR VISUAL NOTEBOOK</p>
        <button 
        onClick={()=>{navigate("/create-post")}}
        className="button primary-button">Add a moment</button>
    </nav>
  )
}

export default Nav