!function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=2)}([function(e,t){e.exports=require("express")},function(e,t){e.exports=require("fs")},function(e,t,r){const s=r(0),n=r(1),i=r(3),o=r(4),u=s();u.use(s.json()),u.use("/",s.static("./dist/public")),u.use("/api/cart",i),u.use("/api/products",o),u.use((function(e,t,r,s){r.status(500).send(JSON.stringify({error:e.message}))})),u.get("/api/cart",(e,t)=>{n.readFile("./dist/server/data/cart.json",(e,r)=>{e?t.status(500).send(JSON.stringify({error:e.message})):t.send(r)})}),u.get("/api/product",(e,t)=>{n.readFile("./dist/server/data/products.json","utf-8",(r,s)=>{if(r)t.status(500).send(JSON.stringify({error:r.message}));else{let r=JSON.parse(s);foundItem=r.find(t=>e.query.id==t.product_id),t.send(JSON.stringify(foundItem))}})});const a=process.env.PORT||3e3;u.listen(a,()=>{console.log(`Listening ${a} port`)})},function(e,t,r){const s=r(0),n=r(1),i=s.Router(),o="./dist/server/data/cart.json";i.post("/",(e,t)=>{n.readFile(o,"utf-8",(r,s)=>{if(r)t.status(500).send(JSON.stringify({error:r.message}));else{let r=JSON.parse(s);r.push(e.body),n.writeFile(o,JSON.stringify(r),e=>{e?t.status(500).send(JSON.stringify({error:e.message})):t.send(`${JSON.stringify(r)}`)})}})}),i.put("/",(e,t)=>{n.readFile(o,"utf-8",(r,s)=>{if(r)t.status(500).send(JSON.stringify({error:r.message}));else{let r=JSON.parse(s);foundItem=r.find(t=>e.body.product_id===t.product_id);let i=foundItem.count+=e.body.count;Object.assign(foundItem,e.body),foundItem.count=i,n.writeFile(o,JSON.stringify(r),e=>{e?t.status(500).send(JSON.stringify({error:e.message})):t.send(`${JSON.stringify(r)}`)})}})}),i.delete("/",(e,t)=>{n.readFile(o,"utf-8",(r,s)=>{if(r)t.status(500).send(JSON.stringify({error:r.message}));else{let r=JSON.parse(s);r.splice(r.findIndex(t=>e.body.product_id===t.product_id),1),n.writeFile(o,JSON.stringify(r),e=>{e?t.status(500).send(JSON.stringify({error:e.message})):t.send(`${JSON.stringify(r)}`)})}})}),i.delete("/clearCart",(e,t)=>{n.readFile(o,"utf-8",(e,r)=>{if(e)t.status(500).send(JSON.stringify({error:e.message}));else{let e=JSON.parse(r);e=[],n.writeFile(o,JSON.stringify(e),r=>{r?t.status(500).send(JSON.stringify({error:r.message})):t.send(`${JSON.stringify(e)}`)})}})}),e.exports=i},function(e,t,r){const s=r(0),n=r(1),i=s.Router();function o(e,t){if(t.sortType&&"default"!=t.sortType)switch(t.sortType){case"name":e.sort((function(e,t){return e.name>t.name?1:e.name<t.name?-1:0}));break;case"price":e.sort((function(e,t){return e.price>t.price?1:e.price<t.price?-1:0}))}return e.slice(t.limitIndex,t.visibleCount)}i.get("/:sortType/:limitIndex/:visibleCount",(e,t)=>{n.readFile("./dist/server/data/products.json",(r,s)=>{r?t.status(500).send(JSON.stringify({error:r.message})):t.send(JSON.stringify(o(JSON.parse(s),e.params)))})}),i.get("/:sortType/:limitIndex/:visibleCount/:searchQuery",(e,t)=>{n.readFile("./dist/server/data/products.json",(r,s)=>{r?t.status(500).send(JSON.stringify({error:r.message})):t.send(JSON.stringify(o(function(e,t){if(!t.searchQuery)return e;const r=new RegExp(t.searchQuery,"i");return e.filter(e=>r.test(e.name))}(JSON.parse(s),e.params),e.params)))})}),e.exports=i}]);