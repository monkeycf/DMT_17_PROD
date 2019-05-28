// 手机登录界面
function clickLand1() {
    var a = document.getElementsByClassName("csr-land-img1")[0];
    a.src = "images/land_phonum_03.jpg";
    $(".csr-land-head div:eq(0) button").css("color", "white");
    $(".csr-land-head div:eq(0) ").css("border-bottom", "white 2px solid");
    $(".csr-land-head div:eq(1) button").css("color", "#0296f5");
    $(".csr-land-head div:eq(1) ").css("border-bottom", "#017fd2 2px solid");
}

// 用户登录界面
function clickLand2() {
    var a = document.getElementsByClassName("csr-land-img1")[0];
    a.src = "images/land_03.jpg";
    $(".csr-land-head div:eq(1) button").css("color", "white");
    $(".csr-land-head div:eq(1) ").css("border-bottom", "white 2px solid");
    $(".csr-land-head div:eq(0) button").css("color", "#0296f5");
    $(".csr-land-head div:eq(0) ").css("border-bottom", "#017fd2 2px solid");
}

// 用户登录实现
$(function () {
    $('.csr-land-submit:eq(0)').click(function (event) {
        event.preventDefault();
        var flag = ($("input[type='checkbox']").is(':checked'));
        var str2 = document.getElementsByClassName("csr-land-input2")[0];
        var str = document.getElementsByClassName("csr-land-input1")[0];
        var datastr1 = $('form').serialize();
        var datastr = datastr1 + "&flag=" + flag;
        $.ajax({
            url: "landFind",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded", // OR application/json
            data: datastr,
            complete: function () {
                str.value = "";
                str2.value = "";
            },
            success: function (result) {

                // console.log(result);
                if (result === 0) {
                    alert("用户名错误");
                }
                else if (result === 1) {
                    alert("密码错误");
                }
                else {
                    alert("登录成功");
                    // alert( result.unum);
                    sessionStorage.setItem('user_name', result.unum);
                    sessionStorage.setItem('user_head', result.uhead);
                    // var userName=localStorage.getItem('name');
                    // document.getElementById('name').innerText='欢迎'+userName+'登录教务系统';
                    location.replace("/index");
                    // console.log(result);
                }
            },
            error: function () {
                alert('error');
            }
        })
    })
});