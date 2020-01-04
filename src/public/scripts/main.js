import cart from './cart'
import product from './product'
import search from './search'
import productlist from './productList'
import shoppingcart from './shoppingCart'
import singlepage from './single_page'

const app = {
  el: "#app",

  components:{
    cart,
    product,
    search,
    productlist,
    shoppingcart,
    singlepage
  },

  methods: {
    handleAnswer(result) {
      if (result.ok) {
        return result.json();
      } else {
        return result.json().then(body => console.log(body.error));
      }
    },

    getJSON(url) {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      })
        .then(result => this.handleAnswer(result))
        .catch(error => console.log(error));
    },

    postJSON(url, body) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body
      })
        .then(result => this.handleAnswer(result))
        .catch(error => console.log(error));
    },

    putJSON(url, body) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body
      })
        .then(result => this.handleAnswer(result))
        .catch(error => console.log(error));
    },

    deleteJSON(url, body) {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body
      })
        .then(result => this.handleAnswer(result))
        .catch(error => console.log(error));
    }
  }
};
export default app;