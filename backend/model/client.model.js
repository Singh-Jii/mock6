const mongo=require("mongoose");



const client_schema=mongo.Schema({



    client_name:{
        
        type:String,
        
        trim:true,
        
        required:true
    
    },


    my_avtr:{
        

        type:String,
        

        
        trim:true,
        
        required:true
    
    },


    my_mail:{
        
        type:String,
        
        trim:true,
        
        
        unique:true,
        
        
        required:true
    
    
    },



    my_pswrd:{
        

        type:String,
        
        
        trim:true,
        
        
        required:true
    
    
    },



    my_post:{


        type:String,


        enum:["User","Admin"],


        default:"User",


        required:true,

        
      }



},


{

    
    timestamp:true,


    versionKey:false,


})




const client_model=mongo.model("User",client_schema);




module.exports={client_model};