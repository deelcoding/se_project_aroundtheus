// Card.js
class Card {
    constructor(cardData, cardTemplateSelector) {
        this._cardData = cardData;
        this._cardTemplate = document.querySelector(cardTemplateSelector).content;
        this._cardElement = this._createCardElement();
    }

    _createCardElement() {
        // Clone the template and access its content
        const cardElement = this._cardTemplate.cloneNode(true);

        // Access the card title and image elements
        const cardImageEl = cardElement.querySelector('.card__image');
        const cardTitleEl = cardElement.querySelector('.card__title');

        // Set image src and alt attributes
        cardImageEl.src = this._cardData.link;
        cardImageEl.alt = this._cardData.name;
        cardTitleEl.textContent = this._cardData.name;

        // Like button functionality
        const likeButton = cardElement.querySelector("#card-like-btn");
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__heart-active");
        });

        // Trash button functionality
        const trashButton = cardElement.querySelector("#card-trash-btn");
        trashButton.addEventListener("click", () => {
            cardElement.remove();
        });

        // Preview image functionality
        cardImageEl.addEventListener("click", () => {
            openModal(previewModal);
            previewModalImageEl.src = this._cardData.link;
            previewModalImageEl.alt = this._cardData.name;
            previewModalCaptionEl.textContent = this._cardData.name;
        });

        return cardElement;
    }

    getCardElement() {
        return this._cardElement;
    }
}

export default Card