import { useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'

function App() {

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
     <h1>
        CheckBox
     </h1>
    </TodoProvider>
  )
}

export default App
