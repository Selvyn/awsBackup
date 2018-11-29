var express = require('express');
var router = express.Router();
var Subject = require('../models/Subject');
var Task = require('../models/Task');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

router.get('/getSubId/:id',function(req,res,next){
    Subject.getSubId(req.params.id,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
    
 });

function getAll(rows) {
                for (var i = 0; i < rows.length; i++) {
                        rows[i].assignments = JSON.parse(rows[i].assignments);
                }
		for(var i = 0; i < rows.length; i++)
                {
                        if(rows[i].assignments[0].name == null)
                        {
                                rows[i].assignments.length = 0;
                        }
			if(rows[i].assignments[0].dueDate === "9999-12-31 23:59:59.000000")
			{       
				rows[i].assignments.pop();
			}
                }
                return rows;
}

router.get('/getAll/:id',function(req,res,next){

    Subject.getSubjectsAndAssignmentByUserId(req.params.id, function(err, rows){

		if(err)
	    {
		    res.send(err);
	    }
	    else
	    {
		    res.send(getAll(rows));
	    }

    });
});

router.post('/updateSubject', function(req, res, next){
    Subject.updateSubjectName(req.body, function(err,rows){
	if(err){
	    res.send(err);
	}
	else{
	    if(rows.changedRows <= 0){
		res.send("Error: No updated rows");
	    }
	    else
    	    { 
		    Subject.getSubjectAssignment(req.body, function(err,rows){
       			 if(err){
            			res.send(err);
       			 }
       			 else{
				 req.body.assignments=rows;
			    res.json(req.body);
			 }
	    		});
		    }
	}
    });

});

router.post('/addSubject', function(req,res,next){
	Subject.addSubject(req.body,function(err,rows){
		if(err){
			res.send(err);
		}
		else{
			var data = req.body;
			Subject.getSubjectsByUserId(req.body.name,function(err,subject_id){
				if(err){
					res.send(err);
				}
				else{
					data.subject_id = subject_id[0].subject_id;
					data.assignments = [];
					Task.addTask(req.body, function(err, rows){
						if(err){
							res.send(err);
						}
						else{
						}
					});
					res.json(data);
				}
			});
		}
	});
});

router.post('/deleteSubject',function(req,res,next){
    Subject.deleteSubject(req.body,function(err,rows){
	    //console.log(rows);
        if(err){
            res.send(err);
        }
        else{
	    if(rows.affectedRows <= 0){	
                res.send("Error:No Updated rows");
	    }
	    else{
		res.send("success");
	    }
        }
    });
});
module.exports=router;
