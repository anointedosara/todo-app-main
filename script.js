let dark = document.getElementById("dark")
let light = document.getElementById("light")
const root = document.querySelector(':root')
let darkMode = false;

let todosToSHow = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
let tab = "all"


const previousStyle = getComputedStyle(root);
if (darkMode != true) {
    dark.addEventListener("click", function() {
        root.style.setProperty("--bg", "hsl(235, 21%, 11%)")
        root.style.setProperty("--color", "hsl(236, 33%, 92%)")
        root.style.setProperty("--bgCol", "hsl(235, 24%, 19%)")
        root.style.setProperty("--img", 'url("./images/bg-desktop-dark.jpg")')
        root.style.setProperty("--image", 'url("./images/bg-mobile-dark.jpg")')
        root.style.setProperty("--shadow", "none")
        root.style.setProperty("--border", "hsl(234, 11%, 52%)")
        dark.classList.add("hide")
        light.classList.add("light")
    })
}

let lightMode = false;
if (lightMode != true) {
    light.addEventListener("click", function() {
        root.style.setProperty("--bg", "hsl(0, 0%, 98%)")
        root.style.setProperty("--color", "hsl(235, 19%, 35%)")
        root.style.setProperty("--bgCol", "white")
        root.style.setProperty("--img", 'url("./images/bg-desktop-light.jpg")')
        root.style.setProperty("--image", 'url("./images/bg-mobile-light.jpg")')
        root.style.setProperty("--shadow", "0 15px 50px 0px hsl(236, 33%, 92%)")
        root.style.setProperty("--border", "hsl(236, 33%, 92%)")
        dark.classList.remove("hide")
        light.classList.remove("light")
    })
}


const showAllTodo = () => {
    const all = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    let data = tab === "all" ? all : tab === "active" ? all.filter(todo => todo.completed === false) : all.filter(todo => todo.completed === true)

    document.querySelector(".div6").innerHTML = ""
    document.querySelector(".div9").innerHTML = ""
    data.forEach((todo) => {
        const todoComponent = document.createElement("div")
        todoComponent.innerHTML = `<div class="div7">
        <div class="div10">
            <div class="${todo.completed ? "check hide" : "check"}"></div>
            <div class="${todo.completed ? "img-div light" : "img-div"}">
                <img src="./images/icon-check.svg" alt="">
            </div>
            <p class="${todo.completed ? "list line" : "list"}">${todo?.name}</p>
        </div>

        <div class="close-div">
            <img class="close-img" src="./images/icon-cross.svg" alt="">
        </div>
    </div>`

        todoComponent.addEventListener("click", () => {
            completeTodo(todo.id)

        })
        todoComponent.querySelector(".close-div").addEventListener("click", (e) => {
            e.stopPropagation();
            removeTodo(todo.id)
        })
        document.querySelector(".div6").appendChild(todoComponent)

    })
    const completed = data.filter((todo) => todo.completed === true)
    const remaining = document.createElement("div")
    remaining.innerHTML = `<div class="div8">
    <p class="p1">${data.length - completed.length} items uncompleted</p>
    <div>
        <p class="p2" onclick="showAll()">All</p>
        <p class="p3" onclick="showActive()">Active</p>
        <p class="p4" onclick="showCompleted()">Completed</p>
    </div>
    <p class="p5" onclick="clearCompleted()">Clear Completed</p>
</div>`
    document.querySelector(".div6").appendChild(remaining)
    const last = document.createElement("div")
    last.innerHTML = `
    <div class="div11">
        <p class="p2" onclick="showAll()">All</p>
        <p class="p3" onclick="showActive()">Active</p>
        <p class="p4" onclick="showCompleted()">Completed</p>
    </div>`
    document.querySelector(".div9").appendChild(last)

}

showAllTodo()

const completeTodo = (id) => {
    const data = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    const index = data.findIndex((todo) => todo.id === id)
    data[index].completed = !data[index].completed
    localStorage.setItem("todos", JSON.stringify(data))

    showAllTodo()
}

const addTodo = (value) => {
    let allTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    const newTodo = {
        id: Math.random(),
        name: value,
        completed: false
    }
    allTodos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(allTodos))
    showAllTodo()
}

const removeTodo = (id) => {
    const data = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    const modifiedData = data.filter((todo) => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify(modifiedData))
    showAllTodo()
}



let form = document.getElementById("form");
let input = document.getElementById("input")
form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (input.value.length == 0) {
        alert("Please Enter a Task")
    } else {
        addTodo(input.value)
        input.value = ""
    }



})


const showActive = () => {
    data = JSON.parse(localStorage.getItem("todos")) || []
    const uncompleted = data.filter((todo) => todo.completed === false)

    tab = "active"
    showAllTodo()
}

const showCompleted = () => {

    data = JSON.parse(localStorage.getItem("todos")) || []
    const completed = data.filter((todo) => todo.completed === true)

    tab = "completed"
    showAllTodo()
}

const showAll = () => {
    data = JSON.parse(localStorage.getItem("todos")) || []

    tab = "all"
    showAllTodo()
}