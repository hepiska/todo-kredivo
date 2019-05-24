const express = require("express")

const PORT = process.env.PORT || 4000
const app = express()

app.use((req, res) => {
  return res.send("alive")
})

app.listen({ port: PORT }, () => {
  console.log(`server run on port ${PORT}`)
})
