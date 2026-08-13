require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB ga ulanish
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB ga ulandik!'))
  .catch(err => console.log('MongoDB xatosi:', err));

// Talabalar sxemasi
// Talabalar sxemasi (Yosh qo'shildi)
const StudentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    age: String,   // Yangi qo'shildi
    course: String,
    registeredAt: { type: Date, default: Date.now }
});
const Student = mongoose.model('Student', StudentSchema);

// Ro'yxatdan o'tish API
app.post('/api/register', async (req, res) => {
    try {
        const { name, phone, age, course } = req.body;
        const newStudent = new Student({ name, phone, age, course });
        await newStudent.save();
        res.json({ success: true, message: "Tabriklaymiz! Muvaffaqiyatli ro'yxatdan o'tdingiz!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Xatolik yuz berdi." });
    }
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server http://localhost:${PORT} da ishlamoqda`));