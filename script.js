let toDoListArr = [] //массиваная версия LS (массивLS)
let list = document.querySelectorAll('.list')
const toDoList__main = document.querySelector('.toDoList__main')
const toDoList__bottom = document.querySelector('.toDoList__bottom')

empty()
//убрать дефолтное поведение формы (убрать обновление страницы)
document.querySelector('form').addEventListener("submit", (e)=>{
    e.preventDefault()
})

//получение данных с сервера
function getTask(){
    fetch("http://24api.ru/rest-todo/items-by-id?id=880", {
        "method": "GET"
    })
    .then(data => data.json())
    .then(data => data.forEach(obj => createItem(obj.name, obj.id, obj.isDone)))
}
getTask()

//скрыть центральную и нижнюю часть блока
function empty(){
    toDoList__main.style.display='none'
    toDoList__bottom.style.display='none'
}

//отобразить задание
function createItem(object, iter, isDone) {
    const toDoList__main = document.body.querySelector(".toDoList__main") //находим .toDoList__main
    const list = document.createElement('div') //создаем div для задания 
    list.className = "list" //добавляем ему класс .list


    const list__wrapper = document.createElement('div') //создаем обертку для задания
    list__wrapper.className = "list__wrapper" // добавляем ей класс list__wrapper
    const deleteItem = document.createElement('span') //создаем кнопку удаления
    deleteItem.className = "deleteItem" // добавляем ей класс deleteItem
    deleteItem.innerHTML = '❌' //внутри рисуем крест
    //Слушатель 'X'
    deleteItem.addEventListener('click', () => {
            fetch(`http://24api.ru/rest-todo/${iter}`, {
                method: 'DELETE'
            })
            deleteItem.parentElement.style.display='none'
    })

    const checkbox = document.createElement('input') //добавляем чекбокс
    checkbox.type = 'checkbox' //устанавливаем тип checkbox
    checkbox.className = "customCheckbox" //добавляем класс customCheckbox
    checkbox.id = iter//добавляем id
    checkbox.name = iter //добавляем name

    //Слушатель 'checkbox'
    checkbox.addEventListener('click', (e) => {
        let check = null
        if (e.target.checked == true){
            check = {"isDone": 1}
            fetch(`http://24api.ru/rest-todo/${iter}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(check)
            })
        } else if(e.target.checked == false){
            check = {"isDone": 0}
            fetch(`http://24api.ru/rest-todo/${iter}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(check)
            })
        }
        checkbox.nextElementSibling.classList.toggle('close')
    })

    const label = document.createElement('label') //добавляем лейбл
    label.htmlFor = iter //добавляем ему for
    label.innerHTML = object //пишем значение из input-а
    if(isDone == 1) { //если в LS указано, что дело сделано - добавить классы
        label.classList.add("close")
        checkbox.checked = true
    }
    
    toDoList__main.append(list) //отображаем list
    list.append(list__wrapper, deleteItem) //отображаем все внутри list-а
    list__wrapper.append(checkbox, label) //отображаем отображаем все внутри list__wrapper-а
    //отобразить центральную и нижнюю часть блока
    toDoList__main.style.display='block'
    toDoList__bottom.style.display='flex'
}

// Слушатель input. Настройка работы input-а
document.querySelector('#input').addEventListener('change', (event) => {
    const task = {
        'id': null,
        'name': input.value,
        'isDone': 0,
        "user_id": 880,
    }

    fetch("http://24api.ru/rest-todo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(data => createItem(task.name, task.id)) //отображаем элемент на странице;
    event.target.value = '' //опустошаем input
})

//Слушатель 'Удалить завершенные'
document.querySelector('#deleteClose').addEventListener('click', () => {
    let arr = []
    let closeItem = document.querySelectorAll('.close') //перебираем все элементы с классом close...
    closeItem.forEach(el => {
        arr.push(+el.getAttribute('for'))
        el.parentElement.parentElement.style.display='none' //... скрываем все, что нашли 
    })

    const delAll = {
        'items': arr
    }

    fetch('http://24api.ru/rest-todo/delete-items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(delAll)
    })
})

//Слушатель 'Удалить все'
document.querySelector('#deleteAll').addEventListener('click', () => {
    let arr = []
    let list = document.querySelectorAll('.list') //находим все задания в списке и...
    list.forEach(el => {
        arr.push(+el.children[0].children[0].id)
        el.style.display='none' //... скрываем их
    })

    const delAll = {
        'items': arr
    }

    fetch('http://24api.ru/rest-todo/delete-items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(delAll)
    })

    empty() //скрыть центральную и нижнюю часть блока
})

// ToDo
// 7. Удалить нижние кнопки
// 8. Рефакторинг кода
// 9. Данные не возвращаются с сервера