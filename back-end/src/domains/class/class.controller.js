import ClassService from "./class.service.js";
import validation from "../../utils/validation.js";
import { classCreateSchema, classUpdateSchema } from "./class.validation.js";

export default class ClassController {

    static async create(req, res, next) {
        try {
            const data = await validation.validate(classCreateSchema, req.body);
            const response = await ClassService.create(data.authorId, data);
            res.status(201).json({ message: 'Class created', data: response });
        } catch (error) {
            next(error);
        }
    }

    static async findAll(req, res, next) {
        try {
            const response = await ClassService.findAll();
            res.status(200).json({ message: 'Classes found', data: response });
        } catch (error) {
            next(error);
        }
    }

    static async findById(req, res, next) {
        try {
            const id = req.params.id;
            const response = await ClassService.findById(id);
            res.status(200).json({ message: 'Class found', data: response });
        } catch (error) {
            next(error);
        }
    }

    static async findByAuthorId(req, res, next) {
        try {
            const id = req.params.authorId;
            const response = await ClassService.findByAuthorId(id);
            res.status(200).json({ message: 'Classes found', data: response });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.classId;
            const data = await validation.validate(classUpdateSchema, req.body);
            const response = await ClassService.update(id, data);
            res.status(200).json({ message: 'Class updated', data: response });
        } catch (error) {
            next(error);
        }
    }

    static async trash(req, res, next) {
        try {
            const id = req.params.authorId;
            const response = await ClassService.trash(id);
            res.status(200).json({ message: 'Classes trashed', data: response });
        } catch (error) {
            next(error);
        }
    }

    static async softDelete(req, res, next) {
        try {
            const id = req.params.classId;
            const response = await ClassService.softDelete(id);
            res.status(200).json({ message: 'Class deleted', data: response });
        } catch (error) {
            next(error);
        }
    }

    static async restore(req, res, next) {
        try {
            const id = req.params.classId;
            const response = await ClassService.restore(id);
            res.status(200).json({ message: 'Class restored', data: response });
        } catch (error) {
            next(error);
        }
    }

}