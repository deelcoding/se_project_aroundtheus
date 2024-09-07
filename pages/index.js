import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

/*******************************************************************************
 *                                  CONSTANTS                                  *
 *******************************************************************************/

const initialCards = [
    { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
    { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
    { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
    { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

// const cardData = { 
//     name: "Yosemite Valley", 
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" 
// };

// const card = new Card(cardData);

/*******************************************************************************
 *                                DOM ELEMENTS                                 *
 *******************************************************************************/

// Find all close buttons
const closeButtons = document.querySelectorAll('.modal__close');

// Profile Edit
const profileEditBtn = document.querySelector("#profile__edit");
const profileEditModal = document.querySelector("#profile-edit-modal");

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const profileNameInput = document.querySelector('#profile-title-input');
const profileDescriptionInput = document.querySelector('#profile-description-input');

const profileEditForm = profileEditModal.querySelector("#profile-edit");

// Card Template
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;

const cardListEl = document.querySelector('.cards__list');

// Add Card
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal")

const addCardTitle = document.querySelector('.card__title');
const addCardUrl = document.querySelector('.card__image');

const cardTitleInput = document.querySelector("#add-title-input");
const cardUrlInput = document.querySelector("#add-url-input");

const addCardForm = addCardModal.querySelector("#add-card-form");

// Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

const validationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};


/*******************************************************************************
 *                                 VALIDATION                                  *
 *******************************************************************************/

function setupFormValidation() {
    const formElements = document.querySelectorAll(validationConfig.formSelector);
    formElements.forEach((formElement) => {
        const formValidator = new FormValidator(validationConfig, formElement);
        formValidator.enableValidation();
    });
}


/*******************************************************************************
 *                                 CARD RENDER                                 *
 *******************************************************************************/

function createCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector("#card-like-btn");
    const trashButton = cardElement.querySelector("#card-trash-btn");

    likeButton.addEventListener("click", () => likeButton.classList.toggle("card__heart-active"));
    trashButton.addEventListener("click", () => cardElement.remove());
    cardImageEl.addEventListener("click", () => handlePreview(cardData));

    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardTitleEl.textContent = cardData.name;

    return cardElement;
}

function renderCard(cardData) {
    cardListEl.prepend(createCardElement(cardData));
}

// const card = new Card(initialCards);

// function renderCard() {
//     const card = new Card(cardData);
//     getCardElement();
//     cardListEl.prepend(cardElement);
// }


/*******************************************************************************
 *                                  FUNCTIONS                                  *
 *******************************************************************************/

function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscClose);
    modal.addEventListener("mousedown", handleOutsideClick);
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscClose);
    modal.removeEventListener("mousedown", handleOutsideClick);
}

function handleOutsideClick(e) {
    if (e.target.classList.contains("modal_opened")) {
        closeModal(e.target);
    }
}

function handleEscClose(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector(".modal_opened");
        if (modal) closeModal(modal);
    }
}

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({ name, link });
    e.target.reset();
    closeModal(addCardModal);
}

function handlePreview(cardData) {
    previewModalImageEl.src = cardData.link;
    previewModalImageEl.alt = cardData.name;
    previewModalCaptionEl.textContent = cardData.name;
    openModal(previewModal);
}


/*******************************************************************************
 *                               EVENT LISTENERS                               *
 *******************************************************************************/

function setupEventListeners() {
    profileEditBtn.addEventListener("click", () => {
        profileNameInput.value = profileName.textContent;
        profileDescriptionInput.value = profileDescription.textContent;
        openModal(profileEditModal);
    });

    profileEditForm.addEventListener("submit", handleProfileEditSubmit);
    addCardForm.addEventListener("submit", handleAddCardFormSubmit);
    addNewCardButton.addEventListener("click", () => openModal(addCardModal));

    closeButtons.forEach(button => {
        button.addEventListener('click', () => closeModal(button.closest('.modal')));
    });

    initialCards.forEach(renderCard);
}

/*******************************************************************************
 *                                INITIALIZATION                               *
 *******************************************************************************/

setupFormValidation();
setupEventListeners();
