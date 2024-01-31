const request = require('supertest');
const app = require('../src/app');
const AWS = require('aws-sdk');

// Mock the S3 service
jest.mock('aws-sdk', () => {
  const mockS3Instance = {
    upload: jest.fn().mockImplementation((params, callback) => {
      // Simulate successful S3 upload using a callback if provided
      if (callback && typeof callback === 'function') {
        callback(null, { Location: 'https://example-bucket.s3.amazonaws.com/fake-image.jpg' });
      } else {
        // If no callback provided, return a promise
        return {
          promise: jest.fn().mockResolvedValue({ Location: 'https://example-bucket.s3.amazonaws.com/fake-image.jpg' }),
        };
      }
    }),
  };

  return {
    S3: jest.fn(() => mockS3Instance),
  };
});

describe('Image Upload API', () => {
  describe('POST /api/upload', () => {
    it('should accept image uploads', async () => {
      const res = await request(app)
        .post('/api/upload')
        .attach('files', '__tests__/fixtures/sample-image.jpg') // Adjust path to your test image
        .field('hashtags', 'wedding fun')
        .expect(200);

      expect(res.body).toEqual(expect.objectContaining({
        message: 'Images uploaded successfully!',
        data: expect.any(Array),
      }));
    });

    it('should handle missing image files gracefully', async () => {
      const res = await request(app)
        .post('/api/upload')
        .field('hashtags', 'wedding fun')
        .expect(400); // Bad request due to missing files

      expect(res.body).toEqual(expect.objectContaining({
        error: expect.any(String),
      }));
    });

    // Additional tests...
  });

  // More tests for other functionalities can be added here
});
