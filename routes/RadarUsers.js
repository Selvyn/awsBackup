var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/User');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
router.get('/getName/:id',function(req,res,next){
    User.getNameById(req.params.id,function(err,rows){
        if(rows.length > 0){
            res.json(rows);
        }
        else{
            res.send(err);
        }
    });
    
 });

router.post('/getUserEmail', function(req,res){
	User.getEmail(req.body, function(err,rows){
		if(err)
		{
			res.send(err);
		}
		else {
			res.json(rows);
		}
	});
});

router.post('/login',function(req,res){
	var user = req.body.user;
	var pass = req.body.pass;
	User.authLogin(user, pass, function(err, userId){
		if(userId.length > 0){
			return res.send(userId);
		}
		else{
			return res.send(err);
		}
	});
}); 

router.post('/register',function(req,res,next){
    User.addUser(req.body,function(err,rows){
        if(err){
            res.send(err);
        }
        else{
            res.send("success");//or return rows for 1 &amp;amp;amp; 0
        }
    });
});

router.delete('/:id',function(req,res,next){
    User.deleteUser(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});
module.exports=router;
