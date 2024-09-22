import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({popupSelector});
    this._popupImage = this._popupElement.querySelector(".modal__container_type_preview");
  }

  open() {
    super.open();
  }

  close() {
    this._popupImage.reset();
    super.close();
  }
}

const previewCardPopup = new PopupWithImage("#preview-modal", () => {});
previewCardPopup.open();
previewCardPopup.close();