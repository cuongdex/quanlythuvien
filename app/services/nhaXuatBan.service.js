const NhaXuatBan = require('../model/nhaXuatBan.model');
// Thêm một nhà xuất bản mới
async function addNhaXuatBan(data) {
    try {
        const nhaXuatBan = new NhaXuatBan(data);
        await nhaXuatBan.save();  // Lưu nhà xuất bản vào cơ sở dữ liệu
        return { success: true, data: nhaXuatBan, message: 'Nhà xuất bản đã được thêm thành công!' };
    } catch (error) {
        return { success: false, message: `Lỗi khi thêm nhà xuất bản: ${error.message}` };
    }
}

// Lấy tất cả các nhà xuất bản
async function getAllNhaXuatBan() {
    try {
        const nhaXuatBans = await NhaXuatBan.find();  // Tìm tất cả nhà xuất bản trong cơ sở dữ liệu
        return { success: true, data: nhaXuatBans };
    } catch (error) {
        return { success: false, message: `Lỗi khi lấy danh sách nhà xuất bản: ${error.message}` };
    }
}

// Lấy nhà xuất bản theo mã
async function getNhaXuatBanById(id) {
    try {
        const nhaXuatBan = await NhaXuatBan.findById(id);  // Tìm nhà xuất bản theo ID
        if (!nhaXuatBan) {
            return { success: false, message: 'Nhà xuất bản không tồn tại!' };
        }
        return { success: true, data: nhaXuatBan };
    } catch (error) {
        return { success: false, message: `Lỗi khi tìm nhà xuất bản: ${error.message}` };
    }
}

// Cập nhật thông tin nhà xuất bản theo mã
async function updateNhaXuatBan(id, updatedData) {
    try {
        const nhaXuatBan = await NhaXuatBan.findByIdAndUpdate(id, updatedData, { new: true });
        if (!nhaXuatBan) {
            return { success: false, message: 'Nhà xuất bản không tìm thấy!' };
        }
        return { success: true, data: nhaXuatBan, message: 'Nhà xuất bản đã được cập nhật thành công!' };
    } catch (error) {
        return { success: false, message: `Lỗi khi cập nhật nhà xuất bản: ${error.message}` };
    }
}

// Xóa nhà xuất bản theo mã
async function deleteNhaXuatBan(id) {
    try {
        const nhaXuatBan = await NhaXuatBan.findByIdAndDelete(id);  // Xóa nhà xuất bản theo ID
        if (!nhaXuatBan) {
            return { success: false, message: 'Nhà xuất bản không tồn tại!' };
        }
        return { success: true, message: 'Nhà xuất bản đã được xóa thành công!' };
    } catch (error) {
        return { success: false, message: `Lỗi khi xóa nhà xuất bản: ${error.message}` };
    }
}

module.exports = {
    addNhaXuatBan,
    getAllNhaXuatBan,
    getNhaXuatBanById,
    updateNhaXuatBan,
    deleteNhaXuatBan
};
