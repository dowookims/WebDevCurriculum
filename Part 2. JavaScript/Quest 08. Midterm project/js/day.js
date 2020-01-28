class Day {
    constructor(y, m, d, todos){
        this.year = y;
        this.month = m;
        this.date = d;
        this.todos = {};
        this.dom = null;
        this.side = new SideDrawer(m, d);
        this._prepareTodo(todos);
    };
    
    _prepareTodo (todos) {
        todos && todos.forEach(todo => {
            this.todos.push(new Todo(todo.id, todo.title, todo.desc))
        });
    }

    prepareDOM () {
        const dateDiv = document.getElementById("date");
        const dateClone = document.importNode(dateDiv.content, true);
        const dateDOM = dateClone.querySelector('.date');
        const dateSpan = dateClone.querySelector('.date-span');
        dateSpan.innerText = this.date;
        dateSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            Modal.openModal(this.year, this.month, this.date, this);
        });
        dateDOM.appendChild(dateSpan);
        this.dom = dateDOM;
        this.dom.addEventListener('click', () => {
            this.side.paintDOM(this.todos);
        });
    };

    addTodo(date, id, title, desc) {
        if (!this.todos[date]) {
            this.todos[date] = [];
        };
        console.log("THIS.todos", this.todos);
        this.todos[date].push(new Todo(id, title, desc));
        this.side.paintDOM(this.todos);
        console.log(this.todos);
    }

    removeTodo(id){};
    
    updateTodo(id){};
};
