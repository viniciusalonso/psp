class DebitCardPayableCreator {

    discountFee(amount) {
        const percentage = 3;

        return amount - ((amount * percentage) / 100);
    }

    payableDataToCreate(transaction) {
        let payableData = {
            'status': 'paid',
            'paymentDate': transaction.createdAt,
            'transactionId': transaction.id,
            'amount': this.discountFee(transaction.amount)
        };

        return payableData;
    }
}

export default DebitCardPayableCreator;
