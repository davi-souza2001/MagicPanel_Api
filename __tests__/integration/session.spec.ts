import request from 'supertest'

import { app } from '../../src/app'


describe('basics tests', () => {
    it('Get all notes', async() => {
        const response = await request(app)
        .get('/notes/getAllNotes')

        console.log(response)

        expect(response.status).toBe(200)
    });

});