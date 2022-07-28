export default class Search {
  constructor(){
    this.myRender();
    // this.addEventListeners();
  }


  getTemplate(){
      const result = `
        <div class="wrapper" data-element = 'search'>
        <!-- SearchBox component -->
        <form action="">
        <div class="os-form-input use-icon">
            <input class = 'style-search' id = 'search-input' data-element="search" placeholder="Search" type="text">
            <label for="search-input" class="bi bi-search input-icon"></label>
        </div>
        </form>
        `;
        return result;

  }

  myRender () {

    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  // addEventListeners () {
  //   const searchInput = this.element.querySelector('[data-element="search"]')

  //   searchInput.addEventListener('input', event => {
  //     this.searchValue = event.target.value.trim()

  //     this.dispatchSearchChangeEvent()
  //   })
  // }

  // dispatchSearchChangeEvent = debounce(() => {
  //   const customEvent = new CustomEvent('search-changed', {
  //     detail: this.searchValue;
  //   })

  //   this.element.dispatchEvent(customEvent)
  // }, 250);
  
}