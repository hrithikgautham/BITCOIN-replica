// const addBlock = require('./blockchain');

// addBlock("dhanush ND", 5)
//     .then(data => console.log(data))
//     .catch(err => console.error("hahaha Error: ", err));

const { getAll } = require("./utils/help");

getAll("4c4a216b39618cefdd2b7bb2d87eb20e1d79b550c1c7e340444ccfe3a80a17a7")
    .then(data => console.log("data: ", data))
    .catch(err => console.error(err));