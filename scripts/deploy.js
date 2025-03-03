const hre = require("hardhat");
async function deployLeaderBoard() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy LeaderBoard Contract
  const leaderBoard = await LeaderBoardContract.deploy();
  await leaderBoard.waitForDeployment();
  console.log("LeaderBoard Contract deployed to:", leaderBoard.target);
}

async function main() {
  try {
    await deployLeaderBoard();
  } catch (error) {
    console.error("Deployment failed:", error.message);
    console.log("Please verify the following:");
    console.log("- Contract constructor parameters");
    console.log("- Network configuration");
    console.log("- Environment variables");
    process.exitCode = 1;
  }
}

main();
