let token = window.localStorage.getItem('token')
if (!token) {
    window.location.replace("register.html");
} else {
    let checker = {
        token: token
    }
    fetch('http://192.168.1.9:4000/usertokenchecker', {
            method: 'POST',
            body: JSON.stringify(checker),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(json => {
            let list = document.querySelector('.list')
            let adress = document.querySelector('.adress')
            let cost = document.querySelector('.cost')
            let foto = document.querySelector('.foto')
            let measure = document.querySelector('.measure')
            let area = document.querySelector('.area')
            let phone = document.querySelector('.phone')

            list.addEventListener('submit', (evt) => {
                evt.preventDefault();
                let user_id = window.localStorage.getItem('user_id')
                let obj = {
                    post_size: measure.value,
                    post_location: adress.value,
                    post_tel: phone.value,
                    post_cost: cost.value,
                    post_img: foto.value,
                    post_description: area.value,
                    post_owner: user_id
                }
                console.log(obj)
                fetch('http://192.168.1.9:4000/adduserpost', {
                        method: 'POST',
                        body: JSON.stringify(obj),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(response => response.json())
                    .then(json2 => {
                        
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })
        })
        .catch(err => console.log(err));
}