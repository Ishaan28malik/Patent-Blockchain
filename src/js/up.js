"use strict";

var IPFS = require("ipfs-api");

var ipfs = IPFS();

function store_file() {
  console.log("successfully");
  const file = event.target.files[0];
  let reader = new window.FileReader();
  reader.onloadend = () => saveToIpfs(reader);
  reader.readAsArrayBuffer(file);
}

function saveToIpfs(reader) {
  ipfs.add(Buffer.from(reader.result), function(err, res) {
    if (err || !res) {
      return console.error("ipfs add error", err, res);
    }

    res.forEach(function(file) {
      if (file && file.hash) {
        console.log("successfully stored", file.hash);
        display(file.hash);
      }
    });
  });
}

function store() {
  var toStore = document.getElementById("source").value;
  ipfs.add(Buffer.from(toStore), function(err, res) {
    if (err || !res) {
      return console.error("ipfs add error", err, res);
    }

    res.forEach(function(file) {
      if (file && file.hash) {
        console.log("successfully stored", file.hash);
        display(file.hash);
      }
    });
  });
}

function display(hash) {
  // buffer: true results in the returned result being a buffer rather than a stream
  ipfs.cat(hash, { buffer: true }, function(err, res) {
    if (err || !res) {
      return console.error("ipfs cat error", err, res);
    }

    document.getElementById("hash").innerText = hash;
    document.getElementById("content").innerText = res.toString();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("store").onclick = store;
  document.getElementById("files").addEventListener("change", function(event) {
    console.log("successfully");
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.onloadend = () => saveToIpfs(reader);
    reader.readAsArrayBuffer(file);
  });
});
