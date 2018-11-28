var db=require('../dbconnection'); //reference of dbconnection.js
 
var Type={
 
    addType:function(Type,callback){
        return db.query("INSERT INTO Type(name, color, user_id) VALUES (?,?,?)",[Type.name, Type.color, Type.user_id],callback);
    },

	
    getTypes:function(object,callback){ 
        return db.query("SELECT * FROM Type where user_id=?",[object.user_id],callback);
    },

    deleteType:function(object,callback){
        return db.query("DELETE FROM Type where type_id=?",[object.type_id],callback);
    },

    updateType:function(object,callback){
        return db.query("UPDATE Type SET name=?, color=? where type_id=?",[object.name, object.color, object.type_id],callback);
    } 
};
module.exports=Type;

