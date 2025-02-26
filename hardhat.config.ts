import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv"; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  sourcePaths: ["./contracts", "./game"],
  networks: {
    core_testnet: {
      url: process.env.API_URL || "http://localhost:8545", // Fallback to localhost if API_URL is not set
      accounts: [process.env.PRIVATE_KEY || "0x0"], // Fallback to a default account if PRIVATE_KEY is not set
      chainId: 1114 // Placeholder for chain ID
    }
  }
};

export default config;
