const Product = require('../models/Product');
const { readJSONFile, writeJSONFile } = require('../utils/fileUtils');
const { useFileDb } = require('../config/config');
const path = require('path');

const getFilePath = (fileName) => path.join(__dirname, '..', 'data', fileName);

exports.createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  
  if (useFileDb) {
    try {
      const filePath = getFilePath('products.json');
      const products = await readJSONFile(filePath);
      const newProduct = { name, description, price, category, stock };
      products.push(newProduct);
      await writeJSONFile(filePath, products);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  } else {
    try {
      const newProduct = new Product({ name, description, price, category, stock });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  }
};

exports.getProducts = async (req, res) => {
  if (useFileDb) {
    try {
      const filePath = getFilePath('products.json');
      const products = await readJSONFile(filePath);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  } else {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  }
};
