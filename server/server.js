const express = require("express");
const fs = require("fs");
const productsFile = "./data/products.json";
const cart = "./data/cart.json";
const cartRouter = require("./cartRouter");
const app = express();

app.use(express.json());
app.use("/", express.static("./public"));
app.use(`/api/cart`, cartRouter);
app.get("/api/products/:sortType/:limitIndex/:visibleCount", (req, res) => {
  console.log(req.params);
  fs.readFile(productsFile, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      dataObj = JSON.parse(data);
      if (!req.params.sortType || req.params.sortType === "default") {
        // dataObj.slice(req.params.limitIndex, req.params.visibleCount-1);
      } else {
        switch (req.params.sortType) {
          case "name":
            dataObj.sort(function(a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            });
            break;
          case "price":
            dataObj.sort(function(a, b) {
              if (a.price > b.price) {
                return 1;
              }
              if (a.price < b.price) {
                return -1;
              }
              return 0;
            });
            break;
        }
      }
      res.send(JSON.stringify(dataObj.slice(req.params.limitIndex, req.params.visibleCount)));
    }
  });
});
app.get("/api/cart", (req, res) => {
  fs.readFile(cart, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.get("/api/product", (req, res) => {
  fs.readFile(productsFile, "utf-8", (err, data) => {
    if (err) {
    } else {
    }
    let cart = JSON.parse(data);
    foundItem = cart.find(item => req.query.id == item.product_id);
    res.send(JSON.stringify(foundItem));
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

// node ./server/server.js
