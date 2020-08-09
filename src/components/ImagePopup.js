import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup ${props.card ? 'page_opened' : 'page_closed'}`} id="photo-popup">
      <div className="popup__photo-container">
        <button type="button" className="page__close" onClick={props.onClose}></button>
        <figure className="popup__figure">
          <img src={props.card ? props.card : '#'} alt="" className="popup__image" />
          <figcaption className="popup__caption"></figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
