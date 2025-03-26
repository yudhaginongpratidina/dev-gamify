import ClassRepository from "./class.repository.js";
import AccountRepository from "../account/account.repository.js";
import ResponseError from "../../utils/response-error.js";

export default class ClassService {

    // Creates a new class. It first checks if the author exists and if a class with the same
    // title already exists for the author. If validations pass, it creates the class.
    static async create(data) {
        const account = await AccountRepository.show(data.authorId);
        if (!account) throw new ResponseError(404, "Account not found");
        const existingClass = await ClassRepository.findTitleByAuthorId(data.authorId, data.title);
        if (existingClass.title === data.title) throw new ResponseError(400, "Class already exists");
        return await ClassRepository.create(data);
    }

    // Retrieves all classes from the repository.
    static async findAll() {
        return await ClassRepository.findAll();
    }

    // Finds a class by its ID. Throws an error if the class is not found.
    static async findByClassId(classId) {
        const classs = await ClassRepository.findByClassId(classId);
        if (!classs) throw new ResponseError(404, "Class not found");
        return classs;
    }

    // Finds all classes created by a specific author. Throws an error if no classes are found.
    static async findByAuthorId(authorId) {
        const classs = await ClassRepository.findByAuthorId(authorId);
        if (!classs) throw new ResponseError(404, "Class not found");
        return classs;
    }

    // Updates a class by its ID. Throws an error if the class is not found.
    static async update(classId, data) {
        const classs = await ClassRepository.findByClassId(classId);
        if (!classs) throw new ResponseError(404, "Class not found");
        return await ClassRepository.update(classId, data);
    }

    // Soft deletes a class by marking it as deleted. Throws an error if the class is not found.
    static async softDelete(classId) {
        const classs = await ClassRepository.findByClassId(classId);
        if (!classs) throw new ResponseError(404, "Class not found");
        return await ClassRepository.softDelete(classId);
    }

    // Retrieves all classes marked as deleted for a specific author. Throws an error if no classes are found.
    static async trash(authorId) {
        const classs = await ClassRepository.findByAuthorId(authorId);
        if (!classs) throw new ResponseError(404, "Class not found");
        return await ClassRepository.trash(authorId);
    }

    // Restores a soft-deleted class by its ID. Throws an error if the class is not found.
    static async restore(classsId) {
        const classs = await ClassRepository.findByClassId(classsId);
        if (!classs) throw new ResponseError(404, "Class not found");
        return await ClassRepository.restore(classsId);
    }

}