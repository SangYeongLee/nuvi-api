const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const {SupplyAndLeft,Food,Student,School} = require('../models');


router.get('/supplyandleft', function(req, res, next) {
  SupplyAndLeft.findAll({
    include:[
      {model:Food},
      {
        model:Student,
        include:{model:School}
      }
    ]
  }).then((supply)=>{
    res.status(200).json(supply);
  }).catch(err=>{
    throw err;
  })
});

router.get('/schools', function(req,res,next){
  School.findAll().then(school=>{
    res.json(school);
  }).catch(err=>{
    throw err;
  })
})

router.get('/schoolList/:colName', function(req,res,next){
  const colName = req.params.colName;
  School.findAll({
    attributes:[
      [Sequelize.fn('DISTINCT',Sequelize.col(colName)),colName],

    ]
  }).then(school=>{
    res.json(school);
  }).catch(err=>{
    throw err;
  })
})

module.exports = router;
