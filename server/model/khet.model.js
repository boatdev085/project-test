module.exports = (sequelize, Sequelize) => {
  const Khet = sequelize.define("khet", {
    khet_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    province_id: {
      type: Sequelize.INTEGER,
    },
    khet_name: {
      type: Sequelize.STRING,
    },
  });

  return Khet;
};
