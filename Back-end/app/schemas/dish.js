var mongoose = require('mongoose');

//Dish 实体类
var DishSchema = new mongoose.Schema({
    name: {
        type:String,
        unique:true
    },
    price:Number,
    count: {
        type:Number,
        default:0
    },
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

//在dish保存之前，更新时间
DishSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

//每个dish实例拥有的方法
DishSchema.mothods = {
    getName : function() {
        return this.name;
    },
    setName : function(_name, cb) {
        this.name = _name;
        this.markModified('name');
        this.save();
    },
    getPrice : function() {
        return this.price;
    },
    setPrice : function(_price, cb) {
        this.price = _price;
        this.markModified('price');
        this.save();
    },
    getCount : function() {
        return this.count;
    },
    setCount : function(_count, cb) {
        this.count = _count;
        this.markModified('count');
        this.save();
    }
};

//用于查找
DishSchema.statics = {
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

module.exports = DishSchema;