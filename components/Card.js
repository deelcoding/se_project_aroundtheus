export default class Card {
    constructor(data, cardSelector, handlePreview) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handlePreview = handlePreview;
    }

    _setEventListeners() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
        const likeButton = cardElement.querySelector("#card-like-btn");
        const trashButton = cardElement.querySelector("#card-trash-btn");

        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__heart-active");
        });

        trashButton.addEventListener("click", () => {
            cardElement.remove();
        });

        cardImageEl.addEventListener("click", () => {
            this._handlePreview(this._data);
        });
    }

    _getCardElement() {
        const cardImageEl = cardElement.querySelector('.card__image');
        const cardTitleEl = cardElement.querySelector('.card__title');

        cardImageEl.src = this._data.link;
        cardImageEl.alt = this._data.name;
        cardTitleEl.textContent = this._data.name;

        this._setEventListeners();

        return cardElement;
    }

    generateCard() {
        return this._getCardElement();
    }
}