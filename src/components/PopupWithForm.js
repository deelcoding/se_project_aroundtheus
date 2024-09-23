import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector('form'); 
        this._inputs = this._form.querySelectorAll('input');
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach(input => {
            values[input.name] = input.value; 
        });
        return values;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputValues = this._getInputValues();
            this._submitCallback(inputValues); 
            this.close();
        });
        super.setEventListeners();
    }
}