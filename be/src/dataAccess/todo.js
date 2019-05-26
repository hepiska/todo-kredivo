import model from "db/models"

const getSort = sort => {
  switch (sort) {
    case 0:
      return ["createdAt", "ASC"]
    case 1:
      return ["createdAt", "DESC"]
    case 2:
      return ["priority", "ASC"]
    case 3:
      return ["priority", "DESC"]
    default:
      return ["createdAt", "ASC"]
  }
}

const userDA = {
  create: data => {
    return model.Todo.create(data).then(res => res.dataValues)
  },
  getByUser: (user_id, { filter, sort = 0, skip = 0, limit = 10 }) => {
    let where = { user_id }

    if (filter) {
      where = { ...where, ...filter }
    }
    const order = [getSort(sort)]

    return model.Todo.findAll({ where, offset: skip * limit, limit, order }).then(res => {

      return res
    })
  },
  update: async (id, data) => {
    const oldData = await model.Todo.findOne({ where: { id } })

    if (!oldData) {
      throw new Error("data not found")
    }

    const newData = { ...oldData.dataValues, ...data }

    return model.Todo.update(newData, { returning: true, where: { id } }).then(res => res.dataValues)
  },

  findOne: id => {
    return model.Todo.findOne({ where: { id } }).then(res => {
      if (!res) {
        throw new Error("data not found")
      }

      return res.dataValues
    })
  },
  delete: id => {
    return model.Todo.destroy({ where: { id } }).then(res => res.dataValues)
  },

}


export default userDA
