
function formatTransaction(sender, recepient, amount, output) {
    return {
        sender,
        recepient,
        amount,
        output,
        fee: this.amount - this.output,
        time: new Date().toLocaleString(),
    };
}

module.exports = formatTransaction;