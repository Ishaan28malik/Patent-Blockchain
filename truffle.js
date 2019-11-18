module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
// const express = require("express");
// const app = express();
// const fs = require("fs");
// var ipfsAPI = require("ipfs-api");
// var ipfs = ipfsAPI("/ip4/127.0.0.1/tcp/5001");
// var path = require("path");

// console.log("Started");

// function upload() {
//   var user = "Patent-Files";
//   var userDirectory = "/" + user;
//   var sourceFile = document.getElementById("file-upload").innerHTML;
//   var targetFile = userDirectory + "/" + path.basename(sourceFile);

//   ipfs.files.mkdir(userDirectory, err => {
//     if (err) {
//       console.error(err);
//     }
//   });

//   fs.readFile(sourceFile, (err, data) => {
//     if (err) throw err;

//     const options = {
//       create: true
//     };

//     ipfs.files.write(targetFile, data, options, err => {
//       console.log(err);
//     });
//     window.location = "portal.html";
//   });
// }
