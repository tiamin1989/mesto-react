import React, { useState } from 'react';
import avatarStub from '../images/avatarStub.png';
import { connectApi } from '../utils/utils.js';
import Card from './Card.js';

function Main({ onAddPlace, onConfirm, onCardClick, onEditAvatar, onEditProfile }) {
  const [userName, setUserName] = useState('Загрузка...');
  const [userDescription, setUserDescription] = useState('Загрузка...');
  const [userAvatar, setUserAvatar] = useState(avatarStub);
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    connectApi.getPersonData().then(res => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
    connectApi.getInitialCards().then(res => {
      setCards(
        res.map(item => ({
          likes: item.likes,
          link: item.link,
          name: item.name
        }))
      )
    })
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__images-wrapper">
          <span className="profile__pen" onClick={onEditAvatar} />
          <img src={userAvatar} alt="Аватар" className="profile__photo" />
        </div>
        <div className="profile__person">
          <div className="profile__name-edit" onClick={onEditProfile}>
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit" />
          </div>
          <p className="profile__activity">{userDescription}</p>
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
            />);
        })}
      </section>
    </main>
  )
}

export default Main;
