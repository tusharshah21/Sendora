import hre from "hardhat";

async function main() {
  console.log("Deploying Transactions contract to local Hardhat network...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("\n✅ Transactions contract deployed to:", transactions.address);
  console.log("\nUpdate this address in client/src/utils/constants.js for chainId 31337");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
