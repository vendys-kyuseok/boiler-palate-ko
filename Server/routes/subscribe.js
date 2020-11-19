const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");

router.post('/subscribeNumber', (req, res) => {
    Subscriber.find({'userTo': req.body.userTo})
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);
        return res.status(200).json({success: true, subscribeNumber: subscribe.length})
    })
})

router.post('/subscribed', (req, res) => {
    // userTo: 해당 동영상 업로드한 유저
    // userFrom: 현재 로그인 유저
    const { userTo, userFrom } = req.body;

    Subscriber.find({ userTo, userFrom })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err);

        let result = false

        if(subscribe.length !== 0){ // 0이면 구독을 안하고 있음
            result = true           // 0이 아니면 구독한 상태
        }
        res.status(200).json({success: true, subscribed: result})
    })
})  

router.post("/unSubscribe", (req, res) => {
    const { userTo, userFrom } = req.body;

    Subscriber.findOneAndDelete({ userTo, userFrom })
    .exec((err, doc) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success:true, doc})
    })

});


router.post("/subscribe", (req, res) => {
    // userTo, userFrom의 정보를 저장
    const { userTo, userFrom } = req.body;

    const subscribe = new Subscriber({ userTo, userFrom });

    //console.log(subscribe)

    subscribe.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, doc })
    })

});



module.exports = router;

