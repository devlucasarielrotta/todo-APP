import { Todo } from '../todos/models/todo.model.js';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos:[
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del espacio'),
    ],
    filter: Filters.All,
}
const loadStore  = () => {
    if(!localStorage.getItem('state'))return;

    const {todos =[],filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter= filter;
}

const saveStateToLocalStorage= () => {
    localStorage.setItem('state',JSON.stringify(state));
}
const getTodos = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done );
        case Filters.Pending:
            return state.todos.filter (todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid`);
    }
}
/**
 * 
 * @param {String} todo 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required');

    state.todos.push(new Todo(description));
    saveStateToLocalStorage()
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
            if(todo.id === todoId) {todo.done = !todo.done}
            
            return todo;

    })
    //throw new Error('Not implemented');
    saveStateToLocalStorage()
}
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage()
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage()
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {

    if(!Object.values(Filters).includes(newFilter) )throw new Error('Filtro no encotrado');
    
    state.filter = newFilter;
    //throw new Error('Not implemented');
    saveStateToLocalStorage()
}

const getCurrentFilter = () => {
    
    return state.filter;
    //throw new Error('Not implemented');
}
const initStore = () => {
    loadStore();
    console.log('InitStore')
}

export default  {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}