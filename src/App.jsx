import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import { ToDoForm, ToDoItems } from './components'

function App() {

  const [todos, setToDos] = useState([])

  const addTodo = (todo) => {
    setToDos((prev) => [{
      id: Date.now(),
      ...todo
    }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setToDos((prev) => prev.map((prevTodo) => (prevTodo.id === todo.id ?
      todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setToDos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setToDos((prev) =>
      prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)
    )
  }

  // will run only once when component loads for the first time
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setToDos(todos)
    }
  }, [])


  // Update local storage on each change in ToDos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your CheckList</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <ToDoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'
              >
                <ToDoItems todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
