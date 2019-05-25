module.exports = express =>
  new express.Router()
    .get("/", (req, res) => {
      console.log("------alive")
      res.json("alive")
    })
    .get("/id", (req, res) => {
      res.json("_id")
    })
