const webpush = require('web-push')
const express = require('express') 
const cors = require('cors') 
const bodyParser = require('body-parser')
const app = express() 

//generate using web-push generate-vapid-keys

const vapidKeys = {
  publicKey:
    'BDCdb-zaIX5QK2iLYh1yxKJdSQRsp4dbIyF1LVq7cxeeu_3zfwnY_D8h4oHbZ71aTxC7sBeDCaGAS48zEnXNNTE',
  privateKey: '_h0QsdS24RG0opYIb0ovaW-7POGQv_e1Is2XYoB_jxY',
}

app.use(cors()) 
app.use(bodyParser.json()) 

const port = 4000 

const dummyDb = { subscription: null } //dummy in memory store

const saveToDatabase = async subscription => {
    // Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
    // Here you should be writing your db logic to save it.
    dummyDb.subscription = subscription
  }

  webpush.setVapidDetails(
    'mailto:myuserid@email.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  )

  const sendNotification = (subscription, dataToSend='') => {
    webpush.sendNotification(subscription, dataToSend)
  }

  app.get('/send-notification', (req, res) => {
    const subscription = dummyDb.subscription //get subscription from your databse here.
    const message = 'Hello World'
    sendNotification(subscription, message)
    res.json({ message: 'message sent' })
  })

// The new /save-subscription endpoint
app.post('/save-subscription', async (req, res) => {
    const subscription = req.body
    await saveToDatabase(subscription) //Method to save the subscription to Database
    console.log(subscription);
    res.json({ message: 'success' })
  })

app.get('/', (req, res) => res.send('Hello World!')) 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))