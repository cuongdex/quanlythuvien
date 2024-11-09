const mongoose = require('mongoose');

// Định nghĩa schema cho Nhà xuất bản
const nhaXuatBanSchema = new mongoose.Schema({
    MaNXB: { type: String, required: true, unique: true },
    TenNXB: { type: String, required: true },
    DiaChi: { type: String, required: true },
});

// Tạo model từ schema
const NhaXuatBan = mongoose.model('NhaXuatBan', nhaXuatBanSchema, 'NhaXuatBan');

module.exports = NhaXuatBan;

