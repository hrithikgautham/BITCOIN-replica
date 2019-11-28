const { getSha256 } = require('block-pow');

const H256 = inputString => new Promise((resolve, reject) => {
    const hash = getSha256(inputString, "", "");
    resolve(hash);
});

//crypto.createHash('sha256').update(inputString).digest('hex')

module.exports = H256;