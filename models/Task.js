var db=require('../dbconnection'); //reference of dbconnection.js
 
var Task={

	getTaskByName:function(object, callback){
		return db.query("SELECT * from Task where name=? AND subject_id=?", [object.name, object.subject_id],callback);
	},
    getAllTasks:function(callback){ 
        return db.query("SELECT * FROM Task",callback);
    },
    getTaskBySubjectId:function(id,callback){
    	return db.query("SELECT * FROM Task where subject_id=?",[id],callback);
    },
	addTask:function(Task,callback){
    	return db.query("INSERT INTO Task(name, description, type, dueDate, subject_id) VALUES(?,?,?,?,?)",
		[Task.name,Task.description,Task.type_id,Task.dueDate,Task.subject_id],callback);
    },

    getTasksBySubjectId:function(id, callback){
        return db.query("SELECT * FROM Task WHERE subject_id=?",[id], callback);
    },	

    deleteTask:function(id,callback){
    	return db.query("DELETE FROM Task WHERE task_id=?",[id.task_id],callback);
    },
    updateTask:function(Task,callback){
    	return db.query("UPDATE Task SET name=?,description=?, type=?, dueDate=?, progress=? where task_id=?",[Task.name,Task.description,Task.type_id,Task.dueDate, Task.progress,Task.task_id],callback);
    },
    setCompleted:function(Task,callback){
	    return db.query("UPDATE Task SET completed=1,date_complete=NOW() WHERE task_id=?",[Task.task_id],callback);
    },
    getOverdue:function(id, callback){
	return db.query("SELECT * FROM Task WHERE Task.subject_id IN (SELECT Subject.subject_id FROM Subject WHERE Subject.user_id = ?) AND Task.dueDate < ? AND Task.completed=0", [id.user_id, id.current_time], callback);
    },

   getComplete:function(id, callback){
	   return db.query("SELECT * FROM Task WHERE Task.subject_id IN (SELECT Subject.subject_id FROM Subject WHERE Subject.user_id = ?) AND Task.completed = 1", [id.user_id], callback);
   },

  viewCompletedTasks:function(Task, callback){
           return db.query("SELECT * FROM Task WHERE Task.subject_id IN (SELECT Subject.subject_id FROM Subject WHERE Subject.user_id = ?) AND Task.completed = 0", [Task.user_id], callback);
   }

};
module.exports=Task;
