const ElForm = document.querySelector('.registrationForm')
const ElinputName = ElForm.querySelector('.name')
const ElinputEmail = ElForm.querySelector('.email')
const ElinputPassword = ElForm.querySelector('.password')
const exist = ElForm.querySelector('.exist')

ElForm.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    let obj = {
        user_login: ElinputName.value,
        user_password: ElinputPassword.value,
        user_email: ElinputEmail.value
    }
    console.log(obj)
    fetch('http://192.168.1.9:4000/adduser', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(json2 => {
            if(json2 == 'false'){
                exist.textContent = 'This user already exist !!!'
            }else{
                window.localStorage.setItem('token', json2)
                window.location.replace("user.html");
            }
        })
        .catch(err => console.log(err));
})