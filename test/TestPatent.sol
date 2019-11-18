pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Patent.sol";

contract TestPatent{
  Patent content = Patent(DeployedAddresses.Patent());

  // Testing the adopt() function
  function testUserCanSubmitContent() public {
    bytes32 var1="4657677";
    uint result = content.submitPatent("saa","addrv", "descriptionv","Durationsv","limitationv","Hashv","ok",var1,"pdate" );

    uint expected = 1;

    Assert.equal(result, expected, "Failed to submit content");
  }
  /*
  // Testing the adopt() function
  function testUserCanAdoptPet() public {
    uint returnedId = adoption.adopt(8);

    uint expected = 8;

    Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
  }
  // Testing retrieval of a single pet's owner
  function testGetAdopterAddressByPetId() public {
    // Expected owner is this contract
    address expected = this;

    address adopter = adoption.adopters(8);

console.log("Searching for transactions");
    Assert.equal(adopter, expected, "Owner of pet ID 8 should be recorded.");
  }
  // Testing retrieval of all pet owners
  function testGetAdopterAddressByPetIdInArray() public {
    // Expected owner is this contract
    address expected = this;

    // Store adopters in memory rather than contract's storage
    address[16] memory adopters = adoption.getAdopters();

    Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be recorded.");
  }
*/

}
