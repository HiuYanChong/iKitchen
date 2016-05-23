var Dish = require('../app/controllers/dish.js');
var User = require("../app/controllers/user.js");
var Order = require('../app/controllers/order.js');

module.exports = function(app) {
    //pre handle user session 
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    });

    //index
    app.get ('/', function(req, res) {
        res.render('loginView');
    });


    //user相关
    app.get('/signup', function(req, res) {
        res.render("signup");
    });
    app.post('/signup', User.signup);
    app.post('/login', User.login); 
    app.get('/logout', User.logout, function(req, res) {
        res.render("loginView");
    });
    app.get('/serverView', User.loginRequired, User.serverRequired, function(req, res) {
        res.render('serverView');
    });
    app.get('/managerView',  User.loginRequired, User.managerRequired, function(req, res) {
        res.render('managerView');
    });
    app.get('/chiefView',  User.loginRequired, User.chiefRequired, function(req, res) {
        res.render('chiefView');
    });


    //dish相关
    app.get('/addDish', User.loginRequired, User.managerRequired, function(req, res) {
        res.render('addDishView');
    });
    app.post('/addDish', User.loginRequired, User.managerRequired, Dish.addDish);
    app.get('/deleteDish', User.loginRequired, User.managerRequired, function(req, res) {
        res.render('deleteDishView');
    });
    app.get('/showAllDish', User.loginRequired, User.managerRequired, Dish.showAllDish); //deleteDish页面返回后用于页面请求所有的dish
    app.post('/deleteDish', User.loginRequired, User.managerRequired, Dish.deleteDish);
    app.get('/changeDishCount', User.loginRequired, User.managerRequired, function(req, res) {
        res.render('changeDishCount');
    });
    app.get('/showAllDishAndCount', User.loginRequired, User.managerRequired, Dish.showAllDishAndCount); //changeDishCount页面返回后用于页面请求所有的dish和数量
    app.post('/changeDishCount', User.loginRequired, User.managerRequired, Dish.changeDishCount);

    //orderQueue相关
    app.get('/order', User.loginRequired, User.serverRequired, function(req, res) {
        res.render('orderView');
    });
    app.post('/order', User.loginRequired, User.serverRequired, Order.addOrder);
    app.get('/chiefViewList', User.loginRequired, User.chiefRequired, function(req, res) {
        res.render('chiefViewList');
    });
    app.get('/showAllOrder', User.loginRequired, User.chiefRequired, Order.showAllOrder); //chiefViewList页面返回后用于页面请求所有的order
    app.post('chiefViewList', User.loginRequired, User.chiefRequired, Order.finishOrder);
};