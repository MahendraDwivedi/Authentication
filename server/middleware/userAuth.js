import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'No Token. Unauthorized. Login again' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            // Ensure req.body exists before setting userId
            if (!req.body) {
                req.body = {};
            }
            req.body.userId = tokenDecode.id;
            next();
        } else {
            return res.json({ success: false, message: 'Unauthorized: Invalid token payload' });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default userAuth;
