const { product, purchase } = require("./../models");
const { Op } = require("sequelize");

const getProductDetail = async (date1, date2, startPostion, maxResult) => {
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
  return result;
};

const findProductByid = async (pid) => {
  const productExists = await product.findOne({
    where: {
      id: pid,
    },
  });
  return productExists;
};

const addPurchsed = async (quantity , pricePerPiece, productId)=>{
    const result = await purchase.create({
        purchased_quantity: quantity,
        purchased_price_per_piece: pricePerPiece,
        productId: productId,
      });
      return result
}

module.exports = {
  getProductDetail,
  findProductByid,
  addPurchsed
};
