// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Waste2EarnNFT is ERC721, Ownable {
    uint256 private _nextTokenId;
    mapping(address => bool) private _whitelist;

    event WhitelistAdded(address indexed account);
    event WhitelistRemoved(address indexed account);

    constructor(address initialOwner) ERC721("Waste2EarnNFT", "W2ENFT") Ownable(initialOwner) {}

    function addToWhitelist(address account) public onlyOwner {
        if (!_whitelist[account]) {
            _whitelist[account] = true;
            emit WhitelistAdded(account);
        }
    }

    function removeFromWhitelist(address account) public onlyOwner {
        require(_whitelist[account], "Address not whitelisted");
        _whitelist[account] = false;
        emit WhitelistRemoved(account);
    }

    function isWhitelisted(address account) public view returns (bool) {
        return _whitelist[account];
    }

    function safeMint(address to) public {
        require(_whitelist[msg.sender] || msg.sender == owner(), "Caller is not whitelisted or owner");
        require(msg.sender == to || msg.sender == owner(), "Caller can only mint to themselves or owner can mint to others");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
