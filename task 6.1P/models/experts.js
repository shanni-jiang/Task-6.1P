const mongoose =require("mongoose")
const expertSchema = new mongoose.Schema({
    expert_name:{
        type:String,
        required:"Please enter your name"
    },
    expert_password:{
        type:String,
        required:"Please enter you password"
    },
    expert_address:{
        type:String,
        required:"Please enter your address"
    },
    expert_mobile:{
        type:String,
        required:"Please enter your mobile number"
    }
   
})

module.exports=mongoose.model("Expert",expertSchema);