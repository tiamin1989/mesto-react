import React, { useState } from 'react';
import { connectApi } from '../utils/utils.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onAddPlace, onConfirm, onCardClick, onEditAvatar, onEditProfile }) {
  const [cards, setCards] = useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    connectApi.likeCard(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  function handleCardDelete(cardId) {
    connectApi.deleteCardData(cardId)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardId);
        setCards(newCards);
      });
  }

  React.useEffect(() => {
    connectApi.getInitialCards().then(res => {
      setCards(
        res.map(item => ({
          likes: item.likes,
          link: item.link,
          name: item.name,
          owner: item.owner,
          _id: item._id
        }))
      )
    })
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__images-wrapper">
          <span className="profile__pen" onClick={onEditAvatar} />
          <img src={currentUser.avatar} alt="Аватар" className="profile__photo" />
        </div>
        <div className="profile__person">
          <div className="profile__name-edit" onClick={onEditProfile}>
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit" />
          </div>
          <p className="profile__activity">{currentUser.about}</p>
        </div>
        <button className="profile__photo-add" onClick={onAddPlace} />
      </section>

      <section className="photo-grid">
        {cards.map((item, index) => {
          return (
            <Card
              key={index}
              card={item}
              onCardClick={onCardClick}
              onConfirm={onConfirm}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />);
        })}
      </section>
    </main>
  )
}

export default Main;
