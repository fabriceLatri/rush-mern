const User = require("../models/user.model.js");
const Post = require("../models/post.model.js");


async function addPost(req, res) {
   //   try {
        const user = await User.findById(req.body.id).select('-password');
         console.log(req.body.post);
        let newPost = new Post({
            text: req.body.text,
            author: user.name,
            user: req.body.id
        });
        console.log(newPost);

        newPost.save(function(err) {
           if (err) {
              res.status(400);
              res.send(err);
              console.log("err ", err );
              console.log(err);
              return;
           }
           console.log({ newPost })
           res.send({ newPost })
        })

}

async function listPosts(req, res) {
   Post.find({}, function(err, posts) {
      if (err) {
         res.status(400);
         res.send(err);
         return;
      }
      res.send(posts)
   })
}

exports.addPost = addPost;
exports.listPosts = listPosts;
