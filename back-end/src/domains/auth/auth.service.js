import bcrypt from "bcrypt";
import AuthRepository from "./auth.repository.js";
import ResponseError from "../../utils/response-error.js";

export default class AuthService {

    /**
     * Register a new user
     * @param {Object} data             - The data of the user to register
     * @param {string} data.email       - The email of the user
     * @param {string} data.password    - The password of the user
     * @returns {Promise<Object>}       - The created user object
     * @throws {ResponseError}          - Throws an error if the email already exists
     */
    static async register(data) {
        // Check if the email already exists
        const user = await AuthRepository.findEmail(data.email);
        if (user) throw new ResponseError(409, "Email already exists");

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        // Prepare the new user object
        const newUser = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            point: Number(process.env.STARTING_POINT),
        }

        // Create the new user in the database
        return await AuthRepository.create(newUser);
    }


    /**
     * Login a user
     * @param {string} email        - The email of the user
     * @param {string} password     - The password of the user
     * @returns {Promise<Object>}   - The authenticated user object
     * @throws {ResponseError}      - Throws an error if the email or password is invalid
     */
    static async login(email, password) {
        // Find the user by email
        const user = await AuthRepository.findEmail(email);
        if (!user) throw new ResponseError(401, "Invalid email or password");

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new ResponseError(401, "Invalid email or password");

        // Return the authenticated user object
        return user;
    }

}