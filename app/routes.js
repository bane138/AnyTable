// app/routes.js
// Routing
//
module.exports = function(app, passport) {
    //================================
    // Home page with login links
    //================================
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    //================================
    // Login
    //================================
    app.get('/login', function(req, res) {
        // render page and pass in flash data
        res.render('login.ejs', { message: req.flash('loginMessage')});
    });

    // process login form
    // app.post('/login', passport stuff);
    //

    //================================
    // Signup
    //================================
    app.get('/signup', function(req, res) {
        // render page and pass in flash data
        res.render('signup.ejs', { message: req.flash('signupMessage')});
    });

    // process signup form
    // app.post('/signup', passport stuff);
    //

    //================================
    // Profile section
    //================================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user // get user from session and pass to template
        });
    });

    //================================
    // Logout
    //================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure the user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in session carry on
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
