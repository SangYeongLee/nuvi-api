'use strict';

const preData = require('../seeders_pre');

const studentsNumberPerClass = 30;

const getAllStudents = ((studentsNumberPerClass) => {
  let allStudents = [];
  preData.allSchoolClassGrade.forEach(school =>{
    let i = studentsNumberPerClass;
    while(i>0){
      allStudents.push({
        name: `${school.emhs}_g${school.grade}_c${school.classNumber}_${i}`,
        gender: 1,
        student_num: `${i}`,
        age: 10,
        height: 160,
        weight: 60,
        rfid: `${school.emhs}_g${school.grade}_c${school.classNumber}_${i}_kiosk`,
        chat_id:`${school.emhs}_g${school.grade}_c${school.classNumber}_${i}_chat`,
        addmission:2019-school.grade,
        allergy: "1%2%3",
        createdAt: new Date(),
        updatedAt: new Date()
      })
      i--
    }
  })
  return allStudents
})(studentsNumberPerClass)



module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Students',
      getAllStudents
      , {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Students', null, {});

  }
};
