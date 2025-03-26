import ChapterService from "./chapter.service.js";
import validation from "../../utils/validation.js";
import { chapterCreateSchema, chapterUpdateSchema } from "./chapter.validation.js";

export default class ChapterController {

    // Handles the creation of a new chapter. Validates the request body and delegates the creation to the service layer.
    static async create(req, res, next) {
        try {
            const data = await validation.validate(chapterCreateSchema, req.body);
            const response = await ChapterService.create(data);
            res.status(201).json({ message: 'Chapter created', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Retrieves all chapters associated with a specific class ID. Delegates the retrieval to the service layer.
    static async findAllByClassId(req, res, next) {
        try {
            const classId = req.params.classId;
            const response = await ChapterService.findAllByClassId(classId);
            res.status(200).json({ message: 'Chapters found', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Retrieves detailed information about a specific chapter by its ID. Delegates the retrieval to the service layer.
    static async findDetailByChapterId(req, res, next) {
        try {
            const chapterId = req.params.chapterId;
            const response = await ChapterService.findDetailByChapterId(chapterId);
            res.status(200).json({ message: 'Chapter found', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Updates an existing chapter by its ID. Validates the request body and delegates the update to the service layer.
    static async updateByChapterId(req, res, next) {
        try {
            const chapterId = req.params.chapterId;
            const data = await validation.validate(chapterUpdateSchema, req.body);
            const response = await ChapterService.updateByChapterId(chapterId, data);
            res.status(200).json({ message: 'Chapter updated', data: response });
        } catch (error) {
            next(error);
        }
    }

    // Deletes a chapter by its ID. Delegates the deletion to the service layer.
    static async deleteByChapterId(req, res, next) {
        try {
            const chapterId = req.params.chapterId;
            const response = await ChapterService.deleteByChapterId(chapterId);
            res.status(200).json({ message: 'Chapter deleted', data: response });
        } catch (error) { 
            next(error);
        }
    }
    

}