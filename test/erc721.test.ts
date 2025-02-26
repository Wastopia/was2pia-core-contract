import { expect } from "chai";
import { ethers } from "hardhat";

describe("Waste2EarnNFT", function () {
  let contract: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    console.log("Test owner address:", owner.address);
    console.log("First signer address:", (await ethers.provider.getSigner(0)).address);
    
    const ContractFactory = await ethers.getContractFactory("Waste2EarnNFT");
    // Use the first signer explicitly as the owner
    const defaultOwner = await ethers.provider.getSigner(0);
    contract = await ContractFactory.deploy(defaultOwner.address);
    console.log("Contract owner address:", await contract.owner());
  });


  it("Should allow owner to add to whitelist", async function () {
    await contract.connect(owner).addToWhitelist(addr1.address);
    expect(await contract.isWhitelisted(addr1.address)).to.be.true;
  });

  it("Should allow owner to remove from whitelist", async function () {
    await contract.connect(owner).addToWhitelist(addr1.address);
    await contract.connect(owner).removeFromWhitelist(addr1.address);
    expect(await contract.isWhitelisted(addr1.address)).to.be.false;
  });

  it("Should allow whitelisted address to mint", async function () {
    await contract.connect(owner).addToWhitelist(addr1.address);
    await contract.connect(addr1).safeMint(addr1.address);
    expect(await contract.ownerOf(0)).to.equal(addr1.address);
  });

  it("Should prevent non-whitelisted address from minting", async function () {
    await expect(contract.connect(addr2).safeMint(addr2.address))
      .to.be.revertedWith("Caller is not whitelisted or owner");
  });

    it("Should allow owner to mint", async function () {
      const defaultOwner = await ethers.provider.getSigner(0);
      const recipient = await ethers.provider.getSigner(1);
      console.log("Minting with address:", defaultOwner.address);
      console.log("Recipient address:", recipient.address);
      
      // Owner mints to recipient
      await contract.connect(defaultOwner).safeMint(recipient.address);
      
      const tokenOwner = await contract.ownerOf(0);
      console.log("Token owner address:", tokenOwner);
      expect(tokenOwner).to.equal(recipient.address);
    });

});
