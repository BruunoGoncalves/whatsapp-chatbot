import twilio from 'twilio'

const accountSid = ''
const authToken = ''
const whatsappPhoneNumber = ''

const client = twilio(accountSid, authToken)

export const sendWhatsappMessage = async (to: string, body: string): Promise<void> => {
  try {
    await client.messages.create({
      to,
      from: whatsappPhoneNumber,
      body
    })
  } catch (error) {
    console.error(`Error sending message to ${to}: ${error}`)
  }  
}