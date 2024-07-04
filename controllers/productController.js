const Product = require('../models/Product');
const { v4: uuidv4 } = require('uuid');
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
const { useFileDb } = require('../config/config');
const path = require('path');
const { successResponse, errorResponse } = require('../utils/responseUtils');

const getFilePath = (fileName) => path.join(__dirname, '..', 'data', fileName);

exports.createProduct = async (req, res) => {
  const productInfo = req.body;

  if (useFileDb) {
    try {
      const filePath = getFilePath('products.json');
      console.log("File path:", filePath);

      const products = await readJSONFile(filePath);
      console.log("Products from file:", products);

      const newProduct = {
        id: uuidv4(),
        ...productInfo
      };
      console.log("New Product:", newProduct);

      products.push(newProduct);
      await writeJSONFile(filePath, products);

      res.status(201).json(successResponse(newProduct, 'Product created successfully'));
    } catch (err) {
      console.error("Error creating product (file):", err);
      res.status(500).json(errorResponse(err, 'Server error'));
    }
  } else {
    try {
      const newProduct = new Product({
        ...productInfo
      });
      await newProduct.save();

      res.status(201).json(successResponse(newProduct, 'Product created successfully'));
    } catch (err) {
      console.error("Error creating product (database):", err);
      res.status(500).json(errorResponse(err, 'Server error'));
    }
  }
};

exports.getProducts = async (req, res) => {
  if (useFileDb) {
    try {
      const filePath = getFilePath('products.json');
      const products = await readJSONFile(filePath);
      res.status(200).json(successResponse(products));
    } catch (err) {
      res.status(500).json(errorResponse(err, 'Server error'));
    }
  } else {
    try {
      const products = await Product.find();
      res.status(200).json(successResponse(products));
    } catch (err) {
      res.status(500).json(errorResponse(err, 'Server error'));
    }
  }
};
