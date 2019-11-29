
function formatTransaction(sender, recepient, amount, output) {
    return {
        version: "1.0.1",
        sender,
        recepient,
        amount,
        output,
        fee: this.amount - this.output,
        time: new Date().toLocaleString()
    };
}

module.exports = formatTransaction;