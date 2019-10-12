'use strict';

const preData = require('../seeders_pre');

const studentsNumberPerClass = 30;

const getAllStudents = (studentsNumberPerClass,schools_subWithId) => {
  let allStudents = [];
  schools_subWithId.forEach(school =>{
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
        updatedAt: new Date(),

        SchoolSubId:school.id
      })
      i--
    }
  })
  return allStudents
}



module.exports = {
  up: async (queryInterface, Sequelize) => {
    //for school
    const schools = preData.schools
    // get current School table's Ids
    const schoolIds = await queryInterface.sequelize.query(
      'SELECT id from Schools'
    );

    const schoolIdArray = schoolIds[0].map(school=>school.id)

    const schoolsWithId = schools.map((school,i)=>{
      school.id = schoolIdArray[i]
      return school
    })
    const schoolSub = preData.schools_sub(schoolsWithId);

    //for school_sub
      const schoolSubId = await queryInterface.sequelize.query('SELECT id from School_subs')
      const schoolSubIdArray = schoolSubId[0].map(school=>school.id)
      const schoolSubWithId = schoolSub.map((school,i)=>{
        school.id = schoolIdArray[i]
        return school
      })
      return queryInterface.bulkInsert('Students',
      getAllStudents(studentsNumberPerClass,schoolSubWithId)
      , {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Students', null, {});

  }
};
