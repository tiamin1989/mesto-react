import React from 'react';

function Card({ card, onCardClick }) {

  function handleClick(e) {
    onCardClick(e);
  }

  return (
    <article className="photo-grid__item">
      <button className="photo-grid__delete" />
      <img src={card.link} alt={card.name} className="photo-grid__photo" onClick={handleClick} />
      <div className="photo-grid__item-info">
        <h2 className="photo-grid__title">{card.name}</h2>
        <div className="photo-grid__likes-wrapper">
          <button className="photo-grid__heart" />
          <span className="photo-grid__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;
