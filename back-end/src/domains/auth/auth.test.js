import request from "supertest";
import prisma from "../../utils/prisma.js";
import AuthService from "./auth.service.js";
import AuthRepository from "./auth.repository.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import 'dotenv/config';

const api = process.env.EXPRESS_PROTOCOL + "://" + process.env.EXPRESS_HOSTNAME + ":" + process.env.EXPRESS_PORT + "/api";

describe("Auth Module Tests", () => {
    beforeAll(async () => {
        await prisma.user.deleteMany(); // Clean up database
    });

    afterAll(async () => {
        await prisma.user.deleteMany(); // Clean up database
        await prisma.$disconnect();
    });

    // Unit Tests for Validation
    describe("Validation", () => {
        it("should validate register schema successfully", () => {
            const data = {
                fullname: "Test User",
                email: "testuser@example.com",
                password: "password123",
                confirmPassword: "password123",
            };
            expect(() => registerSchema.parse(data)).not.toThrow();
        });

        it("should throw error if passwords do not match", () => {
            const data = {
                fullname: "Test User",
                email: "testuser@example.com",
                password: "password123",
                confirmPassword: "password321",
            };
            expect(() => registerSchema.parse(data)).toThrow("Passwords do not match");
        });

        it("should validate login schema successfully", () => {
            const data = {
                email: "testuser@example.com",
                password: "password123",
            };
            expect(() => loginSchema.parse(data)).not.toThrow();
        });
    });

    // Unit Tests for AuthRepository
    describe("AuthRepository", () => {
        it("should create a new user", async () => {
            const user = await AuthRepository.create({
                fullname: "Test User",
                email: "testuser@example.com",
                password: "hashedpassword"
            });
            expect(user).toHaveProperty("id");
            expect(user.email).toBe("testuser@example.com");
        });

        it("should find a user by email", async () => {
            const user = await AuthRepository.findEmail("testuser@example.com");
            expect(user).not.toBeNull();
            expect(user.email).toBe("testuser@example.com");
        });
    });

    // Unit Tests for AuthService
    describe("AuthService", () => {
        it("should register a new user", async () => {
            const user = await AuthService.register({
                fullname: "New User",
                email: "newuser@example.com",
                password: "password123",
            });
            expect(user).toHaveProperty("id");
            expect(user.email).toBe("newuser@example.com");
        });

        it("should throw error if email already exists", async () => {
            await expect(
                AuthService.register({
                    fullname: "Duplicate User",
                    email: "newuser@example.com",
                    password: "password123",
                })
            ).rejects.toThrow("Email already exists");
        });

        it("should login a user with valid credentials", async () => {
            const user = await AuthService.login("newuser@example.com", "password123");
            expect(user).toHaveProperty("id");
            expect(user.email).toBe("newuser@example.com");
        });

        it("should throw error for invalid credentials", async () => {
            await expect(AuthService.login("newuser@example.com", "wrongpassword")).rejects.toThrow("Invalid email or password");
        });
    });

    // Integration Tests for API Endpoints
    describe("Auth API Endpoints", () => {
        describe("POST /auth/register", () => {
            it("should register a user successfully", async () => {
                const response = await request(api).post("/auth/register").send({
                    fullname: "Integration User",
                    email: "integration@example.com",
                    password: "password123",
                    confirmPassword: "password123",
                });
                expect(response.status).toBe(201);
                expect(response.body.message).toBe("Register success");
                expect(response.body.data).toHaveProperty("email", "integration@example.com");
            });

            it("should return 409 if email already exists", async () => {
                const response = await request(api).post("/auth/register").send({
                    fullname: "Duplicate User",
                    email: "integration@example.com",
                    password: "password123",
                    confirmPassword: "password123",
                });
                expect(response.status).toBe(409);
            });

            it("should return 500 if passwords do not match", async () => {
                const response = await request(api).post("/auth/register").send({
                    fullname: "Test User",
                    email: "newuser2@example.com",
                    password: "password123",
                    confirmPassword: "password321",
                });
                expect(response.status).toBe(500);
                expect(response.body[0].message).toBe("Passwords do not match");
            });
        });

        describe("POST /auth/login", () => {
            it("should login a user successfully", async () => {
                const response = await request(api).post("/auth/login").send({
                    email: "integration@example.com",
                    password: "password123",
                });
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Login success");
                expect(response.body.token).toBeDefined();
            });

            it("should return 401 for invalid credentials", async () => {
                const response = await request(api).post("/auth/login").send({
                    email: "integration@example.com",
                    password: "wrongpassword",
                });
                expect(response.status).toBe(401);
                expect(response.body.message).toBe("Invalid email or password");
            });
        });

        describe("GET /auth/refresh-token", () => {
            it("should refresh token successfully", async () => {
                const loginResponse = await request(api).post("/auth/login").send({
                    email: "integration@example.com",
                    password: "password123",
                });
                const cookies = loginResponse.headers["set-cookie"];
                const response = await request(api).get("/auth/refresh-token").set("Cookie", cookies);
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Token refreshed successfully");
                expect(response.body.token).toBeDefined();
            });

            it("should return 401 if no refresh token is provided", async () => {
                const response = await request(api).get("/auth/refresh-token");
                expect(response.status).toBe(401);
            });
        });

        describe("GET /auth/logout", () => {
            it("should logout a user successfully", async () => {
                const loginResponse = await request(api).post("/auth/login").send({
                    email: "integration@example.com",
                    password: "password123",
                });
                const cookies = loginResponse.headers["set-cookie"];
                const response = await request(api).get("/auth/logout").set("Cookie", cookies);
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("Logout success");
            });

            it("should return 200 if user is not logged in", async () => {
                const response = await request(api).get("/auth/logout");
                expect(response.status).toBe(200);
                expect(response.body.message).toBe("user not logged in");
            });
        });
    });
});