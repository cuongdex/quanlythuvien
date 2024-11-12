const TheoDoiMuonSach = require('../model/TheoDoiMuonSach.model');
const DocGia = require('../model/docGia.model');
const Sach = require('../model/book.model');

// Mượn sách
async function muonSach(data) {
   
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
    
    const docGia = await DocGia.findOne({ MaDocGia: maDocGia });
    const sach = await Sach.findOne({ MaSach: maSach });
    const theoDoi = await TheoDoiMuonSach.findOne({ maDocGia:maDocGia, maSach:maSach, ngayTra: null });

    if (!docGia) throw new Error('Độc giả không tồn tại.');
    if (!sach) throw new Error('Sách không tồn tại.');
    if (!theoDoi) throw new Error('Lịch sử mượn sách không tồn tại hoặc đã được trả.');

    // Cập nhật ngày trả và số lượng sách
    theoDoi.ngayTra = new Date();
    sach.SoQuyen += 1;
    await sach.save();
    await theoDoi.save();

    return { success: true, message: 'Trả sách thành công' };
}

async function traCuuThongTinMuon(maDocGia) {
    try {
        const docGia = await DocGia.findOne({ MaDocGia: maDocGia });
        if (!docGia) throw new Error('Độc giả không tồn tại.');
        const thongTinMuon = await TheoDoiMuonSach.find({ maDocGia: maDocGia , ngayTra: null})

        if (thongTinMuon.length === 0) {
            return { success: true, message: 'Không có lịch sử mượn sách nào.', data: [] };
        }
        let  = tongTienMuon = 0;
        for (const item of thongTinMuon) {
            // Tìm cuốn sách với mã sách tương ứng
            const SachMuon = await Sach.findOne({ MaSach: item.maSach });
        
            if (SachMuon) {
                // Cộng giá của cuốn sách vào tổng tiền mượn
                tongTienMuon += SachMuon.DonGia;
            }
        }
        return { 
            success: true, 
            data: thongTinMuon, 
            tongTienMuon,
            message: `Tổng số tiền mượn là ${tongTienMuon} VND.` 
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = {
    muonSach,
    traSach,
    traCuuThongTinMuon
};
