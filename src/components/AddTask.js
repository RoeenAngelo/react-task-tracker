import { useState } from 'react'


function AddTask({ onAddTask }) {
    
    const [taskData, setTaskData] = useState(
        {
            text: "",
            date: "",
            reminder: false
        }
    )

    function handleChange(e) {
        const {name, value, type, checked} = e.target
            setTaskData(prevTaskData => {
                return {
                    ...prevTaskData,
                    [name] : type === "checkbox" ? checked : value
                }
            })
    }

    
    function onSubmit(e) {
        e.preventDefault()
        
        if (!taskData.text) {
            alert('Please add a task')
            return
        }

        onAddTask({
            text: taskData.text, 
            date: taskData.date, 
            reminder : taskData.reminder
        })

        setTaskData( {
            text: "",
            date: "",
            reminder: false
        })
    }


    return (
        
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input 
                type='text' 
                placeholder='Add Task'
                value={taskData.text} 
                onChange={handleChange}
                name="text"
            />
        </div>
        <div className='form-control'>
            <label>Day and Time</label>
            <input 
                type='text' 
                placeholder='Add Date' 
                value={taskData.date} 
                onChange={handleChange}
                name="date"
            />
        </div>
        <div className='form-control form-control-check'>
            <label>Reminder</label>
            <input 
                type='checkbox'
                onChange={handleChange}
                checked={taskData.reminder}
                name="reminder"
            />
        </div>

        <input className='btn btn-block' type='submit' value='Save Task' />
    </form>
  )
}

export default AddTask