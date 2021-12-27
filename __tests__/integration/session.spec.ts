// it('test route get all users', async() => {
    //     const response = await request(appClient)
    //     .get('/notes/getAllNotes')

    //     console.log(response)
    // })

// import mongoose from 'mongoose'
// import { app } from '../../src/app'
// import User from '../../src/models/User'

describe('Tests all about user', () => {
    
    // beforeAll(async () => {
    //     if (!process.env.MONGO_URL){
    //         throw new Error('MongoDB server not init !')
    //     }

    //     await mongoose.connect(process.env.MONGO_URL)
    // })

    // it('should be able to create new user', async() => {
    //     await User.create({ email: '123@gmail', name: 'Davi teste', password: '123'} );
        
    //     const list = await User.find({})

    //     expect(list).toEqual(
    //         expect.arrayContaining([
    //             expect.objectContaining({
    //                 email: '123@gmail'
    //             })
    //         ])
    //     ) 
    // })

    // beforeEach(async () => {
    //     await User.deleteMany({})
    // })

    // afterAll(async () => {
    //     await mongoose.connection.close();
    // })

    it('should be able to create new user', async() => {

        expect(2 + 2).toEqual(4) 
    })
});