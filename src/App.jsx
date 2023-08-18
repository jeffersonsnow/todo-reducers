import { useReducer, useState } from 'react'
import Todo from './Todo'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo',
  TOGGLE_TODO: 'toggle-todo'
}

function reducer(todos, action) {
  switch(action.type) {
    case ACTIONS.ADD_TODO: 
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id);
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        console.log('how many times?')
        if(todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete};
        }
        return todo;
      })
      default:
        return todos;
    }
}

function newTodo(name){
  return { id: Date.now(), name, complete: false};
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    dispatch({type: ACTIONS.ADD_TODO, payload: { name: name }});
    setName('')
  }

  console.log(todos);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value) }/>
      </form>
      {/* {todos.map( todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      })} */}
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
      })}
    </>
  )
}

export default App
