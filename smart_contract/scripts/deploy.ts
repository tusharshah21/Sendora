declare const hre: any;

async function main() {
  console.log("Deploying Transactions contract...");

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.waitForDeployment();
  const address = await transactions.getAddress();

  console.log("Transactions deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});