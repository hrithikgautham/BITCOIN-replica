const fsPromises = require('fs').promises;
const path = require('path');

async function getAllTransactionsFromMerkleRoot(merkleRoot) {
    const queue = [merkleRoot];
    while(queue[0].length === 64) {
        const top = queue.shift();
        const dir = top.slice(0, 2);
        const files = await fsPromises.readdir(path.join(__dirname, "..", "blockchain", "transactionHistory", dir));
        const file = top.slice(2, top.length);
        for(let i = 0 ; i < files.length ; i++)
            if(file === files[i]) {
                // some problem here
                let result = await fsPromises.readFile(path.join(__dirname, "..", "blockchain", "transactionHistory", dir, file), "utf8");
                if(result.length === 131){
                    result = result.slice(1, result.length-1);
                    const [first, second] = result.split(".");
                    queue.push(first, second);
                }
                else
                    queue.push(result);
            }
    }
    return queue;
}

module.exports = { getAll: getAllTransactionsFromMerkleRoot };