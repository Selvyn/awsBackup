var db=require('../dbconnection'); //reference of dbconnection.js
 
var User={
 
    getAllUsers:function(callback){ 
        return db.query("SELECT * FROM User",callback);
    },
    getNameById:function(id,callback){
    	return db.query("SELECT name FROM User WHERE user_id=?",[id],callback);
    },
    // new method here
    getUserByEmail:function(email,callback){
        return db.query("SELECT * FROM User WHERE email=?",[email],callback);
    },
    // new method ends
    addUser:function(User,callback){
    	return db.query("INSERT INTO User(`name`,`email`,`password`) VALUES(?,?,?)",[User.name,User.email,User.pass],callback);
    },
    deleteUser:function(id,callback){
    	return db.query("DELETE FROM User WHERE user_id=?",[id],callback);
    },
    updatePassword:function(user,password,callback){
        return db.query("UPDATE User SET password=? WHERE user_id=?",[password,user.user_id],callback(null,password,user));
    },
    updateUser:function(id,User,callback){
    	return db.query("UPDATE User SET name=?,email=?,password=? WHERE user_id=?",[User.Title,User.Status,id],callback);
    },
	authLogin:function(user, pass, callback){
		return db.query("SELECT user_id from User WHERE email=? AND password=?",[user, pass], callback);
	},
	getEmail:function(user,callback){
		return db.query("SELECT email from User WHERE user_id=?",[user.user_id], callback);
	}
};
module.exports=User;
