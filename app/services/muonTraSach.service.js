const TheoDoiMuonSach = require('../model/TheoDoiMuonSach.model');
const DocGia = require('../model/docGia.model');
const Sach = require('../model/book.model');

async function getAll() {
    try {
        const haha = await TheoDoiMuonSach.find();
        const TenDocGiaList = []; // Mảng để lưu trữ tên độc giả
        
        for (let item of haha) {
            let TenDocGia = await DocGia.find({ MaDocGia: item.maDocGia });
            if (TenDocGia.length > 0) {
                TenDocGiaList.push(TenDocGia[0].Ten); // Lưu tên độc giả vào mảng
            } else {
                TenDocGiaList.push(null); // Nếu không tìm thấy, thêm null vào mảng
            }
        }
        
        return { success: true, data: haha, Ten: TenDocGiaList };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

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

async function traSach(maDocGia) {
    // Tìm độc giả
    const docGia = await DocGia.findOne({ MaDocGia: maDocGia });
    if (!docGia) throw new Error('Độc giả không tồn tại.');

    // Tìm lịch sử mượn sách chưa được trả
    const theoDoi = await TheoDoiMuonSach.findOne({ maDocGia: maDocGia, ngayTra: null });
    if (!theoDoi) throw new Error('Lịch sử mượn sách không tồn tại hoặc đã được trả.');

    // Lưu thông tin sách mượn để cập nhật
    for (const item of theoDoi.dsSach) {
        const sach = await Sach.findOne({ MaSach: item.maSach });
        if (!sach) throw new Error(`Sách với mã ${item.maSach} không tồn tại.`);
        
        // Cập nhật số lượng sách khi trả
        sach.SoQuyen += 1;
        await sach.save();
    }

    // Cập nhật ngày trả sách
    theoDoi.ngayTra = new Date();
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
        let tongTienMuon = 0;
        const dsSach = thongTinMuon.flatMap(item => item.dsSach);

        // console.log("Danh sách sách đã mượn:", dsSach);

        for (const item of dsSach) {
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

// Mượn nhiều sách (mỗi sách 1 quyển)
async function muonNhieuSach(maDocGia, danhSachSach) {
    try {
        // Kiểm tra độc giả có tồn tại không
        const docGia = await DocGia.findOne({ MaDocGia: maDocGia });
        if (!docGia) {
            throw new Error('Độc giả không tồn tại.');
        }

        // Kiểm tra từng sách và giảm số lượng
        const dsSachMuon = [];
        for (const item of danhSachSach) {
            console.log(item.maSach);
            
            const sach = await Sach.findOne({ MaSach: item.maSach });
            
            
            if (!sach) {
                throw new Error(`Sách với mã ${item.maSach} không tồn tại.`);
            }
            if (sach.SoQuyen < 1) {
                throw new Error(`Sách ${sach.TenSach} không còn trong kho.`);
            }

            // Giảm số lượng sách
            sach.SoQuyen -= 1;
            await sach.save()
            
            dsSachMuon.push({ maSach:  item.maSach  });
        }
        
        console.log(dsSachMuon);
        
        const ngayMuon = new Date();
        const theoDoiMuon = new TheoDoiMuonSach({
            maDocGia,
            dsSach: dsSachMuon,
            ngayMuon
        });

        await theoDoiMuon.save();
        return { success: true, message: 'Mượn sách thành công!', data: theoDoiMuon };
    } catch (error) {
        return { success: false, message: error.message };
    }
}


module.exports = {
    muonSach,
    traSach,
    traCuuThongTinMuon,
    muonNhieuSach,
    getAll
};
