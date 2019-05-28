function findwhat() {
    event.preventDefault();
    var str = $('#csr-search-form1').serialize();
    $.ajax({
        url: 'findWhat',
        type: 'POST',
        dataType: 'text',
        contentType: "application/x-www-form-urlencoded", // OR application/json
        data: str,
        complete: function () {

        },
        success: function (result) {
            if(result==="没有符合的动态")
            {
                alert(result);
            }
            else {
                var str=JSON.parse(result);
           for(var i=0;i<result.length;i++)
           {
               var dynum=str[i].dy_num;
               var dytext=str[i].dy_text;
               var dytime=str[i].dy_time;
               var username=str[i].user_nam;
               var str1=$(
               '<div class="csr-search-resultDiv" onmouseover=" displayCsrSearch(this)" onmouseout="noDisplayCsrSearch(this)">'+
               '<div class="csr-search-resultRight">'+
               '<p> 点击查看详情-></p>'+
               '</div>'+
               '<div class="csr-search-resultLeft csr-search'+dynum+'" >'+
               '<p>'+dytext+'</p>'+
           '<span class="glyphicon glyphicon-time csr-search-time" aria-hidden="true">'+dytime+'&nbsp;&nbsp;&nbsp;'+username+'</span>'+
           '</div>'+
           '</div>'
           )
           $('#csr-search-add').append(str1);
           }}
        },
        error: function () {
            alert("error");
        }
    })
}