var express = require('express');
var router = express.Router();
var Type = require('../models/Type');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
		extended:true
	}));
router.use(bodyParser.json());


router.post('/addType',function(req,res,next){
    Type.addType(req.body,function(err,rows){
        console.log(req.body);
	    if(err){
            res.json(err);
        }
        else{
            res.json(req.body);
        }
    });

 });

router.post('/deleteType',function(req,res,next){
    Type.deleteType(req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });

 });
router.post('/getTypes',function(req,res,next){
    Type.getTypes(req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });

 });
router.post('/updateType',function(req,res,next){
    Type.updateType(req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(req.body);
        }
    });

 });


module.exports=router;
