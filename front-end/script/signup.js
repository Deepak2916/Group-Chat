const signupbtn=document.getElementById('btn')
signupbtn.addEventListener('click',SignUp)
const status=document.getElementById('status')
console.log('singup page')

function SignUp(e){
    e.preventDefault()
    let name=document.getElementById('name').value
    let email=document.getElementById('email').value
    let number=document.getElementById('number').value
    let password=document.getElementById('password').value
    let obj={
        name:name,
        email:email,
        number:number,
        password:password
    }
   
    
    async function PostUser(){
        try{
       let user=await axios.post('http://localhost:4000/user/signup',obj)
       console.log(user.data.success)
       let status=document.getElementById('status')
       if(user.data.success){
        status.style='color:green'
        status.innerHTML='SUCCESS'
        window.URL="login.html"
       }
       else{
        if(user.data.error=="number"){
            status.innerHTML=`user with number <b> '${number}' </b> has already existed`
        }
        else{
            status.innerHTML=`user with email id <b>'${email}'</b> has already existed`
        }
       }
    }
    catch(err){
        console.log('err:-',err)
    }
    
   
    }
    PostUser()

}