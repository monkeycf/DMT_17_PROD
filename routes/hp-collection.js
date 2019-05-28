var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// 显示
exports.hpCollection = function (req, res, next) {

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
            res.render('hp-collection', {
                title: '个人中心',
                zhuce: zhustr,
                zhuceurl: zhuurl,
                denglu: dengstr,
                geren:geren,
                dengluurl: dengurl})
        }else{
        var myMagic = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'magic'
        });
        myMagic.query('select * from showdy where user_name = ?;', [req.session.name], function (err, result) {
            if (err) throw err;
            else {
                myMagic.query('select user_head,user_abstract,user_garde from users where user_name = ?', [req.session.name], function (err, row) {
                        // console.log("row");
                        // console.log(row);
                        for (var i = 0; i < result.length; i++) {
                            var a = result[i].dy_time;
                            result[i].dy_time = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8);
                        }
                        if (err) throw err;
                        else {
                            myMagic.end();
                            res.render('hp-collection', {
                                title: '个人中心',
                                zhuce: zhustr,
                                zhuceurl: zhuurl,
                                denglu: dengstr,
                                dengluurl: dengurl,
                                dynamic: result,
                                uhead: row[0].user_head,
                                uab: row[0].user_abstract,
                                uname: req.session.name,
                                ugarde: row[0].user_garde
                            })
                        }
                    }
                )

            }
        })}

    }
}

// 显示关注数
exports.hpFollowNum = function (req, res, next) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    // console.log(req.body.usernum);
    myMagic.query('select * from follow,users where follow.user_num = users.user_num and users.user_name = ?', [req.body.usernum], function (err, row) {
            if (err) throw err;
            else {
                myMagic.query('select * from follow,users where follow.usered_num = users.user_num and users.user_name = ?', [req.body.usernum], function (err, result) {
                    myMagic.end();
                    if (err) throw err;
                    else {
                        var data = {
                            num1: row.length,
                            num2: result.length
                        }
                        res.send(data);
                    }
                })
            }
        }
    )
}

//显示比赛
exports.hpMatchShow = function (req, res, bext) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    // console.log("username")
    // console.log(req.body.usernum);
    myMagic.query('select game_name,game_time,game_img,game_text from game,users,gotogame where gotogame.game_num = game.game_num and users.user_num = gotogame.user_num and  users.user_name = ?', [req.body.usernum], function (err, row) {
        if (err) throw err;
        else {
            myMagic.end();
            for (var i = 0; i < row.length; i++) {
                var a = row[i].game_time;
                row[i].game_time = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8)
            }
            res.send(row);
        }
    })
}

// 收藏动态
exports.hpDyCollect = function (req, res, next) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    console.log(req.body);
    myMagic.query('select user_num from users where user_name = ?', [req.body.usernanme], function (err, row) {
        if (err) throw err;
        console.log(row);
        if (row.length === 1) {
            var date = new Date();
            myMagic.query('insert into dycollect set ?', {
                dy_num: req.body.dynum,
                user_num: row[0].user_num,
                dy_ctime: date
            }, function (err, row) {
                if (err) throw err;
                else res.send("ok");
            })
        }
    })
}

// 显示关注用户
exports.hpFollowShow = function (req, res, next) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    myMagic.query('select user_num from users where user_name= ?', [req.body.username], function (err, result) {
        if (err) throw err;
        else {
            myMagic.query('select user_head,user_name,user_garde,user_abstract from users,follow where follow.usered_num = users.user_num and follow.user_num = ? ', [result[0].user_num], function (err, row) {
                if (err) throw err;
                else {
                    myMagic.end();
                    console.log(row);
                    res.send(row);
                }

            })
        }

    })

}

// 主页发表动态
// exports.adFormSubmit = function (req, res, next) {
//     var myMagic = mysql.createConnection({
//         host: '127.0.0.1',
//         user: 'root',
//         password: '',
//         database: 'magic'
//     });
//     // console.log(req.files);
//     if (req.files) {                          //判断评论是否有文件
//         var fileL = req.files.length;
//         var fs = require("fs");
//         var uname=req.body.username;
//         console.log(req.body);
//         myMagic.query('select user_num from users where user_name = ? ', [uname], function (err, row) {
//             if (err) throw err;
//             else {
//                 console.log(row[0].user_num);
//                 var date = new Date();
//                 myMagic.query('INSERT INTO dynamic SET ?', {
//                     dy_text: req.body.text,
//                     user_num: row[0].user_num,
//                     dy_time: date
//                 }, function (err, re) {
//                     if (err) throw err;
//                     else {
//                         var arr;
//                         myMagic.query('select dy_num from dynamic order by  dy_num  desc limit 1; ', function (err, result) {
//                             if (err) throw err;
//                             else {
//                                 var num = result[0].dy_num + "00";
//                                 // var di = num + '00';
//                                 for (var i = 1; i <= fileL; i++) {
//                                     num++;
//                                     var where = __dirname.substr(0, __dirname.length - 6) + 'public/images/dynamic/' + num + '.jpg';//写入的路径
//                                     var data = fs.readFileSync(req.files[i].path);
//                                     fs.writeFile(where, data, function (err) {
//                                         if (err) throw err;
//                                     })
//                                     arr[i] = "/images/dynamic/" + num + '.jpg';
//                                 }
//                                 myMagic.query('update dynamic set dy_p1 = ? ,dy_p2 = ? ,dy_p3 = ? where dy_num = ?;', [arr[1], arr[2], arr[3],result[0].dy_num], function (err, ens) {
//                                     if (err) throw err;
//                                     else {
//                                         res.send("ok");
//                                     }
//                                 })
//                             }
//                         })
//
//                     }
//                 })
//
//             }
//         })
//     }
//
//     else {
//         res.send("0")
//     }
// }