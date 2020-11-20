const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId:{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
   },
   videoId:{
    type: Schema.Types.ObjectId,
    ref: 'Video'
   }
}, { timestamps: true })


const Dislike = mongoose.model('Disike', dislikeSchema);

module.exports = { Dislike }