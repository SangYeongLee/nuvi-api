const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const {SupplyAndLeft,Food,Student,School,Parent,School_sub} = require('../models');
const db = require('../models/index');
const url = require('url');
const Op = Sequelize.Op;

router.use(express.json());

function retDateFormat(date){
    function pad(num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
    }
    return date.getFullYear() + '' + pad(date.getMonth()+1) + pad(date.getDate());
}


//check chat bot id is already registered
router.post('/regCheck',function(req,res,next){
  var Nchat_id = req.body.userRequest.user.id;
  var searchSQL = "SELECT chat_id FROM Students WHERE chat_id='"+Nchat_id+"' UNION SELECT chat_id from Parents WHERE chat_id='"+Nchat_id+"'";
  var responseBody = {
    version: "2.0",
    template:{
               outputs:[{
                  basicCard:{
                    description: "아래의 링크로 회원가입을 진행해주세요.",
                    buttons:[{
                      action:"webLink",
                      label:"회원 가입 링크",
                      webLinkUrl:"https://api.nuvi-labs.com/kakao/register?chat="
                    }]
                  }
               }]                        
             }
    };

    db.sequelize.query(searchSQL, { type: db.sequelize.QueryTypes.SELECT}).then(data=>{
      console.log(data);
      if(data.length!=0){
         //block user already registered
         responseBody = {version: "2.0", template:{outputs:[{simpleText:{text: "이미 등록된 사용자입니다.\n해당 계정으로 서비스를 이용하고 싶으시다면 아이디를 갱신해주시길 바랍니다."}}]}};
         res.status(200).send(responseBody);
      }else{
        //send webLink with chat_id and key
        var key = 0;
        for(i=0;i<Nchat_id.length;i++){
          key += Nchat_id.charCodeAt(i);
        }
        responseBody.template.outputs[0].basicCard.buttons[0].webLinkUrl+=Nchat_id+"&key="+key;
       res.status(200).send(responseBody);
      }
    }).catch(err=>{
      responseBody = {version: "2.0", template:{outputs:[{simpleText:{text: "Server Error"}}]}};
    res.status(200).send(responseBody);
    });
});

//rendering regiter page to authorized user
router.get('/register', function(req,res,next){
  var code_list=[];
  var school_list=[];
  
  var uri = req.url;
  var chat_id = url.parse(uri,true).query.chat;
  var pkey = url.parse(uri,true).query.key;
  var key=0;

  for(var i=0;i<chat_id.length;i++){
    key += chat_id.charCodeAt(i);
  }
  if(key!=pkey){
      res.send("Unauthorized routing");
  }else{
      School.findAll().then(data=> {
      for(var i=0;i<data.length;i++){
        code_list.push(data[i].public_id);
        school_list.push(data[i].schoolName);
      }

      res.render('reg',{
        code : code_list,
        school : school_list,
        kakao : chat_id
      });
   }).catch(err=> {
     throw err;
    });
  }
});

//checking valid code
router.post('/codeCheck', function(req,res,next){
  var code = req.body.school+""+req.body.code;
  Student.findAll({where:{uniqueNum:code}}).then(data=>{
    res.json(data);
  }).catch(err=>{
    throw err;
  });
});

router.post('/nameCheck', function(req,res,next){
  var code = req.body.school+""+req.body.code;
  var n = req.body.name.substring(0,req.body.name.length-1)+'*';
  
  Student.findAll({where:{uniqueNum:code,name:req.body.name } }).then(data=>{
    if(data.length==0){
      Student.findAll({where:{uniqueNum:code,name: n} }).then(data=>{
        res.json(data);
      }).catch(err=>{
        throw err;
      });
    }else{
      res.json(data);
    }
  }).catch(err=>{
    throw err;
  }); 
});

//register complete and redirect to complete page
router.post('/registerComplete', function(req,res,next){
  var code = req.body.school+""+req.body.code;
  var n = req.body.name.substring(0,req.body.name.length-1)+'%';
  console.log(n);
  if(req.body.type=="학생"){
      Student.update({chat_id:req.body.chat},
                  {where: {uniqueNum:code, schoolUniqueNum: req.body.school, name: {[Op.like]: n}}}
      ).then(data=>{
        if(data[0]!=0){
          var ret ={success: true, redirect:true,redirectURL:"https://api.nuvi-labs.com/kakao/complete"};
          res.json(ret);
        }else{
          res.json(null);
        }
    }).catch(err=>{
      console.error(err);
    });
  }else if(req.body.type=="학부모"){
    Student.findAll({
      where:{uniqueNum:code,schoolUniqueNum:req.body.school,name:req.body.name}
    }).then(data=>{
      if(data.length!=0){
        var sid = data[0].id;
        
        Parent.create(
          {chat_id:req.body.chat,SchoolId:req.body.school,StudentId:sid}
        ).then(data=>{
          var ret ={success: true, redirect:true,redirectURL:"https://api.nuvi-labs.com/kakao/complete"};
          res.json(ret);
        }).catch(err=>{
          throw err;
        });
      }else{
        res.json(null);
      }
    }).catch(err=>{
      throw err;
    });
  }
});

