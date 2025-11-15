import React from 'react'
import { FaLink } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
      <nav className='navbar'>
        <div className="nav1">
            <FaLink id='logo'/>
            <Link to={'/'} className='td-none'><h2>SmartLink...</h2></Link>
        </div>
        <div className="nav2">
            <Link to={'/about'} className='td-none'><li>About</li></Link>
            <Link to={'https://github.com/KrishnaAwasthi28/'} className='td-none'><li>Github</li></Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
