var User = require("../models/user.js");

//signup
exports.signup = function(req, res) {
    var _user = req.body.user;

    User.findOne({name: _user.name}, function(err, user) {
        if (err) console.log(err);

        if (user) {
            //无法注册
            console.log("用户名已存在");
        } else {
            var newUser = new User(_user);
            newUser.save(function(err, user) {
                if (err) console.log(err);
                //传送注册成功的信息
                console.log("注册成功");
                res.redirect('/');
            });
        }
    });
};

//login
exports.login = function(req, res) {
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
                    //成功登陆,根据角色跳转页面
                    if (user.type === 1) {
                        //服务员
                        res.redirect('/serverView');
                    } else if (user.type === 2) {
                        //厨师
                        res.redirect('/chiefView');
                    } else if (user.type === 3) {
                        //管理员
                        res.redirect('/managerView');
                    }
                } else {
                    //密码错误
                    console.log("password wrong");
                    res.redirect('/');
                }
            });
        } else {
            //用户名不存在
            console.log("no such user");
            res.redirect('/');      
        }
    });
};

//logout
exports.logout = function(req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.redirect("/");
};

//返回用户名
exports.returnUserName = function(req, res) {
    var user = req.session.user;
    if (!user) {
        res.json({userName: ''});
    } else {
        res.json({userName: user.name});
    }
};

//检测是否已登录
exports.loginRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect("/");
    }
    next();
};

//服务员权限管理
exports.serverRequired = function(req, res, next) {
    var user = req.session.user;
    if (user.type !== 1) {
        return res.redirect("/");
    }
    next();
};

//厨师权限管理
exports.chiefRequired = function(req, res, next) {
    var user = req.session.user;
    if (user.type !== 2) {
        return res.redirect("/");
    }
    next();
};

//管理员权限管理
exports.managerRequired = function(req, res, next) {
    var user = req.session.user;
    if (user.type !== 3) {
        return res.redirect("/");
    }
    next();
};