// model/theoDoiMuonSach.model.js
const mongoose = require('mongoose');

const theoDoiMuonSachSchema = new mongoose.Schema({
    maDocGia: { type: String, required: true },
    maSach: { type: String, required: true },
    ngayMuon: { type: Date, required: true },
    ngayTra: { type: Date}
});

const TheoDoiMuonSach = mongoose.model('TheoDoiMuonSach', theoDoiMuonSachSchema,'TheoDoiMuonSach');

module.exports = TheoDoiMuonSach;
