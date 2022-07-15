'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({purchase}) {
      this.hasMany(purchase , {foreignKey: "productId"})
    }
  }
  product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg : 'name field can not be null'},
        notEmpty: {msg : 'name field can not be empty'}
      }
    },
    description: {
      type : DataTypes.STRING,
    },
    quantity_on_stoc: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {msg : 'quantity_on_stoc field can not be null'},
        notEmpty: {msg : 'quantity_on_stoc field can not be empty'}
      }
    }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};