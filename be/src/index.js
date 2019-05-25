
import useRouter from "routes"
import bodyParser from "body-parser"
import morgan from "morgan"
import { errorMidleware } from "libs/errorMidleware"
// import cookieParser from "cookie-parser"
const express = require("express")


const PORT = process.env.PORT || 4000
const app = express()


// parse application/x-www-form-urlencoded
app.use(morgan("combined"))
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/", useRouter(express))

app.use(errorMidleware)
app.listen({ port: PORT }, () => {
  console.log(`server run on port ${PORT}`)
})
