export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _setEventListeners() {
        this._cardElement.querySelector("card__heart").addEventListener("click", () => {
            this._handleLikeIcon();
        });

        this._cardElement.querySelector("card__trash").addEventListener("click", () => {
            this._handleDeleteCard();
        });

        this._cardImageElement.addEventListener("click", () => {
            this._handleImageClick(this);
        });


    }

    _handleLikeButton() {
        this._cardElement.querySelector("card__heart").classList.toggle("card__heart-active");
    }

    _handleTrashButton() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    getView() {}

}