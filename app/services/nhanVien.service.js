const NhanVien = require('../model/nhanVien.model');

// Thêm nhân viên mới
async function addNhanVien(data) {
    try {
        console.log(data.MSNV);
        
        const existingNhanVien = await NhanVien.findOne({ MSNV: data.MSNV });
        if (existingNhanVien) {
            throw new Error('Mã nhân viên đã tồn tại.');
        }
        const nhanVien = new NhanVien(data);
        await nhanVien.save();
        return { success: true, data: nhanVien, message: 'Nhân viên đã được thêm thành công!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Lấy danh sách tất cả nhân viên
async function getAllNhanVien() {
    try {
        const nhanViens = await NhanVien.find();
        return { success: true, data: nhanViens };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Tìm nhân viên theo mã
async function getNhanVienById(maNhanVien) {
    try {
        const nhanVien = await NhanVien.findOne({ MSNV:maNhanVien });
        if (!nhanVien) {
            throw new Error('Nhân viên không tồn tại.');
        }
        return { success: true, data: nhanVien };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

async function updateNhanVien(maNhanVien, updatedData) {
    try {
        // Tìm nhân viên theo MSNV
        const nhanVien = await NhanVien.findOne({ MSNV: maNhanVien });
        if (!nhanVien) {
            throw new Error('Nhân viên không tồn tại.');
        }

        // Gán các giá trị cập nhật
        Object.assign(nhanVien, updatedData);

        // Lưu nhân viên (sẽ kích hoạt middleware pre('save'))
        await nhanVien.save();

        return { success: true, data: nhanVien, message: 'Thông tin nhân viên đã được cập nhật!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Xóa nhân viên
async function deleteNhanVien(maNhanVien) {
    try {
        const nhanVien = await NhanVien.findOneAndDelete({ MSNV:maNhanVien });
        if (!nhanVien) {
            throw new Error('Nhân viên không tồn tại.');
        }
        return { success: true, message: 'Nhân viên đã được xóa thành công!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = {
    addNhanVien,
    getAllNhanVien,
    getNhanVienById,
    updateNhanVien,
    deleteNhanVien
};
