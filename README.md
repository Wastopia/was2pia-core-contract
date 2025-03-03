# Waste-Core-Contract

## Project Overview
The Waste-Core-Contract is a smart contract project that focuses on the Leaderboard contract, which allows for the management and tracking of player scores and rankings on the Core blockchain. This project aims to provide a robust framework for developers to build decentralized applications (dApps) that utilize the Leaderboard contract.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Hurotamo/waste-core-contract.git
   cd waste-core-contract
   ```
2. Install dependencies using `pnpm`:
   ```bash
   pnpm install
   ```

## Usage Instructions
To interact with the smart contracts, you can use the Hardhat framework. Here are some examples of how to use the contracts:
- To deploy the contracts, run:
  ```bash
  npx hardhat run scripts/deploy.js --network core_testnet
  ```
- To test the contracts, run:
  ```bash
  npx hardhat test
  ```

## Deployment Instructions
To deploy to the `core_testnet` network, ensure that you have the necessary environment variables set up, then run:

```bash
npx hardhat compile
```

```bash
npx hardhat run scripts/deploy.js --network core_testnet
```

## Testing Instructions
To run the tests for the `waste2earn` contract, use:
```bash
npx hardhat test
```
The tests verify the initial supply and ensure that the deployer receives the correct balance. The tests include checks for token transfers and balance updates.

## Configuration
The project uses the following configuration:
- **Solidity Version**: 0.8.28
- **Network**: core_testnet
  - **API URL**: Loaded from the `API_URL` environment variable (default: `http://localhost:8545`)
  - **Private Key**: Loaded from the `PRIVATE_KEY` environment variable (default: `0x0`)
  - **Chain ID**: 1114

testnet leaderboard-address =