const Medica = artifacts.require("Medica");

module.exports = function(deployer) {
  deployer.deploy(Medica);
};
