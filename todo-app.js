
const todos = getSavedTodos()

const filters = {
    //filter object, searchText was created by the DOM
    searchText: '',
    hideCompleted: false

}


renderTodo(todos, filters)

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderTodo(todos, filters)
})


document.querySelector('#add-todo').addEventListener('submit', function(e){
    e.preventDefault()
    
    todos.push({
        id: uuidv4(),
        title: e.target.elements.addTodo.value,
        completed: false
    })
    saveTodos(todos)
    e.target.elements.addTodo.value =''
    renderTodo(todos, filters)

})

document.querySelector('#hide-completed').addEventListener('change', function(e){
        filters.hideCompleted = e.target.checked
        renderTodo(todos, filters)
   
    
})
//const para = document.querySelectorAll('p')

//para.forEach(function(p){
 //   if(p.textContent.includes('the')){
 //       p.remove()
 //   }
//})

