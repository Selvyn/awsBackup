var db=require('../dbconnection'); //reference of dbconnection.js
 
var Subject={
 
    getAllSubjects:function(callback){ 
        return db.query("SELECT * FROM Subject",callback);
    },
    getSubjectById:function(id,callback){
    	return db.query("SELECT s.*, (concat('[',group_concat(json_object('task_id', t.task_id, 'name', t.name, 'description', t.description, 'type', t.type, 'dueDate', t.dueDate, 'progress', t.progress, 'date_complete', t.date_complete)) , ']')) as assignments from Task t join Subject s ON (s.subject_id = t.subject_id) where s.subject_id=? AND t.completed=0 AND t.dueDate > NOW() group by s.subject_id",[id],callback);
    },
    getByUserId:function(id, callback){
        return db.query("SELECT *, null AS Assignments FROM Subject WHERE user_id=?",[id], callback);
    },	
    getSubjectsByUserId:function(name, callback){
	return db.query("SELECT subject_id FROM Subject WHERE name=?",[name], callback);
    },
	getSubjectsAndAssignmentByUserId:function(id, callback) {
	return db.query("SELECT s.*, (concat('[',group_concat(json_object('task_id', t.task_id, 'name', t.name, 'description', t.description, 'type', t.type, 'dueDate', t.dueDate, 'progress', t.progress, 'date_complete', t.date_complete)) , ']')) as assignments from Task t join Subject s ON (s.subject_id = t.subject_id) where s.user_id=? AND t.completed=0 group by s.subject_id", [id],callback);
    },
    addSubject:function(Subject,callback){
    	return db.query("INSERT INTO Subject(`name`, `color`, `description`, `primary_type`, `user_id`) VALUES(?,?,?,?,?)",
		[Subject.name, Subject.color, Subject.description, Subject.primary_type, Subject.user_id], callback);
    },
    deleteSubject:function(id,callback){
    	return db.query("DELETE FROM Subject WHERE subject_id=?",[id.subject_id],callback);
    },
    updateSubjectName:function(Subject,callback){
    	return db.query("UPDATE Subject SET name=?, description=?, color=?, primary_type=? WHERE subject_id=?",[Subject.name, Subject.description, Subject.color, Subject.default_type_id, Subject.subject_id], callback);
    }, 
    getSubjectAssignment:function(Subject,callback){
	return db.query("SELECT * FROM Task WHERE subject_id=?",[Subject.subject_id],callback);
    }

};
module.exports=Subject;
