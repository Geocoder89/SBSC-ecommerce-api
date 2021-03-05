const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  qty: {
    type: Number,
    default: 1,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
