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

//login
exports.login = function(req, res) {
    var form = req.body.loginForm;
    var password = form.password;

    User.findOne({name: form.user}, function(err, user) {
        if (err) console.log(err);

        if (user) {
            user.comparePassword(form.password, function(err, isMatch) {
                if (err !== null) console.log(err);
                if (isMatch === true) {
                    //设置session
                    req.session.user = user;
                    //成功登陆,根据角色跳转页面
                    if (user.role === 1) {
                        //服务员
                        res.redirect('/serverView');
                    } else if (user.role === 2) {
                        //厨师
                        res.redirect('/chiefView');
                    } else if (user.role === 3) {
                        //管理员
                        res.redirect('/managerView');
                    }
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
    if (user.role !== 1) {
        return res.redirect("/");
    }
    next();
};

//厨师权限管理
exports.chiefRequired = function(req, res, next) {
    var user = req.session.user;
    if (user.role !== 2) {
        return res.redirect("/");
    }
    next();
};

//管理员权限管理
exports.managerRequired = function(req, res, next) {
    var user = req.session.user;
    if (user.role !== 3) {
        return res.redirect("/");
    }
    next();
};