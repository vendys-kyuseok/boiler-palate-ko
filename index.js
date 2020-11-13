const express = require('express');
const app = express();
const port = 5000;

const config = require('./server/config/key');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const bodyParser = require('body-parser');
const {User} = require('./server/models/User');
const {auth} = require('./server/middleware/auth');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('connect')).catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World! ha')
})

app.get('/api/hello', (req, res) => {
  res.send('test test')
})
 
app.post('/api/users/register', (req, res) => {
    
    // 회원가입 할때 필요한 client에서 가져와 db에 저장

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) console.log(err)
        return res.status(200).json({ success: true })
    })
    console.log(user);
})


app.post('/api/users/login', (req, res) => {
  //요청한 이메일을 db에서 찾는다.
  //요청한 이메일이 db에 있으면, 비번이 일치하는지 확인.
  //비번이 일치시 토큰 생성.

  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({loginSuccess: false, message: "일치하는 유저가 없습니다."})
    }

    // 비교
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비번 불일치"})

      // 토큰
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        //토큰을 저장한다. 쿠키 & 로컬스토리지
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      })
    })
  })
})


app.post('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})


app.get('/api/users/logout', auth, (req, res) => {

  User.findOneAndUpdate({_id: req.user._id},
      {token: ""},
      (err, user) => {
          if(err) return res.json({ success: false, err});
          return res.status(200).send({
              success: true + ' 성공'
          })
      })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

