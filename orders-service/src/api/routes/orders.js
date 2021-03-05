const express = require("express");

const router = express.Router();

const {
  addOrderItems,
  getOrders,
  getOrder,
  deleteOrder,
} = require("../controllers/orders");

router.get("/", getOrders);
router.post("/", addOrderItems);
router.get("/:id", getOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
