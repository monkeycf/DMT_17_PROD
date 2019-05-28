var express = require('express');
var router = express.Router();
var mysql = require('mysql');


// 判断是否第一次
exports.start = function (req, res, next) {
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
        res.render('index', {title: '首页', zhuce: zhustr, zhuceurl: zhuurl, denglu: dengstr, dengluurl: dengurl,geren:geren});
    }
}

// 查询头像
exports.readygo = function (req, res, next) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    myMagic.query('select user_head from users where user_name = ?', [req.session.name], function (err, row) {
        myMagic.end()
        if (err) throw err;
        console.log(row);
        if (row.length === 1) {
            var str = {
                uname: req.session.name,
                uhead: row[0].user_head
            };
            res.send(str);
        }
    })
}