var db=require('../dbconnection'); //reference of dbconnection.js
 
var User={
 
    getAllUsers:function(callback){ 
        return db.query("SELECT * FROM User",callback);
    },
    getNameById:function(id,callback){
    	return db.query("SELECT Name FROM User WHERE User_id=?",[id],callback);
    },
    addUser:function(User,callback){
    	return db.query("INSERT INTO User(`Name`,`Email`,`Password`) VALUES(?,?,?)",[User.name,User.email,User.pass],callback);
    },
    deleteUser:function(id,callback){
    	return db.query("DELETE FROM User WHERE User_id=?",[id],callback);
    },
    updateUser:function(id,User,callback){
    	return db.query("UPDATE User SET Name=?,Email=?,Password=? WHERE Id=?",[User.Title,User.Status,id],callback);
    },
	
	authLogin:function(user, pass, callback){
		return db.query("SELECT User_id from User WHERE Email=? AND Password=?",[user, pass], callback);
	}
};
module.exports=User;
