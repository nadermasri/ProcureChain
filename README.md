# Blockchain-Enabled Public Procurement Portal

## Introduction

The Blockchain-Enabled Public Procurement Portal leverages blockchain technology to increase transparency and accountability in public procurement processes, effectively combating corruption. This solution uses Ethereum blockchain to immutably record all procurement documents via IPFS, ensuring data integrity and security throughout the procurement lifecycle.

## Features

- **Decentralized Document Management**: Store procurement documents securely on IPFS, ensuring they are tamper-proof and accessible only by authorized personnel.
- **Transparent Access Control**: Manage document access through smart contracts, allowing for a transparent audit trail of who accessed what and when.
- **MetaMask Integration**: Use MetaMask for Ethereum blockchain interactions, providing a user-friendly and secure interface to manage transactions and identities.
- **Automated Contract Deployment**: Simplified setup with automated smart contract deployment scripts.

## Technology Stack

- **React.js**: Frontend library for building the user interface.
- **Ethers.js**: Ethereum blockchain interaction library used in the web application.
- **Truffle Suite**: A development environment, testing framework, and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).
- **IPFS**: InterPlanetary File System for decentralized storage.
- **Solidity**: Programming language for writing smart contracts on Ethereum.

## Prerequisites

- Node.js
- npm
- Truffle
- Ganache
- MetaMask

## Setup and Installation

1. **Install Dependencies**:
    ```bash
    npm install -g truffle
    ```

2. **Initialize and Configure Truffle**:
    ```bash
    truffle init
    ```

3. **Compile and Migrate Contracts**:
    ```bash
    truffle migrate --reset
    ```

4. **Deploy Smart Contracts**:
    Use the `deploy.js` script to deploy contracts.
    ```bash
    truffle exec scripts/deploy.js --network development
    ```

5. **Update Contract Address in App**:
    Take the deployed contract address output by the `deploy.js` script and update the relevant sections in the `app.js` of the client.

6. **Client Setup**:
    Navigate to the client directory and start the React application.
    ```bash
    cd client
    npm install
    npm run start
    ```

## Configuring MetaMask

- Connect MetaMask to the local Ganache network using HTTP://127.0.0.1:7545.
- Import accounts using private keys provided by Ganache to interact with the deployed contracts.

## Usage

Once the setup is complete and the application is running, you can:

- Upload procurement documents securely to IPFS.
- Record the IPFS hash of documents on the Ethereum blockchain.
- Grant and revoke access to documents through the blockchain.

## Contributions

Contributions are welcome. Please fork the repository, make changes, and submit a pull request for review.

## License

This project is licensed under the GPL-3.0 license.

