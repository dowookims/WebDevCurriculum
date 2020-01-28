class SideDrawer {
    constructor (m, d) {
        this.month = m;
        this.date = d;
        this.dom = null;
    }

    paintDOM (todos) {
        const todoDiv = document.getElementById('todo');
        const todoItemDiv = document.getElementById('todo-item');
        const todoDivClone = document.importNode(todoDiv.content, true);
        const todoItems = document.querySelectorAll('.todo-item');
        const todoDivBox = todoDivClone.querySelector('.todo');
        const todoMonth = todoDivClone.querySelector('.todo-month');
        const todoDate = todoDivClone.querySelector('.todo-date');
        let todoContent = todoDivClone.querySelector('.todo-content');
        
        if (todoItems.length >= 1) {
            todoItems.forEach(elem => {
                elem.parentNode.removeChild(elem);
            });
        };

        const dTodoMonth = document.querySelector('.todo-month');
        const dTodoDate = document.querySelector('.todo-date');
        if (dTodoMonth) {
            dTodoMonth.innerHTML = `${this.month + 1}월 `;
            dTodoDate.innerHTML = `${this.date} 일 `;
        } else {
            todoMonth.innerHTML = `${this.month + 1}월 `;
            todoDate.innerHTML = `${this.date} 일 `;
        }

        if (todos) {
            for (let dateTodo in todos ) {
                todos[dateTodo].forEach( todo => {
                    const dTodoContent = document.querySelector('.todo-content');
                    if ( dTodoContent ) { todoContent = dTodoContent };
                    const todoItemDivClone = document.importNode(todoItemDiv.content, true);
                    const todoItem = todoItemDivClone.querySelector('.todo-item');
                    todoItem.innerText = `${todo.title} : ${todo.desc}`;
                    todoContent.appendChild(todoItem);   
                })
            };
        };
        this.dom = todoDivBox;
    }
}