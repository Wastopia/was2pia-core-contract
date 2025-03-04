// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameLogic {
    uint256 public energy;
    uint256 public lastCollectionTime;
    uint256 public constant MAX_ENERGY = 20;
    uint256 public constant PLASTIC_ENERGY_COST = 2;
    uint256 public constant METAL_ENERGY_COST = 4;
    uint256 public constant PAPER_ENERGY_COST = 3;
    uint256 public constant ENERGY_REGENERATION_TIME = 5 hours;

    constructor() {
        energy = MAX_ENERGY;
        lastCollectionTime = block.timestamp;
    }

    modifier hasEnergy(uint256 cost) {
        require(energy >= cost, "Not enough energy to collect resources.");
        _;
    }

    function collectPlastic() public hasEnergy(PLASTIC_ENERGY_COST) {
        energy -= PLASTIC_ENERGY_COST;
        lastCollectionTime = block.timestamp;
    }

    function collectMetal() public hasEnergy(METAL_ENERGY_COST) {
        energy -= METAL_ENERGY_COST;
        lastCollectionTime = block.timestamp;
    }

    function collectPaper() public hasEnergy(PAPER_ENERGY_COST) {
        energy -= PAPER_ENERGY_COST;
        lastCollectionTime = block.timestamp;
    }

    function regenerateEnergy() public {
        if (block.timestamp >= lastCollectionTime + ENERGY_REGENERATION_TIME) {
            energy = MAX_ENERGY;
            lastCollectionTime = block.timestamp;
        }
    }
}
