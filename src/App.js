import Header from "./components/Header"
import Tasks from "./components/Tasks"
import { useState } from "react"
import AddTask from "./components/AddTask"


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState(
    [
        {
            id: 3,
            text: 'Shopping',
            date: 'Date and Time',
            reminder: false
        },
        {
            id: 2,
            text: 'Code',
            date: 'Date and Time',
            reminder: false
        },
        {
            id: 1,
            text: 'Exercise',
            date: 'Date and Time',
            reminder: false
        }  
    ]
)

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id)
  )}

  function toggleReminder(id) {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, reminder: !task.reminder} : task
    ))
  }

  function addTask(task) {
    const id = Math.floor(Math.random() * 1000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  return (
    <div className="container">
      <Header onShowAddTask={() => setShowAddTask(!showAddTask)} 
        showAddTask={showAddTask}
      />
      
      { showAddTask && <AddTask onAddTask={addTask} />}
      
      {tasks.length > 0 ? 
        <Tasks tasks={tasks} onDelete={deleteTask}  onToggleReminder={toggleReminder}/>
        : 'No Tasks To Show'
      }
    </div>
  );
}

export default App;
