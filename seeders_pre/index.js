const preData = {
  schoolList: [
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
  get schools(){
    return (function(schools){
      return schools.map(school =>{
        return {
          public_id:school.schoolId,
          region:school.region,
          emhs:school.emhs,
          schoolName:school.schoolName,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })

    })(this.schoolList)
  } ,
  schools_sub: function(schools) {
    let schoolsArray = []
    const grade = [1,2,3,4,5,6];
    const classNumber = [1,2,3,4,5,6,7,8,9,10]
    schools.forEach(school =>{
      grade.forEach(grade =>{
        classNumber.forEach(classNum =>{
          schoolsArray.push({
            grade:grade,
            classNumber:classNum,
            createdAt: new Date(),
            updatedAt: new Date(),

            SchoolId: school.id
          })
        })
      })
    })
    return schoolsArray
  }
  ,
}

module.exports = preData
