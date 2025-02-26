const hre = require("hardhat");

async function main() {
  try {
    const [deployer] = await hre.ethers.getSigners();
    // Deploy ERC20 Token
    const ERC20Contract = await hre.ethers.getContractFactory("Waste2EarnToken");
    const erc20 = await ERC20Contract.deploy(123400000000000);
    await erc20.waitForDeployment();
    console.log("ERC20 Contract deployed to:", erc20.target);

    // Deploy ERC721 NFT
    const ERC721Contract = await hre.ethers.getContractFactory("Waste2EarnNFT");
    const erc721 = await ERC721Contract.deploy(deployer.address);
    await erc721.waitForDeployment();
    console.log("ERC721 Contract deployed to:", erc721.target);

    // Deploy Gold Contract
    const GoldContract = await hre.ethers.getContractFactory("Gold");
    const gold = await GoldContract.deploy();
    await gold.waitForDeployment();
    console.log("Gold Contract deployed to:", gold.target);

    // Deploy LeaderBoard Contract
    const LeaderBoardContract = await hre.ethers.getContractFactory("LeaderBoard");
    const leaderBoard = await LeaderBoardContract.deploy();
    await leaderBoard.waitForDeployment();
    console.log("LeaderBoard Contract deployed to:", leaderBoard.target);
  } catch (error) {
    console.error("Deployment failed:", error);
    console.log("Please verify:");
    console.log("- Contract constructor parameters");
    console.log("- Network configuration");
    console.log("- Environment variables");
    process.exitCode = 1;
  }
}

main();
