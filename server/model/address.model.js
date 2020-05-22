module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    address_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    province_id: {
      type: Sequelize.INTEGER,
    },
    khet_id: {
      type: Sequelize.INTEGER,
    },
    khwang_id: {
      type: Sequelize.INTEGER,
    },
  });

  return Address;
};
