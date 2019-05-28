exports.out = function (req, res) {
    req.session.cookie.maxAge = 0;
    res.clearCookie('user');
    // console.log("456")
    res.redirect("/index");
};