import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddresses } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const { chainId } = await provider.getNetwork();
  const contractAddress = contractAddresses[chainId];
  if (!contractAddress) {
    throw new Error(`Contract not deployed on chain ${chainId}`);
  }
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [currentChain, setCurrentChain] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const switchNetwork = async (chainId) => {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      setCurrentChain(chainId);
      window.location.reload();
    } catch (error) {
      console.error("Error switching network:", error);
    }
  };

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / (10 ** 18),
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask!");
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      console.log("Connected accounts:", accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Wallet is connected:", accounts[0]);
        getAllTransactions();
        //get all transactions
      } else {
        console.log("No accounts found. Please connect your wallet.");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
      throw new Error("No Ethereum object.");
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask!");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw new Error("No Ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = await createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword,
          { value: parsedAmount }
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount =
          await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const batchTransfer = async (receivers, amounts, message, keyword) => {
    try {
      if (ethereum) {
        const transactionsContract = await createEthereumContract();
        const totalAmount = amounts.reduce((sum, amt) => sum.add(ethers.utils.parseEther(amt)), ethers.BigNumber.from(0));

        const transactionHash = await transactionsContract.batchTransfer(
          receivers,
          amounts.map(amt => ethers.utils.parseEther(amt)),
          message,
          keyword,
          { value: totalAmount }
        );

        console.log(`Batch transfer successful: ${transactionHash.hash}`);
        setIsLoading(false);
        setTransactionCount(transactionCount + receivers.length);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Batch transfer failed");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        transactions,
        connectWallet,
        currentAccount,
        formData,
        isLoading,
        handleChange,
        sendTransaction,
        batchTransfer,
        switchNetwork,
        currentChain,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
