import chai from 'chai';
import chaiHttp from 'chai-http';

import models from '../models';
import app from '../app';
import Sequelize from 'sequelize';
import PayableCreator from '../services/payable-creator.js';

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/v1/balance', () => {

    before((done) => {
        let payableCreator = new PayableCreator();

        models.Transaction.create({
            "amount": 100.00,
            "description": "Meu produto",
            "paymentMethod": "credit_card",
            "cardNumber": "5555666677778884",
            "cardholderName": "Vinícius Alonso",
            "expirationDate": "1222",
            "cvv": "981"
        }).then((transaction) => {
            payableCreator.create(transaction);
        });

        models.Transaction.create({
            "amount": 150.50,
            "description": "Meu produto",
            "paymentMethod": "debit_card",
            "cardNumber": "5555666677778884",
            "cardholderName": "Vinícius Alonso",
            "expirationDate": "1222",
            "cvv": "981"
        }).then((transaction) => {
            payableCreator.create(transaction);
        });

        models.Transaction.create({
            "amount": 10.50,
            "description": "Meu produto",
            "paymentMethod": "debit_card",
            "cardNumber": "5555666677778884",
            "cardholderName": "Vinícius Alonso",
            "expirationDate": "1222",
            "cvv": "981"
        }).then((transaction) => {
            payableCreator.create(transaction);
            done();
        });
    });

    after((done) => {
        models.Payable.destroy({
            where: {
                status: {
                    [Sequelize.Op.ne]: null
                }
            }
        }).then(() => {
            done();
        });
    });


    it('should return http status success', (done) => {
        chai.request(app)
            .get('/api/v1/balance')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should does available/waiting_funds balance to user', (done) => {
        chai.request(app)
            .get('/api/v1/balance')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.body.data.available).to.equals('156.18');
                expect(res.body.data.waiting_funds).to.equals('95.00');
                done();
            });
    });

});
