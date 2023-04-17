let toDoListArr = [] //массиваная версия LS (массивLS)
const toDoList__main = document.querySelector('.toDoList__main')
const toDoList__bottom = document.querySelector('.toDoList__bottom')
let closeItem = ''
let i=1
let localItems = null; //пустой LS
let checkboxChoose = []

empty()

//убрать дефолтное поведение формы (убрать обновление страницы)
document.querySelector('form').addEventListener("submit", (e)=>{
    e.preventDefault()
})

//проверка LS на пустоту
if (window.localStorage.getItem('toDoList') !== null){
    localItems = window.localStorage.getItem('toDoList')
    let obj=null
    let arrTask=[]
    let arrID=[]
    obj = JSON.parse(localItems)
    for(let i=0; i<obj.length; i++){
        arrTask.push(obj[i].task)
        arrID.push(obj[i].id)
        console.log(arrID)
    }
    toDoListArr = arrTask  //создаем массив, разделенный запятыми
    toDoListArr.map((el) => { //перебор всех заданий из localStorage и отображение их на странице
        createItem(el, i)
        i++
    })
    toDoListArr = JSON.parse(localItems)
}

//скрыть центральную и нижнюю часть блока
function empty(){
    toDoList__main.style.display='none'
    toDoList__bottom.style.display='none'
}

//удалить данные из LS
function delLS(item){
    toDoListArr=toDoListArr.filter(function(value, index) {
        return(value.id != item)
    })
    let arrayString = JSON.stringify(toDoListArr)
    console.log(toDoListArr)
    localItems = window.localStorage.setItem('toDoList', arrayString)
    if (window.localStorage.getItem('toDoList') == ''){
        empty()
    }
}

//удалить все задания
function deleteAllItems() {
    toDoListArr = [] //опустошаем массивLS
    window.localStorage.removeItem('toDoList') //удаляем все значения toDoList из LS
    item = document.querySelectorAll('.list') //находим все задания в списке и...
    item.forEach(el => {
        el.style.display='none' //... скрываем их
    })
    empty() //скрыть центральную и нижнюю часть блока
}

//отобразить задание
function createItem(object, iter) {
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
        if(toDoListArr.length == 1){
            deleteAllItems()
        } else {
            deleteItem.parentElement.style.display='none'
            delLS(deleteItem.parentElement.children[0].children[0].id)
        }
    })

    const checkbox = document.createElement('input') //добавляем чекбокс
    checkbox.type = 'checkbox' //устанавливаем тип checkbox
    checkbox.className = "customCheckbox" //добавляем класс customCheckbox
    checkbox.id = i //добавляем id
    checkbox.name = `toDo${iter}` //добавляем name
    //Слушатель 'checkbox'
    checkbox.addEventListener('click', () => {
        checkbox.nextElementSibling.classList.toggle('close')
         //При нажатии добавляем класс close
        if(checkbox.nextSibling.classList == 'close'){ //если у элемента есть класс close
            checkboxChoose.splice(0, 0, checkbox.nextSibling.innerHTML) //удаляем его из массива checkboxChoose
            console.log(checkboxChoose)
        } else {
            checkboxChoose.splice(checkboxChoose.indexOf(checkbox.nextSibling.innerHTML), 1) //иначе - добавляем в массив checkboxChoose
            console.log(checkboxChoose)
        }
    })

    const label = document.createElement('label') //добавляем лейбл
    label.htmlFor = `toDo${iter}` //добавляем ему for
    label.innerHTML = object //пишем значение из input-а
    
    toDoList__main.append(list) //отображаем list
    list.append(list__wrapper, deleteItem) //отображаем все внутри list-а
    list__wrapper.append(checkbox, label) //отображаем отображаем все внутри list__wrapper-а
    //отобразить центральную и нижнюю часть блока
    toDoList__main.style.display='block'
    toDoList__bottom.style.display='flex'
}

//сравнить два массива и вернуть один с уникальными значениями
function delDublicat(a, b) {
    var result = [];
    for(var i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) == -1) {
            result.push(a[i]);
        }
    }
    return result;
}

// Слушатель input. Настройка работы input-а
document.querySelector('#input').addEventListener('change', (event) => {
    addObj()

    createItem(input.value, i) //отображаем элемент на странице; i - индекс для id
    i++ //добавляем i в счетчик
    event.target.value = '' //опустошаем input
})

//Слушатель 'Удалить завершенные'
document.querySelector('#deleteClose').addEventListener('click', () => {
    closeItem = document.querySelectorAll('.close') //перебираем все элементы с классом close...
    closeItem.forEach(el => {
        el.parentElement.parentElement.style.display='none' //... скрываем все, что нашли 
    })
    toDoListArr = delDublicat(toDoListArr, checkboxChoose) //сравниваем массив завершенных дел и массивLS
    localItems = window.localStorage.setItem('toDoList', toDoListArr) //переносим данные из массиваLS в сам LS
    checkboxChoose = [] //обнуляем массив выбранных элементов

    if(toDoListArr.length == 0){ //если массивLS пустой...
        deleteAllItems()//удаляем все и скрываем середину и низ блока
    }
})

//Слушатель 'Удалить все'
document.querySelector('#deleteAll').addEventListener('click', () => {
    deleteAllItems()
})

function addObj(){
    obj = {
        task: input.value,
        isDone: 0,
        id: i
    }
    toDoListArr.push(obj)
    let arrayString = JSON.stringify(toDoListArr)
    localItems = window.localStorage.setItem('toDoList', arrayString);
}

// минусы:
// удалить дело - LS првильно изменяется!!!
// checkbox нажат - объект изменен
//обновить страницу - завершенные дела сохранены
