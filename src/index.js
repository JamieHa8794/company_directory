import axios from 'axios'



console.log('hello world')

const renderStaff = (staff) =>{
    const staffList = document.getElementById('staff-List')
    const html = staff.map(staffCard =>{
        return(`
            <li>
                ${staffCard.firstName} ${staffCard.lastName} (${staffCard.sex})
            </li>
        `)
    }).join('')
    staffList.innerHTML = html
}


const init = async () =>{
    try{
        const staff = (await (axios.get('/api/staff'))).data;
        console.log(staff)
        renderStaff(staff)
    }
    catch(err){
        console.log(err)
    }
}

init();