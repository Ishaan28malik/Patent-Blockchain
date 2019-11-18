App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Patent.json", function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var Patentchain = data;
      App.contracts.Patent = TruffleContract(Patentchain);

      // Set the provider for our contract
      App.contracts.Patent.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on("submit", "#submitform", App.handleAdopt);
    $(document).on("click", "#getvalues", App.getvalues);
    $(document).on("submit", "#transfer", App.transfer);
  },

  handleAdopt: function(event) {
    event.preventDefault();
    // var custname = document.getElementById("custname").value;
    // var addr = document.getElementById("addr").value;
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var scope = document.getElementById("scope").value;
    var rights = document.getElementById("rights").value;
    //var expiryDate = document.getElementById("expiryDate").value;
    var contentHash = document.getElementById("contentHash").value;
    window.patentid = contentHash.substr(0, 20);
    var patentDate = new Date().toDateString();

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var expiryDate = new Date(year + 1, month, day).toDateString();
    var adoptionInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Patent.deployed()
        .then(function(instance) {
          adoptionInstance = instance;

          // Execute adopt as a transaction by sending account
          return adoptionInstance.submitPatent(
            title,
            description,
            scope,
            rights,
            expiryDate,
            contentHash,
            patentDate,
            patentid,
            { from: account }
          );
        })
        .then(function(result) {
          document.getElementById("Result").innerHTML =
            "Successfully Submitted";
          window.location = "hash.html?Hashaddress=" + contentHash;
        })
        .catch(function(err) {
          document.getElementById("Result").innerHTML = err.message;
          console.log(err.message);
        });
    });
  },

  // Get Values Of Patent

  getvalues: function(event) {
    event.preventDefault();
    var contentHash = document.getElementById("hashaddress").innerHTML;
    window.patentid = contentHash.substr(0, 20);
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.Patent.deployed()
        .then(function(instance) {
          adoptionInstance = instance;
          // Execute adopt as a transaction by sending account
          return adoptionInstance.getOwnerByFileHash.call(patentid);
        })
        .then(function(result) {
          window.location = "profile.html?Result=" + result;
          console.log(result);
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  },

  // Transfer patent

  transfer: function(event) {
    event.preventDefault();
    var contentHash = document.getElementById("hashaddress").value;
    window.patentid = contentHash.substr(0, 20);
    var toaddress = document.getElementById("toaddress").value;
    var transferdate = new Date().toDateString();
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      App.contracts.Patent.deployed()
        .then(function(instance) {
          adoptionInstance = instance;
          // Execute adopt as a transaction by sending account
          return adoptionInstance.transferPatent(
            toaddress,
            patentid,
            transferdate
          );
        })
        .then(function(result) {
          window.location = "transfer-final.html?patenthash=" + contentHash;
          console.log(result);
        })
        .catch(function(err) {
          console.log(err.message);
        });
    });
  }
};

$(function() {
  $("#submitform").submit(function() {
    App.init();
  });
});

$(function() {
  $("#getvalues").click(function() {
    App.init();
  });
});

$(function() {
  $("#transfer").submit(function() {
    App.init();
  });
});
