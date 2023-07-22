import express from 'express';
import multer from 'multer';
import { isAdmin, isAuth } from '../utils.js';
import path from 'path';
import { uuid } from 'uuidv4';
import Product from '../models/productModel.js';

const uploadRouter = express.Router();
var uniqueId = uuid();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/images');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

uploadRouter.post('/', isAuth, isAdmin, upload.single('file'), (req, res) => {
  Product.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
export default uploadRouter;