router.get('/complete',function(req,res,next){
  res.render('complete');
});

//reset chat bot id
router.post('/reset',function(req,res,next){
  var chat = req.body.userRequest.user.id;
  var key=0;

  for(var i=0;i<chat.length;i++){
    key += chat.charCodeAt(i);
  };

  var responseBody = {
        version: "2.0",
        template:{
                 outputs:[{
                    basicCard:{
                      description: "아이디를 갱신했습니다.\n아래의 링크로 회원가입을 다시 진행해주세요.",
                      buttons:[{
                        action:"webLink",
                        label:"회원 가입 링크",
                        webLinkUrl:"https://api.nuvi-labs.com/kakao/register?chat="+chat+"&key="+key
                      }]
                    }
                 }]                        
               }
        };

  Student.update({chat_id:null},{where:{chat_id:chat}}).then(data=>{
    if(data[0]!=0){
      //student reset success
      res.status(200).send(responseBody);
    }else{
      //student reset fail and try parent
      Parent.destroy({where: {chat_id:chat} }).then(data=>{
        if(data==0){
          //parent reset fail
          responseBody = {
            version: "2.0",
            template:{
                     outputs:[{
                        basicCard:{
                          description: "등록되지 않은 아이디입니다.\n아래의 링크로 회원가입을 진행해주세요.",
                          buttons:[{
                            action:"webLink",
                            label:"회원 가입 링크",
                            webLinkUrl:"https://api.nuvi-labs.com/kakao/register?chat="+chat+"&key="+key
                          }]
                        }
                     }]                        
                   }
          };
          res.status(200).send(responseBody);
        }else{
          //parent reset success
          res.status(200).send(responseBody);
        }
      }).catch(err=>{
        throw err;
      });
    }
  }).catch(err=>{
    throw err;
  });
});

router.post('/userInfo',function(req,res,next){
  var chat=req.body.userRequest.user.id;
  var responseBody = {version: "2.0", template:{outputs:[{simpleText:{text: "카카오 아이디가 등록되어 있지 않습니다.\n아이디 등록 후 사용해주세요."}}]}};
  var infoSQL = "SELECT stu.name as name, stu.uniqueNum as code, sch.schoolName as school "
              + "FROM nuvi_database.Students as stu, nuvi_database.Schools as sch "
              + "WHERE stu.chat_id = '"+chat+"' and stu.schoolUniqueNum = sch.public_id;";

  Parent.findAll({where:{chat_id:chat}}).then(data=>{
    if(data.length==0){
      //chat id is not in parent table
      db.sequelize.query(infoSQL).then(data=>{
        if(data.length==0 || data[0].length==0){
          res.status(200).send(responseBody);
        }else{
          var grade = Number(data[0][0].code.substring(4,6));
          var classNum = Number(data[0][0].code.substring(6,8));
          var studentNum = Number(data[0][0].code.substring(8,10));

          responseBody = {
            version: "2.0", 
            template:{
              outputs:[{
                simpleText:{
                  text: "이름: "+data[0][0].name+
                      "\n학교: "+data[0][0].school+
                      "\n학년: "+grade+
                      "\n반  : "+classNum+
                      "\n번호: "+studentNum
                }
              }]
            }
          };
          res.status(200).send(responseBody);  
        }         
      }).catch(err=>{
        throw err;
      });
     }else{
      //chat id is in parent table
      infoSQL = "SELECT stu.name as name, stu.uniqueNum as code, sch.schoolName as school, stu.io_count as point, stu.rank_percent as per "
              + "FROM nuvi_database.Students as stu, nuvi_database.Schools as sch "
              + "WHERE stu.id = "+data[0].StudentId+" and stu.schoolUniqueNum = sch.public_id;";

      db.sequelize.query(infoSQL).then(data=>{ 
        var grade = Number(data[0][0].code.substring(4,6));
        var classNum = Number(data[0][0].code.substring(6,8));
        var studentNum = Number(data[0][0].code.substring(8,10));
        var point = data[0][0].point * 30;
        var per = Math.round(data[0][0].per * 100);

        responseBody = {
          version: "2.0", 
          template:{
            outputs:[{
              simpleText:{
                text: "이름: "+data[0][0].name+
                    "\n학교: "+data[0][0].school+
                    "\n학급: "+grade+"-"+classNum+
                    "\n번호: "+studentNum+
                    "\n점수: "+point+
                  "점\n상위 "+per+"% 입니다."
               }
             }]
           }
        };
        res.status(200).send(responseBody);
      }).catch(err=>{
        throw err
      });
    }
  }).catch(err=>{
    throw err;
  });
});

