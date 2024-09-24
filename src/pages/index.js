import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";

/**************************************************************************
 *                               CONSTANTS                                *
 **************************************************************************/

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    }
]

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close");

// Profile Edit
const profileEditBtn = document.querySelector("#profile__edit");
const profileEditModal = document.querySelector("#profile-edit-modal");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileNameInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");

const profileEditForm = profileEditModal.querySelector("#profile-edit");

// Card Template
const cardSelector = "#card-template";
const cardListEl = document.querySelector(".cards__list");

// Add Card
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");

const cardTitleInput = document.querySelector("#add-title-input");
const cardUrlInput = document.querySelector("#add-url-input");

const addCardForm = addCardModal.querySelector("#add-card-form");

// Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

/**************************************************************************
 *                                CARD.JS                                 *
 **************************************************************************/

// Function to handle image click
function handleImageClick(data) {
    previewPopup.open(data.name, data.link);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
}

// Function to render a card
function renderCard(data) {
    const card = new Card(data, cardSelector, handleImageClick);
    cardListEl.prepend(card.getView());
}

// Render initial cards
initialCards.forEach(renderCard);

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

const profileEditPopup = new Popup("#profile-edit-modal");
const addCardPopup = new Popup("#add-card-modal");
const previewPopup = new Popup("#preview-modal");

profileEditBtn.addEventListener("click", () => profileEditPopup.open());
addNewCardButton.addEventListener("click", () => addCardPopup.open());


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

// Edit Button Modal
profileEditBtn.addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();
    profileNameInput.value = currentUserInfo.name;
    profileDescriptionInput.value = currentUserInfo.job;
    profileEditPopup.open();
});

profileEditPopup.setEventListeners();

// Open Modal function
// function openModal(modal) {
//     modal.classList.add("modal_opened");
//     document.addEventListener("keydown", handleEscClose);
//     modal.addEventListener("mousedown", handleOutsideClick);
// }

// // Close Modal function
// function closeModal(modal){
//     modal.classList.remove("modal_opened");
//     document.removeEventListener("keydown", handleEscClose);
//     modal.removeEventListener("mousedown", handleOutsideClick);
// }

// // Click outside the modal to close
// function handleOutsideClick(e){
//     if (e.target.classList.contains("modal_opened")) {
//         closeModal(e.target);
//     }
// }

// // Use Escape to close Modals
// function handleEscClose(e){
//     if (e.key == "Escape") {
//         const modal = document.querySelector(".modal_opened");
//         closeModal(modal);
//     }
// }

// Edit Button Modal
function handleProfileEditSubmit(e) {
    e.preventDefault();
    const newUserInfo = {
        name: profileNameInput.value,
        job: profileDescriptionInput.value,
    };
    userInfo.setUserInfo(newUserInfo);
    profileEditPopup.close();
}

// Add card Modal
function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({name, link}, cardListEl);
    // added the reset code below to reset the image name and url
    e.target.reset();
    cardFormValidator.disableSubmitButton();
    addCardPopup.close();
}

/**************************************************************************
 *                            EVENT LISTENERS                             *
 **************************************************************************/

// Edit Button
// profileEditBtn.addEventListener("click", () => {
//     profileNameInput.value = profileName.textContent;
//     profileDescriptionInput.value = profileDescription.textContent;
//     openModal(profileEditModal)
// });


// Save Button
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);