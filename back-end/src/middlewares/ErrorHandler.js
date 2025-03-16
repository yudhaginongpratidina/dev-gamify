const ErrorHandler = (err, req, res, next) => {
    const { issues, message, status = 500 } = err;

    const formattedError = issues
        ? issues.map(({ path: [path], message }) => ({ path, message }))
        : { message };

    return res.status(status).json(formattedError);
};

export default ErrorHandler