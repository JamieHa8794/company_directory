import axios from 'axios'


const renderStaff = (staff) =>{
    const staffList = document.getElementById('staff-List')
    const html = staff.map(staffCard =>{
        return(`
            <li>
                <a href='/staff#${staffCard.id}'>
                ${staffCard.firstName} ${staffCard.lastName} (${staffCard.sex})
                </a>
            </li>
        `)
    }).join('')
    staffList.innerHTML = html
}

const renderStaffDetails = (staff) =>{
    const staffInfoH2 = document.getElementById('staff-info-h2')
    staffInfoH2.innerHTML = `${staff.firstName} ${staff.lastName}'s Info`

    const staffInfo = document.getElementById('staff-info')
    const html = `
        <img src=${staff.avatar}>
        <li>
            Company: ${staff.companyName}
        </li>
        <li>
            Position: ${staff.position}
        </li>
    `
    staffInfo.innerHTML = html;
}


window.addEventListener('hashchange', async ()=>{
    const staffId = window.location.hash.slice(1)*1;

    const staff = await (await (axios.get(`/api/staff/${staffId}`))).data;
    renderStaffDetails(staff);
})


const init = async () =>{
    try{
        const staff = (await (axios.get('/api/staff'))).data;
        renderStaff(staff)

    }
    catch(err){
        console.log(err)
    }
}

init();