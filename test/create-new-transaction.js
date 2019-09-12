const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
import Sequelize from 'sequelize';
import models from '../models';

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /transactions', () => {
    describe('when data are valid', () => {
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



        const validData = {
            "amount": 21.00,
            "description": "Meu produto",
            "paymentMethod": "credit_card",
            "cardNumber": "5555666677778884",
            "cardholderName": "Vinícius Alonso",
            "expirationDate": "1222",
            "cvv": "981"
        };

        it('should return http status created', (done) => {
            chai.request(app)
                .post('/api/v1/transactions')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(validData).end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
                });
        });

        it('should create a new Transaction on database', (done) => {
            chai.request(app)
                .post('/api/v1/transactions')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(validData).end((err, res) => {
                    expect(res.body.data.id).to.not.be.null;
                    expect(res).to.be.json;
                    done();
                });
        });
    });

    describe('when data are invalid', () => {
        const invalidData = {
            "amount": null,
            "description": "",
            "paymentMethod": "invalid_option",
            "cardNumber": "acb",
            "cardholderName": "",
            "expirationDate": "",
            "cvv": ""
        };

        it('should return http status bad request', (done) => {
            chai.request(app)
                .post('/api/v1/transactions')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(invalidData).end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('should not create a new transaction on database', (done) => {
            chai.request(app)
                .post('/api/v1/transactions')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(invalidData).end((err, res) => {
                    expect(res.body.data).to.be.undefined;
                    done();
                });
        });


        it('should return an errors json', (done) => {
            chai.request(app)
                .post('/api/v1/transactions')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(invalidData).end((err, res) => {
                    expect(res.body.errors.amount).to.be.an('array');
                    expect(res.body.errors.description).to.be.an('array');
                    expect(res.body.errors.paymentMethod).to.be.an('array');
                    expect(res.body.errors.cardNumber).to.be.an('array');
                    expect(res.body.errors.cardholderName).to.be.an('array');
                    expect(res.body.errors.expirationDate).to.be.an('array');
                    expect(res.body.errors.cvv).to.be.an('array');
                    done();
                });
        });
    });
});
