const form = document.querySelector('form')
const input = document.querySelector('#input')
let toDoListArr = [] //массиваная версия LS
const checkbox = document.querySelectorAll('.customCheckbox')
const delleteItemBtn = document.querySelectorAll('.deleteItem')
const deleteCloseItemsBtn = document.querySelector('#deleteClose')
const deleteAllItemsBtn = document.querySelector('#deleteAll')
let closeItem = ''
const toDoList__main = document.querySelector('.toDoList__main')
const toDoList__bottom = document.querySelector('.toDoList__bottom')
let i=1
let localItems = null;//пустой LS
if (window.localStorage.getItem('toDoList') == null){
    console.log('empty')
} else {
    localItems = window.localStorage.getItem('toDoList')
    toDoListArr = localItems.split(',')  //создаем массив, разделенный запятыми
}
empty()

function empty(){
    toDoList__main.style.display='none'
    toDoList__bottom.style.display='none'
}

//убрать дефолтное поведение формы (убрать обновление страницы)
form.addEventListener("submit", (e)=>{
    e.preventDefault()
})

function delLS(item){
    toDoListArr.splice(toDoListArr.indexOf(item), 1)
    localItems = window.localStorage.setItem('toDoList', toDoListArr)
    if (window.localStorage.getItem('toDoList') == ''){
        empty()
    }
}

//перебор всех заданий из localStorage и отображение их на странице
if (localItems !== null){
    toDoListArr.map((el) => {
        createItem(el, i)
        i++
    })
}

//удалить все завершенные задания
function deleteCloseItems(item) {
    item = document.querySelectorAll('.close')
    item.forEach(el => {
        el.parentElement.parentElement.style.display='none'
    })
    delLS()
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
        delLS(deleteItem.parentElement.children[0].children[1].innerHTML)
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

    toDoList__main.style.display='block'
    toDoList__bottom.style.display='flex'
}

// Слушатель input. Настройка работы input-а
input.addEventListener('change', (event) => {
    toDoListArr.push(input.value) //добавляем в массив значение из инпута
    localItems = window.localStorage.setItem('toDoList', toDoListArr) //добавляем массив в LS
    createItem(input.value, i) //отображаем элемент на странице; i - индекс для id
    i++ //добавляем i в счетчик
    event.target.value = '' //опустошаем input
})

//Слушатель 'Удалить завершенные'
deleteCloseItemsBtn.addEventListener('click', () => {
    deleteCloseItems(closeItem)
})

//Слушатель 'Удалить все'
deleteAllItemsBtn.addEventListener('click', () => {
    toDoListArr = []
    window.localStorage.removeItem('toDoList')
    item = document.querySelectorAll('.list')
    item.forEach(el => {
        el.style.display='none'
    })
    empty()
})

// минусы:
// - нажимаем на удаление - удаляется последний элемент
// удалить завершенные
