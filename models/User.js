var db=require('../dbconnection'); //reference of dbconnection.js
 
var User={
 
    getAllUsers:function(callback){ 
        return db.query("SELECT * FROM User",callback);
    },
    getNameById:function(id,callback){
    	return db.query("SELECT name FROM User WHERE user_id=?",[id],callback);
    },
    addUser:function(User,callback){
    	return db.query("INSERT INTO User(`name`,`email`,`password`) VALUES(?,?,?)",[User.name,User.email,User.pass],callback);
    },
    deleteUser:function(id,callback){
    	return db.query("DELETE FROM User WHERE user_id=?",[id],callback);
    },
    updateUser:function(id,User,callback){
    	return db.query("UPDATE User SET name=?,email=?,password=? WHERE user_id=?",[User.Title,User.Status,id],callback);
    },
	
	authLogin:function(user, pass, callback){
		return db.query("SELECT user_id from User WHERE email=? AND password=?",[user, pass], callback);
	}
};
module.exports=User;
