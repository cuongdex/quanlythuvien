const express = require('express');
const DocGiaController = require('../controllers/docGia.controller');

const router = express.Router();

router.post('/DocGia', DocGiaController.addDocGia); // Thêm mới độc giả
router.get('/DocGia', DocGiaController.getAllDocGia); // Lấy tất cả độc giả
router.get('/DocGia/:id', DocGiaController.getDocGiaById); // Lấy thông tin độc giả theo ID
router.put('/DocGia/:id', DocGiaController.updateDocGia); // Cập nhật thông tin độc giả
router.delete('/DocGia/:id', DocGiaController.deleteDocGia); // Xóa độc giả

module.exports = router;
