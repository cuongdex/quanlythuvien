const Book = require('../model/book.model');

// Thêm một sách mới
async function addBook(bookData) {
    try {
        const book = new Book(bookData);
        await book.save();
        return { success: true, data: book, message: 'Book added successfully!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Sửa thông tin sách dựa trên mã sách (MaSach)
async function updateBook(maSach, updatedData) {
    try {
        const book = await Book.findOneAndUpdate({ MaSach: maSach }, updatedData, { new: true });
        if (!book) {
            return { success: false, message: 'Book not found' };
        }
        return { success: true, data: book, message: 'Book updated successfully!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Xóa một sách dựa trên mã sách (MaSach)
async function deleteBook(maSach) {
    try {
        const book = await Book.findOneAndDelete({ MaSach: maSach });
        if (!book) {
            return { success: false, message: 'Book not found' };
        }
        return { success: true, message: 'Book deleted successfully!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Lấy tất cả sách
async function getAllBooks() {
    try {
        // Tìm tất cả sách trong cơ sở dữ liệu
        const books = await Book.find();  
        return books;  // Trả về danh sách sách
    } catch (error) {
        // Ném lỗi với thông báo chi tiết
        throw new Error(`Failed to fetch books: ${error.message}`); 
    }
}

// Lấy thông tin sách theo ID
async function getBookById(bookId) {
    try {
        const book = await Book.findById(bookId);  // Tìm sách theo ID
        if (!book) {
            throw new Error('Book not found'); // Nếu không tìm thấy sách
        }
        return book;  // Trả về thông tin sách nếu tìm thấy
    } catch (error) {
        throw new Error(error.message); // Ném lỗi nếu có vấn đề trong quá trình truy vấn
    }
}

// Export các hàm
module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
