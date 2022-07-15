'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({product}) {
     this.belongsTo(product , {foreignKey : "productId"})
    }
  }
  purchase.init({
    purchased_quantity: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate:{
        notNull: {msg : 'purchased_quantity field can not be null'},
        notEmpty: {msg : 'purchased_quantity field can not be empty'}
      }
    },
    purchased_price_per_piece: {
      type: DataTypes.DOUBLE,
      allowNull: false  
    }
  }, {
    sequelize,
    modelName: 'purchase',
  });
  return purchase;
};