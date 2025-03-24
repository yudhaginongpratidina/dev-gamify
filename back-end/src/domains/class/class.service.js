import ClassRepository from "./class.repository.js";
import AccountRepository from "../account/account.repository.js";
import ResponseError from "../../utils/response-error.js";

export default class ClassService {

    static async create(authorId, data) {
        const account = await AccountRepository.show(authorId);
        if (!account) throw new ResponseError(404, "Account not found");

        const existingClass = await ClassRepository.findTitleByAuthorId(authorId, data.title);
        if (existingClass.title === data.title) throw new ResponseError(400, "Class already exists");

        return await ClassRepository.create(authorId, data);
    }


    static async findAll() {
        return await ClassRepository.findAll();
    }

    static async findById(id) {
        const classs = await ClassRepository.findById(id);
        if (!classs) throw new ResponseError(404, "Class not found");
        return classs;
    }
    
    static async findByAuthorId(authorId) {
        const classs = await ClassRepository.findByAuthorId(authorId);
        if (!classs) throw new ResponseError(404, "Class not found");
        return classs;
    }

    static async update(id, data) {
        const classs = await ClassRepository.findById(id);
        if (!classs) throw new ResponseError(404, "Class not found");
        return await ClassRepository.update(id, data);
    }

    static async softDelete(id) {
        const classs = await ClassRepository.findById(id);
        if (!classs) throw new ResponseError(404, "Class not found");
        return await ClassRepository.softDelete(id);
    }

    static async trash(authorId) {
        const classs = await ClassRepository.findByAuthorId(authorId);
        if (!classs) throw new ResponseError(404, "Class not found");
        return await ClassRepository.trash(authorId);
    }

    static async restore(id) {
        const classs = await ClassRepository.findById(id);
        if (!classs) throw new ResponseError(404, "Class not found");
        return await ClassRepository.restore(id);
    }

}