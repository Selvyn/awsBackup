var db=require('../dbconnection'); //reference of dbconnection.js
 
var Task={
 
    getAllTasks:function(callback){ 
        return db.query("SELECT * FROM Task",callback);
    },
    getTaskBySubjectId:function(id,callback){
    	return db.query("SELECT * FROM Task where Subject_id=?",[id],callback);
    },
	addTask:function(Task,callback){
    	return db.query("INSERT INTO Task(Name, Description, Type, Deadline, Subject_id) VALUES(?,?,?,?,?)",
		[Task.name,Task.description,Task.type,Task.deadline,Task.subject_id],callback);
    },

    getTasksBySubjectId:function(id, callback){
        return db.query("SELECT * FROM Task WHERE Subject_id=?",[id], callback);
    },	

    deleteTask:function(id,callback){
    	return db.query("DELETE FROM Task WHERE Task_id=?",[id],callback);
    },
    updateTask:function(id,Task,callback){
    	return db.query("UPDATE TASK SET Title=?,Status=? where Id=?",[Task.Title,Task.Status,id],callback);
    },

    getOverdueTasks:function(id, callback){
	return db.query("SELECT * FROM Task WHERE Task.Subject_id IN (SELECT Subject.Subject_id FROM Subject WHERE Subject.User_id = ?) AND Task.Deadline < NOW()", [id], callback);
    }
};
module.exports=Task;
