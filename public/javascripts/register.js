//第一页表单提交
function submit1() {
    event.preventDefault();
    var data = $('#csr-register-form1').serialize();
    $.ajax({
        url: "registerNext",
        type: "POST",
        dataType: "text",
        contentType: "application/x-www-form-urlencoded", // OR application/json
        data: data,
        complete: function () {
        },
        success: function (result) {
            if (result === 'ok') {
                $('.csr-register-usersContent').empty();
                $('.csr-register1-bread1:eq(0)').css('color', 'white');
                $('.csr-register1-bread1:eq(1)').css('color', 'blue');
                var str = $(
                    '<div class="csr-register-in">' +
                    '<form class="form-horizontal" id="csr-form-three">' +
                    '<div class="form-group">' +
                    '<label for="inputEmail0" class="col-sm-2 control-label">用户名</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="text" class="form-control" id="inputEmail0" placeholder="设置用户名" required="required" name="uname">' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="inputPassword0" class="col-sm-2 control-label">密码</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="password" class="form-control" id="inputPassword0" placeholder="设置密码" required="required" pattern="^[a-zA-Z0-9]{8,}$" name="pass"><span >*只允许输入英文和数字，且至少8位</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="inputPassword1" class="col-sm-2 control-label">确认密码</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="password" class="form-control" id="inputPassword1" placeholder="确认密码" required="required" pattern="^[a-zA-Z0-9]{8,}$" name="okname" onkeyup="samewith()"><span  id="csr-register-span"></span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="inputPassword2" class="col-sm-2 control-label">姓名</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="text" class="form-control" id="inputPassword2" placeholder="真实姓名" required="required" name="true">' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="inputPassword3" class="col-sm-2 control-label">出生日期</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="date" class="form-control" id="inputPassword3" required="required" name="udate">' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="inputPassword4" class="col-sm-2 control-label">上传头像</label>' +
                    '<div class="col-sm-10">' +
                    '<input type="file" class="form-control" id="inputPassword4" required="required" name="userimg">' +
                    '</div>' +
                    '</div>' +
                    '<button type="submit" class="btn btn-primary csr-register-usersNext" onclick="submit2()">下一步</button>' +
                    '</form>' +
                    '</div>'
                );
                $('.csr-register-usersContent').append(str);
            }
            else {
                alert(result);
            }
        },
        error: function () {
            alert("error");
        }
    })
}

function samewith() {
    var a = document.getElementById('inputPassword0');
    var b = document.getElementById('inputPassword1');
    document.getElementById('csr-register-span').style.color = "red";
    if (a.value != b.value) {
        document.getElementById('csr-register-span').innerText = "两次密码不同";
    }
    else {
        document.getElementById('csr-register-span').innerText = "";
    }
}

// 第二页表单提交
function submit2() {
    event.preventDefault();
    var data = document.getElementById('csr-form-three');
    var name = document.getElementById('inputEmail0');
    sessionStorage.setItem('user_name', name.value);
    var formdata = new FormData(data);
    $.ajax({
        url: "registerSubmit",
        type: "post",
        processData: false,//不处理数据
        contentType: false,//不设置内容形式
        dataType: 'json',
        data: formdata,
        complete: function () {
        },
        success: function (result) {
            $('.csr-register-usersContent').empty();
            $('.csr-register1-bread1:eq(0)').css('color', 'white');
            $('.csr-register1-bread1:eq(1)').css('color', 'white');
            $('.csr-register1-bread1:eq(2)').css('color', 'blue');
            var str = $(
                '<div class="csr-register-in">' +
                '<form class="form-horizontal">' +
                '<p>请选择你喜欢的标签</p>' +
                '<div class="csr-register-labels">' +
                '</div>' +
                '<button type="submit" class="btn btn-primary csr-register-usersNext" onclick="submit3()">下一步</button>' +
                '</form>' +
                '</div>'
            );
            $('.csr-register-usersContent').append(str);
            for (var i = 0; i < result.length; i++) {
                var str1 = $(
                    '<button type="button" class="btn btn-default csr-register-labelButton">' + result[i].l_text + '</button>'
                )
                $('.csr-register-labels').append(str1);
            }
        },
        error: function () {

        }
    })
}

// 第三页表单提交
function submit3() {
    event.preventDefault();
    $('.csr-register-usersContent').empty();
    $('.csr-register1-bread1:eq(0)').css('color', 'white');
    $('.csr-register1-bread1:eq(1)').css('color', 'white');
    $('.csr-register1-bread1:eq(2)').css('color', 'white');
    $('.csr-register1-bread1:eq(3)').css('color', 'blue');
    var vname = sessionStorage.getItem('user_name');
    var name = 'username=' + vname;
    // alert(name);
    $.ajax({
        url: "registerOk",
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        data: name,
        complete: function () {
            setTimeout(function () {
                location.replace("/index");
            }, 3000)
        }, success: function (result) {
            sessionStorage.setItem('user_head', result.uhead);
            var str = $('<div class="csr-register-okNext">' +
                '<img src="images/register4_1.jpg" />' +
                '<p><span>' + vname + '</span>用户，恭喜您完成注册！</p><br>' +
                '<p><span>3</span>秒后返回首页</p>' +
                '</div>'
            )
            // alert("pop");
            $('.csr-register-usersContent').append(str);

        }, error: function () {
            alert("err");
        }
    })

}

$(function () {
    $('.csr-register1-bread1:eq(0)').css('color', 'blue');
    $('.csr-register-labelButton').click(function (event) {
        $(this).css("background-color", "#e6e6e6");
    });
});


