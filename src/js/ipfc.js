var fs = require("fs");
var express = require("express");
var ipfsAPI = require("ipfs-api");
var ipfs = ipfsAPI("/ip4/127.0.0.1/tcp/5001");
var path = require("path");

console.log("Started");

function upload() {
  var user = "Patent-Files";
  var userDirectory = "/" + user;
  var sourceFile = "/Users/mukeshbhardwaj/Downloads/PatentCode/src/js/ipfc.js";
  var targetFile = userDirectory + "/" + path.basename(sourceFile);

  ipfs.files.mkdir(userDirectory, err => {
    if (err) {
      console.error(err);
    }
  });

  fs.readFile(sourceFile, (err, data) => {
    if (err) throw err;

    const options = {
      create: true
    };

    ipfs.files.write(targetFile, data, options, err => {
      console.log(err);
    });
    window.location = "portal.html";
  });
}
