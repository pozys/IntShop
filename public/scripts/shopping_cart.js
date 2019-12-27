Vue.component("cart", {
  data() {
    return {
      cartItems: [],
      catalogUrl: "/cart"
    };
  },

  methods: {
    addToCart(item) {
      if (
        this.cartItems.find(cartEl => item.product_id === cartEl.product_id)
      ) {
        this.$root.putJSON("/api/cart", JSON.stringify(item)).then(data => {
          this.cartItems = [...data];
        });
      } else {
        this.$root.postJSON("/api/cart", JSON.stringify(item)).then(data => {
          this.cartItems = [...data];
        });
      }
    },

    deletefromCart(item) {
      this.$root.deleteJSON("/api/cart", JSON.stringify(item)).then(data => {
        this.cartItems = [...data];
      });
    }
  },
  computed: {
    cartNotEmpty() {
      return this.cartItems.length > 0;
    },

    countTotal(){
      return this.cartItems.reduce((sum, item)=> sum + item.count*item.price, 0).toFixed(2);
    },
  },

  mounted() {
    this.$root.getJSON(`${API + this.catalogUrl}`).then(data => {
      this.cartItems = [...data];
    });
  },

  template: `<ul class="drop__ul">
  <li v-if="cartNotEmpty"><cart-item v-for='product of cartItems'
   :key='product.product_id' :product='product' :img='product.img'></cart-item></li>
   <li v-else><div class="cart-item">Корзина пуста</div></li>
  
   <li v-if="cartNotEmpty">
   <div class="cart-item__total">
     <div>TOTAL</div>
     <div>&#36;{{countTotal}}</div>
   </div>
   <div class="cart-item__button-box">
     <a
       href="#"
       class="pink-border-button pink-border-button_for-cart-drop"
     >
       Checkout
     </a>
     <button
       class="greyBorderButton greyBorderButton_forHeader-cart"
     >
       Go to cart
     </button>
   </div>
 </li>
 </ul>`
});

Vue.component("cart-item", {
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

  template: `<div class="cart-item">
  <a href="#"
    ><img
    :src="img"
      alt="product.name"
      class="cart-item__image"
  /></a>
  <div class="cart-item__description">
    <a href="single_page.html" class="cart-item__name"
      >{{product.name}}</a
    >
    <div class="cart-item__score">
      <i class="fas fa-star"></i
      ><i class="fas fa-star"></i
      ><i class="fas fa-star"></i
      ><i class="fas fa-star"></i
      ><i class="fas fa-star-half-alt"></i>
    </div>
    <div class="cart-item__price">{{product.count}} x &#36;{{product.price}}</div>
  </div>
  <a @click='cartAPI.deletefromCart(product)'
    href="#"
    class="delete-button cart-item__delete-button"
    ><i class="fas fa-times"></i
  ></a>
</div>`
});
