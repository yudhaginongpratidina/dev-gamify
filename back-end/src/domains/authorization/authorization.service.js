import AuthorizationRepository from "./authorization.repository.js";
import ResponseError from "../../utils/response-error.js";

export default class AuthorizationService {

    /**
     * Fetches all users from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of user objects.
     * Each user object contains id, fullname, email, and role.
     */
    static async getAllUser() {
        return await AuthorizationRepository.getAllUser();
    }

    /**
     * Fetches a user by their ID.
     * 
     * @param {number} userId - The ID of the user to fetch.
     * @returns {Promise<Object>} A promise that resolves to the user object if found.
     * @throws {ResponseError} Throws a 404 error if the user is not found.
     */
    static async getUserById(userId) {
        const user = await AuthorizationRepository.getUserById(userId);
        if (!user) throw new ResponseError(404, "User not found");
        return user;
    }

    /**
     * Changes the role of a user.
     * 
     * @param {number} userId - The ID of the user whose role is to be changed.
     * @param {string} role - The new role to assign to the user.
     * @returns {Promise<Object>} A promise that resolves to the updated user object.
     * @throws {ResponseError} Throws a 404 error if the user is not found.
     */
    static async changeRole(userId, role) {
        const user = await AuthorizationRepository.getUserById(userId);
        if (!user) throw new ResponseError(404, "User not found");
        return await AuthorizationRepository.changeRole(userId, role);
    }
}