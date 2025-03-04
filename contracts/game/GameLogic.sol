// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameLogic {
    uint256 public energy;
    uint256 public lastCollectionTime;
    uint256 public constant MAX_ENERGY = 20;
    uint256 public constant PLASTIC_ENERGY_COST = 2;
    uint256 public constant METAL_ENERGY_COST = 4;
    uint256 public constant PAPER_ENERGY_COST = 3;
    uint256 public constant ENERGY_REGENERATION_RATE = 4;
    uint256 public constant ENERGY_REGENERATION_TIME = 5 hours;

    constructor() {
        energy = MAX_ENERGY;
        lastCollectionTime = block.timestamp;
    }

    modifier hasEnergy(uint256 cost) {
        require(energy >= cost, "Not enough energy to collect resources.");
        _;
    }

    modifier updateEnergy() {
        uint256 timeElapsed = block.timestamp - lastCollectionTime;
        if (timeElapsed >= ENERGY_REGENERATION_TIME) {
            uint256 regeneratedEnergy = (timeElapsed / ENERGY_REGENERATION_TIME) * ENERGY_REGENERATION_RATE;
            energy = (energy + regeneratedEnergy >= MAX_ENERGY) ? MAX_ENERGY : energy + regeneratedEnergy;
            lastCollectionTime = block.timestamp;
        }
        _;
    }

    function collectPlastic() public hasEnergy(PLASTIC_ENERGY_COST) {
        energy -= PLASTIC_ENERGY_COST;
    }

    function collectMetal() public updateEnergy hasEnergy(METAL_ENERGY_COST) {
        energy -= METAL_ENERGY_COST;
    }

    function collectPaper() public updateEnergy hasEnergy(PAPER_ENERGY_COST) {
        energy -= PAPER_ENERGY_COST;
    }

    function getEnergy() public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - lastCollectionTime;
        uint256 regeneratedEnergy = (timeElapsed / ENERGY_REGENERATION_TIME) * ENERGY_REGENERATION_RATE;
        return (energy + regeneratedEnergy >= MAX_ENERGY) ? MAX_ENERGY : energy + regeneratedEnergy;
    }
}
