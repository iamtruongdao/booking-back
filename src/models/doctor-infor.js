"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_infor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor_infor.belongsTo(models.User, { foreignKey: "doctorId" });
      Doctor_infor.belongsTo(models.Allcode, {
        targetKey: "keyMap",
        foreignKey: "priceId",
        as: "priceTypeData",
      });
      Doctor_infor.belongsTo(models.Allcode, {
        targetKey: "keyMap",
        foreignKey: "provinceId",
        as: "provinceTypeData",
      });
      Doctor_infor.belongsTo(models.Allcode, {
        targetKey: "keyMap",

        foreignKey: "paymentId",
        as: "paymentTypeData",
      });
    }
  }
  Doctor_infor.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_infor",
    }
  );
  return Doctor_infor;
};
