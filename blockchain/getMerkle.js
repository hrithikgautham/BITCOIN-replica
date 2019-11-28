const transactions = require('../transactions');
const path = require('path');
const H256 = require('../utils/getHash');
const fs = require('fs');
const fsPromises = fs.promises;

// transactions.map(transaction => [transaction, H256(JSON.stringify(transaction))]);

// first create all the file pertaining to each transactions and sstore it in ./transactionHistory directory
function init(transactions) {
    transactions.forEach(async transaction => {
        try {
            const content = JSON.stringify(transaction);
            // const compressedContent
            const fileHash = await H256(JSON.stringify(transaction));
            // hashes.push(fileHash);
            const transactionHistoryDirectories = await fsPromises.readdir(path.join(__dirname, "transactionHistory"));
            const matches = transactionHistoryDirectories.filter(transactionHistoryDirectory => transactionHistoryDirectory.startsWith(fileHash.slice(0,2))).length >= 1;
            console.log("matches", matches);
            if(!matches) 
                await fsPromises.mkdir(path.join(__dirname, "transactionHistory", fileHash.slice(0,2)));
            await fsPromises.writeFile(path.join(__dirname, "transactionHistory", fileHash.slice(0,2), `${fileHash.slice(2, fileHash.length)}.json`), content);
        }
        catch(err) {
            console.error("Error: ", err);
        }
    });
}

function generateMerkkleRoot(transactions) {
    transactions
}

function getMerkleRoot() {
    init(transactions);
    // generate merklroot
    getMerkleRoot(transactions);

}

getMerkleRoot()