// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WCXNFT {
    string public name = 'WCXGeneralElections';
    string public symbol = 'WCX';
    uint8 public decimals = 10;
    

    uint256 private totalTokens = 50;
    mapping(address => uint256) internal balances;

    event Transfer(address indexed from, address indexed to);
    address owner = msg.sender;

modifier onlyOwner {
    require(owner == msg.sender, 'You are not authourized to perfor the transcation');
    _;}

constructor(){
    balances[owner] = totalTokens;
}

    function totalSupply() public view returns (uint256) {
        return totalTokens;
    }

    function balanceOf(address _owner) public view returns (uint256) {

        return balances[_owner];
    }


    function transferFrom( address to) onlyOwner public {       
        balances[owner] -= 1;
        balances[to] += 1;

        emit Transfer(msg.sender, to);
    }


   
}