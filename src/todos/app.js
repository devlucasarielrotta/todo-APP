import todoStore, {Filters} from '../store/todo.store.js';
import html from './app.html?raw';
import { renderTodos } from './use-cases';
import { renderPending } from './use-cases/render-pending.js';

const elementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    Filters: '.filtro',
    pendingCountLabel: '#pending-count'
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const updatePendingCount = () => {
        renderPending(elementIds.pendingCountLabel);
    }

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementIds.TodoList,todos);
        updatePendingCount()
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
       
    }) ();

   
    //referencia html
    const newTodoInput = document.querySelector(elementIds.NewTodoInput);
    const todoListUL = document.querySelector(elementIds.TodoList);
    const deleteCompletedTodos = document.querySelector(elementIds.ClearCompleted);
    const FiltersUL = document.querySelectorAll(elementIds.Filters);


    // evento New TODO
    newTodoInput.addEventListener('keyup' , (evt) => {
        if(evt.keyCode !== 13) return;
        if(evt.target.value.trim().length === 0) return;
        
        todoStore.addTodo(evt.target.value);
        evt.target.value = '';
        displayTodos();
       
    });

    todoListUL.addEventListener('click', (evt) => {
        const element = evt.target.closest('[data-id]');
       // console.log(element.getAttribute('data-id'));
        todoStore.toggleTodo(element.getAttribute('data-id'));
    
        displayTodos()
    })

    todoListUL.addEventListener('click', (evt) => {
        const element = evt.target.closest('[data-id]');
        // console.log(element)
        const isDestroyElement = evt.target.className === 'destroy';
        // console.log(isDestroyElement)
        if(!element || !isDestroyElement ) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
       // todoStore.toggleTodo(element.getAttribute('data-id'));
        //displayTodos()
    })

    deleteCompletedTodos.addEventListener('click',(evt) => {
        todoStore.deleteCompleted();
        displayTodos();
    })
    
    FiltersUL.forEach(element => {

   


        element.addEventListener('click',(element)=>{
            FiltersUL.forEach(e => e.classList.remove('selected'))
            element.target.classList.add('selected')
         
            switch(element.target.textContent){
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break;

                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break;

                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break;

            }

            displayTodos()

        })


    })

    
}