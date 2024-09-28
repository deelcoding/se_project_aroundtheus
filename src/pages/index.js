import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import {
    initialCards,
    cardSelector,
    profileEditForm,
    addCardForm,
    profileEditBtn,
    addNewCardButton,
    profileNameInput,
    profileDescriptionInput,
    validationConfig
} from "../utils/constants.js";


/**************************************************************************
 *                            RENDERING CARDS                             *
 **************************************************************************/

// Function to handle image click
function handleImageClick(data) {
    previewPopup.open(data.name, data.link);
    previewPopup.setEventListeners();
}

const cardSection = new Section(
    {
        items: initialCards,
        renderer: (data) => {
            const card = renderCard(data);
            cardSection.addItem(card);
        },
    },
    ".cards__list"
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

const previewPopup = new PopupWithImage("#preview-modal");

addNewCardButton.addEventListener("click", () => addCardPopup.open());

// Edit Button Modal
profileEditBtn.addEventListener("click", () => {
    const currentUserInfo = profileInfo.getUserInfo();
    profileNameInput.value = currentUserInfo.name;
    profileDescriptionInput.value = currentUserInfo.job;
    profileEditPopup.open();
});


/**************************************************************************
 *                               USER INFO                                *
 **************************************************************************/

const profileInfo = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__description",
});


/**************************************************************************
 *                               FUNCTIONS                                *
 **************************************************************************/

// Edit Profile Modal Save Button
function handleProfileEditSubmit(inputValues) {
    const newUserInfo = {
        name: inputValues.name,
        job: inputValues.description,
    };
    profileInfo.setUserInfo(newUserInfo);
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
    addCardPopup.resetForm();
}