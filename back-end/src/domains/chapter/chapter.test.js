import request from "supertest";
import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma.js";
import 'dotenv/config';

const api = process.env.EXPRESS_PROTOCOL + "://" + process.env.EXPRESS_HOSTNAME + ":" + process.env.EXPRESS_PORT + "/api";

describe("Chapter Module Tests", () => {
    let userId, token, refreshToken, classId, chapterId;

    beforeAll(async () => {
        // Delete dependent records first to avoid foreign key constraint violations
        await prisma.chapter.deleteMany();
        await prisma.class.deleteMany();
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        // Delete dependent records first to avoid foreign key constraint violations
        await prisma.chapter.deleteMany();
        await prisma.class.deleteMany();
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

    describe("Class Creation", () => {
        it("should create a class successfully", async () => {
            const response = await request(api)
                .post("/class")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    authorId: userId,
                    title: "belajar html dasar",
                    level: "beginner",
                });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Class created");
            expect(response.body.data).toHaveProperty("title", "belajar html dasar");
            classId = response.body.data.id;
        });
    });

    describe("Chapter Operations", () => {
        it("should create a chapter successfully", async () => {
            const response = await request(api)
                .post("/chapter")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    classId,
                    title: "Pengenalan html dasar",
                    content: "ini content",
                    question: "ini adalah pertanyaan",
                    optionA: "option a",
                    optionB: "option b",
                    optionC: "option c",
                    optionD: "option d",
                    correctAnswer: "option a",
                });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Chapter created");
            expect(response.body.data).toHaveProperty("title", "Pengenalan html dasar");
            chapterId = response.body.data.id;
        });

        it("should retrieve all chapters by class ID", async () => {
            const response = await request(api)
                .get(`/chapter/class/${classId}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Chapters found");
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBeGreaterThan(0);
            expect(response.body.data[0]).toHaveProperty("id", chapterId);
        });

        it("should retrieve chapter details by chapter ID", async () => {
            const response = await request(api)
                .get(`/chapter/${chapterId}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Chapter found");
            expect(response.body.data).toHaveProperty("id", chapterId);
        });

        it("should update a chapter successfully", async () => {
            const response = await request(api)
                .patch(`/chapter/author/${userId}/chapter/${chapterId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    title: "Updated Chapter Title",
                });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Chapter updated");
            expect(response.body.data).toHaveProperty("title", "Updated Chapter Title");
        });

        it("should delete a chapter successfully", async () => {
            const response = await request(api)
                .delete(`/chapter/author/${userId}/chapter/${chapterId}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Chapter deleted");
        });
    });

    describe("User Logout", () => {
        it("should logout a user successfully", async () => {
            const loginResponse = await request(api).post("/auth/login").send({
                email: "testuser@example.com",
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
