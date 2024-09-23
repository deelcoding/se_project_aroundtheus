class Section {
  constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
  }

  renderItems() {
      this._items.forEach(item => this._renderer(item));
  }

  addItem(element) {
      this._container.prepend(element);
  }
}

// Usage example:
const section = new Section(
  {
      items: initialCards,
      renderer: (data) => {
          const card = new Card(data, cardSelector, handleImageClick);
          section.addItem(card.getView());
      },
  },
  '.cards__list'
);