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
                fetch('http://192.168.1.9:4000/newposts', {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        }
                    })
                    .then(response => response.json())
                    .then(json2 => {
                        // console.log(json2)
                        Render(json2, list)
                    })
                    .catch(err => console.log(err));
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


const Render = ((ArrList, element) => {
    element.innerHTML = null
    ArrList.forEach(home => {
        let ListClone = template.cloneNode(true)
        let homeIMG = ListClone.querySelector('.homeImg')
        let homeAdress = ListClone.querySelector('.adress')
        let homecost = ListClone.querySelector('.cost')
        let homeMessure = ListClone.querySelector('.messure')
        let Add = ListClone.querySelector('.Add')
        let deleteEd = ListClone.querySelector('.deleted')
        let added = ListClone.querySelector('.added')
        let removed = ListClone.querySelector('.delete')


        homeAdress.textContent = home.post_location
        homecost.textContent = home.user_login
        homeMessure.textContent = home.user_email
        homeIMG.setAttribute('src', home.post_img)
        element.appendChild(ListClone)




        homeIMG.addEventListener('click', () => {
            modal.classList.add('active')
            modalImg.setAttribute('src', home.post_img)
            modalAdd.textContent = home.post_location
            modalCost.textContent = '$'+ home.post_cost
            size.textContent = home.post_size + " m2"
            description.textContent = home.post_description
            telNumber.textContent = home.post_tel
        })
        remove.addEventListener('click', () => {

            modal.classList.remove('active')
        })
        Add.addEventListener('click', () => {
            
            let obj = {
                posts_id: home.posts_id,
                house_size: home.post_size,
                house_location: home.post_location,
                house_tel: home.post_tel,
                house_cost: home.post_cost,
                house_img: home.post_img,
                house_description: home.post_description
            }
            fetch('http://192.168.1.9:4000/addpost', {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then(response => response.json())
                .then(json => {
                    if(json == 'ok'){
                        added.style.display = 'flex'
                        added.textContent = 'Added'
                        Add.style.display ='none'
                        removed.style.display ='none'

                    }
                    console.log(json)
                })
                .catch(err => console.log(err));
        })

        removed.addEventListener('click', ()=>{
            let obj2 = {
                posts_id: home.posts_id
            }
            fetch('http://192.168.1.9:4000/removepost', {
                    method: 'DELETE',
                    body: JSON.stringify(obj2),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                .then(response => response.json())
                .then(json => {
                    if(json == 'ok'){
                        added.style.display = 'flex'
                        added.textContent = 'Removed'
                        added.style.color = 'red'
                        Add.style.display ='none'
                        removed.style.display ='none'

                    }
                    console.log(json)
                })
                .catch(err => console.log(err));
        })
    });
})