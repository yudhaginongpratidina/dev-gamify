import request from "supertest";
import prisma from "../../utils/prisma.js";
import 'dotenv/config';

// Define the API endpoint using environment variables
const api = process.env.EXPRESS_PROTOCOL + "://" + process.env.EXPRESS_HOSTNAME + ":" + process.env.EXPRESS_PORT + "/api";

// Utility class for authentication tests
class AuthTest {
    // Delete all users from the database
    static async delete() {
        await prisma.user.deleteMany();
    }
}

// Clean up the database before and after all tests
beforeAll(async () => { await AuthTest.delete(); });
afterAll(async () => { await AuthTest.delete(); });

// Test suite for user registration
describe("Register", () => {
    // Test case for empty fields
    it("should error if all fields are empty", async () => {
        const response = await request(api).post('/auth/register').send({ fullname: "", email: "", password: "", confirmPassword: "" });
        expect(response.status).toBe(500);
    });

    // Test case for password mismatch
    it("should error if password and confirm password do not match", async () => {
        const response = await request(api).post('/auth/register').send({ fullname: "user", email: "user@test.com", password: "user@test.com", confirmPassword: "user@test.com1" });
        expect(response.status).toBe(500);
        expect(response.body[0].message).toBe("Passwords do not match");
    });

    // Test case for email already exists
    it("should error if email already exists", async () => {
        await request(api).post('/auth/register').send({ fullname: "user", email: "user@test.com", password: "user@test.com", confirmPassword: "user@test.com" });
        const response = await request(api).post('/auth/register').send({ fullname: "user", email: "user@test.com", password: "user@test.com", confirmPassword: "user@test.com" });
        expect(response.status).toBe(409);
    });

    // Test case for successful registration
    it("should return a 201 status code", async () => {
        const response = await request(api).post('/auth/register').send({ fullname: "admin", email: "admin@test.com", password: "admin@test.com", confirmPassword: "admin@test.com" });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Register success");
        expect(response.body.data.fullname).toBe("admin");
        expect(response.body.data.email).toBe("admin@test.com");
        expect(response.body.data.role).toBe("user");
        expect(response.body.data.point).toBe(50);
    });
});

// Test suite for user login
describe("login", () => {
    // Test case for empty fields
    it("should error if all fields are empty", async () => {
        const response = await request(api).post('/auth/login').send({ email: "", password: "" });
        expect(response.status).toBe(500);
    });

    // Test case for incorrect email or password
    it("should error if email or password is incorrect", async () => {
        const response = await request(api).post('/auth/login').send({ email: "user@test.com", password: "user@test.com1" });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid email or password");
    });

    // Test case for successful login
    it("should return a 200 status code", async () => {
        const response = await request(api).post('/auth/login').send({ email: "user@test.com", password: "user@test.com" });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login success");
        expect(response.body.token).toBeDefined();
    });
});

// Test suite for refreshing token
describe("refresh token", () => {
    // Test case for successful token refresh
    it("should return a 200 status code", async () => {
        // First, login to get the refresh token
        const loginResponse = await request(api).post('/auth/login').send({ email: "user@test.com", password: "user@test.com" });
        expect(loginResponse.status).toBe(200);
        const cookies = loginResponse.headers['set-cookie'];

        // Use the refresh token to get a new access token
        const response = await request(api).get('/auth/refresh-token').set('Cookie', cookies);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Token refreshed successfully");
        expect(response.body.token).toBeDefined();
    });
});

// Test suite for user logout
describe("logout", () => {
    // Test case for successful logout
    it("should return a 200 status code", async () => {
        // First, login to get the refresh token
        const loginResponse = await request(api).post('/auth/login').send({ email: "user@test.com", password: "user@test.com" });
        expect(loginResponse.status).toBe(200);
        const cookies = loginResponse.headers['set-cookie'];

        // Use the refresh token to logout
        const response = await request(api).get('/auth/logout').set('Cookie', cookies);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Logout success");
    });
});