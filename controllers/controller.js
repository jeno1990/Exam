const { product, purchase } = require("./../models");
const { Op } = require("sequelize");
const moment = require('moment')

const addProducts = async (req, res, next) => {
  const body = req.body;
  try {
    const result = await product.create(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const addPurchase = async (req, res, next) => {
  const productId = req.params["productId"];
  const { quantity, pricePerPiece } = req.body;

  try {
    console.log(productId);
    const productExists = await product.findOne({
      where : {
        id: productId,
      }
    });
    //check if product exists in the database
    if (!productExists) {
      let error = {
        status: 404,
        message: "the product does not exist in the database",
      };
      return next(error);
    }
    console.log("productExists : ", productExists)
    if (!quantity || !pricePerPiece) {
      let error = {
        status: 400,
        message: "the request should have contain required fields",
      };
      return next(error);
    }
    const result = await purchase.create({
      purchased_quantity: quantity,
      purchased_price_per_piece: pricePerPiece,
      productId: productId,
    });
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
  if(date1 || date2){
    if(date1 && !moment(date1).isValid()) return res.status(400).json({message : "invalid date format"});
    if(date2 && !moment(date2).isValid()) return res.status(400).json({message : "invalid date format"});
  }
  
  try {
    let result;
    if (date1 && !date2) {
      result = await product.findAll({
        include: purchase,
        offset: startPostion,
        where: {
          createdAt: {
            [Op.gte]: date1,
          },
        },
        limit: maxResult,
      });
    } else if (!date1 && date2) {
      result = await product.findAll({
        include: purchase,
        offset: startPostion,
        where: {
          createdAt: {
            [Op.lte]: date2,
          },
        },
        limit: maxResult,
      });
    } else if (!date1 && !date2) {
        result = await product.findAll({
            include: purchase,
            offset: startPostion,
            limit: maxResult,
          });
    } else {
      result = await product.findAll({
        include: purchase,
        offset: startPostion,
        where: {
          createdAt: {
            [Op.between]: [date1, date2],
          },
        },
        limit: maxResult,
      });
    }
    const len = result.length;
    res.status(200).json({
      product: result,
      totalCount: len,
      responseDto: {
        status: true,
        message: "product details successfully returned!",
      },
    });
  } catch (error) {}
};

module.exports = {
  addProducts,
  getProductDetail,
  addPurchase,
};
