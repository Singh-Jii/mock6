const {my_router}=require("express");



const client_router=my_router();



const {authorisation}=require("../middleware/authorisation.middleware");



const {client_sign_up,client_login,client_logout}=require("../controller/client.control");


client_router.post("/register",client_sign_up);


client_router.post("/login",client_login);



client_router.post("/logout",authorisation,client_logout);




module.exports={client_router};