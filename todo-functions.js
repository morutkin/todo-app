
//fetch exisiting todos from local storage
const getSavedTodos = function(){
    const todoJSON = localStorage.getItem('todos')
    if(todoJSON!==null){
        return JSON.parse(todoJSON)
    }
    else{
        return []
    }
}

//save todos to local storage
const saveTodos = function(todos){
   return localStorage.setItem('todos', JSON.stringify(todos))
}

//remove todos from list 
const removeTodos = function(id){
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id 
    })
    if(todoIndex> -1){
        todos.splice(todoIndex, 1)
    }
}

//toggle todo - change from true to false, false to true 
const toggleTodo = function(id){
    const todo = todos.find(function(todo){
        return todo.id === id
    })

    if(todo!== undefined ){
        todo.completed = !todo.completed
    }

    
}


//render app todos based on filters
const renderTodo = function(todos, filters){
    const filterTodo = todos.filter(function(todo){
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !todo.completed || !filters.hideCompleted
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodo = filterTodo.filter(function(todo){
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML =''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodo))
    

    
    filterTodo.forEach(function(todo){
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })

    //const newItem = document.createElement('p')
   //newItem.textContent = newInputValue.searchText
   //document.querySelector('#todos').appendChild(newItem)
}

//get the DOM elements for an indivisual note 
const generateTodoDOM = function(todo){
    
    //the div contains the text and the button 
    const todoEl = document.createElement('div')
    const textEl = document.createElement('span')
    const checkbox = document.createElement('input')
    const removeButton = document.createElement('button')
    //set up todo and remove checkbox 
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    removeButton.textContent = 'x'

    
    
    //set up todo text 
    textEl.textContent = todo.title


    //adding button and text to the div 
    todoEl.appendChild(checkbox)
    todoEl.appendChild(textEl)
    todoEl.appendChild(removeButton)

    //set up remove event listener
    removeButton.addEventListener('click', function(){
        removeTodos(todo.id)
        saveTodos(todos)
        renderTodo(todos, filters)
    })

    
    //set up check listener 
    checkbox.addEventListener('change', function(){
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodo(todos, filters)
    })
    
    
    return todoEl
   
}

const generateSummaryDOM = function(incompleteTodo){
    const summary = document.createElement('h2')
    summary.textContent = `you have ${incompleteTodo.length} todos left`
    return summary
    
}