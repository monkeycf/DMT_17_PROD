// 顶部导航栏
// 鼠标悬浮显示
// function displayCsrHomePageLi(li) {
//     var a = li.getElementsByTagName("div")[0];
//     a.style.display = "block";
// }

// //鼠标移开隐藏
// function noDisplayCsrHomePageLi(li) {
//     var a = li.getElementsByTagName("div")[0];
//     a.style.display = "none";
// }

//search result
// 当鼠标移动，则将色块向左移动
function displayCsrSearch(a) {
    var q = a.getElementsByClassName("csr-search-resultRight")[0];
    q.style.right = "0";
}

function noDisplayCsrSearch(a) {
    var q = a.getElementsByClassName("csr-search-resultRight")[0];
    q.style.right = "-200px";
}

//dynamic
//轮播图
$(document).ready(function () {
    $(".csr-dynamic-but0:eq(0)").click(function () {
            $(".csr-dynamic-move").removeClass("csr-dynamic-move");
            $(".csr-dynamic-move2:eq(0)").css("margin-left", "0");
            setTimeout(function () {
                $('#move1').removeClass('csr-dynamic-change1').addClass('csr-dynamic-move');
            }, 500);
        }
    );

    $(".csr-dynamic-but1:eq(0)").click(function () {
        $(".csr-dynamic-move").removeClass("csr-dynamic-move");
        $(".csr-dynamic-move2:eq(0)").css("margin-left", "-100%");
        setTimeout(function () {
            $('#move1').addClass('csr-dynamic-change1');
        }, 1000);
        setTimeout(function () {
            $('#move1').removeClass('csr-dynamic-change1').addClass('csr-dynamic-move');
        }, 2000);
    });

    $(".csr-dynamic-but2:eq(0)").click(function () {
        $(".csr-dynamic-move").removeClass("csr-dynamic-move");
        $(".csr-dynamic-move2:eq(0)").css("margin-left", "-200%");
        setTimeout(function () {
            $('#move1').addClass('csr-dynamic-change2');
        }, 1000);
        setTimeout(function () {
            $('#move1').removeClass('csr-dynamic-change2').addClass('csr-dynamic-move');
        }, 5000);
    });

    $(".csr-dynamic-but3:eq(0)").click(function () {
        $(".csr-dynamic-move").removeClass("csr-dynamic-move");
        $(".csr-dynamic-move2:eq(0)").css("margin-left", "-300%");
        setTimeout(function () {
            $('#move1').addClass('csr-dynamic-change3');
        }, 1000);
        setTimeout(function () {
            $('#move1').removeClass('csr-dynamic-change3').addClass('csr-dynamic-move');
        }, 7000);
    });
});



// 点击变换颜色
function spanOnclick1() {
    $('.csr-dynamic-spanThumbsUp:eq(0)').toggleClass('csr-dynamic-spanRed');
}

function spanOnclick2() {
    $('.csr-dynamic-spanCollection:eq(0)').toggleClass('csr-dynamic-spanOrange');
}

function spanOnclick0() {
    $('.csr-dynamic-spanFollow:eq(0)').toggleClass('csr-dynamic-spanRed');
}

// 清楚p内容
function clearP() {
    var a=document.getElementsByClassName("csr-hp-headP2")[0];
    a.innerHTML="";
}


//p回车
function tijiao() {
    if (event.keyCode === 13) {
        var a = document.getElementsByClassName("csr-hp-headP2")[0].innerHTML;
        a = a.substring(0, a.length - 1);
        alert("aaa");
        return false;
    }
    else {
        alert("ppp");
    }
}
// 收藏 删除
function disButton() {
    $(".csr-hp-dyn-rightButtonsIn:eq(0)").toggleClass("csr-hp-dyn-dis");
}

// introduce

// introduce end