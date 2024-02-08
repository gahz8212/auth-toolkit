const express = require("express");
const router = express.Router();
const { Good } = require("../models");
router.post("/input", async (req, res) => {
  try {
    const { order } = req.body;
    // console.log(order);
    const result=await Good.bulkCreate(order);
    return res.status(200).json("order input ok");
  } catch (e) {
    console.error(e);
    return res.status(400).json(e.message);
  }
});
module.exports = router;
