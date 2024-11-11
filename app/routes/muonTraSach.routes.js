const express = require('express');
const MuonTraSachController = require('../controllers/muonTraSach.controller');

const router = express.Router();

router.post('/muon', MuonTraSachController.muonSach); // API mượn sách
router.post('/tra', MuonTraSachController.traSach);   // API trả sách
router.get('/tracuu/:maDocGia', MuonTraSachController.traCuuThongTinMuon); // API tra cứu thông tin mượn

module.exports = router;
