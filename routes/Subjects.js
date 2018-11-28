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
                        //console.log(rows[i].assignments);
                        rows[i].assignments = JSON.parse(rows[i].assignments);
                }
		for(var i = 0; i < rows.length; i++)
                {
			//console.log(rows[i].assignments[0].dueDate);
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
	    /* function(err, rows) {
	    if (err) {
		res.send("failure");
	    } else {
		for (var i = 0; i < rows.length; i++) {
			//console.log(rows[i].assignments);
			rows[i].assignments = JSON.parse(rows[i].assignments);
		}
		res.send(rows);
		//res.send("NATASHA");
	    }
    });*/
});

router.post('/updateSubject', function(req, res, next){
    Subject.updateSubjectName(req.body, function(err,rows){
	if(err){
	    res.send(err);
	}
	else{
	    console.log(rows.changedRows );
	    if(rows.changedRows <= 0){
		res.send("Error: No updated rows");
	    }
	    else
    	    {
	    	Subject.getSubjectById(req.body.subject_id, function(err, rows){

            		if(err)
            		{
                    		res.send(err);
            		}
            		else
            		{	console.log(rows);
                    		res.send(getAll(rows));
           		}

    		});
	    }
	}
    });

});
	
router.post('/addSubject',function(req,res,next){
    Subject.addSubject(req.body,function(err,rows){
        if(err){
            res.send(err);
        }
        else{
	  
		Subject.getSubjectsByUserId(req.body.name, function(err,data){
		if(err)
			{
				res.send(err);
			}
		else{
	  req.body.subject_id = data[0].subject_id; 
	req.body.dueDate = "9999-12-31 23:59:59";

	  Task.addTask(req.body, function(err,rows)
		  {
			  if(err)
			  {
				  res.send(err);
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
                    res.send(getAll(rows));
            	}

    		});
		}//end add task else
   	 });
	}
  });
	}
    });
});

router.delete('/deleteSubject/:id',function(req,res,next){
    Subject.deleteSubject(req.params.id,function(err,rows){
	    //console.log(rows);
        if(err){
            res.send(err);
        }
        else{
	    if(rows.affectedRows <= 0){	
                res.send("Error:No Updatred rows");
	    }
	    else{
		res.send("success");
	    }
        }
    });
});
module.exports=router;
