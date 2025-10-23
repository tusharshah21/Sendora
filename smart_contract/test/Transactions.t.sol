// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Test, console} from "lib/forge-std/src/Test.sol";
import {Transactions} from "../contracts/Transactions.sol";

contract TransactionsTest is Test {
    Transactions public transactions;

    address payable receiver1 = payable(address(0x123));
    address payable receiver2 = payable(address(0x456));
    address payable receiver3 = payable(address(0x789));

    function setUp() public {
        transactions = new Transactions();
    }

    // Unit tests
    function testAddToBlockchain() public {
        uint amount = 1 ether;
        string memory message = "Test message";
        string memory keyword = "test";

        vm.deal(address(this), amount);
        transactions.addToBlockchain{value: amount}(receiver1, amount, message, keyword);

        Transactions.TransferStruct[] memory txs = transactions.getAllTransactions();
        assertEq(txs.length, 1);
        assertEq(txs[0].sender, address(this));
        assertEq(txs[0].receiver, receiver1);
        assertEq(txs[0].amount, amount);
        assertEq(txs[0].message, message);
        assertEq(txs[0].keyword, keyword);
        assertEq(txs[0].chainId, block.chainid);
    }

    function testBatchTransfer() public {
        address[] memory receivers = new address[](2);
        receivers[0] = receiver1;
        receivers[1] = receiver2;
        uint[] memory amounts = new uint[](2);
        amounts[0] = 0.5 ether;
        amounts[1] = 0.3 ether;
        uint total = 0.8 ether;
        string memory message = "Batch test";
        string memory keyword = "batch";

        vm.deal(address(this), total);
        transactions.batchTransfer{value: total}(receivers, amounts, message, keyword);

        Transactions.TransferStruct[] memory txs = transactions.getAllTransactions();
        assertEq(txs.length, 2);
        assertEq(txs[0].receiver, receiver1);
        assertEq(txs[0].amount, 0.5 ether);
        assertEq(txs[1].receiver, receiver2);
        assertEq(txs[1].amount, 0.3 ether);
    }

    // Fuzz tests
    function testFuzzAddToBlockchain(uint256 amount) public {
        vm.assume(amount > 0 && amount < 100 ether);
        vm.deal(address(this), amount);

        transactions.addToBlockchain{value: amount}(receiver1, amount, "fuzz", "fuzz");

        Transactions.TransferStruct[] memory txs = transactions.getAllTransactions();
        assertEq(txs[txs.length - 1].amount, amount);
    }

    function testFuzzBatchTransfer(uint256 amt1, uint256 amt2) public {
        vm.assume(amt1 > 0 && amt1 < 10 ether);
        vm.assume(amt2 > 0 && amt2 < 10 ether);
        uint total = amt1 + amt2;
        vm.deal(address(this), total);

        address[] memory receivers = new address[](2);
        receivers[0] = receiver1;
        receivers[1] = receiver2;
        uint[] memory amounts = new uint[](2);
        amounts[0] = amt1;
        amounts[1] = amt2;

        transactions.batchTransfer{value: total}(receivers, amounts, "fuzz batch", "fuzz");

        Transactions.TransferStruct[] memory txs = transactions.getAllTransactions();
        assertEq(txs[txs.length - 2].amount, amt1);
        assertEq(txs[txs.length - 1].amount, amt2);
    }

    // Invariant tests
    function invariantTransactionCountMatchesLength() public view {
        assertEq(transactions.getTransactionCount(), transactions.getAllTransactions().length);
    }

    function invariantNoZeroAmountTransactions() public view {
        Transactions.TransferStruct[] memory txs = transactions.getAllTransactions();
        for (uint i = 0; i < txs.length; i++) {
            assertGt(txs[i].amount, 0);
        }
    }
}