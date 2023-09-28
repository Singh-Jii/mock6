const {my_blog_model}=require("../model/blog.model");


const plus_blog=async(request,response)=>{


    const {client_id,client_name,my_title,my_contnt,my_categry,my_date,my_like,my_cmmnt}=request.body;

    try{

        const my_blog=new my_blog_model({client_id,client_name,my_title,my_contnt,my_categry,my_date,my_like,my_cmmnt});


        await my_blog.save();

        response.status(200).send({

            success: true,

            msg:"adding blog"

            
        });


    }


    catch(er){

        response.status(400).send({er:er.msg});


    }


};



const change_blog=async(request,response)=>{

    const my_blog_id=request.params.id;

    const my_update_bd=request.body;

    const {client_id}=request.body;


    try{

        const item=await my_blog_model.findById(my_blog_id);


        if(item.client_id.equals(client_id)){

            const my_blog=await my_blog_model.findByIdAndUpdate(my_blog_id,my_update_bd,{


                new: true,


            });

            response.status(200).send({

                success:true,

                msg:"blog changed"


            });

        }


        else{

            response.status(200).send({

                success:true,

                msg:"blog not created"

            });

        }


    }

    catch(er){

        response.status(400).send({

            er:er.msg


        });

    }

};



const del_blog=async(request,response)=>{

    const my_blog_id=request.params.id

    const {client_id}=request.body;


    try{

        const item=await my_blog_model.findById(my_blog_id);

        if(item.client_id.equals(client_id)){

            const lovii=await my_blog_model.findByIdAndDelete(my_blog_id);


            response.status(200).send({

                success: true,

                msg: "deleting blog"

            });

        }

        else{

            response.status(200).send({

                success:true,

                msg:"blog is not created"
            
            });


        }

    }


    catch(er){

        response.status(400).send({

            er:er.msg


        });


    }


};




const all_blog=async(request,response)=>{


    console.log(request.body);

    const {my_title,my_date,my_categry,my_ordr}=request.query;


    try{


        const my_filt={};

        if(my_title){


            my_filt.my_title=new RegExp(my_title,"k");


        }

        if(my_categry){

            my_filt.my_categry=new RegExp(my_categry,"k");


        }

        if(item){

            my_filt.my_date=new Date(my_date);


        }



        const my_sort={};

        if(my_ordr==="asc"){

            my_sort.item=1;


        }


        else if(my_ordr==="desc"){


            my_sort.item=-1;


        }


        const item=await my_blog_model.find(my_filt).sort(my_sort);


        response.status(200).send({


            success:true,

            msg:"getting all blog datas",

            data:item


        });


    }


    catch(er){

        response.status(400).send({

            er:er.msg


        });


    }


};



const blogs_liking=async(request,response)=>{

    const my_blog_id=request.params.id;


    try{


        const my_blog=await my_blog_model.findByIdAndUpdate(my_blog_id,{

            $inc:{my_like:1}

        },{

            new:true,


        })

        response.status(200).send({

            success:true,

            msg:"liking blogs",

            data:my_blog


        });


    }


    catch(er){

        response.status(400).send({

            er:er.msg

        });


    }


};



const blog_cmmnting=async(request,response)=>{


    const my_blog_id=request.params.id;

    const {client_name,my_contnt}=request.body;


    try{


        const my_blog=await my_blog_model.findByIdAndUpdate(my_blog_id,{

            $push:{my_cmmnt:{client_name,my_contnt}}


        },{

            new:true,


        })


        response.status(200).send({

            success:true,

            msg:"commenting on blogs",

            data:my_blog


        });


    }


    catch(er){

        response.status(400).send({

            er:er.msg


        });


    }


}



module.exports={

    plus_blog,

    change_blog,

    del_blog,


    all_blog,

    blogs_liking,


    blog_cmmnting


}