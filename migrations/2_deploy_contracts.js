var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TLDR = artifacts.require("./TLDR.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TLDR, "this is a test template", 1, "0x3a107B0ca6D466e1668620bF71d84F8B5744BCB1", "0x3a107B0ca6D466e1668620bF71d84F8B5744BCB1")
};
