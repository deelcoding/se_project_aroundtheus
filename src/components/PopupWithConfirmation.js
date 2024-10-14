import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        // this._inputs = this._form.querySelectorAll("input");
    }
    
    // _getInputValues() {
    //     const values = {};
    //     this._inputs.forEach(input => {
    //         values[input.name] = input.value; 
    //     });
    //     return values;
    // }

    resetForm() {
        this._form.reset();
    }

    setEventListeners() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.close();
        });
        super.setEventListeners();
    }
}