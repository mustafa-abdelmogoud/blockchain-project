const contract = require("truffle-contract");
const Web3 = require("web3");

const { getAccount } = require("./utils");
const medica_artifact = require("../build/contracts/Medica.json");
var Medica = contract(medica_artifact);

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

module.exports = {
  addPatient: function(id, name) {
    Medica.setProvider(web3.currentProvider);

    var medicaInstance;
    return Medica.deployed()
      .then(async function(instance) {
        medicaInstance = instance;
        const account = await getAccount();
        return medicaInstance.addPatient(id, name, { from: account });
      })
      .catch(function(e) {
        console.log("ERROR", e);
        return "Error 404";
      });
  },
  getPatient: function(id) {
    Medica.setProvider(web3.currentProvider);

    var medicaInstance;
    return Medica.deployed()
      .then(function(instance) {
        medicaInstance = instance;
        return medicaInstance.getPatient(id);
      })
      .catch(function(e) {
        console.log(e);
        return "ERROR 404";
      });
  },
  addDescription: function(id, description) {
    Medica.setProvider(web3.currentProvider);

    var medicaInstance;
    return Medica.deployed()
      .then(async function(instance) {
        medicaInstance = instance;
        const account = await getAccount();
        return medicaInstance.addDescription(id, description, {
          from: account
        });
      })
      .catch(function(e) {
        console.log(e);
        return "ERROR 404";
      });
  }
};
