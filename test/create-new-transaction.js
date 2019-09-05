const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /transactions', () => {
    describe('when data are valid', () => {

        const data = {
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
                .send(data).end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
                });
        });

        it('should create a new Transaction on database', (done) => {
            chai.request(app)
                .post('/api/v1/transactions')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(data).end((err, res) => {
                    expect(res.body.data.id).to.not.be.null;
                    expect(res).to.be.json;
                    done();
                });
        });
    });
});
