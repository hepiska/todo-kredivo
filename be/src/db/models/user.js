"use strict"

import bcrypt from "bcrypt"
const saltRounds = Number(process.env.SALTROUND)


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING
  },
    {
      hooks: {
        beforeCreate: (user, options) => {
          const pswdHashed = bcrypt.hashSync(user.password, saltRounds)

          user.password = pswdHashed
        },
      }

    })

  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Todo, { as: "Todo", foreignKey: "user_id" })
  }

  return User
}
