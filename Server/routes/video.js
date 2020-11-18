const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

const { Video } = require('../models/Video');
const { Subscriber } = require("../models/Subscriber");

// 옵션 역할??
var storage = multer.diskStorage({
    // destination: 파일을 어디다 저장할거냐
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    // 저장시 파일 이름
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    // 파일 확장자
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadfiles", (req, res) => {
    // 비디오를 서버에 저장
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        // 파일 이름, 결로 등
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.post("/uploadVideo", (req, res) => {
    // 비디오 정보 저장
    const video = new Video(req.body);

    video.save((err, doc) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true})
    })
});


router.get("/getVideos", (req, res) => {
    // 비디오를 디비에서 가져와 클라이언트로 보냄
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
});


router.post("/getVideo", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')// ObjectID가 속해있는 모델의 정보를 모두 가져옴.
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});

router.post("/getSubscriptionVideos", (req, res) => {

    // 자신의 아이디를 가지고 구독한 사람들을 찾는다
    Subscriber.find({'userFrom': req.body.userFrom})
    .exec((err, subscribers) => {
        if(err) return res.status(400).send(err);

        let subscribedUser = [];

        subscribers.map((subscriber, i) => {
            subscribedUser.push(subscriber.userTo);
        })

        // 찾은 사람들을 찾아 그 사람의 비디오를 불러온다

        Video.find({writer : {$in: subscribedUser}})
        .populate('writer').exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true, videos})
        })
    })
});


// 썸네일 생성, 비디오 러닝타임 가져오기
router.post("/thumbnail", (req, res) => {
    console.log(req.body.url)

    let thumbsFilePath ="";
    let fileDuration ="";

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.filePath)// 클라이언트에서온 비디오 저장경로
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        // 생성 후
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        // 썸네일 옵션
        .screenshots({
            count: 1,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b: input basename (입력한 파일 이름, 확장자 명 제외)
            filename:'thumbnail-%b.png'
        });

});

module.exports = router;

