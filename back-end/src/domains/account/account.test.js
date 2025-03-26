import request from "supertest";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma.js";
import 'dotenv/config';

const api = process.env.EXPRESS_PROTOCOL + "://" + process.env.EXPRESS_HOSTNAME + ":" + process.env.EXPRESS_PORT + "/api";

describe("Account Module Tests", () => {
    beforeAll(async () => {
        await prisma.user.deleteMany(); // Clean up database
    });

    afterAll(async () => {
        await prisma.user.deleteMany(); // Clean up database
        await prisma.$disconnect();
    });

    // Integration Tests for Account Module
    describe("Account API Endpoints", () => {
        let userId;
        let token;
        let refreshToken;

        describe("POST /auth/register", () => {
            it("should register a user successfully", async () => {
                const response = await request(api).post("/auth/register").send({
                    fullname: "Test User",
                    email: "testuser@example.com",
                    password: "password123",
                    confirmPassword: "password123",
                });
                expect(response.status).toBe(201);
                expect(response.body.message).toBe("Register success");
                expect(response.body.data).toHaveProperty("email", "testuser@example.com");
            });
        });

        describe("POST /auth/login", () => {
            it("should login a user successfully", async () => {
                const response = await request(api).post("/auth/login").send({
                    email: "testuser@example.com",
                    password: "password123",
                });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Login success");
                expect(response.body.token).toBeDefined();

                token = response.body.token;
                refreshToken = response.headers["set-cookie"]
                    .find(cookie => cookie.startsWith("refresh_token"))
                    .split(";")[0]
                    .split("=")[1];

                const decodedToken = jwt.decode(refreshToken);
                userId = decodedToken.id;
                expect(userId).toBeDefined();
            });
        });

        describe("GET /account/:id", () => {
            it("should return account details successfully", async () => {
                const response = await request(api)
                    .get(`/account/${userId}`)
                    .set("Authorization", `Bearer ${token}`);
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Account found");
                expect(response.body.data).toHaveProperty("id", userId);
            });

            it("should return 404 for non-existent account", async () => {
                const response = await request(api)
                    .get(`/account/9999`)
                    .set("Authorization", `Bearer ${token}`);
                expect(response.status).toBe(404);
                expect(response.body.message).toBe("Account not found");
            });
        });

        describe("PATCH /account/:id", () => {
            it("should update account fullname successfully", async () => {
                const response = await request(api)
                    .patch(`/account/${userId}`)
                    .set("Authorization", `Bearer ${token}`)
                    .send({ fullname: "Updated User" });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Account updated");
                expect(response.body.data.fullname).toBe("Updated User");
            });

            it("should update account password successfully", async () => {
                const response = await request(api)
                    .patch(`/account/${userId}`)
                    .set("Authorization", `Bearer ${token}`)
                    .send({
                        password: "newpassword123",
                        confirmPassword: "newpassword123",
                    });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Account updated");

                // Verify login with new password
                const loginResponse = await request(api).post("/auth/login").send({
                    email: "testuser@example.com",
                    password: "newpassword123",
                });
                expect(loginResponse.status).toBe(200);
                expect(loginResponse.body.message).toBe("Login success");
            });
        });

        describe("DELETE /account/:id", () => {
            it("should delete account successfully", async () => {
                const response = await request(api)
                    .delete(`/account/${userId}`)
                    .set("Authorization", `Bearer ${token}`)
                    .send({ areYouSure: true });
                expect(response.status).toBe(204);

                // Verify account deletion
                const getResponse = await request(api)
                    .get(`/account/${userId}`)
                    .set("Authorization", `Bearer ${token}`);
                expect(getResponse.status).toBe(404);
                expect(getResponse.body.message).toBe("Account not found");
            });
        });
    });
});