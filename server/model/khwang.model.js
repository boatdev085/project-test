module.exports = (sequelize, Sequelize) => {
  const Khwang = sequelize.define("khwang", {
    khwang_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    province_id: {
      type: Sequelize.INTEGER,
    },
    khet_id: {
      type: Sequelize.INTEGER,
    },
    khwang_name: {
      type: Sequelize.STRING,
    },
    zipcode: {
      type: Sequelize.STRING,
    },
  });

  return Khwang;
};
