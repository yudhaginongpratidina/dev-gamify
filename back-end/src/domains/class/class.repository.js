import prisma from "../../utils/prisma.js";

export default class ClassRepository {


    static async create(authorId, data) {
        return await prisma.class.create({
            data: {
                authorId: authorId,
                ...data
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

    static async findById(id) {
        return await prisma.class.findUnique({
            where: {
                id: Number(id)
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

    static async findByAuthorId(authorId) {
        return await prisma.class.findMany({
            where: {
                authorId: Number(authorId),
                deleted: false
            }
        });
    }

    static async findTitleByAuthorId(authorId, title) {
        return await prisma.class.findMany({
            where: {
                authorId: Number(authorId),
                title: title
            }
        });
    }


    static async update(id, data) {
        return await prisma.class.update({
            where: {
                id: Number(id)
            },
            data: data
        });
    }

    static async softDelete(id) {
        return await prisma.class.update({
            where: {
                id: Number(id)
            },
            data: {
                deleted: true
            }
        })
    }

    static async trash(authorId) {
        return await prisma.class.findMany({
            where: {
                authorId : Number(authorId),
                deleted: true
            }
        });
    }

    static async restore(id) {
        return await prisma.class.update({
            where: {
                id: Number(id)
            },
            data: {
                deleted: false
            }
        })
    }

}