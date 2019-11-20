Vue.component("productList", {
  data() {
    return {
      visibleCount: 0,
      limitIndex: 0,
      products: []
    };
  },

  template: `<div class="featuredItems__products v-for='product of products' :key='product.product_id' :product='product' img='img'"></div>`
});

Vue.component("featuredItems__products", {
  props: [product, img],

  template: `<div class="featuredItems__image-block">              
    <div class="featuredItems__block-hover">
      <a href="single_page.html" class="featuredItems__link-hover">
      </a>
      <button
        class="white-border-transparent-button featuredItems__white-border-transparent-button"
      >
        <img src="img/cart-white.svg" alt="cart" class="cart" />Add to
        Cart
      </button>
    </div>
    <img class="featuredItems__item featuredItems__item1" src="img" alt="product.product_name"></img>
    <div class="featured__text">
      <a href="single_page.html" class="featured__text__black"
        >{{product.product_name}}</a
      >
      <div class="featured__text__pink">&#36;{{product.product_name}}</div>
    </div>
    </div>`
});
