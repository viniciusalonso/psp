const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
import models from '../models';
import Sequelize from 'sequelize';

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /transactions', () => {

    before((done) => {
        models.Transaction.create({
            "amount": 21.50,
            "description": "Meu produto",
            "paymentMethod": "credit_card",
            "cardNumber": "5555666677778884",
            "cardholderName": "Vinícius Alonso",
            "expirationDate": "1222",
            "cvv": "981"
        }).then(() => {
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
            .get('/api/v1/transactions')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should return a list of transactions as json', (done) => {
        chai.request(app)
            .get('/api/v1/transactions')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, res) => {
                let data = res.body.data;
                let index = data.length - 1;

                expect(data).to.be.an('array');
                expect(res).to.be.json;

                expect(data[index].amount).to.equal('21.50');
                expect(data[index].description).to.equal("Meu produto");
                expect(data[index].paymentMethod).to.equal("credit_card");
                expect(data[index].cardNumber).to.equal("8884");
                expect(data[index].cardholderName).to.equal("Vinícius Alonso");
                expect(data[index].description).to.equal("Meu produto");

                done();
            });
    });
});
