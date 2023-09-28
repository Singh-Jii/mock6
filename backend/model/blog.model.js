const mongo=require("mongoose");

const cmmnt_schema=new mongo.Schema({


    client_name:{

        type:String,

        trim:true,


    },


    my_contnt:{


        type:String,

        trim:true,


    }


});



const right_catego=["Bussiness","Tech","LifeStyle","Entertainmnt"];


const my_blog_schema=new mongo.Schema({


    client_id:{

        type:mongo.Schema.Types.ObjectId,

        ref:"User",

        required:true,


    },


    my_title:{

        type:String,

        trim:true,

        required:true,
    },



    my_contnt:{

        type:String,

        trim:true,

        required:true,
    },



    my_categry:{

        type:String,

        trim:true,

        required:true,


        enum:right_catego,


    },


    my_date:{

        type:Date,

        trim:true,

        required:true,
    },



    my_like:{

        type:Number,

        trim:true,

        required:true,

        default:0,
    },


    my_cmmnt:[cmmnt_schema]




});


const my_blog_model=mongo.model("Blog",my_blog_schema);


module.exports={my_blog_model};