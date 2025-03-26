import ClassService from "./class.service.js";
import validation from "../../utils/validation.js";
import { classCreateSchema, classUpdateSchema } from "./class.validation.js";

export default class ClassController {

    // Handles the creation of a new class. Validates the request body using the classCreateSchema,
    // calls the service to create the class, and sends a response with the created class data.
    static async create(req, res, next) {
        try {
            const data = await validation.validate(classCreateSchema, req.body);
            const response = await ClassService.create(data);
            res.status(201).json({ message: 'Class created', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Retrieves all classes by calling the service and sends a response with the class data.
    static async findAll(req, res, next) {
        try {
            const response = await ClassService.findAll();
            res.status(200).json({ message: 'Classes found', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Finds a class by its ID from the request parameters, calls the service, and sends a response with the class data.
    static async findById(req, res, next) {
        try {
            const classId = req.params.classId;
            const response = await ClassService.findByClassId(classId);
            res.status(200).json({ message: 'Class found', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Retrieves all classes for a specific author by their ID from the request parameters,
    // calls the service, and sends a response with the class data.
    static async findByAuthorId(req, res, next) {
        try {
            const authorId = req.params.authorId;
            const response = await ClassService.findByAuthorId(authorId);
            res.status(200).json({ message: 'Classes found', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Updates a class by its ID from the request parameters. Validates the request body using the classUpdateSchema,
    // calls the service to update the class, and sends a response with the updated class data.
    static async update(req, res, next) {
        try {
            const classId = req.params.classId;
            const data = await validation.validate(classUpdateSchema, req.body);
            const response = await ClassService.update(classId, data);
            res.status(200).json({ message: 'Class updated', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Soft deletes a class by its ID from the request parameters, calls the service, and sends a response.
    static async softDelete(req, res, next) {
        try {
            const classId = req.params.classId;
            const response = await ClassService.softDelete(classId);
            res.status(200).json({ message: 'Class deleted', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Retrieves all classes marked as deleted for a specific author by their ID from the request parameters,
    // calls the service, and sends a response with the trashed class data.
    static async trash(req, res, next) {
        try {
            const authorId = req.params.id;
            const response = await ClassService.trash(authorId);
            res.status(200).json({ message: 'Classes trashed', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Restores a soft-deleted class by its ID from the request parameters, calls the service, and sends a response.
    static async restore(req, res, next) {
        try {
            const classId = req.params.classId;
            const response = await ClassService.restore(classId);
            res.status(200).json({ message: 'Class restored', data: response });
        } catch (error) {
            next(error);
        }
    }

}