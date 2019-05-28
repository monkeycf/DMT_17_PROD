var express = require('express');
var router = express.Router();
var mysql = require('mysql');



// 用户读取
exports.adUserShow = function (req, res) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    myMagic.query("select * from users;", function (err, row, fields) {
        myMagic.end();
        if (err) throw  err;
        else {
            for (var i = 0; i < row.length; i++) {
                var a = row[i].user_regday;
                row[i].user_regday = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8);
            }
            res.send(row);
        }
    })
}

// 用户修改读取
exports.adUserChangeShow = function (req, res) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var num = req.body.userNum;
    console.log(num);
    myMagic.query("select * from users where user_num = ?", [num], function (err, row) {
myMagic.end();
        if (err) throw  err;
        else if (row.length === 1) {
            var a = row[0].user_regday;
            row[0].user_regday = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8);
        }
        res.send(row);
    })
}

// 删除用户
exports.adUserDelete = function (req, res) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var id = req.body.usernum;
    myMagic.query("delete from users where user_num = ?", [id], function (err, row, fields) {
        myMagic.end();
        if (err) throw err;
        else
            res.send("用户删除成功");
    })
};

// 刷新用户
exports.adUserRenovate = function (req, res) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
//查找数据动态
    myMagic.query("select * from users", function (err, row, fields) {
        myMagic.end();
        if (err) throw err;
        if (row.length === 0)
            res.send("无用户");
        else {
            for (var i = 0; i < row.length; i++) {
                var a = row[i].user_regday;
                row[i].user_regday = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8)
            }
            res.send(row);
        }
    })
};

// 查询
exports.adUserFind = function (req, res) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var str = req.body.seachtext;
    str = "%" + str + "%";
    console.log(str);
    myMagic.query("SELECT * FROM users where user_num like binary ?  OR user_phone like binary ? OR user_truename like binary ? OR user_abstract LIKE binary ? or user_name LIKE binary ?;", [str, str, str, str, str], function (err, row, fields) {
        myMagic.end();
        if (err) throw err.message;
        else {
            for (var i = 0; i < row.length; i++) {
                var a = row[i].user_regday;
                row[i].user_regday = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8);
            }
            res.send(row);
        }
    })
}

// 保存修改
exports.adUserChangeText = function (req, res) {
    //链接数据库
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var unum = req.body.unum;
    var uphone = req.body.newphone;
    var uname = req.body.newname;
    var upass = req.body.newpass;
    var utrue = req.body.newtrue;
    var utext = req.body.newtext;

    myMagic.query('update users set user_phone = ? , user_name = ? ,user_password = ?, user_truename = ? ,user_abstract = ? where user_num = ?', [uphone, uname, upass, utrue, utext, unum], function (err, row) {
        myMagic.end();
        if (err) throw err;
        else
            res.send("用户更新成功");
    })
}
