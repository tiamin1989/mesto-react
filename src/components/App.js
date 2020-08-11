import React, { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

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
    setSelectedCard('');
  }

  function handleCardClick(e) {
    setSelectedCard(e.target.src);
  }

  return (
    <>
      <Header />
      <div className="page__divider"></div>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onConfirm={handleConfirmClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input id="card-link" name="url" type="url" className="popup__input" placeholder="Ссылка на картинку" required />
        <span id="card-link-error" className="popup__error" />
        <input type="submit" value="Сохранить" className="popup__save-button popup__save-button_disabled" disabled />
      </PopupWithForm>

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <input id="profile-name" name="name" type="text" className="popup__input" minLength="2" maxLength="40" pattern="[А-Яа-я\w -]+" required />
        <span id="profile-name-error" className="popup__error" />
        <input id="profile-activity" name="about" type="text" className="popup__input" minLength="2" maxLength="200" pattern="[А-Яа-я\w -]+" required />
        <span id="profile-activity-error" className="popup__error" />
        <input type="submit" value="Сохранить" className="popup__save-button popup__save-button_disabled" disabled />
      </PopupWithForm>

      <PopupWithForm
        name="card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <input id="card-name" name="name" type="text" className="popup__input" placeholder="Название" minLength="2" maxLength="40" pattern="[А-Яа-я\w -]+" required />
        <span id="card-name-error" className="popup__error" />
        <input id="card-link" name="link" type="url" className="popup__input" placeholder="Ссылка на картинку" required />
        <span id="card-link-error" className="popup__error" />
        <input type="submit" value="Создать" className="popup__save-button popup__save-button_disabled" disabled />
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}>
        <input type="submit" value="Да" className="popup__save-button" />
      </PopupWithForm>

    </>
  );
}

export default App;
