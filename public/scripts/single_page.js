Vue.component("single-page", {
  data() {
    return {
      cartAPI: this.$root.$refs.cart,
      APIname: "/product",
      visibleCount: 0,
      limitIndex: 0,
      product: { name: "", color: "black", size: "l", count: 1 }
    };
  },

  created() {
    this.$root
      .getJSON(`${API + this.APIname + location.search}`)
      .then(data => {
        Object.assign(this.product, data);
        this.product.count = 1;
      })
      .catch(error => console.log(error));
  },

  template: `<div>
  <div class="imageSlide">   
  <a href="#" class="arrow"><i class="fas fa-angle-left"></i></a><img :src="product.img" :alt='product.name' class="imageSlide__img"></img>
  <a href="#" class="arrow"><i class="fas fa-angle-right"></i></a>
  </div>
  <main class="container productDescription-parent">
  <div class="productDescription-child">
        <section class="productDescription">
          <div class="productDescription__nav">
            <div class="productDescription__nav__text">WOMEN COLLECTION</div>
            <nav class="productDescription__links">
              <a href="#" class="productDescription__link"></a>
              <a
                href="#"
                class="productDescription__link productDescription__link-active"
              ></a>
              <a href="#" class="productDescription__link"></a>
            </nav>
          </div>
          <h3 class="productDescription__h3">Moschino Cheap And Chic</h3>
          <p class="productDescription__text">
            Compellingly actualize fully researched processes before proactive
            outsourcing. Progressively syndicate collaborative architectures
            before cutting-edge services. Completely visualize parallel core
            competencies rather than exceptional portals.
          </p>
          <div class="productDescription__info">
            <div class="productDescription__item">
              MATERIAL: <span>{{product.material}}</span>
            </div>
            <div class="productDescription__item">
              DESIGNER: <span>{{product.designer}}</span>
            </div>
          </div>
          <div class="productDescription__price">&#36;{{product.price}}</div>
          <form action="#" class="choose-group">
            <div class="choose-items">
              <div class="choose__item">
                <label for="size">CHOOSE COLOR</label> <br />
                <select
                  class="select choose-items__select select_forChooseItem"
                  name="size"
                  id="size"
                  v-model='product.color'
                  ><option value="red">Red</option>
                  <option value="black">Black</option>
                  <option value="white">White</option></select
                >
              </div>
              <div class="choose__item">
                <label for="color">CHOOSE SIZE</label> <br /><select
                  class="select choose-items__select select_forChooseItem"
                  name="color"
                  id="color"
                  v-model='product.size'
                  ><option value="xxl">XXL</option>
                  <option value="xl">XL</option>
                  <option value="l">L</option>
                  <option value="m">M</option></select
                >
              </div>
              <div class="choose__item">
                <label for="quantity">QUANTITY</label> <br /><input
                  class="input choose-items__input input_forChooseItem"
                  type="number"
                  name="quantity"
                  min=1
                  id="quantity"
                  v-model.number='product.count'
                />
              </div>
            </div>
            <button @click.prevent='cartAPI.addToCart(product)'
              class="pink-border-button pink-border-button_for-choose-group"
            >
              <img src="img/pink-cart.svg" alt="cart" class="pinkCart" />Add to
              Cart
            </button>
          </form>
        </section>
      </div>
      </main>
      </div>
      `
});
