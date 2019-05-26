import { todo } from "controlers"
import { reqUserFromToken } from "libs/jwt"

module.exports = express =>
  new express.Router()
    .use(reqUserFromToken)
    .post("/", todo.create)
    .get("/user", todo.readByUser)
    .put("/:id", todo.edit)
    .get("/:id", todo.readOne)
    .delete("/:id", todo.delete)
