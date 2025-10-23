import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TransactionsModule = buildModule("TransactionsModule", (m) => {
  const transactions = m.contract("Transactions");

  return { transactions };
});

export default TransactionsModule;