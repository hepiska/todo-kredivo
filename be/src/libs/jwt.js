const jwt = require("jsonwebtoken")

export const signJwt = data => {
  return jwt.sign({ ...data }, process.env.SECRET)
}

export const verifyJwt = token => jwt.verify(token, process.env.SECRET)

export const decodeJwt = token => jwt.decode(token)

export const reqUserFromToken = (req, res, next) => {
  try {
    const token = req.headers.authorization || req.headers.Authorization

    req.user = verifyJwt(token)

    return next()
  } catch (err) {
    const error = new Error(err)

    error.statusCode = 401

    return next(error)
  }
}


export default jwt
