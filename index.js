import CardsList from './cards-list.js';
import Pagination from './pagination.js';
import Search from './search.js';

const BACKEND_URL = 'https://online-store.bootcamp.place/api/';
export default class OnlineStorePage {
  constructor () {
    this.products = [];
    this.pageSize = 9;

    this.url = new URL('products', BACKEND_URL);
    this.url.searchParams.set('_limit', this.pageSize);


    this.components = {};

    this.initComponents();
    this.render();
    this.renderComponents();

    this.initEventListeners();

    this.update(1);
  }

  async loadData(pageNumber){
    this.url.searchParams.set('_page', pageNumber);

    const response = await fetch(this.url);
    const products = await response.json();

    console.log('products', products);

    return products;
  }

  getTemplate () {
    return `
      <div class = 'os-container'>
        <div class = 'os-header'>
          <div class = 'os-logo-text'>Online Store</div>
          <button class = 'cart os-btn-primary'>
          <i class="bi bi-cart"></i>
          CART
          </button>
        </div>
        <div class = 'os-products'>
          <div data-element = 'side-bar'>
            <!-- Side Bar Component -->
          </div>

          <section>
            <div data-element = 'search'>
              <!-- Search -->
            </div>
            <div data-element="cardList">
              <!-- Cards List component -->
            </div>
            <div data-element="pagination">
              <!-- Pagination component -->
            </div>
          </section>

          
        </div>
      </div>
    `;
  }

  initComponents () {
    // TODO: remove har
    const totalElements = 100;
    const totalPages = Math.ceil(totalElements / this.pageSize);
    const cardList = new CardsList(this.products);
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages
    })
    const search = new Search();

    this.components.search = search;
    this.components.cardList = cardList;
    this.components.pagination = pagination;
  }

  renderComponents () {

    const searchContainer = this.element.querySelector('[data-element="search"]')
    const cardsContainer = this.element.querySelector('[data-element="cardList"]');
    const paginationContainer = this.element.querySelector('[data-element="pagination"]');

    searchContainer.append(this.components.search.element);
    cardsContainer.append(this.components.cardList.element);
    paginationContainer.append(this.components.pagination.element);

  }

  render () {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.getTemplate();
    this.element = wrapper.firstElementChild;
  }

  initEventListeners () {

    this.components.pagination.element.addEventListener('page-changed', event => {
      const pageIndex = event.detail;
      this.update(pageIndex + 1);
    });
  }

  async update(pageNumber){

    const data = await this.loadData(pageNumber);

    this.components.cardList.update(data);

  }
}
