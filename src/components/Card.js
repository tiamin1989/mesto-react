import React from 'react';

function Card(props) {

  function handleClick(e) {
    props.onCardClick(e);
  }

  return (
    <article key={props.card._id} className="photo-grid__item">
      <button className="photo-grid__delete"></button>
      <img src={props.card.link} alt={props.card.name} className="photo-grid__photo" onClick={handleClick} />
      <div className="photo-grid__item-info">
        <h2 className="photo-grid__title">{props.card.name}</h2>
        <div className="photo-grid__likes-wrapper">
          <button className="photo-grid__heart"></button>
          <span className="photo-grid__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
