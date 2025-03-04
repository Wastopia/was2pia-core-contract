import { expect } from "chai";
import { ethers } from "hardhat";

describe("GameLogic", function () {
    let gameLogic: any;

    beforeEach(async function () {
        const GameLogic = await ethers.getContractFactory("GameLogic");
        gameLogic = await GameLogic.deploy(); // Deploy the contract once
    });

    it("should set initial energy to MAX_ENERGY", async function () {
        expect(await gameLogic.energy()).to.equal(await gameLogic.MAX_ENERGY());
    });

    it("should collect plastic and reduce energy", async function () {
        await gameLogic.collectPlastic();
        expect(await gameLogic.energy()).to.equal(await gameLogic.MAX_ENERGY() - await gameLogic.PLASTIC_ENERGY_COST());
    });

    it("should collect metal and reduce energy", async function () {
        await gameLogic.collectMetal();
        expect(await gameLogic.energy()).to.equal(await gameLogic.MAX_ENERGY() - await gameLogic.METAL_ENERGY_COST());
    });

    it("should collect paper and reduce energy", async function () {
        await gameLogic.collectPaper();
        expect(await gameLogic.energy()).to.equal(await gameLogic.MAX_ENERGY() - await gameLogic.PAPER_ENERGY_COST());
    });

    it("should regenerate energy after the specified time", async function () {
        await gameLogic.collectPlastic();
        await ethers.provider.send("evm_increaseTime", [18000]); // Increase time by 5 hours
        await gameLogic.regenerateEnergy();
        expect(await gameLogic.energy()).to.equal(await gameLogic.MAX_ENERGY());
    });

    it("should revert when trying to collect resources without enough energy", async function () {
        await gameLogic.collectPlastic(); // Collect plastic once
        await gameLogic.collectPlastic(); // Collect plastic again
        await gameLogic.collectPlastic(); // Collect plastic again to ensure energy is insufficient
        console.log("Current energy before attempting to collect:", (await gameLogic.energy()).toString());
        
        // Log the energy before the final collection attempt
        const currentEnergy = await gameLogic.energy();
        console.log("Energy before final collect attempt:", currentEnergy.toString());
        
        await expect(gameLogic.collectPlastic()).to.be.revertedWith("Not enough energy to collect resources.");
        console.log("Expected revert occurred due to insufficient energy.");
    });
});
