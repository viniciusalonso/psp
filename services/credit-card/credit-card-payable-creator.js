class CreditCardPayableCreator {

    discountFee(amount) {
        const percentage = 5;

        return amount - ((amount * percentage) / 100);
    }

    payableDataToCreate(transaction) {
        let date = new Date(transaction.createdAt);
        date.setDate(date.getDate() + 30);

        let payableData = {
            'status': 'waiting_funds',
            'paymentDate': date,
            'transactionId': transaction.id,
            'amount': this.discountFee(transaction.amount)
        };

        return payableData;
    }
}

export default CreditCardPayableCreator;
