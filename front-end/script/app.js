let messageContainer=document.getElementById('messageContainer')
let sendbtn=document.getElementById('sendbtn')
let groupNames=document.getElementById('groupNames')
let userNames=document.getElementById('userNames')
let createGroup=document.getElementById('AddGroupbtn')
let AddUser=document.getElementById('AddUserbtn')

groupNames.addEventListener('click',GroupSide)
userNames.addEventListener('click',UsersSide)
//display groups/users

function DisplayNames(name,type,id,admin){
    if(type=='group'){
        groupNames.innerHTML+=`<h3>${name} <button id="${id}">X</button></h3>`
    }
    else{
        if(admin){
            userNames.innerHTML+=`<h3>${name} <button class='admin' id='${id}'>admin</button> <button id="${id}" class='userDeleteBtn'>X</button></h3>`
        }
        else{
        userNames.innerHTML+=`<h3>${name} <button class='Addadmin' id='${id}'>+</button> <button id="${id}" class='userDeleteBtn'>X</button></h3>`
        }
    }

}

//create group

createGroup.onclick=async ()=>{
    // console.log('clicked')
    let groupName=document.getElementById('group-name').value
    let token=localStorage.getItem('token')
    let group= await axios.post(`http://localhost:4000/group/create`,{name:groupName},{headers:{"Authorization":token}})
    console.log(group.data.group)
    DisplayNames(groupName,'group',group.data.group.id,false)
}

// get groups
window.addEventListener('DOMContentLoaded', async ()=>{
    let token=localStorage.getItem('token')
    let groups = await axios.get(`http://localhost:4000/group/get`,{headers:{"Authorization":token}})
    // console.log(groups)
    document.querySelector('.savingUserId').id= groups.data.userId
    groups.data.groups.forEach(group => {
        DisplayNames(group.name,'group',group.id,false)
    });

})

//group operations(display chat of group/delete group)

async function GroupSide(e){

    if(e.target.textContent=='X'){
        console.log(e.target.parentElement,groupNames)
        groupNames.removeChild(e.target.parentElement)
      if(confirm('are you sure?')){
        let token=localStorage.getItem('token')
         await axios.delete(`http://localhost:4000/group/deleteGroup/${e.target.id}`,{headers:{"Authorization":token}})
         console.log(e.target.parentElement)
        // groupNames.removeChild(e.target.parentElement)
      }
    }
    else{
       localStorage.setItem('lastId',0)
        let groupId=e.target.children[0].id
        // document.querySelector('.userInput').id=groupId
        let groupTitle=e.target.textContent.split(' ')[0]
        let messageTitle=document.querySelector('.messageTitle')
        messageTitle.textContent=e.target.textContent.split(' ')[0]
        let Active=document.querySelector('.active')
        // console.log(Active)
        if(Active==null){
            e.target.classList.add('active')
        }
        else{
            // console.log(Active)
            Active.classList.remove('active')
            e.target.classList.add('active')   
        }
        let users=await axios.get(`http://localhost:4000/group/getUsers/${groupId}`)
        userNames.innerHTML=''
        let UserId=document.querySelector('.savingUserId').id
        let admin=users.data.admin

        //admis
        let adminsUsers=await axios.get(`http://localhost:4000/admin/get/${groupId}`)
        let admins=[]
        adminsUsers.data.forEach(admin=>{
            admins.push(admin.userId)
        })
        console.log('admins:-',admins)
        users.data.users.forEach(user=>{
            if(UserId==user.id)
                if(UserId==admin[0] || admins.includes(UserId)){

                     DisplayNames('you','user',user.id,true)
                    }
                else DisplayNames('you','user',user.id,false)
            else{
                if(admin[0]==user.id || admins.includes(user.id)) DisplayNames(user.name,'user',user.id,true)
                else DisplayNames(user.name,'user',user.id,false)
            }
        })
        if(UserId==admin[0] || admins.includes(UserId)){
            messageTitle.classList.add('message-title')
            // messageTitle.style='color:white'
            document.getElementById('userInput').style='display:block'
            
        }
        else{
            messageTitle.classList.remove('message-title')
            // console.log(document.getElementById('userInput'))
            document.getElementById('userInput').style='display:none'
            let btns=document.querySelectorAll('.userDeleteBtn')
            // console.log(btns)
            btns.forEach(btn=>{
                btn.remove()
            })
            let adminaddbtn=document.querySelectorAll('.Addadmin')
            adminaddbtn.forEach(btn=>{
                btn.remove()
            })
        }
        
    }
   messageContainer.innerHTML=''
    DisplayAllMessages(0)


    // setInterval(()=>{
    //      console.log('clicked')
    //     },3000)
}





// add user to the group

let Addbtn=document.getElementById('AddUserbtn')

Addbtn.onclick=async ()=>{
    try{
    let email=document.getElementById('email').value
    let groupId=document.querySelector('.active').children[0].id
    console.log(groupId)
    
    let user=await axios.post(`http://localhost:4000/group/addUser`,{id:groupId,email:email})
    userName=user.data.user[0].name
    userId=user.data.user[0].id
    DisplayNames(userName,'user',userId)
    }
    catch{
        document.getElementById('error').textContent=`User not found`
    }
}




// add message

function AddMessage(text,name){
   
       
       if(name=='you'){
        messageContainer.innerHTML+=`<div class="container darker">
        <span class="time-left" style='color: rgb(59, 61, 61)'>∼ ${name}</span>
        <p><strong>${text}</strong></p>
       </div>`
       }
       else{
        messageContainer.innerHTML+=`<div class="container">
        <span class="time-right" style='color: rgb(59, 61, 61)'>∼ ${name}</span>
        <p><strong>${text}</strong></p>
       </div>`
       }
}

// send button
// console.log(sendbtn)
sendbtn.onclick= async ()=>{

    let message=document.getElementById('text').value
    let token=localStorage.getItem('token')
    let groupId=document.querySelector('.active').children[0].id

    await axios.post(`http://localhost:4000/message/Add/$`,{
        message:message,
        id:groupId
    },{headers:{"Authorization":token}})
   
    document.getElementById('text').value=''
}

async function DisplayAllMessages(lastId){
    let group=document.querySelector('.active')

    if(group!==null){
    let groupId=group.children[0].id
    let messages=await axios.get(`http://localhost:4000/message/Get?groupId=${groupId}&lastId=${lastId}`)
    let messageId;
    let UserId=document.querySelector('.savingUserId').id
    messages.data.forEach(userMessage=>{
        messageId=userMessage.id
        if(userMessage.userId==UserId) AddMessage(userMessage.message,'you')
        else AddMessage(userMessage.message, userMessage.userName)
    })
   if(messageId!=undefined){
    localStorage.setItem('lastId',messageId)
   }
}

}

// setinterval
// function SentInterval(){
setInterval( async ()=>{
//         let group=document.querySelector('.active')
        let lastId=localStorage.getItem('lastId')
        // console.log(lastId)
        DisplayAllMessages(lastId)
//         // console.log(lastId)
//         let groupId=group.children[0].id
//         let messages=await axios.get(`http://localhost:4000/message/Get?groupId=${groupId} & lastId=${lastId}`)
//         console.log( messages.data)

  
},1000) 
// }

// SentInterval()

// users side functions

async function UsersSide(e){
    let group=document.querySelector('.active')
    let groupId=group.children[0].id
    if(e.target.textContent=='+'){
        await axios.post(`http://localhost:4000/admin/add`,{
            groupId:groupId,
            userId:e.target.id

        })
        e.target.textContent='admin'

    }

}