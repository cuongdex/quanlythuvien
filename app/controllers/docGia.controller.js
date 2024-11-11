const DocGiaService = require('../services/docGia.service');

async function addDocGia(req, res) {
    const result = await DocGiaService.addDocGia(req.body);
    return res.status(result.success ? 201 : 500).json(result);
}

async function getAllDocGia(req, res) {
    const result = await DocGiaService.getAllDocGia();
    return res.status(result.success ? 200 : 500).json(result);
}

async function getDocGiaById(req, res) {
    const result = await DocGiaService.getDocGiaById(req.params.id);
    return res.status(result.success ? 200 : 404).json(result);
}

async function updateDocGia(req, res) {
    const result = await DocGiaService.updateDocGia(req.params.id, req.body);
    return res.status(result.success ? 200 : 404).json(result);
}

async function deleteDocGia(req, res) {
    const result = await DocGiaService.deleteDocGia(req.params.id);
    return res.status(result.success ? 200 : 404).json(result);
}

module.exports = {
    addDocGia,
    getAllDocGia,
    getDocGiaById,
    updateDocGia,
    deleteDocGia
};
