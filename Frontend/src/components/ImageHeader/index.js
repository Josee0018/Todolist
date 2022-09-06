import React from 'react'
import background from '../../assets/fondo.jpg';
import "./styles.scss";


const ImageHeader = () => {
  return (
    <div className='background'>
        <img src={background} alt="montain" width="100%" height="200px"></img>
      </div>
  )
}

export default ImageHeader