/* eslint-disable indent */
import app from '../src/app.js';
import request from 'supertest';
import test from 'jest';

describe("GET /api/users", () => {
    test(' should return a list of users', async () => {
        const response = await request(app).get('/api/users').send();
        console.log(response);
    });
});
