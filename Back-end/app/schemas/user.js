var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//User 实体类
var UserSchema = new mongoose.Schema({
    name: {
        type:String,
        unique:true
    },
    password:String,
    //1:服务员
    //2：厨师
    //3：管理员
    type:Number,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updateAt: {
            type:Date,
            default:Date.now()
        }
    }
});

//在user保存之前，更新时间
UserSchema.pre('save', function(next) {
    var user = this;
    if(this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    //随机产生盐并加密
    bcrypt.hash(user.password, null, function() {}, function(err, hash) {
        if (err) next(err);
        user.password = hash;
        next();
    });
});

//每个user实例拥有的方法
UserSchema.methods = {
    getName : function() {
        return this.name;
    },
    setName : function(_name, cb) {
        this.name = _name;
        this.markModified('name');
        this.save();
    },
    getType : function() {
        return this.type;
    },
    setType : function(_type, cb) {
        this.type = _type;
        this.markModified('type');
        this.save();
    },
    getPassword : function() {
        return this.password;
    },
    setPassword : function(_password, cb) {
        this.password = _passowrd;
        this.markModified('password');
        this.save();
    },
    comparePassword: function(_password, cb) {
        var password = this.password;
        bcrypt.compare(_password, password, function(err, res) {
            if (err) cb(err);
            cb(null, res);
        });     
    }
};

//用于查找
UserSchema.statics = {
    fetch: function(cb) {
        return this
          .find({})
          .sort('meta.updateAt')
          .exec(cb);
    },
    findByName: function(_name, cb) {
        return this
          .findOne({name:_name})
          .exec(cb);
    }
};

module.exports = UserSchema;