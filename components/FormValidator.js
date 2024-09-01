class FormValidator {
    constuctor(options, formElement) {
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;

        this._formElement = formElement;
    }

    _showInputError(inputElement){
        const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputElement.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    }

    _hideInputError(inputElement){
        const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            return showInputError(this._formElement, inputElement);
        }
        hideInputError(this._formElement, inputElement);
    }

    _toggleButtonState(inputList, submitButton) {
        if (hasInvalidInput(inputList)) {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.disabled = true;
            return;
        } 
            submitButton.classList.remove(this._inactiveButtonClass);
            return submitButton.disabled = false;
    }

    _hasInvalidInput(inputList) {
        return !inputList.every((inputEl) => inputEl.validity.valid);
    }

    _setEventListeners(formElement) {
        const inputList = [...formElement.querySelectorAll(this._inputSelector)];
        const submitButton = formElement.querySelector(this._submitButtonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (e) => {
                checkInputValidity(this._formElement, inputElement);
                toggleButtonState(inputList, submitButton);
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })

        _setEventListeners();
    }
}

export default FormValidator;