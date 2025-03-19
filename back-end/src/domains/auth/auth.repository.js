import prisma from "../../utils/prisma.js";

export default class AuthRepository {

    /**
     * Find a user by email
     * @param {string} email            - The email of the user to find
     * @returns {Promise<Object|null>}  - The user object if found, otherwise null
     */
    static async findEmail(email) {
        return await prisma.user.findUnique({
            where: { email: email },    // Find user by email
            select: {
                id: true,               // Select user ID
                fullname: true,         // Select user full name
                email: true,            // Select user email
                password: true,         // Select user password
                role: true,             // Select user role
                exp: true,              // Select user experience
                point: true,            // Select user point
            }
        });
    }

    /**
     * Create a new user
     * @param {Object} data             - The data of the user to create
     * @returns {Promise<Object>}       - The created user object
     */
    static async create(data) {
        return await prisma.user.create({
            data: data,                 // Create user with provided data
            select: {
                id: true,               // Select user ID
                fullname: true,         // Select user full name
                email: true,            // Select user email
                password: true,         // Select user password
                role: true,             // Select user role
                point: true,              // Set default point
                createdAt: true         // Select user creation date
            }
        });
    }

}