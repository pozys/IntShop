const search = {
  data() {
    return {
      query: ""
    };
  },

  methods: {
    queryOnChange() {
      if (!document.querySelector(".featuredItems__products")) {
        return;
      }

      productList =
        this.$root.$refs["productlist"] ||
        this.$root.$refs["product"].$refs["productlist"];
      productList.getProducts(this.query);
    }
  },

  template: `
  <form @submit.prevent='queryOnChange' action="#" class="search">
  <div class="search__browse-button-group">
    <button class="search__browse-button">
      <span>Browse </span><i class="fas fa-caret-down"></i>
    </button>
    <div class="drop-cover">
      <div class="drop drop__stay">
        <div class="drop__column">
          <h3 class="drop__h3">Women</h3>
          <ul class="drop__ul">
            <li><a href="#" class="drop__item">Dresses</a></li>
            <li><a href="#" class="drop__item">Tops</a></li>
            <li>
              <a href="#" class="drop__item">Sweaters/Knits</a>
            </li>
            <li>
              <a href="#" class="drop__item">Jackets/Coats</a>
            </li>
          </ul>
          <h3 class="drop__h3">Men</h3>
          <ul class="drop__ul">
            <li><a href="#" class="drop__item">Dresses</a></li>
            <li><a href="#" class="drop__item">Tops</a></li>
            <li>
              <a href="#" class="drop__item">Sweaters/Knits</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="searchWindow">
  <input 
    class="input input_searchWindow"
    type="text"
    placeholder="Search for Item..."
    v-model='query'
  />
  <a @click.prevent='queryOnChange' href="#" class="search__button-search"
    ><i class="fas fa-search"></i
  ></a>
</div>
</form>`
};

export default search;