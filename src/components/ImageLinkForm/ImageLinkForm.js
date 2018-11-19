import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = (props) => {
  const {inputChange, onButtonChange} = props;
  return(
    <div>
      <p className="f3">
        it will detect faces
      </p>
      <div className="center">
        <div className="form flex shadow-5 pa4 br3">
          <input onChange={inputChange} className="f4 pa2 w-70 center" type="text"/>
          <button onClick={onButtonChange} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Detect</button>
        </div>

      </div>
    </div>
  )
}

export default ImageLinkForm;
