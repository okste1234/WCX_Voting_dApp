// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import './Wcxtokens.sol';


contract WcxElections is WCXNFT{

    mapping (address => bool) registerd;
    mapping (address => bool) hasVoted;
    address[] public registeredVoters;

    uint public candidate1;
    uint public candidate2;
    uint public candidate3;
     

    modifier verifiedVoter(){
        require(!hasVoted[msg.sender], "You have voted");
        require(registerd[msg.sender] = true, 'Not a registered Voter');
        _;
    }

    function register(address _voter) public {
        require(!registerd[_voter] , 'You have registered');
        require(balances[_voter] == 1, 'Not eligible to vote');
        balances[_voter] -= 1;
        registerd[_voter] = true;
        registeredVoters.push(_voter);
    }


     function Candidate1Increase() private {
         hasVoted[msg.sender] = true;
         candidate1 += 1;
    }
    
    function Candidate1() public verifiedVoter{
       
        Candidate1Increase();
    }

    function Candidate2Increase() private {
         hasVoted[msg.sender] = true;
         candidate2 += 1;
    }
    
    function Candidate2() public verifiedVoter {
        Candidate1Increase();
    }

        function Candidate3Increase() private {
         hasVoted[msg.sender] = true;
         candidate1 += 1;
    }
    
    function Candidate3() public  verifiedVoter{
        Candidate1Increase();
    }   

     function getWinner() public view returns (uint256) {
        if (candidate1 >= candidate2 && candidate1 >= candidate3) {
            return candidate1;
        } else if (candidate2 >= candidate1 && candidate2 >= candidate3) {
            return candidate2;
        } else {
            return candidate3;
        }
    }

    
    
}