const DocGia = require('../model/docGia.model');

// Thêm mới một độc giả
async function addDocGia(data) {
    try {
        const existingDocGia = await DocGia.findOne({ maDocGia: data.maDocGia });
        if (existingDocGia) {
            return { success: false, message: 'Mã độc giả đã tồn tại.' };
        }
        const docGia = new DocGia(data);
        await docGia.save();
        return { success: true, data: docGia, message: 'Độc giả đã được thêm thành công!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Lấy tất cả độc giả
async function getAllDocGia() {
    try {
        const docGias = await DocGia.find();
        return { success: true, data: docGias };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Lấy độc giả theo ID
async function getDocGiaById(id) {
    try {
        const docGia = await DocGia.findById(id);
        if (!docGia) return { success: false, message: 'Độc giả không tồn tại!' };
        return { success: true, data: docGia };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Cập nhật thông tin độc giả
async function updateDocGia(id, updatedData) {
    try {
        const docGia = await DocGia.findByIdAndUpdate(id, updatedData, { new: true });
        if (!docGia) return { success: false, message: 'Độc giả không tìm thấy!' };
        return { success: true, data: docGia, message: 'Độc giả đã được cập nhật thành công!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Xóa độc giả
async function deleteDocGia(id) {
    try {
        const docGia = await DocGia.findByIdAndDelete(id);
        if (!docGia) return { success: false, message: 'Độc giả không tồn tại!' };
        return { success: true, message: 'Độc giả đã được xóa thành công!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = {
    addDocGia,
    getAllDocGia,
    getDocGiaById,
    updateDocGia,
    deleteDocGia
};
