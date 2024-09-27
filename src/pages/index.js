import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "../pages/index.css";
import {
    initialCards,
    cardSelector,
    cardListEl,
    profileEditForm,
    addCardForm,
    profileEditBtn,
    addNewCardButton,
    profileNameInput,
    profileDescriptionInput,
    cardTitleInput,
    cardUrlInput,
    previewModalCaptionEl,
    previewModalImageEl,
} from "../utils/constants.js";


/**************************************************************************
 *                            RENDERING CARDS                             *
 **************************************************************************/

// Function to handle image click
function handleImageClick(data) {
    previewPopup.open(data.name, data.link);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
}

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {
            const card = renderCard(data);
            cardSection.addItem(card);
        },
    },
    '.cards__list'
);

cardSection.renderItems();

// Function to render a card
function renderCard(data) {
    const card = new Card(data, cardSelector, handleImageClick);
    return card.getView();
}


/**************************************************************************
 *                               VALIDATION                               *
 **************************************************************************/

const validationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

const profileFormValidator = new FormValidator(validationConfig, profileEditForm);
const cardFormValidator = new FormValidator(validationConfig, addCardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();


/**************************************************************************
 *                                 POPUPS                                 *
 **************************************************************************/

const profileEditPopup = new PopupWithForm("#profile-edit-modal", handleProfileEditSubmit);
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
addCardPopup.setEventListeners();

const previewPopup = new Popup("#preview-modal");
previewPopup.setEventListeners();

profileEditBtn.addEventListener("click", () => profileEditPopup.open());
addNewCardButton.addEventListener("click", () => addCardPopup.open());
previewModalImageEl.addEventListener("click", () => previewPopup.open());

// Edit Button Modal
profileEditBtn.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    profileNameInput.value = currentUserInfo.name;
    profileDescriptionInput.value = currentUserInfo.job;
    profileEditPopup.open();
});


/**************************************************************************
 *                               USER INFO                                *
 **************************************************************************/

const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__description",
});


/**************************************************************************
 *                               FUNCTIONS                                *
 **************************************************************************/

// Edit Profile Modal Save Button
function handleProfileEditSubmit(e) {
    const newUserInfo = {
        name: profileNameInput.value,
        job: profileDescriptionInput.value,
    };
    userInfo.setUserInfo(newUserInfo);
    profileEditPopup.close();
}

// Add card Modal Save Button
function handleAddCardFormSubmit(inputValues) {
    // {title: '...title', url: '...url'}
    const name = inputValues.title;
    const link = inputValues.url;
    const card = renderCard({name, link});
    cardSection.addItem(card);
    cardFormValidator.disableSubmitButton();
    addCardPopup.close();
    addCardPopup.resetInputs();
}