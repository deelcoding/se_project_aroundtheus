export default class Card {
    constructor({name, link}, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        this._cardElement.querySelector("card__heart").addEventListener("click", () => {
            this._handleLikeIcon();
        });

        this._cardElement.querySelector("card__trash").addEventListener("click", () => {
            this._handleDeleteCard();
        });
    }

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _handleLikeIcon() {
        this._cardElement.querySelector("card__heart").classList.toggle("card__heart-active");
    }

    getView() {
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);

        // get the card view
        // set event listeners
        this._setEventListeners();
        // return the card
        return this._cardElement;
    }

}