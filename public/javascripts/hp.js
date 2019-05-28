// 显示比赛
function hpMatch() {
    // alert("pl")
    var num = "usernum=" + sessionStorage.getItem('user_name');
    var str1 = $(
        '<div class="csr-hp-match-texts">' +
        '</div>'
    )
    console.log(num);
    $('.hpAll').empty().append(str1);
    $.ajax({
        url: "hpMatchShow",
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        data: num,
        error: function () {
            alert("err");
        }, success: function (result) {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var str = $(
                    '<div>' +
                    '<img src="' + result[i].game_img + '" class="img-circle csr-hp-match-textsImg">' +
                    '<div class="csr-hp-match-textDiv">' +
                    '<p>' + result[i].game_name + '</p>' +
                    '<p>状态<span class="csr-hp-match-textSpan1">报名成功</span>&nbsp;&nbsp;&nbsp;&nbsp;比赛时间:<span class="csr-hp-match-textSpan2">' + result[i].game_time + '</p>' +
                    '<p>简介：<span>' + result[i].game_text + '</span>' +
                    '</p>' +
                    '</div>' +
                    '</div>'
                )
                $('.csr-hp-match-texts').append(str);

            }
        }
    })
}

// 收藏动态
function csrHpDyCollect(num) {
    // alert("o0");
    var unum = "usernanme=" + sessionStorage.getItem('user_name');
    var data = "dynum=" + num + "&" + unum;
    // console.log(data);
    $.ajax({
        url: "hpDyCollect",
        type: "POST",
        dataType: "text",
        contentType: "application/x-www-form-urlencoded", // OR application/json
        data: data,
        complete: function () {

        },
        success: function (result) {
            alert(result);
        }, error: function () {
            alert("err");
        }
    })
}

// 显示关注
function hpFollow() {
    // alert("ji");
    var num = "username=" + sessionStorage.getItem('user_name');
    $('.row').empty();
    $.ajax({
        url: "hpFollowShow",
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", // OR application/json
        data: num,
        error: function () {
            alert("err");
        }, success: function (result) {
// alert("p");
            for (var i = 0; i < result.length; i++) {
                var uhead = result[i].user_head;
                var uname = result[i].user_name;
                var ugarde = result[i].user_garde;
                var uab = result[i].user_abstract;
                var str = $(
                    '<div class="csr-hp-follow-ues">' +
                    '<div>' +
                    '<img src="' + uhead + '" class="img-circle csr-hp-follow-uesImg">' +
                    '</div>' +
                    '<div>' +
                    '<p class="csr-hp-follow-uesP1">' + uname + '' +
                    '<span class="label label-danger">' + ugarde + '</span></p>' +
                    '<p class="csr-hp-follow-uesP2">' +
                    '<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>&nbsp;已关注' +
                    '</p>' +
                    '<p class="csr-hp-follow-uesP3">简介：<span>' + uab + '</span></p>' +
                    '</div>' +
                    '</div>'
                )
                $('.row').append(str);

            }
        },
        complete: function () {

        }
    })
}

