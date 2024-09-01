class FormValidator {

    constructor(options, formElement) {
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;

        this._form = formElement;
    }

    _showInputError(inputEl, errorMessageEl) {        
        if (!inputEl.validity.valid) {
            inputEl.classList.add(this._inputErrorClass);
            errorMessageEl.textContent = inputEl.validationMessage;
            errorMessageEl.classList.add(this._errorClass);
        } else {
            inputEl.classList.remove(this._inputErrorClass);
            errorMessageEl.textContent = "";
            errorMessageEl.classList.remove(this._errorClass);
        }
    }

    _toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {
        if (hasInvalidInput(inputEls)) {
            submitButton.classList.add(inactiveButtonClass);
            submitButton.disabled = true;
            return;
        } 
            submitButton.classList.remove(inactiveButtonClass);
            return submitButton.disabled = false;
    }

    _hasInvalidInput(inputList) {
        return !inputList.every((inputEl) => inputEl.validity.valid);
    }

    _checkInputValidity(formEl, inputEl, options) {
        if (!inputEl.validity.valid) {
            return showInputError(formEl, inputEl, options);
        }
        hideInputError(formEl, inputEl, options);
    }

    _setEventListeners(formEl, options) {
        const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
        const submitButton = this._form.querySelector(this._submitButtonSelector);

        inputEls.forEach((inputEl) => {
            inputEl.addEventListener("input", (e) => {
                checkInputValidity(this._form, inputEl, options);
                toggleButtonState(inputEls, submitButton, options);
            });
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault(); 
        });
         // look for all inputs inside of form
         // loop through all the inputs to see if all are valid
             // if input is not valid
                 // get validation message
                 // add error class to input
                 // display error message
                 // disable button
             // if all inputs are valid
                 // enable button
                 // reset error message
        setEventListener(formEl, rest);
        }
    }

export default FormValidator;