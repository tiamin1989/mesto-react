import React, { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { connectApi } from '../utils/utils.js';
import { CurrentUserContext, userContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(userContext);

  const [cards, setCards] = useState([]);

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

  function handleAddPlaceSubmit(newCard) {
    connectApi.saveCardData(newCard)
      .then(res => {
        setCards(
          [...cards, res]
        );
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleConfirmClick() {
    setConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setImagePopupOpen(false);
  }

  function handleCardClick(e) {
    setSelectedCard(e.target.src);
    setImagePopupOpen(true);
  }

  function handleUpdateUser({ name, about, avatar }) {
    connectApi.savePersonData({ name, about })
      .then(() => {
        setCurrentUser({ name, about, avatar });
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    connectApi.changeAvatar(avatarInfo)
      .then(res => {
        setCurrentUser(res);
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

  React.useEffect(() => {
    connectApi.getPersonData().then(res => {
      setCurrentUser(res);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <div className="page__divider" />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onConfirm={handleConfirmClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}>
        <input
          type="submit"
          value="Да"
          className="popup__save-button"
        />
      </PopupWithForm>

    </CurrentUserContext.Provider>
  );
}

export default App;
