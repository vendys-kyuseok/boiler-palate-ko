const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

// const { Video } = require("");
// const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");

// 옵션 역할??
var storage = multer.diskStorage({
    // destination: 파일을 어디다 저장할거냐
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
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


//=================================
//             Video
//=================================


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


// 썸네일 생성, 비디오 러닝타임 가져오기
router.post("/thumbnail", (req, res) => {

    let filePath ="";
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
            filePath = "uploads/thumbnails/" + filenames[0];
        })
        // 생성 후
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration})
        })
        // 썸네일 옵션
        .screenshots({
            count: 2,
            folder: 'uploads/thumbnails',
            size:'320x240',
            filename:'thumbnail-%b.png'
        });

});


router.get("/getVideos", (req, res) => {

    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});


router.post("/uploadVideo", (req, res) => {

    const video = new Video(req.body)

    video.save((err, video) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true 
        })
    })

});


router.post("/getVideo", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});


router.post("/getSubscriptionVideos", (req, res) => {
    
    Subscriber.find({ 'userFrom': req.body.userFrom })
    .exec((err, subscribers)=> {
        if(err) return res.status(400).send(err);

        let subscribedUser = [];

        subscribers.map((subscriber, i)=> {
            subscribedUser.push(subscriber.userTo)
        })

        Video.find({ writer: { $in: subscribedUser }})
            .populate('writer')
            .exec((err, videos) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, videos })
            })
    })
});

module.exports = router;
