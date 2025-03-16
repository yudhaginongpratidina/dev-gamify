import request from "supertest";
import 'dotenv/config';

const api = process.env.EXPRESS_PROTOCOL + "://" + process.env.EXPRESS_HOSTNAME + ":" + process.env.EXPRESS_PORT + "/api";

describe("WellcomeController", () => {
    it("should return a 200 status code", async () => {
        const response = await request(api).get('/');
        expect(response.status).toBe(200);
    });
});