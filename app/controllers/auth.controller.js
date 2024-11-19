const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NhanVien = require('../model/nhanVien.model'); 

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function login(req, res) {
    try {
        const { MSNV, Password } = req.body;

        // Tìm nhân viên trong cơ sở dữ liệu
        const nhanVien = await NhanVien.findOne({ MSNV:MSNV });

        if (!nhanVien) {
            return res.status(400).json({ success: false, message: 'Nhân viên không tồn tại.' });
        }

        // Kiểm tra mật khẩu
        const isPasswordMatch = await bcrypt.compare(Password, nhanVien.Password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: 'Mật khẩu không đúng.' });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { MSNV: nhanVien.MSNV, HoTenNV: nhanVien.HoTenNV },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công!',
            data: { name:nhanVien.HoTenNV,token }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server: ' + error.message });
    }
}

module.exports = {
    login
};
