let token = window.localStorage.getItem('token')
if (!token) {
    window.location.replace("admin.html");
} else {
    let checker = {
        token: token
    }
    fetch('http://192.168.1.9:4000/mainadmin', {
            method: 'POST',
            body: JSON.stringify(checker),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(json => {
            if (json == 'ok') {
                fetch('http://192.168.1.9:4000/users', {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(response => response.json())
                    .then(json2 => {
                        Render(json2, list)
                    })
                    .catch(err => console.log(err));
            } else {
                window.location.replace("admin.html");
            }
        })
        .catch(err => console.log(err));
}

const template = document.querySelector('.copy').content
const list = document.querySelector('.list')

const Render = ((Arr, ellist) => {
    let i = 1
    Arr.forEach((users) => {
        
        let Clone = template.cloneNode(true)
        let numb = Clone.querySelector('.count')
        let usname = Clone.querySelector('.usName')
        let id = Clone.querySelector('.id')
        let usEmail = Clone.querySelector('.usEmail')
        let deletebtn = Clone.querySelector('.btndelete')

        numb.textContent = i
        usname.textContent = users.user_login
        id.textContent = users.user_id
        usEmail.textContent = users.user_email
        i++
        deletebtn.addEventListener('click', ()=>{
            let id = {
                user_id: users.user_id
            }
            fetch('http://192.168.1.9:4000/usersdelete', {
                    method: 'POST',
                    body: JSON.stringify(id),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then(response => response.json())
                .then(json => {
                    if(json == 'ok'){
                        deletebtn.textContent = 'Deleted'
                        deletebtn.style.background = '#777'
                    }
                    console.log(json)
                })
                .catch(err => console.log(err));
        })
        ellist.appendChild(Clone)
    });


})

