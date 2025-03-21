import AccountService from "./account.service.js";
import validation from "../../utils/validation.js";
import { accountUpdateSchema, accountDeleteSchema } from "./account.validation.js";

export default class AccountController {

    static async show(req, res, next) {
        try {
            const id = req.params.id;
            const response = await AccountService.show(id);
            res.status(200).json({ message: 'Account found', data: response });        
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.id;
            const data = await validation.validate(accountUpdateSchema, req.body);
            const response = await AccountService.update(id, data);
            res.status(200).json({ message: 'Account updated', data: response });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id;
            const data = await validation.validate(accountDeleteSchema, req.body);
            if (data) await AccountService.delete(id);
            res.status(204).json({ message: 'Account deleted' });
        } catch (error) {
            next(error);
        }
    }

}