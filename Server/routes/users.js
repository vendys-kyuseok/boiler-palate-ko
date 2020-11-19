const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.post('/register', (req, res) => {
    
    // 회원가입 할때 필요한 client에서 가져와 db에 저장

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) console.log(err)
        return res.status(200).json({ success: true })
    })
    console.log(user);
})


router.post('/login', (req, res) => {
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


router.post('/auth', auth, (req, res) => {
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


router.get('/logout', auth, (req, res) => {

  User.findOneAndUpdate({_id: req.user._id},
      {token: ""},
      (err, user) => {
          if(err) return res.json({ success: false, err});
          return res.status(200).send({
              success: true + ' 성공'
          })
      })
})

module.exports = router;