router.post('/photo',function(req,res,next){
  var chat=req.body.userRequest.user.id;
  var searchSQL = "SELECT id FROM Students WHERE chat_id='"+chat+"' UNION SELECT StudentId as id from Parents WHERE chat_id='"+chat+"'";
  
  var key = 0;
  for(i=0;i<chat.length;i++){
    key += chat.charCodeAt(i);
  }

  var responseBody = {
            version: "2.0",
            template:{
                     outputs:[{
                        basicCard:{
                          description: "등록되지 않은 아이디입니다.\n아래의 링크로 회원가입을 진행해주세요.",
                          buttons:[{
                            action:"webLink",
                            label:"회원 가입 링크",
                            webLinkUrl:"https://api.nuvi-labs.com/kakao/register?chat="+chat+"&key="+key
                          }]
                        }
                     }]                        
                   }
          };

  db.sequelize.query(searchSQL).then(data=>{
    if(data[0].length==0){
      res.status(200).send(responseBody);
    }else{
      var sid = data[0][0].id;
      var photoSQL = "SELECT sl.date as date, sl.bld as bld, sl.photo_left as photo, st.schoolUniqueNum as school "
                   + "FROM Students as st, SupplyAndLefts as sl "
                   + "WHERE st.id = "+sid+ " and st.uniqueNum = sl.studentUniqueNum and sl.photo_left is not null "
                   + "ORDER BY sl.date DESC";
      
      db.sequelize.query(photoSQL).then(data=>{
        if(data[0].length==0){
          responseBody = {version: "2.0", template:{outputs:[{simpleText:{text: "사진이 등록되어 있지 않습니다.\n등록 관련 문의는 홈페이지를 이용해주세요.\nhttps://nuvi-labs.com/"}}]}};
          res.status(200).send(responseBody);
        }else{
          var path= data[0][0].school + "/" + retDateFormat(data[0][0].date)+"/"+data[0][0].bld.toUpperCase()+"/";
            responseBody = {
              version: "2.0", 
              template:{
                outputs:[
                  {simpleText:{text:"가장 최근 잔식 사진입니다."}},
                  {simpleImage:{imageUrl:"https://nuvi-photo.s3.ap-northeast-2.amazonaws.com/"+path+data[0][0].photo}}
                ]
              }
            };
          res.status(200).send(responseBody);
        }
      }).catch(err=>{
        throw err;
      });
    }
  }).catch(err=>{
    throw err;
  });
});

router.post('/menu',function(req,res,next){
  var chat = req.body.userRequest.user.id;
  var key = 0;
  var school;
  for(i=0;i<chat.length;i++){
    key += chat.charCodeAt(i);
  }

  var responseBody = {
            version: "2.0",
            template:{
                     outputs:[{
                        basicCard:{
                          description: "등록되지 않은 아이디입니다.\n아래의 링크로 회원가입을 진행해주세요.",
                          buttons:[{
                            action:"webLink",
                            label:"회원 가입 링크",
                            webLinkUrl:"https://api.nuvi-labs.com/kakao/register?chat="+chat+"&key="+key
                          }]
                        }
                     }]                        
                   }
          };

  Student.findAll({where:{chat_id:chat}}).then(data=>{
    if(data.length==0){
      Parent.findAll({where:{chat_id:chat}}).then(data=>{
        if(data.length==0){
          res.status(200).send(responseBody);
        }else{
          school = data[0].SchoolId;
          
          var url = "";
          if(school=='1001'){
            url ="https://ko-kr.classting.com/schools/afd33440-001e-11e2-a217-83705bc2af98/news";
          }else if(school=='2001'){
            url = "https://school.iamservice.net/organization/122955/group/3311488";
          }else{
            url = "https://school.iamservice.net/organization/20010/group/3318546";
          }
          responseBody = {version: "2.0", template:{outputs:[{simpleText:{text: "아래 url을 통해 확인해주세요.\n"+url}}]}};
          res.status(200).send(responseBody);
        }
      }).catch(err=>{
        throw err;
      });
    }else{
      school = data[0].schoolUniqueNum;

      var url = "";
      if(school=='1001'){
        url ="https://ko-kr.classting.com/schools/afd33440-001e-11e2-a217-83705bc2af98/news";
      }else if(school=='2001'){
        url = "https://school.iamservice.net/organization/122955/group/3311488";
      }else{
        url = "https://school.iamservice.net/organization/20010/group/3318546";
      }
      responseBody = {version: "2.0", template:{outputs:[{simpleText:{text: "아래 url을 통해 확인해주세요.\n"+url}}]}};
      res.status(200).send(responseBody);
    }
  }).catch(err=>{
    throw err;
  });
});

module.exports = router;
