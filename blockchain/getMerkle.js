const transactions = require('../transactions');
const path = require('path');
const H256 = require('../utils/getHash');
const fs = require('fs');
const fsPromises = fs.promises;

// transactions.map(transaction => [transaction, H256(JSON.stringify(transaction))]);
const noOfTransactions = transactions.length;
// first create all the file pertaining to each transactions and sstore it in ./transactionHistory directory
function init(transactions) {
    return new Promise((resolve, reject) => {
        const hashes = [];
        transactions.forEach(async transaction => {
        try {
            const content = JSON.stringify(transaction);
            // const compressedContent
            const fileHash = await H256(JSON.stringify(transaction));
            hashes.push(fileHash);
            const transactionHistoryDirectories = await fsPromises.readdir(path.join(__dirname, "transactionHistory"));
            const matches = transactionHistoryDirectories.filter(transactionHistoryDirectory => transactionHistoryDirectory.startsWith(fileHash.slice(0,2))).length >= 1;
            if(!matches)
                await fsPromises.mkdir(path.join(__dirname, "transactionHistory", fileHash.slice(0,2)));
            await fsPromises.writeFile(path.join(__dirname, "transactionHistory", fileHash.slice(0,2), `${fileHash.slice(2, fileHash.length)}`), content);
            resolve(hashes);
        }
        catch(err) {
            console.error("Error: ", err);
            reject();
        }
    })});
}

function generateMerkleRoot(hashes) {
    return new Promise(async (resolve, reject) => {
        while(hashes.length > 1){
            const appendedHashes = [`${hashes.shift()}.${hashes.shift()}`];
            const pushBackHash = await init(appendedHashes);
            hashes.push(pushBackHash[0]);
        }
        if(hashes.length == 1)
            resolve(hashes[0]);
        else
            reject();
    });    
}

async function getMerkleRoot() {
    const hashes = await init(transactions);
    const merkleRoot = await generateMerkleRoot(hashes);
    return merkleRoot;
}

module.exports = { getMerkleRoot, init, noOfTransactions };