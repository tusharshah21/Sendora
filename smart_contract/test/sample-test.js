const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transactions", function () {
  it("Should deploy and allow a transfer", async function () {
    const [owner, receiver] = await ethers.getSigners();
    const Transactions = await ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();
    await transactions.deployed();

    // Send 1 ETH from owner to receiver via the contract
    const amount = ethers.utils.parseEther("1.0");
    await expect(() =>
      transactions.connect(owner).transfer(
        receiver.address,
        amount,
        "Test message",
        "Test account",
        "Test keyword",
        { value: amount }
      )
    ).to.changeEtherBalance(receiver, amount);

    // Check transaction count
    expect(await transactions.getTransactionCount()).to.equal(1);

    // Check stored transaction
    const allTx = await transactions.getAllTransactions();
    expect(allTx.length).to.equal(1);
    expect(allTx[0].receiver).to.equal(receiver.address);
    expect(allTx[0].amount).to.equal(amount);
  });
});