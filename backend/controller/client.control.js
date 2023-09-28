const {client_model}=require("../model/client.model");

const {blcklst_model}=require("../model/blcklst.model");

require("dotenv").config();


const privacy=require("bcrypt");


const jot=require("jsonwebtoken");


const client_sign_up=async(request,response)=>{

    const {my_mail,my_pswrd,my_post,client_name,my_avtr}=request.body;


    try{


        const client=await client_model.findOne({my_mail});


        if(client){

            return response.status(400).send({

                success:false,

                er:"existed id, try to login direct"

            })


        }


        const my_hashing=privacy.hashSync(my_pswrd,8);


        const new_client=new client_model({my_mail,my_pswrd:my_hashing,my_post,client_name,my_avtr});


        console.log(new_client);


        await new_client.save();

        response.status(200).send({

            success:true,

            msg:"client registration is completed"


        })


    }


    catch(er){

        response.status(400).send({

            er:er.msg


        });


    }


}



const client_login=async(request,response)=>{


    const {my_mail,my_pswrd}=request.body;


    try{

        const client=await client_model.findOne({my_mail});


        if(!client){

            return response.status(401).send({

                success:false,

                er:"wrong email"


            });


        }


        privacy.compare(my_pswrd,client.my_pswrd, function(er,output){


            if(er){

                return response.status(500).send({

                    success:false,

                    er:"error"


                });


            }


            if(output){


                const my_token=jot.sign({

                    client_id:client._id,

                    my_post:client.my_post


                },
                
                
                process.env.accesstoken,
                
                
                {expiresIn:"3d"});


                return response.status(200).send({

                    success:true,

                    msg:"login completed",

                    token:my_token


                });


            }

            else{

                return response.status(401).send({

                    success:false,

                    er:"wrong credential"


                });


            }


        });

        
    }


    catch(er){


        return response.status(500).send({


            success:false,

            er:"error"


        });




    }



};



const client_logout=async(request,response)=>{


    const my_token=request.headers.my_token;


    try{


        const blcklst_token=new blcklst_model({my_token});


        await blcklst_token.save();


        return response.status(200).semd({


            success:false,

            msg:"log out"


        });


    }


    catch(er){

        response.status(400).send({er:er.msg});


    }


};



module.exports={


    client_login,


    client_logout,

    client_sign_up

    
}

