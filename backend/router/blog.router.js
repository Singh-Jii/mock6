const {my_router}=require("express");


const my_blog_router=my_router();



const {authorisation}=require("../middleware/authorisation.middleware");



const {my_identify}=require("../middleware/identify.middleware");


const {plus_blog,change_blog,del_blog,all_blog,blogs_liking,blog_cmmnting}=require("../controller/blog.control");



my_blog_router.post("/blogs",authorisation,my_identify(["User"]),plus_blog);


my_blog_router.patch("/blogs/:id",authorisation,my_identify(["User"]),change_blog);


my_blog_router.delete("/blogs/:id",authorisation,my_identify(["User"]),del_blog);


my_blog_router.get("/blogs",authorisation,all_blog);



my_blog_router.patch("/blogs/:id/like",authorisation,my_identify(["User"]),blogs_liking);


my_blog_router.patch("/blogs/:id/comment",authorisation,my_identify(["User"]),blog_cmmnting);




module.exports={my_blog_router};