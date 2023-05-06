import { useState } from 'react'


function AddTask({ onAdd }) {
  
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    
    function onSubmit(e) {
        e.preventDefault()
        
        if (!text) {
            alert('Please add a task')
            return
        }

        onAdd({ text, date, reminder})

        setText('')
        setDate('')
        setReminder(false)
    }


    return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Add Task'
                value={text} 
                onChange={(e) =>    
                setText(e.target.value)
                }
            />
        </div>
        <div className='form-control'>
            <label>Day and Time</label>
            <input type='text' placeholder='Add Date' 
                value={date} 
                onChange={(e) =>    
                    setDate(e.target.value)
                    }
            />
        </div>
        <div className='form-control form-control-check'>
            <label>Reminder</label>
            <input type='checkbox'
                value={reminder} 
                onChange={(e) =>    
                    setReminder(e.currentTarget.checked)
                    }
                checked={reminder}
            />
        </div>

        <input className='btn btn-block' type='submit' value='Save Task' />
    </form>
  )
}

export default AddTask