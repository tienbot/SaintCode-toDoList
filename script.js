/*  Информация о сервере
Ссылка на сервер - https://app.swaggerhub.com/apis-docs/a-berezhkov/todo_app_sc_bc/1.0.0#/users/put_rest_user__id
Servers изменить на http://24api.ru */

const userID = 880 //id пользователя
let idLast = null //последний присвоенный id
let toDoListArr = [] //массив данных для отслеживания их кол-ва
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
    fetch(`http://24api.ru/rest-todo/items-by-id?id=${userID}`, {
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

//отметка сделано/не сделано на сервер
function taskCheck(iter, check){
	fetch(`http://24api.ru/rest-todo/${iter}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(check)
	})
}

//удалить данные с сервера
function taskDel(arr){
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
        closeListener(deleteItem, iter) //Слушатель 'X'

    const checkbox = document.createElement('input') //добавляем чекбокс
		checkbox.type = 'checkbox' //устанавливаем тип checkbox
		checkbox.className = "customCheckbox" //добавляем класс customCheckbox
		checkbox.id = iter//добавляем id
		checkbox.name = iter //добавляем name
        checkboxListener(checkbox, iter) //Слушатель 'checkbox'

	//label
    const label = document.createElement('label') //добавляем лейбл
		label.htmlFor = iter //добавляем ему for
		label.innerHTML = object //пишем значение из input-а
		if(isDone == 1) { //если указано, что дело сделано - добавить классы
			label.classList.add("close")
			checkbox.checked = true
		}
    
    toDoList__main.append(list) //отображаем list
    list.append(list__wrapper, deleteItem) //отображаем все внутри list-а
    list__wrapper.append(checkbox, label) //отображаем отображаем все внутри list__wrapper-а
	toDoListArr.push(+iter) //добавляем все id в массив
	idLast = iter //последний iter будет idLast

    //отобразить центральную и нижнюю часть блока
    toDoList__main.style.display='block'
    toDoList__bottom.style.display='flex'
}

// Слушатель input. Настройка работы input-а
document.querySelector('#input').addEventListener('change', (event) => {
    const task = {
        'id': null,
        // 'id': idLast=++idLast,
        'name': input.value,
        'isDone': 0,
        "user_id": userID,
    }

    fetch("http://24api.ru/rest-todo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        // .then(data => data.json())
        .then(data => createItem(task.name, task.id, task.isDone)) //отображаем элемент на странице;
        // .then(data => console.log(task.name, task.id, task.isDone)) //отображаем элемент на странице;
    event.target.value = '' //опустошаем input
})

//Слушатель 'checkbox'
function checkboxListener(checkbox, iter){
    checkbox.addEventListener('click', (e) => {
        let check = null
        if (e.target.checked == true){ //если чекбокс нажат
            check = {"isDone": 1} //isDone = 1
            taskCheck(iter, check) //вносим изменения на сервер
        } else { 					//иначе
            check = {"isDone": 0}  //isDone = 0
            taskCheck(iter, check) ////вносим изменения на сервер
        }
        checkbox.nextElementSibling.classList.toggle('close')
    })
}

//Слушатель 'X'
function closeListener(deleteItem, iter){
    deleteItem.addEventListener('click', () => {
        fetch(`http://24api.ru/rest-todo/${iter}`, {
            method: 'DELETE'
        })
        toDoListArr.pop(iter) //добавляем все id в массив для отслеживания
        deleteItem.parentElement.style.display='none'
        if(toDoListArr.length == 0){
            empty()
        }
    })
}

//Слушатель 'Удалить завершенные'
document.querySelector('#deleteClose').addEventListener('click', () => {
    let arr = []
    let closeItem = document.querySelectorAll('.close') //перебираем все элементы с классом close...
    closeItem.forEach(el => {
        arr.push(+el.getAttribute('for'))
        el.parentElement.parentElement.style.display='none' //... скрываем все, что нашли 
		toDoListArr = toDoListArr.filter(el => !arr.includes(el)) 
		if(toDoListArr == 0){
			empty()
		}
    })
	taskDel(arr) //удаляем данные из сервера
})

//Слушатель 'Удалить все'
document.querySelector('#deleteAll').addEventListener('click', () => {
    let arr = []
    let list = document.querySelectorAll('.list') //находим все задания в списке и...
    list.forEach(el => {
        arr.push(+el.children[0].children[0].id)
        el.style.display='none' //... скрываем их
    })
	taskDel(arr) //удаляем данные из сервера
    empty() //скрыть центральную и нижнюю часть блока
})