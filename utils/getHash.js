const crypto = require('crypto');

const H256 = inputString => new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256').update(inputString).digest('hex');
    resolve(hash);
});

//crypto.createHash('sha256').update(inputString).digest('hex')

module.exports = H256;