const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Sử dụng bcryptjs để mã hóa mật khẩu

// Định nghĩa schema cho nhân viên
const nhanVienSchema = new mongoose.Schema({
    MSNV: { type: String, required: true, unique: true },
    HoTenNV: { type: String, required: true },
    Password: { type: String, required: true },
    ChucVu: { type: String, required: true },
    DiaChi: { type: String, required: true },
    SoDienThoai: { type: String, required: true }
});

// Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
nhanVienSchema.pre('save', async function(next) {
    if (!this.isModified('Password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);  // Tạo salt
        this.Password = await bcrypt.hash(this.Password, salt);  // Mã hóa mật khẩu
        next();
    } catch (error) {
        next(error);
    }
});

// Phương thức so sánh mật khẩu khi đăng nhập
nhanVienSchema.methods.comparePassword = async function(inputPassword) {
    try {
        return await bcrypt.compare(inputPassword, this.Password);
    } catch (error) {
        throw new Error('Mật khẩu không chính xác');
    }
};

// Tạo model từ schema
const NhanVien = mongoose.model('NhanVien', nhanVienSchema, 'NhanVien');

module.exports = NhanVien;
