const preData = {
  schools: [
    {
      schoolId:"1001",
      schoolName:"동산초등학교",
      grade:[1,2,3,4,5,6],
      classNumber:[1,2,3,4,5,6,7,8,9,10],
      region:"41",
      emhs:"e"
    },
    {
      schoolId:"1002",
      schoolName:"방교 중학교",
      grade:[1,2,3],
      classNumber:[1,2,3,4,5,6,7,8,9,10],
      region:"41",
      emhs:"m"
    },
    {
      schoolId:"1003",
      schoolName:"충훈 고등학교",
      grade:[1,2,3],
      classNumber:[1,2,3,4,5,6,7,8,9,10],
      region:"41",
      emhs:"h"
    }
  ],
  get allSchoolClassGrade(){
    return (function(schools) {
      let schoolsArray = []
      schools.forEach(school =>{
        school.grade.forEach(grade =>{
          school.classNumber.forEach(classNum =>{
            schoolsArray.push({
              public_id:school.schoolId,
              schoolName:school.schoolName,
              grade:grade,
              classNumber:classNum,
              region:school.region,
              emhs:school.emhs,
              createdAt: new Date(),
              updatedAt: new Date()
            })
          })
        })
      })
      return schoolsArray
    })(this.schools)
  },
}

module.exports = preData
