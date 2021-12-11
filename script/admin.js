const elLoginform = document.querySelector('.loginForm')
const elLoginInput = document.querySelector('.login')
const elPasswordInput = document.querySelector('.password')
const elregistr = document.querySelector('#registr')
let loader = document.querySelector('.loadingWrapper')
const select = document.querySelector('.select')
const logo = document.querySelector('.logo')
const error = document.querySelector('.error')
const Wrapper = document.querySelector('.loginWrapper')
const passwordWrapper = document.querySelector('.passwordWrapper')



elLoginform.addEventListener('submit', (evt) => {
    let logindata = {}
    evt.preventDefault()
    logindata.mainadmin_login = elLoginInput.value
    logindata.mainadmin_password = elPasswordInput.value
    fetch('http://192.168.1.9:4000/admin', {
            method: 'POST',
            body: JSON.stringify(logindata),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(json2 => {
            if(json2 == 'false'){
                error.textContent = 'Invalid login or password'
                Wrapper.style.border ='2px solid red'
                passwordWrapper.style.border ='2px solid red'
            }else{
                window.localStorage.setItem('token', json2)
                window.location.replace("mainadmin.html");
                Wrapper.style.border ='2px solid black'
                passwordWrapper.style.border ='2px solid black'
            }
        })
        .catch(err => console.log(err));
})
