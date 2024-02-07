// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Wcxtokens.sol";
contract WcxElections is WCXNFT{


    mapping (address => bool) registerd;
    mapping (address => bool) hasVoted;
    address[]  registeredVoters;
   
    uint  votingTimeLeft;
     
    mapping(string => uint) public voteCount;

    modifier verifiedVoter(){
        require(!hasVoted[msg.sender], "You have voted");
        require(registerd[msg.sender] == true, 'Not a registered Voter');
        require(votingTimeLeft > 0, 'voting time have elapsed');
        _;
    }


    function register() public {
      address _voter = msg.sender;
        require(!registerd[_voter] , 'You have registered');
        require(balances[_voter] == 1, 'Not eligible to vote');
        balances[_voter] -= 1;
        hasVoted[msg.sender] = false;
        registerd[_voter] = true;
        registeredVoters.push(_voter);
      
        votingTimeLeft =  block.timestamp + 600 ;
        
    }

    function vote(uint _candidate) public verifiedVoter returns(string memory _msg) {
        hasVoted[msg.sender] = true;
        if(_candidate == 1){
            voteCount["REP"] += 1;
            
        }
        else if(_candidate == 2){
         voteCount['HFP'] += 1; 
        }
        else if(_candidate == 3){
          voteCount['TFP'] += 1;
        }
        else{
            _msg = "Invalid Party";
            return _msg;
        }

    }
  

     function getWinner() public view returns (string memory) {
    if (voteCount['REP'] > voteCount['HFP'] && voteCount['REP'] > voteCount["TFP"]) {
        return "John Doe";
    } else if (voteCount['HFP'] > voteCount['REP'] && voteCount['HFP'] > voteCount["TFP"]) {
        return "Adekunle Tunde";
    } else if (voteCount["TFP"] > voteCount['REP'] && voteCount["TFP"] > voteCount['HFP']) {
        return "Zarah Aliyu";
    } else {
        return "Inconclusive"; 
    }
}


    function totalRegisteredVoters() public view returns (uint){
        return registeredVoters.length;
    }

    function totalVoters() public view returns (uint){
        uint total = (voteCount["TFP"] + voteCount["HFP"] + voteCount["REP"]);
        return total;
    }

    function votingTime() public view returns(uint){
      return votingTimeLeft - block.timestamp ;
    }
    
    
}

