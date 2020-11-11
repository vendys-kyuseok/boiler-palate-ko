const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key')

const bodyParser = require('body-parser')
const {User} = require('./models/User')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('connect')).catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! ha')
})
 
app.post('/register', (req, res) => {
    
    // 회원가입 할때 필요한 client에서 가져와 db에 저장

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) console.log(err)
        return res.status(200).json({ success: true })
    })
    console.log(user)
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})