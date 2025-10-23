// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Transactions {
    uint256 transactionCount;

    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword,
        uint256 chainId
    );

    event BatchTransfer(
        address from,
        address[] receivers,
        uint[] amounts,
        string message,
        uint256 timestamp,
        string keyword,
        uint256 chainId
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
        uint256 chainId;
    }

    TransferStruct[] transactions;

    function addToBlockchain(
        address payable receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public payable {
        require(msg.value == amount, "Incorrect amount sent");
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

        // Transfer ETH
        receiver.transfer(amount);

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword,
            block.chainid
        );
    }

    function batchTransfer(
        address[] memory receivers,
        uint[] memory amounts,
        string memory message,
        string memory keyword
    ) public payable {
        require(receivers.length == amounts.length, "Receivers and amounts length mismatch");
        uint totalAmount = 0;
        for (uint i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        require(msg.value == totalAmount, "Incorrect total amount sent");

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
            payable(receivers[i]).transfer(amounts[i]);
        }

        emit BatchTransfer(
            msg.sender,
            receivers,
            amounts,
            message,
            block.timestamp,
            keyword,
            block.chainid
        );
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
