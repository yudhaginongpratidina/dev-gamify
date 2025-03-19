import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma.js";
import request from "supertest";
import 'dotenv/config';

// Define the API endpoint using environment variables
const api = process.env.EXPRESS_PROTOCOL + "://" + process.env.EXPRESS_HOSTNAME + ":" + process.env.EXPRESS_PORT + "/api";

// Utility class for account tests
class AccountTest {
    // Delete all users from the database
    static async delete() {
        await prisma.user.deleteMany();
    }
}

// Clean up the database before and after all tests
beforeAll(async () => { await AccountTest.delete(); });
afterAll(async () => { await AccountTest.delete(); });

// Test suite for creating an account
describe("create account", () => {

    // Test case for successful account creation
    it("create account success", async () => {
        const response = await request(api).post('/auth/register').send({
            fullname: "user",
            email: "user@test.com",
            password: "user@test.com",
            confirmPassword: "user@test.com"
        });

        // Validate the response
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Register success");
        expect(response.body.data.fullname).toBe("user");
        expect(response.body.data.email).toBe("user@test.com");
        expect(response.body.data.role).toBe("user");
        expect(response.body.data.point).toBe(50);
    });

});

// Test suite for getting an account by ID
describe("get account by id", () => {

    // Test case for user not found
    it("should return a 404 when user not found", async () => {
        const response = await request(api).get('/account/1');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Account not found");
    });

    // Test case for successfully getting an account by ID
    it("should return a 200 when success get account by id", async () => {
        const loginResponse = await request(api).post('/auth/login').send({ email: "user@test.com", password: "user@test.com" });
        expect(loginResponse.status).toBe(200);

        const refreshToken = loginResponse.headers['set-cookie']
            .find(cookie => cookie.startsWith('refresh_token'))
            .split(';')[0]
            .split('=')[1];

        expect(refreshToken).toBeDefined();

        const decodedToken = jwt.decode(refreshToken);

        expect(decodedToken).toBeDefined();
        expect(decodedToken.id).toBeDefined();
        expect(decodedToken.role).toBeDefined();
        expect(decodedToken.role).toBe('user');

        const response = await request(api).get(`/account/${decodedToken.id}`);
        expect(response.status).toBe(200);
    });
});

// Test suite for updating an account
describe("update account", () => {

    // Test case for successfully updating the account's fullname
    it("should return a 200 when success update account (fullname)", async () => {
        const login = await request(api).post('/auth/login').send({ email: "user@test.com", password: "user@test.com" });
        expect(login.status).toBe(200);
        expect(login.body.token).toBeDefined();

        const token = login.body.token;

        const refreshToken = login.headers['set-cookie'].find(cookie => cookie.startsWith('refresh_token')).split(';')[0].split('=')[1];
        expect(refreshToken).toBeDefined();

        const decodedToken = jwt.decode(refreshToken);
        const id = decodedToken.id;

        const response = await request(api)
            .patch(`/account/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ fullname: "user update" });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Account updated");
    });

    // Test case for successfully updating the account's password
    it("should return a 200 when success update account (password)", async () => {
        // Step 1: Login and get the tokens
        const login = await request(api).post('/auth/login').send({ email: "user@test.com", password: "user@test.com" });
        expect(login.status).toBe(200);
        expect(login.body.token).toBeDefined();

        const token = login.body.token; // Access token for Bearer header

        // Step 2: Extract the refresh token from the cookies
        const refreshToken = login.headers['set-cookie']
            .find(cookie => cookie.startsWith('refresh_token'))
            .split(';')[0]
            .split('=')[1];
        expect(refreshToken).toBeDefined();

        // Step 3: Decode the refresh token to get the user id
        const decodedToken = jwt.decode(refreshToken);
        const id = decodedToken.id;

        // Step 4: Send the PATCH request with the Bearer token to update the password
        const response = await request(api)
            .patch(`/account/${id}`)
            .set('Authorization', `Bearer ${token}`)  // Bearer token in headers
            .send({
                password: "newpassword@test.com", // New password
                confirmPassword: "newpassword@test.com" // Confirm new password
            });

        // Step 5: Validate the response for account update
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Account updated");

        // Step 6: Logout and validate the response
        const logout = await request(api)
            .get('/auth/logout')
            .set('Cookie', login.headers['set-cookie'].join('; '));  // Use the cookies from the login response
        expect(logout.status).toBe(200);

        // Step 7: Login with wrong password and validate the response
        const loginWithWrongPassword = await request(api).post('/auth/login').send({ email: "user@test.com", password: "wrongpassword@test.com" });
        expect(loginWithWrongPassword.status).toBe(401);
        expect(loginWithWrongPassword.body.message).toBe("Invalid email or password");

        // Step 8: Login with correct password and validate the response
        const loginWithCorrectPassword = await request(api).post('/auth/login').send({ email: "user@test.com", password: "newpassword@test.com" });
        expect(loginWithCorrectPassword.status).toBe(200);
        expect(loginWithCorrectPassword.body.token).toBeDefined();
    });

});