import joi from "@hapi/joi"
import { todo as todoDa } from "dataAccess"
import { Op } from "sequelize"

const createSchema = joi.object().keys({
  title: joi.string().min(1)
    .required(),
  isDone: joi.boolean().default(false),
  priority: joi.number().valid([1, 2, 3])
    .default(3),
  note: joi.string(),
})

const editSchema = joi.object().keys({
  title: joi.string().min(1),
  isDone: joi.boolean().default(false),
  priority: joi.number().valid([1, 2, 3]),
  note: joi.string(),
})

const readSchema = joi.object().keys({
  limit: joi.number().default(10),
  skip: joi.number().default(0),
  q: joi.string()
    .allow("")
    .trim(),
  sort: joi.number().default(0),
  filter: joi.string()
    .lowercase()
    .default("all"),
})


const todoControler = {
  create: async (req, res, next) => {
    try {
      await joi.validate(req.body, createSchema)
      const todoData = { ...req.body }

      todoData.user_id = req.user.id
      const todo = await todoDa.create(todoData)

      return res.json(todo)
    } catch (error) {
      return next(error)
    }
  },
  readByUser: async (req, res, next) => {
    try {
      const params = await joi.validate(req.query, readSchema, {
        stripUnknown: true
      })
      const user_id = req.user.id
      const filter = {}

      if (params.q) {
        filter.title = { [Op.iLike]: `%${params.q}%` }
      }
      if (params.filter && params.filter !== "all") {
        switch (params.filter) {
          case "done":
            filter.isDone = true
            break
          default:
            filter.isDone = false
            break
        }
      }

      const todo = await todoDa.getByUser(user_id,
        { filter, sort: params.sort, skip: params.skip, limit: params.limit })


      return res.json(todo)
    } catch (error) {
      return next(error)
    }
  },
  edit: async (req, res, next) => {
    try {
      await joi.validate(req.params.id, joi.number())
      const params = await joi.validate(req.body, editSchema, {
        stripUnknown: true
      })

      const newTodo = await todoDa.update(req.params.id, params)


      return res.json(newTodo)

    } catch (error) {
      return next(error)
    }
  },
  readOne: async (req, res, next) => {
    try {
      await joi.validate(req.params.id, joi.number())

      const todo = await todoDa.findOne(req.params.id)

      return res.json(todo)

    } catch (error) {
      return next(error)
    }
  },
  delete: async (req, res, next) => {
    try {
      await joi.validate(req.params.id, joi.number())

      await todoDa.delete(req.params.id)

      return res.json({ message: "delete succes" })

    } catch (error) {
      return next(error)
    }
  }

}

export default todoControler
