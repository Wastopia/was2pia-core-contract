import { expect } from "chai";
import { ethers } from "hardhat";

describe("LeaderBoard", function () {
  let leaderBoard: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const LeaderBoard = await ethers.getContractFactory("Leaderboard");
    leaderBoard = await LeaderBoard.deploy();
    await leaderBoard.waitForDeployment();
  });

  it("should update score and emit ScoreUpdated event", async function () {
    await expect(leaderBoard.connect(addr1).updateScore(100))
      .to.emit(leaderBoard, "ScoreUpdated")
      .withArgs(addr1.address, 100);
  });

    it("should allow score to decrease", async function () {
        await leaderBoard.connect(addr1).updateScore(100);
        await expect(leaderBoard.connect(addr1).updateScore(50))
          .to.emit(leaderBoard, "ScoreUpdated")
          .withArgs(addr1.address, 50);
    });


  it("should return correct rank and score", async function () {
    await leaderBoard.connect(addr1).updateScore(100);
    await leaderBoard.connect(addr2).updateScore(200);
    
    const [rank1, score1] = await leaderBoard.connect(addr1).getUserRankAndScore();
    const [rank2, score2] = await leaderBoard.connect(addr2).getUserRankAndScore();
    
    expect(score1).to.equal(100);
    expect(score2).to.equal(200);
    expect(rank1).to.equal(2);
    expect(rank2).to.equal(1);
  });

    it("should handle multiple users with same score", async function () {
        await leaderBoard.connect(addr1).updateScore(100);
        await leaderBoard.connect(addr2).updateScore(100);
        await leaderBoard.connect(addr1).updateScore(100); // Update to same score
        
        const [rank1] = await leaderBoard.connect(addr1).getUserRankAndScore();
        const [rank2] = await leaderBoard.connect(addr2).getUserRankAndScore();
        
        // Convert BigInt to Number for comparison
        expect(Number(rank1)).to.be.oneOf([1, 2]);
        expect(Number(rank2)).to.be.oneOf([1, 2]);
    });

});
