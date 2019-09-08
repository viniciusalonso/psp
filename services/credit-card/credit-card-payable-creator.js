class CreditCardPayableCreator {

    payableDataToCreate(transaction) {
        let date = new Date(transaction.createdAt);
        date.setDate(date.getDate() + 30);

        let payableData = {
            'status': 'waiting_funds',
            'paymentDate': date,
            'transactionId': transaction.id,
            'amount': transaction.amount,
        };

        return payableData;
    }
}

export default CreditCardPayableCreator;
