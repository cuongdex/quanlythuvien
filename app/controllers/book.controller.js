const bookService = require('../services/book.service');

// Thêm sách mới
async function addBook(req, res) {
    try {
        const bookData = req.body;
        const result = await bookService.addBook(bookData);
        if (result.success) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json({ success: false, message: result.message });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Lấy thông tin tất cả sách
async function getAllBooks(req, res) {
    try {
        const books = await bookService.getAllBooks();
        return res.status(200).json({ success: true, data: books });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Lấy thông tin sách theo mã sách
async function getBookById(req, res) {
    try {
        const { id } = req.params;
        const book = await bookService.getBookById(id);
        if (book) {
            return res.status(200).json({ success: true, data: book });
        } else {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Sửa thông tin sách
async function updateBook(req, res) {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const result = await bookService.updateBook(id, updatedData);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ success: false, message: result.message });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Xóa sách
async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        const result = await bookService.deleteBook(id);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ success: false, message: result.message });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
