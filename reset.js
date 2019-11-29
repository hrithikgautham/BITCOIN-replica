const fs = require('fs');
// const dirent = new fs.Dirent();
const path = require('path');
const fsPromises = fs.promises;

async function reset() {
    const files = await fsPromises.readdir(path.join(__dirname, "blockchain", "transactionHistory"))
    files.forEach(async dir => {
        try {
            const dirFiles = await fsPromises.readdir(path.join(__dirname, "blockchain", "transactionHistory", dir))
            for(let i = 0 ; i < dirFiles.length ; i++) 
                await fsPromises.unlink(path.join(__dirname, "blockchain", "transactionHistory", dir, dirFiles[i]));
            await fsPromises.rmdir(path.join(__dirname, "blockchain", "transactionHistory", dir));
        }
        catch(err) {
            console.error(err);
        }
    })
}

reset();