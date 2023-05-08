import { useState } from 'react'


function AddTask({ onAddTask }) {
    
    const [formData, setFormData] = useState(
        {
            text: "",
            date: "",
            reminder: false
        }
    )

    function handleChange(e) {
        const {name, value, type, checked} = e.target
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name] : type === "checkbox" ? checked : value
                }
            })
    }

    
    function onSubmit(e) {
        e.preventDefault()
        
        if (!formData.text) {
            alert('Please add a task')
            return
        }

        onAddTask(formData)

        setFormData( 
            {
            text: "",
            date: "",
            reminder: false
            }
        )
    }


    return (
        
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input 
                    type='text' 
                    placeholder='Add Task'
                    value={formData.text} 
                    onChange={handleChange}
                    name="text"
                />
            </div>
            <div className='form-control'>
                <label>Day and Time</label>
                <input 
                    type='text' 
                    placeholder='Add Date' 
                    value={formData.date} 
                    onChange={handleChange}
                    name="date"
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Reminder</label>
                <input 
                    type='checkbox'
                    onChange={handleChange}
                    checked={formData.reminder}
                    name="reminder"
                />
            </div>

            <button className='btn btn-block'>Save Task</button>
        </form>
  )
}

export default AddTask