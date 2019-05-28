var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require("fs");//Node.js内置的文件系统模块

// 注册页面显示
exports.registerStart = function (req, res, next) {
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
        res.render('register1', {title: '注册', geren:geren,zhuce: zhustr, zhuceurl: zhuurl, denglu: dengstr, dengluurl: dengurl});
    }
    // res.render('',{title:''});
};

// 注册第一页
exports.registerNext = function (req, res, next) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    // console.log(req.body.phoneNum);
    myMagic.query('select phonefind(?);', [req.body.phoneNum], function (err, row) {
        if (err)
            throw err;
        var str = JSON.stringify(row[0]);
        var key = str[str.length - 2];
        // console.log(key);
        if (key === '0') {
            var date = new Date();
            myMagic.query('INSERT INTO users SET ?', {
                user_phone: req.body.phoneNum,
                user_regday: date
            }, function (err, row) {
                myMagic.end();
                if (err) {
                    res.send("注册失败，请重新注册");
                    throw err;
                }
                else {
                    req.session.cookie.maxAge = null;
                    req.session.phone = req.body.phoneNum;
                    res.send("ok");
                }
            })
        }
        else {
            res.send("手机号已存在");
        }

    })

};

// 注册第二页 文件上传
exports.registerSubmit = function (req, res, next) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var uphone = req.session.phone;
    myMagic.query('select user_num from users where user_phone = ?;', [uphone], function (err, result) {
        if (err) throw err;
        if (result.length === 1) {
            var unum = result[0].user_num + '.jpg';
            var where = __dirname.substr(0, __dirname.length - 6) + 'public/images/head/' + unum;//写入的路径
            //把存储在临时位置的文件写入服务器
            //读文件
            //文件的路径
            fs.readFile(req.file.path, function (err, data) {
                //写文件
                fs.writeFile(where, data, function (err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        // console.log("ok");
                        var head = 'images/head/' + unum;
                        var username = req.body.uname;
                        var password = req.body.pass;
                        var truename = req.body.true;
                        var userbirth = req.body.udate;
                        myMagic.query("update users set user_head = ?,user_name = ?,user_abstract = ?,user_truename = ? ,user_birth = ? where user_phone = ?", [head, username, password, truename, userbirth, uphone], function (err, row) {
                            if (err) throw err;
                            else {
                                // res.send("ok");
                                myMagic.query("select l_text from label;", [], function (err, labels) {
                                    myMagic.end();
                                    if (err) throw err; else {
                                        res.send(labels);
                                    }
                                })
                            }
                        })
                    }
                });
            });
        }
    });
}

//注册成功
exports.registerOk = function (req, res, next) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    myMagic.query('select user_head from users where user_name = ?;', [req.body.username], function (err, row) {
        myMagic.end();
        if (err) throw err;
        if (row.length === 1) {
            req.session.cookie.maxAge = null;
            req.session.name = req.body.username;
            // console.log(req.session.pass);
            var json = {
                unum: req.body.username,
                uhead: row[0].user_head
            };
            res.send(json);
        }
        else
            res.send(2);
    })

}


