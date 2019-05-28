// 显示用户
function disuser() {
    $('.csr-ad-left button:nth-child(3)').css("color", "#a8b1c1");
    $('.csr-ad-left button:nth-child(4)').css("color", "white");
    $('.csr-ad-left button:nth-child(5)').css("color", "#a8b1c1");
    $('.csr-ad-table:eq(0)').empty();
    $('.csr-ad-formFirst:eq(0)').empty();
    $('#csr-ad-table1').removeClass('csr-ad-table');
    $('#csr-ad-table1').removeClass('csr-ad-table1');
    $('#csr-renovate-dy').attr('id', 'csr-renovate-user');
    var str = document.getElementsByClassName("csr-ad-p")[0];
    str.innerHTML = "用户管理";
    $.ajax({
        url: "adUserShow",
        type: "POST",
        dataType: "json", // expected format for response
        contentType: "application/x-www-form-urlencoded", // OR application/json
        data: "",
        complete: function () {
        },
        success: function (result) {
            var str3 = $(
                '<input type="search" name="seachtext" id="csr-ad-findwhat">' +
                '<input class="csr-ad-submit" type="submit" id="csr-find-user" onclick="finduser()" value="查找">' +
                '<input class="csr-ad-submit csr-ad-renovate" type="button" id="csr-renovate-user" onclick="shownewdy()" value="刷新">'
            );
            $('.csr-ad-formFirst:eq(0)').append(str3);
            if (result.length === 0) {
                alert("无查询结果");
            } else {
                console.log(result);
                // enterdy(json);
                var str = $('<thead class="csr-ad-thead1">' +
                    '<tr>' +
                    '<td>用户编号</td>' +
                    '<td>用户电话</td>' +
                    '<td>用户名</td>' +
                    '<td>用户密码</td>' +
                    '<td>用户真实姓名</td>' +
                    '<td>用户简介</td>' +
                    '<td>注册时间</td>' +
                    '<td>&nbsp;</td>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody id="csr-ad-tbody1">'
                );
                $('#csr-ad-table1').append(str);

                enteruser(result);
            }
        },
        error: function () {
            alert('error');
            //called when there is an error
        }
    })

}

// 加入用户数据
function enteruser(json) {
    for (var i = 0; i < json.length; i++) {
        var unum = json[i].user_num;
        var uphone = json[i].user_phone;
        var uname = json[i].user_name;
        var upass = json[i].user_password;
        var utrue = json[i].user_truename;
        var utext = json[i].user_abstract;
        var uregday = json[i].user_regday;
        var str = $(
            '<tr>' +
            '<td>' + unum + '</td>' +
            '<td>' + uphone + '</td>' +
            '<td>' + uname + '</td>' +
            '<td>' + upass + '</td>' +
            '<td>' + utrue + '</td>' +
            '<td>' + utext + '</td>' +
            '<td>' + uregday + '</td>' +
            '<td>' +
            '<td>' +

            //     <!-- Button trigger modal -->
            ' <button type="button" class="btn btn-primary btn-sm csr-ad-button1" data-toggle="modal" data-target="#myModal"  onclick="changeuser(' + unum + ')"  id="' + unum + '">' +
            '编辑' +
            '</button>' +
            //         <!--模态框 boot-->
            //         <!-- Modal -->
            '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabe2">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header1">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '<h4 class="modal-title" id="myModalLabe2">456</h4>' +
            '</div>' +
            '<div class="modal-body">' +


            '<form class="csr-ad-modalForm1" id="csr-ad-user' + unum + '">' +

            '</form>' +

            '</div>' +
            '<div class="modal-footer1">' +

            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<!--模态框 end-->' +
            // '<button id=""  class="btn btn-primary btn-sm  csr-ad-button2">' +
            ' <button id="' + unum + '"  class="btn btn-primary btn-sm  csr-ad-button2" onclick="deleteuser(' + unum + ')">' +
            '删除' +
            '</button>' +
            '</td>' +
            '</td>' +
            '</tr>' +
            '</tbody>'
        )
        $('#csr-ad-table1').append(str);

    }
}

