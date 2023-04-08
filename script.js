const form = document.querySelector('form')
const input = document.querySelector('#input')
const toDoListArr = []
const checkbox = document.querySelectorAll('.customCheckbox')
const delleteItemBtn = document.querySelectorAll('.deleteItem')
const closeItem = document.querySelector('.close')
const deleteCloseItemsBtn = document.querySelector('#deleteClose')

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
    // item.forEach(el => {
    //     console.log(el)
    // })
    console.log(item)
}

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

//перебор всех завершенных заданий
// closeItem.forEach(el => {
//     console.log(el.parentElement.parentElement)
// })

deleteCloseItemsBtn.addEventListener('click', () => {
    deleteCloseItems(closeItem)
})

////вводим в инпут - добавляем в localStorage, оттуда в инпуты
//Добавить - добавить чекбокс после нажатия кнопки
//Удалить завершенные - удалить перечеркнутые
//Удалить все - удалить все = очистить localStorage
//удалить чекбокс = удалить из localStorage

