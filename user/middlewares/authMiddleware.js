const jwt = require('jsonwebtoken');
const userModel = require('../models/user.models');

module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
        if(!token) {
            return res.status(401).json({message: 'No token, authorization denied'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId).select('-password');
        if(!user) {
            return res.status(401).json({message: 'User not found, authorization denied'});
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token is not valid'});
    }

}