module.exports = function(app, passport) {

	 // =====================================
	    // LOGIN ===============================
	    // =====================================
	    // show the login form
	    app.get('/login', function(req, res) {

	        // render the page and pass in any flash data if it exists
	        res.render('login.jade', { message: req.flash('loginMessage') }); 
	    });
	 // process the login form
	// process the login form
	    app.post('/login', passport.authenticate('local-login', {
	        successRedirect : '/profile', // redirect to the secure profile section
	        failureRedirect : '/login', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	    }));

	    // =====================================
	    // Profile ==============================
	    // =====================================
	       app.get('/profile', function(req, res) {

	        // render the page and pass in any flash data if it exists
	        res.render('profile.jade', { message: req.flash('loginMessage') }); 
	    });

	    // =====================================
	    // SIGNUP ==============================
	    // =====================================
	    // show the signup form
	    //  this data is now handled by the index controller
	    // app.get('/signup', function(req, res) {

	    //     // render the page and pass in any flash data if it exists
	    //     res.render('/', { message: req.flash('signupMessage') });
	    // });

	    // process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
		        successRedirect : '/profile', // redirect to the secure profile section
		        failureRedirect : '/index', // redirect back to the signup page if there is an error
		        failureFlash : true, // allow flash messages

		    }));
	    // =====================================
	    // PROFILE SECTION =====================
	    // =====================================
	    // we will want this protected so you have to be logged in to visit
	    // we will use route middleware to verify this (the isLoggedIn function)
	    app.get('/profile', isLoggedIn, function(req, res) {
	        res.render('profile.jade', {
	            user : req.user // get the user out of session and pass to template
	        });
	    });

	    // =====================================
	    // LOGOUT ==============================
	    // =====================================
	    app.get('/logout', function(req, res) {
	        req.logout();
	        res.redirect('/');
	    });


	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/');
	}

	// =====================================
	    // FACEBOOK ROUTES =====================
	    // =====================================
	    // route for facebook authentication and login
	    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	    // handle the callback after facebook has authenticated the user
	    app.get('/auth/facebook/callback',
	        passport.authenticate('facebook', {
	            successRedirect : '/profile',
	            failureRedirect : '/'
	        }));

	    // route for logging out
	    app.get('/logout', function(req, res) {
	        req.logout();
	        res.redirect('/');
	    });

	// }

	// =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.jade', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/');
	}

}
