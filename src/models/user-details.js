module.exports = (sequalize, Sequelize) => {
  return sequalize.define("users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
