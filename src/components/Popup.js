export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.setEventListeners();
    }

    open() {
        this._popup.classList.add("modal_opened");
        document.addEventListener("keydown", this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose.bind(this));
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.modal__close');
        closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', (e) => {
            if (e.target === this._popup) {
                this.close();
            }
        });
    }
}
