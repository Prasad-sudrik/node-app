const fs = require("fs");
const model = require("../model/product");
const Product = model.Product;
const mongoose = require("mongoose");
// const index= fs.readFileSync('index.html','utf-8');

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product
    .save()
    .then((savedDoc) => {
      console.log(savedDoc);
      res.status(201).json(savedDoc);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const product = await Product.findById(id);
    //   .then(success=>{console.log(success)});
    console.log(product);
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  console.log(update);
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    res.status(201).json(doc);
    console.log(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id })
    res.status(201).json(doc);
    console.log(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
