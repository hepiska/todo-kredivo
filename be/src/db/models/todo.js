"use strict"

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    title: DataTypes.STRING,
    note: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {})

  Todo.associate = models => {
    // associations can be defined here
    Todo.belongsTo(models.User, { foreignKey: "user_id" })
  }

  return Todo
}
