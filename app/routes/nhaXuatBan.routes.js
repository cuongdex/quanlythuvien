const express = require('express');
const router = express.Router();
const nhaXuatBanController = require('../controllers/nhaXuatBan.controller');

// Định nghĩa các route cho NhaXuatBan
router.post('/nhaXuatBan', nhaXuatBanController.addNhaXuatBan);
router.get('/nhaXuatBan', nhaXuatBanController.getAllNhaXuatBan);
router.get('/nhaXuatBan/:id', nhaXuatBanController.getNhaXuatBanById);
router.put('/nhaXuatBan/:id', nhaXuatBanController.updateNhaXuatBan);
router.delete('/nhaXuatBan/:id', nhaXuatBanController.deleteNhaXuatBan);

module.exports = router;
