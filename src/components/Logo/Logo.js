import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{
        max: 55,
        scale:1,
      }} style={{
        height: 250,
        width: 250
      }}>
      <div className="Tilt-inner pt3">
        <img alt="brain pic" src={brain}/>
      </div>
    </Tilt>
    </div>
)
}

export default Logo;
