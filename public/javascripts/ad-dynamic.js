$(function () {

//管理员查询动态
    $('#csr-find-dy').click(function (event) {
        event.preventDefault();
        var dydate = $('form').serialize();
        $('.csr-ad-tbody:eq(0)').empty();
        $.ajax({
            url: "adDyFind",
            type: "POST",
            dataType: "json", // expected format for response
            contentType: "application/x-www-form-urlencoded", // OR application/json
            data: dydate,
            complete: function () {
                document.getElementById('csr-ad-findwhat').value = "";
            },
            success: function (json) {
                if (json.length === 0) {
                    alert("无查询结果")
                } else {
                    enterdy(json);
                }
            },
            error: function () {
                alert('error');
            }
        })
    })
    // 管理员刷新动态
    $('#csr-renovate-dy').click(function () {
        $('.csr-ad-tbody:eq(0)').empty();
        $.ajax({
            url: "adDyRenovate",
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
                    enterdy(json);
                }
            },
            error: function () {
                alert('error');
            }
        })
    })
});

// 管理员编辑动态
function changedy(a) {
    $('.csr-ad-modalForm:eq(0)').empty();
    $('.modal-header:eq(0)').empty();
    $('.modal-footer:eq(0)').empty();
    var dynum = "dynamicNum=" + a;
    $.ajax({
        url: "adDyChangeShow",
        type: "POST",
        dataType: "text", // expected format for response
        contentType: "application/x-www-form-urlencoded", // OR application/json
        data: dynum,
        complete: function () {
        },
        success: function (result) {
            var json = JSON.parse(result);
            var userName = json[0].user_name;
            var dyNum = json[0].dy_num;
            var dyTime = json[0].dy_time;
            var dyText = json[0].dy_text;
            var dyP1 = json[0].dy_p1;
            var dyP2 = json[0].dy_p2;
            var dyP3 = json[0].dy_p3;
            var str1 = $(
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<h4 class="modal-title" id="myModalLabel' + dyNum + '">' + dyNum + '</h4>'
            )
            var str2 = $(
                '<button type="button" class="btn btn-default" data-dismiss="modal">Close' +
                '</button>' +
                '<button type="button" class="btn btn-primary" id="csr-ad-modalSave ' + dyNum + '" onclick="savedy(' + dyNum + ')">Savechanges' +
                '</button>'
            )
            $('.modal-header:eq(0)').append(str1);
            $('.modal-footer:eq(0)').append(str2);
            var str = $(
                '<div>' +
                '<label>用户名</label>' +
                '<input type="text" id="csr-ad-modalDiv1" value="' + userName + '" disabled>' +
                '</div>' +
                '<div>' +
                '<label>图片</label>' +
                '<div>' +
                '<img src="' + dyP1 + '" alt="图片1">' +
                '<img src="' + dyP2 + '" alt="图片2">' +
                '<img src="' + dyP3 + '" alt="图片3">' +
                '</div>' +
                '</div>' +
                '<div>' +
                '<label>内容</label>' +
                '<input type="text" class="csr-ad-modalText" value="' + dyText + '" name="dytext">' +
                '</div>' +
                '<div>' +
                '<label>发布时间</label>' +
                '<input type="text" id="csr-ad-modalDiv2" value="' + dyTime + '" disabled>' +
                '</div>'
            )
            $('.csr-ad-modalForm:eq(0)').append(str);
        },
        error: function () {
            alert('error');
        }
    });
}


//删除动态
function deletedy(a) {
    event.preventDefault();
    var dynum = a;
    if (confirm("请确认是否删除" + dynum + "动态")) {
        var str = "dyNum=" + dynum;
        $.ajax({
                url: "adDyDelete",
                type: "POST",
                dataType: "text", // expected format for response
                contentType: "application/x-www-form-urlencoded", // OR application/json
                data: str,
                complete: function () {
                    $('#csr-renovate-dy').trigger("click");
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

// 填充内容
function enterdy(json) {
    for (var i = 0; i < json.length; i++) {
        // console.log(json[i]['dy_num']);
        console.log(json);
        console.log(json[i]['dy_p3']);
        var str = $(
            '<tr>' +
            '<td>' + json[i]['dy_num'] + '</td>' +
            '<td>' + json[i]['user_name'] + '</td>' +
            '<td><img src="' + json[i]['dy_p1'] + '" alt="图片"><img src="' + json[i]['dy_p2'] + '" alt="图片"><img src="' + json[i]['dy_p3'] + '" alt="图片"></td>' +
            '<td>' +
            '<div>' + json[i]['dy_text'] + '</div>' +
            '</td>' +
            '<td>' + json[i]['dy_time'] + '</td>' +
            '<td>' +

            //     <!-- Button trigger modal -->
            ' <button type="button" class="btn btn-primary btn-sm csr-ad-button1" data-toggle="modal" data-target="#myModal"  onclick="changedy(' + json[i]['dy_num'] + ')"  id="' + json[i]['dy_num'] + '">' +
            '编辑' +
            '</button>' +
            //         <!--模态框 boot-->
            //         <!-- Modal -->
            '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '<h4 class="modal-title" id="myModalLabel">456</h4>' +
            '</div>' +
            '<div class="modal-body">' +

            '<form class="csr-ad-modalForm">' +
            '</form>' +

            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal">' +
            'Close' +
            '</button>' +
            '<button type="button" class="btn btn-primary" id="csr-ad-modalSave">' +
            'Savechanges' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<!--模态框 end-->' +
            // '<button id=""  class="btn btn-primary btn-sm  csr-ad-button2">' +
            ' <button id="' + json[i]['dy_num'] + '"  class="btn btn-primary btn-sm  csr-ad-button2" onclick="deletedy(' + json[i]['dy_num'] + ')">' +
            '删除' +
            '</button>' +
            '</td>' +
            '</tr>'
        )
        $('.csr-ad-tbody:eq(0)').append(str);
    }
}

//保存修改值动态
function savedy(a) {
    var dyText = $('.csr-ad-modalForm:eq(0)').serialize();
    var idNum = "&idnum=" + a;
    var dydate = dyText + idNum;
    $.ajax({
            url: "adDyChangeText",
            type: "POST",
            dataType: "text", // expected format for response
            contentType: "application/x-www-form-urlencoded", // OR application/json
            data: dydate,
            complete: function () {
                //关闭模态框
                $('#myModal').modal('toggle');
                setTimeout(function () {
                    $('#csr-renovate-dy').trigger("click");
                }, 500);
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

// 显示动态
function disdy() {
    window.location.href = "/adstart";
}
