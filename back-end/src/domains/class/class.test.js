import request from "supertest";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma.js";
import 'dotenv/config';

const api = process.env.EXPRESS_PROTOCOL + "://" + process.env.EXPRESS_HOSTNAME + ":" + process.env.EXPRESS_PORT + "/api";

describe("Class Module Full Workflow Tests", () => {
    let token;
    let userId;
    let classId;

    beforeAll(async () => {
        await prisma.class.deleteMany(); // Clean up database
        await prisma.user.deleteMany(); // Clean up users
    });

    afterAll(async () => {
        await prisma.class.deleteMany(); // Clean up database
        await prisma.user.deleteMany(); // Clean up users
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

            token = response.body.token;
            const decodedToken = jwt.decode(token);
            userId = decodedToken.id;
            expect(userId).toBeDefined();
        });
    });

    describe("Class Management", () => {
        it("should create a class successfully", async () => {
            const response = await request(api)
                .post("/class")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    authorId: userId,
                    title: "Test Class",
                    level: "beginner",
                });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Class created");
            expect(response.body.data).toHaveProperty("title", "Test Class");

            classId = response.body.data.id;
        });

        it("should retrieve all classes", async () => {
            const response = await request(api)
                .get("/class")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Classes found");
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        it("should retrieve a class by ID", async () => {
            const response = await request(api)
                .get(`/class/${classId}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Class found");
            expect(response.body.data).toHaveProperty("id", classId);
        });

        it("should update the class successfully", async () => {
            const response = await request(api)
                .patch(`/class/author/${userId}/${classId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Updated Class",
                    level: "intermediate",
                });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Class updated");
            expect(response.body.data).toHaveProperty("title", "Updated Class");
        });

        it("should soft delete the class", async () => {
            const response = await request(api)
                .delete(`/class/author/${userId}/${classId}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Class deleted");
        });

        it("should retrieve trashed classes", async () => {
            const response = await request(api)
                .get(`/class/author/${userId}/trash`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Classes trashed");
        });

        it("should restore the class", async () => {
            const response = await request(api)
                .patch(`/class/author/${userId}/${classId}/restore`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Class restored");
        });
    });
});
