Vue.component("product-list", {
  data() {
    return {
      catalogUrl: "/products",
      visibleCount: 0,
      limitIndex: 0,
      products: []
    };
  },

  mounted() {
    this.$root.getJSON(`${API + this.catalogUrl}`).then(data => {
      this.products = [...data];
    });
  },

  template: `<div class="featuredItems__products"> <featured-items-products v-for='product of products'
  :key='product.product_id' :product='product' :img='product.img'></featured-items-products></div>`
});

Vue.component("featured-items-products", {
  data() {
    return {
      cartAPI: this.$root.$refs.cart
    };
  },

  props: {
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
        <img src="img/cart-white.svg" alt="cart" class="cart" />Add to
        Cart
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
});
