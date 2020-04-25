const contract = require("truffle-contract");
const Web3 = require("web3");

const medica_artifact = require("../build/contracts/Medica.json");
var Medica = contract(medica_artifact);

module.exports = {
  getAccount: async function() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:7545")
    );
    Medica.setProvider(web3.currentProvider);

    const accounts = await web3.eth.getAccounts();

    return accounts[0];
  }
};
