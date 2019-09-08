class DebitCardPayableCreator {

    payableDataToCreate(transaction) {
        let payableData = {
            'status': 'paid',
            'paymentDate': transaction.createdAt,
            'transactionId': transaction.id,
            'amount': transaction.amount,
        };

        return payableData;
    }
}

export default DebitCardPayableCreator;
