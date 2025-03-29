import AuthorizationService from "./authorization.service.js";
import validation from "../../utils/validation.js";
import { authorizationSchema } from "./authorization.validation.js";

export default class AuthorizationController {

    /**
     * Handles the request to fetch all users.
     * 
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @param {Function} next - The next middleware function.
     */
    static async getAllUser(req, res, next) {
        try {
            const response = await AuthorizationService.getAllUser();
            res.status(200).json({ message: 'Users found', data: response });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles the request to fetch a user by their ID.
     * 
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @param {Function} next - The next middleware function.
     */
    static async getUserById(req, res, next) {
        try {
            const userId = req.params.userId;
            const response = await AuthorizationService.getUserById(userId);
            res.status(200).json({ message: 'User found', data: response });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Handles the request to change a user's role.
     * 
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @param {Function} next - The next middleware function.
     */
    static async changeRole(req, res, next) {
        try {
            const userId = req.params.userId;
            const data = await validation.validate(authorizationSchema, req.body);
            const response = await AuthorizationService.changeRole(userId, data.role);
            res.status(200).json({ message: 'Role changed', data: response });
        } catch (error) {
            next(error);
        }
    }

}