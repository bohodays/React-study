import React from 'react'
import { TodoListItemType } from '../AppContainer'
import InputTodo from './InputTodo'
import TodoList from './TodoList'

type AppProps = {
  todoList: Array<TodoListItemType>;
  addTodo: (todo: string) => void;
  deleteTodo: (no: number) => void;
  toggleDone: (no: number) => void;
}

const App = (props: AppProps) => {
  return (
    <div className='container'>
      <div className='card card-body bg-light'>
        <div className='title'>:: Todolist App</div>
      </div>
      <div className='card card-default card-borderless'>
        <div className='card-body'>
          <InputTodo addTodo={props.addTodo} />
          <TodoList 
            todoList={props.todoList}
            deleteTodo={props.deleteTodo}
            toggleDone={props.toggleDone}
          />
        </div>
      </div>
    </div>
  )
}

export default App