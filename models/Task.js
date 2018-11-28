var db=require('../dbconnection'); //reference of dbconnection.js
 
var Task={
 
    getAllTasks:function(callback){ 
        return db.query("SELECT * FROM Task",callback);
    },
    getTaskBySubjectId:function(id,callback){
    	return db.query("SELECT * FROM Task where subject_id=?",[id],callback);
    },
	addTask:function(Task,callback){
    	return db.query("INSERT INTO Task(name, description, type, dueDate, subject_id) VALUES(?,?,?,?,?)",
		[Task.name,Task.description,Task.type,Task.dueDate,Task.subject_id],callback);
    },

    getTasksBySubjectId:function(id, callback){
        return db.query("SELECT * FROM Task WHERE subject_id=?",[id], callback);
    },	

    deleteTask:function(id,callback){
    	return db.query("DELETE FROM Task WHERE task_id=?",[id.task_id],callback);
    },
    updateTask:function(Task,callback){
    	return db.query("UPDATE Task SET name=?,description=?, type=?, dueDate=?, progress=? where task_id=?",[Task.name,Task.description,Task.type,Task.dueDate, Task.progress,Task.task_id],callback);
    },
    setCompleted:function(Task,callback){
	    return db.query("UPDATE Task SET completed=1,date_complete=NOW() WHERE task_id=?",[Task.task_id],callback);
    },
    getOverdueTasks:function(id, callback){
	return db.query("SELECT * FROM Task WHERE Task.subject_id IN (SELECT Subject.subject_id FROM Subject WHERE Subject.user_id = ?) AND Task.dueDate < NOW()", [id], callback);
    },

   viewCompletedTasks:function(id, callback){
	   return db.query("SELECT * FROM Task WHERE Task.subject_id IN (SELECT Subject.subject_id FROM Subject WHERE Subject.user_id = ?) AND Task.completed = 1", [id], callback);
   },

  viewCompletedTasks:function(Task, callback){
           return db.query("SELECT * FROM Task WHERE Task.subject_id IN (SELECT Subject.subject_id FROM Subject WHERE Subject.user_id = ?) AND Task.completed = 0", [Task.user_id], callback);
   }

};
module.exports=Task;
