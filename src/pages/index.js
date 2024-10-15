import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
// import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
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
    validationConfig,
    editAvatar,
    trashIcon
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";


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

// Edit Profile Popup
const profileEditPopup = new PopupWithForm("#profile-edit-modal", handleProfileEditSubmit);
profileEditPopup.setEventListeners();

// Add Card Popup
const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
addCardPopup.setEventListeners();
addNewCardButton.addEventListener("click", () => addCardPopup.open());

// Image Preview Popup
const previewPopup = new PopupWithImage("#preview-modal");

// Delete Confirmation Popup
// const deletePopup = new PopupWithConfirmation("#delete-picture-modal", handleDeleteConfirmation);
// deletePopup.setEventListeners();
// trashIcon.addEventListener("click", () => deletePopup.open());

// Change Avatar Popup
const changeProfilePopup = new PopupWithForm("#avatar-modal", handleAddCardFormSubmit);
changeProfilePopup.setEventListeners();
editAvatar.addEventListener("click", () => changeProfilePopup.open());

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

// api.getUserInfo()
//     .then((res) => UserInfo.setUserAvatar(res.avatar))
//     .catch((err) => alert(err));


/**************************************************************************
 *                                  API                                   *
 **************************************************************************/

const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
    authorization: "9235985a-89e2-4166-9c58-9c8068c4f4bf",
    "Content-Type": "application/json" 
    }
});

/**************************************************************************
 *                              LIKE BUTTON                               *
 **************************************************************************/

function handleLikeClick(cardData) {
    if (cardData.isLiked) {
        api
        .dislikeCard(cardData._id)
        .then(() => {
            cardData.toggleLike();
            cardData._isLiked = false;
        })
        .catch((err) => {
            console.error(`Error on Card Dislike ${err}`);
        });
    } else {
        api
        .likeCard(cardData._id)
        .then(() => {
            cardData.toggleLike();
            cardData._isLiked = true;
        })
        .catch((err) => {
            console.error(`Error on Card Like ${err}`);
        });
    }
}

/**************************************************************************
 *                             CHANGE AVATAR                              *
 **************************************************************************/

// const avatarEditForm = document.querySelector("#avatar-modal");
// avatarEditForm.addEventListener("submit", function(event) {
//     event.preventDefault();

//     const avatarUrl = document.querySelector("#avatar-url-input").value;

//     // Call to api
//     api.setUserAvatar({ avatar: avatarUrl})
//     .then((data) => {
//         document.querySelector(".profile__image").src = data.avatar;
//         avatarEditPopup.close();
//     })
//     .catch((error) => {
//         console.error("Error updating avatar:", error);
//     });
// });


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
    const name = inputValues.title;
    const link = inputValues.url;
    const card = renderCard({name, link});
    cardSection.addItem(card);
    cardFormValidator.disableSubmitButton();
    addCardPopup.close();
    addCardPopup.resetForm();
}

// function handleDeleteConfirmation(inputValues) {
//     const link = inputValues.url;
//     cardFormValidator.disableSubmitButton();
//     deletePopup.close();
//     deletePopup.resetForm();
// }

// function handleAvatarEditSubmit(inputValues) {
//     const link = inputValues.url;
//     cardFormValidator.disableSubmitButton();

// }