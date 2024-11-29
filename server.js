const express = require('express');
const multer = require('multer');
const path = require('path');
const { ocr } = require('llama-ocr');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Configure EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Routes
app.get('/', (req, res) => {
  res.render('index', { result: null, error: null });
});

app.post('/convert', upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path; // Path to the uploaded file
    const markdown = await ocr({
      filePath: filePath,
      apiKey: process.env.TOGETHER_API_KEY,
    });

    // Send result to the frontend
    res.render('index', { result: markdown, error: null });
  } catch (error) {
    console.error('Error during OCR:', error);
    res.render('index', { result: null, error: 'Failed to convert image to text.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
