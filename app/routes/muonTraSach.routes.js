const express = require('express');
const MuonTraSachController = require('../controllers/muonTraSach.controller');

const router = express.Router();
router.get('/lay', MuonTraSachController.getAll); 
router.post('/muon', MuonTraSachController.muonSach); // API mượn sách
router.post('/tra', MuonTraSachController.traSach);   // API trả sách
router.post('/muon-nhieu-sach', MuonTraSachController.muonNhieuSach);
router.get('/tracuu/:maDocGia', MuonTraSachController.traCuuThongTinMuon); // API tra cứu thông tin mượn

module.exports = router;
