var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TLDR = artifacts.require("./TLDR.sol");

module.exports = async function(deployer) {
  const addresses = await web3.eth.getAccounts()
  deployer.deploy(SimpleStorage);
  deployer.deploy(TLDR, "This is a contract", 1, addresses[0], addresses[0]);
 };
