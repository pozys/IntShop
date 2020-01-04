const cartitem = {
  data() {
    return {
      locationOrigin: location.origin,
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
  <a :href="locationOrigin+'/single_page.html?id='+product.product_id"
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
};

const cart = {
  data() {
    return {
      locationOrigin: location.origin,
      cartItems: [],
      catalogUrl: "/cart"
    };
  },

  components: {
    cartitem
  },

  methods: {
    addToCart(item) {
      item.count = item.count || 1;
      if (
        this.cartItems.find(cartEl => item.product_id === cartEl.product_id)
      ) {
        this.$root
          .putJSON(`/api${this.catalogUrl}`, JSON.stringify(item))
          .then(data => {
            this.cartItems = [...data];
          });
      } else {
        this.$root
          .postJSON(`/api${this.catalogUrl}`, JSON.stringify(item))
          .then(data => {
            this.cartItems = [...data];
          });
      }
    },

    deletefromCart(item) {
      this.$root
        .deleteJSON(`/api${this.catalogUrl}`, JSON.stringify(item))
        .then(data => {
          this.cartItems = [...data];
        });
    },

    clearCart() {
      this.$root.deleteJSON(`/api${this.catalogUrl}/clearCart`).then(data => {
        this.cartItems = [...data];
      });
    }
  },
  computed: {
    cartNotEmpty() {
      return this.cartItems.length;
    },

    countTotal() {
      return this.cartItems
        .reduce((sum, item) => sum + item.count * item.price, 0)
        .toFixed(2);
    }
  },

  mounted() {
    this.$root.getJSON(`/api${this.catalogUrl}`).then(data => {
      this.cartItems = [...data];
    });
  },

  template: `<ul class="drop__ul">
  <li v-if="cartNotEmpty"><cartitem v-for='product of cartItems'
   :key='product.product_id' :product='product' :img='product.img'></cartitem></li>
   <li v-else><div class="cart-item">Корзина пуста</div></li>
  
   <li v-if="cartNotEmpty">
   <div class="cart-item__total">
     <div>TOTAL</div>
     <div>&#36;{{countTotal}}</div>
   </div>
   <div class="cart-item__button-box">
     <a
       href="/checkout.html"
       class="pink-border-button pink-border-button_for-cart-drop"
     >
       Checkout
     </a>
     <a :href="locationOrigin+'/shopping_cart.html'"
       class="greyBorderButton greyBorderButton_forHeader-cart"
     >
       Go to cart
     </a>
   </div>
 </li>
 </ul>`
};



export default cart;
