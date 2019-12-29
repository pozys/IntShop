Vue.component("shopping-cart", {
  data() {
    return {
      locationOrigin: location.origin,
      cartAPI: this.$root.$refs.cart,
      cartItems: [],
      catalogUrl: "/cart"
    };
  },

  methods: {
    getCart() {
      this.$root.getJSON(`${API + this.catalogUrl}`).then(data => {
        this.cartItems = [...data];
      });
    },

    clearCart() {
      this.cartAPI.clearCart();
      this.cartItems = [];
    },

    goToPage(path){
      document.location.href = path;
    }
  },
  computed: {
    cartNotEmpty() {
      return this.cartItems.length > 0;
    },

    countTotal() {
      return this.cartItems
        .reduce((sum, item) => sum + item.count * item.price, 0)
        .toFixed(2);
    }
  },

  mounted() {
    this.getCart();
  },

  template: `<div>
  <div class="products-cart container">
  <table class="productsTable container">
  
    <thead v-if="cartNotEmpty" >
      <tr class="productsTable__header">
        <td>Product Details</td>
        <td>unite Price</td>
        <td>Quantity</td>
        <td>shipping</td>
        <td>Subtotal</td>
        <td>ACTION</td>
      </tr>
    </thead> <tbody v-if="cartNotEmpty" ><shoppingCartItem v-for='product of cartItems'
  :key='product.product_id' :product='product' :img='product.img'></shoppingCartItem></tbody> 
  <div v-else class="productDetails__name">Корзина пуста</div>
  </table>
  <div v-if="cartNotEmpty" class="products-cart__button-panel">
    <button @click='clearCart()' class="greyBorderButton greyBorderButton_forProducts-cart">
      cLEAR SHOPPING CART
    </button>
    <button @click="goToPage(locationOrigin+'/product.html')" class="greyBorderButton greyBorderButton_forProducts-cart">
      cONTINUE sHOPPING
    </button>
  </div>  
</div>
<form action="#" class="orderPlacement container">
<section class="orderPlacement__section">
  <h3 class="orderPlacement__h3">Shipping Adress</h3>

  <select
    class="select orderPlacement__select select_forOrderPlacement"
    name="country"
  >
    <option value="bangladesh">Bangladesh</option>
    <option value="russia">Russia</option>
    <option value="france">France</option>
  </select>

  <input
    class="input orderPlacement__input input_forOrderPlacement"
    type="text"
    placeholder="State"
  />

  <input
    class="input orderPlacement__input input_forOrderPlacement"
    type="text"
    placeholder="Postcode / Zip"
  />

  <a href="#" class="greyBorderButton greyBorderButton_forGetAQuote"
    >get a quote</a
  >
</section>
<section class="orderPlacement__section">
  <h3 class="orderPlacement__h3">coupon discount</h3>
  <p>Enter your coupon code if you have one</p>
  <div class="orderPlacement__item">
    <input
      class="input orderPlacement__input input_forOrderPlacement"
      type="text"
      placeholder="Coupon"
    />
  </div>

  <a href="#" class="greyBorderButton greyBorderButton_forApplyCoupon"
    >Apply coupon</a
  >
</section>
<div class="orderPlacement__total-group">
  <div class="orderPlacement__subtotal">
    <span>Sub total</span><span>&#36;{{countTotal}}</span>
  </div>
  <div class="orderPlacement__total">
    <span>GRAND TOTAL</span><span class="pink">&#36;{{countTotal}}</span>
  </div>
  <a href="#" class="pinkButton pinkButton_fororderPlacement">
    proceed to checkout
  </a>
</div>
</form></div>`
});

Vue.component("shoppingCartItem", {
  data() {
    return {
      cartAPI: this.$root.$refs.cart,
      parent: this.$parent
    };
  },

  methods: {
    getItemSum(count, price) {
      return (count * price).toFixed(2);
    },

    deletefromCart(product) {
      this.cartAPI.deletefromCart(product);
      this.parent.getCart();
    }
  },

  props: {
    product: {},
    img: {
      default: "https://placehold.it/140x150"
    }
  },

  template: `<tr class="productsTable__row">
        <td class="productsTable__productDetails">
          <a :href="'single_page.html?id='+product.product_id"
            ><img
              :src="img"
              alt="product.name"
              class="productDetails__img"
          /></a>
          <div class="productDetails__description">
            <a :href="'single_page.html?id='+product.product_id" class="productDetails__name"
              >{{product.name}}</a
            >
            <div class="productDetails__feature">
              <span
                ><span class="productDetails__feature__name"
                  >Color:</span
                ><span class="productDetails__feature__value"
                  >{{product.color}}</span
                ></span
              >
            </div>
            <div class="productDetails__feature">
              <span class="productDetails__feature__name">Size:</span
              ><span class="productDetails__feature__value">{{product.size}}</span>
            </div>
          </div>
        </td>
        <td>&#36;{{product.price}}</td>
        <td><input type="number" name="productCount" v-model='product.count' min="1" /></td>
        <td>FREE</td>
        <td>&#36;{{getItemSum(product.count, product.price)}}</td>
        <td>
          <a @click='deletefromCart(product)'
          href="#" class="delete-button"
            ><i class="fas fa-times"></i
          ></a>
        </td>
      </tr>`
});
