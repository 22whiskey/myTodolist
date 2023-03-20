import { useEffect, useState } from 'react'
import axios from "axios";
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/todos`);
      setTodos(result.data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const checkBox = async id => {
    try {
      const result = await axios.put(`http://localhost:5000/todos/complete/${id}`);
      setTodos(todos => todos.map(item => {
        if (item._id === result.data._id) {
          item.complete = result.data.complete;
        }
        return item;
      }));
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const deleteTodoBox = async id => {
    const data = await fetch(API_BASE + "/todos/delete/" + id, {
      method: "DELETE"
    }).then(res => res.json())

    setTodos(todos => todos.filter(todo => todo._id !== data._id))
  }


  return (
    <div className='flex flex-col p-[4%] leading-[500%]'>
      <h1>My Todolist</h1>
      <p className='text-[150%]'>Lists :</p>

      <section className='flex items-center flex-col gap-[3rem]'>
        {todos.map((item, index) => (
          <div className={"todobox" + (item.complete ? "is-complete" : "")} key={index}>
            <div className='checkbox' onClick={() => checkBox(item._id)}></div>
            <p className='px-[7%]'>{item.text}</p>
            <div className='deleteButton' onClick={() => deleteTodoBox(item._id)}>x</div>
          </div>
        ))}

      </section >
    </div >
  )
}

export default App
