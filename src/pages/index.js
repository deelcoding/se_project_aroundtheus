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
    trashIcon,
    editAvatarForm,
    cardTitleInput,
    cardUrlInput
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";


/**************************************************************************
 *                            RENDERING CARDS                             *
 **************************************************************************/

// Function to handle image click
function handleImageClick(data) {
    previewPopup.open(data.title, data.link);
    previewPopup.setEventListeners();
}

const cardSection = new Section(
    {
        renderer: (data) => {
            const card = renderCard(data);
            cardSection.addItem(card);
        },
    },
    ".cards__list"
);

// cardSection.renderItems();

// Function to render a card
function renderCard(data) {
    const card = new Card(data, cardSelector, handleImageClick);
    return card.getView();
}

// function renderCard(data) {
//     const card = new Card(
//         data,
//         cardSelector,
//         () => handlePreviewImage(data),
//         (cardId) => handleDeleteCard(card, cardId),
//         (cardId, isLiked) => handleLikeToggle(card, cardId, isLiked)
//     );
//     return card.getView();
// }


/**************************************************************************
 *                               VALIDATION                               *
 **************************************************************************/

const profileFormValidator = new FormValidator(validationConfig, profileEditForm);
const cardFormValidator = new FormValidator(validationConfig, addCardForm);
const editAvatarValidator = new FormValidator(validationConfig, editAvatarForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
editAvatarValidator.enableValidation();


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

api.getInitialCards()
.then(cardsData => {cardSection.renderItems(cardsData)})
.catch((err) => alert(err));

// api.getUserInfo()
// .then((res) => {
//     console.log(res);
//     UserInfo.setUserInfo({modalTitle: res.name, description: res.about});
//     UserInfo.setAvatarImage(res.avatar);
// })
// .catch((err) => alert(err));

// api.setUserInfo()
// .then(userInfo => {profileInfo.setUserInformation(userInfo)});

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
const changeProfilePopup = new PopupWithForm("#avatar-modal", handleAvatarEditSubmit);
changeProfilePopup.setEventListeners();
editAvatar.addEventListener("click", () => changeProfilePopup.open());

// Edit Button Modal
profileEditBtn.addEventListener("click", () => {
    const currentUserInfo = profileInfo.getUserInformation();
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

// api.getUserInfo().then((userData) => {
//     profileInfo.setUserInformation({ name: userData.name, job: userData.about});
// });


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

function handleAvatarEditSubmit(e, formValue) {
    e.preventDefault();

    addCardPopup.setLoadingState(false);

    const { link } = formValue;
    api
        .setUserAvatar(link)
        .then()
        .catch((err) => console.error(err))
        .finally(() => {
        addCardPopup.setLoadingState(true);
    });
}


/**************************************************************************
 *                               FUNCTIONS                                *
 **************************************************************************/



// Edit Profile Modal Save Button
// function handleProfileEditSubmit(inputValues) {
//     const newUserInfo = {
//         name: inputValues.name,
//         job: inputValues.description,
//     };
//     profileInfo.setUserInfo(newUserInfo);
//     profileEditPopup.close();
// }

function handleProfileEditSubmit(formValues) {
    addCardPopup.setLoadingState(false);

    api
        .setUserInfo(formValues.name, formValues.description)
        .then((updatedUserData) => {
        console.log(updatedUserData);
        profileInfo.setUserInfo({
            name: updatedUserData.name,
            job: updatedUserData.about,
        });
        addCardPopup.close();
        })
        .catch((err) => console.error(err))
        .finally(() => {
        addCardPopup.setLoadingState(true);
    });
}

// Add card Modal Save Button
// function handleAddCardFormSubmit() {
//     cardFormValidator.disableSubmitButton();
//     addCardPopup.close();
//     addCardPopup.resetForm();
// }

function handleAddCardFormSubmit(formValues) {
    profileEditPopup.setLoadingState(false);

    const { name, link } = formValues;
    api
        .uploadCard(name, link)
        .then((newCard) => {
        cardSection.addItem(createCard(newCard));
        cardFormValidator.disableSubmitButton();
        addCardPopup.close();
        addCardPopup.resetForm();
    })
    .catch((err) => console.error(err))
    .finally(() => {
        profileEditPopup.setLoadingState(true);
    });
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