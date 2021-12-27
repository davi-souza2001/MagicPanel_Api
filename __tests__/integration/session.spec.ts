// import request from 'supertest'
// // const response = await request(app)
// // .get('/notes/getAllNotes')
const mongoose = require('mongoose')
const User = require('../../src/models/User')

describe('Tests all about user', () => {
    
    beforeAll(async () => {
        if (!process.env.MONGO_URL){
            throw new Error('MongoDB server not init !')
        }

        await mongoose.connect(process.env.MONGO_URL)
    })

    it('should be able to create new user', async() => {
        await User.create({ email: '123@gmail', name: 'Davi teste', password: '123'} );
        
        const list = await User.find({})

        expect(list).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    email: '123@gmail'
                })
            ])
        )
        
        console.log(list)
    });

    beforeEach(async () => {
        await User.deleteMany({})
    })

    afterAll(async () => {
        await mongoose.connection.close();
    });
});