var express = require('express');
var router = express.Router();
var mysql = require('mysql');


//用户点击导航栏 进行渲染页面
exports.searchStart = function (req, res, next) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });

    var date = "%" + req.body.key + "%";
    // console.log(date);
    myMagic.query("select dy_num,dy_text,user_name,dy_time from showdy where dy_text like binary ? or user_name like binary ? or dy_time like binary ?;", [date, date, date], function (err, row) {
        myMagic.end()
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return 0;
        }

        else {
            if (row.length === 0) {
            }
            else {
                for (var i = 0; i < row.length; i++) {
                    var a = row[i].dy_time;
                    row[i].dy_time = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8);
                }
            }
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
                    geren=""

                }
                res.render('search', {
                    title: '搜索',
                    zhuce: zhustr,
                    zhuceurl: zhuurl,
                    denglu: dengstr,
                    dengluurl: dengurl,
                    result: row,
                    geren:geren
                });
            }

        }
    })
};

//在搜索页面的所搜
exports.findWhat = function (req, res, nex) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });

    var date = "%" + req.body.findtext + "%";
    myMagic.query("select dy_num,dy_text,user_name,dy_time from showdy where dy_text like binary ? or user_name like binary ? or dy_time like binary ?;", [date, date, date], function (err, row) {
        myMagic.end();
        if (err) throw err;
        if (row.length === 0) {
            res.send("没有符合的动态")
        }
        else {
            for (var i = 0; i < row.length; i++) {
                var a = row[i].dy_time;
                row[i].dy_time = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8);
            }
            var str = JSON.stringify(row);
            res.send(str);
        }
    })
};

