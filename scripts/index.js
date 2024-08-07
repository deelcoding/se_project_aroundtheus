/*******************************************************************************
 *                                  CONSTANTS                                  *
 *******************************************************************************/

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



// Profile Edit
const profileEditBtn = document.querySelector("#profile__edit");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModal = profileEditModal.querySelector(".modal__close");

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
const addCardCloseModal = addCardModal.querySelector(".modal__close");

const addCardTitle = document.querySelector('.card__title');
const addCardUrl = document.querySelector('.card__image');

const cardTitleInput = document.querySelector("#add-title-input");
const cardUrlInput = document.querySelector("#add-url-input");

const addCardForm = addCardModal.querySelector("#add-card-form");

// Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");


/*******************************************************************************
 *                                  FUNCTIONS                                  *
 *******************************************************************************/

function closeModal(modal) {
    modal.classList.remove("modal_opened");
}

function openModal(modal) {
    modal.classList.add("modal_opened");
}

// Edit Button Modal
function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
}

// Add card Modal
function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({name, link}, cardListEl);
    // added the reset code below to reset the image name and url
    e.target.reset();
    closeModal(addCardModal);
}

function renderCard(cardData) {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
    // clone the template element with all its content and store it in a cardElement variable
    const cardElement = cardTemplate.cloneNode(true);

    // access the card title and image and store them in variables
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__title');

    // like button
    const likeButton = cardElement.querySelector("#card-like-btn");
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__heart-active");
    });

    // trash button
    const trashButton = cardElement.querySelector("#card-trash-btn");
    trashButton.addEventListener("click", () => {
        const cardTrash = trashButton.closest(".card");
        cardTrash.remove();
    });

    // Preview Image
    cardImageEl.addEventListener("click", () => {
        openModal(previewModal);
        previewModalImageEl.src = cardData.link;
        previewModalImageEl.alt = cardData.name;
        previewModalCaptionEl.textContent = cardData.name;
        return cardElement;
    });
    
    // set the path to the image to the link field of the object
    cardImageEl.src = cardData.link;
    // set the image alt text to the name field of the object
    cardImageEl.alt = cardData.name;
    // set the card title to the name field of the object, too
    cardTitleEl.textContent = cardData.name;
    return cardElement;
}


/*******************************************************************************
 *                               EVENT LISTENERS                               *
 *******************************************************************************/


// Edit Button
profileEditBtn.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openModal(profileEditModal)
});
profileCloseModal.addEventListener ('click', () => closeModal(profileEditModal));

// Save Button

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// add new card button
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseModal.addEventListener("click", () => closeModal(addCardModal));

// Cards
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// close preview image
previewModalCloseBtn.addEventListener("click", () => closeModal(previewModal));