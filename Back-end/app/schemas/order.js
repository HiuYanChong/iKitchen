var mongoose = require('mongoose');

//Order 实体类
var OrderSchema = new mongoose.Schema({
    name: String,
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

//在order保存之前，更新时间
OrderSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

//每个order实例拥有的方法
OrderSchema.methods = {
};

//用于查找
OrderSchema.statics = {
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

module.exports = OrderSchema;