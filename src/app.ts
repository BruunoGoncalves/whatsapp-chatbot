import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from 'dotenv'
import { sendWhatsappMessage } from "./services/twilio"

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

dotenv.config()

app.post('/chat/send', async (req, res) => {
  const {to, body} = req.body
  try {
    await sendWhatsappMessage(`whatsapp:${to}`, body)
    res.status(200).json({sucess: true, body})
  } catch(error) {
    res.status(500).json({sucess: false, error})
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`O servidor esta rodando na porta: ${port}`)
})