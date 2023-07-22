import express from 'express';
import multer from 'multer';
import { isAdmin, isAuth } from '../utils.js';
import path from 'path';
import { uuid } from 'uuidv4';
import Product from '../models/productModel.js';

const uploadRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../images');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

uploadRouter.post(
  '/',
  isAuth,
  isAdmin,
  upload.single('file'),
  async (req, res) => {
    const image = req.file.filename;
    const newProductData = {
      image,
    };
    await Product.deleteOne({ image: { slug: 'iPhone-14' } });
    await Product.insertOne(image)
      .then(() => res.json('User Added'))
      .catch((err) => res.status(400).json('Error: ' + err));
  }
);
export default uploadRouter;
