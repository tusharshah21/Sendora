import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url, chainId }) => {
  const gifUrl = useFetch({ keyword });

  // Get currency symbol based on chainId
  const getCurrencySymbol = (chainId) => {
    switch (chainId) {
      case 296:
        return "HBAR"; // Hedera testnet
      case 11155111:
        return "ETH"; // Sepolia
      case 1:
        return "ETH"; // Ethereum mainnet
      case 11155420:
        return "ETH"; // Optimism Sepolia
      case 84532:
        return "ETH"; // Base Sepolia
      case 31337:
        return "ETH"; // Hardhat local
      default:
        return "ETH"; // Default fallback
    }
  };

  // Get block explorer URL based on chainId
  const getBlockExplorerUrl = (address, chainId) => {
    switch (chainId) {
      case 296:
        return `https://hashscan.io/testnet/account/${address}`; // Hedera testnet
      case 11155111:
        return `https://sepolia.etherscan.io/address/${address}`; // Sepolia
      case 1:
        return `https://etherscan.io/address/${address}`; // Ethereum mainnet
      case 11155420:
        return `https://sepolia-optimism.etherscan.io/address/${address}`; // Optimism Sepolia
      case 84532:
        return `https://sepolia.basescan.org/address/${address}`; // Base Sepolia
      default:
        return `https://sepolia.etherscan.io/address/${address}`; // Default to Sepolia
    }
  };

  const currencySymbol = getCurrencySymbol(chainId);

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={getBlockExplorerUrl(addressFrom, chainId)} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={getBlockExplorerUrl(addressTo, chainId)} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} {currencySymbol}</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount, currentChain } = useContext(TransactionContext);

  // Filter transactions based on current chain
  const filteredTransactions = [...dummyData, ...(transactions || [])].filter(
    (transaction) => transaction.chainId === currentChain
  );

  // Get network name for display
  const getNetworkName = (chainId) => {
    switch (chainId) {
      case 296: return 'Hedera';
      case 11155111: return 'Sepolia';
      case 11155420: return 'Optimism Sepolia';
      case 84532: return 'Base Sepolia';
      case 31337: return 'Hardhat Local';
      case 1: return 'Ethereum';
      default: return 'Unknown Network';
    }
  };

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions {currentChain ? `(${getNetworkName(currentChain)})` : ''}
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.reverse().map((transaction, i) => (
              <TransactionsCard key={i} {...transaction} />
            ))
          ) : (
            currentAccount && currentChain && (
              <div className="text-white text-center">
                <p className="text-xl">No transactions found on {getNetworkName(currentChain)}</p>
                <p className="text-sm mt-2 opacity-70">Make your first transaction to see it here!</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;