const express = require("express");
const fs = require("fs");
const router = express.Router();
const productsFile = "./dist/server/data/products.json";

function filterList(obj, params) {
  if (!params.searchQuery) {
    return obj;
  }
  const regExp = new RegExp(params.searchQuery, "i");
  let res = obj.filter(item => regExp.test(item.name));

  return res;
}

function getList(dataObj, params) {
  if (params.sortType && params.sortType != "default") {
    switch (params.sortType) {
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

  return dataObj.slice(params.limitIndex, params.visibleCount);
}

router.get("/:sortType/:limitIndex/:visibleCount", (req, res) => {
  fs.readFile(productsFile, (err, data) => {
    if (err) {
        res.status(500).send(JSON.stringify({ error: err.message }));
    } else {
      res.send(JSON.stringify(getList(JSON.parse(data), req.params)));
    }
  });
});

router.get("/:sortType/:limitIndex/:visibleCount/:searchQuery", (req, res) => {
  fs.readFile(productsFile, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify({ error: err.message }));
    } else {
      res.send(
        JSON.stringify(
          getList(filterList(JSON.parse(data), req.params), req.params)
        )
      );
    }
  });
});

module.exports = router;
