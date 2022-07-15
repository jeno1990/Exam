const { product} = require("./../models");
const { Op } = require("sequelize");
const moment = require("moment");
const db = require("./../config/dbQuery");


//to add purchased products to the data base
const addPurchase = async (req, res, next) => {
  const productId = req.params["productId"];
  const { quantity, pricePerPiece } = req.body;

  try {
    const productExists = await db.findProductByid(productId)
    //check if product exists in the database
    if (!productExists) {
      let error = {
        status: 404,
        message: "the product does not exist in the database",
      };
      return next(error);
    }
    if (!quantity || !pricePerPiece) {
      let error = {
        status: 400,
        message: "the request should have contain required fields",
      };
      return next(error);
    }
    const result = await db.addPurchsed(quantity , pricePerPiece , productId)
    res.status(200).json({
      status: true,
      Message: "pruchased product created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

//get products detail
const getProductDetail = async (req, res, next) => {
  const { date1, date2, startPostion, maxResult } = req.body;
  if (date1 || date2) {
    if (date1 && !moment(date1).isValid())
      return res.status(400).json({ message: "invalid date format" });
    if (date2 && !moment(date2).isValid())
      return res.status(400).json({ message: "invalid date format" });
  }

  try {
    const result = await db.getProductDetail(
      date1,
      date2,
      startPostion,
      maxResult
    );
    const len = result.length;
    res.status(200).json({
      product: result,
      totalCount: len,
      responseDto: {
        status: true,
        message: "product details successfully returned!",
      },
    });
  } catch (error) {
    next(error);
  }
};

const addProducts = async (req, res, next) => {
  const body = req.body;
  try {
    const result = await product.bulkCreate(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProducts,
  getProductDetail,
  addPurchase,
};
