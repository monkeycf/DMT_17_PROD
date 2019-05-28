var express = require('express');
var router = express.Router();
var mysql = require('mysql');

exports.showDynamic = function (req, res) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    })
    //查找动态
    myMagic.query('select * from dynamic,users where dynamic.user_num=users.user_num order by dy_time desc;', function (err, row, fields) {
        //找不到
        myMagic.end()
        if (err) throw err;
        if (row.length === 0)
            res.send('没有动态');
        else {
            console.log(row[0])
            for (var i = 0; i < row.length; i++) {
                var a = row[i].dy_time;
                row[i].dy_time = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8)
            }
            if (req.session.cookie) {
                var zhustr = "Hi," + req.session.name;
                var zhuurl = '';
                var dengstr = '注销';
                var dengurl = "/exit";
                var geren="个人中心";

                if (!req.session.name) {
                    zhustr = "注册";
                    zhuurl = '/register1';
                    dengstr = "登录";
                    dengurl = '/land';
                    geren="";
                }
                // console.log("opu");
                res.render('dynamic', {
                    title: '动态',
                    zhuce: zhustr,
                    zhuceurl: zhuurl,
                    denglu: dengstr,
                    dengluurl: dengurl,
                    geren:geren,
                    dynamic: row
                });
            }
        }
    })
};

// 点赞
exports.dyGiveNice = function (req, res) {
    var dnum = req.body.dnum;
    var uname = req.body.uname;
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    myMagic.query('select user_num from users where user_name = ?', [uname], function (err, row) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return 0;
        }
        if (row.length === 1) {
            var date = new Date();
            myMagic.query('INSERT INTO givenice SET ?', {
                    dy_num: dnum,
                    user_num: row[0].user_num,
                    dy_givetime: date
                },
                function (err, row) {
                    myMagic.end();
                    if (err) throw err;
                    else res.send("ok");
                }
            )
        }
    })
};

// 收藏
exports.dyUserC = function (req, res) {
    var dnum = req.body.dnum;
    var uname = req.body.uname;
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    myMagic.query('select user_num from users where user_name = ?', [uname], function (err, row) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return 0;
        }
        if (row.length === 1) {
            var date = new Date();
            myMagic.query('INSERT INTO dycollect SET ?', {
                    dy_num: dnum,
                    user_num: row[0].user_num,
                    dy_ctime: date
                },
                function (err, row) {
                    myMagic.end();
                    if (err) throw err;
                    else res.send("ok");
                }
            )
        }
    })

};

// 关注
exports.dyUserFollow = function (req, res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var dnum = req.body.dnum;
    var uname = req.body.uname;
    myMagic.query('select user_num from users where user_name = ?', [uname], function (err, row) {
        if (err) throw err;
        if (row.length === 1) {
            var num1 = row[0].user_num;
            myMagic.query('select user_num from dynamic where dy_num = ?', [dnum], function (err, result) {
                if (err) throw err;
                if (result.length === 1) {
                    var num2 = result[0].user_num;
                    var date = new Date();
                    myMagic.query('insert into follow set ?', {
                        user_num: num1,
                        usered_num: num2,
                        user_followtime: date
                    }, function (err, row) {
                        myMagic.end();
                        if (err) throw err;
                        else res.send("ok");
                    })
                }
            })
        }
    })
};

//评论
exports.dyUserText = function (req, res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var dnum = req.body.dnum;
    var uname = req.body.uname;
    var text = req.body.texts;
    myMagic.query('select user_num from users where user_name = ?', [uname], function (err, row) {
        if (err) throw err;
        if (row.length === 1) {
            var num1 = row[0].user_num;
            var date = new Date();
            myMagic.query('insert into discuss set ?', {
                dy_num: dnum,
                user_num: num1,
                dy_texttime: date,
                dy_text: text
            }, function (err, result) {
                myMagic.end();
                if (err) throw err;
                else
                    res.send("ok");
            })
        }
    })
};

// 下拉显示
exports.dyDownLand=function (req,res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    // console.log(req.body.dynum);
    myMagic.query('select distinct user_name from givenice,users where givenice.user_num = users.user_num and givenice.dy_num = ?',[req.body.dynum],function (err,row) {
        // console.log(row);

        if(err) throw err;
        if(row.length===0)
            res.send("0");

        else {
            res.send(row);
            myMagic.end();
        }
    })
};

// 动态下拉显示评论
exports.dyDiscuss=function (req,res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    myMagic.query('select user_head,user_name,dy_text,dy_texttime from users,discuss where users.user_num = discuss.user_num and discuss.dy_num = ?',[req.body.dynum],function (err,row) {
        if (err) throw  err;
        if(row.length===0)
            res.send("0");

        else
        {
            for (var i = 0; i < row.length; i++) {
                var a = row[i].dy_texttime;
                row[i].dy_texttime = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8);
            }
            res.send(row);
        }
    })
};