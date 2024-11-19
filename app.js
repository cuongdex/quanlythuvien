const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const nhaXuatBanRouter = require('./app/routes/nhaXuatBan.routes');
const bookRouter = require("./app/routes/book.routes");
const docGiaRouter = require('./app/routes/docGia.routes');
const muonTraSachRouter = require('./app/routes/muonTraSach.routes');
const nhanVienRouter = require('./app/routes/nhanVien.routes');
const authRouter = require('./app/routes/auth.routes'); 
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", nhaXuatBanRouter); 
app.use("/api", bookRouter); 
app.use("/api", docGiaRouter); 
app.use("/api", muonTraSachRouter);
app.use("/api", nhanVienRouter);
app.use('/api', authRouter); 


app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Book Management API" });
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
