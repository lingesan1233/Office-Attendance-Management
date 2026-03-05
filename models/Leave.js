const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

employeeId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

reason:{
type:String,
required:true
},

days:{
type:Number,
required:true
},

status:{
type:String,
default:"Pending"
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Leave",leaveSchema);