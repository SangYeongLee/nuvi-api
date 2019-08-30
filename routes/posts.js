const express = require('express');
const {body, check, validationResult} = require('express-validator');

const router = express.Router();

const {Post,User,Reply} = require('../models');

const postsValidation = [
  check('title','Title is required.')
  .exists({checkFalsy:true}),
  check('description','Description is required.')
  .exists({checkFalsy:true}),
  check('UserId','You are not authenticated.')
  .exists({checkFalsy:true})
]

//Read all the posts
router.get('/posts',(req,res,next)=>{
  const contentPerPage =req.query.contentPerPage || 10;
  const currentPage = req.query.pageNum || 1;

  Post.findAndCountAll({
    include:[
      {
        model:User,
        attributes:['name','emailAddress'],
      },
      {
        model:Reply
      }
    ],
    order:[
      ['createdAt','DESC']
    ],
    limit:contentPerPage*1,
    offset:contentPerPage*(currentPage-1),
    distinct:true,
  }).then(posts=>{
    if(posts.rows.length>0){
      res.status(200).json(posts);
    } else {
      res.status(404).end();
    }
  }).catch(err=>next(err));
});


//Read one specific post
router.get('/posts/:id',(req,res,next)=>{
  const id = req.params.id;
  Post.findByPk(id,{
    include:[
      {
        model:User,
        attributes:['name','emailAddress','password'],
      },
      {
        model:Reply
      }
    ]
  }).then(post=>{
    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).end();
    }
  }).catch(err=>next(err));
});

//Create a post
router.post('/posts', postsValidation, (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(422).json(errors.array({onlyFirstError:true}));
  } else {
    const post = req.body;
    Post.create(post).then(post=>{
      res.status(201).end();
    }).catch(err=>next(err));
  }
});

router.put('/posts/:id', postsValidation, (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors)
    res.status(422).json(errors.array({onlyFirstError:true}));
  } else {
    const id = req.params.id;
    const newPost = req.body;
    Post.update(newPost,{where:{id:id}}).then(()=>{
      res.status(204).end();
    }).catch(err=>next(err));
  }
});

router.delete('/posts/:id',(req,res,next)=>{
  const id = req.params.id;
  Post.findByPk(id).then(post=>{
    post.destroy().then(()=>{
      res.status(204).end();
    }).catch(err=>next(err));
  })
});

module.exports = router
