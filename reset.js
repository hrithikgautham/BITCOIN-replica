const fs = require('fs');
// const dirent = new fs.Dirent();
const path = require('path');
const fsPromises = fs.promises;

async function reset() {
    const files = await fsPromises.readdir(path.join(__dirname, "blockchain", "transactionHistory"))
    files.forEach(async dir => {
        try {
            const dirFiles = await fsPromises.readdir(path.join(__dirname, "blockchain", "transactionHistory", dir))
            dirFiles.forEach(dirFile => {
                fs.unlink(path.join(__dirname, "blockchain", "transactionHistory", dir, dirFile), function(err) {
                    if(err)
                        throw err;
                });
            });
            await fsPromises.rmdir(path.join(__dirname, "blockchain", "transactionHistory", dir));
        }
        catch(err) {
            console.error(err);
        }
    })
}

reset();