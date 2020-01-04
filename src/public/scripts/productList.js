const featuredItemsProducts = {
  data() {
    return {
      cartAPI: this.$root.$refs.cart
    };
  },

  props: {
    extendedButtonSet: {
      type: Boolean,
      default: false
    },
    product: {},
    img: {
      default: "https://placehold.it/140x150"
    }
  },

  template: `<div class="featuredItems__image-block">              
    <div class="featuredItems__block-hover">
      <a :href="'single_page.html?id='+product.product_id" class="featuredItems__link-hover">
      </a>
      <button @click='cartAPI.addToCart(product)'
        class="white-border-transparent-button featuredItems__white-border-transparent-button"
      >
        <img src="img/static/cart-white.svg" alt="cart" class="cart" />Add to
        Cart
      </button>
      <button v-if='extendedButtonSet'
      class="white-border-transparent-button product-box__white-border-transparent-button_little white-border-transparent-button_rounded"
    >
      <i class="fas fa-retweet"></i>
    </button>
    <button v-if='extendedButtonSet'
      class="white-border-transparent-button product-box__white-border-transparent-button_little white-border-transparent-button_rounded"
    >
      <i class="far fa-heart"></i>
    </button>
    </div>
    <img class="featuredItems__item" :src="img" :alt="product.name"></img>
    <div class="featured__text">
      <a :href="'single_page.html?id='+product.product_id" class="featured__text__black"
        >{{product.name}}</a
      >
      <div class="featured__text__pink">&#36;{{product.price}}</div>
    </div>
    </div>`
};

const productlist = {
  data() {
    return {
      catalogUrl: "/products",
      limitIndex: 0,
      products: [],
      visibleCount: 8,
      sortType: "default"
    };
  },

  components:{
    featuredItemsProducts
  },

  methods: {
    setSortType(sortType){
      this.typeOfSort = sortType;
    },

    setVisibleCount(visibleCount){
      this.visCount = visibleCount;
    },

    getProducts(searchQuery='') {
      this.$root
        .getJSON(
          `/api${this.catalogUrl}/${this.typeOfSort || this.sortType}/${this.limitIndex}/${this.visCount || this.visibleCount}/${searchQuery}`
        )
        .then(data => {
          this.products = [...data];
        });
    }
  },

  mounted() {
    this.getProducts();
  },

  props: {
    extendedButtonSet: {
      type: Boolean,
      default: false
    },
    visCount:{
      type: Number,
      default: 0
    },
    typeOfSort:{
      type: String,
      default: ''
    }
  },

  template: `<div class="featuredItems__products"> <featuredItemsProducts v-for='product of products'
  :key='product.product_id' :product='product' :img='product.img' :extendedButtonSet='extendedButtonSet'></featuredItemsProducts></div>`
};



export default productlist;