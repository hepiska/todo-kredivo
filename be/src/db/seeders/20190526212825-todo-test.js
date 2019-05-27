"use strict"

const todoData = [
  {
    title: "makan",
    note: "makan harus dilakukan untuk kesehatan tubuh",
    priority: 1,
    isDone: false,
    user_id: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "main game",
    note: "kalo masih ada waktu main",
    priority: 3,
    user_id: 1,
    isDone: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "main game 2",
    note: "kalo masih ada waktu main",
    priority: 3,
    user_id: 2,
    isDone: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Todos", todoData, {})
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete("Todos", todoData, {})
  }
}
