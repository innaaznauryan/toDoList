import React, {useState} from 'react'
import ItemTodo from './ItemTodo'
import EditTodo from './EditTodo'
import "./listTodo.scss"

export default function ListTodo() {
    
    let ID
    if(!localStorage.getItem("currentId")) {
        ID = 1
        localStorage.setItem("currentId", ID)
    } else {
        ID = +localStorage.getItem("currentId")
    }

    const [state, setState] = useState(() => {
        const array = []
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if(!key.startsWith("id")) continue
            const value = localStorage.getItem(key)
            const item = JSON.parse(value)
            array.push(item)
        }
        return array
    })


    const [error, setError] = useState(null)
    const [editMode, setEditMode] = useState({
        mode: false,
        id: null
    })

    const handleComplete = (id) => {
        const newState = [...state]
        const elem = state.find(elem => elem.id == id)
        elem.status = !elem.status
        setState(newState)
        localStorage.setItem("id" + id, JSON.stringify(elem))
    }
    const handleDelete = (id) => {
        setState(state.filter(elem => elem.id != id))
        localStorage.removeItem("id" + id)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const {title, description} = e.target
        if(!title.value || !description.value || /^\s|\s$/.test(title.value) || /^\s|\s$/.test(description.value)) {
            setError("Please fill the form!")
            e.target.reset()
            setTimeout(() => setError(null), 2000);
            return
        }
        const newItem = {id: ID, ...Object.fromEntries([...new FormData(e.target)]), status: false}
        setState((p => ([...p, newItem])))
        localStorage.setItem("id" + ID, JSON.stringify(newItem))
        localStorage.setItem("currentId", ++ID)
        e.target.reset()
    }
    const handleEdit = (id) => {
        setEditMode({mode: true, id})
    }
    const handleRenew = (id, title, description) => {
        const renewed = {id, title, description, status: false}
        setState(state.with(state.findIndex(elem => elem.id == id), renewed))
        localStorage.setItem("id" + id, JSON.stringify(renewed))
        console.log(renewed)
    }


    return (
        <div className='list'>
            {state.map(elem => {
                return <ItemTodo key={elem.id} handleComplete={handleComplete} handleDelete={handleDelete} handleEdit={handleEdit} {...elem}/>
            })}
            <form onSubmit={handleSubmit}>
                <fieldset>
                <input name="title" type="text" placeholder="Title"/>
                <input name="description" type="text" placeholder="Description"/>
                <input type="submit" value="Add"/>
                </fieldset>
            </form>
            {error && <p className='error'>{error}</p>}
            {editMode.mode && <EditTodo data={state} id={editMode.id} exit={setEditMode} handleRenew={handleRenew}/>}
        </div>
    )
}
