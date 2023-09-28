const my_identify=(posts)=>{


    return(request,response,next)=>{


        if(posts.includes(request.body.my_post)){

            return next();

        }


        else{


            return response.status(404).send("forbidden");


        }


    }


}



module.exports={my_identify};