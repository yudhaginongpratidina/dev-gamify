import prisma from "../../utils/prisma.js";

export default class ClassRepository {

    // Creates a new class in the database with the provided data and returns the created class.
    static async create(data) {
        return await prisma.class.create({
            data: {
                authorId: Number(data.authorId),
                title: data.title,
                level: data.level
            },
            select: {
                id: true,
                authorId: true,
                title: true,
                level: true,
                createdAt: true
            }
        });
    }

    // Retrieves all classes from the database, including the author's details.
    static async findAll() {
        return await prisma.class.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        fullname: true,
                    }
                }
            }
        });
    }

    // Finds a class by its ID and includes the author's details. Returns null if not found.
    static async findByClassId(classId) {
        return await prisma.class.findUnique({
            where: {
                id: Number(classId)
            },
            include: {
                author: {
                    select: {
                        id: true,
                        fullname: true,
                    }
                }
            }
        });
    }

    // Retrieves all classes for a specific author that are not marked as deleted.
    static async findByAuthorId(authorId) {
        return await prisma.class.findMany({
            where: {
                authorId: Number(authorId),
                deleted: false
            }
        });
    }

    // Finds classes by author ID and title. Used to check for duplicate titles.
    static async findTitleByAuthorId(authorId, title) {
        return await prisma.class.findMany({
            where: {
                authorId: Number(authorId),
                title: title
            }
        });
    }

    // Updates a class by its ID with the provided data.
    static async update(classId, data) {
        return await prisma.class.update({
            where: {
                id: Number(classId)
            },
            data: data
        });
    }

    // Marks a class as deleted by setting the "deleted" field to true.
    static async softDelete(classId) {
        return await prisma.class.update({
            where: {
                id: Number(classId)
            },
            data: {
                deleted: true
            }
        });
    }

    // Retrieves all classes marked as deleted for a specific author.
    static async trash(authorId) {
        return await prisma.class.findMany({
            where: {
                authorId : Number(authorId),
                deleted: true
            }
        });
    }

    // Restores a soft-deleted class by setting the "deleted" field to false.
    static async restore(classId) {
        return await prisma.class.update({
            where: {
                id: Number(classId)
            },
            data: {
                deleted: false
            }
        });
    }

}