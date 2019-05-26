"use strict"

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    note: DataTypes.TEXT,
    isDone: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.INTEGER
    },
    priority: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER
  }, {})

  Todo.associate = models => {
    // associations can be defined here
    Todo.belongsTo(models.User, { foreignKey: "user_id" })
  }

  return Todo
}
