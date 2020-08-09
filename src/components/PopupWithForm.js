import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'page_opened' : 'page_closed'}`}>
      <form className="popup__container" name={props.name} noValidate>
        <button type="button" className="page__close" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
      </form>
    </div>
  )
}

export default PopupWithForm;
