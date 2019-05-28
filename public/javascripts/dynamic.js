// 点击文本框，输入框展开并提示还能输入多少字符
function textareaIn(num) {
    var a = document.getElementById("csr-dynamic-textarea" + num);
    a.innerText = "";
    $('#csr-dynamic-textarea' + num).removeClass("inputOld").addClass("inputNew");
    $('#csr-dynamic-P' + num).css("display", "block");
    $("#csr-dynamic-NewBut" + num).css("display", "block");
}

// 计算还能输入多少字，并去除多余的字
function fontNumber(num) {
    var textArea = document.getElementById("csr-dynamic-textarea" + num);
    var count = document.getElementById("csr-dynamic-count" + num);
    var number = 150 - (textArea.value.length - textArea.defaultValue.length);
    count.textContent = number + "";
    if (count.innerText <= 0) {
        textArea.value = textArea.value.substring(0, 149);
    }
}

//点赞
function takeRed1(num) {
    if (sessionStorage.getItem('user_name') === null)
        alert("请先登录");
    else {
        var str = "dnum=" + num + "&uname=" + sessionStorage.getItem('user_name');
        $.ajax({
            url: "dyGiveNice",
            type: "POST",
            dataType: "text",
            contentType: "application/x-www-form-urlencoded",
            data: str,
            complete: function () {
            },
            success: function (result) {
                if (result === 'ok') {
                    $('#csr-dynamic-spanThumbsUp' + num).toggleClass("csr-dynamic-spanRed");
                }
            }, error: function () {
                alert("err")
            }
        })
    }
}

//收藏
function takeRed2(num) {
    if (sessionStorage.getItem('user_name') === null)
        alert("请先登录");
    else {
        var str = "dnum=" + num + "&uname=" + sessionStorage.getItem('user_name');
        $.ajax({
            url: "dyUserC",
            type: "POST",
            dataType: "text",
            contentType: "application/x-www-form-urlencoded",
            data: str,
            complete: function () {
            },
            success: function (result) {
                if (result === 'ok')
                    $('#csr-dynamic-spanCollection' + num).toggleClass("csr-dynamic-spanRed");
            }, error: function () {
                alert("err");
            }
        })
    }


}

// 关注
function takeRed3(num) {
    if (sessionStorage.getItem('user_name') === null)
        alert("请先登录");
    else {
        var str = "dnum=" + num + "&uname=" + sessionStorage.getItem('user_name');
        $.ajax({
            url: "dyUserFollow",
            type: "POST",
            dataType: "text",
            contentType: "application/x-www-form-urlencoded",
            data: str,
            complete: function () {
            },
            success: function (result) {
                if (result === 'ok')
                    $('#csr-dynamic-spanFollow' + num).toggleClass("csr-dynamic-spanRed");
            }, error: function () {
                alert("err");
            }
        })
    }


}

// 显示下部分
function showAnDynamic(num) {
    // alert("re");
    if (sessionStorage.getItem('user_name') === null)
        alert("请先登录");
    else {
        // $('#anDynamic' + num).empty();
        // console.log(num);
        var str = "dynum=" + num;
        $.ajax({
            url: "dyDownLand",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: str,
            complete: function () {
                // alert("jp");
                $.ajax({
                    url: "dyDiscuss",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/x-www-form-urlencoded",
                    data: str,
                    success: function (row) {
                        // alert("hi");
                        $('#csr-dynamic_comment'+num).empty();

                        // console.log(row);
                        for(var i=0;i<row.length;i++)
                        {
                        var str = $(
                            '<div>' +
                            '<img src="'+row[i].user_head+'" alt="dynamic_06" class="img-circle">' +
                            '<div>' +
                            '<p>'+row[i].user_name+'</p>' +
                            '<p>&nbsp;:&nbsp;</p>' +
                            '<p>'+row[i].dy_text+'</p>' +
                            '<br>' +
                            '<p>'+row[i].dy_texttime+'</p>' +
                            '</div>' +
                            '</div>'
                        )
                        $('#csr-dynamic_comment'+num).append(str);
                        }
                    },
                    error: function () {
                        alert("err");
                    },
                    complete:function () {
                        $('#anDynamic' + num).slideDown("slow");
                    }
                })
            },
            success: function (result) {
                $('#csr-dynamicP-' + num).empty();

                console.log(result);
                for (var i = 0; i < result.length; i++) {
                    console.log(i)
                    var str = $(
                        '<span>' + result[i].user_name + '、</span>'
                    );
                    $('#csr-dynamicP-' + num).append(str);
                }
            },
            error: function () {
                alert("Err");
            }
        })

    }
}

// 提交评论内容
function textSubmit(num) {
    var date = new Date();
    var day = date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
    var textArea = document.getElementById("csr-dynamic-textarea" + num);
    var uname = sessionStorage.getItem('user_name')
    var str = "dnum=" + num + "&uname=" + uname + "&texts=" + textArea.value;
    $.ajax({
        url: "dyUserText",
        type: "POST",
        dataType: "text",
        contentType: "application/x-www-form-urlencoded",
        data: str,
        complete: function () {
        },
        success: function (result) {
            var str = $(
                '<div>' +
                '<img src="images/dynamic_06.jpg" alt="dynamic_06" class="img-circle">' +
                '<div>' +
                '<p>' + uname + '</p>' +
                '<p>&nbsp;:&nbsp;</p>' +
                '<p>' + textArea.value + '</p>' +
                '<br>' +
                '<p>' + day + '</p>' +
                '</div>' +
                '</div>'
            )
            // $('.csr-dynamic-commentOld').append(str);
            // alert(result);
        }, error: function () {
            alert("err");
        }
    })
}
