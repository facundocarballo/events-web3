// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Counter {
    uint256 public value;
    uint256 public MAX_VALUE = 115792089237316195423570985008687907853269984665640564039457584007913129639935;


    constructor() {}

    event IncrementValue(
        uint256 indexed date,
        uint256 indexed amount,
        uint256 previous_amount,
        address indexed wallet
    );
    event DecrementValue(
        uint256 indexed date,
        uint256 indexed amount,
        uint256 previous_amount,
        address indexed wallet
    );

    function increment() public {
        require(value < MAX_VALUE, "The value will exceeds the max value for a uint256.");
        value++;
        emit IncrementValue(block.timestamp, value, value - 1, msg.sender);
    }

    function decrement() public {
        require(value > 0, "Solidity doesn't allow negative numbers.");
        value--;
        emit DecrementValue(block.timestamp, value, value + 1, msg.sender);
    }
}
