import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imgInput, box}) => {
  return(
    <div className="center ma">
      <div className="absolute mt2">
        <img id='inputImage' alt="detecting faces" src={imgInput} width='500px' height='auto'/>
        <div className="bounding_box" style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
      </div>

    </div>
  )
}

export default FaceRecognition;
