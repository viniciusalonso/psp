class DebiteCardRules {

    constructor(transaction) {
        this.transaction =  transaction;
    }

    discountFee() {
        const percentage = 3;

        return this.transaction.amount - ((this.transaction.amount * percentage) / 100);
    }

    getPaymentDate() {
        return this.transaction.createdAt;
    }

    getStatus() {
        return  'paid';
    }

}

export default DebiteCardRules;
