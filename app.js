var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var land = require('multer');//文件

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dynamicRouter = require('./routes/dynamic');
var searchRouter = require('./routes/search');
var hpCollectionRouter = require('./routes/hp-collection');
var registe1Router = require('./routes/rgister1');
var adDynamicRouter = require('./routes/ad-dynamic');
var adUserRouter = require('./routes/ad-user');
var introduceRouter = require('./routes/introduce');
var landRouter = require('./routes/land');
var exitRouter = require('./routes/exit');
var matchRouter = require('./routes/match');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置session
//name: 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
//secret:通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
//cookie:
//设置存放 session id 的 cookie 的相关选项，默认为
//(default: { path: '/', httpOnly: true, secure: false, maxAge: null })
//store: //session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
//rolling: 每个请求都重新设置一个 cookie，默认为 false。
//resave: 即使 session 没有被修改，也保存 session 值，默认为 true。
app.use(session({
    name: 'user',
    secret: 'mysession',
    cookie: {},     //单位是ms    1天86400000,
    //store: //session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
    rolling: false,// 每个请求都重新设置一个 cookie，默认为 false。
    resave: false,//即使 session 没有被修改，也保存 session 值，默认为 true。
    saveUninitialized: true
    // store: new redisStore()
}));

app.use('/adFormSubmit',land({dest: '/'}).array("imgname",5));//文件数据处理中间件
app.use(land({dest: '/'}).single('userimg'));//文件数据处理中间件


app.all('*', function (req, res, next) {
        if (req.method = 'GET') {
            //首页
            if (req.url === '/' || req.url === '/index') {
                indexRouter.start(req, res);
            } else if (req.url === '/users')//
            {
                usersRouter.usersStart(req, res);
            } else if (req.url === '/dynamic') //动态开始
            {
                dynamicRouter.showDynamic(req, res);
            } else if (req.url === '/hp-collection') //个人中心
            {
                hpCollectionRouter.hpCollection(req, res);
            } else if (req.url === '/register1')//注册
            {
                registe1Router.registerStart(req, res);
            } else if (req.url === '/adstart')//进入管理员
            {
                adDynamicRouter.adDynamic(req, res);
            } else if (req.url === '/introduce') //解法
            {
                introduceRouter.introduceStart(req, res);
            } else if (req.url === '/land')//登录
            {
                landRouter.landStart(req, res);
            } else if (req.url === '/exit')//注销
            {
                exitRouter.out(req, res);
            } else if (req.url === '/matchShow')//赛事页面
            {
                matchRouter.matchShow(req, res);
            }
        }
        if (req.method = 'POST') {
            if (req.url === '/adDyChangeShow')//管理员弹出模态框
            {
                adDynamicRouter.adDyChageshow(req, res);
            } else if (req.url === '/adDyChangeText')//管理员修改动态保存
            {
                adDynamicRouter.adDyChageText(req, res);
            } else if (req.url === '/adDyDelete')//管理员删除动态
            {
                adDynamicRouter.adDyDelete(req, res);
            } else if (req.url === '/adDyRenovate')//管理员动态刷新
            {
                adDynamicRouter.adDyRenovate(req, res);
            } else if (req.url === '/adDyFind')//管理员查询
            {
                adDynamicRouter.adDyFind(req, res);
            } else if (req.url === '/adUserShow')//管理员用户显示
            {
                adUserRouter.adUserShow(req, res);
            } else if (req.url === '/adUserChangeShow')//管理员用户模态框显示
            {
                adUserRouter.adUserChangeShow(req, res);
            } else if (req.url === '/adUserDelete')//管理员删除用户
            {
                adUserRouter.adUserDelete(req, res);
            } else if (req.url === '/adUserRenovate')//管理员用户刷新
            {
                adUserRouter.adUserRenovate(req, res);
            } else if (req.url === '/adUserFind')//管理员用户查询
            {
                adUserRouter.adUserFind(req, res);
            } else if (req.url === '/adUserChangeText')//管理员用户修改保存
            {
                adUserRouter.adUserChangeText(req, res);
            } else if (req.url === '/landFind')//用户登录
            {
                landRouter.landFind(req, res);
            } else if (req.url === '/search')//搜索结果展示页面
            {
                searchRouter.searchStart(req, res);
            } else if (req.url === '/readygo')// 用户首页判断是都第一次
            {
                indexRouter.readygo(req, res);
            } else if (req.url === '/findWhat')// 搜索页面的ajax
            {
                searchRouter.findWhat(req, res);
            } else if (req.url === '/registerNext')// 注册转第二页
            {
                registe1Router.registerNext(req, res);
            } else if (req.url === '/registerSubmit')// 注册转第三页，并提交头像
            {
                registe1Router.registerSubmit(req, res);
            } else if (req.url === '/registerOk')// 注册转第四耶，注册成功
            {
                registe1Router.registerOk(req, res);
            } else if (req.url === '/dyGiveNice')//动态点赞
            {
                dynamicRouter.dyGiveNice(req, res);
            } else if (req.url === '/dyUserC')// 动态收藏
            {
                dynamicRouter.dyUserC(req, res);
            } else if (req.url === '/dyUserFollow')//动态关注用户
            {
                dynamicRouter.dyUserFollow(req, res);
            } else if (req.url === '/dyUserText')//动态发表评论
            {
                dynamicRouter.dyUserText(req, res);
            } else if (req.url === '/dyDownLand')//动态下拉显示
            {
                dynamicRouter.dyDownLand(req, res);
            } else if (req.url === '/dyDiscuss')//动态下拉显示评论
            {
                dynamicRouter.dyDiscuss(req, res);
            }else if (req.url === '/hpFollowNum')//个人主页显示关注数
            {
                hpCollectionRouter.hpFollowNum(req, res);
            }else if (req.url === '/hpMatchShow')//个人主页比赛显示
            {
                hpCollectionRouter.hpMatchShow(req, res);
            }else if (req.url === '/hpDyCollect')//个人主页动态收藏
            {
                hpCollectionRouter.hpDyCollect(req, res);
            }else if (req.url === '/hpFollowShow')//个人主页关注用户显示
            {
                hpCollectionRouter.hpFollowShow(req, res);
            }else if (req.url === '/adFormSubmit')//个人主页发表动态
            {
                // hpCollectionRouter.adFormSubmit(req, res);
            }



        }
    }
);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
