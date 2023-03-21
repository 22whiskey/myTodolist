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
    try {
      await axios.delete(`http://localhost:5000/todos/delete/${id}`);
      const deleteTodo = todos.filter((item) => item._id !== id)
      setTodos(deleteTodo)
    } catch (error) {
      console.error(error);
    }
  };

  const createTodo = async () => {
    try {
      const result = await axios.post(`http://localhost:5000/todos/new`, {
        text: newMessage
      });

      setTodos([...todos, result.data]);
      setPopupActive(false);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='flex flex-col p-[4%] leading-[500%] '>
      <h1>My Todolist</h1>
      <p className='text-[150%]'>Lists :</p>
      {/* flex items-center gap-[3rem] */}
      <section className='todolist-box'>
        {todos.map((item, index) => (
          <div className={"todobox" + (item.complete ? "is-complete" : "")} key={index}>
            <div className='flex items-center w-[90%]'>
              <div className='checkbox' onClick={() => checkBox(item._id)}></div>
              <p className='px-[7%]'>{item.text.slice(0, 80)}</p></div>
            <div>
              <div className='deleteButton' onClick={() => deleteTodoBox(item._id)}>x</div>
            </div>
          </div>
        ))}

      </section >
      <section className='w-[100%] flex justify-center relative'>
        <div className='addTodo' onClick={() => setPopupActive(true)}>+</div>
        {popupActive ? (
          <div className='todoPopup'>
            <div className='closePopup' onClick={() => setPopupActive(false)}>x
            </div>
            <div className='flex flex-col items-center'>
              <h3>Add Todolist !</h3>
              <input type="text" className='add-todo rounded-[15px]' onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
              <div className='createButton' onClick={createTodo}>Create</div>
            </div>
          </div>
        ) : ""}
      </section>
    </div>

  );
}


export default App
