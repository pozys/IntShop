const express = require("express");
const fs = require("fs");
const router = express.Router();
const cartPath = "./data/cart.json";

router.post("/", (req, res) => {
  fs.readFile(cartPath, "utf-8", (err, data) => {
    if (err) {
    } else {
      let cart = JSON.parse(data);
      cart.push(req.body);
      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        if (err) {
        } else {
          res.send(`${JSON.stringify(cart)}`);
        }
      });
    }
  });
});

router.put("/", (req, res) => {
  fs.readFile(cartPath, "utf-8", (err, data) => {
    if (err) {
    } else {
      let cart = JSON.parse(data);
      foundItem = cart.find(item => req.body.product_id === item.product_id);
      foundItem.count += +req.body.count;
      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        if (err) {
        } else {
          res.send(`${JSON.stringify(cart)}`);
        }
      });
    }
  });
});

router.delete("/", (req, res) => {
  fs.readFile(cartPath, "utf-8", (err, data) => {
    if (err) {
    } else {
      let cart = JSON.parse(data);
      cart.splice(
        cart.findIndex(item => req.body.product_id === item.product_id),
        1
      );
      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        if (err) {
        } else {
          res.send(`${JSON.stringify(cart)}`);
        }
      });
    }
  });
});

module.exports = router;