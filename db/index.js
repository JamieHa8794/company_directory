const Sequlize = require('sequelize');
const { STRING } = Sequlize
const db = new Sequlize(process.env.DATABASE_URL || 'postgres://localhost/company_directory')

const faker = require('faker')

const Staff = db.define('staff', {
    firstName:{
        type: STRING
    },
    lastName:{
        type: STRING
    },
    sex:{
        type: STRING
    }

})

const createStaffInfo = () =>{
    const staffList = new Array(50).fill('').map( staff =>{
        return(
            staff = {
                firstName: faker.name.firstName(),
                LastName: faker.name.lastName(),
                sex: faker.name.gender(binary= true)
            }
        )
    })
    return(staffList)
}


const syncAndSeed = async () =>{
    try{
        await db.sync({ force: true })
        console.log('connected to db')
        const staffList = createStaffInfo();
        await Promise.all(staffList.map(staff =>{
            return(Staff.create({ firstName: staff.firstName, lastName: staff.LastName, sex: staff.sex }))
        }))
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    syncAndSeed,
    db,
    models: {
        Staff
    }
}