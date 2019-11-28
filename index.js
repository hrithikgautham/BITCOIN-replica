const generateBlock= require('./blockchain');

generateBlock("hrithik gautham tg")
    .then(data => console.log(data))
    .catch(err => console.error("Error: ", err));