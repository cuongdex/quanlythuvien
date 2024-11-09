const NhaXuatBanService = require('../services/nhaXuatBan.service');

// Thêm nhà xuất bản mới
async function addNhaXuatBan(req, res) {
    try {
        const data = req.body;
        const result = await NhaXuatBanService.addNhaXuatBan(data);
        res.status(201).json({
            success: true,
            data: result,
            message: 'Nhà xuất bản đã được thêm thành công!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
}

// Lấy tất cả nhà xuất bản
async function getAllNhaXuatBan(req, res) {
    try {
        const result = await NhaXuatBanService.getAllNhaXuatBan();
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
}

// Lấy nhà xuất bản theo mã
async function getNhaXuatBanById(req, res) {
    try {
        const id = req.params.id;
        const result = await NhaXuatBanService.getNhaXuatBanById(id);
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nhà xuất bản không tồn tại!',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
}

// Cập nhật thông tin nhà xuất bản
async function updateNhaXuatBan(req, res) {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await NhaXuatBanService.updateNhaXuatBan(id, updatedData);
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                message: 'Nhà xuất bản đã được cập nhật thành công!',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nhà xuất bản không tồn tại!',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
}

// Xóa nhà xuất bản theo mã
async function deleteNhaXuatBan(req, res) {
    try {
        const id = req.params.id;
        const result = await NhaXuatBanService.deleteNhaXuatBan(id);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Nhà xuất bản đã được xóa thành công!',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nhà xuất bản không tồn tại!',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
}

module.exports = {
    addNhaXuatBan,
    getAllNhaXuatBan,
    getNhaXuatBanById,
    updateNhaXuatBan,
    deleteNhaXuatBan,
};
