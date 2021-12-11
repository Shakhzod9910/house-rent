fetch('http://192.168.1.9:4000/', {
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

        homeAdress.textContent = home.house_location
        homecost.textContent = '$' + home.house_cost
        homeMessure.textContent = home.house_size + 'm'
        homeIMG.setAttribute('src', home.house_img)
        element.appendChild(ListClone)




        homeIMG.addEventListener('click', () => {
            modal.classList.add('active')
            modalImg.setAttribute('src', home.house_img)
            modalAdd.textContent = home.house_location
            modalCost.textContent = '$' + home.house_cost
            size.textContent = home.house_size + 'm'
            description.textContent = home.house_description
            telNumber.textContent = home.house_tel
        })
        remove.addEventListener('click', () => {

            modal.classList.remove('active')
        })
    });
})