const mongoose = require('mongoose');

const theoDoiMuonSachSchema = new mongoose.Schema({
    maDocGia: { type: String, required: true },
    dsSach: [
        {
            maSach: { type: String, required: true }
        }
    ],
    ngayMuon: { type: Date, required: true },
    ngayTra: { type: Date } // Ngày trả, null nếu chưa trả
});

const TheoDoiMuonSach = mongoose.model('TheoDoiMuonSach', theoDoiMuonSachSchema, 'TheoDoiMuonSach');

module.exports = TheoDoiMuonSach;
