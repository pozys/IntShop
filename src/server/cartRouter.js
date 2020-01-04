const express = require("express");
const fs = require("fs");
const router = express.Router();
const cartPath = "./dist/server/data/cart.json";

router.post("/", (req, res) => {
  fs.readFile(cartPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify({ error: err.message }));
    } else {
      let cart = JSON.parse(data);
      cart.push(req.body);
      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        if (err) {
          res.status(500).send(JSON.stringify({ error: err.message }));
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
      res.status(500).send(JSON.stringify({ error: err.message }));
    } else {
      let cart = JSON.parse(data);
      foundItem = cart.find(item => req.body.product_id === item.product_id);
      let finalCount = (foundItem.count += req.body.count);
      Object.assign(foundItem, req.body);
      foundItem.count = finalCount;
      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        if (err) {
          res.status(500).send(JSON.stringify({ error: err.message }));
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
      res.status(500).send(JSON.stringify({ error: err.message }));
    } else {
      let cart = JSON.parse(data);
      cart.splice(
        cart.findIndex(item => req.body.product_id === item.product_id),
        1
      );
      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        if (err) {
          res.status(500).send(JSON.stringify({ error: err.message }));
        } else {
          res.send(`${JSON.stringify(cart)}`);
        }
      });
    }
  });
});

router.delete("/clearCart", (req, res) => {
  fs.readFile(cartPath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify({ error: err.message }));
    } else {
      let cart = JSON.parse(data);
      cart = [];
      fs.writeFile(cartPath, JSON.stringify(cart), err => {
        if (err) {
          res.status(500).send(JSON.stringify({ error: err.message }));
        } else {
          res.send(`${JSON.stringify(cart)}`);
        }
      });
    }
  });
});

module.exports = router;
