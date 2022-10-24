import './App.css';
import Header from './components/Header/Header';
import { useState } from 'react';
import ToDoList from "./components/ToDoList/ToDoList"

function App() {
  const [ toDoList, setToDoList ] = useState([
    {title: "Go To Boxing Session", date: "24/10/2022", id: 1, complete: false},
    {title: "Work On Systems AE", date: "24/10/2022", id: 2, complete: false},
    {title: "Tutor Laksh at 4pm", date: "24/10/2022", id: 3, complete: false},
  ]); 

  const handleTaskComplete = (id) => {
    let newToDoList = toDoList.map(task => {
      return task.id === id ? { ...task, complete: !task.complete} : task;
    });
    setToDoList(newToDoList);
  }
  
  return (
    <div className="App">
      <Header />
      <ToDoList toDoList={toDoList} handleTaskComplete={handleTaskComplete}/>
    </div>
  ); 
}

export default App;
