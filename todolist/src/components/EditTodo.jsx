import React, {useState} from 'react'
import "./editTodo.scss"

const EditTodo = (props) => {
    const {data, id, exit, handleRenew} = props
    
    const [editInfo, setEditInfo] = useState(() => {
        const element = data.find(elem => elem.id == id)
        return {editTitle: element.title, editDesc: element.description}
    })

console.log(data)
    const handleEditChange = (e) => {
        setEditInfo({...editInfo, [e.target.name]: e.target.value})
    }
    
  return (
    <>
    <div className="veil"></div>
    <div className='modal'>
        <h1>Edit</h1>
        <input onChange={handleEditChange} name="editTitle" type="text" value={editInfo.editTitle}/>
        <input onChange={handleEditChange} name="editDesc" type="text" value={editInfo.editDesc}/>
        <div className="btns">
            <button onClick={() => exit({mode: false, id: null})}>Cancel</button>
            <button onClick={() => {
                handleRenew(id, editInfo.editTitle, editInfo.editDesc)
                exit({mode: false, id: null})
            }}>Save</button>
        </div>
    </div>
    </>
  )
}

export default EditTodo