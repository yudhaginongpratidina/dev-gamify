import prisma from "../../utils/prisma.js";

export default class AuthorizationRepository {

    /**
     * Retrieves all non-deleted users from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of user objects.
     * Each user object contains id, fullname, email, and role.
     */
    static async getAllUser() {
        return await prisma.user.findMany({
            where: { deleted: false },
            select: {
                id: true,
                fullname: true,
                email: true,
                role: true
            }
        });
    }

    /**
     * Retrieves a user by their ID.
     * 
     * @param {number} userId - The ID of the user to retrieve.
     * @returns {Promise<Object|null>} A promise that resolves to the user object if found, or null if not found.
     */
    static async getUserById(userId) {
        return await prisma.user.findUnique({
            where: { id: Number(userId) },
            select: { 
                id: true ,
                fullname: true,
                email: true,
                role: true
            }
        });
    }

    /**
     * Updates the role of a user in the database.
     * 
     * @param {number} userId - The ID of the user whose role is to be updated.
     * @param {string} role - The new role to assign to the user.
     * @returns {Promise<Object>} A promise that resolves to the updated user object.
     */
    static async changeRole(userId, role) {
        return await prisma.user.update({
            where: { id: Number(userId) },
            data: { role : role },
            select: { 
                id: true,
                fullname: true,
                email: true,
                role: true
            }
        });
    }

}