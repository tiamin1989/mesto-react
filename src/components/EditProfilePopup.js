import React from 'react';

function EditProfilePopup() {
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}>
      <input
        id="profile-name"
        name="name"
        type="text"
        defaultValue={currentName}
        className="popup__input"
        minLength="2"
        maxLength="40"
        pattern="[А-Яа-я\w -]+"
        required />
      <span
        id="profile-name-error"
        className="popup__error"
      />
      <input
        id="profile-activity"
        name="about"
        type="text"
        defaultValue={currentActivity}
        className="popup__input"
        minLength="2"
        maxLength="200"
        pattern="[А-Яа-я\w -]+"
        required
      />
      <span
        id="profile-activity-error"
        className="popup__error"
      />
      <input
        type="submit"
        value="Сохранить"
        className="popup__save-button popup__save-button_disabled"
        disabled
      />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
