// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
  
  struct Access {
     address user; 
     bool access;
  }
  
  // Mapping from user address to list of IPFS hashes
  mapping(address => string[]) public userFiles;
  
  // Access control mappings
  mapping(address => mapping(address => bool)) public ownership;
  mapping(address => Access[]) public accessList;
  mapping(address => mapping(address => bool)) public previousData;

  // Function to add a new IPFS hash to the user's list of files
  function addFile(string memory ipfsHash) public {
      userFiles[msg.sender].push(ipfsHash);
  }

  // Functions for access control
  function allow(address user) public {
      ownership[msg.sender][user] = true; 
      if(previousData[msg.sender][user]){
         for(uint i = 0; i < accessList[msg.sender].length; i++){
             if(accessList[msg.sender][i].user == user){
                 accessList[msg.sender][i].access = true; 
             }
         }
      } else {
          accessList[msg.sender].push(Access(user, true));  
          previousData[msg.sender][user] = true;  
      }
  }

  function disallow(address user) public {
      ownership[msg.sender][user] = false;
      for(uint i = 0; i < accessList[msg.sender].length; i++){
          if(accessList[msg.sender][i].user == user){ 
              accessList[msg.sender][i].access = false;  
          }
      }
  }

  // Function to display a user's files, accessible only to authorized users
  function getFiles(address _user) public view returns(string[] memory) {
      require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
      return userFiles[_user];
  }
}
