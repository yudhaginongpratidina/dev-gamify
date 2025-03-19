import jwt from "jsonwebtoken";
import AuthService from "./auth.service.js";
import validation from "../../utils/validation.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

export default class AuthController {

    static async register(req, res, next) {
        try {
            const data = await validation.validate(registerSchema, req.body);
            const response = await AuthService.register(data);
            res.status(201).json({ message: 'Register success', data: response });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const data = await validation.validate(loginSchema, req.body);
            const response = await AuthService.login(data.email, data.password);

            const id = response.id;
            const role = response.role;

            const access_token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
            const refresh_token = jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

            res.cookie("refresh_token", refresh_token, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000, partitioned: true });
            res.status(200).json({ message: 'Login success', token: access_token });
        } catch (error) {
            next(error);
        }
    }

    static async refresh_token(req, res, next) {
        try {
            const refresh_token = req.cookies.refresh_token;
            if (!refresh_token) return res.sendStatus(401);

            const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
            if (!decoded) return res.sendStatus(403);

            const id = decoded.id;
            const role = decoded.role;
            const access_token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });

            res.status(200).json({ message: "Token refreshed successfully", token: access_token });
        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        try {
            if (!req.cookies.refresh_token) return res.sendStatus(204);

            res.clearCookie("refresh_token", { httpOnly: true, secure: true, sameSite: "None", partitioned: true });
            res.status(200).json({ message: 'Logout success' });
        } catch (error) {
            next(error);
        }
    }
}