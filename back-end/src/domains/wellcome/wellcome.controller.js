export default class WellcomeController {

    static async index(req, res, next) {
        try {
            res.status(200).json({message: 'Wellcome to the API'});
        } catch (error) {
            next(error);
        }
    }

}