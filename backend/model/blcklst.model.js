const mongo=require("mongoose");


const blcklst_schema=mongo.Schema({


    my_token:{


        type:String,

        unique:true,

        required:true,


    },


},

{

    timestamp:true,

    versionKey:false,


});


const blcklst_model=mongo.model("blacklist",blcklst_schema);


module.exports={blcklst_model};