import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card ? 'page_opened' : 'page_closed'}`} id="photo-popup">
      <div className="popup__photo-container">
        <button type="button" className="page__close" onClick={onClose} />
        <figure className="popup__figure">
          <img src={card ? card : '#'} alt="" className="popup__image" />
          <figcaption className="popup__caption"></figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
