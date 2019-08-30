const express = require('express');
const {body, check, validationResult} = require('express-validator');

const router = express.Router();

const {Post,User,Reply} = require('../models');

//for getting replies on a post
router.get('/replies/post/:id',(req,res,next)=>{
  const id = req.params.id;
  Reply.findAll({
    where:{PostId:id},
    order:[
      ['createdAt','DESC']
    ],
    include:[
      {
        model:User,
        attributes:['name','id']
      }
    ]

  }).then(replies => {
    if(replies.length>0){
      res.status(200).json(replies);
    }else {
      res.status(404).end();
    }
  }).catch(err=>next(err));
});

// creating reply
router.post('/replies',(req,res,next)=>{
  const reply = req.body;
  Reply.create(reply).then(reply=>{
    res.status(201).json(reply);
  }).catch(err=>next(err));
})

// editting reply
router.put('/replies/:id',(req,res,next)=>{
 const id = req.params.id;
 const newReply =req.body;
 Reply.update(newReply,{where:{id:id}}).then(()=>{
   res.status(204).end();
 }).catch(err=>next(err));
});

router.delete('/replies/:id',(req,res,next)=>{
  const id = req.params.id;
  Reply.findByPk(id).then(reply=>{
    reply.destroy().then(()=>{
      res.status(204).end();
    }).catch(err=>next(err));
  })
})

module.exports = router;
