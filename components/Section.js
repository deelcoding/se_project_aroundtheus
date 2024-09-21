export default class Section {
  constructor({items, renderer}, cardEl) {
    this._initialArray = [items];
    this._renderer = renderer;
    this.container = document.querySelector(cardEl);
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem() {

  }
}