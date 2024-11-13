const NhanVienService = require('../services/nhanVien.service');

// Thêm nhân viên
async function addNhanVien(req, res) {
    const result = await NhanVienService.addNhanVien(req.body);
    res.status(result.success ? 201 : 400).json(result);
}

// Lấy danh sách tất cả nhân viên
async function getAllNhanVien(req, res) {
    const result = await NhanVienService.getAllNhanVien();
    res.status(result.success ? 200 : 400).json(result);
}

// Tìm nhân viên theo mã
async function getNhanVienById(req, res) {
    const { maNhanVien } = req.params;
    const result = await NhanVienService.getNhanVienById(maNhanVien);
    res.status(result.success ? 200 : 404).json(result);
}

// Cập nhật nhân viên
async function updateNhanVien(req, res) {
    const { maNhanVien } = req.params;
    const result = await NhanVienService.updateNhanVien(maNhanVien, req.body);
    res.status(result.success ? 200 : 400).json(result);
}

// Xóa nhân viên
async function deleteNhanVien(req, res) {
    const { maNhanVien } = req.params;
    const result = await NhanVienService.deleteNhanVien(maNhanVien);
    res.status(result.success ? 200 : 404).json(result);
}

module.exports = {
    addNhanVien,
    getAllNhanVien,
    getNhanVienById,
    updateNhanVien,
    deleteNhanVien
};
