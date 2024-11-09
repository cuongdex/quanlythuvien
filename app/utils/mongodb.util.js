const mongoose = require('mongoose');

// Kết nối đến MongoDB mà không sử dụng các tùy chọn deprecated
async function connect(uri) {
    try {
        await mongoose.connect(uri); // Không cần dùng useNewUrlParser và useUnifiedTopology nữa
        // console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Dừng ứng dụng nếu không kết nối được
    }
}

module.exports = { connect };
