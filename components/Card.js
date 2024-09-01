export default class Card {
    constructor (data, cardSelector, handleImageClick) {
        this.data = 
        this.cardSelector = document.querySelector('#card-template').content.firstElementChild;
    }

    handleImageClick() {
        cardImageEl.addEventListener("click", () => {
            openModal(previewModal);
            previewModalImageEl.src = cardData.link;
            previewModalImageEl.alt = cardData.name;
            previewModalCaptionEl.textContent = cardData.name;
            return cardElement;
        });
    }
}