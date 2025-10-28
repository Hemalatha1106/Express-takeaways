import express from "express";
const app = express();
const PORT = 3000;
const users = [{id:1, user_name:"Hemalatha"},
    {id:2, user_name:"Sarasijaa"},
    {id:3, user_name:"Venkatesan"},
    {id:4, user_name:"Anandhi"}

]
app.listen(PORT,(req,res)=>{
    console.log(`App is running on port ${PORT}`)
});
app.get("/home",(req,res)=>{
    res.send('<h1>Hello, this is home page</h1>');
})
app.get("/",(req,res)=>{
    res.send({msg: "Hello"})
});
app.get("/api/users",(req,res)=>{
    res.send(users);
});
app.get("/api/users/:id",(req,res)=>{
    console.log(req.params);
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send({msg:"Bad request, Invalid ID"})
    }
    const user = users.find((user)=>user.id===id);
    if(user){
        return res.send(user);
    }
    return res.status(404).send("User Not Found");
})