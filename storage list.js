window.onload = function () {
    let todos = []
    
    let list = this.document.getElementById('list')
    let newtask = this.document.getElementById('newtask')
    let addtask = this.document.getElementById('addtask')
    let cleardone = this.document.getElementById('cleardone')
    let sortlist = this.document.getElementById('sortlist')

    function retrieveTodos () {
        if (localStorage['todos']) {
            todos = JSON.parse(localStorage['todos'])
        }
    }
    function saveTodos () {
        localStorage['todos'] = JSON.stringify(todos)
    }
    function clearList () {
        while(list.firstChild) {
            list.removeChild(list.firstChild)
        }
    }
    function createListItemFromTodo(todo, pos) {
        let item = document.createElement('li')
        let taskSpan = document.createElement('span')
        let xBtn = document.createElement('button')
        let upBtn = document.createElement('button')
        let downBtn = document.createElement('button')
        let upbtnIcon = document.createElement('i')

        item.setAttribute("class", "list-group-item list-group-item-warning")

        upbtnIcon.setAttribute("class", "fa fa-arrow-left")
    

        taskSpan.innerText = todo.task
        taskSpan.style.fontWeight = 'bold'
        taskSpan.style.fontSize = '30px'
        taskSpan.style.color = 'crimson'
        taskSpan.style.padding = '10px'
        
        xBtn.innerText = "X"
        xBtn.style.marginLeft = '10px'
        xBtn.setAttribute("class", "btn btn-outline-secondary btn-sm")
        upBtn.setAttribute("class", "btn btn-outline-secondary btn-sm")
        downBtn.setAttribute("class", "btn btn-outline-secondary btn-sm")
        upBtn.innerText = "^"
        upBtn.style.marginLeft = '10px'
        downBtn.innerText = "V"
        downBtn.style.marginLeft = '10px'
        if (todo.done) {
            taskSpan.style.textDecoration = 'line-through'
        }
        xBtn.onclick = function () {
            todos[pos].done = !todos[pos].done
            saveTodos()
            refreshList()
        }
        downBtn.onclick = function () {
            if (pos >= todos.length - 1) return

            todos.splice(pos, 0, todos.splice(pos+1, 1)[0])
            saveTodos()
            refreshList()
        }
        upBtn.onclick = function () {
            if (pos <= 0) return
            
            todos.splice(pos-1, 0, todos.splice(pos, 1)[0])
            saveTodos()
            refreshList()
        }
        item.setAttribute('data-id', pos)
        item.appendChild(taskSpan)
        item.appendChild(xBtn)
        item.appendChild(upBtn)
        item.appendChild(downBtn)
        upBtn.appendChild(upbtnIcon)
        
        return item
    }
    function refreshList () {
        retrieveTodos()
        clearList()
        for (let i = 0; i < todos.length; i++) {
            list.appendChild(createListItemFromTodo(todos[i], i))
        }
    }
    function addTodo () {
        todos.push({
            task: newtask.value,
            done: false
        })
        saveTodos()
        newtask.value = ""
        refreshList()
    }

    addtask.onclick = addTodo
    cleardone.onclick = function () {
        todos = todos.filter((t) => !t.done)
        saveTodos()
        refreshList()
    }
    sortlist.onclick = function () {
        todos.sort((a,b) => a.done - b.done)
        saveTodos()
        refreshList()
    }

    refreshList()


}