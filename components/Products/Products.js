class Products {
  constructor() {
    this.classNameActive = 'products-element__btn--active';
    this.labelAdd = 'Добавить в корзину';
    this.labelDelete = 'Удалить из корзины';
  }

  handleSetLocationStorage(element, id) {
    const { pushProduct, products } = localStorageUtil.putProducts(id);

    if (pushProduct) {
      element.classList.add(this.classNameActive);
      element.innerHTML = this.labelDelete;
    } else {
      element.classList.remove(this.classNameActive);
      element.innerHTML = this.labelAdd;
    }

    headerPage.render(products.length);
  }

  render() {
    const productsStore = localStorageUtil.getProducts();
    let htmlCatalog = '';

    CATALOG.forEach(({ id, name, price, img}) => {
      let activeClass = '';
      let activeText = '';

      if (productsStore.indexOf(id) === -1) {
        activeText = this.labelAdd;
      } else {
        activeClass = this.classNameActive;
        activeText = this.labelDelete;
      }

      htmlCatalog += `
        <li class="products-element">
          <span class="products-element__name">${name}</span>
          <img class="products-element__img" src="${img}" alt="${name}">
          <span class="products-element__price">
            ⚡ ${price.toLocaleString()} USD
           </span>
          <button class="products-element__btn ${activeClass}" type="button" onclick="productsPage.handleSetLocationStorage(this, '${id}')">${activeText}</button>
        </li>
      `;
    });

    ROOT_PRODUCTS.innerHTML = `
      <ul class="products-container">
          ${htmlCatalog}
      </ul>
    `;
  }
}

const productsPage = new Products();

