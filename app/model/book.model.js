const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    MaSach: { type: String, required: true, unique: true },
    TenSach: { type: String, required: true },
    DonGia: { type: Number, required: true },
    SoQuyen: { type: Number, required: true },
    NamXuatBan: { type: Number, required: true },
    MaNXB: { type: String, required: true },
    TacGia: { type: String, required: true }
});

const Book = mongoose.model('Sach', bookSchema, 'Sach');


module.exports = Book;
