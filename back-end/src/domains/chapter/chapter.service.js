import ChapterRepository from "./chapter.repository.js";
import ResponseError from "../../utils/response-error.js";

export default class ChapterService {

    // Creates a new chapter by delegating to the repository layer. Expects validated data as input.
    static async create(data) {
        return await ChapterRepository.create(data);
    }

    // Retrieves all chapters associated with a specific class ID. Throws an error if no chapters are found.
    static async findAllByClassId(classId) {
        const chapter = await ChapterRepository.findAllByClassId(classId);
        if (!chapter) throw new ResponseError(404, "Chapter not found");
        return chapter;
    }

    // Retrieves detailed information about a specific chapter by its ID. Throws an error if the chapter is not found.
    static async findDetailByChapterId(chapterId) {
        const chapter = await ChapterRepository.findDetailByChapterId(chapterId);
        if (!chapter) throw new ResponseError(404, "Chapter not found");
        return chapter;
    }

    // Updates an existing chapter by its ID. Validates the chapter's existence before updating.
    static async updateByChapterId(chapterId, data) {
        const chapter = await ChapterRepository.findDetailByChapterId(chapterId);
        if (!chapter) throw new ResponseError(404, "Chapter not found");
        return await ChapterRepository.updateByChapterId(chapterId, data);
    }

    // Deletes a chapter by its ID. Ensures the chapter exists before attempting deletion.
    static async deleteByChapterId(chapterId) {
        const chapter = await ChapterRepository.findDetailByChapterId(chapterId);
        if (!chapter) throw new ResponseError(404, "Chapter not found");
        return await ChapterRepository.deleteByChapterId(chapterId);
    }
}