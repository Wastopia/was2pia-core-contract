import { expect } from "chai";
import { ethers } from "hardhat";

describe("Waste2EarnToken", function () {
  let contract: any;

  before(async function () {
    const ContractFactory = await ethers.getContractFactory("Waste2EarnToken");
    contract = await ContractFactory.deploy(1000000000000000000000n);
    console.log("Contract address:", contract.target);
    console.log("Deploy transaction hash:", contract.deploymentTransaction().hash);
    await contract.waitForDeployment();
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
