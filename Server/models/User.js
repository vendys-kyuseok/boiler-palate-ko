const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 공백 제거  
        unique: 1 // 중복 방지
    },
    password: {
        type: String,
        minlength:5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})
// 비번 암호화
userSchema.pre('save', function( next ){
    // pre 미들웨어, init, validate, save, remove 메소드 수행시 처리되는 미들웨어 펑션
    var user = this;

    if(user.isModified('password')){
    // 문서가 마지막으로 저장된 후에 수정이 되었는지의 여부를 가리킨다
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
            // 암호화
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash;
                next()
            })
        })
    }else{
        next();
    }
})

// 비번 비교
userSchema.methods.comparePassword = function(plainPassword, cb){

    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
            cb(null, isMatch)
    })
}

// 토큰 생성
userSchema.methods.generateToken = function(cb){
    
    var user = this;
    
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}

// 토큰 찾기
userSchema.statics.findBytoken = function(token, cb){
    var user = this;

    // 토큰을 디코드한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해 유저를 찾고, 클라이언트 토큰과 디비 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err)
            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema);
module.exports = {User}