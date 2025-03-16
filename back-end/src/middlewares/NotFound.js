const NotFound = (req, res, next) => {
    res.status(404).json({message: `Route [${req.method}]-[${req.path}] not found`});
};

export default NotFound;