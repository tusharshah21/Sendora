// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

/**
 * @title Transactions
 * @dev Simple transaction recording contract for Hedera testnet
 * Optimized for Hedera's EVM compatibility
 */
contract Transactions {
    uint256 public transactionCount;

    event Transfer(
        address indexed from,
        address indexed receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword,
        uint256 chainId
    );

    event BatchTransfer(
        address indexed from,
        address[] receivers,
        uint256[] amounts,
        string message,
        uint256 timestamp,
        string keyword,
        uint256 chainId
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
        uint256 chainId;
    }

    TransferStruct[] public transactions;

    /**
     * @dev Record a transaction on the blockchain
     * @param receiver Address receiving the transaction
     * @param amount Amount being transferred (for record-keeping, not validation)
     * @param message Transaction message
     * @param keyword Transaction keyword
     */
    function addToBlockchain(
        address receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public payable returns (bool) {
        // Validate inputs
        require(receiver != address(0), "ERR_INVALID_RECEIVER");
        require(msg.sender != address(0), "ERR_INVALID_SENDER");
        require(msg.value > 0, "ERR_NO_VALUE_SENT");
        
        // On Hedera, we use msg.value directly
        // Gas fees are automatically deducted by Hedera before execution
        // So we just transfer whatever was actually sent (msg.value)
        uint256 transferAmount = msg.value;
        
        // Record transaction with intended amount
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword,
                block.chainid
            )
        );

        // Execute transfer with actual available amount (msg.value after fees)
        (bool success, ) = payable(receiver).call{value: transferAmount}("");
        require(success, "ERR_TRANSFER_FAILED");

        // Emit event
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword,
            block.chainid
        );

        return true;
    }

    /**
     * @dev Batch transfer to multiple addresses
     * @param receivers Array of receiver addresses
     * @param amounts Array of amounts (for record-keeping)
     * @param message Transaction message
     * @param keyword Transaction keyword
     */
    function batchTransfer(
        address[] memory receivers,
        uint256[] memory amounts,
        string memory message,
        string memory keyword
    ) public payable returns (bool) {
        require(receivers.length == amounts.length, "ERR_LENGTH_MISMATCH");
        require(receivers.length > 0, "ERR_EMPTY_ARRAY");
        require(msg.value > 0, "ERR_NO_VALUE_SENT");

        // Validate all receivers
        for (uint i = 0; i < receivers.length; i++) {
            require(receivers[i] != address(0), "ERR_INVALID_RECEIVER");
        }

        // On Hedera, distribute msg.value equally or as specified
        // Record all transactions and transfer what's available
        uint256 availablePerTransfer = msg.value / receivers.length;
        
        for (uint i = 0; i < receivers.length; i++) {
            transactionCount += 1;
            transactions.push(
                TransferStruct(
                    msg.sender,
                    receivers[i],
                    amounts[i],
                    message,
                    block.timestamp,
                    keyword,
                    block.chainid
                )
            );
            
            // Transfer equal share to each recipient
            if (availablePerTransfer > 0) {
                (bool success, ) = payable(receivers[i]).call{value: availablePerTransfer}("");
                require(success, "ERR_TRANSFER_FAILED");
            }
        }

        // Emit event
        emit BatchTransfer(
            msg.sender,
            receivers,
            amounts,
            message,
            block.timestamp,
            keyword,
            block.chainid
        );

        return true;
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