// 用户修改
function changeuser(a) {
    $('.csr-ad-modalForm1:eq(0)').empty();
    $('.modal-header1:eq(0)').empty();
    $('.modal-footer1:eq(0)').empty();
    var usernum = "userNum=" + a;
    $.ajax({
        url: "adUserChangeShow",
        type: "POST",
        dataType: "json", // expected format for response
        contentType: "application/x-www-form-urlencoded", // OR application/json
        data: usernum,
        complete: function () {
        },
        success: function (json) {
            var unum = json[0].user_num;
            var uphone = json[0].user_phone;
            var uname = json[0].user_name;
            var upass = json[0].user_password;
            var utrue = json[0].user_truename;
            var utext = json[0].user_abstract;
            var uregday = json[0].user_regday;
            var str1 = $(
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<h4 class="modal-title" id="myModalLabe2' + unum + '">' + unum + '</h4>'
            );
            var str2 = $(
                '<button type="button" class="btn btn-default" data-dismiss="modal">Close' +
                '</button>' +
                '<button type="button" class="btn btn-primary" id="csr-ad-modalSave ' + unum + '" onclick="saveuser(' + unum + ')">Savechanges' +
                '</button>'
            );

            $('.modal-header1:eq(0)').append(str1);
            $('.modal-footer1:eq(0)').append(str2);
            var str = $(
                '<div>' +
                '<label>用户电话</label>' +
                '<input type="text" class="csr-ad-modalText" value="' + uphone + '" name="newphone">' +
                '</div>' +
                '<div>' +
                '<label>用户名</label>' +
                '<div>' +
                '<input type="text" class="csr-ad-modalText" value="' + uname + '" name="newname">' +

                '</div>' +
                '</div>' +
                '<div>' +
                '<label>用户密码</label>' +
                '<input type="text" class="csr-ad-modalText" value="' + upass + '" name="newpass">' +
                '</div>' +
                '<div>' +
                '<label>用户真实姓名</label>' +
                '<input type="text" class="csr-ad-modalText" value="' + utrue + '" name="newtrue">' +
                '</div>' +
                '<div>' +
                '<label>用户简介</label>' +
                '<input type="text" class="csr-ad-modalText" value="' + utext + '" name="newtext">' +
                '</div>' +
                '<div>' +
                '<label>用户注册时间</label>' +
                '<input type="text" id="csr-ad-modalDiv1" value="' + uregday + '" \>' +
                '</div>'
            );
            $('.csr-ad-modalForm1:eq(0)').append(str);

        },

        error: function () {
            alert('error');
            //called when there is an error
        }
    });
}

//删除用户
function deleteuser(a) {
    event.preventDefault();
    var usernum = a;
    if (confirm("请确认是否删除" + usernum + "用户")) {
        var str = "usernum=" + usernum;
        $.ajax({
                url: "adUserDelete",
                type: "POST",
                dataType: "text", // expected format for response
                contentType: "application/x-www-form-urlencoded", // OR application/json
                data: str,
                complete: function () {
                    $('#csr-renovate-user').trigger("click");
                },
                success: function (result) {
                    alert(result);
                },
                error: function () {
                    alert('error');
                }
            }
        )
    }
    else
        return false;
}

// 刷新用户
function shownewdy() {
    $('#csr-ad-tbody1').empty();
    $.ajax({
        url: "adUserRenovate",
        type: "POST",
        dataType: "json", // expected format for response
        contentType: "application/x-www-form-urlencoded", // OR application/json
        data: "",
        complete: function () {
        },
        success: function (json) {
            if (json.length === 0) {
                alert("无动态")
            } else {
                enteruser(json);
            }
        },
        error: function () {
            alert('error');
            //called when there is an error
        }
    })
}

//查询用户
function finduser() {
    event.preventDefault();
    var userdata = $('form').serialize();
    $('#csr-ad-tbody1').empty();
    $.ajax({
        url: "adUserFind",
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        data: userdata,
        complete: function () {
            document.getElementById('csr-ad-findwhat').value = "";
        },
        success: function (json) {
            if (json.length === 0) {
                alert("无用户")
            } else {
                enteruser(json);
            }
        },
        error: function () {
            alert('error');
            //called when there is an error
        }
    })

}

//保存修改值用户
function saveuser(a) {
    var usernum = 'unum=' + a;
    var str1 = $('#csr-ad-user18001').serialize();
    var userdate = usernum + "&" + str1;
    $.ajax({
            url: "adUserChangeText",
            type: "POST",
            dataType: "text", // expected format for response
            contentType: "application/x-www-form-urlencoded", // OR application/json
            data: userdate,
            complete: function () {
                //关闭模态框
                $('#myModal').modal('toggle');
                setTimeout(function () {
                    $('#csr-renovate-user').trigger("click");
                }, 500);
            },
            success: function (result) {
                alert(result);
            },
            error: function () {
                alert('error');
                //called when there is an error
            }
        }
    )
}
