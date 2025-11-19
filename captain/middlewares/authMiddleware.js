const jwt = require('jsonwebtoken');
const captainModels = require('../models/captain.models');

module.exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
        if(!token) {
            return res.status(401).json({message: 'No token, authorization denied'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await captainModels.findById(decoded.userId).select('-password');
        if(!user) {
            return res.status(401).json({message: 'captain not found, authorization denied'});
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token is not valid'});
    }

}