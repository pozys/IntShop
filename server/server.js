const express = require("express");
const fs = require("fs");
const productsFile = "./data/products.json";
const cart = "./data/cart.json";
const cartRouter = require("./cartRouter");
const app = express();

app.use(express.json());
app.use("/", express.static("./public"));
app.use(`/api/cart`, cartRouter);
app.get("/api/products", (req, res) => {
  fs.readFile(productsFile, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
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
