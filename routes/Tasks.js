var express = require('express');
var router = express.Router();
var Task = require('../models/Task');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
		extended:true
	}));
router.use(bodyParser.json());

var Subject = require('../models/Subject');


router.get('/getTasksBySubjectId/:id',function(req,res,next){
    Task.getTasksBySubjectId(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });

 });

router.post('/getOverdue', function(req, res, next){
    Task.getOverdue(req.body, function(err, rows){
	if(err){
	    res.json(err);
	}
	else{
	    res.json(rows);
	}
    });
});

router.post('/',function(req,res,next){
    Task.addTask(req.body,function(err,count){
        if(err){
            res.json(err);
        }
        else{
            res.json(req.body);//or return count for 1 &amp;amp;amp; 0
        }
    });
});

function getAll(rows) {

                for (var i = 0; i < rows.length; i++) {
                        //console.log(rows[i].assignments);
                        rows[i].assignments = JSON.parse(rows[i].assignments);
                }
                for(var i = 0; i < rows.length; i++)
                {
                        if(rows[i].assignments[0].name == null)
                        {
                                rows[i].assignments.length = 0;
                        }
			if(rows[i].assignments[0].dueDate === "9999-12-31 23:59:59.000000")
			{       //console.log(rows[i].assignments);
				rows[i].assignments.pop();
			}
                }
                return rows;
                //res.send("NATASHA");
} 

function getIncomplete(rows){
	for(var i =0; i<rows.length; i++){
		rows[i].assignments = JSON.parse(rows[i].assignments);
	}
	//console.log(rows);
	console.log(rows.length);
	for(var i = 0; i<rows.length; i++)
	{
		console.log("pass here");
		var a = []; 
		console.log(rows[i].assignments);
		//console.log(rows[0]);
		//console.log(rows[0][0]);
		for(var j = 0; j < rows[i].assignments.length; j++)
		{

			if(rows[i].assignments[j].progress == 0 && rows[i].assignments[j].dueDate != "9999-12-31 23:59:59.000000") {
				a.push(rows[i].assignments[j]);
			}
		}
		rows[i].assignment = a;
		console.log(i);

	}
	//console.log(rows);
	return rows;
}


router.post('/addTask',function(req,res,next){
	Task.addTask(req.body,function(err,rows){
		if(err){
			res.send(err);
		}
		else{	
			req.body.task_id = rows.insertId;
			res.json(req.body);
		}
	});
});

router.post('/getComplete', function(req, res, next){
	Task.getComplete(req.body, function(err, rows){
		if(err){
			res.send(err);
		}
		else{
			res.json(rows);
		}
	});
});

router.post('/getIncomplete',function(req,res,next){
       // Task.updateTask(req.body,function(err,rows){
       //         if(err){
       //                 res.send(err);
       //         }
       //         else{
       //             if(rows.affectedRows <= 0){
       //                 res.send("Affected rows <=0");
       //             }
       //             else
       //             {
	console.log(req.body.user_id);
                        Subject.getSubjectsAndAssignmentByUserId(req.body.user_id, function(err, rows){

                         if(err)
                         {
                            res.send(err);
                         }
                         else
                         {
				console.log(rows);
                            res.json(getIncomplete(rows));
                         }

       //                 });
       //             }
       //         }
        });
});



router.post('/updateTask',function(req,res,next){
	Task.updateTask(req.body,function(err,rows){
		if(err){
			res.send(err);
		}
		else{
		    if(rows.affectedRows <= 0){
			res.send("Affected rows <=0");
		    }
		    else
		    {
			Subject.getSubjectsAndAssignmentByUserId(req.body.user_id, function(err, rows){

                         if(err)
                         {
                            res.send(err);
                         }
                         else
                         {
                            res.json(getIncomplete(rows));
                         }

                        });		
		    }
		}
	});
});

router.post('/deleteTask',function(req,res,next){
    Task.deleteTask(req.body,function(err,rows){
        if(err){
		console.log(err);
            res.send(err);
        }
        else{
		if(rows.affectedRows <= 0){
			res.send("Affected rows <=0");
		}
		else{
            	   	res.send("success");
		}
        }
    });
});

router.post('/completeTask', function(req,res,next){
	Task.setCompleted(req.body,function(err, rows){
		if(err){
			res.send(err);
		}
		else{
			if(rows.affectedRows <= 0){
				res.send("Affected rows <=0");
			}
			else{
				res.send("success");
			}
		}
	});
});

router.put('/:id',function(req,res,next){
    Task.updateTask(req.params.id,req.body,function(err,rows){ 
        if(err){
        	res.json(err);
        }
        else{
        	res.json(rows);
        }
    });
});
module.exports=router;
