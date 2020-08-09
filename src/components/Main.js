import React, { useState } from 'react';
import kusto from '../images/kusto.jpg';
import { api } from '../utils/Api.js';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = useState('Загрузка...');
  const [userDescription, setUserDescription] = useState('Загрузка...');
  const [userAvatar, setUserAvatar] = useState(kusto);
  const [cards, setСards] = useState([]);

  React.useEffect(() => {
    api.getPersonData().then(res => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
    api.getInitialCards().then(res => {
      setСards(
        res.map(item => ({
          _id: item._id,
          likes: item.likes,
          link: item.link,
          name: item.name,
          owner: item.owner
        }))
      )
    })
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__images-wrapper">
          <span className="profile__pen" onClick={props.onEditAvatar}></span>
          <img src={userAvatar} alt="Аватар" className="profile__photo" />
        </div>
        <div className="profile__person">
          <div className="profile__name-edit" onClick={props.onEditProfile}>
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit"></button>
          </div>
          <p className="profile__activity">{userDescription}</p>
        </div>
        <button className="profile__photo-add" onClick={props.onAddPlace}></button>
      </section>

      <section className="photo-grid">
        {cards.map((item, index) => {
          return (<Card key={index} card={item} onCardClick={props.onCardClick} />);
        })}
      </section>
    </main>
  )
}

export default Main;
