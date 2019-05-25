
import useRouter from "routes"
const express = require("express")

const PORT = process.env.PORT || 4000
const app = express()

// app.use((req, res) => {
//   return res.json("alive")
// })

app.use("/", useRouter(express))

app.listen({ port: PORT }, () => {
  console.log(`server run on port ${PORT}`)
})
