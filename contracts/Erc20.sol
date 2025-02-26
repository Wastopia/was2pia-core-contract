// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Waste2EarnToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Waste2Earn", "W2E") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function mintTokens(address destination, uint256 amount) public onlyOwner {
        _mint(destination, amount);
    }

    function burnTokens(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
}
