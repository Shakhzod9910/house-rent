const ElForm = document.querySelector('.loginForm')
const ElinputName = ElForm.querySelector('.login')
const ElinputPassword = ElForm.querySelector('.password')
const exist = ElForm.querySelector('.error')
const Wrapper = document.querySelector('.loginWrapper')
const passwordWrapper = document.querySelector('.passwordWrapper')


ElForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    let obj = {
        user_login: ElinputName.value,
        user_password: ElinputPassword.value
    }
    fetch('http://192.168.1.9:4000/checkuser', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(json2 => {
            if(json2 == 'false'){
                exist.textContent = 'Invalid login or password'
                Wrapper.style.border ='2px solid red'
                passwordWrapper.style.border ='2px solid red'
            }else{
                window.localStorage.setItem('token', json2)
                window.location.replace("user.html");
                Wrapper.style.border ='2px solid black'
                passwordWrapper.style.border ='2px solid black'
            }
        })
        .catch(err => console.log(err));
})