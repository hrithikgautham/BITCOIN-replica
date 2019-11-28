const fs = require('fs');
// const dirent = new fs.Dirent();
const path = require('path');
const fsPromises = fs.promises;

fsPromises.readdir(path.join(__dirname, "blockchain", "transactionHistory"))
    .then(files => {
        files.forEach(async dir => {
            try {
                const dirFiles = await fsPromises.readdir(path.join(__dirname, "blockchain", "transactionHistory", dir))
                dirFiles.forEach(async dirFile => {
                    await fsPromises.unlink(path.join(__dirname, "blockchain", "transactionHistory", dir, dirFile));
                });
                await fsPromises.rmdir(path.join(__dirname, "blockchain", "transactionHistory", dir));
            }
            catch(err) {
                console.error(err);
            }
        })
    })
    .catch(err => console.error("Error: ", err));