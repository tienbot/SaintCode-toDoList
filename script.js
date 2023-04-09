const form = document.querySelector('form')
const input = document.querySelector('#input')
const toDoListArr = []
const checkbox = document.querySelectorAll('.customCheckbox')
const delleteItemBtn = document.querySelectorAll('.deleteItem')
const deleteCloseItemsBtn = document.querySelector('#deleteClose')
const deleteAllItemsBtn = document.querySelector('#deleteAll')
let closeItem = ''
let lists = document.querySelectorAll('.list')
const toDoList__main = document.querySelector('.toDoList__main')
const toDoList__bottom = document.querySelector('.toDoList__bottom')

//убрать дефолтное поведение формы (убрать обновление страницы)
form.addEventListener("submit", (e)=>{
    e.preventDefault()
})

// настройка работы input-а
input.addEventListener('change', (event) => {
    toDoListArr.push(input.value)
    window.localStorage.setItem('toDoList', toDoListArr)
    console.log(input.value)
})

//перебор всех кнопок удаления заданий
delleteItemBtn.forEach(el => {
    el.addEventListener('click', () => {
        deleteItem(el);
    })
})

//перебор всех чекбоксов
checkbox.forEach(el => {
    el.addEventListener('click', () => {
        isCheck(el);
    })
})

//запустить удаление всех завершенные заданий при нажатии
deleteCloseItemsBtn.addEventListener('click', () => {
    deleteCloseItems(closeItem)
})

//запустить удаление всех заданий при нажатии
deleteAllItemsBtn.addEventListener('click', () => {
    deleteAllItems(lists)
})

//перечеркнуть задание при нажатии
function isCheck(item) {
    item.nextElementSibling.classList.toggle('close')
}

//удалить задание при нажатии
function deleteItem(item) {
    item.parentElement.style.display='none'
}

//удалить все завершенные задания
function deleteCloseItems(item) {
    item = document.querySelectorAll('.close')
    item.forEach(el => {
        el.parentElement.parentElement.style.display='none'
    })
}

//удалить все задания
function deleteAllItems(item) {
    item.forEach(el => {
        el.style.display='none'
    })
    toDoList__main.style.display='none'
    toDoList__bottom.style.display='none'
}

//Отрисовка чекбокса через JS
//Добавить - добавить чекбокс после нажатия кнопки
//вводим в инпут - добавляем в localStorage, оттуда в инпуты
//Удалить все - очистить localStorage
//удалить чекбокс = удалить из localStorage

//+ Удалить завершенные - удалить перечеркнутые
//+ Удалить все - удалить все = очистить localStorage

