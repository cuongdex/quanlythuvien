const express = require('express');
const router = express.Router();
const nhanVienController = require('../controllers/nhanVien.controller');

router.post('/nhanVien', nhanVienController.addNhanVien);
router.get('/nhanVien', nhanVienController.getAllNhanVien);
router.get('/nhanVien/:maNhanVien', nhanVienController.getNhanVienById);
router.put('/nhanVien/:maNhanVien', nhanVienController.updateNhanVien);
router.delete('/nhanVien/:maNhanVien', nhanVienController.deleteNhanVien);

module.exports = router;
