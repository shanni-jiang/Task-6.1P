const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const Expert=require("./models/experts.js");

const app=express();


app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/expertDB",{useNewUrlParser:true})

app.post('/experts',(req,res)=>{
    const expert=new Expert({
        expert_name:req.body.name,
        expert_password:req.body.password,
        expert_address:req.body.address,
        expert_mobile:req.body.mobile
    })
    expert.save((err)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send('Successfully add a new expert!')
        }
    })
})


app.get('/experts',(req,res)=>{
    Expert.find((err,expertList)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(expertList)
        }
    })
})

app.delete('/experts',(req,res)=>{
    Expert.deleteMany((err)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send('Successfully deleted all tasks!')
        }
    })
})

app.route('/experts/:eid')
.get((req,res)=>{
    Expert.findOne({_id:req.params.eid},(err,foundExpert)=>{
        if(err){
            res.send("No such expert!")
        }
        else{
            res.send(foundExpert)
        }
    })
})
.put((req,res)=>{
    Expert.updateOne(
        {_id:req.params.eid},
        {expert_name:req.body.name,
            expert_password:req.body.password,
            expert_address:req.body.address,
            expert_mobile:req.body.mobile},
        (err)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send("Successfully updated all!")
            }
        }

    )

})
.patch((req,res)=>{
    if(req.body.password){
        Expert.updateOne(
            {_id:req.params.eid},
            {$set:{ 
                
                expert_password:req.body.password
                }},
            (err)=>{
                if(err){
                    res.send("No such id!")
                }
                else{
                    res.send("Update its password!")
                }
            }
        )
    }
    else if(req.body.address && req.body.mobile){
        Expert.updateOne(
            {_id:req.params.eid},
            {$set:{ 
                
                expert_address:req.body.address,
                expert_mobile:req.body.mobile
                }},
            (err)=>{
                if(err){
                    res.send("No such id!")
                }
                else{
                    res.send("Update its mobile!")
                }
            }
        )
    }
  
})

.delete((req,res)=>{
    Expert.deleteOne(
        {_id:req.params.eid},(err)=>{
            if(err){
                res.send("No such expert!")
            }
            else{
                res.send("delet current expert!")
            }
        }
    )
})



app.listen(process.env.PORT || 8000,()=>{
    console.log('Server started on port 8000');
})