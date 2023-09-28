require("dotenv").config();



const exp=require("express");



const my_cor=require("cors");


const {my_connect}=require("./db/database");



const {client_router}=require("./router/client.router");



const {my_blog_router}=require("./router/blog.router");


const application=exp();


application.use(exp.json());



application.use(my_cor());



application.get("/",async(request,response)=>{



    return response.status(200).send({msg:"these are endpoints"});



})



application.use("/",client_router);



application.use("/",my_blog_router);



application.all("*",async(request,response)=>{



    return response.status(404).send("error");


})



application.listen(process.env.my_port,async()=>{



    try{


        await my_connect;


        console.log("database connected");



    } 
    
    
    catch(er){



        console.log(er.msg);


    }console.log(`${process.env.my_port}`);


    
})