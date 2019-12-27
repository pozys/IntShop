const API = "/api";

const app = new Vue({
  el: "#app",

  methods: {
    getJSON(url) {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      })
        .then(result => result.json())
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
        .then(result => result.json())
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
        .then(result => result.json())
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
        .then(result => result.json())
        .catch(error => console.log(error));
    }
  }
});
