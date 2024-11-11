const TheoDoiMuonSach = require('../model/TheoDoiMuonSach.model');
const DocGia = require('../model/docGia.model');
const Sach = require('../model/book.model');

// Mượn sách
async function muonSach(data) {
    // console.log(data);
    
    const docGia = await DocGia.findOne({ MaDocGia: data.maDocGia });
    const sach = await Sach.findOne({ MaSach: data.maSach });


    if (!docGia) throw new Error('Độc giả không tồn tại.');
    if (!sach) throw new Error('Sách không tồn tại hoặc không có sẵn.');
    
    if (sach.SoQuyen <= 0) throw new Error('Sách này đã hết.');

    const theoDoi = new TheoDoiMuonSach(data);

    sach.SoQuyen -= 1;
    await sach.save();
    await theoDoi.save();

    return { success: true, message: 'Mượn sách thành công' };
}

// Trả sách
async function traSach(maDocGia, maSach) {
    const docGia = await DocGia.findOne({ maDocGia });
    const sach = await Sach.findOne({ maSach });
    const theoDoi = await TheoDoiMuonSach.findOne({ maDocGia, maSach, ngayTra: null });

    if (!docGia) throw new Error('Độc giả không tồn tại.');
    if (!sach) throw new Error('Sách không tồn tại.');
    if (!theoDoi) throw new Error('Lịch sử mượn sách không tồn tại hoặc đã được trả.');

    // Cập nhật ngày trả và số lượng sách
    theoDoi.ngayTra = new Date();
    sach.soQuyen += 1;
    await sach.save();
    await theoDoi.save();

    return { success: true, message: 'Trả sách thành công' };
}

// Tra cứu thông tin mượn của một độc giả
async function traCuuThongTinMuon(maDocGia) {
    
    const docGia = await DocGia.findOne({ MaDocGia:maDocGia });
    if (!docGia) throw new Error('Độc giả không tồn tại.');

    // Lấy tất cả bản ghi mượn sách của độc giả này
    const thongTinMuon = await TheoDoiMuonSach.find({ maDocGia:maDocGia});
    
    if (thongTinMuon.length === 0) {
        return { success: true, message: 'Không có lịch sử mượn sách nào.', data: [] };
    }
    return { success: true, data: thongTinMuon };
}

module.exports = {
    muonSach,
    traSach,
    traCuuThongTinMuon
};
