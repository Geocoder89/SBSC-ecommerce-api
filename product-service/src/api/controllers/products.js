const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const Product = require("../../models/product");

//create functionality

exports.getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error);
  }
});

// get single product
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`No product with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// create product
exports.createProduct = asyncHandler(async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product successfully created",
    });
  } catch (error) {
    console.log(error);
  }
});

// update product

exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(`No product with the id of ${req.params.id}`, 404)
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: product,
    message: `Product successfully updated`,
  });
});

// delete product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // check if the products exist

  if (!product) {
    return next(
      new ErrorResponse(
        `Product not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  product.remove();

  res.status(200).json({
    success: true,
    message: "Product was deleted successfully!",
    data: {},
  });
});
