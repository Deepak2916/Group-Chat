
    const loginbtn=document.getElementById('btn')
    loginbtn.addEventListener('click',Login)
    
    
    function Login(e){
        e.preventDefault()
    //   console.log('login entered')
        
        let email=document.getElementById('email').value
        let password=document.getElementById('password').value
        console.log('email,',email)
        async function User(){
            let statusText=document.getElementById('status')
            try{
            let user= await axios.post(`http://localhost:4000/user/login`,{email:email,password:password})
            localStorage.setItem('token',user.data.token)
           if(user.data.success){
            statusText.innerHTML=user.data.message
            // document.getElementById('login-page').style='display:none'
            // document.getElementById('expense-page').style='display:block'
            document.getElementById('email').value=''
            document.getElementById('password').value=''
            window.location="index.html"
           }
            // expense()
        
            }
            catch(err){
                console.log(err.response)
                console.log(err)
                statusText.innerHTML= err.response.data.message
                setTimeout(()=>{statusText.innerHTML= ''},3000)
                
            }
           
            // window.location="index.html"
        }
        User()
    
    }
    
 