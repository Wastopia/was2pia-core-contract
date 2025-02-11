import { expect } from "chai";
import { ethers } from "hardhat";

describe("NameYourToken", function () {
  let contract: any;

  before(async function () {
    const ContractFactory = await ethers.getContractFactory("NameYourToken");
    contract = await ContractFactory.deploy(1000000000000000000000n);
    await contract.deployed();
  });

  it("should have the correct initial supply", async function () {
    const totalSupply = await contract.totalSupply();
    expect(totalSupply).to.equal(1000000000000000000000n);
  });

  it("should assign the initial supply to the deployer", async function () {
    const [deployer] = await ethers.getSigners();
    const deployerBalance = await contract.balanceOf(deployer.address);
    expect(deployerBalance).to.equal(1000000000000000000000n);
  });
});
