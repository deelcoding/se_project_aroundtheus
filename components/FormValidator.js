class FormValidator {

    constructor(options, formElement) {
        this._formElement = formElement;
        
    }

}

const options = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
}

const editFormValidator = new FormValidator(options, editForm);
const addFormValidator = new FormValidator(options, addForm);