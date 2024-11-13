const mongoose = require('mongoose');

// Định nghĩa schema cho Nhân viên
const nhanVienSchema = new mongoose.Schema({
    MSNV: { type: String, required: true, unique: true },
    HoTenNV: { type: String, required: true },
    Password: { type: String, required: true },
    ChucVu: { type: String, required: true },
    Diachi: { type: String, required: true },
    SoDienThoai: { type: String, required: true }
});

// Tạo model từ schema
const NhanVien = mongoose.model('NhanVien', nhanVienSchema, 'NhanVien');

module.exports = NhanVien;
