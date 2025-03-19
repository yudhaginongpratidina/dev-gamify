import bcrypt from "bcrypt";
import AccountRepository from "./account.repository.js";
import ResponseError from "../../utils/response-error.js";

export default class AccountService {

    static async show(id) {
        const account = await AccountRepository.show(id);
        if (!account) throw new ResponseError(404, "Account not found");
        return account;
    }

    static async update(id, data) {
        const account = await AccountRepository.show(id);
        if (!account) throw new ResponseError(404, "Account not found");
        if (data.password) data.password = await bcrypt.hash(data.password, 10);
        delete data.confirmPassword;
        return await AccountRepository.update(id, data);
    }

    static async delete(id) {
        const account = await AccountRepository.show(id);
        if (!account) throw new ResponseError(404, "Account not found");
        return await AccountRepository.delete(id);
    }

}