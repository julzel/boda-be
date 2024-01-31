const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const router = express.Router();
const socket = require('../socket');

// AWS S3 configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

// Multer config for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size (example: 5MB)
  },
});

// POST /api/upload
router.post('/', upload.array('files'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No image files were uploaded.' });
  }

  try {
    const uploadPromises = req.files.map((file) => {
      const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: Date.now() + '_' + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      return s3.upload(s3Params).promise();
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Here you would typically store the image metadata in MongoDB,
    // including the S3 file URL and any associated hashtags.
    const io = socket.getIO();
    io.emit('imageUploaded', uploadResults); // Adjust as per your data structure

    res
      .status(200)
      .json({ message: 'Images uploaded successfully!', data: uploadResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading images.' });
  }
});

module.exports = router;
