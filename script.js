const form = document.querySelector('form')
const input = document.querySelector('#input')
let toDoListArr = [] //массиваная версия LS ???
const checkbox = document.querySelectorAll('.customCheckbox')
const delleteItemBtn = document.querySelectorAll('.deleteItem')
const deleteCloseItemsBtn = document.querySelector('#deleteClose')
const deleteAllItemsBtn = document.querySelector('#deleteAll')
let closeItem = ''
const toDoList__main = document.querySelector('.toDoList__main')
const toDoList__bottom = document.querySelector('.toDoList__bottom')
let i=1
let localItems = null;//пустой LS
let lokalItem = [] //массиваная версия LS
if (window.localStorage.getItem('toDoList') == null){
    console.log('empty')
} else {
    localItems = window.localStorage.getItem('toDoList')
    lokalItem = localItems.split(',')  //создаем массив, разделенный запятыми
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

function addLS(){
    localItems = window.localStorage.setItem('toDoList', toDoListArr)
    lokalItem.push(input.value)
    localItems = lokalItem.join(',')
}

function delLS(){
    toDoListArr.pop()
    localItems = window.localStorage.setItem('toDoList', toDoListArr)
    lokalItem.pop()
    localItems = lokalItem.join(',')
    if (window.localStorage.getItem('toDoList') == ''){
        empty()
    }
}

// настройка работы input-а
input.addEventListener('change', (event) => {
    let task = input.value
    toDoListArr.push(task)
    addLS()
    event.target.value = ''
    createItem(task, i)
    i++
})

//перебор всех заданий из localStorage и отображение их на странице
if (localItems !== null){
    lokalItem.map((el) => {
        createItem(el, i)
        i++
    })
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
    delLS()
}

//запустить удаление всех заданий при нажатии
deleteAllItemsBtn.addEventListener('click', () => {
    deleteAllItems()
})
//удалить все задания
function deleteAllItems() {
    toDoListArr = []
    window.localStorage.removeItem('toDoList')
    // window.localStorage.getItem('toDoList') = []
    item = document.querySelectorAll('.list')
    item.forEach(el => {
        el.style.display='none'
    })
    empty()
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
        console.log(deleteItem.parentElement.children[0].children[1].innerHTML)
        delLS()
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

// минусы:
// - нажимаем на удаление - удаляется последний элемент
// удалить завершенные

