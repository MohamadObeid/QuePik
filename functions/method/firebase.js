const admin = require('firebase-admin')
const serviceAccount = require("../service-account.json")
const dotenv = require('dotenv')

dotenv.config()

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG)
adminConfig.credential = admin.credential.cert(serviceAccount)
admin.initializeApp(adminConfig)

module.exports = admin.firestore()