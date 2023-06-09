module.exports = function checkAuthentication(req, res, next) {
    if(req.isAuthenticated()) return next();
    req.flash('error', 'You must log in first.')
    res.redirect('/login');
}