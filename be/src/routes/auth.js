import controlers, { auth } from "controlers"

module.exports = express =>
  new express.Router()
    .post("/register", auth.register)
    .post("/login", auth.login)
