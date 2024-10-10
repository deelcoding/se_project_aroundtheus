!function(){"use strict";class e{constructor(e,t){this._formElement=t,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._inputElements=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._submitButton=this._formElement.querySelector(this._submitButtonSelector)}_showInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._errorClass)}_hideInputError(e){const t=this._formElement.querySelector(`#${e.id}-error`);e.classList.remove(this._inputErrorClass),t.textContent="",t.classList.remove(this._errorClass)}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_hasInvalidInput(){return this._inputElements.some((e=>!e.validity.valid))}_toggleButtonState(){this._hasInvalidInput()?this.disableSubmitButton():(this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1)}_setEventListeners(){this._inputElements.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))})),this._toggleButtonState()}resetValidation(){this._inputList.forEach((e=>{this._hideError(e)})),this._toggleButtonState()}disableSubmitButton(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}enableValidation(){this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners(),this._toggleButtonState()}}class t{constructor(e,t,s){this.name=e.name,this.link=e.link,this._cardSelector=t,this._handleImageClick=s}_setEventListeners(){this._cardElement.querySelector(".card__heart").addEventListener("click",(()=>{this._handleLikeButton()})),this._cardElement.querySelector(".card__trash").addEventListener("click",(()=>{this._handleTrashButton()})),this._cardImageElement.addEventListener("click",(()=>{this._handleImageClick(this)}))}_handleLikeButton(){this._cardElement.querySelector(".card__heart").classList.toggle("card__heart-active")}_handleTrashButton(){this._cardElement.remove(),this._cardElement=null}getView(){this._cardElement=document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0),this._cardImageElement=this._cardElement.querySelector(".card__image");const e=this._cardElement.querySelector(".card__title");return this._cardImageElement.src=this.link,this._cardImageElement.alt=this.name,e.textContent=this.name,this._setEventListeners(),this._cardElement}}class s{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popup.querySelector(".modal__close").addEventListener("click",(()=>this.close())),this._popup.addEventListener("mousedown",(e=>{e.target===this._popup&&this.close()}))}}class n extends s{constructor(e,t){super(e),this._submitCallback=t,this._form=this._popup.querySelector("form"),this._inputs=this._form.querySelectorAll("input")}_getInputValues(){const e={};return this._inputs.forEach((t=>{e[t.name]=t.value})),e}resetForm(){this._form.reset()}setEventListeners(){this._form.addEventListener("submit",(e=>{e.preventDefault();const t=this._getInputValues();this._submitCallback(t),this.close()})),super.setEventListeners()}}document.querySelectorAll(".modal__close");const r=document.querySelector("#profile__edit"),o=document.querySelector("#profile-edit-modal"),i=(document.querySelector(".profile__name"),document.querySelector(".profile__description"),document.querySelector("#profile-title-input")),a=document.querySelector("#profile-description-input"),l=o.querySelector("#profile-edit"),c=(document.querySelector(".cards__list"),document.querySelector(".profile__add-button")),u=document.querySelector("#add-card-modal"),d=(document.querySelector("#add-title-input"),document.querySelector("#add-url-input"),u.querySelector("#add-card-form")),m=document.querySelector("#preview-modal"),_=(m.querySelector(".modal__image"),m.querySelector(".modal__caption"),{formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__button",inactiveButtonClass:"modal__button_disabled",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"});function h(e){g.open(e.name,e.link),g.setEventListeners()}const p=new class{constructor(e,t){let{items:s,renderer:n}=e;this._items=s,this._renderer=n,this._container=document.querySelector(t)}renderItems(){this._items.forEach((e=>this._renderer(e)))}addItem(e){this._container.prepend(e)}}({items:[{name:"Yosemite Valley",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"},{name:"Lake Louise",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"},{name:"Bald Mountains",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"},{name:"Latemar",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"},{name:"Vanoise National Park",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"},{name:"Lago di Braies",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"}],renderer:e=>{const t=E(e);p.addItem(t)}},".cards__list");function E(e){return new t(e,"#card-template",h).getView()}p.renderItems();const S=new e(_,l),v=new e(_,d);S.enableValidation(),v.enableValidation();const y=new n("#profile-edit-modal",(function(e){const t={name:e.name,job:e.description};b.setUserInfo(t),y.close()}));y.setEventListeners();const f=new n("#add-card-modal",(function(e){const t=E({name:e.title,link:e.url});p.addItem(t),v.disableSubmitButton(),f.close(),f.resetForm()}));f.setEventListeners();const g=new class extends s{constructor(e){super(e),this._imageElement=this._popup.querySelector(".modal__image"),this._captionElement=this._popup.querySelector(".modal__caption")}open(e,t){this._imageElement.src=t,this._imageElement.alt=e,this._captionElement.textContent=e,super.open()}}("#preview-modal");c.addEventListener("click",(()=>f.open())),r.addEventListener("click",(()=>{const e=b.getUserInfo();i.value=e.name,a.value=e.job,y.open()}));const b=new class{constructor(e){let{nameSelector:t,jobSelector:s}=e;this._nameElement=document.querySelector(t),this._jobElement=document.querySelector(s)}getUserInfo(){return{name:this._nameElement.textContent,job:this._jobElement.textContent}}setUserInfo(e){let{name:t,job:s}=e;this._nameElement.textContent=t,this._jobElement.textContent=s}}({nameSelector:".profile__name",jobSelector:".profile__description"})}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUEvQixhQUFFNkIsRUFBWSxZQUFFQyxHQUFhOUIsRUFDckN0RyxLQUFLcUksYUFBZTFFLFNBQVMxQyxjQUFja0gsR0FDM0NuSSxLQUFLc0ksWUFBYzNFLFNBQVMxQyxjQUFjbUgsRUFDOUMsQ0FFQUYsV0FBQUEsR0FDSSxNQUFPLENBQ0hqRixLQUFNakQsS0FBS3FJLGFBQWE3RyxZQUN4QmdHLElBQUt4SCxLQUFLc0ksWUFBWTlHLFlBRTlCLENBRUFtRyxXQUFBQSxDQUFXWSxHQUFnQixJQUFmLEtBQUV0RixFQUFJLElBQUV1RSxHQUFLZSxFQUNyQnZJLEtBQUtxSSxhQUFhN0csWUFBY3lCLEVBQ2hDakQsS0FBS3NJLFlBQVk5RyxZQUFjZ0csQ0FDbkMsR0h1RTZCLENBQzdCVyxhQUFjLGlCQUNkQyxZQUFhLHlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJpcGxldGVuLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly90cmlwbGV0ZW4vLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL3RyaXBsZXRlbi8uL3NyYy9jb21wb25lbnRzL1BvcHVwLmpzIiwid2VicGFjazovL3RyaXBsZXRlbi8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vdHJpcGxldGVuLy4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly90cmlwbGV0ZW4vLi9zcmMvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHJpcGxldGVuLy4vc3JjL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly90cmlwbGV0ZW4vLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly90cmlwbGV0ZW4vLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25Db25maWcsIGZvcm1FbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fZm9ybUVsZW1lbnQgPSBmb3JtRWxlbWVudDtcclxuICAgICAgICB0aGlzLl9pbnB1dFNlbGVjdG9yID0gdmFsaWRhdGlvbkNvbmZpZy5pbnB1dFNlbGVjdG9yO1xyXG4gICAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yID0gdmFsaWRhdGlvbkNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcclxuICAgICAgICB0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzID0gdmFsaWRhdGlvbkNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xyXG4gICAgICAgIHRoaXMuX2lucHV0RXJyb3JDbGFzcyA9IHZhbGlkYXRpb25Db25maWcuaW5wdXRFcnJvckNsYXNzO1xyXG4gICAgICAgIHRoaXMuX2Vycm9yQ2xhc3MgPSB2YWxpZGF0aW9uQ29uZmlnLmVycm9yQ2xhc3M7XHJcbiAgICAgICAgdGhpcy5faW5wdXRFbGVtZW50cyA9IEFycmF5LmZyb20odGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKSk7XHJcbiAgICAgICAgdGhpcy5fc3VibWl0QnV0dG9uID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9zdWJtaXRCdXR0b25TZWxlY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZUVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5faW5wdXRFcnJvckNsYXNzKTtcclxuICAgICAgICBlcnJvck1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gaW5wdXRFbGVtZW50LnZhbGlkYXRpb25NZXNzYWdlO1xyXG4gICAgICAgIGVycm9yTWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlRWxlbWVudCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgKTtcclxuICAgICAgICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9pbnB1dEVycm9yQ2xhc3MpO1xyXG4gICAgICAgIGVycm9yTWVzc2FnZUVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIGVycm9yTWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGlmICghaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2hhc0ludmFsaWRJbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRFbGVtZW50cy5zb21lKGlucHV0RWxlbWVudCA9PiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBfdG9nZ2xlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2hhc0ludmFsaWRJbnB1dCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVN1Ym1pdEJ1dHRvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3NldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMuX2lucHV0RWxlbWVudHMuZm9yRWFjaChpbnB1dEVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrSW5wdXRWYWxpZGl0eShpbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9oaWRlRXJyb3IoaW5wdXRFbGVtZW50KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZVN1Ym1pdEJ1dHRvbigpIHtcclxuICAgICAgICB0aGlzLl9zdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCh0aGlzLl9pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICAgICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZVZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7IC8vIEluaXRpYWwgc3RhdGUgY2hlY2tcclxuICAgIH1cclxufVxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBjYXJkU2VsZWN0b3IsIGhhbmRsZUltYWdlQ2xpY2spIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICAgICAgdGhpcy5saW5rID0gZGF0YS5saW5rO1xyXG4gICAgICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcclxuICAgICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrID0gaGFuZGxlSW1hZ2VDbGljaztcclxuICAgIH1cclxuXHJcbiAgICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgbGlrZSBhbmQgZGVsZXRlIGJ1dHRvbnNcclxuICAgICAgICB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2hlYXJ0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUxpa2VCdXR0b24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190cmFzaFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVUcmFzaEJ1dHRvbigpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGltYWdlIGNsaWNrXHJcbiAgICAgICAgdGhpcy5fY2FyZEltYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVJbWFnZUNsaWNrKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVMaWtlQnV0dG9uKCkge1xyXG4gICAgICAgIHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faGVhcnRcIikuY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2hlYXJ0LWFjdGl2ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlVHJhc2hCdXR0b24oKSB7XHJcbiAgICAgICAgdGhpcy5fY2FyZEVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5fY2FyZEVsZW1lbnQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZpZXcoKSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjYXJkIGVsZW1lbnRcclxuICAgICAgICB0aGlzLl9jYXJkRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5fY2FyZFNlbGVjdG9yKS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZFwiKS5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIEdldCByZWZlcmVuY2VzIHRvIHRoZSBpbWFnZSBhbmQgdGl0bGUgZWxlbWVudHNcclxuICAgICAgICB0aGlzLl9jYXJkSW1hZ2VFbGVtZW50ID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuICAgICAgICBjb25zdCBjYXJkVGl0bGVFbCA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fdGl0bGVcIik7XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgcGF0aCB0byB0aGUgaW1hZ2UgYW5kIGFsdCB0ZXh0XHJcbiAgICAgICAgdGhpcy5fY2FyZEltYWdlRWxlbWVudC5zcmMgPSB0aGlzLmxpbms7XHJcbiAgICAgICAgdGhpcy5fY2FyZEltYWdlRWxlbWVudC5hbHQgPSB0aGlzLm5hbWU7XHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgY2FyZCB0aXRsZVxyXG4gICAgICAgIGNhcmRUaXRsZUVsLnRleHRDb250ZW50ID0gdGhpcy5uYW1lO1xyXG5cclxuICAgICAgICAvLyBTZXQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBjYXJkIGVsZW1lbnRcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xyXG4gICAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICAgICAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbigpIHtcclxuICAgICAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlRXNjQ2xvc2UoZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9fY2xvc2VcIik7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2xvc2UoKSk7XHJcbiAgICAgICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMuX3BvcHVwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBzdWJtaXRDYWxsYmFjaykge1xyXG4gICAgICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xyXG4gICAgICAgIHRoaXMuX3N1Ym1pdENhbGxiYWNrID0gc3VibWl0Q2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpOyBcclxuICAgICAgICB0aGlzLl9pbnB1dHMgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2lucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcclxuICAgICAgICAgICAgdmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7IFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRGb3JtKCkge1xyXG4gICAgICAgIHRoaXMuX2Zvcm0ucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHRoaXMuX2dldElucHV0VmFsdWVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1Ym1pdENhbGxiYWNrKGlucHV0VmFsdWVzKTsgXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xyXG4gICAgfVxyXG59IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENPTlNUQU5UUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgY29uc3QgaW5pdGlhbENhcmRzID0gW1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiWW9zZW1pdGUgVmFsbGV5XCIsXHJcbiAgICAgICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L3lvc2VtaXRlLmpwZ1wiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiTGFrZSBMb3Vpc2VcIixcclxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGFrZS1sb3Vpc2UuanBnXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJCYWxkIE1vdW50YWluc1wiLFxyXG4gICAgICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9iYWxkLW1vdW50YWlucy5qcGdcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIkxhdGVtYXJcIixcclxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGF0ZW1hci5qcGdcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxyXG4gICAgICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC92YW5vaXNlLmpwZ1wiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiTGFnbyBkaSBCcmFpZXNcIixcclxuICAgICAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGFnby5qcGdcIlxyXG4gICAgfVxyXG5dXHJcblxyXG4vLyBGaW5kIGFsbCBjbG9zZSBidXR0b25zXHJcbmV4cG9ydCBjb25zdCBjbG9zZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19jbG9zZVwiKTtcclxuXHJcbi8vIFByb2ZpbGUgRWRpdFxyXG5leHBvcnQgY29uc3QgcHJvZmlsZUVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXRcIik7XHJcbmV4cG9ydCBjb25zdCBwcm9maWxlRWRpdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlLWVkaXQtbW9kYWxcIik7XHJcblxyXG5leHBvcnQgY29uc3QgcHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX25hbWVcIik7XHJcbmV4cG9ydCBjb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHByb2ZpbGVOYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGUtdGl0bGUtaW5wdXRcIik7XHJcbmV4cG9ydCBjb25zdCBwcm9maWxlRGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1kZXNjcmlwdGlvbi1pbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcm9maWxlRWRpdEZvcm0gPSBwcm9maWxlRWRpdE1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZS1lZGl0XCIpO1xyXG5cclxuLy8gQ2FyZCBUZW1wbGF0ZVxyXG5leHBvcnQgY29uc3QgY2FyZFNlbGVjdG9yID0gXCIjY2FyZC10ZW1wbGF0ZVwiO1xyXG5leHBvcnQgY29uc3QgY2FyZExpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX2xpc3RcIik7XHJcblxyXG4vLyBBZGQgQ2FyZFxyXG5leHBvcnQgY29uc3QgYWRkTmV3Q2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcclxuZXhwb3J0IGNvbnN0IGFkZENhcmRNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWNhcmQtbW9kYWxcIik7XHJcblxyXG5leHBvcnQgY29uc3QgY2FyZFRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC10aXRsZS1pbnB1dFwiKTtcclxuZXhwb3J0IGNvbnN0IGNhcmRVcmxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXVybC1pbnB1dFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRDYXJkRm9ybSA9IGFkZENhcmRNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2FkZC1jYXJkLWZvcm1cIik7XHJcblxyXG4vLyBQcmV2aWV3IE1vZGFsXHJcbmV4cG9ydCBjb25zdCBwcmV2aWV3TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByZXZpZXctbW9kYWxcIik7XHJcbmV4cG9ydCBjb25zdCBwcmV2aWV3TW9kYWxJbWFnZUVsID0gcHJldmlld01vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlXCIpO1xyXG5leHBvcnQgY29uc3QgcHJldmlld01vZGFsQ2FwdGlvbkVsID0gcHJldmlld01vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2NhcHRpb25cIik7XHJcblxyXG4vLyBWYWxpZGF0aW9uIENvbmZpZ1xyXG5leHBvcnQgY29uc3QgdmFsaWRhdGlvbkNvbmZpZyA9IHtcclxuICAgIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcclxuICAgIGlucHV0U2VsZWN0b3I6IFwiLm1vZGFsX19pbnB1dFwiLFxyXG4gICAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19idXR0b25cIixcclxuICAgIGluYWN0aXZlQnV0dG9uQ2xhc3M6IFwibW9kYWxfX2J1dHRvbl9kaXNhYmxlZFwiLFxyXG4gICAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXHJcbiAgICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvcl92aXNpYmxlXCJcclxufTsiLCJpbXBvcnQgRm9ybVZhbGlkYXRvciBmcm9tIFwiLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzXCI7XHJcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xyXG5pbXBvcnQgVXNlckluZm8gZnJvbSBcIi4uL2NvbXBvbmVudHMvVXNlckluZm8uanNcIjtcclxuaW1wb3J0IFBvcHVwV2l0aEZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcclxuaW1wb3J0IFwiLi4vcGFnZXMvaW5kZXguY3NzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBpbml0aWFsQ2FyZHMsXHJcbiAgICBjYXJkU2VsZWN0b3IsXHJcbiAgICBwcm9maWxlRWRpdEZvcm0sXHJcbiAgICBhZGRDYXJkRm9ybSxcclxuICAgIHByb2ZpbGVFZGl0QnRuLFxyXG4gICAgYWRkTmV3Q2FyZEJ1dHRvbixcclxuICAgIHByb2ZpbGVOYW1lSW5wdXQsXHJcbiAgICBwcm9maWxlRGVzY3JpcHRpb25JbnB1dCxcclxuICAgIHZhbGlkYXRpb25Db25maWdcclxufSBmcm9tIFwiLi4vdXRpbHMvY29uc3RhbnRzLmpzXCI7XHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJFTkRFUklORyBDQVJEUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vLyBGdW5jdGlvbiB0byBoYW5kbGUgaW1hZ2UgY2xpY2tcclxuZnVuY3Rpb24gaGFuZGxlSW1hZ2VDbGljayhkYXRhKSB7XHJcbiAgICBwcmV2aWV3UG9wdXAub3BlbihkYXRhLm5hbWUsIGRhdGEubGluayk7XHJcbiAgICBwcmV2aWV3UG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxufVxyXG5cclxuY29uc3QgY2FyZFNlY3Rpb24gPSBuZXcgU2VjdGlvbihcclxuICAgIHtcclxuICAgICAgICBpdGVtczogaW5pdGlhbENhcmRzLFxyXG4gICAgICAgIHJlbmRlcmVyOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjYXJkID0gcmVuZGVyQ2FyZChkYXRhKTtcclxuICAgICAgICAgICAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkKTtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIFwiLmNhcmRzX19saXN0XCJcclxuKTtcclxuXHJcbmNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKCk7XHJcblxyXG4vLyBGdW5jdGlvbiB0byByZW5kZXIgYSBjYXJkXHJcbmZ1bmN0aW9uIHJlbmRlckNhcmQoZGF0YSkge1xyXG4gICAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKGRhdGEsIGNhcmRTZWxlY3RvciwgaGFuZGxlSW1hZ2VDbGljayk7XHJcbiAgICByZXR1cm4gY2FyZC5nZXRWaWV3KCk7XHJcbn1cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVkFMSURBVElPTiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IHByb2ZpbGVGb3JtVmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IodmFsaWRhdGlvbkNvbmZpZywgcHJvZmlsZUVkaXRGb3JtKTtcclxuY29uc3QgY2FyZEZvcm1WYWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih2YWxpZGF0aW9uQ29uZmlnLCBhZGRDYXJkRm9ybSk7XHJcblxyXG5wcm9maWxlRm9ybVZhbGlkYXRvci5lbmFibGVWYWxpZGF0aW9uKCk7XHJcbmNhcmRGb3JtVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBPUFVQUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgcHJvZmlsZUVkaXRQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI3Byb2ZpbGUtZWRpdC1tb2RhbFwiLCBoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdCk7XHJcbnByb2ZpbGVFZGl0UG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbmNvbnN0IGFkZENhcmRQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI2FkZC1jYXJkLW1vZGFsXCIsIGhhbmRsZUFkZENhcmRGb3JtU3VibWl0KTtcclxuYWRkQ2FyZFBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5jb25zdCBwcmV2aWV3UG9wdXAgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoXCIjcHJldmlldy1tb2RhbFwiKTtcclxuXHJcbmFkZE5ld0NhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGFkZENhcmRQb3B1cC5vcGVuKCkpO1xyXG5cclxuLy8gRWRpdCBCdXR0b24gTW9kYWxcclxucHJvZmlsZUVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRVc2VySW5mbyA9IHByb2ZpbGVJbmZvLmdldFVzZXJJbmZvKCk7XHJcbiAgICBwcm9maWxlTmFtZUlucHV0LnZhbHVlID0gY3VycmVudFVzZXJJbmZvLm5hbWU7XHJcbiAgICBwcm9maWxlRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IGN1cnJlbnRVc2VySW5mby5qb2I7XHJcbiAgICBwcm9maWxlRWRpdFBvcHVwLm9wZW4oKTtcclxufSk7XHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVTRVIgSU5GTyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBwcm9maWxlSW5mbyA9IG5ldyBVc2VySW5mbyh7XHJcbiAgICBuYW1lU2VsZWN0b3I6IFwiLnByb2ZpbGVfX25hbWVcIixcclxuICAgIGpvYlNlbGVjdG9yOiBcIi5wcm9maWxlX19kZXNjcmlwdGlvblwiLFxyXG59KTtcclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRlVOQ1RJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8vIEVkaXQgUHJvZmlsZSBNb2RhbCBTYXZlIEJ1dHRvblxyXG5mdW5jdGlvbiBoYW5kbGVQcm9maWxlRWRpdFN1Ym1pdChpbnB1dFZhbHVlcykge1xyXG4gICAgY29uc3QgbmV3VXNlckluZm8gPSB7XHJcbiAgICAgICAgbmFtZTogaW5wdXRWYWx1ZXMubmFtZSxcclxuICAgICAgICBqb2I6IGlucHV0VmFsdWVzLmRlc2NyaXB0aW9uLFxyXG4gICAgfTtcclxuICAgIHByb2ZpbGVJbmZvLnNldFVzZXJJbmZvKG5ld1VzZXJJbmZvKTtcclxuICAgIHByb2ZpbGVFZGl0UG9wdXAuY2xvc2UoKTtcclxufVxyXG5cclxuLy8gQWRkIGNhcmQgTW9kYWwgU2F2ZSBCdXR0b25cclxuZnVuY3Rpb24gaGFuZGxlQWRkQ2FyZEZvcm1TdWJtaXQoaW5wdXRWYWx1ZXMpIHtcclxuICAgIC8vIHt0aXRsZTogJy4uLnRpdGxlJywgdXJsOiAnLi4udXJsJ31cclxuICAgIGNvbnN0IG5hbWUgPSBpbnB1dFZhbHVlcy50aXRsZTtcclxuICAgIGNvbnN0IGxpbmsgPSBpbnB1dFZhbHVlcy51cmw7XHJcbiAgICBjb25zdCBjYXJkID0gcmVuZGVyQ2FyZCh7bmFtZSwgbGlua30pO1xyXG4gICAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkKTtcclxuICAgIGNhcmRGb3JtVmFsaWRhdG9yLmRpc2FibGVTdWJtaXRCdXR0b24oKTtcclxuICAgIGFkZENhcmRQb3B1cC5jbG9zZSgpO1xyXG4gICAgYWRkQ2FyZFBvcHVwLnJlc2V0Rm9ybSgpO1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJJdGVtcygpIHtcclxuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5fcmVuZGVyZXIoaXRlbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW0oZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBvcHVwIGZyb20gXCIuL1BvcHVwLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwIHtcclxuICAgIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcclxuICAgICAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgICAgICB0aGlzLl9pbWFnZUVsZW1lbnQgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19pbWFnZVwiKTsgXHJcbiAgICAgICAgdGhpcy5fY2FwdGlvbkVsZW1lbnQgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYXB0aW9uXCIpOyBcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKG5hbWUsIGxpbmspIHtcclxuICAgICAgICB0aGlzLl9pbWFnZUVsZW1lbnQuc3JjID0gbGluaztcclxuICAgICAgICB0aGlzLl9pbWFnZUVsZW1lbnQuYWx0ID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9jYXB0aW9uRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgICAgICAgc3VwZXIub3BlbigpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckluZm8ge1xyXG4gICAgY29uc3RydWN0b3IoeyBuYW1lU2VsZWN0b3IsIGpvYlNlbGVjdG9yIH0pIHtcclxuICAgICAgICB0aGlzLl9uYW1lRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZVNlbGVjdG9yKTtcclxuICAgICAgICB0aGlzLl9qb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihqb2JTZWxlY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5fbmFtZUVsZW1lbnQudGV4dENvbnRlbnQsXHJcbiAgICAgICAgICAgIGpvYjogdGhpcy5fam9iRWxlbWVudC50ZXh0Q29udGVudCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXJJbmZvKHsgbmFtZSwgam9iIH0pIHtcclxuICAgICAgICB0aGlzLl9uYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fam9iRWxlbWVudC50ZXh0Q29udGVudCA9IGpvYjtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJGb3JtVmFsaWRhdG9yIiwiY29uc3RydWN0b3IiLCJ2YWxpZGF0aW9uQ29uZmlnIiwiZm9ybUVsZW1lbnQiLCJ0aGlzIiwiX2Zvcm1FbGVtZW50IiwiX2lucHV0U2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwiX3N1Ym1pdEJ1dHRvblNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiX2Vycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiX2lucHV0RWxlbWVudHMiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiX3N1Ym1pdEJ1dHRvbiIsInF1ZXJ5U2VsZWN0b3IiLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsZW1lbnQiLCJlcnJvck1lc3NhZ2VFbGVtZW50IiwiaWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0ZXh0Q29udGVudCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVJbnB1dEVycm9yIiwicmVtb3ZlIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInZhbGlkaXR5IiwidmFsaWQiLCJfaGFzSW52YWxpZElucHV0Iiwic29tZSIsIl90b2dnbGVCdXR0b25TdGF0ZSIsImRpc2FibGVTdWJtaXRCdXR0b24iLCJkaXNhYmxlZCIsIl9zZXRFdmVudExpc3RlbmVycyIsImZvckVhY2giLCJhZGRFdmVudExpc3RlbmVyIiwicmVzZXRWYWxpZGF0aW9uIiwiX2lucHV0TGlzdCIsIl9oaWRlRXJyb3IiLCJlbmFibGVWYWxpZGF0aW9uIiwiZXZ0IiwicHJldmVudERlZmF1bHQiLCJDYXJkIiwiZGF0YSIsImNhcmRTZWxlY3RvciIsImhhbmRsZUltYWdlQ2xpY2siLCJuYW1lIiwibGluayIsIl9jYXJkU2VsZWN0b3IiLCJfaGFuZGxlSW1hZ2VDbGljayIsIl9jYXJkRWxlbWVudCIsIl9oYW5kbGVMaWtlQnV0dG9uIiwiX2hhbmRsZVRyYXNoQnV0dG9uIiwiX2NhcmRJbWFnZUVsZW1lbnQiLCJ0b2dnbGUiLCJnZXRWaWV3IiwiZG9jdW1lbnQiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiY2FyZFRpdGxlRWwiLCJzcmMiLCJhbHQiLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXAiLCJfaGFuZGxlRXNjQ2xvc2UiLCJiaW5kIiwib3BlbiIsImNsb3NlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImUiLCJrZXkiLCJzZXRFdmVudExpc3RlbmVycyIsInRhcmdldCIsIlBvcHVwV2l0aEZvcm0iLCJzdWJtaXRDYWxsYmFjayIsInN1cGVyIiwiX3N1Ym1pdENhbGxiYWNrIiwiX2Zvcm0iLCJfaW5wdXRzIiwiX2dldElucHV0VmFsdWVzIiwidmFsdWVzIiwiaW5wdXQiLCJ2YWx1ZSIsInJlc2V0Rm9ybSIsInJlc2V0IiwiaW5wdXRWYWx1ZXMiLCJwcm9maWxlRWRpdEJ0biIsInByb2ZpbGVFZGl0TW9kYWwiLCJwcm9maWxlTmFtZUlucHV0IiwicHJvZmlsZURlc2NyaXB0aW9uSW5wdXQiLCJwcm9maWxlRWRpdEZvcm0iLCJhZGROZXdDYXJkQnV0dG9uIiwiYWRkQ2FyZE1vZGFsIiwiYWRkQ2FyZEZvcm0iLCJwcmV2aWV3TW9kYWwiLCJmb3JtU2VsZWN0b3IiLCJwcmV2aWV3UG9wdXAiLCJjYXJkU2VjdGlvbiIsIl9yZWYiLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaXRlbXMiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiY2FyZCIsInJlbmRlckNhcmQiLCJwcm9maWxlRm9ybVZhbGlkYXRvciIsImNhcmRGb3JtVmFsaWRhdG9yIiwicHJvZmlsZUVkaXRQb3B1cCIsIm5ld1VzZXJJbmZvIiwiam9iIiwiZGVzY3JpcHRpb24iLCJwcm9maWxlSW5mbyIsInNldFVzZXJJbmZvIiwiYWRkQ2FyZFBvcHVwIiwidGl0bGUiLCJ1cmwiLCJfaW1hZ2VFbGVtZW50IiwiX2NhcHRpb25FbGVtZW50IiwiY3VycmVudFVzZXJJbmZvIiwiZ2V0VXNlckluZm8iLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsIl9uYW1lRWxlbWVudCIsIl9qb2JFbGVtZW50IiwiX3JlZjIiXSwic291cmNlUm9vdCI6IiJ9