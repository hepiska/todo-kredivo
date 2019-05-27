/* eslint-disable*/

const chai = require("chai")
const should = chai.should()
const expect = chai.expect
const model = require('../src/db/models')
const Op = require('sequelize').Op
const { todo: todoDA } = require('../src/dataAccess')


beforeEach(async () => {
  model.Todo.destroy({
    where: {
      id: { [Op.gt]: 3 }
    }
  })
})

describe("todo get", () => {
  it("responds with matching records", async () => {
    try {
      const todos = await todoDA.getByUser(1, {})
      expect(todos).to.have.lengthOf(2)
      const filter = { title: { [Op.iLike]: '%mak%' } }
      const todo2 = await todoDA.getByUser(1, { filter })

      expect(todo2).to.have.lengthOf(1)
    } catch (error) {
      console.log(error)
    }
  })
  it("get single data with matching records", async () => {
    try {
      const todo = await todoDA.findOne(1)
      expect(todo).to.have.property('id')

    } catch (error) {
      console.log(error)
    }
  })
  it("it error when no ecpected id", async () => {
    todoDA.findOne(5).then(() => console.log()).catch(err => {
      expect(err).to.be.a('error')
    })
    // expect(todo).to.throw()
  })
})

describe("todo create", () => {
  it("create succesful", async () => {
    try {
      const data = {
        title: "work",
        note: "makan harus dilakukan untuk kesehatan tubuh",
        priority: 1,
        isDone: false,
        user_id: 1,
      }
      const todos = await todoDA.create(data)
      expect(todos).to.have.property('id')
    } catch (error) {
      console.log(error)
    }
  })
  it("create fail", async () => {
    try {
      const data = {
        note: "makan harus dilakukan untuk kesehatan tubuh",
        priority: 1,
        isDone: false,
        user_id: 1,
      }
      const todos = await todoDA.create(data)

    } catch (error) {
      expect(error).to.be.a('error')
    }
  })

})
