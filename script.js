const form = document.querySelector('form')
const input = document.querySelector('#input')
const toDoListArr = []
const checkbox = document.querySelectorAll('.customCheckbox')
const delleteItemBtn = document.querySelectorAll('.deleteItem')
const deleteCloseItemsBtn = document.querySelector('#deleteClose')
const deleteAllItemsBtn = document.querySelector('#deleteAll')
let closeItem = ''
const toDoList__main = document.querySelector('.toDoList__main')
const toDoList__bottom = document.querySelector('.toDoList__bottom')
let i=0
let localItems = '';
(window.localStorage.getItem('toDoList') == null) ? localItems = '' : localItems = window.localStorage.getItem('toDoList')
likedItem = localItems.split(',')
console.log(likedItem)

toDoList__main.style.display='none'
toDoList__bottom.style.display='none'

//убрать дефолтное поведение формы (убрать обновление страницы)
form.addEventListener("submit", (e)=>{
    e.preventDefault()
})

// настройка работы input-а
input.addEventListener('change', (event) => {
    let task = input.value
    toDoListArr.push(input.value)
    window.localStorage.setItem('toDoList', toDoListArr)
    console.log(input.value)
    event.target.value = ''
    createItem(task, i)
    i++
    toDoList__main.style.display='block'
    toDoList__bottom.style.display='flex'
})

//удалить задание при нажатии
function deleteItem(item) {
    item.parentElement.style.display='none'
}

function makeItAgain(){

}
//перечеркнуть задание при нажатии
function isCheck(item) {
    item.nextElementSibling.classList.toggle('close')
}

//запустить удаление всех завершенные заданий при нажатии
deleteCloseItemsBtn.addEventListener('click', () => {
    deleteCloseItems(closeItem)
})
//удалить все завершенные задания
function deleteCloseItems(item) {
    item = document.querySelectorAll('.close')
    item.forEach(el => {
        el.parentElement.parentElement.style.display='none'
    })
}

//запустить удаление всех заданий при нажатии
deleteAllItemsBtn.addEventListener('click', () => {
    deleteAllItems()
})
//удалить все задания
function deleteAllItems() {
    item = document.querySelectorAll('.list')
    item.forEach(el => {
        el.style.display='none'
    })
    toDoList__main.style.display='none'
    toDoList__bottom.style.display='none'
}

function createItem(object, iter) {
    const toDoList__main = document.body.querySelector(".toDoList__main")
    //создаем задание
    const list = document.createElement('div')
    list.className = "list"

    //создаем обертку для задания
    const list__wrapper = document.createElement('div')
    list__wrapper.className = "list__wrapper"

    //создаем кнопку удаления
    const deleteItem = document.createElement('span')
    deleteItem.className = "deleteItem"
    deleteItem.innerHTML = '❌'
    deleteItem.addEventListener('click', () => {
        deleteItem.parentElement.style.display='none'
        // window.localStorage.removeItem('toDoList', toDoListArr)
        // toDoListArr = toDoListArr.filter(el => el==1)
    })

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = "customCheckbox"
    checkbox.id = `toDo${iter}`
    checkbox.name = `toDo${iter}`
    checkbox.addEventListener('click', () => {
        checkbox.nextElementSibling.classList.toggle('close')
    })

    const label = document.createElement('label')
    label.htmlFor = `toDo${iter}`
    label.innerHTML = object
    
    toDoList__main.append(list)
    list.append(list__wrapper, deleteItem)
    list__wrapper.append(checkbox, label)
}


//Добавить - добавить чекбокс из localStorage после нажатия кнопки
//Удалить все - очистить localStorage
//удалить чекбокс = удалить из localStorage
//удалить завершенные - удалить перечеркнутые из localStorage

