var express = require('express');
var router = express.Router();
var mysql = require('mysql');


// 登录页面显示
exports.landStart = function (req, res, next) {

    if (req.session.cookie) {
        var zhustr = "Hi," + req.session.name;
        var zhuurl = '';
        var dengstr = '注销';
        var dengurl = "/exit";
        var geren="个人中心"

        if (!req.session.name) {
            zhustr = "注册";
            zhuurl = '/register1';
            dengstr = "登录";
            dengurl = '/land';
            geren="";

        }
        res.render('land', {title: '登录', geren:geren,zhuce: zhustr, zhuceurl: zhuurl, denglu: dengstr, dengluurl: dengurl});
    }
}

// 登录实现
exports.landFind = function (req, res, next) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    myMagic.query('select user_password,user_head from users where user_name = ?;', [req.body.username], function (err, row) {
        myMagic.end();
        if (err) throw err;
        if (row.length === 0)
            res.send("0");
        else if (row[0].user_password === req.body.userpass) {
            if (req.body.flag == 'true') {
                req.session.cookie.maxAge = (10 * 24 * 60 * 3600 * 1000);
            }
            else {
                req.session.cookie.maxAge = null;
            }
            req.session.pass = row[0].user_password;
            req.session.name = req.body.username;
            var json = {
                unum: req.body.username,
                uhead: row[0].user_head
            };
            res.send(json);
        }
        else
            res.send("1");
    })
};