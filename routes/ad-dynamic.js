var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//链接数据库


exports.adDynamic = function (req, res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
//查找数据
    myMagic.query("select * from showdy", function (err, row, fields) {
        myMagic.end();
        if (err) throw err;
        if (row.length === 0)
            res.send("无动态");
        else {
            for (var i = 0; i < row.length; i++) {
                var a = row[i].dy_time;
                row[i].dy_time = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8)
            }
            res.render('ad-dynamic', {adDynamic: row, layout: false})
        }
    })
};
// 模态框动态
exports.adDyChageshow = function (req, res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var id = req.body.dynamicNum;
    // console.log(a);
    myMagic.query("select *  from showdy where dy_num=?", [id], function (err, row, fields) {
        myMagic.end();
        if (err) throw err;
        if (row.length === 1) {
            // console.log(row);
            var str = JSON.stringify(row);
            res.send(str);
        }
        else {
            res.send("动态查询错误")
        }
    })
};

// 编辑动态
exports.adDyChageText = function (req, res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var text = req.body.dytext;
    var idnum = req.body.idnum;
    console.log(text);
    console.log(idnum);
    myMagic.query("update dynamic set dy_text=? where dy_num=?", [text, idnum], function (err, row, fields) {
        myMagic.end();
        // console.log("ok");
        if (err) throw err;
        else
            res.send("动态修改成功");
    })
};

// 删除动态
exports.adDyDelete = function (req, res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var id = req.body.dyNum;
    // console.log(id);
    myMagic.query("delete from dynamic where dy_num=?", [id], function (err, row, fields) {
        myMagic.end();
        if (err) throw err;
        else
            res.send("删除成功");
    })
};

// 刷新动态
exports.adDyRenovate = function (req, res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
//查找数据动态
    myMagic.query("select * from showdy", function (err, row, fields) {
        myMagic.end();
        if (err) throw err;
        if (row.length === 0)
            res.send("无动态");
        else {
            for (var i = 0; i < row.length; i++) {
                var a = row[i].dy_time;
                row[i].dy_time = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8)
            }
            res.send(row);
        }
    })
};

//查询动态
exports.adDyFind = function (req, res) {
    var myMagic = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'magic'
    });
    var str = req.body.seachtext;
    str = "%" + str + "%";
    myMagic.query("SELECT * FROM showdy where dy_num like binary ?  OR user_name like binary ? OR dy_time like binary ? OR dy_text LIKE binary ?; ", [str, str, str, str], function (err, row, fields) {
        myMagic.end();
        if (err) throw err;
        else {
            for (var i = 0; i < row.length; i++) {
                var a = row[i].dy_time;
                row[i].dy_time = a.toLocaleDateString() + ' ' + a.toTimeString().substring(0, 8);
            }
            res.send(row);
        }
    })
}

