requestAnimationFrame("dotenv").config();


const {client_model}=require("../model/client.model");

const {blcklst_model}=require("../model/blcklst.model");

const jot=require("jsonwebtoken");


const authorisation=async(request,response,next)=>{


    const my_token=request.headers.my_token;

    if(my_token){


        try{


            const are_blcklst=await blcklst_model.findOne({my_token});


            if(are_blcklst){

                return response.status(401).send({

                    success:false,

                    er:"error"


                })


            }


            const dec_token=jot.verify(my_token,process.env.accesstoken);


            request.body.client_id=dec_token.client_id;

            request.body.my_post=dec_token.my_post;


            next();



        }


        catch(er){


            response.status(400).send({er:er.msg});


        }


    }


    else{


        return response.status(400).send({


            success:false,

            er:"try to login"


        })



    }


}



module.exports={authorisation};