const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({

     // writer id
     writer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // video id
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
    },
    // 댓글 대상자
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
    }

}, {timestamps: true})

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = {Comment}