//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose=require("mongoose")
require("dotenv").config();
const port=process.env.PORT || 3000


const mongoURI=process.env.DATABASE
mongoose.connect(mongoURI, {useNewUrlParser: true});

const postSchema = {

  title: String,
 
  content: String
 
 };

 const Post = mongoose.model("Post", postSchema);


const homeStartingContent = "You can post any content related to any topic here";
const aboutContent = "This blog site is made for posting notes on various topics or related issues";
const contactContent = "Contact us by posting your issue in compose webpage of this blog site";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





app.get("/",function (req,res) {
  Post.find({}, function(err, posts){

    res.render(__dirname+"/views/home.ejs", {
 
      starting: homeStartingContent,
 
      posts: posts
 
      });
 
  })
})

app.get("/about",function (req,res) {
  res.render(__dirname+"/views/about.ejs",{about:aboutContent})
 
})

app.get("/contact",function (req,res) {
  res.render(__dirname+"/views/contact.ejs",{contact:contactContent})
 
})

app.get("/compose",function (req,res) {
  res.render(__dirname+"/views/compose.ejs")
})


app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render(__dirname+"/views/post.ejs", {
      title: post.title,
      content: post.content
    });
  });


})

app.post("/compose",function(req,res){
  // var post={
  //   postt:req.body.posttitle,
  //   postb:req.body.postbody
  // }
  const post = new Post ({

    title: req.body.posttitle,
 
    content: req.body.postbody
 
  });

  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });
 
 
})









app.listen(port, function() {
  console.log("Server started on port 3000");
});
