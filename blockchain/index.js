const { getMerkleRoot, init, noOfTransactions } = require("./getMerkle");
const { getHash, getSha256 } = require('block-pow');
// create a block

let prevhash = null;

async function generateBlock(miner) {
    const currentBlock = {
        timeStamp: new Date().toLocaleString(),
        miner,
        noOfTransactions,
        merkleRoot: await getMerkleRoot(),
        difficulty: 3,
        prevhash
    };
    const {
        newString, 
        newHash,
        nonce
    } = getHash(getSha256(JSON.stringify(currentBlock), "", ""), currentBlock.difficulty, ".");
    currentBlock.nonce = nonce;
    currentBlock.hash = newHash;
    prevhash = newHash;
    return { newString, hash: newHash, nonce, currentBlock }
}
// console.log("newhash: ", newHash, "nonce: ", nonce)


// need to create chain and find a way to remember previous block hash
function addBlock() {

}

module.exports = generateBlock;
// need to add
// blockHash