// 显示收藏 没有从数据库中读取
function hpCo() {

    var str = $(
        '<div class=" csr-dynamic-dyDiv">' +
        '<!--右上角箭头 菜单栏-->' +
        '<div class="csr-hp-dyn-rightButtons">' +
        '<button type="button" class="csr-hp-dyn-buttonSpan" onclick="disButton()">' +
        '<span class="glyphicon glyphicon-chevron-down csr-hp-dyn-span" aria-hidden="true">' + '</span>' +
        '</button>' +
        '<div class="csr-hp-dyn-rightButtonsIn">' +
        '<button class="csr-hp-dyn-buttons">收藏</button>' +
        '<button class="csr-hp-dyn-buttons">删除</button>' +
        '</div>' +
        '</div>' +
        '<!--右上角箭头 菜单栏end-->' +
        '<!--头像和用户名-->' +
        '<div class="csr-dynamic-head">' +
        '<img src="images/dynamic_06.jpg" alt="头像dynamic_06" class="img-circle">' +
        '<div>' +
        '<p>fyh</p>' +
        '<p>2018-05-24</p>' +
        '</div>' +
        '</div>' +
        '<!--头像和用户名end-->' +

        '<!--内容正文-->' +
        '<div class="csr-dynamic-second">' +
        '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;好开心呀哈哈哈哈哈哈。今天我有玩魔方了呢，好开心呀哈哈哈哈哈哈。今天我有玩魔方了呢，好开心呀哈哈哈哈哈哈。今天我有玩魔方了呢，好开心呀哈哈哈哈哈哈。今天我有玩魔方了呢，好开心呀哈哈哈哈哈哈。今天我有玩魔方了呢，好开心呀哈哈哈哈哈哈。</p>' +
        '</div>' +
        '<!--内容正文end-->' +
        '<!--图片-->' +
        '<div class="csr-dynamic-third">' +
        '<img src="images/dynamic_16.jpg" alt="dynamic_16">' +
        '<img src="images/dynamic_16.jpg" alt="dynamic_16">' +
        '<img src="images/dynamic_16.jpg" alt="dynamic_16">' +
        '</div>' +
        '<!--图片end-->' +
        '<!--右侧按钮-->' +
        '<div class="csr-dynamic-right">' +
        '<button class="csr-dynamic-spanThumbsUp" onclick="spanOnclick1()">' +
        '<span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">' + '</span>' +
        '</button>' +
        '<button class="csr-dynamic-spanCollection" onclick="spanOnclick2()">' +
        '<span class=" glyphicon glyphicon-star" aria-hidden="true">' + '</span>' +
        '</button>' +
        '<button class="csr-dynamic-spanFollow" onclick="spanOnclick0()">' +
        '<span class="glyphicon glyphicon-heart" aria-hidden="true">' + '</span>' +
        '</button>' +
        '</div>' +
        '<!--右侧按钮end-->' +
        '<hr class="csr-dynamic-hr">' +
        '<!--点赞显示-->' +
        '<div class="csr-dynamic-thumbUp">' +
        '<img src="images/dynamic_25.jpg" class="img-circle" alt="dynamic_25">' +
        '<p>fyh</p>' +
        '<p>、</p>' +
        '<p>fyh</p>' +
        '<p>、</p>' +
        '<p>fyh</p>' +
        '</div>' +
        '<!--点赞显示end-->' +
        '<!--评论显示-->' +
        '<div class="csr-dynamic-commentOld">' +
        '<div>' +
        '<img src="images/dynamic_06.jpg" alt="dynamic_06" class="img-circle">' +
        '<div>' +
        '<p>fyh</p>' +
        '<p>&nbsp;:&nbsp;</p>' +
        '<p>那你真的很棒棒哟！</p>' +
        '<br>' +
        '<p>2018-05-24</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<!--评论显示end-->' +
        '<!--输入评论框-->' +
        '<div class="csr-dynamic-commentNew">' +
        '<textarea cols="30" rows="5" onclick="textareaIn()" id="csr-dynamic-textarea"  class="inputOld" onkeyup="fontNumber()">评论</textarea>' +
        '<p class="csr-dynamic-textareaP">你还可以输入<span id="csr-dynamic-count">150</span>个字符</p>' +
        '<button type="button" class="btn btn-warning csr-dynamic-counmentNewBut">发表</button>' +
        '</div>' +
        '<!--输入评论框end-->' +
        '<p>&nbsp;</p>' +
        '</div>'
    )
    $('.col-md-10').empty().append(str);
}


// 多文件提交 模拟点击
function fileSubmit() {
    alert("ji")
    $('#csr-hp-file1').trigger("click");
}

// function submitImgs() {
//     var formData = new FormData(document.getElementById('csr-hp-file'));
//     var str = document.getElementsByClassName('csr-hp-dyn-publicationInput')[0];
//     console.log(str.innerHTML);
//     console.log(formData.get('imgname'));
//     formData.append('text', str.innerHTML);
//     var uname=sessionStorage.getItem('user_name');
//     console.log(uname);
//     formData.append('username',"123465");
//     console.log(formData.get('username'));
//
//     $.ajax({
//         url: "adFormSubmit",
//         type: "post",
//         processData: false,//不处理数据
//         contentType: false,//不设置内容形式
//         dataType: 'text',
//         data: formData,
//         complete: function () {
//         },
//         success: function (result) {
//             alert(result);
//         },
//         error: function () {
//             alert("err");
//         }
//     })
// }