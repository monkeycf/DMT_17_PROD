var express = require('express');
var router = express.Router();


exports.introduceStart = function (req, res, next) {
    if (req.session.cookie) {
        var zhustr = "Hi," + req.session.name;
        var zhuurl = '';
        var dengstr = '注销';
        var dengurl = "/exit";
        var geren = "个人中心"

        if (!req.session.name) {
            zhustr = "注册";
            zhuurl = '/register1';
            dengstr = "登录";
            dengurl = '/land';
            geren = ""

        }
        res.render('introduce', {title: '解法', geren:geren,zhuce: zhustr, zhuceurl: zhuurl, denglu: dengstr, dengluurl: dengurl});
    }
    // res.render('', { title: '' });
}
