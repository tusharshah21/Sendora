import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddresses } from "../utils/constants";
import { TransferAgent } from "../utils/hederaAgent";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const { chainId } = await provider.getNetwork();

  const contractAddress = contractAddresses[chainId];

  if (!contractAddress || contractAddress === "0x...") {
    throw new Error(`Contract not deployed on chain ${chainId}. Available chains: ${Object.keys(contractAddresses).join(', ')}`);
  }

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return { contract: transactionContract, signer };
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
  const [a2aMessages, setA2aMessages] = useState([]);

  // Create Hedera agent with message callback
  const [transferAgent] = useState(() => new TransferAgent((message) => {
    setA2aMessages(prev => [...prev.slice(-9), message]); // Keep last 10 messages
  }));

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
        const { contract: transactionsContract } = await createEthereumContract();
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
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // Get current network and set it
        const provider = new ethers.providers.Web3Provider(ethereum);
        const { chainId } = await provider.getNetwork();
        setCurrentChain(chainId);

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
        const { contract: transactionsContract } = await createEthereumContract();
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
        const { contract: transactionsContract, signer } = await createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        console.log("🔄 Starting transfer with agent negotiation...");
        console.log("📋 Transfer details:", { addressTo, amount, keyword, message });

        // Validate inputs
        if (!ethers.utils.isAddress(addressTo)) {
          throw new Error(`Invalid recipient address: ${addressTo}`);
        }

        const amountFloat = parseFloat(amount);
        if (isNaN(amountFloat) || amountFloat <= 0) {
          throw new Error(`Invalid amount: ${amount}`);
        }

        console.log("✅ Input validation passed");

        // Add Hedera agent negotiation
        const negotiation = await transferAgent.negotiateTransfer(addressTo, amount, message);

        // Check if negotiation was successful
        if (!negotiation || negotiation.status !== 'negotiated') {
          console.error("❌ Agent negotiation failed:", negotiation);
          alert("Agent negotiation failed. Please try again.");
          return;
        }

        // Check balance before sending transaction
        const balance = await signer.getBalance();
        const balanceInEther = ethers.utils.formatEther(balance);

        // Hedera requires some HBAR for gas fees
        const minBalance = ethers.utils.parseEther("0.01"); // 0.01 HBAR minimum for fees
        const totalRequired = parsedAmount.add(minBalance);

        if (balance.lt(totalRequired)) {
          throw new Error(`Insufficient balance. Have: ${balanceInEther} HBAR, Need: ${ethers.utils.formatEther(totalRequired)} HBAR (including gas fees)`);
        }

        // Estimate gas to check if transaction would succeed
        try {
          await transactionsContract.estimateGas.addToBlockchain(
            addressTo,
            parsedAmount,
            message,
            keyword,
            { value: parsedAmount }
          );
        } catch (estimateError) {
          console.warn("⚠️ Gas estimation failed (OK for Hedera):", estimateError.message);
        }

        // Call the contract function with proper error handling
        let transactionHash;
        try {
          // Method 1: Standard ethers.js approach
          transactionHash = await transactionsContract.addToBlockchain(
            addressTo,
            parsedAmount,
            message,
            keyword,
            { value: parsedAmount }
          );
        } catch (method1Error) {
          console.warn("⚠️ Method 1 failed:", method1Error.message);
          console.error("Full error:", method1Error);
          
          // Try to decode the revert reason
          try {
            if (method1Error.data) {
              console.error("Error data:", method1Error.data);
              // Try to decode as revert string
              const iface = new ethers.utils.Interface(["function Error(string)"]);
              const decoded = iface.parseError(method1Error.data);
              console.error("Decoded error:", decoded);
            }
          } catch (decodeError) {
            console.warn("Could not decode error:", decodeError.message);
          }
          
          // Method 2: Try with explicit gas limits
          try {
            console.log("🔄 Method 2: Trying with explicit gas settings...");
            transactionHash = await transactionsContract.addToBlockchain(
              addressTo,
              parsedAmount,
              message,
              keyword,
              {
                value: parsedAmount,
                gasLimit: ethers.utils.hexlify(500000)  // Hedera standard limit
              }
            );
          } catch (method2Error) {
            console.error("❌ Both methods failed");
            console.error("Method 1 error:", method1Error.message);
            console.error("Method 2 error:", method2Error.message);
            throw method1Error;  // Throw the original error
          }
        }

        setIsLoading(true);

        // Use a timeout wrapper for Hedera compatibility
        let receipt;
        try {
          const confirmationPromise = transactionHash.wait();
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Confirmation timeout")), 60000)
          );
          
          receipt = await Promise.race([confirmationPromise, timeoutPromise]);

          if (receipt && receipt.status === 1) {
            console.log("✅ Transaction SUCCESS - Block:", receipt.blockNumber);
          } else if (receipt && receipt.status === 0) {
            console.error("❌ Transaction FAILED - reverted on chain");
            throw new Error("Transaction reverted on chain (status: 0)");
          }
        } catch (waitError) {
          console.warn("⚠️ Confirmation error:", waitError.message);
          console.log("🔗 Hedera HashScan: https://hashscan.io/testnet/transaction/" + transactionHash.hash);
        }

        setIsLoading(false);

        // Try to get transaction count with error handling
        try {
          const transactionsCount = await transactionsContract.getTransactionCount();
          setTransactionCount(transactionsCount.toNumber());
        } catch (countError) {
          console.warn("⚠️ Could not get transaction count:", countError.message);
        }

        // Show success toast and wait before reload
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.log("❌ No ethereum object");
      }
    } catch (error) {
      console.error("❌ Transaction failed:", error);
      console.error("❌ Full error object:", error);
      
      // Detailed error analysis
      let errorMessage = error.message || 'Unknown error';
      let errorDetails = {
        message: error.message,
        code: error.code,
        data: error.data,
        reason: error.reason,
      };

      // Try to decode the error
      if (error.data) {
        errorDetails.decodedData = error.data;
        console.error("Raw error data:", error.data);
      }

      console.error("Error analysis:", errorDetails);
      setIsLoading(false);

      // Provide user-friendly error message
      if (error.code === 'INSUFFICIENT_FUNDS') {
        errorMessage = 'Insufficient balance for transaction + gas fees';
      } else if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
        errorMessage = 'Transaction would fail - check contract logic';
      } else if (error.code === 'INVALID_ARGUMENT') {
        errorMessage = 'Invalid transaction parameters - check inputs';
      } else if (error.message && error.message.includes('ERR_')) {
        errorMessage = `Contract error: ${error.message}`;
      }

      alert(`Transaction failed: ${errorMessage}\n\nError Code: ${error.code || 'Unknown'}\n\nCheck console for full details.`);
    }
  };

  const batchTransfer = async (receivers, amounts, message, keyword) => {
    try {
      if (ethereum) {
        const { contract: transactionsContract } = await createEthereumContract();
        const totalAmount = amounts.reduce((sum, amt) => sum.add(ethers.utils.parseEther(amt)), ethers.BigNumber.from(0));

        const transactionHash = await transactionsContract.batchTransfer(
          receivers,
          amounts.map(amt => ethers.utils.parseEther(amt)),
          message,
          keyword,
          { value: totalAmount }
        );

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

    // Initialize Hedera A2A messaging
    const initHederaAgent = async () => {
      try {
        await transferAgent.initializeA2A();
      } catch (error) {
        console.error("Failed to initialize Hedera A2A:", error);
      }
    };
    initHederaAgent();

    // Listen for network changes
    if (ethereum) {
      ethereum.on('chainChanged', (chainId) => {
        console.log("Network changed to:", parseInt(chainId, 16));
        setCurrentChain(parseInt(chainId, 16));
        window.location.reload(); // Reload to update contract instance
      });
    }

    // Cleanup listener on unmount
    return () => {
      if (ethereum) {
        ethereum.removeListener('chainChanged', () => {});
      }
    };
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
        a2aMessages,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
