const MuonTraSachService = require('../services/muonTraSach.service');

async function muonSach(req, res) {
    try {
        const data = req.body;
        const result = await MuonTraSachService.muonSach(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function traSach(req, res) {
    try {
        const { maDocGia, maSach } = req.body;
        const result = await MuonTraSachService.traSach(maDocGia, maSach);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


async function traCuuThongTinMuon(req, res) {
    try {
        const maDocGia = req.params.maDocGia; // Đảm bảo lấy đúng tham số
        const result = await MuonTraSachService.traCuuThongTinMuon(maDocGia);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
module.exports = {
    muonSach,
    traSach,
    traCuuThongTinMuon
};
