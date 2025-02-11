# Waste-Core-Contract

## Project Overview
The Waste-Core-Contract is a smart contract project that implements the ERC20 token standard. It allows for the creation and management of a fungible token on the Ethereum blockchain.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Hurotamo/waste-core-contract.git
   cd waste-core-contract
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage Instructions
To interact with the smart contracts, you can use the Hardhat framework.

## Deployment Instructions
To deploy to the `core_testnet` network, run:

```bash
npx hardhat compile
```

```bash
npx hardhat run scripts/deploy.js --network core_testnet
```
This will deploy the `waste2earn` contract with an initial supply of `1234000000000000000000000000`.

## Testing Instructions
To run the tests for the `waste2earn` contract, use:
```bash
npx hardhat test
```
The tests verify the initial supply and ensure that the deployer receives the correct balance.

## Configuration
The project uses the following configuration:
- **Solidity Version**: 0.8.28
- **Network**: core_testnet
  - **API URL**: Loaded from the `API_URL` environment variable (default: `http://localhost:8545`)
  - **Private Key**: Loaded from the `PRIVATE_KEY` environment variable (default: `0x0`)
  - **Chain ID**: 1114

testnet token-address = 0x1349953C01aa62fF97E8C01FAAAc139F42F085cA


## ERC20 Contract Overview
The `Erc20.sol` contract implements the ERC20 token standard, allowing for the creation and management of fungible tokens.
