class CreditCardRules {

    constructor(transaction) {
        this.transaction =  transaction;
    }

    discountFee() {
        const percentage = 5;

        return this.transaction.amount - ((this.transaction.amount * percentage) / 100);
    }

    getPaymentDate() {

        let date = new Date(this.transaction.createdAt);
        return date.setDate(date.getDate() + 30);
    }

    getStatus() {
        return  'waiting_funds';
    }

}

export default CreditCardRules;
