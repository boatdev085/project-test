module.exports = (sequelize, Sequelize) => {
  const Province = sequelize.define("province", {
    province_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    province_name: {
      type: Sequelize.STRING,
    },
  });

  return Province;
};
