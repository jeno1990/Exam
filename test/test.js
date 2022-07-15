const chai = require('chai')
const server = require('../app')
const chaihttp = require('chai-http')


const should = chai.should();
chai.use(chaihttp);


describe('product apis', ()=>{
    
    
    describe('get all products', ()=>{
        it('it should return max of 10 products'  ,(done)=>{
            chai.request(server)
                .get('/get_all_product_details')
                .end((err , response) =>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                })
        })
    })

    describe('date format test', ()=>{
        it('it should return invalid date format'  ,(done)=>{
            chai.request(server)
                .get('/get_all_product_details')
                .send(
                    {
                        date1: "20-07-15T08:27:09.175Z",
                        date2: "2022-07-16T09:12:37.835Z",          
                        startPostion:0,
                        maxResult:10
                    }
                )
                .end((err , response) =>{
                    response.should.have.status(400);
                    response.body.should.have.property('message').eql('invalid date format');
                done();
                })
        })
    })

    describe('add purchase with unknown product', ()=>{
        it('it should respond 404 with message body'  ,(done)=>{
            let user = {
                quantity: 12,
                pricePerPiece: 1
            }
            chai.request(server)
                .post('/create_purchases/999')
                .send(user)
                .end((err , response) =>{
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eql('the product does not exist in the database');
                    
                done();
                })
        })
    })

})
