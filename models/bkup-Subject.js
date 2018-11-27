var db=require('../dbconnection'); //reference of dbconnection.js
 
var Subject={
 
    getAllSubjects:function(callback){ 
        return db.query("SELECT * FROM Subject",callback);
    },
    getSubjectById:function(id,callback){
    	return db.query("SELECT * FROM Subject WHERE Subject_id=?",[id],callback);
    },
    getByUserId:function(id, callback){
        return db.query("SELECT *, null AS Assignments FROM Subject WHERE User_id=?",[id], callback);
    },	
    getSubjectsByUserId:function(id, callback){
	return db.query("SELECT * FROM Subject WHERE User_id=?",[id], callback);
    },
	getSubjectsAndAssignmentByUserId:function(id, callback) {
	return db.query("SELECT s.*, (concat('[',group_concat(json_object('task_id', t.task_id, 'name', t.name, 'description', t.description, 'type', t.type, 'deadline', t.deadline, 'progress', t.progress, 'date_complete', t.date_complete)) , ']')) as Assignments from Task t inner join Subject s ON (s.subject_id = t.subject_id) where s.user_id=? group by s.subject_id", [id],callback);
    },
    addSubject:function(Subject,callback){
    	return db.query("INSERT INTO Subject(`Name`, `Color`, `Description`, `Primary_type`, `User_id`) VALUES(?,?,?,?,?)",
		[Subject.name, Subject.color, Subject.description, Subject.type, Subject.user_id], callback);
    },
    deleteSubject:function(id,callback){
    	return db.query("DELETE FROM Subject WHERE Subject_id=?",[id],callback);
    },
    updateSubject:function(id,Subject,callback){
    	return db.query("UPDATE Subject SET Name=?,Email=?,Password=? WHERE Id=?",[Subject.Title,Subject.Status,id],callback);
    } 
};
module.exports=Subject;
