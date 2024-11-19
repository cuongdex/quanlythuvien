// middleware/authMiddleware.js
const jwt = require('jwt-simple');
const config = require('../config');

function authMiddleware(req, res, next) {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Không có token, yêu cầu xác thực' });
    }

    try {
        const decoded = jwt.decode(token, config.jwtSecret);
        req.user = decoded; // Lưu thông tin người dùng vào req.user
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
    }
}

module.exports = authMiddleware;
