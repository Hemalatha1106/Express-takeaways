import express from "express";
import { CreateUserValidationSchema }  from "./utils/validationSchemas.mjs";
import { validationResult, matchedData, checkSchema} from "express-validator";
const app = express();
const PORT = 3000;
app.use(express.json());
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
// app.get("/api/users",(req,res)=>{
//     res.send(users);
// });
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
app.get("/api/users",(req,res)=>{
    const {filter, value} = req.query;
    console.log(filter,value);
    let filtered = users;
    if(filter && value){
        return res.send(filtered.filter((user)=>user[filter].toLowerCase().includes(value.toLowerCase())));
    }
    res.send(users);
})
app.post("/test", (req, res) => {
  console.log("✅ Inside /test route");
  console.log(req.body);
  res.send("Test route reached!");
});
app.post("/api/users", checkSchema(CreateUserValidationSchema), (req, res) => {
  console.log("➡️ Inside POST /api/users route");
  const result = validationResult(req);
  console.log(result.array());
    
//   if (!result.isEmpty()) {
//     return res.status(400).json({ errors: result.array() });
//   }

  const { body } = req;
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  return res.status(200).send(users);
});
app.put("/api/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send({msg: "Invalid"})
    }
    const {body} = req;
    const userIndex = users.findIndex((user)=>user.id==id);
    if(userIndex===-1){
        return res.status(400).send({msg: "error! enter valid id"})
    }
    users[userIndex] = {id: id, ...body};
    return res.status(201).send(users);
})
app.patch("/api/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send({msg: "Invalid"})
    }
    const {body} = req;
    const userIndex = users.findIndex((user)=>user.id==id);
    if(userIndex===-1){
        return res.status(400).send({msg: "error! enter valid id"});
    }
    users[userIndex] = {...users[userIndex], ...body};
    res.sendStatus(200);
})