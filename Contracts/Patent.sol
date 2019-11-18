pragma solidity ^0.4.17;
//pragma experimental ABIEncoderV2;


contract Patent {

  uint SUCCESS = 0;
  uint FILE_HASH_EXIST = 2;
  uint FILE_HASH_NOT_FOUND=3;
  uint FILE_NOT_BELONGS_TO_USER =4;
  
  struct Customer {
  address owner;
 // string custname;
 // string addr;
  string title;
  string description;
  string scope; //Public or private
  string rights; //Selling, printing, editing
  string expiryDate;
  string contentHash;
  bytes32 patentId;
  string patentDate;
  string transferDate;
  uint   setFlag;
  uint   ownershipNumber;
  ///ownerList[] ownerlist;
  }

mapping(bytes32 => Customer)  custList;

  function  submitPatent(string _title,
      string _description,string _scope,string _rights,string _expiryDate,
      string _contentHash, string _patentDate,bytes32 _patentId)
  public returns (uint) {
    //Do not allow multiple ownership of same file
    if (custList[_patentId].setFlag == 1)
    {
      return FILE_HASH_EXIST;
    }
    //store content to map
        custList[_patentId].owner    = msg.sender;
       // custList[_contentHash].custname = _custname;
       // custList[_contentHash].addr     = _addr;
        custList[_patentId].title    = _title;
        custList[_patentId].description = _description;
        custList[_patentId].scope       = _scope;
        custList[_patentId].rights      = _rights;
        custList[_patentId].expiryDate  = _expiryDate;
        custList[_patentId].contentHash = _contentHash;
        custList[_patentId].patentDate  = _patentDate;
        custList[_patentId].transferDate  = _patentDate;
        custList[_patentId].setFlag     = 1;
        custList[_patentId].ownershipNumber  = 1;
        
    return SUCCESS;
  }
  /* Method to get Customer details belongs to input ffile Hash*/
  function getOwnerByFileHash (bytes32 _patentId)  public view returns (uint,string,address,string,string,string )
  {
    //Do not allow multiple ownership of same file
    if (custList[_patentId].setFlag == 0)
    {
      address va;
      return (FILE_HASH_NOT_FOUND,"fle not found",va,"","","");
    }
  //  return custList[_fileHash];
  return (SUCCESS,"file present",custList[_patentId].owner,
    custList[_patentId].patentDate,custList[_patentId].expiryDate,
    custList[_patentId].contentHash );
  }

//Method to transfer ownershsip
  function transferPatent (address _to,bytes32 _patentId,string _transfer_date)
    public returns (uint)
    {
      //Make sure file hash is already exist
      if (custList[_patentId].setFlag != 1)
      {
        return FILE_HASH_NOT_FOUND;
      }
      //make sure this request is from owner of this file
      if (custList[_patentId].owner != msg.sender)
      {
      return FILE_NOT_BELONGS_TO_USER;
      }

      //Change the ownershsip
      custList[_patentId].owner    = _to;
      custList[_patentId].description = custList[_patentId].description;
      custList[_patentId].scope       = custList[_patentId].scope;
      custList[_patentId].rights      = custList[_patentId].rights;
      custList[_patentId].expiryDate  = custList[_patentId].expiryDate;
      custList[_patentId].contentHash = custList[_patentId].contentHash;
      custList[_patentId].transferDate  = _transfer_date;
      custList[_patentId].patentDate  = custList[_patentId].patentDate;
      custList[_patentId].setFlag     = 1;
      custList[_patentId].ownershipNumber  = custList[_patentId].ownershipNumber + 1;

return SUCCESS;
    }
}