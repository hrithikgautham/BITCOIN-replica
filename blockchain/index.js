const { getMerkleRoot, noOfTransactions } = require("./getMerkle");
const { getHash, getSha256 } = require('block-pow');
const fsPromises = require('fs').promises;
const path = require('path');
// create a block

let prevhash = "000cfe895467f1f8490b1c19392775da59dc260013442ca2b13b3711a9750430";

async function generateBlock(miner, difficulty) {
    try {
        const currentBlock = {
            timeStamp: new Date().toLocaleString(),
            miner,
            noOfTransactions,
            merkleRoot: await getMerkleRoot(),
            difficulty,
            prevhash
        };
        const {
            newString, 
            newHash,
            nonce
        } = getHash(getSha256(JSON.stringify(currentBlock), "", ""), currentBlock.difficulty, ".");
        prevhash = newHash;
        return { newString, hash: newHash, nonce, currentBlock };
    }
    catch(err) {
        console.error("Error in generateBlock(): ", err);
    }
}
// console.log("newhash: ", newHash, "nonce: ", nonce)


// need to create chain and find a way to remember previous block hash
async function addBlock(miner, difficulty) {
    try {
        const data = await generateBlock(miner, difficulty);
        console.log("Data: ", data);
        await fsPromises.writeFile(
            path.join(__dirname, "blocks", data.hash), 
            JSON.stringify({
                hash: data.hash,
                timeStamp: new Date().toLocaleString(),
                nonce: data.nonce,
                block: data.currentBlock
            })
        );
        return "block added! miner: "+ miner;
    }
    catch(err) {
        console.error("Error in addBlock(): ", err);
    }
}

module.exports = addBlock;
// need to add
// blockHash

