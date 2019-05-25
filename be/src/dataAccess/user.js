import model from "db/models"

const userDA = {
  create: data => {
    return model.User.create(data).then(res => res.dataValues)
  },
  findOneByEmail: email => {
    const condition = { where: { email } }

    return model.User.findOne(condition).then(res => res && res.dataValues)
  }
}

export default userDA
