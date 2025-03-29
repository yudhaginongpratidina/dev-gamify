import request from "supertest";
import prisma from "../../utils/prisma.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const api = process.env.EXPRESS_PROTOCOL + "://" + process.env.EXPRESS_HOSTNAME + ":" + process.env.EXPRESS_PORT + "/api";

describe("Authorization Module Tests", () => {
    let adminToken;
    let userToken;
    let userId;

    beforeAll(async () => {
        // Clean up database
        await prisma.user.deleteMany();

        // Create an admin user
        const admin = await prisma.user.create({
            data: {
                fullname: "Admin User",
                email: "admin@example.com",
                password: "adminpassword",
                role: "admin",
            },
        });

        // Generate admin token
        adminToken = jwt.sign({ id: admin.id, role: admin.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    });

    afterAll(async () => {
        // Clean up database
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    describe("User Registration and Login", () => {
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

        it("should login the user successfully", async () => {
            const response = await request(api).post("/auth/login").send({
                email: "testuser@example.com",
                password: "password123",
            });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Login success");
            expect(response.body.token).toBeDefined();

            userToken = response.body.token;
            const decodedToken = jwt.decode(userToken);
            userId = decodedToken.id;
            expect(userId).toBeDefined();
        });
    });

    describe("Authorization Role Management", () => {
        it("should fetch all users successfully", async () => {
            const response = await request(api)
                .get("/authorization")
                .set("Authorization", `Bearer ${adminToken}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Users found");
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        it("should fetch a user by ID successfully", async () => {
            const response = await request(api)
                .get(`/authorization/${userId}`)
                .set("Authorization", `Bearer ${adminToken}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("User found");
            expect(response.body.data).toHaveProperty("id", userId);
        });

        it("should change user role successfully", async () => {
            const response = await request(api)
                .patch(`/authorization/${userId}`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ role: "admin" });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Role changed");
            expect(response.body.data).toHaveProperty("role", "admin");
        });

        it("should return 500 for invalid role", async () => {
            const response = await request(api)
                .patch(`/authorization/${userId}`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ role: "invalidRole" });
            expect(response.status).toBe(500);
            expect(response.body[0].message).toBe("Invalid enum value. Expected 'user' | 'admin' | 'superadmin', received 'invalidRole'");
        });

        it("should return 404 for non-existent user", async () => {
            const response = await request(api)
                .patch(`/authorization/9999`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ role: "admin" });
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("User not found");
        });
    });
});
