import prisma from "../../utils/prisma.js";

export default class ChapterRepository {

    // Creates a new chapter in the database. Validates the existence of the associated class before proceeding.
    static async create(data) {
        // Validate that the classId exists in the Class table
        const classExists = await prisma.class.findUnique({
            where: { id: Number(data.classId) }
        });
        if (!classExists) {
            throw new Error(`Class with id ${data.classId} does not exist`);
        }

        return await prisma.chapter.create({
            data: {
                classId: Number(data.classId),
                title: data.title,
                content: data.content,
                pointExperience: isNaN(Number(data.pointExperience)) ? 0 : Number(data.pointExperience),
                pointReward: isNaN(Number(data.pointReward)) ? 0 : Number(data.pointReward),
                question: data.question,
                optionA: data.optionA,
                optionB: data.optionB,
                optionC: data.optionC,
                optionD: data.optionD,
                correctAnswer: data.correctAnswer
            },
            select: {
                id: true,
                classId: true,
                title: true,
                content: true,
                pointExperience: true,
                pointReward: true,
                question: true,
                optionA: true,
                optionB: true,
                optionC: true,
                optionD: true,
                correctAnswer: true,
                createdAt: true
            }
        });
    }

    // Retrieves all chapters associated with a specific class ID. Returns a list of chapters with limited fields.
    static async findAllByClassId(classId) {
        return await prisma.chapter.findMany({
            where: {
                classId: Number(classId),
            },
            select: {
                id: true,
                classId: true,
                title: true,
                pointExperience: true,
                pointReward: true,
                createdAt: true
            }
        });
    }

    // Retrieves detailed information about a specific chapter by its ID. Returns all relevant fields for the chapter.
    static async findDetailByChapterId(chapterId) {
        return await prisma.chapter.findUnique({
            where: {
                id: Number(chapterId)
            },
            select: {
                id: true,
                classId: true,
                title: true,
                content: true,
                pointExperience: true,
                pointReward: true,
                question: true,
                optionA: true,
                optionB: true,
                optionC: true,
                optionD: true,
                correctAnswer: true,
            }
        });
    }

    // Updates an existing chapter in the database by its ID. Only updates the fields provided in the data object.
    static async updateByChapterId(chapterId, data) {
        return await prisma.chapter.update({
            where: {
                id: Number(chapterId)
            },
            data: {
                title: data.title,
                content: data.content,
                question: data.question,
                optionA: data.optionA,
                optionB: data.optionB,
                optionC: data.optionC,
                optionD: data.optionD,
                correctAnswer: data.correctAnswer
            },
            select: {
                id: true,
                classId: true,
                title: true,
                content: true,
                pointExperience: true,
                pointReward: true,
                question: true,
                optionA: true,
                optionB: true,
                optionC: true,
                optionD: true,
                correctAnswer: true,
                createdAt: true
            }
        });
    }

    // Deletes a chapter from the database by its ID.
    static async deleteByChapterId(chapterId) {
        return await prisma.chapter.delete({
            where: {
                id: Number(chapterId)
            }
        });
    }

}