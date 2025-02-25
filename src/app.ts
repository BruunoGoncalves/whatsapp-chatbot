import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from 'dotenv'
import { sendWhatsappMessage } from "./services/twilio"
import { getOpenAICompletion } from "./services/openai"

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

app.post('/chat/receive', async (req, res) => {
  const twilioRequestBody = req.body
  console.log("twilioRequestBody", twilioRequestBody)
  const messageBody = twilioRequestBody.Body
  const to = twilioRequestBody.From

  try {
    const completion = await getOpenAICompletion(messageBody)

    await sendWhatsappMessage(to, completion)
    res.status(200).json({sucess: true, messageBody})
  } catch(error) {
    res.status(500).json({sucess: false, error})
  }  
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`O servidor esta rodando na porta: ${port}`)
})