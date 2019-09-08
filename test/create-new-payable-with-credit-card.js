const chai = require('chai');
const chaiHttp = require('chai-http');

import models, { sequelize  } from '../models';
const app = require('../app');

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /transactions', () => {
    describe('when create a new payable', () => {
        describe('using a credit card', () => {
            let payable = null;
            let rawTransaction = null;

            before((done) => {
                chai.request(app)
                    .post('/api/v1/transactions')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .send(transactionViaCreditCard)
                    .end( async (err, res) => {
                        rawTransaction = res.body.data;
                        payable = await models.Payable.findOne({ where: { 'transactionId': rawTransaction.id } });
                        done();
                    });

            });

            const transactionViaCreditCard = {
                "amount": 100.00,
                "description": "Meu produto",
                "paymentMethod": "credit_card",
                "cardNumber": "5555666677778884",
                "cardholderName": "Vinícius Alonso",
                "expirationDate": "1222",
                "cvv": "981"
            };

            it('should create payable with status waiting_funds', (done) => {
                expect(payable.status).to.equal('waiting_funds');
                done();
            });

            it('paymentDate should be transaction createdAt after 30 days', (done) => {
                let expectedDate = new Date(rawTransaction.createdAt);
                expectedDate.setDate( expectedDate.getDate() + 30 );

                expect(new Date(payable.paymentDate).toString())
                    .to
                    .equal(expectedDate.toString());

                done();

            });

            it('should discount 5% of fee', (done) => {
                expect(payable.amount).to.equal(95);
                done();
            });


        });
    });

});
