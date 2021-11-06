const expect= require('chai').expect
const request= require('supertest')
const mongoose=require('mongoose')


const {connect,disconnect}  = require ('../../config/Database_config.js');


const app = require('../../app.js')

describe('POST/ sign_up', ()=>{

    before((done)=>{
        connect()
        .then((result)=>{
            done()
        })
        .catch((err)=>{
            done(err)
        })
    })

    after((done)=>{
        disconnect()
        .then((result)=>{
            done()
        })
        .catch((err)=>{
            done(err)
        })
    })


    it('OK, creating a new user', (done)=>{
        request(app).post('/api/user/sign_up')
            .send({username:'username test'})
            .then((res)=>{
                const body=res.body
                expect(body).to.contain.property('message')
                done()
            })
            .catch((err)=>{
                console.log("post error")
                done(err)
            })
    })
})