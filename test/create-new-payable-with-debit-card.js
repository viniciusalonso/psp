const chai = require('chai');
const chaiHttp = require('chai-http');

import models, { sequelize  } from '../models';
const app = require('../app');

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /transactions', () => {
    describe('when create a new payable', () => {
        describe('using a debit card', () => {
            let payable = null;
            let rawTransaction = null;

            before((done) => {
                chai.request(app)
                    .post('/api/v1/transactions')
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .send(transactionViaDebitCard)
                    .end( async (err, res) => {
                        rawTransaction = res.body.data;
                        payable = await models.Payable.findOne({ where: { 'transactionId': rawTransaction.id } });
                        done();
                    });

            });

            const transactionViaDebitCard = {
                "amount": 100.00,
                "description": "Meu produto",
                "paymentMethod": "debit_card",
                "cardNumber": "5555666677778884",
                "cardholderName": "Vinícius Alonso",
                "expirationDate": "1222",
                "cvv": "981"
            };

            it('should create payable with status paid', (done) => {
                expect(payable.status).to.equal('paid');
                done();
            });

            it('paymentDate should be equals to transaction createdAt', (done) => {
                expect(new Date(payable.paymentDate).toString())
                    .to
                    .equal(new Date(rawTransaction.createdAt).toString());

                done();
            });

            it('should discount 3% of fee', (done) => {
                expect(payable.amount).to.equal(97);
                done();
            });


        });

    });

});
