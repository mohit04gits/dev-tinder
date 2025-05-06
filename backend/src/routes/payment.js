const express = require("express");
const razorpayInstance = require("../utils/razorpay");
const router = express.Router();
const Payment = require("../model/payment");
const { userAuth } = require("../middlewares/auth");
const membershipAmount = require("../utils/constants");

router.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#" + new Date().getTime(), // unique receipt
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });
    console.log(membershipType);
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Razorpay Order Creation Error:", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
