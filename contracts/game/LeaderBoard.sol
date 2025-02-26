// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Leaderboard {
    mapping (address => uint256) public scores;
    mapping (uint256 => address[]) public ranks;
    event ScoreUpdated(address indexed user, uint256 newScore);
    address[] private userAddresses;

    function updateScore(uint256 _newScore) public {
        require(_newScore >= 0, "Score cannot be negative");
        if (scores[msg.sender] == 0) {
            userAddresses.push(msg.sender);
        }
        scores[msg.sender] = _newScore;
        emit ScoreUpdated(msg.sender, _newScore);
        updateRanks();
    }

    function updateRanks() internal {
        address[] memory users = new address[](userAddresses.length);
        uint256[] memory userScores = new uint256[](userAddresses.length);
        for (uint256 k = 0; k < userAddresses.length; k++) {
            users[k] = userAddresses[k];
            userScores[k] = scores[userAddresses[k]];
        }

        for (uint256 k = 1; k < users.length; k++) {
            for (uint256 j = 0; j < users.length - k; j++) {
                if (userScores[j] < userScores[j + 1]) {
                    (userScores[j], userScores[j + 1]) = (userScores[j + 1], userScores[j]);
                    (users[j], users[j + 1]) = (users[j + 1], users[j]);
                }
            }
        }

        uint256 currentRank = 1;
        uint256 currentIndex = 0;
        while (currentIndex < users.length) {
            uint256 currentScore = userScores[currentIndex];
            address[] memory tiedUsers;
            while (currentIndex < users.length && userScores[currentIndex] == currentScore) {
                tiedUsers = appendToArray(tiedUsers, users[currentIndex]);
                currentIndex++;
            }
            ranks[currentRank] = tiedUsers;
            currentRank += tiedUsers.length;
        }
    }

    function appendToArray(address[] memory array, address newElement) private pure returns (address[] memory) {
        address[] memory newArray = new address[](array.length + 1);
        for (uint256 i = 0; i < array.length; i++) {
            newArray[i] = array[i];
        }
        newArray[array.length] = newElement;
        return newArray;
    }

    function getUserRankAndScore() public view returns (uint256 rank, uint256 score) {
        score = scores[msg.sender];
        for (uint256 i = 1; i <= userAddresses.length; i++) {
            for (uint256 j = 0; j < ranks[i].length; j++) {
                if (ranks[i][j] == msg.sender) {
                    rank = i;
                    break;
                }
            }
            if (rank > 0) break;
        }
        return (rank, score);
    }
}
