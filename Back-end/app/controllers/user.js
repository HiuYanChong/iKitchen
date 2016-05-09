var User = require("../models/user.js");

//signup
exports.signup = function(req, res) {
    var _user = req.body.user;

    User.findOne({name: _user.name}, function(err, user) {
        if (err) console.log(err);

        if (user) {
            //无法注册
        } else {
            var newUser = new User(_user);
            newUser.save(function(err, user) {
                if (err) console.log(err);
                //传送注册成功的信息
            });
            res.end();
        }
    });
};

//signin
exports.signin = function(req, res) {
    var _user = req.body.user;
    var password = _user.password;

    User.findOne({name: _user.name}, function(err, user) {
        if (err) console.log(err);

        if (user) {
            user.comparePassword(_user.password, function(err, isMatch) {
                if (err !== null) console.log(err);
                if (isMatch === true) {
                    //设置session
                    req.session.user = user;
                    //成功登陆
                    //res.redirect('/');
                    
                } else {
                    //密码错误
                    //res.redirect('/signin');
                }
            });
        } else {
            //用户名不存在
            //res.redirect('/signup');      
        }
    });
};

//logout
exports.logout = function(req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.redirect("/");
};


//middleware for user
exports.signinRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        console.log("You should signin first!");
        //return res.redirect("/signin");
    }
    next();
};

//权限管理
exports.adminRequired = function(req, res, next) {
    var user = req.session.user;
    /*if (!(user.role === 1 || user.role ===0)) {
        console.log("You don't have the right to visit this page!");
        return res.redirect("/signin");
    }*/
    next();
};