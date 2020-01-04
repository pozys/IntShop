import productlist from './productList'

const productFilter = {
  data() {
    return {
      sortByName: this.sortType,
      show: 6
    };
  },

  props: ["sortType"],

  template: `<div>
    <div class="product-box__top-filter">
      <section class="top-filter__item top-filter__trending-now">
        <h3 class="top-filter__h3">Trending now</h3>
        <div class="trending-now__filters">
          <div class="top-filter__filter-group">
            <a href="#" class="trending-now__filter-item">Bohemian</a>
            <a href="#" class="trending-now__filter-item">Floral</a>
            <a href="#" class="trending-now__filter-item">Lace</a>
          </div>
          <div class="top-filter__filter-group">
            <a href="#" class="trending-now__filter-item">Floral</a>
            <a href="#" class="trending-now__filter-item">Lace</a>
            <a href="#" class="trending-now__filter-item">Bohemian</a>
          </div>
        </div>
      </section>
      <section class="top-filter__item top-filter__size">
        <h3 class="top-filter__h3">Size</h3>
        <form class="size__filters">
          <div class="top-filter__filter-group">
            <div class="filter-group_vertical">
              <p class="size__filter-item">
                <input
                  class="size__filter-input"
                  type="checkbox"
                  name="filter-size"
                  value="xxs"
                  id="size__filter-item_xxs"
                /><label for="size__filter-item_xxs" class="size__label">xxs</label>
              </p>
              <p class="size__filter-item">
                <input
                  class="size__filter-input"
                  type="checkbox"
                  name="filter-size"
                  value="l"
                  id="size__filter-item_l"
                /><label for="size__filter-item_l" class="size__label">l</label>
              </p>
            </div>
            <div class="filter-group_vertical">
              <p class="size__filter-item">
                <input
                  class="size__filter-input"
                  type="checkbox"
                  name="filter-size"
                  value="xs"
                  id="size__filter-item_xs"
                /><label for="size__filter-item_xs" class="size__label">xs</label>
              </p>
              <p class="size__filter-item">
                <input
                  class="size__filter-input"
                  type="checkbox"
                  name="filter-size"
                  value="xl"
                  id="size__filter-item_xl"
                /><label for="size__filter-item_xl" class="size__label">xl</label>
              </p>
            </div>
            <div class="filter-group_vertical">
              <p class="size__filter-item">
                <input
                  class="size__filter-input"
                  type="checkbox"
                  name="filter-size"
                  value="s"
                  id="size__filter-item_s"
                /><label for="size__filter-item_s" class="size__label">s</label>
              </p>
              <p class="size__filter-item">
                <input
                  class="size__filter-input"
                  type="checkbox"
                  name="filter-size"
                  value="xll"
                  id="size__filter-item_xll"
                /><label for="size__filter-item_xll" class="size__label">xll</label>
              </p>
            </div>
            <div class="filter-group_vertical">
              <p class="size__filter-item">
                <input
                  class="size__filter-input"
                  type="checkbox"
                  name="filter-size"
                  value="m"
                  id="size__filter-item_m"
                /><label for="size__filter-item_m" class="size__label">m</label>
              </p>
            </div>
          </div>
        </form>
      </section>
      <section class="top-filter__item top-filter__price">
        <h3 class="top-filter__h3">pRICE</h3>
        <form class="price__filter-item">
          <input
            class="price__range"
            type="range"
            name="filter-price"
            min="52"
            max="400"
          />
        </form>
        <div class="price__start-end">
          <span>&#36;52</span><span>&#36;400</span>
        </div>
      </section>
    </div>
    <div class="product-box__sort-by-box">
         <div class="sort-by-box__item">
        <span class="sort-by-box__name">Sort By</span
        ><select v-model='sortByName' v-on:change="$emit('sortbyname-onchange', $event.target.value)" name="sortBy" class="select sort-by-box__select">
          <option value="name">Name</option>
          <option value="price">price</option>
          <option value="default">default</option>
        </select>
      </div>
      <div class="sort-by-box__item">
        <span class="sort-by-box__name">Show</span
        ><select v-model='show' v-on:change="$emit('show-onchange', $event.target.value)" class="select sort-by-box__select">
          <option value="6">06</option>
          <option value="9">09</option>
          <option value="18">18</option>
        </select>
      </div>
    </div>  
  </div>`
};

const product = {
  data() {
    return {
      sortType: "default",
      visibleCount: 6
    };
  },

  components:{
    productFilter,
    productlist
  },

  methods: {
    sortByNameOnChange(ev) {
      this.$refs["productlist"].setSortType(ev);
      this.$refs["productlist"].getProducts();
    },

    showOnchange(ev) {
      this.$refs["productlist"].setVisibleCount(+ev);
      this.$refs["productlist"].getProducts();
    }
  },

  template: `<div class="product-box">
  <productFilter :sortType='sortType' v-on:sortbyname-onchange='sortByNameOnChange' v-on:show-onchange='showOnchange'></productFilter>  
    <productlist ref='productlist' :visCount='visibleCount' :typeOfSort='sortType' :extendedButtonSet=true></productlist>
    <div class="product-box__pagination"> 
    <nav class="pagination__page-block">
      <a href="product.html" class="page-block__item"
        ><i class="fas fa-angle-left"></i
      ></a>
      <a href="#" class="page-block__item">1</a>
      <a href="#" class="page-block__item">2</a>
      <a href="#" class="page-block__item">3</a>
      <a href="#" class="page-block__item">4</a>
      <a href="#" class="page-block__item">5</a>
      <a href="#" class="page-block__item">6</a>
      <a href="#" class="page-block__item">...</a>
      <a href="#" class="page-block__item">20</a>

      <a href="#" class="page-block__item"
        ><i class="fas fa-angle-right"></i
      ></a>
    </nav>
    <button class="pink-border-button pink-border-button_for-pagination">
      View All
    </button>
  </div>
  </div>`
};



export default product;