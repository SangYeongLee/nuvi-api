const express = require('express');
const bcryptjs = require('bcryptjs');
const auth =require('basic-auth');
const {body, check, validationResult} = require('express-validator');

const router = express.Router();

const {SupplyAndLeft,Food,Student,School,User,Code,Post} = require('../models');

//authenticating middelware
const authenticateUser = async (req,res,next) =>{
  let message = null;
  const credential = auth(req);
  if(credential){
    await User.findAll().then(users=>{
      const user = users.find(user=> user.emailAddress === credential.name);
      if(user){
        const match = bcryptjs.compareSync(credential.pass,user.password);
        if(match || credential.pass === user.password){
          req.currentUser=user;
        } else {
          message = `Authentication failure with user name: ${user.emailAddress}`;
        }
      } else {
        message = `Not found with user name: ${credential.emailAddress}`;
      }
    })
  } else {
    message ='Auth Header not found';
  }
  if(message){
    console.warn(message);
    const error = new Error(message);
    error.status = 401;
    next(error);
  } else {
    next();
  }
}

const usersValidation = [
    body('name','Name is required')
    .exists({checkFalsy:true}),
    body('emailAddress','Email is required and should be in valid format')
    .exists({checkFalsy:true})
    .isEmail(),
    body('emailAddress','Email should be unique')
    .custom(val=>{
      return User.findAll({where:{emailAddress:val}}).then(user=>{
        if(user.length>0){
          return Promise.reject('Email already exists!')
        }
      })
    }),
    body('password','Password is required with length of 8~12.')
    .exists({checkFalsy:true})
    .isLength({min:8,max:12}),
    body('confirmPassword','Password confirmation is required with same letters of password.')
    .exists({checkFalsy:true})
    .custom((val,{req})=>val===req.body.password),
    check('code','Code is required and should be authorized one')
    .exists({checkFalsy:true})
    .custom(val=>{
      return Code.findAll({where:{code:val,occupied:false}}).then(code=>{
        console.log(code.length)
        if(code.length<1){
          return Promise.reject('Code is required and should be authorized one!')
        }
      })
    })
  ]

/* GET users listing. */
router.get('/users',authenticateUser, function(req, res, next) {
  User.findByPk(req.currentUser.id,{
    include:{
      model:Post,
      attributes:["id","title"]
    }
  }).then(user=>{
    if(user){
      res.status(200).json(user)
    } else {
      res.status(404).end()
    }
  })
});

/* POST users . */
router.post('/users', usersValidation ,function(req, res, next) {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(422).json({errors:errors.array({onlyFirstError:true})})
  } else {
    const user = req.body;
    if(user.password){
      user.password = bcryptjs.hashSync(user.password);
    }

    User.create(user).then(user=>{
      res.status(201).location('/').end();
    }).catch(error=>{
          error.status = 400;
          next(error);
        })

    const code = {
      code:user.code,
      occupied:true,
    }

    Code.update(code,{where:{code:user.code}})
  }
});

module.exports = router;
