const express = require("express");
const fs = require("fs");
const productsFile = "./dist/server/data/products.json";
const cart = "./dist/server/data/cart.json";
const cartRouter = require("./cartRouter");
const productListRouter = require("./productListRouter");
const app = express();

app.use(express.json());
app.use("/", express.static("./dist/public"));
app.use(`/api/cart`, cartRouter);
app.use("/api/products", productListRouter);
app.use(function(err, req, res, next) {
  res.status(500).send(JSON.stringify({ error: err.message }));
});

app.get("/api/cart", (req, res) => {
  fs.readFile(cart, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify({ error: err.message }));
    } else {
      res.send(data);
    }
  });
});

app.get("/api/product", (req, res) => {
  fs.readFile(productsFile, "utf-8", (err, data) => {
    if (err) {      
      res.status(500).send(JSON.stringify({ error: err.message }));
    } else {
      let cart = JSON.parse(data);
      foundItem = cart.find(item => req.query.id == item.product_id);
      res.send(JSON.stringify(foundItem));
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

