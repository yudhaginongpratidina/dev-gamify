import jwt from 'jsonwebtoken';

const Me = (req, res, next) => {
    const id = req.params.id
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);

        req.id = decoded.id;
        req.role = decoded.role;

        if (Number(id) !== Number(req.id)) return res.status(403).json({ message: 'Access Denied, You are not the user' });
        next();
    })
}

export default Me