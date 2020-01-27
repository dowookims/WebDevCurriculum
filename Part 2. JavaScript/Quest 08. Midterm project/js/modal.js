class Modal {

    constructor() {
        if (!!Modal.instance)  return Modal.instance;
        Modal.instance = this;
        this.dom = null;
        this.isModalOpen = false;
        this._prepareDOM();
    };
    
    _prepareDOM () {
        const modal = document.getElementById('modal');
        const modalClone = document.importNode(modal.content, true);
        const modalDiv = modalClone.querySelector('.modal');
        const submitBtn = modalClone.querySelector('.submit-btn');

        submitBtn.addEventListener('click', () => {
            Modal.submitTodo();
        });

        this.dom = modalDiv;
        
    };

    static submitTodo () {
        const dateData = document.getElementById('todo-date');
        const titleData = document.getElementById('todo-title');
        const descData = document.getElementById('todo-desc');
        const todoList = new TodoList();
        let [ y, m, d ] = dateData.value.split("-")
        m = m[0] === '0' ? parseInt(m[1]) - 1 : parseInt(m) -1;
        d = d[0] === '0' ? d[1] : d;
        d = parseInt(d) -1;
        
        if (!todoList.data[y]) {
            todoList.insertYear(y);
            todoList.data[y][m][d] = [{
                id: 1,
                date: `${y-m-d}`,
                title: titleData.value,
                desc: descData.value
            }];
        };
        console.log("ASD")
        titleData.value = '';
        descData.value = '';
    }

    static closeModal() {
        if (!Modal.instance.isModalOpen) return

        Modal.instance.isModalOpen = false;
        Modal.instance.dom.style.display = 'none';
    }

    static openModal (y, m, d) {
        if (Modal.instance.isModalOpen) return;

        Modal.instance.isModalOpen = true;
        Modal.instance.dom.style.display = 'flex';
        const modalExitBtn = document.querySelector('.modal-close-btn');
        const todoDate = document.getElementById('todo-date');

        m = m < 9 ? '0' + (m + 1) : m + 1;
        d = d < 10  ? '0' + d  : d;

        todoDate.value = `${y}-${m}-${d}`;

        modalExitBtn.addEventListener('click', (e) => {
            if (Modal.instance.isModalOpen) {
                e.stopPropagation();
                Modal.closeModal();
            }
        });

        const modalCloseEvent = document.addEventListener('click', e => {
            if (Modal.instance.isModalOpen && e.target.className === 'modal') {
                Modal.closeModal();
                document.removeEventListener('click', modalCloseEvent);  
            };
        });
    };
};