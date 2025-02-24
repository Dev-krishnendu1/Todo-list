import "./App.css";
import AddItem from "./Components/AddItem";
import Header from "./Components/Header";
import TotalItem from "./Components/TotalItem";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const API_URL = "http://localhost:4001/tasks";
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get(API_URL)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          console.error("Invalid data format received:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = async (text, date) => {
    if (text.trim() !== "" && date !== "") {
      const newTask = { text, date, completed: false };
      try {
        const res = await axios.post(API_URL, newTask);
        setTasks((prevTasks) => [...prevTasks, res.data]);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const toggleTask = async (id) => {
    try {
      const taskToToggle = tasks.find((task) => task._id === id);
      if (taskToToggle) {
        const res = await axios.put(`${API_URL}/${id}`);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? res.data : task))
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  

  return (
    <div className="container text-center mt-4 mb-2 p-3 rounded shadow bg-light" style={{ maxWidth: "400px" }}>
      <Header />
      <AddItem addTask={addTask} />
      <TotalItem tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>)
 
  }
  export default App