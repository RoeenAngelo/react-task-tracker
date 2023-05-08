import Header from "./components/Header"
import Tasks from "./components/Tasks"
import { useState, useEffect } from "react"
import AddTask from "./components/AddTask"



function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    async function getTasks() {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  // Fetch Tasks
  async function fetchTasks() {
    const res = await fetch('http://localhost:5002/tasks')
    const data = await res.json()
    return data
  }

  // Fetch Task for updating
  async function fetchTask(id) {
    const res = await fetch(`http://localhost:5002/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Delete Task
  async function deleteTask(id) {
    await fetch(`http://localhost:5002/tasks/${id}`, {
      method: "DELETE"
    })
    setTasks(tasks.filter(task => task.id !== id)
  )}

  // Toggle Reminder
  async function toggleReminder(id) {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5002/tasks/${id}`,
      {
        method: "PUT",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(updatedTask)
      }
    )
    const data = await res.json()

    setTasks(tasks.map(task => 
      task.id === id ? {...task, reminder: data.reminder} : task
    ))
  }

  // Add Task
  async function addTask(task) {
    const res = await fetch('http://localhost:5002/tasks',
    {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(task)
    }
    )

    const data = await res.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
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

  // return (
  //   <Router>
  //     <div className='container'>
  //       <Header
  //         onAdd={() => setShowAddTask(!showAddTask)}
  //         showAdd={showAddTask}
  //       />
  //       <Routes>
  //         <Route
  //           path='/'
  //           element={
  //             <>
  //               {showAddTask && <AddTask onAdd={addTask} />}
  //               {tasks.length > 0 ? (
  //                 <Tasks
  //                   tasks={tasks}
  //                   onDelete={deleteTask}
  //                   onToggle={toggleReminder}
  //                 />
  //               ) : (
  //                 'No Tasks To Show'
  //               )}
  //             </>
  //           }
  //         />
  //         <Route path='/about' element={<About />} />
  //       </Routes>
  //       <Footer />
  //     </div>
  //   </Router>
  // );

}

export default App;
