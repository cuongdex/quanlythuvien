const mongoose = require('mongoose');

const docGiaSchema = new mongoose.Schema({
    maDocGia: { type: String, required: true, unique: true },
    hoLot: { type: String, required: true },
    ten: { type: String, required: true },
    ngaySinh: { type: Date, required: true },
    phai: { type: String, required: true },
    diaChi: { type: String, required: true },
    dienThoai: { type: String, required: true }
});

const DocGia = mongoose.model('DocGia', docGiaSchema,'DocGia');

module.exports = DocGia;
