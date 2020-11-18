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
    Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
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

    Subscriber.findOneAndDelete({userTo:req.body.userTo, userFrom:req.body.userFrom})
    .exec((err, doc) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success:true, doc})
    })

});


router.post("/subscribe", (req, res) => {
    // userTo, userFrom의 정보를 저장
    const subscribe = new Subscriber(req.body);

    //console.log(subscribe)

    subscribe.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});



module.exports = router;

