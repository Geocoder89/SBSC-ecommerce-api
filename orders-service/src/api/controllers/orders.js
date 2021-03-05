const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");
const Order = require("../../models/order");
const mongoose = require("mongoose");
const axios = require("axios");

// find all functionality

exports.getOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find().select("productId qty _id");

    return res.status(200).json({
      success: true,
      data: orders.map((order) => {
        return {
          _id: order._id,
          productId: order.productId,
          qty: order.qty,
        };
      }),
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});
//create functionality

exports.addOrderItems = asyncHandler(async (req, res, next) => {
  const order = new Order({
    qty: req.body.qty,
    productId: mongoose.Types.ObjectId(req.body.productId),
  });

  const createdOrder = await order.save();

  return res.status(201).json({
    success: true,
    message: "Order successfully created",
    data: createdOrder,
  });
});

// get single product which interacts with the product service api to get the name and price as well as the quantity of the product ordered for.

exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    axios
      .get(`http://localhost:3000/api/v1/products/${order.productId}`)
      .then((response) => {
        const orderObject = {
          productName: response.data.data.name,
          price: response.data.data.price,
          qty: order.qty,
        };
        res.status(200).json({
          success: true,
          data: orderObject,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }
});

// delete functionality

exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  // check if the products exist

  if (!order) {
    return next(
      new ErrorResponse(
        `Product not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  order.remove();

  res.status(200).json({
    success: true,
    message: "Order was deleted successfully!",
    data: {},
  });
});
