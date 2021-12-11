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
            if (json == 'ok') {
                fetch('http://192.168.1.9:4000/mainuser', {
                    method: 'POST',
                    body: JSON.stringify(checker),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                    })
                    .then(response => response.json())
                    .then(json2 => {
                        let user_id = json2[0].user_id
                        console.log(json2)
                        window.localStorage.setItem('user_id', user_id)
                        console.log(user_id)
                        Render(json2, list)
                    })
                    .catch(err => {
                        console.log(err)
                    });
            } else {
                window.location.replace("admin.html");
            }
        })
        .catch(err => console.log(err));
}

const list = document.querySelector('.list')
const template = document.querySelector('.listTemplate').content
const modal = document.querySelector('.modal')
const remove = document.querySelector('.remove')
const modalImg = document.querySelector('.modalIMG')
const modalAdd = document.querySelector('.modaladress')
const modalCost = document.querySelector('.modalCost')
const size = document.querySelector('.size')
const description = document.querySelector('.description')
const telNumber = document.querySelector('.telNumber')
const username = document.querySelector('.username')


const Render = ((ArrList, element) => {
    element.innerHTML = null
    username.textContent = ArrList[0].user_login
    ArrList.forEach(home => {
        let ListClone = template.cloneNode(true)
        let homeIMG = ListClone.querySelector('.homeImg')
        let homeAdress = ListClone.querySelector('.adress')
        let homecost = ListClone.querySelector('.cost')
        let homeMessure = ListClone.querySelector('.messure')
        let deletePo = ListClone.querySelector('.delete')
        let deleteEd = ListClone.querySelector('.deleted')


        if(!home.post_cost){
            return 
        }
        homeAdress.textContent = home.post_location
        homecost.textContent = '$' + home.post_cost
        homeMessure.textContent = home.post_size + 'm'
        homeIMG.setAttribute('src', home.post_img)
        element.appendChild(ListClone)




        homeIMG.addEventListener('click', () => {
            modal.classList.add('active')
            modalImg.setAttribute('src', home.post_img)
            modalAdd.textContent = home.post_location
            modalCost.textContent = '$' + home.post_cost
            size.textContent = home.post_size + 'm'
            description.textContent = home.post_description
            telNumber.textContent = home.post_tel
        })
        remove.addEventListener('click', () => {

            modal.classList.remove('active')
        })
        deletePo.addEventListener('click', () => {
            let id = {
                id: home.house_id
            }
            fetch('http://192.168.1.9:4000/mainadmin', {
                    method: 'DELETE',
                    body: JSON.stringify(id),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then(response => response.json())
                .then(json => {
                    if(json == 'ok'){
                        deleteEd.textContent = 'Deleted'
                        deletePo.style.display = 'none'
                    }
                    console.log(json)
                })
                .catch(err => console.log(err));
        })
    });
})