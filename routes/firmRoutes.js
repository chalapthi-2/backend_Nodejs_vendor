// const express  = require('express');
// const firmController = require('../controllers/firmController');
// const verifyToken = require('../middleware/verifyToken'); 
// const path = require('path');

// const router = express.Router()

// router.post('/add-firm',verifyToken,firmController.addFirm);

// router.get('/uploads/:imageName',(req,res)=>{
//     const imageName = req.params.imageName;
//     res.headersSent('Content-Type','image/jpeg');
//     res.sendFile(Path2D.join(__dirname,'..','uploads',imageName));
// })

// module.exports = router;


const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middleware/verifyToken');
const path = require('path');
const mime = require('mime-types'); // For dynamic MIME type detection

const router = express.Router();

router.post('/add-firm', verifyToken, firmController.addFirm);

// Serve uploaded images with correct MIME type
router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '..', 'uploads', imageName);

  // Detect MIME type from file extension
  const mimeType = mime.lookup(imagePath) || 'application/octet-stream';
  res.set('Content-Type', mimeType);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Error sending image:', err);
      res.status(err.status || 500).json({ error: 'Image not found' });
    }
  });
});

router.delete('/:firmId',firmController.deleteFirmById);

module.exports = router;
