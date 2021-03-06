"use strict";

const fs = require("fs");

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith("GET ")) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL  mapping: GET ${path}`);
    } else if (url.startsWith("POST ")) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith("PUT ")) {
      let path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL  mapping: PUT ${path}`);
    } else if (url.startsWith("DELETE ")) {
      let path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL  mapping: DETELE ${path}`);
    } else {
      console.log(`invalid URL :  ${url} ... `);
    }
  }
}

function addControlles(router, dir) {
  fs.readdirSync(__dirname + "/" + dir)
    .filter(f => {
      return f.endsWith(".js");
    })
    .forEach(f => {
      let mapping = require(__dirname + "/" + dir + "/" + f);
      addMapping(router, mapping);
    });
}

module.exports = function(dir) {
  let controllers_dir = dir || "controllers",
    router = require("koa-router")();
  addControlles(router, controllers_dir);
  return router.routes();
};
