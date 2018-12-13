var express = require('express');
var router = express.Router();
var Reset = require('../models/Reset');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');

router.post('/', function(req, res, next) {
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {
			//console.log(req);
			// error, does get the parameter, but returns an undefined user
			Reset.getUserByEmail(req.query.email, function(err, user) {
				if(err){
					res.json(err);
				}
				else{
					//res.json(user);

					if (user.length == 0) {
						//req.flash('error', 'No account with that email address exists.');
						//return res.redirect('/');
						res.send("Error: no such account exists");
					}
					//console.log(user);
					//user.resetPasswordToken = token;
					//user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
					console.log("step 1");
					var expire = new Date(Date.now() + 3600000);

					//console.log(expire);
					//console.log(user[0].user_id);
					done(err, token, user, expire);
				}
			});
		},
		function(token, user, expire, done) {
			Reset.saveReset(user[0].user_id,user[0].email,token,expire, function(err, token, user){
				if(err){
					res.json(err);
				}
				else {
					done(err, token, user);
				}
			});
			//console.log(token);
		},
		function(token, user, done) {

			console.log("step 2");
			console.log(token);
			console.log(user);

			var smtpTransport = nodemailer.createTransport({
				service: 'Gmail',
				auth: {
					user: 'jyoon1297@gmail.com',
					pass: 'Ehdrnd10'
				}
			});
			var mailOptions = {
				to: user.email,
				from: 'jyoon1297@gmail.com',
				subject: 'RadarHomework Password Reset',
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
				'http://' + req.headers.host + '/Repass/reset/' + token + '\n\n' +
				'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			};

			console.log("step 3");

			smtpTransport.sendMail(mailOptions, function(err) {
				//req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
				done(err, 'done');
			});
		}],
		function(err) {
			if (err) return next(err);
			res.redirect('/');
	});
});

router.get('/reset/:token', function(req, res) {
	User.getReset(req.params.token, function(err, reset) {
		if (reset.length == 0 || reset.reset_expire < Date.now) {
	  		//res.redirect('/');
	  		res.send('error: Password reset token is invalid or has expired.');
		}
		else {
			res.send("succ");
		}
	});
});


// post for reset

router.post('/reset/:token', function(req, res) {
	async.waterfall([
		function(done) {
			Reset.getReset(req.param.token, function(err, user) {
				if (user.length == 0) {
					req.send('Error: Password reset token is invalid or has expired.');
		  //return res.redirect('/Repass');
		}

		Reset.updatePass(req.body.password,req.body.email);
		Reset.removeReset(req.param.token);

		/*
		user.password = req.body.password;
		userpass.reset_tolken = undefined;
		userpass.reset_password = undefined;

		user.save(function(err) {
		  req.logIn(user, function(err) {
			done(err, user);
		  });
		});
		*/
		done(err, user);
	});
		},

		function(user, done) {
			var smtpTransport = nodemailer.createTransport('SMTP', {
				service: 'Gmail',
				auth: {
					user: 'jyoon1297@gmail.com',
					pass: 'Ehdrnd10'
				}
			});
			var mailOptions = {
				to: user.email,
				from: 'jyoon1297@gmail.com',
				subject: 'Your password has been changed',
				text: 'Hello,\n\n' +
				'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
			};
			smtpTransport.sendMail(mailOptions, function(err) {
				req.send('Success! Your password has been changed.');
				done(err);
			});
		}
		], function(err) {
			res.redirect('/');
		});
});
module.exports=router;
